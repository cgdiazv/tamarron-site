import { NextResponse } from 'next/server';

type GitHubErrorPayload = {
  message?: string;
  errors?: Array<{ message?: string }>;
};

function normalizeGitHubToken(rawToken: string): string {
  return rawToken
    .trim()
    .replace(/^Bearer\s+/i, '')
    .replace(/^token\s+/i, '');
}

function getGitHubAuthHeader(rawToken: string): string {
  const normalizedToken = normalizeGitHubToken(rawToken);
  return `token ${normalizedToken}`;
}

async function parseGitHubError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as GitHubErrorPayload;
    const nested = payload.errors?.map((err) => err.message).filter(Boolean).join(', ');
    return [payload.message, nested].filter(Boolean).join(' | ') || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function upsertRepoFile({
  repo,
  branch,
  token,
  path,
  message,
  content,
}: {
  repo: string;
  branch: string;
  token: string;
  path: string;
  message: string;
  content: string;
}) {
  const url = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = {
    Authorization: getGitHubAuthHeader(token),
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // If the file exists, GitHub requires the current SHA in the update payload.
  const existingRes = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, {
    method: 'GET',
    headers,
  });

  let sha: string | undefined;
  if (existingRes.ok) {
    const existingData = (await existingRes.json()) as { sha?: string };
    sha = existingData.sha;
  } else if (existingRes.status !== 404) {
    const details = await parseGitHubError(existingRes);
    if (/bad credentials/i.test(details)) {
      throw new Error('GitHub rechazó las credenciales. Revisa GITHUB_TOKEN en el entorno del servidor (token inválido, expirado o mal copiado).');
    }
    throw new Error(`No se pudo validar el archivo en GitHub (${path}): ${details}`);
  }

  const putBody: {
    message: string;
    content: string;
    branch: string;
    sha?: string;
  } = {
    message,
    content,
    branch,
  };

  if (sha) {
    putBody.sha = sha;
  }

  const putRes = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(putBody),
  });

  if (!putRes.ok) {
    const details = await parseGitHubError(putRes);
    if (/bad credentials/i.test(details)) {
      throw new Error('GitHub rechazó las credenciales. Revisa GITHUB_TOKEN en el entorno del servidor (token inválido, expirado o mal copiado).');
    }
    throw new Error(`GitHub rechazó la escritura de ${path}: ${details}`);
  }
}

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json({ error: 'Faltan configuraciones del servidor (Tokens).' }, { status: 500 });
  }

  const normalizedToken = normalizeGitHubToken(token);
  if (!normalizedToken) {
    return NextResponse.json({ error: 'GITHUB_TOKEN está vacío o mal configurado.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    // 👈 Capturamos el slug y excerpt personalizados del body
    const { title, slug: customSlug, excerpt, content, author, date, imageName, imageBase64 } = body;

    if (!title || !content || !imageBase64 || !excerpt) {
      return NextResponse.json({ error: 'El título, extracto, contenido e imagen son obligatorios.' }, { status: 400 });
    }

    // GitHub Contents API accepts files up to ~1 MB per request.
    const estimatedImageBytes = Math.floor((imageBase64.length * 3) / 4);
    if (estimatedImageBytes > 1_000_000) {
      return NextResponse.json(
        { error: 'La imagen supera 1 MB. Reduce su tamaño o compresión antes de publicar.' },
        { status: 413 }
      );
    }

    // 1. Validar y limpiar el slug personalizado ingresado por la agencia
    const finalSlug = (customSlug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (!finalSlug) {
      return NextResponse.json({ error: 'El URL Slug no es válido.' }, { status: 400 });
    }

    // Extraer extensión del archivo original
    const fileExtension = imageName.split('.').pop() || 'jpg';
    const finalImageName = `${finalSlug}.${fileExtension}`;

    // Rutas físicas en el repositorio de GitHub
    const gitImagePath = `public/uploads/blog/${finalImageName}`;
    const gitJsonPath = `data/posts/${finalSlug}.json`;

    // Ruta de lectura para Next.js Image
    const publicImagePublicPath = `/uploads/blog/${finalImageName}`;

    // ========================================================
    // ACCIÓN A: SUBIR LA IMAGEN A GITHUB
    // ========================================================
    try {
      await upsertRepoFile({
        repo,
        branch,
        token: normalizedToken,
        path: gitImagePath,
        message: `Media: subida de imagen destacada para - ${title}`,
        content: imageBase64,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo almacenar la imagen en el repositorio.';
      console.error('Error subiendo imagen a GitHub:', message);
      return NextResponse.json({ error: message }, { status: 500 });
    }

    // ========================================================
    // ACCIÓN B: GUARDAR EL ARCHIVO JSON CON EXCERPT Y SLUG REAL
    // ========================================================
    const postData = {
      slug: finalSlug,
      title,
      excerpt, // 👈 Guardamos el resumen exacto escrito por marketing
      author: author || 'Tamarron Services',
      date: date || new Date().toISOString().split('T')[0], // 👈 Fecha automática en formato YYYY-MM-DD
      image: publicImagePublicPath,
      content: content,
    };

    const contentBase64 = Buffer.from(JSON.stringify(postData, null, 2)).toString('base64');

    try {
      await upsertRepoFile({
        repo,
        branch,
        token: normalizedToken,
        path: gitJsonPath,
        message: `Feat: nuevo post publicado desde el portal - ${title}`,
        content: contentBase64,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Se almacenó la imagen pero falló el archivo de datos.';
      console.error('Error de GitHub API al guardar JSON:', message);
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ success: true, slug: finalSlug });
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}