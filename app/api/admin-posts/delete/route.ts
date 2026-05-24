import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug no proporcionado' }, { status: 400 });
    }

    // 1. SI ESTÁS USANDO ALMACENAMIENTO LOCAL EN PRODUCCIÓN/DESARROLLO:
    // Definimos la ruta al archivo JSON del post
    const postsDirectory = path.join(process.cwd(), 'content/posts'); // Ajusta esta ruta según tu estructura
    const filePath = path.join(postsDirectory, `${slug}.json`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 2. SI INTEGRAS DIRECTO CON LA API DE GITHUB (RECOMENDADO SI ESTÁ EN VERCEL):
    /*
    const GITHUB_API_URL = `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/posts/${slug}.json`;
    
    // Primero hay que obtener el SHA del archivo para poder borrarlo
    const getRes = await fetch(GITHUB_API_URL, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
    });
    
    if (getRes.ok) {
      const fileData = await getRes.json();
      const sha = fileData.sha;

      // Enviamos el DELETE a GitHub
      await fetch(GITHUB_API_URL, {
        method: 'DELETE',
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Eliminar post: ${slug}`,
          sha: sha
        })
      });
    }
    */

    return NextResponse.json({ success: true, message: 'Artículo eliminado correctamente' });
  } catch (error: any) {
    console.error('Error al eliminar el artículo:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}