"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Menu, Search, X, MapPin, ChevronDown } from 'lucide-react';

interface HeaderProps {
  siteInfo?: {
    name: string;
    tagline: string;
    primaryColor: string;
  };
}

export function Header({ siteInfo }: HeaderProps = { siteInfo: { name: "PRAJAPALANA", tagline: "మీ స్వరం, మీ అండ", primaryColor: "#E11D48" } }) {
  const finalSiteInfo = siteInfo || { name: "PRAJAPALANA", tagline: "మీ స్వరం, మీ అండ", primaryColor: "#E11D48" };
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        {/* Main Header Area */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter">
                {finalSiteInfo.name.toUpperCase()}
              </h1>
              <span className="text-[10px] md:text-xs telugu-text font-medium text-secondary/60 -mt-1 tracking-widest">
                {finalSiteInfo.tagline}
              </span>
            </Link>

            <div className="hidden xl:flex items-center space-x-2 bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-full cursor-pointer hover:bg-gray-100 transition-all group">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Edition: Hyderabad</span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {siteConfig.categories.slice(0, 7).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="telugu-text text-sm font-semibold hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-secondary" />
            </button>
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link 
              href="#" 
              className="hidden md:flex bg-primary text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-red-700 transition-colors"
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
              {siteConfig.categories.map((cat) => (
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
