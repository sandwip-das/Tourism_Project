'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase, Building2, Bed, Calendar, DollarSign, Bell, 
  CheckCircle2, Plus, Edit3, Trash2, ArrowLeft, RefreshCw, 
  MessageSquare, User, Shield, HelpCircle, Send, Globe, Star
} from 'lucide-react';

interface RoomListing {
  id: number;
  room_name: string;
  category: 'deluxe' | 'suite' | 'cottage' | 'standard';
  total_units: number;
  available_units: number;
  price_per_night_bdt: number;
  amenities: string[];
  status: 'active' | 'maintenance' | 'sold_out';
}

interface BookingNotice {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_type: string;
  check_in_date: string;
  units_booked: number;
  total_bdt: number;
  status: 'confirmed' | 'pending' | 'completed';
  timestamp: string;
}

interface TravelerQuery {
  id: number;
  traveler_name: string;
  traveler_email: string;
  destination_name: string;
  question: string;
  guide_reply?: string;
  is_answered: boolean;
  created_at: string;
}

export default function AgentPortalPage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [activeTab, setActiveTab] = useState<'inventory' | 'bookings' | 'advice' | 'profile'>('inventory');

  // Agent Identity
  const [agentName, setAgentName] = useState('Sayeman Beach Resort Operations');
  const [agentType, setAgentType] = useState<'hotel' | 'resort' | 'guide' | 'transport'>('resort');
  const [integrationScenario, setIntegrationScenario] = useState<1 | 2 | 3>(2);

  // Dynamic Room / Service Inventory
  const [rooms, setRooms] = useState<RoomListing[]>([
    {
      id: 1,
      room_name: 'Sea-Facing Infinity Deluxe Room',
      category: 'deluxe',
      total_units: 14,
      available_units: 6,
      price_per_night_bdt: 8500,
      amenities: ['Sea Balcony', 'King Bed', 'Complimentary Breakfast', 'High-Speed Wi-Fi'],
      status: 'active'
    },
    {
      id: 2,
      room_name: 'Panoramic Coral Ocean Suite',
      category: 'suite',
      total_units: 8,
      available_units: 2,
      price_per_night_bdt: 14500,
      amenities: ['Ocean Terrace', 'Jacuzzi', 'Welcome Drinks', 'Airport Shuttle'],
      status: 'active'
    },
    {
      id: 3,
      room_name: 'Hillside Eco-Wood Cottage',
      category: 'cottage',
      total_units: 6,
      available_units: 0,
      price_per_night_bdt: 5800,
      amenities: ['Veranda', 'Forest View', 'Organic Meals'],
      status: 'sold_out'
    }
  ]);

  // Modal to add new room
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCategory, setNewRoomCategory] = useState<'deluxe' | 'suite' | 'cottage' | 'standard'>('deluxe');
  const [newTotalUnits, setNewTotalUnits] = useState(10);
  const [newPrice, setNewPrice] = useState(6500);

  // Real-time Booking Notifications
  const [bookings, setBookings] = useState<BookingNotice[]>([
    {
      id: 'SND-BKG-9921',
      customer_name: 'Dr. Nusrat Jahan',
      customer_phone: '+880 1711-223344',
      service_type: 'Sea-Facing Infinity Deluxe Room (2 Nights)',
      check_in_date: '2026-10-24',
      units_booked: 1,
      total_bdt: 17000,
      status: 'confirmed',
      timestamp: '10 Mins Ago'
    },
    {
      id: 'SND-BKG-8834',
      customer_name: 'Rafiqul Islam',
      customer_phone: '+880 1819-556677',
      service_type: 'Panoramic Coral Ocean Suite (1 Night)',
      check_in_date: '2026-10-28',
      units_booked: 1,
      total_bdt: 14500,
      status: 'pending',
      timestamp: '45 Mins Ago'
    }
  ]);

  // Traveler Advice & Questions (Ask a Local Expert)
  const [queries, setQueries] = useState<TravelerQuery[]>([
    {
      id: 101,
      traveler_name: 'Anika Tabassum',
      traveler_email: 'anika.t@gmail.com',
      destination_name: 'Cox’s Bazar & Inani Beach',
      question: 'Is it safe to visit Inani Coral Beach during low-tide with elderly parents? What is the best time for photography?',
      guide_reply: 'Yes, Inani coral beach is very safe during low tide. The best photo light is between 4:30 PM to 5:45 PM before sunset.',
      is_answered: true,
      created_at: '2026-10-09'
    },
    {
      id: 102,
      traveler_name: 'Zubair Hossain',
      traveler_email: 'zubair.bd@yahoo.com',
      destination_name: 'Sajek Valley & Ruilui Para',
      question: 'Which indigenous cottage offers uninterrupted morning cloud views without generator noise?',
      guide_reply: '',
      is_answered: false,
      created_at: '2026-10-10'
    }
  ]);

  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;

    const newEntry: RoomListing = {
      id: Date.now(),
      room_name: newRoomName,
      category: newRoomCategory,
      total_units: Number(newTotalUnits),
      available_units: Number(newTotalUnits),
      price_per_night_bdt: Number(newPrice),
      amenities: ['Wi-Fi', 'Complimentary Breakfast', 'Private Bath'],
      status: 'active'
    };

    setRooms([...rooms, newEntry]);
    setNewRoomName('');
    setShowAddRoomModal(false);
  };

  const handleUpdateAvailability = (id: number, delta: number) => {
    setRooms(rooms.map(r => {
      if (r.id === id) {
        const nextAvail = Math.max(0, Math.min(r.total_units, r.available_units + delta));
        return {
          ...r,
          available_units: nextAvail,
          status: nextAvail === 0 ? 'sold_out' : 'active'
        };
      }
      return r;
    }));
  };

  const handleSendAdviceReply = (queryId: number) => {
    if (!replyText.trim()) return;
    setQueries(queries.map(q => {
      if (q.id === queryId) {
        return { ...q, guide_reply: replyText, is_answered: true };
      }
      return q;
    }));
    setActiveReplyId(null);
    setReplyText('');
    alert(lang === 'en' 
      ? 'Your expert advice response has been dispatched to the traveler via email & posted to the portal!' 
      : 'আপনার পরামর্শ উত্তরটি ইমেইলের মাধ্যমে পর্যটকের কাছে পাঠানো হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1D232C] font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-[#0057D9] transition-colors py-1.5 px-3 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'en' ? 'Back to Portal' : 'মূল ওয়েবসাইটে ফিরুন'}</span>
            </Link>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#0057D9]" />
              <span className="text-sm font-semibold tracking-wide text-[#002B49] uppercase">
                {lang === 'en' ? 'DYNAMIC AGENT & PARTNER PORTAL' : 'ডাইনামিক এজেন্ট ও পার্টনার পোর্টাল'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#0057D9] font-medium border border-blue-100">
              {lang === 'en' ? `Scenario ${integrationScenario}: Portal Managed` : `সিনারিও ${integrationScenario}: সেন্ট্রাল পোর্টাল পরিচালিত`}
            </span>

            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-3 py-1 text-xs font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Agent Profile Summary Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0057D9] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#002B49]">{agentName}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-800">
                  Verified Partner
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === 'en' 
                  ? 'Manage hotel room vacancies, dynamic package rates, and respond to incoming guest bookings.' 
                  : 'হোটেল রুমের প্রাপ্যতা, রুম রেন্ট এবং বুকিং ইনভেন্টরি সেন্ট্রালভাবে নিয়ন্ত্রণ করুন।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer ${
                activeTab === 'inventory' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {lang === 'en' ? 'Room & Inventory' : 'রুম ও ইনভেন্টরি'}
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer relative ${
                activeTab === 'bookings' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {lang === 'en' ? 'Bookings Feed' : 'বুকিং নোটিফিকেশন'}
              {bookings.some(b => b.status === 'pending') && (
                <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('advice')}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer relative ${
                activeTab === 'advice' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {lang === 'en' ? 'Ask a Guide / Advice' : 'লোকাল গাইড পরামর্শ'}
              {queries.some(q => !q.is_answered) && (
                <span className="w-2 h-2 rounded-full bg-sky-500 absolute top-1 right-1" />
              )}
            </button>
          </div>
        </div>

        {/* TAB 1: ROOM & INVENTORY MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#002B49]">
                  {lang === 'en' ? 'Live Room Vacancy & Rent Management' : 'রুমের প্রাপ্যতা (Availability) ও রেট নিয়ন্ত্রণ'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {lang === 'en' 
                    ? 'Changes instantly update on the main Sandviora portal card views and search filters.' 
                    : 'এখানে আপডেট করা সমস্ত তথ্য মূল পোর্টালের ক্যাটাগরি ও ফিল্টারে কার্ড আকারে সাথে সাথে প্রদর্শিত হবে।'}
                </p>
              </div>

              <button
                onClick={() => setShowAddRoomModal(true)}
                className="px-4 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'en' ? 'Add Room / Package' : 'নতুন রুম/প্যাকেজ যোগ করুন'}</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase font-semibold text-[10px] border-b border-gray-200">
                    <th className="py-3.5 px-5">Room / Cottage Tier</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price / Night</th>
                    <th className="py-3.5 px-4">Total Units</th>
                    <th className="py-3.5 px-4">Available Vacancies</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-5 text-right">Quick Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-semibold text-gray-900 text-sm">{room.room_name}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {room.amenities.join(' • ')}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-medium bg-gray-100 text-gray-700">
                          {room.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono font-semibold text-gray-900">
                        ৳ {room.price_per_night_bdt.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-gray-700 font-medium">
                        {room.total_units} Rooms
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-bold font-mono px-2 py-0.5 rounded-md ${
                          room.available_units > 3 
                            ? 'bg-emerald-50 text-emerald-800' 
                            : room.available_units > 0 
                            ? 'bg-amber-50 text-amber-800' 
                            : 'bg-red-50 text-red-800'
                        }`}>
                          {room.available_units} Vacant
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-medium ${
                          room.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleUpdateAvailability(room.id, -1)}
                            disabled={room.available_units === 0}
                            className="w-7 h-7 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleUpdateAvailability(room.id, 1)}
                            disabled={room.available_units >= room.total_units}
                            className="w-7 h-7 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS FEED & NOTIFICATIONS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#002B49]">
                {lang === 'en' ? 'Incoming Booking Notifications' : 'ইনকামিং বুকিং নোটিফিকেশন'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === 'en' 
                  ? 'Real-time booking dispatch shared with both Agent and Central Platform Admin.' 
                  : 'ইউজার বুকিং সম্পন্ন করলে সাথে সাথে এজেন্টের কাছে এবং প্ল্যাটফর্ম এডমিনের কাছে নোটিফিকেশন প্রেরিত হয়।'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookings.map((b) => (
                <div key={b.id} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-blue-50 text-[#0057D9] rounded-md">
                        {b.id}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900">{b.service_type}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Guest: <strong className="text-gray-900">{b.customer_name}</strong> ({b.customer_phone})
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      📅 Check-In: {b.check_in_date} • 💳 Amount: ৳ {b.total_bdt.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                    <span>Received {b.timestamp}</span>
                    <button
                      onClick={() => alert(`Guest ${b.customer_name} reservation acknowledged.`)}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium rounded-full cursor-pointer transition-colors"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASK A LOCAL GUIDE & TRAVEL ADVICE */}
        {activeTab === 'advice' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#002B49]">
                {lang === 'en' ? 'Ask a Local Expert / Direct Traveler Advice' : 'লোকাল গাইড ও ট্রাভেলার প্রশ্নোত্তর'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {lang === 'en' 
                  ? 'Travelers ask destination questions without cold-calling; local experts reply directly via portal & email.' 
                  : 'কোনো ইউজার ফোন না করে স্পটের তথ্য জানতে চেয়ে সাবমিট করলে এখান থেকে গাইড সরাসরি ফিডব্যাক প্রদান করতে পারেন।'}
              </p>
            </div>

            <div className="space-y-4">
              {queries.map((q) => (
                <div key={q.id} className="p-5 bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#0057D9]">
                      📍 {q.destination_name}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      q.is_answered ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.is_answered ? 'Answered' : 'Awaiting Reply'}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-800 mt-1">"{q.question}"</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Asked by {q.traveler_name} ({q.traveler_email}) on {q.created_at}
                  </p>

                  {/* Existing Reply */}
                  {q.guide_reply && (
                    <div className="mt-3 p-3.5 bg-blue-50/60 rounded-xl text-xs text-[#002B49] border border-blue-100">
                      <strong className="block text-[#0057D9] mb-0.5">Official Expert Feedback:</strong>
                      {q.guide_reply}
                    </div>
                  )}

                  {/* Reply Form */}
                  {!q.is_answered && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {activeReplyId === q.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type verified destination advice, safety tips, or recommendations..."
                            className="w-full p-3 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setActiveReplyId(null)}
                              className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-full"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSendAdviceReply(q.id)}
                              className="px-4 py-1.5 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-medium rounded-full flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <Send className="w-3 h-3" />
                              <span>Send Answer to Traveler</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveReplyId(q.id);
                            setReplyText('');
                          }}
                          className="px-3.5 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-[#0057D9] text-xs font-medium rounded-full cursor-pointer transition-colors"
                        >
                          Write Expert Answer →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-xl">
            <h3 className="text-base font-bold text-[#002B49] mb-1">
              {lang === 'en' ? 'Add New Room / Unit Tier' : 'নতুন রুম যুক্ত করুন'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter room category, capacity and night tariff.
            </p>

            <form onSubmit={handleAddRoom} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Room / Cottage Name</label>
                <input
                  type="text"
                  required
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g. Deluxe Sea Breeze Suite"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newRoomCategory}
                    onChange={(e: any) => setNewRoomCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  >
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="cottage">Eco Cottage</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Total Rooms</label>
                  <input
                    type="number"
                    min={1}
                    value={newTotalUnits}
                    onChange={(e) => setNewTotalUnits(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Price per Night (BDT)</label>
                <input
                  type="number"
                  min={500}
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddRoomModal(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-medium rounded-full cursor-pointer"
                >
                  Save & Publish Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
