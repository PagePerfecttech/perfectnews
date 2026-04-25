"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createAdvertisement(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const name = formData.get("name") as string || "New Campaign";
  const zone = formData.get("zone") as string || "HEADER";
  const type = formData.get("type") as string || "IMAGE";
  const content = formData.get("content") as string || "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=800&q=80";
  const link = formData.get("link") as string || "https://example.com";

  await prisma.advertisement.create({
    data: {
      name,
      zone,
      type,
      content,
      link,
      isActive: true,
    }
  });

  revalidatePath("/admin/monetization");
  return { success: true };
}

export async function deleteAdvertisement(id: string) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.advertisement.delete({
    where: { id }
  });

  revalidatePath("/admin/monetization");
  return { success: true };
}
