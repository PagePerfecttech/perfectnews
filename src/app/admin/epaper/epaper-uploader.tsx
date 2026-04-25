"use client";

import React, { useState, useTransition } from "react";
import { Plus, Loader2 } from "lucide-react";
import { createEpaper } from "@/lib/epaper-actions";

export function EPaperUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 1. Upload the PDF file locally
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        // 2. We use a placeholder image for thumbnail since we aren't rendering the PDF dynamically right now
        const mockThumbnail = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop";
        const title = `E-Paper Edition ${new Date().toLocaleDateString()}`;
        
        // 3. Create the Database Record via Server Action
        const serverFormData = new FormData();
        serverFormData.append("title", title);
        serverFormData.append("pdfUrl", data.url);
        serverFormData.append("thumbnail", mockThumbnail);
        
        startTransition(() => {
          createEpaper(serverFormData);
        });
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <label className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer group shadow-sm relative overflow-hidden">
      <input 
        type="file" 
        accept="application/pdf" 
        className="hidden" 
        onChange={handleUpload} 
        disabled={isUploading || isPending} 
      />
      
      {isUploading || isPending ? (
        <div className="flex flex-col items-center text-primary">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <span className="text-[10px] font-bold uppercase">Uploading PDF...</span>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-white transition-colors border border-gray-100 group-hover:border-gray-300">
            <Plus className="w-8 h-8 text-gray-400 group-hover:text-black" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">Tomorrow's Edition</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Click to Upload PDF</p>
          </div>
        </>
      )}
    </label>
  );
}
