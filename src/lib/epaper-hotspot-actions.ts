"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveHotspots(pageId: string, hotspots: Array<{ x: number, y: number, width: number, height: number, articleUrl: string }>) {
  // First, delete existing hotspots for this page
  await prisma.ePaperHotspot.deleteMany({
    where: { pageId }
  });

  // Then create new ones
  if (hotspots.length > 0) {
    await prisma.ePaperHotspot.createMany({
      data: hotspots.map(h => ({
        pageId,
        x: h.x,
        y: h.y,
        width: h.width,
        height: h.height,
        articleUrl: h.articleUrl
      }))
    });
  }

  revalidatePath("/admin/epaper");
  revalidatePath("/epaper");
  return { success: true };
}

export async function getEPaperPages(epaperId: string) {
  return prisma.ePaperPage.findMany({
    where: { epaperId },
    include: { hotspots: true },
    orderBy: { pageNumber: 'asc' }
  });
}
