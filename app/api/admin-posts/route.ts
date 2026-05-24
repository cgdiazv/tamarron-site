import { NextResponse } from 'next/server';
import { getCombinedPosts } from '@/lib/blogReader';

export async function GET() {
  try {
    const posts = getCombinedPosts();
    // Mapeamos solo los datos ligeros que necesita la tabla
    const lightPosts = posts.map(p => ({
      title: p.title,
      date: p.date,
      slug: p.slug
    }));
    return NextResponse.json(lightPosts);
  } catch (error) {
    console.error('Error cargando lista en panel:', error);
    return NextResponse.json({ error: 'Error al obtener artículos' }, { status: 500 });
  }
}