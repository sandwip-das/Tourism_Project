'use client';

import React, { useState } from 'react';
import { Destination, SectionContent } from '../types';
import { Star, Clock, Calendar, ArrowRight, X, Compass, ChevronRight } from 'lucide-react';

interface DestinationsProps {
  destinations: Destination[];
  sectionContent?: SectionContent;
  lang: 'en' | 'bn';
  onBookDestinationTour: (destName: string) => void;
}

export default function Destinations({
  destinations,
  sectionContent,
  lang,
  onBookDestinationTour,
}: DestinationsProps) {
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  const defaultBadge = lang === 'en' ? 'Iconic Bangladesh' : 'আইকনিক বাংলাদেশ';
  const defaultTitle = lang === 'en' ? 'Must-Visit Destinations' : 'সেরা ভ্রমণ গন্তব্যসমূহ';
  const defaultSubtitle = lang === 'en'
    ? 'From mist-shrouded hilltops to the world’s longest natural beaches, explore the places defining travel in Bangladesh.'
    : 'মেঘের রাজ্য সাজেক থেকে শুরু করে ম্যানগ্রোভ বন সুন্দরবন ও কক্সবাজারের সৈকত পর্যন্ত বিস্তৃত অনন্য রূপ।';

  const spotlightDest = destinations[0];
  const gridDests = destinations.slice(1);

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#0057D9] uppercase mb-2 block">
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

          <a
            href="#tours"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0057D9] hover:underline"
          >
            <span>{lang === 'en' ? 'View all travel itineraries' : 'সবগুলো ভ্রমণ পরিকল্পনা দেখুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Editorial Layout: 1 Featured Spotlight + Grid */}
        {spotlightDest && (
          <div
            onClick={() => setActiveModalDest(spotlightDest)}
            className="mb-10 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
              <img
                src={spotlightDest.hero_image}
                alt={spotlightDest.name_en}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#002B49] text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                {lang === 'en' ? '★ Featured Spotlight' : '★ বিশেষ গন্তব্য'}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  <span className="text-[#0057D9] font-bold">{spotlightDest.division_name}</span>
                  <span>•</span>
                  <span>{spotlightDest.ideal_duration}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1D232C] mb-3 group-hover:text-[#0057D9] transition-colors">
                  {lang === 'en' ? spotlightDest.name_en : spotlightDest.name_bn}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                  {lang === 'en' ? spotlightDest.overview_en : spotlightDest.overview_bn}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600 mb-6 py-3 border-y border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0057D9]" />
                    <span>Best Season: {spotlightDest.best_time_to_visit}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Rating: {spotlightDest.rating} ({spotlightDest.review_count} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-[#0057D9] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'en' ? 'Explore Comprehensive Guide' : 'পূর্ণাঙ্গ গাইড দেখুন'}</span>
                  <ChevronRight className="w-4 h-4" />
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookDestinationTour(spotlightDest.name_en);
                  }}
                  className="px-5 py-2.5 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Book Tour' : 'ট্যুর বুক করুন'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Destinations 3-Column Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridDests.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setActiveModalDest(dest)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.hero_image}
                  alt={dest.name_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#002B49] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                  {dest.division_name}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#0057D9] uppercase tracking-wider block mb-1">
                    {dest.category_display || dest.category.toUpperCase()}
                  </span>

                  <h3 className="text-xl font-bold text-[#1D232C] mb-2 group-hover:text-[#0057D9] transition-colors">
                    {lang === 'en' ? dest.name_en : dest.name_bn}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {lang === 'en' ? dest.tagline_en : dest.tagline_bn}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 py-3 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {dest.best_time_to_visit}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {dest.ideal_duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <span className="text-xs font-bold text-[#0057D9] group-hover:underline">
                      {lang === 'en' ? 'Read Travel Guide' : 'গাইড পড়ুন'} →
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookDestinationTour(dest.name_en);
                      }}
                      className="text-xs font-medium px-4 py-1.5 rounded-full bg-gray-100 hover:bg-[#0057D9] hover:text-white text-gray-800 transition-colors cursor-pointer"
                    >
                      {lang === 'en' ? 'Book Tour' : 'ট্যুর দেখুন'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Modal */}
      {activeModalDest && (
        <div className="modal-overlay" onClick={() => setActiveModalDest(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72">
              <img
                src={activeModalDest.hero_image}
                alt={activeModalDest.name_en}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalDest(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-gray-800 flex items-center justify-center hover:bg-white shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-[#002B49] text-white text-xs font-bold px-3 py-1 rounded-md">
                {activeModalDest.division_name}
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{activeModalDest.rating}</span>
                </div>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-semibold">{activeModalDest.review_count} traveler reviews</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#1D232C] mb-2">
                {lang === 'en' ? activeModalDest.name_en : activeModalDest.name_bn}
              </h2>
              <p className="text-sm font-semibold text-[#0057D9] mb-6">
                {lang === 'en' ? activeModalDest.tagline_en : activeModalDest.tagline_bn}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl mb-6 text-xs text-gray-700">
                <div>
                  <span className="text-gray-500 block mb-1">Best Time to Visit:</span>
                  <strong className="text-[#1D232C]">{activeModalDest.best_time_to_visit}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Ideal Duration:</span>
                  <strong className="text-[#1D232C]">{activeModalDest.ideal_duration}</strong>
                </div>
              </div>

              <div className="text-sm text-gray-700 leading-relaxed mb-8">
                {lang === 'en'
                  ? activeModalDest.overview_en || activeModalDest.tagline_en
                  : activeModalDest.overview_bn || activeModalDest.tagline_bn}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setActiveModalDest(null)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-bold hover:bg-gray-50 cursor-pointer"
                >
                  {lang === 'en' ? 'Close' : 'বন্ধ করুন'}
                </button>
                <button
                  onClick={() => {
                    const name = activeModalDest.name_en;
                    setActiveModalDest(null);
                    onBookDestinationTour(name);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#0057D9] hover:bg-[#0042a6] text-white text-sm font-bold cursor-pointer"
                >
                  {lang === 'en' ? 'Find Expeditions for This Place' : 'এই গন্তব্যের ট্যুর খুঁজুন'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
