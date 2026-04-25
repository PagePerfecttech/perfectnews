import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { EPaperEditorClient } from "./editor-client";

export default async function EPaperHotspotEditor({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const resolvedParams = await searchParams;
  let epaperId = resolvedParams.id;

  // If no ID provided, try to find the latest EPaper
  if (!epaperId) {
    const latest = await prisma.ePaper.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    if (!latest) {
      return (
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold">No E-Papers Found</h2>
          <p className="text-gray-500">Please upload an E-Paper first.</p>
        </div>
      );
    }
    epaperId = latest.id;
  }

  // Fetch EPaper with Pages and Hotspots
  const epaper = await prisma.ePaper.findUnique({
    where: { id: epaperId },
    include: {
      pages: {
        orderBy: { pageNumber: 'asc' },
        include: { hotspots: true }
      }
    }
  });

  if (!epaper) {
    redirect("/admin/epaper");
  }

  return (
    <EPaperEditorClient 
      epaperTitle={epaper.title}
      pages={epaper.pages}
    />
  );
}
