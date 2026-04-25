import { prisma } from '@/lib/db';
import { seedElectionData } from '@/lib/election-actions';
import { ElectionClient } from './election-client';

export default async function AdminElectionEntry() {
  // Check if we need to seed
  const count = await prisma.electionResult.count();
  if (count === 0) {
    await seedElectionData();
  }

  // Fetch real data
  const [parties, constituencies] = await Promise.all([
    prisma.electionResult.findMany({
      orderBy: { leads: 'desc' }
    }),
    prisma.constituencyResult.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  return <ElectionClient parties={parties} constituencies={constituencies} />;
}
