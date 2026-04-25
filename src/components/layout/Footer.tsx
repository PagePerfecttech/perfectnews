import React from 'react';
import Link from 'next/link';
import { Globe, Camera, Send, Video, Mail, Phone } from 'lucide-react';
import type { SiteInfo } from '@/types';
import { DEFAULT_SITE_INFO } from '@/config/site';

interface FooterProps {
  siteInfo?: SiteInfo;
}

export function Footer({ siteInfo = DEFAULT_SITE_INFO }: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-20 pb-10 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {siteInfo.name.toUpperCase()}
              </h2>
              <p className="telugu-text text-sm text-zinc-500 mt-3 leading-relaxed">
                {siteInfo.description}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href={siteInfo.socials.facebook} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href={siteInfo.socials.twitter} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Send className="w-5 h-5" />
              </Link>
              <Link href={siteInfo.socials.instagram} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href={siteInfo.socials.youtube} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Video className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">ముఖ్యమైన విభాగాలు</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {siteInfo.categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/category/${cat.id}`}
                  className="telugu-text text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">మమ్మల్ని సంప్రదించండి</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-zinc-400">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span className="text-sm hover:text-white transition-colors cursor-pointer">{siteInfo.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-3 text-zinc-400">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span className="text-sm hover:text-white transition-colors cursor-pointer">{siteInfo.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} {siteInfo.name}. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/about" className="hover:text-white">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
