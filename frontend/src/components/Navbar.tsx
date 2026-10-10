'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteConfig, NavigationItem } from '../types';
import { 
  Compass, Globe, Search, User, Menu, X, ChevronDown, 
  MapPin, Shield, LayoutDashboard, LogOut, Heart, ShoppingBag, 
  Mountain, Waves, Trees, Droplets, Landmark, Briefcase, HelpCircle, ArrowRight
} from 'lucide-react';

interface UserObject {
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  role_display?: string;
  avatar?: string;
}

interface NavbarProps {
  siteConfig: SiteConfig;
  navItems: NavigationItem[];
  lang: 'en' | 'bn';
  setLang: (l: 'en' | 'bn') => void;
  currentUser: string | UserObject | null;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onSignOut: () => void;
  onSearchClick: () => void;
  onOpenExpertAdvice?: () => void;
}

const BANGLADESH_DIVISIONS = [
  {
    name_en: 'Chattogram',
    name_bn: 'চট্টগ্রাম বিভাগ',
    spots: ['Cox’s Bazar', 'Sajek Valley', 'Saint Martin’s Island', 'Bandarban Hills'],
    icon: Mountain
  },
  {
    name_en: 'Sylhet',
    name_bn: 'সিলেট বিভাগ',
    spots: ['Jaflong River', 'Sreemangal Tea Estates', 'Ratargul Swamp', 'Tanguar Haor'],
    icon: Droplets
  },
  {
    name_en: 'Khulna',
    name_bn: 'খুলনা বিভাগ',
    spots: ['Sundarbans Mangrove', 'Kotka Wildlife Sanctuary', 'Bagerhat Sixty Dome Mosque'],
    icon: Trees
  },
  {
    name_en: 'Dhaka',
    name_bn: 'ঢাকা বিভাগ',
    spots: ['Ahsan Manzil', 'Lalbagh Fort', 'Panam Nagar Sonargaon', 'Nikli Haor'],
    icon: Landmark
  },
  {
    name_en: 'Barishal',
    name_bn: 'বরিশাল বিভাগ',
    spots: ['Kuakata Sunrise Beach', 'Floating Guava Market', 'Durga Sagar'],
    icon: Waves
  },
  {
    name_en: 'Rajshahi',
    name_bn: 'রাজশাহী বিভাগ',
    spots: ['Somapura Mahavihara', 'Puthia Temple Complex', 'Varendra Research Museum'],
    icon: Landmark
  },
  {
    name_en: 'Rangpur',
    name_bn: 'রংপুর বিভাগ',
    spots: ['Tajhat Palace', 'Teesta Barrage', 'Kantajew Temple Dinajpur'],
    icon: Landmark
  },
  {
    name_en: 'Mymensingh',
    name_bn: 'ময়মনসিংহ বিভাগ',
    spots: ['Birishiri Ceramic Lake', 'Garo Hills Susong Durgapur', 'Muktagacha Palace'],
    icon: Mountain
  },
];

const TOURISM_CATEGORIES = [
  { id: 'hills', label_en: 'Hills & Valleys', label_bn: 'পাহাড় ও উপত্যকা', icon: Mountain },
  { id: 'beach', label_en: 'Beaches & Coral Islands', label_bn: 'সমুদ্রসৈকত ও দ্বীপ', icon: Waves },
  { id: 'forest', label_en: 'Mangroves & Sundarbans', label_bn: 'ম্যানগ্রোভ ও সুন্দরবন', icon: Trees },
  { id: 'lake', label_en: 'Haor, Wetlands & Waterfalls', label_bn: 'হাওর ও জলপ্রপাত', icon: Droplets },
  { id: 'heritage', label_en: 'Archeology & Heritage', label_bn: 'ঐতিহাসিক ও পুরাকীর্তি', icon: Landmark },
];

