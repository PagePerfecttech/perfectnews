"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, X, MapPin, ChevronDown } from 'lucide-react';
import type { SiteInfo } from '@/types';
import { DEFAULT_SITE_INFO } from '@/config/site';

interface HeaderProps {
  siteInfo?: SiteInfo;
}

export function Header({ siteInfo = DEFAULT_SITE_INFO }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 border-b ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-sm py-3' : 'bg-white border-transparent py-5'
    }`}>
      <div className="container mx-auto px-4">
        {/* Main Header Area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
                {siteInfo.name.toUpperCase()}
              </h1>
              <span className="text-[10px] md:text-xs telugu-text font-medium text-gray-500 tracking-widest mt-0.5">
                {siteInfo.tagline}
              </span>
            </Link>

            <div className="hidden xl:flex items-center space-x-2 bg-gray-50/50 border border-gray-200/60 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition-colors group shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-colors" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-black transition-colors">Edition: Hyderabad</span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {siteInfo.categories.slice(0, 7).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="telugu-text text-sm font-medium text-gray-600 hover:text-black transition-colors relative after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black">
              <Search className="w-4 h-4" />
            </button>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link 
              href="#" 
              className="hidden md:flex items-center justify-center bg-black text-white px-5 py-2.5 rounded-full font-semibold text-[11px] uppercase tracking-widest hover:bg-gray-800 hover:shadow-md transition-all active:scale-95"
            >
              LIVE TV
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl animate-in slide-in-from-top duration-300">
          <div className="container mx-auto py-4 px-4">
            <div className="grid grid-cols-2 gap-4">
              {siteInfo.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.id}`}
                  className="telugu-text text-lg font-bold py-2 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 space-y-4">
               <Link href="#" className="flex justify-center bg-primary text-white py-3 rounded-lg font-black tracking-widest">
                 WATCH LIVE TV
               </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
