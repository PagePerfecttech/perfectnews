"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Settings, 
  BarChart3, 
  Newspaper, 
  Tv, 
  LogOut,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { siteConfig } from '@/config/site';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "All News", href: "/admin/news" },
  { icon: Newspaper, label: "E-Paper", href: "/admin/epaper" },
  { icon: Tv, label: "Live TV & Ads", href: "/admin/monetization" },
  { icon: ImageIcon, label: "Media Library", href: "/admin/media" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Site Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-xl font-black text-primary italic">{siteConfig.name}</h1>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="hidden md:block mb-10">
            <h1 className="text-2xl font-black text-primary italic tracking-tighter">
              {siteConfig.name.toUpperCase()}
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-1">ADMIN CONSOLE</p>
          </div>

          <nav className="flex-1 space-y-2">
            <Link 
              href="/admin/news/new"
              className="flex items-center space-x-3 bg-primary text-white p-3 rounded-xl font-bold mb-8 hover:bg-red-700 transition-all shadow-lg"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Plus className="w-5 h-5" />
              <span>Quick Publish</span>
            </Link>

            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10">
            <button className="flex items-center space-x-3 p-3 text-gray-400 hover:text-red-400 w-full transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {/* Header (Desktop) */}
        <header className="hidden md:flex items-center justify-between bg-white border-b px-8 py-4 sticky top-0 z-40">
          <h2 className="text-xl font-bold text-gray-800">
            {MENU_ITEMS.find(item => pathname === item.href)?.label || "Console"}
          </h2>
          <div className="flex items-center space-x-4">
             <div className="text-right">
                <p className="text-sm font-bold">Raghavendra Rao</p>
                <p className="text-[10px] text-primary font-black uppercase tracking-tighter">Chief Editor</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                RR
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
