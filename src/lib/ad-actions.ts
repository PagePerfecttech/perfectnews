"use server";

import { prisma } from "@/lib/db";

export async function getActiveAdForZone(zone: string) {
  return prisma.advertisement.findFirst({
    where: {
      zone,
      isActive: true,
      OR: [
        { startDate: null, endDate: null },
        { startDate: { lte: new Date() }, endDate: { gte: new Date() } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
}
