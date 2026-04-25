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
import { DEFAULT_SITE_INFO } from '@/config/site';
import { saveArticle } from '@/lib/news-actions';
import { useTransition } from 'react';

export default function NewArticle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrl(data.url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      saveArticle(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Editor Area */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/admin/news" className="text-gray-400 hover:text-gray-600 transition-colors flex items-center text-sm font-bold">
              <X className="w-4 h-4 mr-2" />
              Discard Draft
            </Link>
            <div className="flex items-center space-x-3">
              <button 
                type="button"
                onClick={() => {
                  const form = document.querySelector('form');
                  if(form) {
                     const statusInput = document.createElement('input');
                     statusInput.type = 'hidden';
                     statusInput.name = 'status';
                     statusInput.value = 'DRAFT';
                     form.appendChild(statusInput);
                     form.requestSubmit();
                  }
                }}
                disabled={isPending}
                className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center space-x-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isPending ? "Saving..." : "Save Draft"}</span>
              </button>
              <button 
                type="submit"
                disabled={isPending}
                className="px-6 py-2.5 text-sm font-semibold bg-black text-white hover:bg-gray-800 rounded-xl flex items-center space-x-2 shadow-sm transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isPending ? "Publishing..." : "Publish Now"}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Article Title (Telugu)</label>
              <textarea 
                name="title"
                required
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
               <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg flex items-center space-x-1 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-[10px] font-bold">Telugu Typing Help</span>
               </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
              <textarea 
                name="content"
                required
                placeholder="వార్త వివరాలను ఇక్కడ వ్రాయండి..." 
                className="w-full h-full min-h-[400px] text-lg telugu-text border-none outline-none focus:ring-0 placeholder:text-gray-200 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-24">
              <h3 className="font-bold text-gray-900 flex items-center space-x-2 tracking-tight">
                 <Settings2 className="w-5 h-5 text-black" />
                 <span>Article Settings</span>
              </h3>

              {/* Status */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status (Fallback)</label>
                 <select name="status" className="w-full p-2 bg-gray-50 border-transparent rounded-lg text-sm font-bold outline-none cursor-pointer">
                    <option value="PUBLISHED">Public / Published</option>
                    <option value="PENDING">Private / Pending</option>
                    <option value="DRAFT">Draft</option>
                 </select>
              </div>

              {/* Category */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                 <select name="categoryId" className="w-full p-2 bg-gray-50 border-transparent rounded-lg text-sm telugu-text font-bold outline-none cursor-pointer">
                    {DEFAULT_SITE_INFO.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                 </select>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Featured Image</label>
                 <label className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all overflow-hidden group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                    <input type="hidden" name="featuredImage" value={imageUrl} />
                    
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon className={`w-8 h-8 transition-colors ${isUploading ? 'text-primary animate-pulse' : 'text-gray-300 group-hover:text-gray-500'}`} />
                        <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                          {isUploading ? 'Uploading...' : 'Click to Upload'}
                        </span>
                      </>
                    )}
                 </label>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-black transition-colors">Mark as Breaking News</span>
                    <input type="checkbox" name="isBreaking" className="w-4 h-4 accent-black" />
                 </label>
                 <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-black transition-colors">Show in Hero Slider</span>
                    <input type="checkbox" name="isTrending" className="w-4 h-4 accent-black" />
                 </label>
              </div>

              <button type="button" className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 shadow-sm transition-all flex items-center justify-center space-x-2">
                 <Eye className="w-4 h-4" />
                 <span>Preview Live</span>
              </button>
           </div>
        </div>
      </div>
    </form>
  );
}
