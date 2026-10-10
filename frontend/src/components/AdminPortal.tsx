'use client';

import React, { useEffect, useState } from 'react';
import { ReportStats } from '../types';
import { fetchReportStats, getPdfReportUrl, getVoucherPdfUrl } from '../lib/api';
import {
  FileText, Download, TrendingUp, Users, Calendar, ShieldCheck,
  CheckCircle, ExternalLink, RefreshCw, Layers
} from 'lucide-react';

interface AdminPortalProps {
  lang: 'en' | 'bn';
}

export default function AdminPortal({ lang }: AdminPortalProps) {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchReportStats();
    if (data) {
      setStats(data);
    } else {
      setStats({
        kpis: {
          total_bookings: 5,
          confirmed_bookings: 3,
          total_revenue_bdt: 90600,
          total_destinations: 6,
          total_active_tours: 4,
          pending_inquiries: 0,
        },
        recent_bookings: [
          { ref: 'SND-4A9B1123', customer: 'Mofazzal Hossain', tour: 'Sajek Valley Cloudscape', amount: 29400, date: '2026-10-18', status: 'confirmed', payment: 'paid' },
          { ref: 'SND-7E8C9021', customer: 'Dr. Nusrat Jahan', tour: 'Sundarbans Forest Cruise', amount: 32400, date: '2026-10-24', status: 'confirmed', payment: 'paid' },
          { ref: 'SND-3F21BB45', customer: 'Rafiqul Islam', tour: 'Tanguar Haor Voyage', amount: 28800, date: '2026-10-20', status: 'confirmed', payment: 'paid' },
          { ref: 'SND-9D0023AE', customer: 'Tahsin Rahman', tour: 'Sreemangal Tea Retreat', amount: 21000, date: '2026-10-31', status: 'pending', payment: 'pending' },
        ],
        pdf_reports: [
          {
            id: 'bookings',
            title: 'Bookings & Reservations Report',
            description: 'Audit log of traveler reservations, contact details, dates, and confirmation statuses.',
            endpoint: '/api/v1/reports/pdf/bookings/'
          },
          {
            id: 'revenue',
            title: 'Financial & Revenue Statement',
            description: 'Gross platform volume, revenue broken down by tour package, and guest totals.',
            endpoint: '/api/v1/reports/pdf/revenue/'
          },
          {
            id: 'inventory',
            title: 'Tour Inventory & Capacity Report',
            description: 'Catalogue of all packages, itineraries, max capacities, and pricing tiers.',
            endpoint: '/api/v1/reports/pdf/inventory/'
          }
        ]
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section id="admin-portal" className="py-16 sm:py-24 bg-[#F4F5F7] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0057D9] border border-blue-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  CENTRAL OPERATIONS & AUDIT
                </span>
                <span className="text-xs text-gray-500 font-semibold">ReportLab PDF Engine Active</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#1D232C] tracking-tight">
                {lang === 'en' ? 'Administrative Operations & PDF Reports' : 'অপারেশনাল ম্যানেজমেন্ট ও পিডিএফ রিপোর্ট'}
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                {lang === 'en'
                  ? 'Real-time KPI synchronization and 1-click corporate PDF statement generator for executive management.'
                  : 'সকল কার্যক্রম, বুকিং অডিট ও রাজস্ব আয়ের অফিসিয়াল পিডিএফ রিপোর্ট এক ক্লিকে ডাউনলোড করুন।'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>{lang === 'en' ? 'Refresh' : 'রিফ্রেশ'}</span>
              </button>

              <a
                href="http://127.0.0.1:8000/django-admin/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#002B49] hover:bg-[#001a2d] text-white text-xs font-bold transition-colors shadow-xs"
              >
                <span>{lang === 'en' ? 'Django Super Admin' : 'সুপার অ্যাডমিন লগইন'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase mb-2">
              <span>Total Bookings</span>
              <Users className="w-4 h-4 text-[#0057D9]" />
            </div>
            <div className="text-3xl font-black text-[#1D232C]">
              {stats?.kpis.total_bookings ?? 5}
            </div>
            <span className="text-xs text-emerald-600 font-semibold mt-1 block">
              ✓ {stats?.kpis.confirmed_bookings ?? 3} Confirmed Trips
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase mb-2">
              <span>Gross Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-[#0057D9]">
              ৳{(stats?.kpis.total_revenue_bdt ?? 90600).toLocaleString()}
            </div>
            <span className="text-xs text-gray-400 mt-1 block">Audited BDT Volume</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase mb-2">
              <span>Destinations</span>
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-[#1D232C]">
              {stats?.kpis.total_destinations ?? 6}
            </div>
            <span className="text-xs text-gray-400 mt-1 block">Across 3 Geo-Divisions</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase mb-2">
              <span>Active Tours</span>
              <Layers className="w-4 h-4 text-[#0D9488]" />
            </div>
            <div className="text-3xl font-black text-[#1D232C]">
              {stats?.kpis.total_active_tours ?? 4}
            </div>
            <span className="text-xs text-gray-400 mt-1 block">100% Escorted Expeditions</span>
          </div>
        </div>

        {/* 1-Click PDF Reports Generation Deck */}
        <div className="mb-10">
          <h3 className="text-xl font-black text-[#1D232C] mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0057D9]" />
            <span>{lang === 'en' ? 'Official PDF Report Downloads' : 'অফিশিয়াল পিডিএফ রিপোর্টসমূহ'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report 1: Bookings */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057D9] flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#1D232C] mb-2">
                  {lang === 'en' ? 'Bookings Summary Report (PDF)' : 'বুকিং অডিট রিপোর্ট (পিডিএফ)'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  {lang === 'en'
                    ? 'Audit statement containing guest names, contacts, travel dates, guest count, and confirmation statuses.'
                    : 'ভ্রমণকারীদের তথ্য, বুকিং রেফারেন্স, যোগাযোগের নম্বর ও পেমেন্ট স্ট্যাটাস সম্বলিত রিপোর্ট।'}
                </p>
              </div>

              <a
                href={getPdfReportUrl('bookings')}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'en' ? 'Download Bookings PDF' : 'বুকিং রিপোর্ট ডাউনলোড করুন'}</span>
              </a>
            </div>

            {/* Report 2: Revenue */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#1D232C] mb-2">
                  {lang === 'en' ? 'Financial Revenue Statement (PDF)' : 'রেভিনিউ স্টেটমেন্ট (পিডিএফ)'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  {lang === 'en'
                    ? 'Breakdown of total platform volume, earnings per package, guest totals, and audited transaction records.'
                    : 'প্যাকেজ ভিত্তিক রাজস্ব আয়, যাত্রী সংখ্যা ও মোট বাণিজ্যিক লেনদেনের আর্থিক হিসাব।'}
                </p>
              </div>

              <a
                href={getPdfReportUrl('revenue')}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'en' ? 'Download Revenue PDF' : 'রেভিনিউ রিপোর্ট ডাউনলোড করুন'}</span>
              </a>
            </div>

            {/* Report 3: Inventory */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#1D232C] mb-2">
                  {lang === 'en' ? 'Tour Inventory & Capacity Report (PDF)' : 'ইনভেন্টরি ও ক্যাপাসিটি রিপোর্ট (পিডিএফ)'}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                  {lang === 'en'
                    ? 'Catalogue of all active tour packages, durations, maximum group sizes, and current pricing tiers.'
                    : 'সকল সক্রিয় ট্যুর প্যাকেজের ধারণক্ষমতা, সময়কাল ও মূল্য তালিকার পূর্ণাঙ্গ ইনভেন্টরি স্টেটমেন্ট।'}
                </p>
              </div>

              <a
                href={getPdfReportUrl('inventory')}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'en' ? 'Download Inventory PDF' : 'ইনভেন্টরি রিপোর্ট ডাউনলোড করুন'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Recent Reservations Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-[#1D232C] mb-4">
            {lang === 'en' ? 'Recent Traveler Bookings & Downloadable Vouchers' : 'সাম্প্রতিক ট্রাভেলার বুকিং ও ভাউচার'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Ref Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Tour Package</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Official Voucher</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats?.recent_bookings.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-bold font-mono text-[#0057D9]">{b.ref}</td>
                    <td className="py-3 px-4 font-semibold text-[#1D232C]">{b.customer}</td>
                    <td className="py-3 px-4">{b.tour}</td>
                    <td className="py-3 px-4 font-bold text-[#1D232C]">৳{b.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-500">{b.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        b.payment === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={getVoucherPdfUrl(b.ref)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-[#0057D9] hover:bg-blue-100 font-bold"
                      >
                        <Download className="w-3 h-3" />
                        PDF Voucher
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
