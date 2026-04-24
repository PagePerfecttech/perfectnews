import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters (Telugu)").max(200),
  slug: z.string().min(3).max(200),
  content: z.string().min(50, "Content is too short for a news article"),
  excerpt: z.string().max(300).optional(),
  featuredImage: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PENDING", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  categoryId: z.string().cuid(),
  isBreaking: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(160).optional(),
});

export type ArticleInput = z.infer<typeof articleSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
