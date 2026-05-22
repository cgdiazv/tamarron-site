import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // ej. "tu-usuario/tamarron-next"
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json({ error: 'Faltan configuraciones del servidor (Tokens).' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { title, content, author, date, imageName, imageBase64 } = body;

    // Validamos que también venga la imagen en base64 desde la computadora local
    if (!title || !content || !imageBase64) {
      return NextResponse.json({ error: 'El título, contenido e imagen destacada son obligatorios.' }, { status: 400 });
    }

    // 1. Crear un slug limpio para la URL y los nombres de archivos
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Extaer la extensión del archivo original (ej. jpg, png, webp)
    const fileExtension = imageName.split('.').pop() || 'jpg';
    const finalImageName = `${slug}.${fileExtension}`;

    // Definimos las rutas físicas dentro de tu repositorio de GitHub
    const gitImagePath = `public/uploads/blog/${finalImageName}`;
    const gitJsonPath = `data/posts/${slug}.json`;

    // Esta es la ruta URL estática con la que Next.js leerá la imagen desde el navegador
    const publicImagePublicPath = `/uploads/blog/${finalImageName}`;

    // Headers reutilizables para autenticarnos con la API REST de GitHub
    const githubHeaders = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // ========================================================
    // ACCIÓN A: SUBIR LA IMAGEN FÍSICA A GITHUB
    // ========================================================
    const uploadImageRes = await fetch(`https://api.github.com/repos/${repo}/contents/${gitImagePath}`, {
      method: 'PUT',
      headers: githubHeaders,
      body: JSON.stringify({
        message: `Media: subida de imagen destacada para - ${title}`,
        content: imageBase64, // Mandamos el string binario limpio que procesó el FileReader
        branch: branch,
      }),
    });

    if (!uploadImageRes.ok) {
      const imgErr = await uploadImageRes.json();
      console.error('Error subiendo imagen a GitHub:', imgErr);
      return NextResponse.json({ error: 'No se pudo almacenar la imagen en el repositorio.' }, { status: 500 });
    }

    // ========================================================
    // ACCIÓN B: ESTRUCTURAR Y GUARDAR EL JSON DEL ARTÍCULO
    // ========================================================
    const postData = {
      slug,
      title,
      author: author || 'Tamarron Services',
      date: date || new Date().toISOString().split('T')[0],
      image: publicImagePublicPath, // 👈 Guardamos el link interno de la foto vinculada
      content: content,
    };

    // Convertir el objeto completo a texto JSON ordenado y luego a Base64
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
      return NextResponse.json({ error: 'Se almacenó la imagen pero falló el archivo de datos en GitHub.' }, { status: response.status });
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error del servidor:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}