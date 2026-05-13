import React from 'react';

// 1. Define TypeScript Interfaces for Type Safety
interface WordPressPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

interface GraphQLResponse {
  data: {
    posts: {
      nodes: WordPressPost[];
    };
  };
}

// 2. Data Fetching Logic (Server-Side)
async function getPosts(): Promise<WordPressPost[]> {
  const endpoint = process.env.WORDPRESS_API_URL;

  if (!endpoint) {
    throw new Error("WORDPRESS_API_URL is not defined in environment variables");
  }

  const query = `
    query GetLatestPosts {
      posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 }, // Re-generate page every 60 seconds (ISR)
  });

  const json: GraphQLResponse = await res.json();
  return json.data.posts.nodes;
}

// 3. The Main Page Component
export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Company News & Updates
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            A high-performance headless frontend powered by Next.js and WordPress.
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Featured Image placeholder if one exists */}
              {post.featuredImage && (
                <div className="h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={post.featuredImage.node.sourceUrl} 
                    alt={post.featuredImage.node.altText || post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <time className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                
                <h2 className="mt-3 text-xl font-bold text-slate-900 line-clamp-2">
                  {post.title}
                </h2>

                <div 
                  className="mt-3 text-slate-600 text-sm line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                />

                <div className="mt-auto pt-6">
                  <a 
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    Read Article 
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}