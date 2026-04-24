"use server";

import { prisma } from "./db";

export async function getLiveElectionResults() {
  try {
    const results = await prisma.electionResult.findMany({
      orderBy: { leads: 'desc' }
    });

    const constituencies = await prisma.constituencyResult.findMany({
      take: 10,
      orderBy: { updatedAt: 'desc' }
    });

    return {
      results,
      constituencies,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error("Failed to fetch election results", error);
    return null;
  }
}
