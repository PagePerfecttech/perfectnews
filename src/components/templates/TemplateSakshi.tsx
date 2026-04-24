"use client";

import React, { useState } from 'react';
import { MarketTicker } from "@/components/layout/MarketTicker";
import { HeroCard, NewsCard } from "@/components/ui/NewsCards";
import { TrendingUp, Clock, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TemplateSakshi({ data }: { data: any }) {
  const { heroArticles, latestArticles, trending, siteSettings } = data;
  const [activeHero, setActiveHero] = useState(0);
  const [sidebarTab, setSidebarTab] = useState('latest');

  const currentHero = heroArticles[activeHero] || heroArticles[0];

  return (
    <main className="min-h-screen bg-[#F0F2F5]">
      <MarketTicker />

      {/* Sakshi Style Header Banner (Ad Space) */}
      <div className="container mx-auto px-4 py-4 hidden md:block">
         <div className="w-full h-[90px] bg-white border border-gray-200 rounded flex items-center justify-center text-gray-400 font-bold text-xs uppercase italic">
            Top Banner Advertisement Space
         </div>
      </div>

      {/* Main Hero Wrapper */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Slider (Sakshi Style) */}
          <div className="lg:col-span-8 space-y-4">
             {currentHero && (
               <div className="relative aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-2xl group">
                  <img src={currentHero.featuredImage} className="w-full h-full object-cover opacity-80" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Slider Controls */}
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <button 
                      onClick={() => setActiveHero((prev) => (prev > 0 ? prev - 1 : heroArticles.length - 1))}
                      className="p-2 bg-black/50 text-white rounded-full hover:bg-primary transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <button 
                      onClick={() => setActiveHero((prev) => (prev < heroArticles.length - 1 ? prev + 1 : 0))}
                      className="p-2 bg-black/50 text-white rounded-full hover:bg-primary transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight />
                    </button>
                  </div>

                  <div className="absolute bottom-0 p-8 space-y-4">
                     <div className="flex space-x-2">
                        {heroArticles.map((_: any, i: number) => (
                           <div key={i} className={`h-1 rounded-full transition-all ${i === activeHero ? 'w-8 bg-primary' : 'w-4 bg-white/50'}`} />
                        ))}
                     </div>
                     <span className="inline-block bg-primary text-white text-[10px] font-black px-2 py-1 rounded">
                        {currentHero.category.name.toUpperCase()}
                     </span>
                     <h1 className="text-white telugu-text text-2xl md:text-4xl font-bold leading-tight">
                        {currentHero.title}
                     </h1>
                  </div>
               </div>
             )}
          </div>

          {/* Sakshi Style Tabbed Sidebar */}
          <div className="lg:col-span-4 flex flex-col">
             <div className="bg-white rounded-t-lg border-b border-gray-100 flex overflow-hidden">
                <button 
                  onClick={() => setSidebarTab('latest')}
                  className={`flex-1 py-4 text-[10px] font-black flex items-center justify-center space-x-2 transition-all ${sidebarTab === 'latest' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                   <Clock className="w-3 h-3" />
                   <span>LATEST NEWS</span>
                </button>
                <button 
                  onClick={() => setSidebarTab('trending')}
                  className={`flex-1 py-4 text-[10px] font-black flex items-center justify-center space-x-2 transition-all ${sidebarTab === 'trending' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                   <Flame className="w-3 h-3" />
                   <span>POPULAR</span>
                </button>
             </div>
             <div className="bg-white rounded-b-lg shadow-sm flex-1 p-4 overflow-y-auto max-h-[500px] scrollbar-hide no-scrollbar">
                {(sidebarTab === 'latest' ? latestArticles : trending).map((article: any, i: number) => (
                  <Link key={article.id} href={`/news/${article.slug}`} className="flex items-start space-x-3 py-3 border-b border-gray-50 last:border-0 group">
                    <span className="text-xl font-black text-gray-200 mt-1">0{i+1}</span>
                    <h4 className="text-sm font-bold telugu-text leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold border-l-8 border-primary pl-4 text-secondary italic">NEWS FEED</h2>
           <Link href="/news" className="text-primary font-black text-[10px] tracking-widest hover:underline uppercase">Browse Categories</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {latestArticles.slice(0, 8).map((article: any) => (
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
