"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
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
  X,
} from "lucide-react";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "All News", href: "/admin/news" },
  { icon: Newspaper, label: "E-Paper", href: "/admin/epaper" },
  { icon: Tv, label: "Monetization", href: "/admin/monetization" },
  { icon: ImageIcon, label: "Media Library", href: "/admin/media" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = session?.user?.name || "Admin";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-lg font-black tracking-tight text-gray-900">PERFECT NEWS</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-black"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300
          md:relative md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col p-5">
          <div className="hidden md:block mb-8">
            <h1 className="text-xl font-black tracking-tight text-gray-900">PERFECT NEWS</h1>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Admin Console</p>
          </div>

          <nav className="flex-1 space-y-1.5">
            <Link
              href="/admin/news/new"
              className="flex items-center gap-2.5 bg-black text-white p-3 rounded-xl font-semibold text-sm mb-6 hover:bg-gray-800 transition-all shadow-sm active:scale-[0.98]"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </Link>

            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 p-2.5 rounded-xl transition-all text-sm font-medium
                    ${isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-900"
                    }
                  `}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2.5 p-2.5 text-gray-500 hover:text-red-500 w-full transition-colors rounded-xl hover:bg-red-50 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-x-hidden bg-gray-50/30">
        {/* Desktop Header — shows real user from session */}
        <header className="hidden md:flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-5 sticky top-0 z-40">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">
            {MENU_ITEMS.find((item) => pathname === item.href)?.label || "Console"}
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {(session?.user as { role?: string })?.role || "Admin"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {userInitials}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8">{children}</div>
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
