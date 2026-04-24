"use server";

import { prisma } from "./db";

export async function getActiveAds(zone: string) {
  return await prisma.advertisement.findMany({
    where: {
      isActive: true,
      zone: zone,
      OR: [
        { endDate: null },
        { endDate: { gt: new Date() } }
      ]
    }
  });
}

export async function createAd(data: {
  name: string;
  type: string;
  content: string;
  zone: string;
  link?: string;
}) {
  return await prisma.advertisement.create({
    data: {
      name: data.name,
      type: data.type,
      content: data.content,
      zone: data.zone,
      link: data.link,
      isActive: true
    }
  });
}

export async function toggleAdStatus(id: string, status: boolean) {
  return await prisma.advertisement.update({
    where: { id },
    data: { isActive: status }
  });
}
