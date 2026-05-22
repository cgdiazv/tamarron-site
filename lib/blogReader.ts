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
// 💡 Leemos la rama de las variables de entorno para armar la URL de la imagen
const branch = process.env.GITHUB_BRANCH || "main"; 

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

        // 🖼️ Detectamos la extensión de la foto (.png, .jpg, etc.) guardada en el JSON
        const fileExtension = data.image ? data.image.split('.').pop() : 'png';
        
        // 🚀 Construimos la URL del CDN crudo de GitHub para saltarnos la restricción de caché de Vercel
        const rawGitHubImageUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_REPO}/${branch}/public/uploads/blog/${slug}.${fileExtension}`;

        // Adaptamos el JSON de la agencia para que use los mismos campos de tu diseño
        return {
          slug,
          title: data.title,
          date: data.date, 
          excerpt: data.excerpt || data.content.replace(/<[^>]*>/g, '').substring(0, 140) + '...', 
          // 💡 Si el JSON tiene una imagen registrada, usamos el enlace directo de GitHub, si no, el placeholder
          image: data.image ? rawGitHubImageUrl : '/blog-placeholder.webp', 
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