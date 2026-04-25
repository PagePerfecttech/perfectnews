import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  category: string;
  image?: string | null;
  excerpt?: string;
  date?: string;
  href: string;
  priority?: boolean;
}

export function HeroCard({ title, category, image, date, href, priority = false }: CardProps) {
  return (
    <Link href={href} className="group relative block w-full h-[400px] md:h-[550px] overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-xl">
      <Image 
        src={image || "/placeholder.jpg"} 
        alt={title} 
        fill 
        priority={priority}
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full space-y-4">
        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
          {category}
        </span>
        <h2 className="telugu-text text-2xl md:text-5xl font-black text-white leading-[1.1] group-hover:text-gray-200 transition-colors">
          {title}
        </h2>
        <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-widest flex items-center space-x-2">
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500" />
          <span>PERFECT NEWS</span>
        </p>
      </div>
    </Link>
  );
}

export function NewsCard({ title, category, image, date, href }: CardProps) {
  return (
    <Link href={href} className="group flex flex-col space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        <Image 
          src={image || "/placeholder.jpg"} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-black text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase border border-gray-200/50">
            {category}
          </span>
        </div>
      </div>
      <div className="space-y-2 px-1">
        <h3 className="telugu-text text-[1.1rem] font-bold leading-snug text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-[11px] text-gray-400 uppercase font-semibold tracking-wide">
          {date}
        </p>
      </div>
    </Link>
  );
}

export function ShortsCard({ title, image, href }: Partial<CardProps>) {
  return (
    <Link href={href || "#"} className="group relative block w-[220px] h-[380px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200/20 shadow-sm">
      <Image 
        src={image || "/placeholder.jpg"} 
        alt={title || "Shorts"} 
        fill 
        className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-5 left-5 right-5">
        <h4 className="telugu-text text-white text-sm font-semibold leading-relaxed line-clamp-3">
          {title}
        </h4>
      </div>
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20">
         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    </Link>
  );
}
