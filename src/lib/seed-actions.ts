"use server";

import { prisma } from "./db";
import { revalidatePath } from "next/cache";
import { ArticleStatus } from "@prisma/client";

const MOCK_CATEGORIES = [
  { name: "రాజకీయం", slug: "politics", description: "Political news and analysis" },
  { name: "వినోదం", slug: "entertainment", description: "Movies and celebrity news" },
  { name: "క్రీడలు", slug: "sports", description: "Sports updates and scores" },
  { name: "సాంకేతికం", slug: "technology", description: "Tech news and reviews" },
  { name: "ఆరోగ్యం", slug: "health", description: "Health and wellness tips" },
];

const MOCK_ARTICLES = [
  {
    title: "రాష్ట్రంలో కొత్త పారిశ్రామిక విధానం - వేల కోట్లతో పెట్టుబడులు",
    slug: "new-industrial-policy-investments",
    excerpt: "రాష్ట్ర ప్రభుత్వం ప్రతిష్టాత్మకంగా చేపట్టిన కొత్త పారిశ్రామిక విధానం ద్వారా వేల కోట్ల పెట్టుబడులు రానున్నాయి.",
    content: "<p>రాష్ట్ర ప్రభుత్వం ప్రతిష్టాత్మకంగా చేపట్టిన కొత్త పారిశ్రామిక విధానం ద్వారా వేల కోట్ల పెట్టుబడులు రానున్నాయి. దీనివల్ల లక్షలాది మంది యువతకు ఉపాధి అవకాశాలు లభిస్తాయి.</p>",
    featuredImage: "https://images.unsplash.com/photo-1541888941259-772a9dec3507?q=80&w=1200&auto=format",
    status: ArticleStatus.PUBLISHED,
    isBreaking: true,
    isTrending: false,
    categorySlug: "politics",
  },
  {
    title: "సంక్రాంతి రేసులో స్టార్ హీరోల సినిమాలు - థియేటర్ల సందడి",
    slug: "sankranthi-movies-star-heroes",
    excerpt: "ఈ ఏడాది సంక్రాంతికి పెద్ద సినిమాల తాకిడి మొదలైంది. బాక్సాఫీస్ వద్ద రికార్డుల వేట మొదలు కానుంది.",
    content: "<p>ఈ ఏడాది సంక్రాంతికి పెద్ద సినిమాల తాకిడి మొదలైంది. బాక్సాఫీస్ వద్ద రికార్డుల వేట మొదలు కానుంది. అభిమానులు తమ హీరోల సినిమాల కోసం వేచి చూస్తున్నారు.</p>",
    featuredImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format",
    status: ArticleStatus.PUBLISHED,
    isBreaking: false,
    isTrending: true,
    categorySlug: "entertainment",
  },
  {
    title: "టీమిండియా ఘన విజయం - సిరీస్ కైవసం",
    slug: "team-india-victory-series-win",
    excerpt: "నిన్న జరిగిన ఉత్కంఠభరిత పోరులో టీమిండియా అద్భుత విజయాన్ని అందుకుంది. సిరీస్ ను 3-0తో క్లీన్ స్వీప్ చేసింది.",
    content: "<p>నిన్న జరిగిన ఉత్కంఠభరిత పోరులో టీమిండియా అద్భుత విజయాన్ని అందుకుంది. సిరీస్ ను 3-0తో క్లీన్ స్వీప్ చేసింది. ప్లేయర్ ఆఫ్ ది మ్యాచ్ గా విరాట్ కోహ్లీ నిలిచాడు.</p>",
    featuredImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200&auto=format",
    status: ArticleStatus.PUBLISHED,
    isBreaking: false,
    isTrending: true,
    categorySlug: "sports",
  },
  {
    title: "AI టెక్నాలజీతో విప్లవాత్మక మార్పులు - కొత్త గ్యాడ్జెట్స్ విడుదల",
    slug: "ai-technology-revolutionary-changes",
    excerpt: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగంలో రోజురోజుకూ కొత్త ఆవిష్కరణలు వస్తున్నాయి. తాజాగా కొత్త AI ఫోన్లు మార్కెట్లోకి వచ్చాయి.",
    content: "<p>ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగంలో రోజురోజుకూ కొత్త ఆవిష్కరణలు వస్తున్నాయి. తాజాగా కొత్త AI ఫోన్లు మార్కెట్లోకి వచ్చాయి. ఇవి మానవ జీవితాన్ని మరింత సులభతరం చేస్తాయి.</p>",
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format",
    status: ArticleStatus.PUBLISHED,
    isBreaking: true,
    isTrending: false,
    categorySlug: "technology",
  },
  {
    title: "ఆరోగ్యంగా ఉండాలంటే ఈ అలవాట్లు తప్పనిసరి - నిపుణుల సూచనలు",
    slug: "healthy-habits-expert-tips",
    excerpt: "మారుతున్న జీవనశైలిలో ఆరోగ్యాన్ని కాపాడుకోవడం ఎంతో ముఖ్యం. నిపుణులు చెబుతున్న ఈ చిట్కాలు పాటించండి.",
    content: "<p>మారుతున్న జీవనశైలిలో ఆరోగ్యాన్ని కాపాడుకోవడం ఎంతో ముఖ్యం. నిపుణులు చెబుతున్న ఈ చిట్కాలు పాటించండి. ప్రతిరోజూ వ్యాయామం చేయడం, పౌష్టికాహారం తీసుకోవడం మర్చిపోకండి.</p>",
    featuredImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format",
    status: ArticleStatus.PUBLISHED,
    isBreaking: false,
    isTrending: false,
    categorySlug: "health",
  },
  {
    title: "టాలీవుడ్ లో మరో భారీ బడ్జెట్ సినిమా - అఫీషియల్ అనౌన్స్ మెంట్",
    slug: "tollywood-big-budget-movie-announcement",
    excerpt: "ప్రముఖ నిర్మాణ సంస్థ భారీ బడ్జెట్ తో కొత్త ప్రాజెక్టును ప్రకటించింది. దీనికి సంబంధించిన వివరాలు ఇక్కడ ఉన్నాయి.",
    content: "<p>ప్రముఖ నిర్మాణ సంస్థ భారీ బడ్జెట్ తో కొత్త ప్రాజెక్టును ప్రకటించింది. దీనికి సంబంధించిన వివరాలు ఇక్కడ ఉన్నాయి. త్వరలోనే షూటింగ్ ప్రారంభం కానుంది.</p>",
    featuredImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format",
    status: ArticleStatus.PUBLISHED,
    isBreaking: false,
    isTrending: true,
    categorySlug: "entertainment",
  }
];

