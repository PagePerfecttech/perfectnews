"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserRole(id: string, role: "ADMIN" | "EDITOR" | "REPORTER") {
  await prisma.user.update({
    where: { id },
    data: { role }
  });
  
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id }
  });
  
  revalidatePath("/admin/users");
  return { success: true };
}

// Helper to seed a dummy user for the demo if none exist
export async function seedUsers() {
  const count = await prisma.user.count();
  if (count === 0) {
    await prisma.user.createMany({
      data: [
        { name: "Admin User", email: "admin@perfectnews.com", role: "ADMIN" },
        { name: "Editor Desk", email: "editor@perfectnews.com", role: "EDITOR" },
        { name: "Field Reporter", email: "reporter@perfectnews.com", role: "REPORTER" },
      ]
    });
  }
}
