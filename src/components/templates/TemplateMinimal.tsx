"use client";

import React from 'react';
import { MarketTicker } from "@/components/layout/MarketTicker";
import { NewsCard } from "@/components/ui/NewsCards";
import { DollarSign, Star, TrendingUp, Info } from "lucide-react";
import Link from "next/link";

export default function TemplateMinimal({ data }: { data: any }) {
  const { heroArticles, latestArticles, trending, siteSettings } = data;
  
  // Mock Box Office Data for Premium Widget
  const boxOffice = [
    { title: "Tillu Square", total: "$2.8M", status: "HIT" },
    { title: "Family Star", total: "$1.2M", status: "AVG" },
    { title: "The GOAT Life", total: "$0.9M", status: "HIT" },
    { title: "Manjummel Boys", total: "$4.5M", status: "BLOCKBUSTER" },
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      <MarketTicker />

      {/* Premium Box Office Ticker */}
      <div className="bg-gray-50 border-y border-gray-100 py-3">
         <div className="container mx-auto px-4 flex items-center overflow-x-auto no-scrollbar scrollbar-hide space-x-8">
            <div className="flex items-center space-x-2 flex-shrink-0 border-r border-gray-200 pr-8">
               <DollarSign className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black tracking-widest text-secondary">U.S. BOX OFFICE</span>
            </div>
            {boxOffice.map((movie) => (
               <div key={movie.title} className="flex items-center space-x-3 flex-shrink-0">
                  <span className="text-xs font-bold text-gray-800">{movie.title}</span>
                  <span className="text-[10px] font-black text-primary">{movie.total}</span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${movie.status === 'BLOCKBUSTER' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {movie.status}
                  </span>
               </div>
            ))}
         </div>
      </div>

      {/* Premium Hero Style */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Featured Large Card */}
          <div className="lg:col-span-7">
             {heroArticles[0] && (
               <div className="group cursor-pointer space-y-6">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-primary/10">
                     <img src={heroArticles[0].featuredImage || "/placeholder.jpg"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Feature" />
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center space-x-3">
                        <span className="text-primary font-black text-xs tracking-widest uppercase">{heroArticles[0].category.name}</span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-gray-400 text-xs font-medium">{heroArticles[0].publishedAt?.toLocaleDateString('te-IN')}</span>
                     </div>
                     <h1 className="text-3xl md:text-5xl font-black telugu-text leading-tight tracking-tight group-hover:text-primary transition-colors">
                        {heroArticles[0].title}
                     </h1>
                     <p className="text-gray-600 text-lg telugu-text leading-relaxed line-clamp-3">
                        {heroArticles[0].excerpt}
                     </p>
                  </div>
               </div>
             )}
          </div>

          {/* Premium Sidebar Area */}
          <div className="lg:col-span-5 space-y-12">
             <div>
                <h3 className="text-sm font-black mb-8 flex items-center space-x-2 tracking-widest text-secondary">
                   <Star className="w-4 h-4 text-primary" />
                   <span>REVIEWS & RATINGS</span>
                </h3>
                <div className="space-y-8">
                   {latestArticles.slice(1, 4).map((article: any) => (
                     <Link key={article.id} href={`/news/${article.slug}`} className="flex space-x-6 group">
                        <div className="w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                           <img src={article.featuredImage || "/placeholder.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-sm font-bold telugu-text leading-snug group-hover:text-primary transition-colors line-clamp-2">
                             {article.title}
                           </h4>
                           <div className="flex items-center space-x-1">
                              {[1,2,3,4].map(i => <Star key={i} className="w-2 h-2 fill-primary text-primary" />)}
                              <Star className="w-2 h-2 text-gray-300" />
                           </div>
                        </div>
                     </Link>
                   ))}
                </div>
             </div>

             <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h3 className="text-xs font-black mb-6 tracking-widest flex items-center space-x-2">
                   <TrendingUp className="w-4 h-4 text-primary" />
                   <span>MOST READ TODAY</span>
                </h3>
                <div className="space-y-6">
                   {trending.slice(0, 5).map((article: any, i: number) => (
                     <Link key={article.id} href={`/news/${article.slug}`} className="flex items-start space-x-4 group">
                        <span className="text-2xl font-black text-gray-200 group-hover:text-primary transition-colors">0{i+1}</span>
                        <p className="text-sm font-bold telugu-text leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </p>
                     </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-16 border-t border-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {latestArticles.slice(4, 12).map((article: any) => (
             <NewsCard 
               key={article.id}
               title={article.title}
               category={article.category.name}
               image={article.featuredImage}
               date={article.publishedAt?.toLocaleDateString('te-IN')}
               href={`/news/${article.slug}`}
             />
           ))}
        </div>
      </section>
    </main>
  );
}
