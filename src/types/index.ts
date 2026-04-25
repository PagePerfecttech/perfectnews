/**
 * Shared TypeScript interfaces for the Perfect News platform.
 * Every component, template, and action should import from here.
 * No `any` types allowed outside this file.
 */

import type { Article, Category, User, SiteSettings, Tag } from "@prisma/client";

// ─── Article with Relations ───────────────────────────────────────────────────

export interface ArticleWithCategory extends Article {
  category: Category;
}

export interface ArticleWithAuthor extends Article {
  author: Pick<User, "id" | "name" | "image">;
  category: Category;
  tags?: Tag[];
}

// ─── Homepage Data Shape ──────────────────────────────────────────────────────

export interface HomepageData {
  heroArticles: ArticleWithCategory[];
  latestArticles: ArticleWithCategory[];
  breakingNews: Article[];
  trending: Article[];
  siteSettings: SiteSettings | null;
}

// ─── Admin Dashboard Stats ────────────────────────────────────────────────────

export interface DashboardStats {
  totalViews: number;
  totalArticles: number;
  pendingReview: number;
  todayViews: number;
  recentArticles: ArticleWithAuthor[];
}

// ─── Site Config (replaces hardcoded siteConfig) ──────────────────────────────

export interface SiteInfo {
  name: string;
  tagline: string;
  description?: string;
  primaryColor: string;
  contactEmail: string;
  contactPhone: string;
  template: string;
  theme: string;
  categories: CategoryItem[];
  socials: SocialLinks;
  liveTvUrl?: string;
  marketTicker?: {
    weather?: string;
    gold?: string;
    sensex?: string;
    usdInr?: string;
  };
}

export interface CategoryItem {
  id: string;
  slug: string;
  label: string;
}

export interface SocialLinks {
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

// ─── Component Props ──────────────────────────────────────────────────────────

export interface NewsCardProps {
  title: string;
  category: string;
  image: string;
  excerpt?: string;
  date: string;
  href: string;
  priority?: boolean;
}
