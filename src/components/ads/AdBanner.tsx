"use client";

import React, { useEffect, useState } from 'react';
import { getActiveAdForZone } from '@/lib/ad-actions';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  zone?: string;
}

export function AdBanner({ slot, format = 'auto', className, zone = "HEADER" }: AdBannerProps) {
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAd() {
      try {
        const customAd = await getActiveAdForZone(zone);
        if (customAd) {
          setAd(customAd);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAd();
  }, [zone]);

  useEffect(() => {
    if (!loading && (!ad || ad.type === 'GOOGLE_ADSENSE')) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense Injection Error:", e);
      }
    }
  }, [ad, loading]);

  if (loading) {
    return <div className={`bg-gray-50 animate-pulse rounded-xl ${className}`}></div>;
  }

  // Render Custom Image Ad
  if (ad && ad.type === 'IMAGE') {
    return (
      <div className={`overflow-hidden rounded-xl ${className}`}>
        <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          <img src={ad.content} alt={ad.name} className="w-full h-full object-cover" />
        </a>
      </div>
    );
  }

  // Render Custom Script Ad
  if (ad && ad.type === 'SCRIPT') {
    return (
      <div className={`overflow-hidden rounded-xl ${className}`} dangerouslySetInnerHTML={{ __html: ad.content }} />
    );
  }

  // Render AdSense Fallback
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!publisherId) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-300 uppercase tracking-widest border border-gray-100 rounded-xl ${className}`}>
        Ad Placeholder ({zone})
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
