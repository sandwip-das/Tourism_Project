'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CampaignBanner } from '../types';

interface BestInTravelBannerProps {
  banner?: CampaignBanner | null;
  lang: 'en' | 'bn';
  onExploreClick?: () => void;
}

export default function BestInTravelBanner({ banner, lang, onExploreClick }: BestInTravelBannerProps) {
  const kicker = lang === 'en' ? (banner?.kicker_en || "SANDVIORA'S") : (banner?.kicker_bn || 'স্যান্ডভিওরা ম্যাগাজিন');
  const title = lang === 'en' ? (banner?.title_en || 'Best in Travel 2026') : (banner?.title_bn || 'সেরা ভ্রমণ গন্তব্য ২০২৬');
  const description = lang === 'en'
    ? (banner?.description_en || "For our annual travel rankings, we asked our community of regional explorers and seasoned writers where they're heading next. Here are the must-visit destinations making waves right now.")
    : (banner?.description_bn || 'আমাদের বার্ষিক ভ্রমণ র্যাঙ্কিংয়ের জন্য আমরা স্থানীয় গবেষক ও ভ্রমণ বিশেষজ্ঞদের প্রশ্ন করেছিলাম: এরপর কোথায়? এখানে তুলে ধরা হলো দেশের সবচেয়ে আকর্ষণীয় ও আলোচিত ৫০টি গন্তব্য।');
  const ctaText = lang === 'en' ? (banner?.cta_text_en || 'VIEW THE LIST') : (banner?.cta_text_bn || 'পূর্ণাঙ্গ তালিকা দেখুন');
  const bgImage = banner?.bg_image || '/media/image_o683v8n8652o9dss1ic9nni56p.webp';
  const ctaUrl = banner?.cta_url || '#destinations';

  return (
    <section 
      id="block-best-in-travel"
      className="relative w-full min-h-[500px] sm:min-h-[620px] lg:min-h-[720px] flex items-end overflow-hidden bg-[#0A4D68]"
    >
      {/* Full-Bleed Turquoise Water Background Image (Dynamically loaded) */}
      <div className="absolute inset-0 z-0 w-full h-full" aria-hidden="true">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Soft gradient from bottom to enhance typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent z-1" />
      </div>

      {/* Editorial Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 pt-20">
        <div className="max-w-2xl flex flex-col gap-4 sm:gap-5 text-white">
          
          {/* Brand Kicker */}
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/90">
            {kicker}
          </span>

          {/* Headline */}
          <h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95]"
            style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
          >
            {title}
          </h2>

          {/* Subcopy */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-xl">
            {description}
          </p>

          {/* White Pill CTA Button */}
          <div className="pt-2">
            <a
              href={ctaUrl}
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-gray-100 text-[#1D232C] text-xs font-mono uppercase tracking-widest transition-all shadow-lg cursor-pointer group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
