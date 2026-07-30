"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Tag } from "lucide-react"; // Import for better UI icons

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding LASIK: Is it right for you?",
    excerpt: "Everything you need to know about laser eye surgery, recovery time, and costs in India.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600",
    date: "Oct 24, 2023",
    category: "Ophthalmology",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Post-Surgery Recovery: Top 5 Tips",
    excerpt: "How to ensure a fast and safe recovery after a major surgical procedure with proper nutrition.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600",
    date: "Oct 20, 2023",
    category: "Patient Care",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Why Cashless Insurance is a Game Changer",
    excerpt: "Learn how HealviaCare simplifies the insurance claim process for all our patients.",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=600",
    date: "Oct 15, 2023",
    category: "Insurance",
    readTime: "6 min read"
  }
];

export default function BlogPageClient() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-[#F8FAFA] min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* --- BREADCRUMB --- */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-[#1D646B]">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#1D646B] font-medium">Health Insights</span>
          </nav>

          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-black text-[#1D646B] mb-4 tracking-tight">
              Health Insights
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Expert medical advice, surgical guides, and patient recovery tips from India&apos;s top specialists.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.id} 
                className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    priority={post.id === 1} // Optimize LCP for first image
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#1D646B] shadow-sm">
                    {post.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-slate-400 text-xs mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-[#1D646B] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="inline-flex items-center gap-2 text-[#1D646B] font-bold text-sm group/link"
                    >
                      Read Full Article 
                      <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}