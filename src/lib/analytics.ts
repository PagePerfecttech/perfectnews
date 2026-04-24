"use server";

import { prisma } from "./db";

export async function getAnalyticsData() {
  // 1. Fetch total views
  const articles = await prisma.article.findMany({
    select: { viewCount: true, categoryId: true, publishedAt: true }
  });

  const totalViews = articles.reduce((acc, curr) => acc + curr.viewCount, 0);

  // 2. Fetch top 5 viral articles
  const topArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { viewCount: 'desc' },
    take: 5,
    include: { category: true }
  });

  // 3. Category distribution
  const categoryStats = await prisma.category.findMany({
    include: {
      _count: {
        select: { articles: true }
      }
    }
  });

  return {
    totalViews,
    topArticles,
    categoryStats: categoryStats.map(c => ({
      name: c.name,
      count: c._count.articles
    })),
    liveReaders: Math.floor(Math.random() * 500) + 100 // Simulated for now
  };
}
