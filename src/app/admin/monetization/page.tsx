import React from 'react';
import { prisma } from '@/lib/db';
import { MonetizationClient } from './monetization-client';

export const dynamic = 'force-dynamic';

export default async function MonetizationPage() {
  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return <MonetizationClient ads={ads} />;
}
