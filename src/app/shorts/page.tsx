"use client";

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  ArrowLeft,
  Search,
  Music2
} from 'lucide-react';
import Link from 'next/link';

export default function ShortsFeed() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const shorts = [
    {
      id: 1,
      title: "హైదరాబాద్‌లో భారీ వర్షం - లోతట్టు ప్రాంతాలు జలమయం",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-pouring-rain-on-a-city-street-at-night-4284-large.mp4",
      author: "News Desk",
      likes: "12K",
      comments: "450",
    },
    {
      id: 2,
      title: "తెలంగాణ అసెంబ్లీలో కీలక బిల్లుపై చర్చ",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-busy-city-street-4424-large.mp4",
      author: "Political Reporter",
      likes: "8.5K",
      comments: "210",
    },
    {
      id: 3,
      title: "వార్తలలో నేటి ముఖ్యాంశాలు - 60 సెకన్లలో",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-news-studio-set-with-blue-lights-4428-large.mp4",
      author: "Editorial Team",
      likes: "15K",
      comments: "1.2K",
    }
  ];

  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      
      {/* Top Controls */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex items-center justify-between text-white bg-gradient-to-b from-black/60 to-transparent">
         <Link href="/" className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <ArrowLeft className="w-6 h-6" />
         </Link>
         <div className="flex items-center space-x-6 text-sm font-black uppercase tracking-widest">
            <span className="opacity-50">Following</span>
            <span className="border-b-2 border-primary pb-1">For You</span>
         </div>
         <button className="p-2 bg-white/10 backdrop-blur-md rounded-full">
            <Search className="w-6 h-6" />
         </button>
      </div>

      {/* Vertical Video Feed */}
      <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll no-scrollbar">
         {shorts.map((short, i) => (
           <div key={short.id} className="h-screen w-full snap-start relative bg-slate-900">
              <video 
                src={short.videoUrl}
                className="h-full w-full object-cover"
                autoPlay={i === activeVideo}
                loop
                muted={isMuted}
                playsInline
              />

              {/* Interaction Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between">
                 
                 {/* Video Info */}
                 <div className="flex-1 text-white space-y-4 max-w-[80%]">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-primary rounded-full border-2 border-white flex items-center justify-center font-black text-xs">P</div>
                       <div>
                          <p className="font-black italic uppercase tracking-tighter">@{short.author}</p>
                          <button className="text-[10px] bg-primary px-3 py-0.5 rounded-full font-black uppercase">Follow</button>
                       </div>
                    </div>
                    <h3 className="telugu-text text-xl font-bold leading-relaxed line-clamp-2">
                       {short.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs opacity-70">
                       <Music2 className="w-4 h-4 animate-spin-slow" />
                       <span className="truncate">Original Audio - News Pulse Live</span>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="flex flex-col items-center space-y-8 pb-4">
                    <div className="flex flex-col items-center group cursor-pointer">
                       <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                          <Heart className="w-6 h-6 text-white" />
                       </div>
                       <span className="text-[10px] font-black mt-2 text-white">{short.likes}</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                       <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                          <MessageCircle className="w-6 h-6 text-white" />
                       </div>
                       <span className="text-[10px] font-black mt-2 text-white">{short.comments}</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer">
                       <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                          <Share2 className="w-6 h-6 text-white" />
                       </div>
                       <span className="text-[10px] font-black mt-2 text-white">Share</span>
                    </div>
                    <button 
                       onClick={() => setIsMuted(!isMuted)}
                       className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center"
                    >
                       {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                    </button>
                 </div>

              </div>
           </div>
         ))}
      </div>

    </div>
  );
}
