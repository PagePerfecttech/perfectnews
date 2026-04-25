import React from 'react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { LiveUpdateManager } from './live-update-manager';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function LiveBlogAdminPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      liveUpdates: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-10 space-y-10">
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/articles" 
          className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter text-gray-900 line-clamp-1">{article.title}</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Article ID: {article.id}</p>
        </div>
      </div>

      <LiveUpdateManager 
        articleId={article.id} 
        initialUpdates={article.liveUpdates} 
      />
    </div>
  );
}
