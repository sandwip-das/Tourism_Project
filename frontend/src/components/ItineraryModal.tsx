'use client';

import React from 'react';
import { TourPackage } from '../types';
import { X, Clock, MapPin, Users, Check, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface ItineraryModalProps {
  tour: TourPackage;
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
  onProceedToBooking: (tour: TourPackage) => void;
}

export default function ItineraryModal({
  tour,
  isOpen,
  onClose,
  lang,
  onProceedToBooking,
}: ItineraryModalProps) {
  if (!isOpen) return null;

  const price = Number(tour.discount_price_bdt || tour.price_bdt);

  return (
    <div className="modal-overlay z-50">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none sm:rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black shrink-0">
          <img
            src={tour.featured_image}
            alt={tour.title_en}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Copy */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 block mb-2">
              {tour.duration_days} DAYS / {tour.duration_nights} NIGHTS • {tour.category_name || 'EXPEDITION'}
            </span>
            <h2 
              className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight"
              style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
            >
              {lang === 'en' ? tour.title_en : tour.title_bn}
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2">
              {lang === 'en' ? tour.tagline_en : tour.tagline_bn}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8 flex-1">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 border border-gray-200 text-xs font-mono">
            <div>
              <span className="text-gray-400 block uppercase">STARTING FROM</span>
              <span className="font-bold text-[#1D232C]">{tour.start_location}</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase">MAX GROUP</span>
              <span className="font-bold text-[#1D232C]">{tour.max_group_size} Explorers</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase">DIFFICULTY</span>
              <span className="font-bold text-[#1D232C] uppercase">{tour.difficulty_level}</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase">PERMITS</span>
              <span className="font-bold text-emerald-600 uppercase">Verified & Handled</span>
            </div>
          </div>

          {/* Overview Paragraph */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">
              {lang === 'en' ? 'EXPEDITION OVERVIEW' : 'ট্যুর সংক্ষিপ্ত বিবরণ'}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              {lang === 'en'
                ? (tour.overview_en || tour.tagline_en)
                : (tour.overview_bn || tour.tagline_bn)}
            </p>
          </div>

          {/* Day by Day Schedule */}
          {tour.itinerary_days && tour.itinerary_days.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">
                {lang === 'en' ? 'DAY-BY-DAY ITINERARY' : 'দিনভিত্তিক ভ্রমণ পরিকল্পনা'}
              </h3>
              <div className="space-y-4">
                {tour.itinerary_days.map((day) => (
                  <div key={day.day_number} className="border-l-2 border-[#1D232C] pl-4 py-1">
                    <span className="text-xs font-mono text-[#0057D9] uppercase font-bold">
                      DAY {day.day_number}
                    </span>
                    <h4 className="text-base font-bold text-[#1D232C] mt-0.5">
                      {lang === 'en' ? day.title_en : day.title_bn}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      {lang === 'en' ? day.description_en : day.description_bn}
                    </p>
                    {(day.meals_included || day.accommodation_info) && (
                      <div className="flex gap-4 mt-2 text-[11px] font-mono text-gray-500">
                        {day.meals_included && <span>Meals: {day.meals_included}</span>}
                        {day.accommodation_info && <span>Stay: {day.accommodation_info}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          {tour.inclusions && tour.inclusions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-700 mb-3 flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4" />
                  <span>WHAT’S INCLUDED</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-600 font-normal">
                  {tour.inclusions.filter((inc) => inc.is_included).map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{lang === 'en' ? inc.item_en : inc.item_bn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-red-600 mb-3 flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>EXCLUSIONS</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-600 font-normal">
                  {tour.inclusions.filter((inc) => !inc.is_included).map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">✕</span>
                      <span>{lang === 'en' ? inc.item_en : inc.item_bn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing & Proceed CTA */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-[10px] font-mono uppercase text-gray-400 block leading-none">
              PRICE PER TRAVELER
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-[#1D232C]">
                ৳{price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                BDT all taxes included
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-700 hover:bg-gray-100 transition-colors w-full sm:w-auto cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToBooking(tour);
              }}
              className="px-7 py-3 rounded-full bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-colors shadow-md w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'en' ? 'BOOK THIS EXPEDITION' : 'বুকিং করুন'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
