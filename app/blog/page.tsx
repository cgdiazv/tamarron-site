import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: "Do You Need a Permit to Build a Patio in Katy, TX? Here’s What Homeowners Should Know",
    excerpt: "Do You Need a Permit to Build a Patio in Katy, TX? Here’s What Homeowners Should Know If you are thinking about building a patio",
    date: "May 11, 2026",
    image: "/blog-permit.jpg",
    slug: "permit-to-build-patio-katy-tx",
    badge: "Building without permits",
    badgeSub: "can cost you more than you think"
  },
  {
    title: "Motorized Screens: Are They Worth It or Just Another Upgrade?",
    excerpt: "Motorized Screens: Are They Worth It or Just Another Upgrade? Many homeowners in Texas invest in their backyard expecting to use it more. They build",
    date: "May 11, 2026",
    image: "/blog-screens.jpg",
    slug: "motorized-screens-worth-it",
    badge: "Sun, bugs, and lack of privacy should not control",
    badgeSub: "how you use your space."
  },
  {
    title: "5 Smart Ways to Upgrade Your Backyard in Texas for Spring and Summer",
    excerpt: "5 Smart Ways to Upgrade Your Backyard in Texas for Spring and Summer Spring in Texas changes how you use your home. The weather improves,",
    date: "May 11, 2026",
    image: "/blog-upgrade.jpg",
    slug: "upgrade-backyard-texas-spring-summer",
    badge: "Stop looking at your backyard.",
    badgeSub: "Start living in it."
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER SECTION */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 uppercase tracking-tight">
            Blog
          </h1>
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="flex flex-col border border-slate-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                
                {/* Image Container with Gradient Overlays from image_2bb6b4.jpg */}
                <div className="relative h-64 w-full">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                  />
                  {/* The Blue/Black Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d6d]/90 via-[#00a4dd]/60 to-transparent flex flex-col justify-end p-6 text-center">
                    <p className="text-white font-bold text-lg leading-tight drop-shadow-md">
                      {post.badge}
                    </p>
                    <p className="text-white/90 text-xs mt-1 border border-white/30 rounded-full inline-block px-3 py-1 self-center">
                      {post.badgeSub}
                    </p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-[#00a4dd] font-bold text-xl leading-snug mb-4 min-h-[3.5rem]">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 flex-grow font-light">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      className="text-[#00a4dd] font-bold text-xs uppercase tracking-widest hover:text-sky-700 transition-colors"
                    >
                      Read More
                    </Link>
                    
                    <div className="pt-4 mt-6 border-t border-slate-50">
                      <p className="text-slate-400 text-[10px] md:text-xs">
                        {post.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}