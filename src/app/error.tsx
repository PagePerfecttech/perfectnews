"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-12 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-secondary">System <span className="text-primary">Error</span></h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Something went wrong on our end</p>
        </div>

        <p className="text-sm font-medium text-gray-600 telugu-text leading-relaxed">
          క్షమించండి, సాంకేతిక సమస్య తలెత్తింది. దయచేసి పేజీని రీలోడ్ చేయండి లేదా హోమ్ పేజీకి వెళ్ళండి.
        </p>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => reset()}
            className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="w-full py-4 bg-gray-50 text-secondary rounded-2xl font-black text-xs uppercase tracking-widest border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {error.digest && (
          <p className="text-[8px] font-mono text-gray-300 uppercase">
            Error Digest: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
