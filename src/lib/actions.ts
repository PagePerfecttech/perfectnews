"use server";

import { prisma } from "./db";
import { articleSchema, ArticleInput } from "./validations";
import { revalidatePath } from "next/cache";
import { ArticleStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import type { HomepageData } from "@/types";

import { getSiteSettings } from "./settings";

/**
 * Fetches homepage content with optimized parallel queries
 */
export async function getHomepageData(): Promise<HomepageData> {
  const [heroArticles, latestArticles, breakingNews, trending, siteSettings] = await Promise.all([
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED, deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      include: { category: true }
    }),
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED, deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      take: 12,
      include: { category: true }
    }),
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED, isBreaking: true, deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      take: 5
    }),
    prisma.article.findMany({
      where: { status: ArticleStatus.PUBLISHED, isTrending: true, deletedAt: null },
      orderBy: { viewCount: 'desc' },
      take: 5
    }),
    getSiteSettings()
  ]);

  return { heroArticles, latestArticles, breakingNews, trending, siteSettings };
}

/**
 * Securely creates or updates an article using authenticated session
 */
export async function upsertArticle(data: ArticleInput, id?: string) {
  // 1. Authenticate
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: You must be logged in to publish articles.");
  }

  // 2. Validate Input
  const validated = articleSchema.parse(data);

  // 3. Perform DB Operation
  const article = await prisma.article.upsert({
    where: { id: id || "new-id" },
    create: {
      ...validated,
      authorId: session.user.id,
      publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
    },
    update: {
      ...validated,
      publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
    }
  });

  // 4. Revalidate Cache
  revalidatePath("/");
  revalidatePath(`/news/${article.slug}`);
  
  return article;
}

/**
 * Fetches real admin dashboard statistics from the database
 */
export async function getDashboardStats() {
  const [totalArticles, pendingReview, totalViews, todayArticles, recentArticles] = await Promise.all([
    prisma.article.count({ where: { deletedAt: null } }),
    prisma.article.count({ where: { status: ArticleStatus.PENDING, deletedAt: null } }),
    prisma.article.aggregate({ _sum: { viewCount: true }, where: { deletedAt: null } }),
    prisma.article.count({
      where: {
        deletedAt: null,
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
      }
    }),
    prisma.article.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { category: true, author: { select: { id: true, name: true, image: true } } }
    }),
  ]);

  return {
    totalArticles,
    pendingReview,
    totalViews: totalViews._sum.viewCount || 0,
    todayArticles,
    recentArticles,
  };
}

/**
 * Fetches paginated articles for admin news management
 */
export async function getAdminArticles(page: number = 1, status?: string, search?: string) {
  const pageSize = 20;
  const where: Record<string, unknown> = { deletedAt: null };
  
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (search) {
    where.title = { contains: search };
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        author: { select: { id: true, name: true, image: true } },
      },
    }),
    prisma.article.count({ where }),
  ]);

  return { articles, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

