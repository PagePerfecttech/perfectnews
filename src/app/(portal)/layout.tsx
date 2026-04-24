import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BreakingNews } from "@/components/layout/BreakingNews";
import { LiveTVPlayer } from "@/components/layout/LiveTVPlayer";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BreakingNews />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <LiveTVPlayer />
    </div>
  );
}
