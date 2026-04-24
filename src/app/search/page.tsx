import React from 'react';
import { Search as SearchIcon, Filter, Clock, Eye } from 'lucide-react';
import { NewsCard } from '@/components/ui/NewsCards';
import Link from 'next/link';

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 py-12 md:py-20">
        <div className="max-w-screen-md mx-auto px-4">
           <div className="relative mb-6">
              <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
              <input 
                type="text" 
                placeholder="వార్తలను వెతకండి..." 
                defaultValue={query}
                className="w-full pl-16 pr-8 py-5 bg-gray-50 border-transparent rounded-2xl text-xl font-bold telugu-text outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
              />
           </div>
           <div className="flex items-center justify-between text-gray-400">
              <p className="text-xs font-bold uppercase tracking-widest">
                 {query ? `Search results for "${query}"` : "Enter a keyword to search news"}
              </p>
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                 <Filter className="w-4 h-4" />
                 <span>Advanced Filter</span>
              </div>
           </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        {query ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
               {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                 <NewsCard 
                   key={i}
                   title={`శోధన ఫలితం ${i}: తెలంగాణలో కొత్త పథకాలు – పూర్తి వివరాలు`}
                   category="News"
                   date="2 Days Ago"
                   image={`https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400&h=300&auto=format&fit=crop&sig=search-${i}`}
                   href={`/news/${i}`}
                 />
               ))}
            </div>
            
            {/* Load More */}
            <div className="flex justify-center pt-8">
               <button className="px-10 py-4 bg-secondary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                  Load More Results
               </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 space-y-6">
             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="w-10 h-10 text-gray-300" />
             </div>
             <div className="space-y-2">
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Looking for something?</h3>
                <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto">Type in keywords like "Politics", "Vizag", or "Health" to find relevant news.</p>
             </div>
          </div>
        )}
      </div>
    </main>
  );
}
