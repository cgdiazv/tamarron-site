import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json({ error: 'Faltan configuraciones del servidor (Tokens).' }, { status: 500 });
  }

  try {
    const body = await request.json();
    // 👈 Capturamos el slug y excerpt personalizados del body
    const { title, slug: customSlug, excerpt, content, author, date, imageName, imageBase64 } = body;

    if (!title || !content || !imageBase64 || !excerpt) {
      return NextResponse.json({ error: 'El título, extracto, contenido e imagen son obligatorios.' }, { status: 400 });
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

    const githubHeaders = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // ========================================================
    // ACCIÓN A: SUBIR LA IMAGEN A GITHUB
    // ========================================================
    const uploadImageRes = await fetch(`https://api.github.com/repos/${repo}/contents/${gitImagePath}`, {
      method: 'PUT',
      headers: githubHeaders,
      body: JSON.stringify({
        message: `Media: subida de imagen destacada para - ${title}`,
        content: imageBase64,
        branch: branch,
      }),
    });

    if (!uploadImageRes.ok) {
      const imgErr = await uploadImageRes.json();
      console.error('Error subiendo imagen a GitHub:', imgErr);
      return NextResponse.json({ error: 'No se pudo almacenar la imagen en el repositorio.' }, { status: 500 });
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

    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${gitJsonPath}`, {
      method: 'PUT',
      headers: githubHeaders,
      body: JSON.stringify({
        message: `Feat: nuevo post publicado desde el portal - ${title}`,
        content: contentBase64,
        branch: branch,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de GitHub API al guardar JSON:', errorData);
      return NextResponse.json({ error: 'Se almacenó la imagen pero falló el archivo de datos.' }, { status: response.status });
    }

    return NextResponse.json({ success: true, slug: finalSlug });
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}