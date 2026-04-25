"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addLiveUpdate(articleId: string, content: string, isImportant: boolean = false) {
  try {
    await prisma.liveUpdate.create({
      data: {
        articleId,
        content,
        isImportant
      }
    });
    
    revalidatePath(`/news/${articleId}`);
    revalidatePath(`/admin/articles/${articleId}/live`);
    return { success: true };
  } catch (error) {
    console.error("Failed to add live update:", error);
    return { success: false, error: "Failed to add update" };
  }
}

export async function deleteLiveUpdate(id: string, articleId: string) {
  try {
    await prisma.liveUpdate.delete({
      where: { id }
    });
    
    revalidatePath(`/news/${articleId}`);
    revalidatePath(`/admin/articles/${articleId}/live`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete live update:", error);
    return { success: false, error: "Failed to delete update" };
  }
}
