'use client';

import React from 'react';
import { SiteConfig, FeatureBadge } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  siteConfig: SiteConfig;
  badges?: FeatureBadge[];
  lang: 'en' | 'bn';
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (c: string) => void;
  onExploreClick: () => void;
}

export default function Hero({
  siteConfig,
  lang,
  onExploreClick,
}: HeroProps) {
  const bgImage = siteConfig.hero_bg_image || '/media/image_jm0r06ajcd6afdte29dv2o0m7o.webp';
  const badgeText = siteConfig.hero_badge_text || (lang === 'en' ? 'BEST IN TRAVEL WINNER' : 'সেরা ভ্রমণ গন্তব্য বিজয়ী');
  const headline = lang === 'en'
    ? (siteConfig.hero_headline_en || 'PRINCE EDWARD ISLAND, CANADA')
    : (siteConfig.hero_headline_bn || 'সাজেক ভ্যালি ও পার্বত্য চট্টগ্রাম');
  const subheadline = lang === 'en'
    ? (siteConfig.hero_subheadline_en || 'Best in Travel winner rewards visitors with some of the world’s softest coastal scenery, serene cloudscapes, and rich cultural lore. A traveler’s paradise, inviting you to slow down, explore indigenous trails, and savor every sunset.')
    : (siteConfig.hero_subheadline_bn || 'প্রকৃতির অপূর্ব মেঘের রাজ্য, স্নিগ্ধ পাহাড়ি উপত্যকা ও সমৃদ্ধ স্থানীয় সংস্কৃতির মেলবন্ধন। রোমাঞ্চকর পাহাড়ি ট্রেইল ও মেঘের ওপর সূর্যাস্তের অসাধারণ অভিজ্ঞতা নিয়ে শান্তিময় ভ্রমণের সেরা ঠিকানা।');
  const ctaText = lang === 'en'
    ? (siteConfig.hero_cta_text_en || 'BEST IN TRAVEL 2026')
    : (siteConfig.hero_cta_text_bn || '২০২৬ এর সেরা তালিকা দেখুন');
  const photographerTag = siteConfig.hero_photographer_tag || 'PHOTO: SANDVIORA EDITORIAL ARCHIVE';

  return (
    <div className="relative w-full">
      {/* Full-Bleed Hero Section */}
      <section className="relative w-full overflow-hidden flex flex-col justify-end min-h-[560px] sm:min-h-[680px] lg:min-h-[820px] bg-[#121212]">
        {/* Full Bleed Background Image */}
        <div className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
          <img
            src={bgImage}
            alt={headline}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Subtle editorial vignette overlay */}
          <div className="absolute inset-0 bg-black/25 z-1" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pb-14 flex flex-col justify-end">
          <div className="max-w-3xl flex flex-col gap-4 sm:gap-6">
            
            {/* Monospace Eyebrow Kicker */}
            <div className="flex items-center gap-2">
              <span className="text-white text-xs sm:text-sm font-mono tracking-widest uppercase bg-black/40 backdrop-blur-xs px-3 py-1 rounded-sm border border-white/20">
                {badgeText}
              </span>
            </div>

            {/* Giant Condensed Display Headline */}
            <h1 
              className="text-white text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.88] drop-shadow-md"
              style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
            >
              {headline}
            </h1>

            {/* Floating Sage Green Editorial Card (SANDVIORA Signature bg-[#D2DEC4] / -rotate-1) */}
            <div className="bg-[#D2DEC4] text-[#1D232C] p-6 sm:p-7 sm:-rotate-1 shadow-xl max-w-xl border border-[#b8c9a6]">
              <p className="text-sm sm:text-base font-normal leading-relaxed text-[#1D232C] mb-5">
                {subheadline}
              </p>

              <div className="flex sm:rotate-1">
                <a
                  href="#destinations"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md cursor-pointer group"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>

          {/* Photographer Attribution in bottom corner */}
          <div className="mt-6 flex justify-end">
            <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2.5 py-0.5 rounded-sm">
              {photographerTag}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
