'use client';

import React from 'react';
import { TourPackage, SectionContent } from '../types';
import { Star, Clock, Users, MapPin, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface ToursProps {
  tours: TourPackage[];
  sectionContent?: SectionContent;
  lang: 'en' | 'bn';
  onBookTour: (tour: TourPackage) => void;
}

export default function Tours({
  tours,
  sectionContent,
  lang,
  onBookTour,
}: ToursProps) {
  const defaultBadge = lang === 'en' ? 'All-Inclusive Trips' : 'অল-ইনক্লুসিভ প্যাকেজ';
  const defaultTitle = lang === 'en' ? 'Handcrafted Expeditions & Itineraries' : 'রোমাঞ্চকর ভ্রমণ প্যাকেজ';
  const defaultSubtitle = lang === 'en'
    ? 'Designed by local experts with authentic storytelling, verified homestays, and safety escorts.'
    : 'আরামদায়ক যাতায়াত, মানসম্মত রিসোর্ট ও বিশ্বস্ত স্থানীয় আতিথেয়তায় সাজানো ট্যুর।';

  return (
    <section id="tours" className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#0D9488] uppercase mb-2 block">
              {sectionContent
                ? lang === 'en'
                  ? sectionContent.badge_en
                  : sectionContent.badge_bn
                : defaultBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D232C] tracking-tight">
              {sectionContent
                ? lang === 'en'
                  ? sectionContent.title_en
                  : sectionContent.title_bn
                : defaultTitle}
            </h2>
            <p className="text-gray-600 mt-2 text-base max-w-2xl leading-relaxed">
              {sectionContent
                ? lang === 'en'
                  ? sectionContent.subtitle_en
                  : sectionContent.subtitle_bn
                : defaultSubtitle}
            </p>
          </div>
        </div>

        {/* Tours Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => {
            const discountPrice = tour.discount_price_bdt ? Number(tour.discount_price_bdt) : null;
            const basePrice = Number(tour.price_bdt);

            return (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.featured_image}
                    alt={tour.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#002B49] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {lang === 'en' ? tour.badge_label_en : tour.badge_label_bn}
                  </div>

                  <div className="absolute bottom-2.5 left-3 bg-white/90 backdrop-blur-xs text-gray-800 text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <Clock className="w-3 h-3 text-[#0057D9]" />
                    <span>
                      {tour.duration_days} {lang === 'en' ? 'Days' : 'দিন'} / {tour.duration_nights} {lang === 'en' ? 'Nights' : 'রাত'}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-3 bg-black/75 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{tour.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#0057D9] uppercase tracking-wider block mb-1">
                      {tour.category_name || (lang === 'en' ? 'EXPEDITION' : 'অভিযান')}
                    </span>

                    <h3 className="text-base font-bold text-[#1D232C] mb-2 group-hover:text-[#0057D9] transition-colors line-clamp-2">
                      {lang === 'en' ? tour.title_en : tour.title_bn}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {lang === 'en' ? tour.tagline_en : tour.tagline_bn}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 py-2.5 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {tour.start_location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        Max {tour.max_group_size}
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block leading-none">
                          {lang === 'en' ? 'From' : 'শুরু'}
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-lg font-bold text-[#0057D9]">
                            ৳{(discountPrice || basePrice).toLocaleString()}
                          </span>
                          {discountPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{basePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onBookTour(tour)}
                        className="px-5 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shadow-xs"
                      >
                        {lang === 'en' ? 'Book Now' : 'বুক করুন'}
                      </button>
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
