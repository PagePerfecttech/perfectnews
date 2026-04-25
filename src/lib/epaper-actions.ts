"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createEpaper(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const title = formData.get("title") as string || "New Edition";
  const thumbnail = (formData.get("thumbnail") as string) || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400&h=600&auto=format&fit=crop";
  const pdfUrl = (formData.get("pdfUrl") as string) || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  
  await prisma.ePaper.create({
    data: {
      title: title,
      date: new Date(),
      thumbnail,
      pdfUrl,
    }
  });

  revalidatePath("/admin/epaper");
  return { success: true };
}

export async function deleteEpaper(id: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.ePaper.delete({
    where: { id }
  });

  revalidatePath("/admin/epaper");
  return { success: true };
}
