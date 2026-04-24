import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  category: string;
  image: string;
  excerpt?: string;
  date: string;
  href: string;
  priority?: boolean;
}

export function HeroCard({ title, category, image, date, href, priority = false }: CardProps) {
  return (
    <Link href={href} className="group relative block w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
      <Image 
        src={image} 
        alt={title} 
        fill 
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
        <span className="bg-primary text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">
          {category}
        </span>
        <h2 className="telugu-text text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-accent transition-colors">
          {title}
        </h2>
        <p className="text-gray-300 text-xs mt-3 font-medium uppercase tracking-tighter">
          {date} • BY TELUGU POST TEAM
        </p>
      </div>
    </Link>
  );
}

export function NewsCard({ title, category, image, date, href }: CardProps) {
  return (
    <Link href={href} className="group flex flex-col space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-lg shadow-md">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="telugu-text text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-[10px] text-gray-500 uppercase font-semibold">
          {date}
        </p>
      </div>
    </Link>
  );
}

export function ShortsCard({ title, image, href }: Partial<CardProps>) {
  return (
    <Link href={href || "#"} className="group relative block w-[200px] h-[350px] flex-shrink-0 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
      <Image 
        src={image || "/placeholder.jpg"} 
        alt={title || "Shorts"} 
        fill 
        className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h4 className="telugu-text text-white text-sm font-bold leading-tight line-clamp-2">
          {title}
        </h4>
      </div>
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full">
         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>
    </Link>
  );
}
