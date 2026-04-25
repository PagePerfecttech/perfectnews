"use server";

import { prisma } from "@/lib/db";

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { success: false, message: "Email is required" };

  try {
    const settingKey = "newsletter_subscribers";
    
    const existingSetting = await prisma.setting.findUnique({ where: { key: settingKey } });
    
    let subscribers: string[] = [];
    if (existingSetting) {
      subscribers = JSON.parse(existingSetting.value);
    }
    
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      
      await prisma.setting.upsert({
        where: { key: settingKey },
        update: { value: JSON.stringify(subscribers) },
        create: { key: settingKey, value: JSON.stringify(subscribers) }
      });
    }
    return { success: true };
  } catch (e) {
    console.error("Subscription Error", e);
    return { success: false, message: "Failed to subscribe" };
  }
}
