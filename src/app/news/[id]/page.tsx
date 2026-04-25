import React from 'react';
import { 
  Calendar, 
  User, 
  Share2, 
  MessageSquare, 
  Bookmark, 
  TrendingUp,
  Clock,
  Send,
  Type,
  Plus,
  Minus,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { AdBanner } from '@/components/ads/AdBanner';
import { LiveBlog } from '@/components/ui/LiveBlog';

import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function ArticleDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Fetch article
  const article = await prisma.article.findUnique({
    where: { slug: id },
    include: { 
      author: true, 
      category: true, 
      tags: true,
      liveUpdates: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!article) {
    notFound();
  }

  // Increment view count (in background)
  prisma.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } }
  }).catch(console.error);

  // Fetch trending articles
  const trendingArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { viewCount: 'desc' },
    take: 4
  });

  const articleData = {
    headline: article.title,
    image: article.featuredImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&h=800&auto=format&fit=crop",
    datePublished: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    authorName: article.author?.name || "Editorial Team",
    category: article.category?.name || "News",
    content: article.content
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <JsonLd 
        type="NewsArticle" 
        data={{
          headline: articleData.headline,
          image: [articleData.image],
          datePublished: articleData.datePublished,
          dateModified: articleData.dateModified,
          author: {
            "@type": "Person",
            "name": articleData.authorName
          }
        }}
      />
      
      {/* Top Ad Space */}
      <div className="max-w-screen-xl mx-auto py-4 px-4">
        <AdBanner 
          slot="article-top" 
          zone="HEADER"
          className="w-full h-24"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-10 space-y-8">
            {/* Header Metadata */}
            <div className="space-y-4">
              <Link href="/category/politics" className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {articleData.category}
              </Link>
              <h1 className="telugu-text text-3xl md:text-5xl font-black leading-tight text-gray-900">
                {articleData.headline}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-xs font-bold border-y border-gray-50 py-4 uppercase tracking-tighter">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>By {articleData.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>April 23, 2026</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>5 Min Read</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 normal-case ml-auto">
                  <Type className="w-3.5 h-3.5 text-gray-400" />
                  <button className="p-1 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                  <button className="p-1 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={articleData.image} 
                alt={articleData.headline} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Live Blog Updates (If any) */}
            {article.liveUpdates.length > 0 && (
              <div className="pt-4">
                <LiveBlog 
                  updates={article.liveUpdates.map(u => ({
                    time: new Date(u.createdAt).toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' }),
                    content: u.content,
                    isImportant: u.isImportant
                  }))} 
                />
              </div>
            )}

            {/* Content Body */}
            <div className="telugu-text text-xl leading-relaxed text-gray-800 space-y-6 first-letter:text-5xl first-letter:font-black first-letter:text-primary whitespace-pre-wrap">
              {articleData.content}

              {/* In-Article Ad Space */}
              <div className="my-8">
                <AdBanner 
                  slot="article-middle" 
                  zone="IN_ARTICLE"
                  className="w-full min-h-[250px]"
                />
              </div>
            </div>

            {/* Tags & Interaction */}
            <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {['Telangana', 'Politics', 'Elections', 'Strategy'].map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
                  <Globe className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all">
                  <Send className="w-4 h-4" />
                  <span>Tweet</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Sidebar Ad */}
          <div className="w-full min-h-[600px] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
             <AdBanner 
               slot="article-sidebar" 
               zone="SIDEBAR"
               className="w-full h-full min-h-[600px]"
             />
          </div>

          {/* Trending News */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
             <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2 mb-6 border-b border-gray-50 pb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Trending Now</span>
             </h3>
             <div className="space-y-6">
                {trendingArticles.map((trending, i) => (
                  <Link key={trending.id} href={`/news/${trending.slug}`} className="flex items-start space-x-4 group">
                    <span className="text-3xl font-black text-gray-100 group-hover:text-primary transition-colors leading-none">0{i+1}</span>
                    <div>
                       <h4 className="telugu-text text-sm font-bold line-clamp-2 leading-relaxed text-gray-800 group-hover:text-primary transition-colors">
                          {trending.title}
                       </h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                         {new Date(trending.publishedAt || trending.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                       </p>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
