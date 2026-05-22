import fs from 'fs';
import path from 'path';
import { LOCAL_POSTS } from './data'; // Tu archivo actual

interface CombinedPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  author?: string;
}

const postsDirectory = path.join(process.cwd(), 'data/posts');

export function getCombinedPosts(): CombinedPost[] {
  let gitPosts: CombinedPost[] = [];

  // 1. Leer los posts que guardó la agencia desde GitHub
  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    
    gitPosts = fileNames
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => {
        const slug = fileName.replace(/\.json$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(fileContents);

        // Adaptamos el JSON de la agencia para que use los mismos campos de tu diseño
        return {
          slug,
          title: data.title,
          date: data.date, // Formato "YYYY-MM-DD" o texto libre
          excerpt: data.excerpt || data.content.replace(/<[^>]*>/g, '').substring(0, 140) + '...', // Limpia HTML para el resumen
          image: '/blog-placeholder.webp', // Imagen por defecto para los posts de la agencia
          content: data.content,
          author: data.author
        };
      });
  }

  // 2. Combinar tus posts fijos con los dinámicos de la agencia
  const allPosts = [...gitPosts, ...LOCAL_POSTS];

  // 3. Ordenar para que salgan según la fecha o el orden que prefieras
  return allPosts;
}