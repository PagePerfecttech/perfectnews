"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { DEFAULT_CATEGORIES } from "@/config/site";
import { redirect } from "next/navigation";

export async function saveArticle(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const status = formData.get("status") as "DRAFT" | "PENDING" | "PUBLISHED";
  const isBreaking = formData.get("isBreaking") === "on";
  const isTrending = formData.get("isTrending") === "on";
  const featuredImage = formData.get("featuredImage") as string || null;

  if (!title || !content || !categoryId) {
    throw new Error("Missing required fields");
  }

  const catInfo = DEFAULT_CATEGORIES.find((c) => c.id === categoryId);
  if (!catInfo) {
    throw new Error("Invalid category");
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    throw new Error("User not found");
  }

  // Generate a basic slug
  const slug = `article-${Date.now()}`;

  await prisma.article.create({
    data: {
      title,
      content,
      slug,
      status,
      isBreaking,
      isTrending,
      featuredImage,
      author: { connect: { id: user.id } },
      category: {
        connectOrCreate: {
          where: { slug: catInfo.slug },
          create: {
            id: catInfo.id,
            name: catInfo.label,
            slug: catInfo.slug,
          }
        }
      },
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    }
  });

  revalidatePath("/admin/news");
  revalidatePath("/");
  
  redirect("/admin/news");
}
