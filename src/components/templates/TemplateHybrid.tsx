"use client";

import React from 'react';
import { MarketTicker } from "@/components/layout/MarketTicker";
import { HeroCard, NewsCard, ShortsCard } from "@/components/ui/NewsCards";
import { NewsPoll } from "@/components/ui/NewsPoll";
import { Newsletter } from "@/components/ui/Newsletter";
import { ChevronRight, PlayCircle, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function TemplateHybrid({ data }: { data: any }) {
  const { heroArticles, latestArticles, trending, siteSettings } = data;
  const primaryColor = siteSettings?.primaryColor || "#E30613";

  return (
    <main className="min-h-screen bg-white">
      <MarketTicker />

      {/* TV9 Style Hero Grid */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Lead (TV9 Large Overlay) */}
          <div className="lg:col-span-2 row-span-2">
            {heroArticles[0] && (
              <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden group cursor-pointer shadow-xl">
                <img 
                  src={heroArticles[0].featuredImage} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Lead"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6 space-y-3">
                  <span className="bg-primary px-3 py-1 text-[10px] font-black text-white rounded uppercase tracking-widest">
                    {heroArticles[0].category.name}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-black text-white telugu-text leading-tight group-hover:text-primary transition-colors">
                    {heroArticles[0].title}
                  </h1>
                </div>
              </div>
            )}
          </div>

          {/* Side Grid (Trending Now List) */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-black border-l-4 border-primary pl-2 flex items-center space-x-2">
               <TrendingUp className="w-4 h-4 text-primary" />
               <span>TRENDING NOW</span>
            </h3>
            <div className="space-y-4">
              {trending.slice(0, 4).map((article: any) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="block border-b border-gray-100 pb-3 group">
                  <h4 className="text-sm font-bold telugu-text group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Video Promo (TV9 Signature) */}
          <div className="lg:col-span-1">
             <div className="bg-gray-900 rounded-lg p-4 h-full flex flex-col justify-between">
                <div className="aspect-video relative rounded overflow-hidden mb-4">
                   <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=400&auto=format" className="w-full h-full object-cover opacity-50" />
                   <PlayCircle className="absolute inset-0 m-auto text-white w-12 h-12" />
                </div>
                <h4 className="text-white text-xs font-black uppercase mb-2">Watch Live TV</h4>
                <p className="text-gray-400 text-[10px] leading-relaxed">Stay updated with the latest Telugu news around the clock with TV9's premium live coverage.</p>
                <button className="mt-4 w-full py-2 bg-primary text-white font-black text-[10px] rounded hover:bg-red-700 transition-all uppercase tracking-widest">
                   Join Live Stream
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Major News Grid (TV9 Style Rows) */}
      <section className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="flex items-center space-x-4 mb-10">
           <div className="h-px bg-gray-200 flex-1" />
           <h2 className="text-3xl font-black italic tracking-tighter text-secondary">MAJOR NEWS</h2>
           <div className="h-px bg-gray-200 flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {latestArticles.slice(0, 6).map((article: any) => (
             <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="relative aspect-video">
                   <img src={article.featuredImage} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-2 py-1 text-[10px] font-bold rounded">
                      {article.category.name}
                   </div>
                </div>
                <div className="p-6 space-y-3">
                   <h3 className="telugu-text font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                   </h3>
                   <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{article.publishedAt?.toLocaleDateString('te-IN')}</span>
                      <Link href={`/news/${article.slug}`} className="text-primary text-[10px] font-black uppercase hover:underline">Read Full Story</Link>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Ads & Engagement */}
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2">
            <NewsPoll />
         </div>
         <div className="lg:col-span-1">
            <Newsletter />
         </div>
      </section>
    </main>
  );
}
