import React from 'react';
import { prisma } from '@/lib/db';
import { BroadcastClient } from './broadcast-client';

export const dynamic = 'force-dynamic';

export default async function EPaperBroadcaster() {
  const epapers = await prisma.ePaper.findMany({
    orderBy: { date: 'desc' },
    take: 10
  });

  const formattedEditions = epapers.map(e => ({
    id: e.id,
    title: e.title,
    date: e.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }));

  return <BroadcastClient editions={formattedEditions} />;
}
