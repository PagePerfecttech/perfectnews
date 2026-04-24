import React from 'react';
import { 
  Calendar, 
  User, 
  Share2, 
  MessageSquare, 
  Bookmark, 
  TrendingUp,
  Clock,
  Send,
  Type,
  Plus,
  Minus,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';

export default function ArticleDetail({ params }: { params: { id: string } }) {
  // In a real scenario, fetch article data here
  const articleData = {
    headline: "తెలంగాణ రాజకీయాల్లో అనూహ్య మార్పులు – కొత్త పొత్తుల దిశగా అడుగులు?",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&h=800&auto=format&fit=crop",
    datePublished: "2026-04-23T08:00:00+08:00",
    dateModified: "2026-04-23T09:20:00+08:00",
    authorName: "Editorial Team",
    category: "Politics"
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <JsonLd 
        type="NewsArticle" 
        data={{
          headline: articleData.headline,
          image: [articleData.image],
          datePublished: articleData.datePublished,
          dateModified: articleData.dateModified,
          author: {
            "@type": "Person",
            "name": articleData.authorName
          }
        }}
      />
      
      {/* Top Ad Space */}
      <div className="max-w-screen-xl mx-auto py-4 px-4">
        <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 rounded">
          Advertisement - 970x90
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-10 space-y-8">
            {/* Header Metadata */}
            <div className="space-y-4">
              <Link href="/category/politics" className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                {articleData.category}
              </Link>
              <h1 className="telugu-text text-3xl md:text-5xl font-black leading-tight text-gray-900">
                {articleData.headline}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-xs font-bold border-y border-gray-50 py-4 uppercase tracking-tighter">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary" />
                  <span>By {articleData.authorName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>April 23, 2026</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>5 Min Read</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 normal-case ml-auto">
                  <Type className="w-3.5 h-3.5 text-gray-400" />
                  <button className="p-1 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                  <button className="p-1 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={articleData.image} 
                alt={articleData.headline} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>

            {/* Content Body */}
            <div className="telugu-text text-xl leading-relaxed text-gray-800 space-y-6 first-letter:text-5xl first-letter:font-black first-letter:text-primary">
              <p>
                తెలంగాణ రాజకీయాలు ఒక్కసారిగా వేడెక్కాయి. రానున్న ఎన్నికల నేపథ్యంలో ప్రధాన పార్టీల మధ్య మాటల యుద్ధం తారాస్థాయికి చేరింది. ముఖ్యంగా గత కొద్ది రోజులుగా జరుగుతున్న పరిణామాలు చూస్తుంటే కొత్త పొత్తులు కుదిరే అవకాశం కనిపిస్తోంది.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-primary italic font-bold text-lg">
                "ప్రజల సంక్షేమమే మా మొదటి ప్రాధాన్యత, అధికారం కోసం మేము సిద్ధంగా ఉన్నాం." - పార్టీ ప్రతినిధి
              </div>

              <p>
                రాష్ట్రవ్యాప్తంగా వివిధ ప్రాంతాల్లో పార్టీల బలోపేతం కోసం నేతలు విస్తృతంగా పర్యటిస్తున్నారు. అధికార పక్షం తమ పథకాలను ప్రజల్లోకి తీసుకెళ్తుండగా, ప్రతిపక్షాలు ప్రభుత్వ వైఫల్యాలను ఎండగడుతున్నాయి. ఈ క్రమంలో తటస్థ ఓటర్లను ఆకట్టుకోవడంపై అన్ని పార్టీలు దృష్టి పెట్టాయి.
              </p>

              {/* In-Article Ad */}
              <div className="w-full h-64 bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl my-8">
                 <span className="text-[10px] font-black text-gray-300 uppercase mb-2">Advertisement</span>
                 <div className="w-full max-w-[300px] h-[250px] bg-gray-200 rounded"></div>
              </div>

              <p>
                ముఖ్యంగా యువత మరియు మహిళా ఓటర్లు ఎటువైపు మొగ్గు చూపుతారనేది ఆసక్తికరంగా మారింది. ఇప్పటికే పలు సర్వేలు తమ అంచనాలను వెలువరించినప్పటికీ, గ్రౌండ్ లెవల్ పరిస్థితులు భిన్నంగా ఉన్నాయని విశ్లేషకులు భావిస్తున్నారు.
              </p>
            </div>

            {/* Tags & Interaction */}
            <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {['Telangana', 'Politics', 'Elections', 'Strategy'].map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
                  <Globe className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all">
                  <Send className="w-4 h-4" />
                  <span>Tweet</span>
                </button>
                <button className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Sidebar Ad */}
          <div className="w-full min-h-[600px] bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center p-4">
             <span className="text-[10px] font-black text-gray-300 uppercase mb-4">Sponsored</span>
             <div className="w-full h-full min-h-[550px] bg-gray-50 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-300 uppercase">
                300x600 AD UNIT
             </div>
          </div>

          {/* Trending News */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
             <h3 className="text-sm font-black uppercase tracking-widest text-secondary flex items-center space-x-2 mb-6 border-b border-gray-50 pb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Trending Now</span>
             </h3>
             <div className="space-y-6">
                {[1, 2, 3, 4].map(i => (
                  <Link key={i} href={`/news/${i}`} className="flex items-start space-x-4 group">
                    <span className="text-3xl font-black text-gray-100 group-hover:text-primary transition-colors leading-none">0{i}</span>
                    <div>
                       <h4 className="telugu-text text-sm font-bold line-clamp-2 leading-relaxed text-gray-800 group-hover:text-primary transition-colors">
                          హైదరాబాద్లో భారీ వర్షాల హెచ్చరిక - ప్రభుత్వం అప్రమత్తం
                       </h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">2 Hours Ago</p>
                    </div>
                  </Link>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