export default function Navbar({
  siteConfig,
  navItems,
  lang,
  setLang,
  currentUser,
  onOpenSignIn,
  onOpenSignUp,
  onSignOut,
  onSearchClick,
  onOpenExpertAdvice,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsMenuOpen, setDestinationsMenuOpen] = useState(false);
  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const userObj: UserObject | null = typeof currentUser === 'string' 
    ? { username: currentUser, role: 'customer' } 
    : currentUser;

  const isStaff = userObj && ['superadmin', 'admin', 'moderator', 'creator', 'supervisor'].includes(userObj.role || '');
  const isAgent = userObj && userObj.role === 'agent';

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 transition-all duration-200">
      {/* Lonely Planet style clean navbar with NO clunky top banner bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo - clean Lonely Planet style with right border delimiter */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 pr-6 sm:border-r sm:border-gray-200 group">
              <div className="w-9 h-9 rounded-full bg-[#0057D9] flex items-center justify-center text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#002B49] uppercase font-sans">
                  SANDVIORA
                </span>
                <span className="text-[9px] uppercase font-medium tracking-widest text-[#0057D9] -mt-1">
                  {lang === 'en' ? 'BANGLADESH TRAVEL' : 'বাংলাদেশ ট্রাভেল'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Refined normal/medium font weights */}
            <nav className="hidden lg:flex items-center pl-6 gap-1 text-[13px] tracking-wider uppercase font-medium text-gray-700">
              
              {/* Destinations with Lonely Planet Style Hover Flyout */}
              <div 
                className="relative"
                onMouseEnter={() => setDestinationsMenuOpen(true)}
                onMouseLeave={() => setDestinationsMenuOpen(false)}
              >
                <button
                  type="button"
                  className="px-3.5 py-2 hover:text-[#0057D9] hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>{lang === 'en' ? 'Destinations' : 'গন্তব্যসমূহ'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${destinationsMenuOpen ? 'rotate-180 text-[#0057D9]' : ''}`} />
                </button>

                {/* Mega-Menu Flyout Dropdown */}
                {destinationsMenuOpen && (
                  <div className="absolute top-full -left-4 w-[760px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="grid grid-cols-12 gap-6">
                      
                      {/* Left: 8 Divisions */}
                      <div className="col-span-5 border-r border-gray-100 pr-4">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2 px-3">
                          {lang === 'en' ? '8 Divisions of Bangladesh' : 'বাংলাদেশের ৮টি বিভাগ'}
                        </span>
                        <div className="space-y-0.5">
                          {BANGLADESH_DIVISIONS.map((div, idx) => {
                            const Icon = div.icon;
                            const isSelected = activeDivisionIndex === idx;
                            return (
                              <button
                                key={div.name_en}
                                onMouseEnter={() => setActiveDivisionIndex(idx)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                                  isSelected 
                                    ? 'bg-[#0057D9] text-white font-medium shadow-xs' 
                                    : 'text-gray-700 hover:bg-gray-50 font-normal'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0057D9]'}`} />
                                  <span>{lang === 'en' ? div.name_en : div.name_bn}</span>
                                </div>
                                <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                                  →
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Selected Division Highlights & Categories */}
                      <div className="col-span-7 pl-2">
                        <div className="mb-4">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0057D9] block mb-1">
                            {lang === 'en' ? 'Featured in ' : 'জনপ্রিয় স্পট: '}
                            {lang === 'en' 
                              ? BANGLADESH_DIVISIONS[activeDivisionIndex].name_en 
                              : BANGLADESH_DIVISIONS[activeDivisionIndex].name_bn}
                          </span>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {BANGLADESH_DIVISIONS[activeDivisionIndex].spots.map((spot) => (
                              <a
                                key={spot}
                                href="#destinations"
                                onClick={() => setDestinationsMenuOpen(false)}
                                className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-blue-50/50 hover:border-[#0057D9]/30 transition-all block"
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-[#0057D9]" />
                                  <span className="text-xs font-medium text-gray-800 hover:text-[#0057D9]">
                                    {spot}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Landscape categories */}
                        <div className="pt-3 border-t border-gray-100">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                            {lang === 'en' ? 'Travel Landscapes' : 'প্রাকৃতিক ভূপ্রকৃতি'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {TOURISM_CATEGORIES.map((cat) => {
                              const CatIcon = cat.icon;
                              return (
                                <a
                                  key={cat.id}
                                  href="#destinations"
                                  onClick={() => setDestinationsMenuOpen(false)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 hover:bg-[#0057D9] hover:text-white text-[11px] font-medium text-gray-700 transition-colors"
                                >
                                  <CatIcon className="w-3 h-3" />
                                  <span>{lang === 'en' ? cat.label_en : cat.label_bn}</span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Curated Tours Link */}
              <a
                href="#tours"
                className="px-3.5 py-2 hover:text-[#0057D9] hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Curated Tours' : 'ট্যুর প্যাকেজ'}
              </a>

              {/* Travel Stories Link */}
              <a
                href="#articles"
                className="px-3.5 py-2 hover:text-[#0057D9] hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Stories & Guides' : 'ভ্রমণ গাইড'}
              </a>
            </nav>
          </div>

          {/* Right Actions: Search, Language Switch, Authentication */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className="p-2 rounded-full text-gray-600 hover:text-[#0057D9] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border border-gray-300 hover:border-gray-400 text-gray-700 bg-white hover:bg-gray-50 transition-all cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#0057D9]" />
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* User Profile dropdown or Sign In */}
            {userObj ? (
              <div className="relative pl-3 border-l border-gray-200">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-expanded={profileDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0057D9] text-white flex items-center justify-center text-xs font-semibold shadow-xs ring-2 ring-blue-100">
                    {userObj.avatar ? (
                      <img src={userObj.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      (userObj.first_name?.[0] || userObj.username[0] || 'U').toUpperCase()
                    )}
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#1D232C] truncate">
                        {userObj.first_name ? `${userObj.first_name} ${userObj.last_name || ''}` : userObj.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{userObj.email || `@${userObj.username}`}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-semibold uppercase rounded-full bg-blue-50 text-[#0057D9] border border-blue-100">
                        {userObj.role_display || userObj.role || 'Traveler'}
                      </span>
                    </div>

                    <div className="py-1">
                      {/* Unified Dashboard for all users */}
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0057D9] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-400" />
                        <span>{lang === 'en' ? 'Account Dashboard' : 'ড্যাশবোর্ড'}</span>
                      </Link>

                      {/* Operations Console for Admin / Staff */}
                      {isStaff && (
                        <Link
                          href="/platform-admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#002B49] hover:bg-blue-50 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-[#0057D9]" />
                          <span>{lang === 'en' ? 'Platform Control Console' : 'প্লাটফর্ম এডমিন প্যানেল'}</span>
                        </Link>
                      )}

                      {/* Agent Portal link */}
                      <Link
                        href="/agent-portal"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0057D9] transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span>{lang === 'en' ? 'Dynamic Agent Portal' : 'এজেন্ট ও হোটেল পোর্টাল'}</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{lang === 'en' ? 'Sign Out' : 'লগআউট'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
                <button
                  onClick={onOpenSignIn}
                  className="px-4 py-2 text-xs font-medium text-[#1D232C] hover:text-[#0057D9] transition-colors cursor-pointer"
                >
                  {lang === 'en' ? 'Sign In' : 'সাইন ইন'}
                </button>

                <button
                  onClick={onOpenSignUp}
                  className="px-4 py-1.5 rounded-full bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
                >
                  {lang === 'en' ? 'Join Community' : 'রেজিস্ট্রেশন'}
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1D232C] hover:text-[#0057D9]"
          >
            {lang === 'en' ? 'Destinations (8 Divisions)' : 'গন্তব্যসমূহ (৮ বিভাগ)'}
          </a>

          <a
            href="#tours"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1D232C] hover:text-[#0057D9]"
          >
            {lang === 'en' ? 'Curated Tours' : 'ট্যুর প্যাকেজ'}
          </a>

          <a
            href="#articles"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#1D232C] hover:text-[#0057D9]"
          >
            {lang === 'en' ? 'Stories & Guides' : 'ভ্রমণ গাইড'}
          </a>

          <Link
            href="/agent-portal"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#0057D9]"
          >
            {lang === 'en' ? 'Agent & Hotel Portal' : 'এজেন্ট ও হোটেল পোর্টাল'}
          </Link>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {userObj ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs font-medium text-gray-800">Hi, {userObj.username}</span>
                  <button onClick={onSignOut} className="text-xs text-red-600 font-medium">
                    {lang === 'en' ? 'Sign Out' : 'লগআউট'}
                  </button>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2 text-center text-xs font-medium bg-gray-100 text-[#002B49] rounded-xl"
                >
                  {lang === 'en' ? 'Account Dashboard' : 'ড্যাশবোর্ড'}
                </Link>
                {isStaff && (
                  <Link
                    href="/platform-admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2 text-center text-xs font-medium bg-[#002B49] text-white rounded-xl"
                  >
                    {lang === 'en' ? 'Platform Control Console' : 'এডমিন কনসোল'}
                  </Link>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full py-2 text-center text-xs font-medium border border-gray-300 rounded-lg text-gray-800"
                >
                  {lang === 'en' ? 'Sign In' : 'সাইন ইন'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignUp();
                  }}
                  className="w-full py-2 text-center text-xs font-medium bg-[#0057D9] text-white rounded-lg"
                >
                  {lang === 'en' ? 'Join Community' : 'রেজিস্ট্রেশন'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
