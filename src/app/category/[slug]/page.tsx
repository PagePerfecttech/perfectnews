import React from 'react';
import { Filter, Grid, List as ListIcon, TrendingUp } from 'lucide-react';
import { GridNewsCard } from '@/components/ui/NewsCards';
import Link from 'next/link';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <main className="min-h-screen bg-white">
      {/* Category Header */}
      <div className="bg-secondary text-white py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 relative z-10 text-center">
           <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white transition-colors mb-4 inline-block uppercase tracking-widest">Home / Category</Link>
           <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-4">{categoryName}</h1>
           <p className="telugu-text text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
             {categoryName} సంబంధిత తాజా వార్తలు మరియు విశ్లేషణలు ఇక్కడ చూడండి.
           </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
           <div className="flex items-center space-x-8">
              <button className="text-sm font-black uppercase tracking-widest text-primary border-b-2 border-primary pb-2">Latest News</button>
              <button className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-colors pb-2">Most Read</button>
              <button className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-gray-800 transition-colors pb-2">Editor's Pick</button>
           </div>
           <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-secondary transition-colors"><Grid className="w-5 h-5" /></button>
              <button className="p-2 text-gray-400 hover:text-secondary transition-colors"><ListIcon className="w-5 h-5" /></button>
              <div className="w-px h-6 bg-gray-100 mx-2" />
              <button className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-secondary bg-gray-50 px-4 py-2 rounded-full">
                 <Filter className="w-4 h-4" />
                 <span>Filter</span>
              </button>
           </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
             <GridNewsCard 
               key={i}
               id={i.toString()}
               title="తెలంగాణ అభివృద్ధి పథంలో దూసుకుపోతోంది - మంత్రి కేటీఆర్ ఆశాభావం"
               category={categoryName}
               time={`${i + 1} Hours Ago`}
               image={`https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400&h=300&auto=format&fit=crop&sig=${i}`}
             />
           ))}
        </div>

        {/* Pagination */}
        <div className="mt-20 flex justify-center">
           <div className="flex items-center space-x-2">
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all font-bold">1</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-red-100 font-bold">2</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-all font-bold">3</button>
              <button className="px-6 h-12 flex items-center justify-center rounded-xl bg-secondary text-white font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">Next Page</button>
           </div>
        </div>
      </div>
    </main>
  );
}
