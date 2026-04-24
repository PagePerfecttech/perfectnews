"use client";

import React, { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export function AdBanner({ slot, format = 'auto', className }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Injection Error:", e);
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!publisherId) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-300 uppercase tracking-widest border border-gray-100 rounded-xl ${className}`}>
        Ad Placeholder (Set AdSense ID)
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
