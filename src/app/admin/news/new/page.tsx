"use client";

import React, { useState } from 'react';
import { 
  Save, 
  Send, 
  Image as ImageIcon, 
  Eye, 
  Settings2,
  X,
  Type,
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function NewArticle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Editor Area */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/admin/news" className="text-gray-400 hover:text-gray-600 transition-colors flex items-center text-sm font-bold">
              <X className="w-4 h-4 mr-2" />
              Discard Draft
            </Link>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
              <button className="px-6 py-2 text-sm font-bold bg-primary text-white hover:bg-red-700 rounded-lg flex items-center space-x-2 shadow-lg shadow-red-100">
                <Send className="w-4 h-4" />
                <span>Publish Now</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Article Title (Telugu)</label>
              <textarea 
                placeholder="ఇక్కడ శీర్షికను టైప్ చేయండి..." 
                className="w-full text-3xl font-bold telugu-text border-none outline-none focus:ring-0 placeholder:text-gray-200 resize-none min-h-[100px]"
              />
            </div>

            {/* Toolbar (Mocked) */}
            <div className="flex items-center space-x-1 p-2 bg-gray-50 rounded-xl border border-gray-100">
               <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><Bold className="w-4 h-4 text-gray-600" /></button>
               <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><Italic className="w-4 h-4 text-gray-600" /></button>
               <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><Type className="w-4 h-4 text-gray-600" /></button>
               <div className="w-px h-6 bg-gray-200 mx-2" />
               <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><List className="w-4 h-4 text-gray-600" /></button>
               <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><LinkIcon className="w-4 h-4 text-gray-600" /></button>
               <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><ImageIcon className="w-4 h-4 text-gray-600" /></button>
               <div className="flex-1" />
               <button className="p-2 text-primary hover:bg-red-50 rounded-lg flex items-center space-x-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-[10px] font-bold">Telugu Typing Help</span>
               </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
              <textarea 
                placeholder="వార్త వివరాలను ఇక్కడ వ్రాయండి..." 
                className="w-full h-full min-h-[400px] text-lg telugu-text border-none outline-none focus:ring-0 placeholder:text-gray-200 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-24">
              <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                 <Settings2 className="w-5 h-5 text-primary" />
                 <span>Article Settings</span>
              </h3>

              {/* Status */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</label>
                 <select className="w-full p-2 bg-gray-50 border-transparent rounded-lg text-sm font-bold outline-none cursor-pointer">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Draft</option>
                 </select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                 <select className="w-full p-2 bg-gray-50 border-transparent rounded-lg text-sm telugu-text font-bold outline-none cursor-pointer">
                    {siteConfig.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                 </select>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Featured Image</label>
                 <div className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors group">
                    <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Click to Upload</span>
                 </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs font-bold text-gray-600 group-hover:text-primary transition-colors">Mark as Breaking News</span>
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                 </label>
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs font-bold text-gray-600 group-hover:text-primary transition-colors">Show in Hero Slider</span>
                    <input type="checkbox" className="w-4 h-4 accent-primary" />
                 </label>
              </div>

              <button className="w-full py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-xl text-xs font-bold text-gray-500 transition-all flex items-center justify-center space-x-2">
                 <Eye className="w-4 h-4" />
                 <span>Preview Live</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