export async function seedMockData() {
  try {
    console.log("Starting Seeding...");

    // 1. Create Categories
    for (const cat of MOCK_CATEGORIES) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
        }
      });
    }

    const categories = await prisma.category.findMany();
    const categoryMap = new Map(categories.map(c => [c.slug, c.id]));

    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    const authorId = admin?.id || "system-author";

    // 2. Create Articles
    for (const art of MOCK_ARTICLES) {
      await prisma.article.upsert({
        where: { slug: art.slug },
        update: {
          status: art.status,
          featuredImage: art.featuredImage,
          isBreaking: art.isBreaking,
          isTrending: art.isTrending,
        },
        create: {
          title: art.title,
          slug: art.slug,
          excerpt: art.excerpt,
          content: art.content,
          featuredImage: art.featuredImage,
          status: art.status,
          isBreaking: art.isBreaking,
          isTrending: art.isTrending,
          categoryId: categoryMap.get(art.categorySlug) || categories[0].id,
          authorId: authorId,
          publishedAt: new Date(),
        }
      });
    }

    console.log("Seeding Completed Successfully!");
    revalidatePath("/");
    return { success: true, message: "Mock data seeded successfully!" };
  } catch (error) {
    console.error("Seeding Failed:", error);
    return { success: false, message: "Failed to seed data." };
  }
}
