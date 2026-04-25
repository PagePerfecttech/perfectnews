import { prisma } from "./db";

export async function seedDemoData() {
  // 1. Categories
  const categories = [
    { name: "ఆంధ్రప్రదేశ్", slug: "ap", description: "Andhra Pradesh News" },
    { name: "తెలంగాణ", slug: "ts", description: "Telangana News" },
    { name: "రాజకీయాలు", slug: "politics", description: "Political Analysis" },
    { name: "జాతీయ వార్తలు", slug: "national", description: "National News" },
    { name: "వినోదం", slug: "entertainment", description: "Movie & Entertainment" },
    { name: "వ్యాపారం", slug: "business", description: "Business & Economy" },
    { name: "క్రీడలు", slug: "sports", description: "Sports News" },
    { name: "ఆరోగ్యం", slug: "health", description: "Health & Lifestyle" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }

  // 2. Author (if none exists)
  let author = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!author) {
    author = await prisma.user.create({
      data: {
        name: "Admin Desk",
        email: "admin@perfectnews.com",
        role: "ADMIN"
      }
    });
  }

  // 3. Demo Articles
  const savedCategories = await prisma.category.findMany();
  
  const demoArticles = [
    {
      title: "ఏపీలో భారీ వర్షాలు: పలు జిల్లాలకు రెడ్ అలర్ట్ జారీ",
      slug: "ap-rains-red-alert-districts",
      excerpt: "బంగాళాఖాతంలో ఏర్పడిన అల్పపీడనం ప్రభావంతో ఆంధ్రప్రదేశ్ వ్యాప్తంగా భారీ వర్షాలు కురుస్తున్నాయి. రానున్న 24 గంటల్లో మరిన్ని వర్షాలు కురిసే అవకాశం ఉందని వాతావరణ శాఖ హెచ్చరించింది.",
      content: "<p>బంగాళాఖాతంలో ఏర్పడిన అల్పపీడనం ప్రభావంతో ఆంధ్రప్రదేశ్ వ్యాప్తంగా భారీ వర్షాలు కురుస్తున్నాయి. రానున్న 24 గంటల్లో మరిన్ని వర్షాలు కురిసే అవకాశం ఉందని వాతావరణ శాఖ హెచ్చరించింది. ముఖ్యంగా కోస్తా తీర ప్రాంతాల్లో గాలి వేగం పెరిగే అవకాశం ఉంది. మత్స్యకారులు వేటకు వెళ్లవద్దని అధికారులు సూచించారు.</p><p>విజయవాడ, విశాఖపట్నం, గుంటూరు జిల్లాల్లో ఇప్పటికే వాగులు, వంకలు పొంగిపొర్లుతున్నాయి. లోతట్టు ప్రాంతాల ప్రజలను సురక్షిత ప్రాంతాలకు తరలిస్తున్నారు. ప్రభుత్వం ఇప్పటికే సహాయక చర్యలను వేగవంతం చేసింది. ఎన్డీఆర్ఎఫ్ బృందాలను సిద్ధం చేశారు.</p>",
      featuredImage: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1200&auto=format&fit=crop",
      categorySlug: "ap",
      isBreaking: true
    },
    {
      title: "హైదరాబాద్‌లో కొత్త ఐటీ పార్కుకు శంకుస్థాపన చేసిన సీఎం",
      slug: "hyderabad-new-it-park-foundation",
      excerpt: "తెలంగాణ రాజధాని హైదరాబాద్‌లో మరో ప్రతిష్టాత్మక ఐటీ పార్కుకు ముఖ్యమంత్రి శంకుస్థాపన చేశారు. దీని ద్వారా వేల మంది యువతకు ఉపాధి లభించనుంది.",
      content: "<p>తెలంగాణ రాజధాని హైదరాబాద్‌లో మరో ప్రతిష్టాత్మక ఐటీ పార్కుకు ముఖ్యమంత్రి శంకుస్థాపన చేశారు. దీని ద్వారా వేల మంది యువతకు ఉపాధి లభించనుంది. సుమారు 50 ఎకరాల్లో నిర్మించనున్న ఈ పార్కులో అంతర్జాతీయ స్థాయి కంపెనీలు తమ కార్యాలయాలను ఏర్పాటు చేయనున్నాయి.</p><p>రాష్ట్రంలో ఐటీ రంగం మరింతగా అభివృద్ధి చెందేందుకు ఈ పార్కు ఎంతగానో దోహదపడుతుందని సీఎం అన్నారు. యువతకు శిక్షణ ఇచ్చేందుకు ప్రత్యేక కేంద్రాలను కూడా ఇక్కడ ఏర్పాటు చేయనున్నట్లు ఆయన తెలిపారు.</p>",
      featuredImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop",
      categorySlug: "ts",
      isTrending: true
    },
    {
      title: "భారత ఆర్థిక వ్యవస్థ వృద్ధిపై అంతర్జాతీయ ద్రవ్య నిధి (IMF) ప్రశంసలు",
      slug: "imf-praises-indian-economy-growth",
      excerpt: "ప్రపంచ ఆర్థిక అనిశ్చితి మధ్య కూడా భారత ఆర్థిక వ్యవస్థ స్థిరంగా వృద్ధి చెందుతోందని IMF తన తాజా నివేదికలో పేర్కొంది.",
      content: "<p>ప్రపంచ ఆర్థిక అనిశ్చితి మధ్య కూడా భారత ఆర్థిక వ్యవస్థ స్థిరంగా వృద్ధి చెందుతోందని IMF తన తాజా నివేదికలో పేర్కొంది. డిజిటలైజేషన్, మౌలిక సదుపాయాల కల్పనలో భారత్ తీసుకుంటున్న చర్యలు సత్ఫలితాలను ఇస్తున్నాయని తెలిపింది.</p><p>రానున్న కాలంలో భారత వృద్ధి రేటు మరింతగా పెరిగే అవకాశం ఉందని, ఇతర దేశాలకు భారత్ ఆదర్శంగా నిలుస్తుందని నివేదికలో వెల్లడించారు.</p>",
      featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop",
      categorySlug: "business"
    },
    {
      title: "వన్డే ప్రపంచ కప్‌లో భారత్ అద్భుత విజయం",
      slug: "india-stunning-victory-world-cup",
      excerpt: "క్రికెట్ ప్రపంచ కప్‌లో భాగంగా జరిగిన ఉత్కంఠభరిత పోరులో భారత్ అద్భుత విజయాన్ని అందుకుంది. బౌలర్లు, బ్యాటర్లు సమష్టిగా రాణించి జట్టును గెలిపించారు.",
      content: "<p>క్రికెట్ ప్రపంచ కప్‌లో భాగంగా జరిగిన ఉత్కంఠభరిత పోరులో భారత్ అద్భుత విజయాన్ని అందుకుంది. బౌలర్లు, బ్యాటర్లు సమష్టిగా రాణించి జట్టును గెలిపించారు. మొదట బ్యాటింగ్ చేసిన భారత్ భారీ స్కోరు సాధించగా, అనంతరం ప్రత్యర్థి జట్టును తక్కువ పరుగులకే కట్టడి చేశారు.</p>",
      featuredImage: "https://images.unsplash.com/photo-1531415074941-03f6ad8899ac?q=80&w=1200&auto=format&fit=crop",
      categorySlug: "sports",
      isTrending: true
    },
    {
      title: "కొత్త సినిమాల సందడి: ఈ వారం రిలీజ్ అయ్యే చిత్రాలివే!",
      slug: "new-movies-release-this-week",
      excerpt: "తెలుగు ప్రేక్షకులను అలరించేందుకు ఈ వారం పలు ఆసక్తికరమైన చిత్రాలు థియేటర్లలోకి రానున్నాయి. వాటిపై ఓ లుక్కేద్దాం.",
      content: "<p>తెలుగు ప్రేక్షకులను అలరించేందుకు ఈ వారం పలు ఆసక్తికరమైన చిత్రాలు థియేటర్లలోకి రానున్నాయి. పెద్ద హీరోలతో పాటు చిన్న బడ్జెట్ చిత్రాలు కూడా పోటీపడుతున్నాయి. ఓటీటీల్లో కూడా పలు వెబ్ సిరీస్‌లు రిలీజ్ కు సిద్ధంగా ఉన్నాయి.</p>",
      featuredImage: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop",
      categorySlug: "entertainment"
    },
  ];

  for (const art of demoArticles) {
    const cat = savedCategories.find(c => c.slug === art.categorySlug);
    if (!cat) continue;

    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {},
      create: {
        title: art.title,
        slug: art.slug,
        excerpt: art.excerpt,
        content: art.content,
        featuredImage: art.featuredImage,
        status: 'PUBLISHED',
        isBreaking: art.isBreaking || false,
        isTrending: art.isTrending || false,
        authorId: author.id,
        categoryId: cat.id,
        publishedAt: new Date(),
        viewCount: Math.floor(Math.random() * 10000)
      }
    });
  }

  // 4. Site Settings (if needed)
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    await prisma.siteSettings.create({
      data: {
        portalName: "Prajapalana",
        tagline: "ప్రజల స్వరం - నిజమైన వార్తలు",
        contactEmail: "contact@prajapalana.com",
        contactPhone: "+91 99887 76655",
        primaryColor: "#E30613",
        theme: "LIGHT",
        template: "HYBRID",
        isSetupComplete: true
      }
    });
  }

  console.log("Demo data seeded successfully!");
}
