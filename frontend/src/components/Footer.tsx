'use client';

import React from 'react';
import { SiteConfig } from '../types';
import { Compass, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  siteConfig: SiteConfig;
  lang: 'en' | 'bn';
}

export default function Footer({ siteConfig, lang }: FooterProps) {
  return (
    <footer className="bg-[#121212] text-gray-400 pt-16 pb-12 border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1 & 2: Brand, Tagline & App Badges */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#121212]">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}>
                SANDVIORA
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-normal">
              {lang === 'en' ? siteConfig.site_tagline_en : siteConfig.site_tagline_bn}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-gray-500 block mb-2">
                {lang === 'en' ? 'GET THE TRAVEL APP' : 'অ্যাপ ডাউনলোড করুন'}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-white text-xs font-mono tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>App Store</span>
                </a>
                <a
                  href="#"
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-white text-xs font-mono tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <span>Google Play</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Govt. Registered Tourism Organization • Dhaka</span>
            </div>
          </div>

          {/* Col 3: Destinations */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              {lang === 'en' ? 'DESTINATIONS' : 'গন্তব্যসমূহ'}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#destinations" className="hover:text-white transition-colors">Sajek Valley & Clouds</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Cox’s Bazar 120km Beach</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Sundarbans Mangroves</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Tanguar Haor Wetlands</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Sreemangal Tea Terraces</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Bandarban Highland Trails</a></li>
            </ul>
          </div>

          {/* Col 4: Curated Expeditions */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              {lang === 'en' ? 'EXPEDITIONS' : 'ট্যুর প্যাকেজ'}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#tours" className="hover:text-white transition-colors">Curated Seasonal Tours</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Best Time to Visit Guides</a></li>
              <li><a href="#seasonal-favorites" className="hover:text-white transition-colors">Handpicked Itineraries</a></li>
              <li><a href="#articles" className="hover:text-white transition-colors">Travel Stories & Dispatches</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Military & Route Clearances</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Booking Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Col 5: Contact & Head Office */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              {lang === 'en' ? 'HEAD OFFICE' : 'যোগাযোগ'}
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>{siteConfig.contact_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>{siteConfig.contact_email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                <span>{lang === 'en' ? siteConfig.office_address_en : siteConfig.office_address_bn}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Consumer Info Bar (Strictly Zero Admin/Staff links) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 SANDVIORA TOURISM LTD. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
