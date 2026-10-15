'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ActionMatrixCard } from '../types';

interface ActionMatrixProps {
  cards?: ActionMatrixCard[];
  lang: 'en' | 'bn';
  onBookTourClick?: () => void;
}

const defaultCards: ActionMatrixCard[] = [
  {
    order: 1,
    kicker_en: 'PLAN IT YOURSELF',
    kicker_bn: 'নিজের ভ্রমণ নিজে সাজান',
    title_en: 'BOOKS',
    title_bn: 'গাইডবুক',
    cta_text_en: 'SHOP GUIDEBOOKS',
    cta_text_bn: 'গাইডবুক কিনুন',
    image_url: '/media/image_57elqnia655m5eq2pr4dv8o23o.jpg',
    bg_color: 'bg-[#C95A1E]',
    target_url: '#destinations',
  },
  {
    order: 2,
    kicker_en: 'GET INSPIRED',
    kicker_bn: 'অনুপ্রেরণা নিন',
    title_en: 'STORIES',
    title_bn: 'ভ্রমণ গল্প',
    cta_text_en: 'ALL ARTICLES',
    cta_text_bn: 'সকল প্রতিবেদন',
    image_url: '/media/image_bdr35r8n513an9lek9up12qa4d.webp',
    bg_color: 'bg-[#2B3A42]',
    target_url: '#articles',
  },
  {
    order: 3,
    kicker_en: "WE'LL PLAN IT FOR YOU",
    kicker_bn: 'আমাদের দল সাজাবে',
    title_en: 'JOURNEYS',
    title_bn: 'অভিযান',
    cta_text_en: 'FIND A LOCAL EXPERT',
    cta_text_bn: 'লোকাল গাইড খুঁজুন',
    image_url: '/media/image_5q471hcfsl6vp2hpirr9aj653e.webp',
    bg_color: 'bg-[#3D405B]',
    target_url: '#tours',
  },
  {
    order: 4,
    kicker_en: 'BUILD YOUR TRIP',
    kicker_bn: 'ভ্রমণ সাজান ফোনে',
    title_en: 'THE SANDVIORA APP',
    title_bn: 'স্যান্ডভিওরা অ্যাপ',
    cta_text_en: 'DOWNLOAD NOW',
    cta_text_bn: 'অ্যাপ ডাউনলোড করুন',
    image_url: '/media/image_cs2skhiagd5td9tf88jp6cdb43.webp',
    bg_color: 'bg-[#1E293B]',
    target_url: '#destinations',
  },
];

export default function ActionMatrix({ cards, lang, onBookTourClick }: ActionMatrixProps) {
  const activeCards = cards && cards.length > 0 ? cards : defaultCards;

  return (
    <section id="block-promotions" className="py-14 sm:py-20 bg-[#F4F5F7] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Monospace Divider Header Bar (SANDVIORA signature) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#1D232C] whitespace-nowrap">
            {lang === 'en' ? 'YOUR TRAVEL BEGINS HERE.' : 'আপনার ভ্রমণ এখান থেকেই শুরু।'}
          </p>
          <div className="h-px bg-gray-300 flex-1 hidden md:block mx-6" />
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-gray-500 whitespace-nowrap">
            {lang === 'en' ? 'CHOOSE YOUR FIRST STEP.' : 'আপনার প্রথম পদক্ষেপ বেছে নিন।'}
          </p>
        </div>

        {/* 2x2 Grid of High-Impact Photographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {activeCards.map((card, idx) => (
            <a
              key={idx}
              href={card.target_url}
              onClick={card.target_url === '#tours' && onBookTourClick ? onBookTourClick : undefined}
              className={`group relative h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden block ${card.bg_color || 'bg-black'} shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5`}
            >
              {/* Background Photography */}
              <img
                src={card.image_url}
                alt={card.title_en}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Editorial Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

              {/* Card Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white">
                <span className="text-xs font-mono tracking-widest uppercase text-white/90 mb-2">
                  {lang === 'en' ? card.kicker_en : card.kicker_bn}
                </span>

                <h3 
                  className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[0.88] drop-shadow-sm"
                  style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
                >
                  {lang === 'en' ? card.title_en : card.title_bn}
                </h3>

                <div>
                  <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-[#1D232C] text-xs font-mono uppercase tracking-widest transition-all shadow-md group-hover:translate-x-1">
                    <span>{lang === 'en' ? card.cta_text_en : card.cta_text_bn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
