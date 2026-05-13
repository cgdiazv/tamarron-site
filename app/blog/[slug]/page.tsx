import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Define TypeScript Interfaces
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

// 2. Data Fetching Logic (Server Component)
async function getPosts(): Promise<WordPressPost[]> {
  const endpoint = process.env.WORDPRESS_API_URL;

  if (!endpoint) {
    throw new Error("WORDPRESS_API_URL is missing in .env.local");
  }

  const query = `
    query GetLatestPosts {
      posts(first: 12, where: { orderby: { field: DATE, order: DESC } }) {
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

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // ISR: Refresh data every minute
    });

    const json: GraphQLResponse = await res.json();
    return json.data.posts.nodes;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

// 3. The Main Page Component
export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dynamic Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-[#419FDA]">Insights</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
            Stay up to date with our latest projects, maintenance tips, and industry 
            resources directly from the Tamarron Services team.
          </p>
        </div>
      </section>

      {/* Responsive Blog Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article 
                key={post.slug} 
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Featured Image with Aspect Ratio container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  {post.featuredImage ? (
                    <Image 
                      src={post.featuredImage.node.sourceUrl} 
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 italic">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-[2px] bg-[#419FDA]"></span>
                    <time className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-900 line-clamp-2 group-hover:text-[#419FDA] transition-colors">
                    {post.title}
                  </h2>

                  <div 
                    className="mt-4 text-slate-600 text-sm line-clamp-3 leading-relaxed prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }} 
                  />

                  <div className="mt-auto pt-8">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center font-bold text-sm text-[#419FDA] hover:text-blue-800 transition-colors gap-2"
                    >
                      READ FULL ARTICLE
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-xl text-slate-400">No posts found. Please check your WordPress connection.</h3>
          </div>
        )}
      </main>
    </div>
  );
}