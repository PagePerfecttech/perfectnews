import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BreakingNews } from "@/components/layout/BreakingNews";
import { MarketTicker } from "@/components/layout/MarketTicker";
import { LiveTVPlayer } from "@/components/layout/LiveTVPlayer";
import { getSiteSettings } from "@/lib/settings";
import { getHomepageData } from "@/lib/actions";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getHomepageData();
  const siteInfo = data.siteSettings;

  return (
    <div className="flex flex-col min-h-screen">
      <Header siteInfo={siteInfo} />
      <MarketTicker tickerData={siteInfo.marketTicker} />
      <BreakingNews news={data.breakingNews} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer siteInfo={siteInfo} />
      <LiveTVPlayer liveTvUrl={siteInfo.liveTvUrl} />
    </div>
  );
}
