import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { deleteBlogPost, isFirebaseBlogConfigured } from '@/lib/firebaseBlog';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug no proporcionado' }, { status: 400 });
    }

    if (isFirebaseBlogConfigured()) {
      await deleteBlogPost(slug);
      return NextResponse.json({ success: true, message: 'Artículo eliminado correctamente' });
    }

    // 1. SI ESTÁS USANDO ALMACENAMIENTO LOCAL EN PRODUCCIÓN/DESARROLLO:
    // Definimos la ruta al archivo JSON del post
    const postsDirectory = path.join(process.cwd(), 'data/posts');
    const filePath = path.join(postsDirectory, `${slug}.json`);

    let imagePath: string | null = null;
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(rawData) as { image?: string };
      if (typeof parsed.image === 'string' && parsed.image.startsWith('/uploads/blog/')) {
        imagePath = path.join(process.cwd(), 'public', parsed.image.replace(/^\//, ''));
      }
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
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