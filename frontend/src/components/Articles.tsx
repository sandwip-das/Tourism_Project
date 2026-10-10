'use client';

import React from 'react';
import { ArrowRight, Clock, BookOpen, Bookmark } from 'lucide-react';

interface ArticlesProps {
  lang: 'en' | 'bn';
}

const articlesData = [
  {
    id: 1,
    title_en: 'A Journey into the Clouds: The Complete Guide to Sajek Valley',
    title_bn: 'মেঘের উপত্যকায় হারিয়ে যাওয়া: সাজেক ভ্যালির পূর্ণাঙ্গ ভ্রমণ গাইড',
    summary_en: 'From boarding the open-top Chander Gari military convoys to waking up with clouds swirling past your wooden balcony, here is how to plan an unforgettable stay.',
    summary_bn: 'দীঘিনালা থেকে চাঁদের গাড়ির কনভয়, কাঠের কটেজের ব্যালকনি থেকে মেঘের ভেলা আর কংলাক চূড়ার সূর্যোদয়—সব প্রয়োজনীয় তথ্য।',
    category: 'HILL TRACTS',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80',
    date: 'Oct 2026',
    author: 'Editorial Desk',
  },
  {
    id: 2,
    title_en: 'Tracking the Royal Bengal Tiger in the Silent Mangroves of Sundarbans',
    title_bn: 'সুন্দরবনের নীরব খালে রয়েল বেঙ্গল টাইগারের পদচিহ্ন অন্বেষণ',
    summary_en: 'What it feels like to silently cruise through tidal waterways where the world’s largest halophytic forest meets the Bay of Bengal.',
    summary_bn: 'জোয়ার-ভাটার নদীর মোহনা, চিত্রা হরিণের দল এবং করমজল ও কটকা অভয়ারণ্যে বন্যপ্রাণী পর্যবেক্ষণের বাস্তব অভিজ্ঞতা।',
    category: 'WILDLIFE & SAFARI',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    date: 'Sep 2026',
    author: 'Wildlife Naturalist',
  },
  {
    id: 3,
    title_en: 'Cycling Through Emerald Slopes: Sreemangal Beyond the Tea Cup',
    title_bn: 'সবুজ চা বাগানে সাইক্লিং: শ্রীমঙ্গলের নির্মল অবকাশ',
    summary_en: 'Explore centuries-old tea estates, Lawachara rainforest gibbon trails, and seven-layer tea stalls in the verdant capital of Moulvibazar.',
    summary_bn: 'লাউয়াছড়া রেইনফরেস্টের ট্রেইল, মাধবপুর লেক ও শ্রীমঙ্গলের শতাব্দী প্রাচীন চা বাগানের নীরবতায় সাইকেল ভ্রমণের আনন্দ।',
    category: 'ECO TRAVEL',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    date: 'Sep 2026',
    author: 'Local Guide',
  },
  {
    id: 4,
    title_en: 'The 120km Endless Horizon: Exploring Cox’s Bazar Marine Drive',
    title_bn: '১২০ কিমি অবিচ্ছিন্ন সমুদ্র সৈকত: মেরিন ড্রাইভ ও ইনানীর রূপকথা',
    summary_en: 'Where steep green cliff-sides meet crashing waves of the Bay of Bengal—the story behind the world’s longest natural shoreline.',
    summary_bn: 'একপাশে সবুজ পাহাড় আর অন্যপাশে উত্তাল বঙ্গোপসাগরের নীল জলরাশি নিয়ে গড়ে ওঠা দৃষ্টিনন্দন মেরিন ড্রাইভ রোড।',
    category: 'COASTAL ROADS',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    date: 'Aug 2026',
    author: 'Travel Editor',
  },
];

export default function Articles({ lang }: ArticlesProps) {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#0057D9] uppercase mb-2 block">
              {lang === 'en' ? 'STORIES FROM THE ROAD' : 'ভ্রমণ কাহিনী ও গাইড'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D232C] tracking-tight">
              {lang === 'en' ? 'Expert Guides & Travel Inspiration' : 'অনুপ্রেরণামূলক ভ্রমণ গল্প ও গাইড'}
            </h2>
            <p className="text-gray-600 mt-2 text-base max-w-2xl leading-relaxed">
              {lang === 'en'
                ? 'Curated dispatches, practical itineraries, and cultural insights from our resident Bangladeshi travelers.'
                : 'আমাদের স্থানীয় ভ্রমণ বিশেষজ্ঞদের বাস্তব অভিজ্ঞতা ও ভ্রমণ নির্দেশিকা।'}
            </p>
          </div>

          <a
            href="#destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0057D9] hover:underline"
          >
            <span>{lang === 'en' ? 'Read all travel stories' : 'সব গল্প পড়ুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4-Column Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articlesData.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title_en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 text-[#002B49] text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
                  {art.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#0057D9]" />
                      {art.readTime}
                    </span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#1D232C] mb-2 group-hover:text-[#0057D9] transition-colors line-clamp-2 leading-snug">
                    {lang === 'en' ? art.title_en : art.title_bn}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
                    {lang === 'en' ? art.summary_en : art.summary_bn}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0057D9]">
                  <span className="group-hover:underline">
                    {lang === 'en' ? 'Read Story' : 'গল্পটি পড়ুন'} →
                  </span>
                  <span className="text-[11px] text-gray-400 font-normal">
                    {art.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
