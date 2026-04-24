import Link from 'next/link';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Visual Cue */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100">
            <AlertCircle className="w-20 h-20 text-primary mx-auto" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-black italic tracking-tighter text-secondary uppercase">
            404 <span className="text-primary">Error</span>
          </h1>
          <p className="telugu-text text-xl font-bold text-gray-500">
            క్షమించండి, మీరు కోరుకున్న వార్త మా దగ్గర లేదు.
          </p>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-relaxed">
            The story you're looking for might have been moved or archived.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/"
            className="bg-secondary text-white p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center space-x-2 shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <button 
            className="bg-white text-secondary border border-gray-100 p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

        <div className="pt-10 border-t border-gray-200">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">
            Check out our <Link href="/trending" className="text-primary hover:underline">Trending News</Link> while you're here.
          </p>
        </div>

      </div>
    </div>
  );
}
