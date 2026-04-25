"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updatePartyCount(id: string, field: "leads" | "won", delta: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.electionResult.update({
    where: { id },
    data: {
      [field]: { increment: delta }
    }
  });

  revalidatePath("/admin/elections");
  revalidatePath("/elections");
  return { success: true };
}

export async function updateConstituency(id: string, data: { candidate?: string, party?: string, leadMargin?: number, status?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.constituencyResult.update({
    where: { id },
    data
  });

  revalidatePath("/admin/elections");
  revalidatePath("/elections");
  return { success: true };
}

export async function getLiveElectionResults() {
  const results = await prisma.electionResult.findMany({
    orderBy: { leads: 'desc' }
  });
  return { results };
}

export async function getLiveConstituencies(query?: string) {
  const results = await prisma.constituencyResult.findMany({
    where: query ? { name: { contains: query, mode: "insensitive" } } : undefined,
    orderBy: { name: 'asc' }
  });
  return { results };
}

// Seed helper
export async function seedElectionData() {
  const count = await prisma.electionResult.count();
  if (count === 0) {
    await prisma.electionResult.createMany({
      data: [
        { partyName: "TDP+", partyColor: "bg-yellow-500", leads: 85, won: 20, total: 175, electionYear: 2026 },
        { partyName: "YSRCP", partyColor: "bg-blue-600", leads: 45, won: 10, total: 175, electionYear: 2026 },
        { partyName: "INC", partyColor: "bg-green-600", leads: 10, won: 2, total: 175, electionYear: 2026 },
      ]
    });
    
    await prisma.constituencyResult.createMany({
      data: [
        { name: "Vizag North", candidate: "Candidate A", party: "TDP+", leadMargin: 12500, status: "LEADING" },
        { name: "Vizag South", candidate: "Candidate B", party: "YSRCP", leadMargin: 800, status: "LEADING" },
        { name: "Gajuwaka", candidate: "Candidate C", party: "TDP+", leadMargin: 25000, status: "WON" },
      ]
    });
  }
  revalidatePath("/admin/elections");
}
