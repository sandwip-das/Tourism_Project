'use client';

import React from 'react';

interface MediaTrustBarProps {
  lang: 'en' | 'bn';
}

export default function MediaTrustBar({ lang }: MediaTrustBarProps) {
  const mediaOutlets = [
    { name: 'The Daily Star', tag: 'LEADING EDITORIAL' },
    { name: 'Dhaka Tribune', tag: 'NATIONAL JOURNAL' },
    { name: 'CNN Travel', tag: 'INTERNATIONAL' },
    { name: 'BBC Travel', tag: 'GLOBAL DISPATCHES' },
    { name: 'National Geographic', tag: 'WILDLIFE & GEO' },
    { name: 'Prothom Alo', tag: 'BANGLADESH' },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-6">
          {lang === 'en' ? 'FEATURED IN & RECOGNIZED BY' : 'বিভিন্ন গণমাধ্যমে ফিচারড ও প্রশংসিত'}
        </span>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {mediaOutlets.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#002B49] font-sans hover:text-[#0057D9] transition-colors">
                {m.name}
              </span>
              <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">
                {m.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
