import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Globe, Camera, Send, Video, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-primary italic tracking-tighter">
                {siteConfig.name.toUpperCase()}
              </h2>
              <p className="telugu-text text-sm text-gray-400 mt-2">
                {siteConfig.description}
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href={siteConfig.socials.facebook} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href={siteConfig.socials.twitter} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Send className="w-5 h-5" />
              </Link>
              <Link href={siteConfig.socials.instagram} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href={siteConfig.socials.youtube} className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Video className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">ముఖ్యమైన విభాగాలు</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {siteConfig.categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/category/${cat.id}`}
                  className="telugu-text text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-primary pl-3">మమ్మల్ని సంప్రదించండి</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm">{siteConfig.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
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
