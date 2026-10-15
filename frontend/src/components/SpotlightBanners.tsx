'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SpotlightFeature } from '../types';

interface SpotlightBannersProps {
  spotlights?: SpotlightFeature[];
  lang: 'en' | 'bn';
  onBookTourClick?: () => void;
}

const defaultTrending: SpotlightFeature = {
  feature_type: 'trending',
  kicker_en: 'TRENDING DESTINATION',
  kicker_bn: 'জনপ্রিয় ট্রেন্ডিং গন্তব্য',
  title_en: 'Sreemangal & Sylhet Highlands',
  title_bn: 'শ্রীমঙ্গল ও সিলেটের সবুজ পাহাড়',
  description_en: 'Rolling emerald tea terraces, endangered hoolock gibbon canopies, crystal forest streams, and legendary seven-layer tea. Experience the quietest, most rejuvenating atmosphere in the northeast.',
  description_bn: 'দুটি পাতা একটি কুঁড়ির সবুজ চা বাগান, বিলুপ্তপ্রায় উল্লুকের ডাক, লাউয়াছড়া রেইনফরেস্ট ট্রেইল ও বিখ্যাত সাত রঙের চায়ের অভিজ্ঞতা। প্রকৃতির স্নিগ্ধতায় হারিয়ে যাওয়ার জন্য সেরা গন্তব্য।',
  image_url: '/media/image_2ota2fffb95n77picluv9gmt2h.webp',
  cta_text_en: 'READ TRAVEL GUIDE',
  cta_text_bn: 'ভ্রমণ গাইড পড়ুন',
  cta_url: '#destinations',
  order: 1,
};

const defaultPartner: SpotlightFeature = {
  feature_type: 'partner',
  kicker_en: 'PARTNER SPOTLIGHT',
  kicker_bn: 'পার্টনার স্পটলাইট',
  title_en: 'Tanguar Haor: Starlight Wetland Haven',
  title_bn: 'টাঙ্গুয়ার হাওর: ভাসমান জলরাশির স্বর্গ',
  description_en: 'Glide across crystal wetlands against the Meghalaya hill silhouettes. Savor fresh indigenous delicacies and spend a tranquil night beneath open celestial constellations with our verified houseboat partners.',
  description_bn: 'মেঘালয় পাহাড়ের পাদদেশে স্বচ্ছ জলরাশিতে ভাসমান রাত, ঐতিহ্যবাহী হাঁসের মাংসের ভূরিভোজ এবং তারার মেলা। আমাদের ভেরিফাইড লোকাল হাউসবোট পার্টনারদের সাথে নিরাপদ ভ্রমণ।',
  image_url: '/media/image_9sjv8he53p33f55no19p6nti50.webp',
  cta_text_en: 'PLAN YOUR EXPEDITION',
  cta_text_bn: 'ট্যুর প্যাকেজ বুক করুন',
  cta_url: '#tours',
  order: 2,
};

export default function SpotlightBanners({ spotlights, lang, onBookTourClick }: SpotlightBannersProps) {
  const trending = spotlights?.find((s) => s.feature_type === 'trending') || defaultTrending;
  const partner = spotlights?.find((s) => s.feature_type === 'partner') || defaultPartner;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. TRENDING DESTINATION (SANDVIORA Split Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] w-full lg:[rotate:-1deg] overflow-hidden shadow-lg border border-gray-200">
              <img
                src={trending.image_url}
                alt={trending.title_en}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            <span className="text-xs font-mono tracking-widest uppercase text-gray-500">
              {lang === 'en' ? trending.kicker_en : trending.kicker_bn}
            </span>

            <h3 
              className="text-4xl sm:text-5xl font-black text-[#1D232C] uppercase leading-[0.95]"
              style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
            >
              {lang === 'en' ? trending.title_en : trending.title_bn}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              {lang === 'en' ? trending.description_en : trending.description_bn}
            </p>

            <div className="pt-2">
              <a
                href={trending.cta_url}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest rounded-full transition-colors shadow-md cursor-pointer group"
              >
                <span>{lang === 'en' ? trending.cta_text_en : trending.cta_text_bn}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. PARTNER SPOTLIGHT (SANDVIORA Immersion Banner) */}
        <div className="relative min-h-[460px] sm:min-h-[540px] flex items-end overflow-hidden shadow-lg border border-gray-200">
          <img
            src={partner.image_url}
            alt={partner.title_en}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-1" />

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white flex flex-col gap-4">
            <span className="text-xs font-mono tracking-widest uppercase text-white/90">
              {lang === 'en' ? partner.kicker_en : partner.kicker_bn}
            </span>

            <h3 
              className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight"
              style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
            >
              {lang === 'en' ? partner.title_en : partner.title_bn}
            </h3>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              {lang === 'en' ? partner.description_en : partner.description_bn}
            </p>

            <div className="pt-2">
              <a
                href={partner.cta_url}
                onClick={onBookTourClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-gray-100 text-[#1D232C] text-xs font-mono uppercase tracking-widest rounded-full transition-all shadow-md cursor-pointer group"
              >
                <span>{lang === 'en' ? partner.cta_text_en : partner.cta_text_bn}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
