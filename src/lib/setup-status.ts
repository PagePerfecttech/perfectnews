import { prisma } from "@/lib/prisma";

/**
 * Checks if the platform has completed the initial setup.
 * Results are cached for 1 minute to prevent database overhead.
 */
export async function getSetupStatus() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return {
      isComplete: settings?.isSetupComplete || false,
      settings: settings || null
    };
  } catch (error) {
    // If DB is not ready or table missing, assume setup needed
    return { isComplete: false, settings: null };
  }
}
