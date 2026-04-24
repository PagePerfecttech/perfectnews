"use client";

import React from 'react';
import { MarketTicker } from "@/components/layout/MarketTicker";
import { NewsCard, ShortsCard } from "@/components/ui/NewsCards";
import { Hash, PlayCircle, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function Template10TV({ data }: { data: any }) {
  const { heroArticles, latestArticles, trending, siteSettings } = data;
  
  // Trending Topics for Hashtag Navigation (Mocked from Category names)
  const trendingTags = ["IPL2024", "TelanganaPolitics", "AndhraPradesh", "Entertainment", "Technology"];

  return (
    <main className="min-h-screen bg-white">
      {/* 10TV Red/Black Top Ticker */}
      <div className="bg-black text-white py-2">
         <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
               <span className="bg-primary px-2 py-0.5 text-[10px] font-black italic rounded animate-pulse">FLASH</span>
               <div className="text-[10px] font-bold text-gray-300 truncate max-w-[300px] md:max-w-none">
                  {latestArticles[0]?.title}
               </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
               {trendingTags.map(tag => (
                 <Link key={tag} href="#" className="text-[9px] font-black text-gray-500 hover:text-white transition-colors flex items-center">
                    <Hash className="w-3 h-3 mr-1 text-primary" />
                    {tag.toUpperCase()}
                 </Link>
               ))}
            </div>
         </div>
      </div>

      <MarketTicker />

      {/* 10TV Style Multi-Grid Hero */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main 2-Stack Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
             {heroArticles.slice(0, 2).map((article: any) => (
               <div key={article.id} className="group cursor-pointer space-y-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                     <img src={article.featuredImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="space-y-2">
                     <span className="text-primary font-black text-[10px] uppercase tracking-tighter italic">
                        {article.category.name}
                     </span>
                     <h2 className="text-xl font-bold telugu-text leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                     </h2>
                     <p className="text-xs text-gray-500 line-clamp-2">{article.excerpt}</p>
                  </div>
               </div>
             ))}
          </div>

          {/* Right Sidebar List (10TV Bulleted Style) */}
          <div className="lg:col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-sm italic flex items-center space-x-2">
                   <TrendingUp className="w-4 h-4 text-primary" />
                   <span>MUST READ</span>
                </h3>
             </div>
             <div className="space-y-6">
                {trending.map((article: any) => (
                  <Link key={article.id} href={`/news/${article.slug}`} className="flex items-start space-x-4 group">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <h4 className="text-sm font-bold telugu-text leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                  </Link>
                ))}
             </div>
             
             <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-black rounded-xl p-4 text-center group cursor-pointer">
                   <PlayCircle className="text-primary w-10 h-10 mx-auto mb-2" />
                   <span className="text-white text-[10px] font-black uppercase tracking-widest">Live TV Coverage</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Shorts / Reels Row */}
      <section className="bg-secondary py-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-8">
             <Zap className="text-primary w-6 h-6 fill-primary" />
             <h2 className="text-2xl font-black text-white italic">REELS</h2>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-6 no-scrollbar scrollbar-hide">
            {latestArticles.slice(4, 9).map((article: any) => (
              <ShortsCard 
                key={article.id}
                title={article.title}
                image={article.featuredImage}
                href={`/news/${article.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Standard Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
