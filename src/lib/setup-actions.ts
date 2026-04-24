"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

/**
 * Initializes the Portal Branding
 */
export async function initializeBranding(formData: FormData) {
  const portalName = formData.get("portalName") as string;
  const tagline = formData.get("tagline") as string;
  const contactEmail = formData.get("contactEmail") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const address = formData.get("address") as string;

  await prisma.siteSettings.upsert({
    where: { id: "default" }, // Using a fixed ID for the singleton settings
    update: { portalName, tagline, contactEmail, contactPhone, address },
    create: { id: "default", portalName, tagline, contactEmail, contactPhone, address },
  });

  revalidatePath("/");
  return { success: true };
}

/**
 * Creates the Root Admin Account
 */
export async function createRootAdmin(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return { success: true };
}

/**
 * Finalizes the Setup
 */
export async function finalizeSetup() {
  await prisma.siteSettings.update({
    where: { id: "default" },
    data: { isSetupComplete: true },
  });

  revalidatePath("/");
  return { success: true };
}
