import { MarketTicker } from "@/components/layout/MarketTicker";
import { HeroCard, NewsCard, ShortsCard } from "@/components/ui/NewsCards";
import { NewsPoll } from "@/components/ui/NewsPoll";
import { Newsletter } from "@/components/ui/Newsletter";
import { ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { getHomepageData } from "@/lib/actions";
import { seedDemoData } from "@/lib/demo-seeder";

import TemplateHybrid from "@/components/templates/TemplateHybrid";
import TemplateSlider from "@/components/templates/TemplateSlider";
import TemplateDynamic from "@/components/templates/TemplateDynamic";
import TemplateMinimal from "@/components/templates/TemplateMinimal";

export default async function Home({ searchParams }: { searchParams: Promise<{ template?: string }> }) {
  let data = await getHomepageData();
  
  // Auto-seed if database is empty to show full UI/UX
  if (data.latestArticles.length === 0) {
    await seedDemoData();
    data = await getHomepageData();
  }

  const { heroArticles, latestArticles, breakingNews, trending, siteSettings } = data;
  const params = await searchParams;
  const hero = heroArticles[0];

  // Dynamic Template Router (with preview override)
  const currentTemplate = params.template || (siteSettings as any)?.template || "HYBRID";
  if (currentTemplate === "HYBRID") return <TemplateHybrid data={data} />;
  if (currentTemplate === "SLIDER") return <TemplateSlider data={data} />;
  if (currentTemplate === "DYNAMIC") return <TemplateDynamic data={data} />;
  if (currentTemplate === "MINIMAL") return <TemplateMinimal data={data} />;

  return (
    <main className="min-h-screen bg-[#F8F9FA]">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {hero ? (
              <HeroCard 
                title={hero.title}
                category={hero.category.name}
                image={hero.featuredImage || "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop"}
                date={hero.publishedAt?.toLocaleDateString('te-IN') || "ఇప్పుడే"}
                href={`/news/${hero.slug}`}
                priority={true}
              />
            ) : (
              <div className="bg-gray-200 aspect-video rounded-3xl animate-pulse flex items-center justify-center font-bold text-gray-400">
                LOADING LATEST HERO...
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-6">
            <h2 className="text-xl font-black border-l-4 border-primary pl-3 uppercase">ముఖ్య వార్తలు</h2>
            <div className="space-y-6">
              {latestArticles.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="flex space-x-4 group cursor-pointer">
                  <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={article.featuredImage || `https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=200&h=200&auto=format&fit=crop`} 
                      alt={article.title} 
                      className="object-cover w-full h-full transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="telugu-text text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">
                      {article.publishedAt?.toLocaleDateString('te-IN') || "ఇప్పుడే"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shorts / Vertical News Section */}
      <section className="bg-secondary py-12 mb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <PlayCircle className="text-white w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">SHORTS</h2>
            </div>
            <Link href="#" className="text-primary text-sm font-bold flex items-center">
              VIEW ALL <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ShortsCard 
                key={i}
                title="సినిమా ఇండస్ట్రీలో విషాదం - ప్రముఖ నటుడు కన్నుమూత"
                image={`https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=400&h=700&auto=format&fit=crop`}
                href="#"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 border-b-2 border-gray-100 pb-2">
          <h2 className="text-2xl font-black border-b-4 border-primary pb-2 -mb-[10px] uppercase">తాజా వార్తలు</h2>
          <Link href="#" className="text-primary text-sm font-bold hover:underline uppercase">VIEW ALL</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestArticles.map((article) => (
            <NewsCard 
              key={article.id}
              title={article.title}
              category={article.category.name}
              image={article.featuredImage || `https://images.unsplash.com/photo-1531415074941-03f6ad8899ac?q=80&w=600&auto=format&fit=crop`}
              date={article.publishedAt?.toLocaleDateString('te-IN') || "ఇప్పుడే"}
              href={`/news/${article.slug}`}
            />
          ))}
        </div>
      </section>

      {/* Ad Placement Example */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gray-200 w-full h-[120px] md:h-[200px] flex items-center justify-center text-gray-500 font-bold border-2 border-dashed border-gray-300 rounded-xl uppercase">
           ADVERTISEMENT SPACE (LEADERBOARD)
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
               <h2 className="text-2xl font-black mb-8 border-l-4 border-primary pl-4 uppercase">వీడియోలు</h2>
               <div className="aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl group cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop" 
                    alt="video" 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="text-white w-10 h-10" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="telugu-text text-2xl font-bold text-white shadow-sm">లైవ్: ఆంధ్రప్రదేశ్ కేబినెట్ భేటీ - ముఖ్యాంశాలు</h3>
                  </div>
               </div>
            </div>
            <div className="space-y-6">
               <h2 className="text-2xl font-black mb-8 border-l-4 border-primary pl-4 uppercase">ట్రెండింగ్</h2>
               <div className="space-y-4">
                  {trending.map((article, i) => (
                    <Link key={article.id} href={`/news/${article.slug}`} className="flex items-start space-x-4 p-4 hover:bg-white hover:shadow-md rounded-xl transition-all cursor-pointer group">
                      <span className="text-3xl font-black text-gray-200 group-hover:text-primary transition-colors">0{i+1}</span>
                      <p className="telugu-text text-sm font-bold leading-snug">
                        {article.title}
                      </p>
                    </Link>
                  ))}
               </div>
               <div className="pt-8">
                  <NewsPoll />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Newsletter />
      </section>
    </main>
  );
}
