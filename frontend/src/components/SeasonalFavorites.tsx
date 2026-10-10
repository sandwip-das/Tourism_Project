'use client';

import React, { useRef } from 'react';
import { TourPackage } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SeasonalFavoritesProps {
  tours: TourPackage[];
  lang: 'en' | 'bn';
  onViewItinerary: (tour: TourPackage) => void;
  onBookTour?: (tour: TourPackage) => void;
}

export default function SeasonalFavorites({
  tours,
  lang,
  onViewItinerary,
}: SeasonalFavoritesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="seasonal-favorites" className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1D232C] uppercase leading-none"
              style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
            >
              {lang === 'en' ? 'Our Seasonal Favorites' : 'আমাদের প্রিয় মৌসুমী ভ্রমণ'}
            </h2>
            <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              {lang === 'en'
                ? "From the emerald tea valleys of Sylhet to the untouched mangrove waterways of Sundarbans and starlit nights of Tanguar Haor, here are a few of our favorite places to explore this season. Explore them all with our expertly designed itineraries."
                : 'শ্রীমঙ্গলের সবুজ চা বাগান থেকে শুরু করে সুন্দরবনের গহিন ম্যানগ্রোভ আর টাঙ্গুয়ার হাওরের ভাসমান জ্যোৎস্না — এই মৌসুমে ভ্রমণের জন্য আমাদের সেরা নির্বাচিত ট্যুর প্যাকেজ।'}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous slide"
              className="w-11 h-11 rounded-full bg-white hover:bg-gray-100 text-[#1D232C] border border-gray-300 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next slide"
              className="w-11 h-11 rounded-full bg-[#1D232C] hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Snap Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {tours.map((tour) => {
            const price = Number(tour.discount_price_bdt || tour.price_bdt);

            return (
              <div
                key={tour.id}
                className="w-[300px] sm:w-[360px] shrink-0 snap-start bg-white flex flex-col group border border-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                onClick={() => onViewItinerary(tour)}
              >
                {/* Flat rectangular image with ZERO border radius */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={tour.featured_image}
                    alt={tour.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
                    loading="lazy"
                  />
                  {tour.badge_label_en && (
                    <div className="absolute top-3 left-3 bg-[#1D232C] text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1">
                      {lang === 'en' ? tour.badge_label_en : tour.badge_label_bn}
                    </div>
                  )}
                </div>

                {/* Editorial Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Monospace Day/Night Tag */}
                    <span className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block mb-2">
                      {tour.duration_days} DAYS / {tour.duration_nights} NIGHTS
                    </span>

                    {/* Bold Title */}
                    <h3 className="text-lg font-bold text-[#1D232C] mb-2 leading-snug group-hover:text-[#0057D9] transition-colors line-clamp-2">
                      {lang === 'en' ? tour.title_en : tour.title_bn}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-6 leading-relaxed font-normal">
                      {lang === 'en' ? tour.tagline_en : tour.tagline_bn}
                    </p>
                  </div>

                  {/* Bottom Row: Black Pill CTA & Monospace Price */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewItinerary(tour);
                      }}
                      className="px-5 py-2.5 bg-[#1D232C] hover:bg-black text-white text-[11px] font-mono uppercase tracking-wider rounded-full transition-colors cursor-pointer shrink-0"
                    >
                      {lang === 'en' ? 'VIEW ITINERARY' : 'বিস্তারিত দেখুন'}
                    </button>

                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-gray-400 block leading-none">
                        {lang === 'en' ? 'FROM' : 'শুরু'}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1D232C]">
                        ৳{price.toLocaleString()}
                      </span>
                      <span className="text-[9px] text-gray-400 block -mt-0.5">
                        {lang === 'en' ? '/ per person' : '/ জন'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
