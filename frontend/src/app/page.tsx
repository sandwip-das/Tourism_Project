'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BestInTravelBanner from '../components/BestInTravelBanner';
import ActionMatrix from '../components/ActionMatrix';
import SeasonalFavorites from '../components/SeasonalFavorites';
import Destinations from '../components/Destinations';
import SpotlightBanners from '../components/SpotlightBanners';
import Articles from '../components/Articles';
import MediaTrustBar from '../components/MediaTrustBar';
import BookingModal from '../components/BookingModal';
import ItineraryModal from '../components/ItineraryModal';
import AuthModal from '../components/AuthModal';
import Footer from '../components/Footer';

import {
  fallbackConfig, fallbackNav, fallbackBadges,
  fallbackDestinations, fallbackTours, fallbackTestimonials, fallbackFaqs,
  fallbackCampaign, fallbackActionMatrix, fallbackSpotlights
} from '../lib/fallbackData';
import { fetchSiteInit, fetchDestinations, fetchTours } from '../lib/api';
import { 
  Destination, TourPackage, SiteConfig, NavigationItem, 
  FeatureBadge, SectionContent, Testimonial, FAQ,
  CampaignBanner, ActionMatrixCard, SpotlightFeature
} from '../types';
import { Star, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(fallbackConfig);
  const [campaignBanner, setCampaignBanner] = useState<CampaignBanner>(fallbackCampaign);
  const [actionMatrix, setActionMatrix] = useState<ActionMatrixCard[]>(fallbackActionMatrix);
  const [spotlights, setSpotlights] = useState<SpotlightFeature[]>(fallbackSpotlights);
  const [navItems, setNavItems] = useState<NavigationItem[]>(fallbackNav);
  const [badges, setBadges] = useState<FeatureBadge[]>(fallbackBadges);
  const [sections, setSections] = useState<Record<string, SectionContent>>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);

  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);
  const [tours, setTours] = useState<TourPackage[]>(fallbackTours);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [selectedItineraryTour, setSelectedItineraryTour] = useState<TourPackage | null>(null);
  const [selectedBookingTour, setSelectedBookingTour] = useState<TourPackage | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sandviora_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Load live data from backend API
  useEffect(() => {
    async function initData() {
      const siteInit = await fetchSiteInit();
      if (siteInit) {
        if (siteInit.site_config && Object.keys(siteInit.site_config).length > 0) {
          setSiteConfig(siteInit.site_config);
        }
        if (siteInit.campaign_banner) {
          setCampaignBanner(siteInit.campaign_banner);
        }
        if (siteInit.action_matrix && siteInit.action_matrix.length > 0) {
          setActionMatrix(siteInit.action_matrix);
        }
        if (siteInit.spotlights && siteInit.spotlights.length > 0) {
          setSpotlights(siteInit.spotlights);
        }
        if (siteInit.navigation && siteInit.navigation.length > 0) {
          setNavItems(siteInit.navigation);
        }
        if (siteInit.feature_badges && siteInit.feature_badges.length > 0) {
          setBadges(siteInit.feature_badges);
        }
        if (siteInit.sections) {
          setSections(siteInit.sections);
        }
        if (siteInit.testimonials && siteInit.testimonials.length > 0) {
          setTestimonials(siteInit.testimonials);
        }
        if (siteInit.faqs && siteInit.faqs.length > 0) {
          setFaqs(siteInit.faqs);
        }
      }

      const dests = await fetchDestinations();
      if (dests && dests.length > 0) {
        setDestinations(dests);
      }

      const tourList = await fetchTours();
      if (tourList && tourList.length > 0) {
        setTours(tourList);
      }
    }

    initData();
  }, []);

  // Filtered destinations
  const filteredDestinations = destinations.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      d.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.name_bn.includes(searchQuery) ||
      d.division_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookDestinationTour = (destName: string) => {
    const matchedTour = tours.find((t) =>
      t.destination_name?.toLowerCase().includes(destName.toLowerCase()) ||
      t.title_en.toLowerCase().includes(destName.toLowerCase())
    );
    if (matchedTour) {
      setSelectedItineraryTour(matchedTour);
    } else if (tours.length > 0) {
      setSelectedItineraryTour(tours[0]);
    }
  };

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1D232C] antialiased">
      {/* 1. Global Navigation Bar with Destinations Mega-Menu */}
      <Navbar
        siteConfig={siteConfig}
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        currentUser={currentUser}
        onOpenSignIn={() => {
          setAuthModalTab('signin');
          setAuthModalOpen(true);
        }}
        onOpenSignUp={() => {
          setAuthModalTab('signup');
          setAuthModalOpen(true);
        }}
        onSignOut={() => {
          localStorage.removeItem('sandviora_user');
          setCurrentUser(null);
        }}
        onSearchClick={scrollToDestinations}
      />

      {/* 2. Best in Travel Winner Hero Section (Full-bleed + Sage floating card) */}
      <Hero
        siteConfig={siteConfig}
        badges={badges}
        lang={lang}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onExploreClick={scrollToDestinations}
      />

      {/* 3. Best in Travel 2026 Editorial Callout Banner (Dynamically managed) */}
      <BestInTravelBanner
        banner={campaignBanner}
        lang={lang}
        onExploreClick={scrollToDestinations}
      />

      {/* 4. "Your travel begins here. Choose your first step." 4-Pillar Action Matrix (Dynamic) */}
      <ActionMatrix
        cards={actionMatrix}
        lang={lang}
        onBookTourClick={() => tours.length > 0 && setSelectedItineraryTour(tours[0])}
      />

      {/* 5. "Our Seasonal Favorites" Horizontal Snap Carousel */}
      <SeasonalFavorites
        tours={tours}
        lang={lang}
        onViewItinerary={(tour) => setSelectedItineraryTour(tour)}
        onBookTour={(tour) => setSelectedBookingTour(tour)}
      />

      {/* 6. Handpicked Destinations (8 Geo-Divisions Grid & Spotlight Card) */}
      <Destinations
        destinations={filteredDestinations}
        sectionContent={sections['destinations_featured']}
        lang={lang}
        onBookDestinationTour={handleBookDestinationTour}
      />

      {/* 7. Trending Destination & Partner Spotlight Feature Cards (Dynamic) */}
      <SpotlightBanners
        spotlights={spotlights}
        lang={lang}
        onBookTourClick={() => tours.length > 0 && setSelectedItineraryTour(tours[0])}
      />

      {/* 8. Stories from the Road (Expert Travel Dispatches & Itineraries) */}
      <Articles lang={lang} />

      {/* 9. Media Trust Bar ("FEATURED IN") */}
      <MediaTrustBar lang={lang} />

      {/* 10. Traveler Testimonials */}
      <section className="py-16 sm:py-20 bg-[#F4F5F7] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057D9] mb-2 block">
              {lang === 'en' ? 'VERIFIED COMMUNITY DISPATCHES' : 'ভ্রমণকারীদের বাস্তব অনুভূতি'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1D232C] font-sans">
              {lang === 'en' ? 'Loved by Explorers Across the World' : 'দেশ-বিদেশের ভ্রমণকারীদের অভিজ্ঞতা'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white p-7 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                    &ldquo;{lang === 'en' ? t.comment_en : t.comment_bn}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={t.author_avatar}
                    alt={t.author_name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1D232C]">{t.author_name}</h4>
                    <p className="text-[11px] text-gray-500">{t.author_role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Frequently Asked Questions Accordion */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0057D9] mb-2 block">
              {lang === 'en' ? 'TRAVEL PLANNING FAQ' : 'জরুরি প্রশ্নোত্তর'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D232C] font-sans">
              {lang === 'en' ? 'Everything you need to know before you go' : 'ভ্রমণে বের হওয়ার আগে যা জানা প্রয়োজন'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => {
              const isExpanded = expandedFaq === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setExpandedFaq(isExpanded ? null : f.id)}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors cursor-pointer bg-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm sm:text-base font-bold text-[#1D232C]">
                      {lang === 'en' ? f.question_en : f.question_bn}
                    </h4>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#0057D9]' : ''
                      }`}
                    />
                  </div>

                  {isExpanded && (
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed pt-3 border-t border-gray-100 font-normal">
                      {lang === 'en' ? f.answer_en : f.answer_bn}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. SANDVIORA Royal Blue Newsletter Section */}
      <section id="NL-HOMEPAGE-section" className="bg-[#0057D9] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: '"American Grotesk Compressed", "Plus Jakarta Sans", sans-serif' }}
          >
            {lang === 'en' ? 'SUBSCRIBE TO THE SANDVIORA NEWSLETTER' : 'স্যান্ডভিওরা ট্রাভেল নিউজলেটারে সাবস্ক্রাইব করুন'}
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            {lang === 'en'
              ? 'Get access to everything Sandviora, plus 20% off your first guidebook or tour.'
              : 'আমাদের সকল প্রকাশনা ও ট্যুর গাইডের নিয়মিত আপডেট এবং প্রথম বুকিংয়ে পান ২০% ছাড়।'}
          </p>

          {newsletterSubscribed ? (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0057D9] rounded-full text-xs font-mono uppercase tracking-wider font-bold shadow-md">
              <CheckCircle className="w-4 h-4 text-[#0057D9]" />
              <span>{lang === 'en' ? 'Thanks — check your inbox to confirm your subscription.' : 'ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।'}</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={lang === 'en' ? 'Enter your email address' : 'আপনার ইমেইল লিখুন'}
                className="w-full px-5 py-3.5 text-sm bg-white text-[#1D232C] rounded-full outline-none placeholder-gray-500 font-normal shadow-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest rounded-full transition-colors shrink-0 cursor-pointer shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>{lang === 'en' ? 'SIGN UP' : 'সাবস্ক্রাইব'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 13. Authentic Multi-Column Footer */}
      <Footer siteConfig={siteConfig} lang={lang} />

      {/* 14. Day-by-Day Itinerary Details Drawer / Modal */}
      {selectedItineraryTour && (
        <ItineraryModal
          tour={selectedItineraryTour}
          isOpen={Boolean(selectedItineraryTour)}
          onClose={() => setSelectedItineraryTour(null)}
          lang={lang}
          onProceedToBooking={(tour) => {
            setSelectedItineraryTour(null);
            setSelectedBookingTour(tour);
          }}
        />
      )}

      {/* 15. Authenticated Tour Booking & Real Payment Modal */}
      {selectedBookingTour && (
        <BookingModal
          tour={selectedBookingTour}
          onClose={() => setSelectedBookingTour(null)}
          lang={lang}
          currentUser={currentUser}
          onOpenAuth={() => {
            setAuthModalTab('signin');
            setAuthModalOpen(true);
          }}
        />
      )}

      {/* 16. User Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialTab={authModalTab}
        onClose={() => setAuthModalOpen(false)}
        lang={lang}
        onLoginSuccess={(userData) => setCurrentUser(userData)}
      />
    </main>
  );
}
