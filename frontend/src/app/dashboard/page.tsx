'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, Edit3, Heart, ShoppingBag, Shield, Bell, 
  MapPin, Mail, Phone, Calendar, ArrowLeft, CheckCircle2, 
  AlertCircle, Lock, Download, RefreshCw, Send, Plus, Eye,
  Building2, Bed, MessageSquare, ExternalLink, SlidersHorizontal,
  Layers, Users, TrendingUp, Check, X, Star, FileText
} from 'lucide-react';

interface UserData {
  id?: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'customer' | 'moderator' | 'creator' | 'agent' | 'supervisor' | 'admin' | 'superadmin';
  role_display?: string;
  phone?: string;
  location?: string;
  avatar?: string;
  date_joined?: string;
  permissions?: string[];
}

interface RoomListing {
  id: number;
  room_name: string;
  category: string;
  total_units: number;
  available_units: number;
  price_per_night_bdt: number;
  status: 'active' | 'maintenance' | 'sold_out';
}

interface TravelerQuery {
  id: number;
  traveler_name: string;
  destination_name: string;
  question: string;
  guide_reply?: string;
  is_answered: boolean;
  created_at: string;
}

export default function UserDashboardPage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'edit-profile' | 'bookings' | 'wishlist' | 'submissions' | 'agent-inventory' | 'agent-advice' | 'admin-suite'
  >('overview');
  
  // User state
  const [user, setUser] = useState<UserData>({
    username: 'sandwip',
    email: 'sandipdas050@gmail.com',
    first_name: 'Sandwip',
    last_name: 'Das',
    role: 'superadmin',
    role_display: 'Super Administrator',
    phone: '+880 1711-000000',
    location: 'Dhaka, Bangladesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    date_joined: '10 October 2026',
    permissions: ['manage_settings', 'manage_cms', 'manage_inventory', 'moderate_content', 'manage_users', 'manage_finances', 'manage_agents', 'view_reports']
  });

  // Edit profile form state
  const [firstName, setFirstName] = useState('Sandwip');
  const [lastName, setLastName] = useState('Das');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Moderator content submissions state
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDivision, setNewDivision] = useState('Sylhet');
  const [newDistrict, setNewDistrict] = useState('Moulvibazar');
  const [newCategory, setNewCategory] = useState('tea');
  const [newOverview, setNewOverview] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Agent Rooms & Local Expert State
  const [rooms, setRooms] = useState<RoomListing[]>([
    {
      id: 1,
      room_name: 'Sea-Facing Infinity Deluxe Room',
      category: 'Deluxe Suite',
      total_units: 14,
      available_units: 6,
      price_per_night_bdt: 8500,
      status: 'active'
    },
    {
      id: 2,
      room_name: 'Panoramic Coral Ocean Suite',
      category: 'Presidential Suite',
      total_units: 8,
      available_units: 2,
      price_per_night_bdt: 14500,
      status: 'active'
    },
    {
      id: 3,
      room_name: 'Hillside Eco-Wood Cottage',
      category: 'Eco Cottage',
      total_units: 6,
      available_units: 0,
      price_per_night_bdt: 5800,
      status: 'sold_out'
    }
  ]);

  const [queries, setQueries] = useState<TravelerQuery[]>([
    {
      id: 101,
      traveler_name: 'Anika Tabassum',
      destination_name: 'Cox’s Bazar & Inani Beach',
      question: 'Is it safe to visit Inani Coral Beach during low-tide with elderly parents?',
      guide_reply: 'Yes, Inani coral beach is very safe during low tide. The best photo light is between 4:30 PM to 5:45 PM before sunset.',
      is_answered: true,
      created_at: '2026-10-09'
    },
    {
      id: 102,
      traveler_name: 'Zubair Hossain',
      destination_name: 'Sajek Valley & Ruilui Para',
      question: 'Which indigenous cottage offers uninterrupted morning cloud views without generator noise?',
      guide_reply: '',
      is_answered: false,
      created_at: '2026-10-10'
    }
  ]);
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Load user from localStorage or API
  useEffect(() => {
    const stored = localStorage.getItem('sandviora_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
        setFirstName(parsed.first_name || '');
        setLastName(parsed.last_name || '');
        setLocation(parsed.location || 'Dhaka, Bangladesh');
        setAvatar(parsed.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
      } catch (e) {
        console.error(e);
      }
    }
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/admin/moderation/');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.results || data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Switch role test preset helper
  const handleSwitchRolePreset = (roleType: 'customer' | 'moderator' | 'agent' | 'superadmin') => {
    if (roleType === 'customer') {
      const u: UserData = {
        username: 'traveler_fahim',
        email: 'fahim@gmail.com',
        first_name: 'Fahim',
        last_name: 'Chowdhury',
        role: 'customer',
        role_display: 'Verified Traveler',
        phone: '+880 1712-345678',
        location: 'Chattogram, Bangladesh',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        date_joined: '10 October 2026',
        permissions: []
      };
      setUser(u);
      setActiveTab('overview');
      localStorage.setItem('sandviora_user', JSON.stringify(u));
    } else if (roleType === 'moderator') {
      const u: UserData = {
        username: 'moderator1',
        email: 'moderator@sandviora.com',
        first_name: 'Tanvir',
        last_name: 'Ahmed',
        role: 'moderator',
        role_display: 'Content Moderator',
        phone: '+880 1812-987654',
        location: 'Sylhet, Bangladesh',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
        date_joined: '10 October 2026',
        permissions: ['submit_content', 'moderate_content']
      };
      setUser(u);
      setActiveTab('overview');
      localStorage.setItem('sandviora_user', JSON.stringify(u));
    } else if (roleType === 'agent') {
      const u: UserData = {
        username: 'sayeman_agent',
        email: 'sayeman@resorts.bd',
        first_name: 'Sayeman Resort',
        last_name: 'Operations',
        role: 'agent',
        role_display: 'Verified Hotel Agent',
        phone: '+880 1911-223344',
        location: 'Cox’s Bazar, Bangladesh',
        avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80',
        date_joined: '10 October 2026',
        permissions: ['manage_inventory', 'manage_agents']
      };
      setUser(u);
      setActiveTab('overview');
      localStorage.setItem('sandviora_user', JSON.stringify(u));
    } else {
      const u: UserData = {
        username: 'sandwip',
        email: 'sandipdas050@gmail.com',
        first_name: 'Sandwip',
        last_name: 'Das',
        role: 'superadmin',
        role_display: 'Super Administrator',
        phone: '+880 1711-000000',
        location: 'Dhaka, Bangladesh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        date_joined: '10 October 2026',
        permissions: ['manage_settings', 'manage_cms', 'manage_inventory', 'moderate_content', 'manage_users', 'manage_finances', 'manage_agents', 'view_reports']
      };
      setUser(u);
      setActiveTab('overview');
      localStorage.setItem('sandviora_user', JSON.stringify(u));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/profile/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          first_name: firstName,
          last_name: lastName,
          location: location,
          avatar: avatar
        })
      });

      if (res.ok) {
        const nextUser = {
          ...user,
          first_name: firstName,
          last_name: lastName,
          location: location,
          avatar: avatar
        };
        setUser(nextUser);
        localStorage.setItem('sandviora_user', JSON.stringify(nextUser));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: newTitle,
        content_type: 'destination',
        division_name: newDivision,
        district_name: newDistrict,
        category: newCategory,
        payload: {
          name_en: newTitle,
          name_bn: newTitle,
          division_name: newDivision,
          category: newCategory,
          overview_en: newOverview,
          overview_bn: newOverview,
          hero_image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
        }
      };

      const res = await fetch('http://127.0.0.1:8000/api/v1/admin/moderation/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setNewTitle('');
        setNewOverview('');
        fetchSubmissions();
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowSubmitModal(false);
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const adjustRoomStock = (id: number, delta: number) => {
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

  const handleSendReply = (id: number) => {
    if (!replyText.trim()) return;
    setQueries(queries.map(q => {
      if (q.id === id) {
        return { ...q, guide_reply: replyText, is_answered: true };
      }
      return q;
    }));
    setActiveReplyId(null);
    setReplyText('');
  };

  const isStaffOrModerator = ['moderator', 'creator', 'supervisor', 'admin', 'superadmin'].includes(user.role);
  const isAgent = ['agent', 'admin', 'superadmin'].includes(user.role);
  const isAdminOrSuper = ['admin', 'superadmin'].includes(user.role);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1D232C] font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#0057D9] transition-colors py-1.5 px-3 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'en' ? 'Back to Portal' : 'মূল ওয়েবসাইটে ফিরে যান'}</span>
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <span className="text-sm font-bold text-[#002B49] uppercase tracking-wider">
              {lang === 'en' ? 'SANDVIORA ACCOUNT DASHBOARD' : 'স্যান্ডভিওরা ড্যাশবোর্ড'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Instant Role Preview Switcher */}
            <div className="hidden sm:flex items-center bg-gray-100 p-0.5 rounded-full text-[11px] font-medium border border-gray-200">
              <span className="text-gray-400 px-2 text-[10px] uppercase font-bold">Role:</span>
              <button
                onClick={() => handleSwitchRolePreset('customer')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  user.role === 'customer' ? 'bg-white text-[#0057D9] font-bold shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Traveler
              </button>
              <button
                onClick={() => handleSwitchRolePreset('moderator')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  user.role === 'moderator' ? 'bg-white text-[#0057D9] font-bold shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Moderator
              </button>
              <button
                onClick={() => handleSwitchRolePreset('agent')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  user.role === 'agent' ? 'bg-white text-[#0057D9] font-bold shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hotel Agent
              </button>
              <button
                onClick={() => handleSwitchRolePreset('superadmin')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  user.role === 'superadmin' ? 'bg-white text-[#0057D9] font-bold shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Superadmin
              </button>
            </div>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-3 py-1 text-xs font-semibold rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>

            {isAdminOrSuper && (
              <Link
                href="/platform-admin"
                className="text-xs font-semibold bg-[#002B49] hover:bg-[#001c30] text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>{lang === 'en' ? 'Enterprise Admin Panel' : 'এডমিন প্যানেল'}</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Navigation Panel - Strictly Fixed 300px Width as specified */}
          <aside className="w-full lg:w-[300px] shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-200 sticky top-24">
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0057D9]/20"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-[#1D232C] truncate">
                    {user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.username}
                  </h3>
                  <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-blue-50 text-[#0057D9] border border-blue-100">
                    {user.role_display || user.role}
                  </span>
                </div>
              </div>

              {/* Navigation Options - DASHBOARD AT THE VERY TOP */}
              <nav className="mt-4 space-y-1">
                
                {/* 1. DASHBOARD AT THE VERY TOP */}
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                    activeTab === 'overview'
                      ? 'bg-[#0057D9] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Dashboard Overview' : 'ড্যাশবোর্ড (Dashboard)'}</span>
                </button>

                {/* 2. My Profile */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                    activeTab === 'profile'
                      ? 'bg-[#0057D9] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{lang === 'en' ? 'My Profile' : 'আমার প্রোফাইল'}</span>
                </button>

                {/* 3. Edit Profile */}
                <button
                  onClick={() => setActiveTab('edit-profile')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                    activeTab === 'edit-profile'
                      ? 'bg-[#0057D9] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Edit Profile' : 'প্রোফাইল পরিবর্তন'}</span>
                </button>

                {/* 4. Bookings & Purchased Services */}
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                    activeTab === 'bookings'
                      ? 'bg-[#0057D9] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Bookings & Vouchers' : 'বুকিং ও ভাউচার'}</span>
                </button>

                {/* 5. Saved Wishlist */}
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                    activeTab === 'wishlist'
                      ? 'bg-[#0057D9] text-white shadow-xs'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Saved Wishlist' : 'সংরক্ষিত উইশলিস্ট'}</span>
                </button>

                {/* ROLE MODULE: Staff Moderation */}
                {isStaffOrModerator && (
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3.5 block mb-1">
                      {lang === 'en' ? 'Editorial Staff' : 'মডারেশন ওয়ার্কফ্লো'}
                    </span>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        activeTab === 'submissions'
                          ? 'bg-[#002B49] text-white shadow-xs'
                          : 'text-[#002B49] hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Send className="w-4 h-4 text-sky-500" />
                        <span>{lang === 'en' ? 'Content Submissions' : 'কনটেন্ট সাবমিশন ও রিভিউ'}</span>
                      </div>
                      {submissions.some(s => s.status === 'review_again') && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      )}
                    </button>
                  </div>
                )}

                {/* ROLE MODULE: Agent & Hotelier */}
                {isAgent && (
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3.5 block mb-1">
                      {lang === 'en' ? 'Agent & Provider' : 'এজেন্ট ও হোটেল ব্যবস্থাপনা'}
                    </span>
                    <button
                      onClick={() => setActiveTab('agent-inventory')}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        activeTab === 'agent-inventory'
                          ? 'bg-[#002B49] text-white shadow-xs'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'en' ? 'Room & Stock Inventory' : 'রুম ও ইনভেন্টরি স্টক'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('agent-advice')}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        activeTab === 'agent-advice'
                          ? 'bg-[#002B49] text-white shadow-xs'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-amber-500" />
                        <span>{lang === 'en' ? 'Local Expert Q&A' : 'ভ্রমণকারী প্রশ্নোত্তর'}</span>
                      </div>
                      {queries.some(q => !q.is_answered) && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full">
                          1 new
                        </span>
                      )}
                    </button>
                  </div>
                )}

                {/* ROLE MODULE: Admin Suite */}
                {isAdminOrSuper && (
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3.5 block mb-1">
                      {lang === 'en' ? 'Superadmin Controls' : 'সুপারএডমিন কনসোল'}
                    </span>
                    <button
                      onClick={() => setActiveTab('admin-suite')}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
                        activeTab === 'admin-suite'
                          ? 'bg-[#002B49] text-white shadow-xs'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Shield className="w-4 h-4 text-[#0057D9]" />
                      <span>{lang === 'en' ? 'Platform Admin Suite' : 'সিস্টেম প্রশাসন'}</span>
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </aside>

          {/* Right Content Workspace Area */}
          <main className="flex-1 min-w-0">
            
            {/* TAB 0: DASHBOARD OVERVIEW (Top module) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-[#002B49] to-[#0057D9] text-white rounded-2xl p-8 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest block mb-1">
                        {lang === 'en' ? 'Unified Command Dashboard' : 'ইউনিফাইড অ্যাকাউন্ট কন্ট্রোল ড্যাশবোর্ড'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {lang === 'en' ? `Welcome, ${user.first_name || user.username}!` : `স্বাগতম, ${user.first_name || user.username}!`}
                      </h2>
                      <p className="text-sm text-blue-100 mt-1 max-w-xl">
                        {lang === 'en'
                          ? `Role: ${user.role_display || user.role}. All your operational modules and account controls are synchronized here.`
                          : `রোল: ${user.role_display || user.role}। আপনার সকল কার্যপ্রণালী ও অ্যাকাউন্ট সেটিংস এই ড্যাশবোর্ডে উপলব্ধ।`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-white/20 backdrop-blur-xs px-3 py-1.5 rounded-full font-semibold border border-white/30">
                        ● {lang === 'en' ? 'Live System Active' : 'লাইভ ডাটাবেজ সক্রিয়'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* KPI Metrics tailored to active role */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {user.role === 'customer' ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">My Bookings</span>
                        <div className="text-2xl font-bold text-[#1D232C] mt-1">1 Trip</div>
                        <span className="text-[11px] text-emerald-600 font-medium">Sajek Expedition</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Wishlist Items</span>
                        <div className="text-2xl font-bold text-[#0057D9] mt-1">2 Spots</div>
                        <span className="text-[11px] text-gray-400 font-medium">Inani Beach & Sundarbans</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Vouchers</span>
                        <div className="text-2xl font-bold text-gray-800 mt-1">1 Issued</div>
                        <span className="text-[11px] text-emerald-600 font-medium">Verified PDF</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Security</span>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">100%</div>
                        <span className="text-[11px] text-gray-400 font-medium">Email/Phone Locked</span>
                      </div>
                    </>
                  ) : user.role === 'agent' ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Room Types</span>
                        <div className="text-2xl font-bold text-[#1D232C] mt-1">{rooms.length} Units</div>
                        <span className="text-[11px] text-emerald-600 font-medium">Deluxe & Suites</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Available Units</span>
                        <div className="text-2xl font-bold text-[#0057D9] mt-1">
                          {rooms.reduce((acc, r) => acc + r.available_units, 0)} Rooms
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">Instant +/- Adjustable</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Live Bookings</span>
                        <div className="text-2xl font-bold text-gray-800 mt-1">2 Pending</div>
                        <span className="text-[11px] text-amber-600 font-medium">৳ 31,500 Volume</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Expert Advice</span>
                        <div className="text-2xl font-bold text-amber-600 mt-1">1 Query</div>
                        <span className="text-[11px] text-gray-400 font-medium">Awaiting Guide Reply</span>
                      </div>
                    </>
                  ) : user.role === 'moderator' ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">My Submissions</span>
                        <div className="text-2xl font-bold text-[#1D232C] mt-1">{submissions.length || 3} Items</div>
                        <span className="text-[11px] text-emerald-600 font-medium">Destinations & Guides</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Approved</span>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">
                          {submissions.filter(s => s.status === 'approved').length || 1} Published
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">Live on Landing Page</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Pending Review</span>
                        <div className="text-2xl font-bold text-[#0057D9] mt-1">
                          {submissions.filter(s => s.status === 'pending').length || 1} Queue
                        </div>
                        <span className="text-[11px] text-gray-400 font-medium">Under Admin Check</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Revision Needed</span>
                        <div className="text-2xl font-bold text-amber-600 mt-1">
                          {submissions.filter(s => s.status === 'review_again').length || 1} Alerts
                        </div>
                        <span className="text-[11px] text-amber-600 font-medium">With Admin Feedback</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Master Inventory</span>
                        <div className="text-2xl font-bold text-[#002B49] mt-1">8 Div / 64 Dist</div>
                        <span className="text-[11px] text-emerald-600 font-medium">40+ Categories Seeded</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Content Queue</span>
                        <div className="text-2xl font-bold text-amber-600 mt-1">1 Pending</div>
                        <span className="text-[11px] text-gray-400 font-medium">5-Step Moderation</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Audited Revenue</span>
                        <div className="text-2xl font-bold text-[#0057D9] mt-1">৳ 257,400</div>
                        <span className="text-[11px] text-emerald-600 font-medium">Financial Ledger</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                        <span className="text-xs font-semibold text-gray-500 uppercase">OTP System</span>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">Active</div>
                        <span className="text-[11px] text-gray-400 font-medium">6-Digit Admin Generator</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Action Navigation Grid */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">
                    {lang === 'en' ? 'Quick Actions' : 'কুইক অ্যাকশন'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] hover:bg-blue-50/40 text-left transition-all cursor-pointer group"
                    >
                      <User className="w-5 h-5 text-[#0057D9] mb-2" />
                      <div className="text-xs font-bold text-gray-800 group-hover:text-[#0057D9]">
                        {lang === 'en' ? 'My Profile Details' : 'আমার প্রোফাইল বিবরণ'}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {lang === 'en' ? 'View and update personal data' : 'তথ্য ও অবস্থান দেখুন'}
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] hover:bg-blue-50/40 text-left transition-all cursor-pointer group"
                    >
                      <ShoppingBag className="w-5 h-5 text-[#0057D9] mb-2" />
                      <div className="text-xs font-bold text-gray-800 group-hover:text-[#0057D9]">
                        {lang === 'en' ? 'Bookings & Vouchers' : 'বুকিং ও ভাউচার'}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {lang === 'en' ? 'Download verified PDF statements' : 'পিডিএফ ভাউচার সংগ্রহ'}
                      </div>
                    </button>

                    {isStaffOrModerator ? (
                      <button
                        onClick={() => setActiveTab('submissions')}
                        className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] hover:bg-blue-50/40 text-left transition-all cursor-pointer group"
                      >
                        <Send className="w-5 h-5 text-sky-500 mb-2" />
                        <div className="text-xs font-bold text-gray-800 group-hover:text-[#0057D9]">
                          {lang === 'en' ? 'Content Submissions' : 'কনটেন্ট সাবমিশন'}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {lang === 'en' ? 'Submit or review drafts' : 'নতুন স্পট সাবমিট করুন'}
                        </div>
                      </button>
                    ) : isAgent ? (
                      <button
                        onClick={() => setActiveTab('agent-inventory')}
                        className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] hover:bg-blue-50/40 text-left transition-all cursor-pointer group"
                      >
                        <Building2 className="w-5 h-5 text-emerald-600 mb-2" />
                        <div className="text-xs font-bold text-gray-800 group-hover:text-[#0057D9]">
                          {lang === 'en' ? 'Room Stock Counter' : 'রুম স্টক কন্ট্রোল'}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {lang === 'en' ? 'Instant +/- availability change' : 'রিয়েলটাইম স্টক পরিবর্তন'}
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('wishlist')}
                        className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] hover:bg-blue-50/40 text-left transition-all cursor-pointer group"
                      >
                        <Heart className="w-5 h-5 text-rose-500 mb-2" />
                        <div className="text-xs font-bold text-gray-800 group-hover:text-[#0057D9]">
                          {lang === 'en' ? 'Saved Wishlist' : 'উইশলিস্ট তালিকা'}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {lang === 'en' ? 'Saved destinations for next trip' : 'পরবর্তী ভ্রমণের গন্তব্য'}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: My Profile */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D232C]">
                      {lang === 'en' ? 'My Profile' : 'আমার প্রোফাইল'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lang === 'en' ? 'Verified personal details and identity parameters.' : 'আপনার প্রোফাইল তথ্য ও নিবন্ধিত পরিচয়।'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('edit-profile')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Edit Details' : 'তথ্য পরিবর্তন করুন'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      {lang === 'en' ? 'Full Name' : 'পূর্ণ নাম'}
                    </span>
                    <p className="text-sm font-bold text-gray-800">
                      {user.first_name ? `${user.first_name} ${user.last_name || ''}` : user.username}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      {lang === 'en' ? 'Username' : 'ব্যবহারকারী নাম'}
                    </span>
                    <p className="text-sm font-bold text-gray-800">@{user.username}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#0057D9] uppercase tracking-wider block mb-1">
                        {lang === 'en' ? 'Email Address (Locked)' : 'ইমেইল (লকড/অপরিবর্তনীয়)'}
                      </span>
                      <Lock className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{user.email}</span>
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      {lang === 'en' ? 'Secured permanently for fraud-prevention' : 'নিরাপত্তার স্বার্থে ইমেইল অপরিবর্তনীয়'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#0057D9] uppercase tracking-wider block mb-1">
                        {lang === 'en' ? 'Phone Number (Locked)' : 'ফোন নম্বর (লকড/অপরিবর্তনীয়)'}
                      </span>
                      <Lock className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{user.phone || '+880 1700-000000'}</span>
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      {lang === 'en' ? 'Primary OTP & verification channel' : 'নিরাপত্তা ও ওটিপি ভেরিফিকেশনের জন্য সংরক্ষিত'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      {lang === 'en' ? 'Current Location' : 'বর্তমান অবস্থান'}
                    </span>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{user.location || 'Dhaka, Bangladesh'}</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                      {lang === 'en' ? 'Member Since' : 'নিবন্ধনের তারিখ'}
                    </span>
                    <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{user.date_joined || 'October 2026'}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Edit Profile */}
            {activeTab === 'edit-profile' && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#1D232C]">
                    {lang === 'en' ? 'Edit Profile' : 'ব্যক্তিগত তথ্য হালনাগাদ'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' 
                      ? 'Update your name, display photo, and location. Email and phone number remain locked for security.' 
                      : 'নাম, ছবি এবং অবস্থান পরিবর্তন করুন। নিরাপত্তা বজায় রাখতে প্রাথমিক নিবন্ধনে ব্যবহৃত ইমেইল ও ফোন নম্বর অপরিবর্তনীয় থাকবে।'}
                  </p>
                </div>

                {saveSuccess && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-semibold">
                      {lang === 'en' ? 'Profile updated and saved to database!' : 'তথ্য সফলভাবে ডাটাবেজে সংরক্ষণ করা হয়েছে!'}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {lang === 'en' ? 'First Name' : 'নামের প্রথম অংশ'}
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                        placeholder="e.g. Tanvir"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        {lang === 'en' ? 'Last Name' : 'নামের শেষ অংশ'}
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                        placeholder="e.g. Ahmed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {lang === 'en' ? 'Profile Avatar Image URL' : 'প্রোফাইল ছবির লিংক'}
                    </label>
                    <input
                      type="url"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {lang === 'en' ? 'Current City / Location' : 'বর্তমান শহর / অবস্থান'}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      placeholder="e.g. Sylhet, Bangladesh"
                    />
                  </div>

                  {/* Locked Readonly Inputs with Explicit Explanations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-500">
                          {lang === 'en' ? 'Registered Email' : 'নিবন্ধিত ইমেইল'}
                        </label>
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Immutable
                        </span>
                      </div>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-gray-500">
                          {lang === 'en' ? 'Registered Phone Number' : 'নিবন্ধিত ফোন নম্বর'}
                        </label>
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Immutable
                        </span>
                      </div>
                      <input
                        type="text"
                        disabled
                        value={user.phone || '+880 1700-000000'}
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-semibold rounded-full transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      <span>{lang === 'en' ? 'Save Changes' : 'তথ্য সংরক্ষণ করুন'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Bookings */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D232C]">
                      {lang === 'en' ? 'Purchased Services & Bookings' : 'বুকিং ও পেমেন্ট হিস্ট্রি'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lang === 'en' ? 'Full account history of tour vouchers and transactions.' : 'আপনার সংগৃহীত সার্ভিস ও ক্রয়কৃত ট্যুর ভাউচারের তালিকা।'}
                    </p>
                  </div>
                  <a
                    href="http://127.0.0.1:8000/api/v1/reports/pdf/bookings/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Export Statement PDF' : 'স্টেটমেন্ট ডাউনলোড'}</span>
                  </a>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-5 rounded-2xl border border-gray-200 hover:border-[#0057D9] transition-all bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold bg-blue-100 text-[#0057D9] px-2.5 py-0.5 rounded-full">
                            SND-7F8920
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Confirmed & Paid
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900">
                          Sajek Valley Cloud Kingdom & Ruilui Para Expedition
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-4">
                          <span>📅 Travel Date: 24 October 2026</span>
                          <span>👥 2 Travelers</span>
                          <span>💳 Total: BDT 19,000</span>
                        </p>
                      </div>

                      <a
                        href="http://127.0.0.1:8000/api/v1/reports/pdf/bookings/"
                        target="_blank"
                        rel="noreferrer"
                        className="self-start sm:self-center px-4 py-2 border border-[#0057D9] text-[#0057D9] hover:bg-[#0057D9] hover:text-white text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Voucher PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Saved Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#1D232C]">
                    {lang === 'en' ? 'Saved Wishlist' : 'উইশলিস্ট (পছন্দের স্থানসমূহ)'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en' ? 'Destinations you are planning to visit next in Bangladesh.' : 'পরবর্তী ভ্রমণের জন্য সংরক্ষিত স্পটসমূহ।'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="border border-gray-200 rounded-2xl overflow-hidden group hover:shadow-md transition-all">
                    <img
                      src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=600&q=80"
                      alt="Inani Beach"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase text-[#0057D9]">Chattogram • Beach</span>
                      <h4 className="text-base font-bold text-gray-900 mt-0.5">Inani Coral Beach & Marine Drive</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        Ancient coral boulders along the panoramic marine drive in Cox’s Bazar.
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl overflow-hidden group hover:shadow-md transition-all">
                    <img
                      src="https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=600&q=80"
                      alt="Sundarbans"
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase text-[#0057D9]">Khulna • Mangrove Forest</span>
                      <h4 className="text-base font-bold text-gray-900 mt-0.5">Sundarbans Tiger Sanctuary & Kotka</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        UNESCO World Heritage mangrove labyrinth with royal Bengal tigers and spotted deers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Staff Content Submissions */}
            {activeTab === 'submissions' && isStaffOrModerator && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D232C]">
                      {lang === 'en' ? 'Content Submissions & Review Workflow' : 'কনটেন্ট মডারেশন ও ওয়ার্কফ্লো'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lang === 'en' 
                        ? 'Submit new destinations or tours. Submissions undergo multi-level Admin review before publishing.' 
                        : 'নতুন কনটেন্ট সাবমিট করলে তা সরাসরি পাবলিশ হবে না; এডমিন রিভিউ করার পর ফ্রন্ট-এন্ডে প্রদর্শিত হবে।'}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Submit New Content' : 'নতুন কনটেন্ট যোগ করুন'}</span>
                  </button>
                </div>

                {/* Submissions List */}
                <div className="mt-6 space-y-4">
                  {submissions.map((sub: any) => {
                    const isPending = sub.status === 'pending';
                    const isReviewAgain = sub.status === 'review_again';
                    const isApproved = sub.status === 'approved';

                    return (
                      <div
                        key={sub.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isReviewAgain 
                            ? 'border-amber-300 bg-amber-50/50' 
                            : isApproved 
                            ? 'border-emerald-200 bg-emerald-50/30' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-[#0057D9]">
                                {sub.content_type_display || sub.content_type}
                              </span>
                              <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                isApproved 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : isReviewAgain 
                                  ? 'bg-amber-100 text-amber-800 animate-pulse' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {sub.status_display || sub.status}
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-gray-900">{sub.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              📍 {sub.division_name} ({sub.district_name || ''}) • Submitted: {new Date(sub.created_at).toLocaleDateString()}
                            </p>

                            {/* Admin Feedback Box for Review Again */}
                            {isReviewAgain && sub.admin_comments && (
                              <div className="mt-3 p-3.5 bg-amber-100/70 border border-amber-300 rounded-xl text-amber-950 text-xs">
                                <div className="flex items-center gap-1.5 font-bold mb-1">
                                  <AlertCircle className="w-4 h-4 text-amber-700" />
                                  <span>{lang === 'en' ? 'Admin Revision Feedback:' : 'এডমিন নির্দেশনা (সংশোধন করুন):'}</span>
                                </div>
                                <p className="font-medium pl-5">{sub.admin_comments}</p>
                              </div>
                            )}
                          </div>

                          <div>
                            {isReviewAgain && (
                              <button
                                onClick={() => {
                                  setNewTitle(sub.title);
                                  setNewOverview(sub.payload?.overview_en || '');
                                  setShowSubmitModal(true);
                                }}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-full transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{lang === 'en' ? 'Edit & Resubmit' : 'সংশোধন করে পুনরায় পাঠান'}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 6: Agent Room & Stock Inventory */}
            {activeTab === 'agent-inventory' && isAgent && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D232C]">
                      {lang === 'en' ? 'Room Availability & Inventory Stock' : 'রুম ও ইনভেন্টরি স্টক নিয়ন্ত্রণ'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lang === 'en'
                        ? 'Adjust room vacancies in real time with 1-click counter buttons.'
                        : 'রুমের সংখ্যা সরাসরি +/- বাটনের মাধ্যমে মুহূর্তের মধ্যে পরিবর্তন করুন।'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-[#0057D9]">
                            {room.category}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            room.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {room.status === 'active' ? 'Available' : 'Sold Out'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900">{room.room_name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          ৳ {room.price_per_night_bdt.toLocaleString()} BDT / night • Total Capacity: {room.total_units} units
                        </p>
                      </div>

                      {/* Real-time +/- Stock Control */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-semibold">Vacant Stock:</span>
                        <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => adjustRoomStock(room.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-[#0057D9]">
                            {room.available_units}
                          </span>
                          <button
                            onClick={() => adjustRoomStock(room.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: Agent Local Expert Q&A */}
            {activeTab === 'agent-advice' && isAgent && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#1D232C]">
                    {lang === 'en' ? 'Ask a Local Expert — Advice Q&A' : 'ভ্রমণকারী প্রশ্নোত্তর ও গাইড অ্যাডভাইস'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'en'
                      ? 'Answer traveler questions about weather, routes, cottages, and safety.'
                      : 'ভ্রমণকারীদের বাস্তব প্রশ্নের উত্তর দিয়ে সহায়ক ভূমিকা পালন করুন।'}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {queries.map((q) => (
                    <div key={q.id} className="p-5 rounded-2xl border border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#0057D9]">📍 {q.destination_name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          q.is_answered ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {q.is_answered ? 'Answered' : 'Awaiting Reply'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">Q: {q.question}</h4>
                      <p className="text-xs text-gray-500 mb-3">— Asked by {q.traveler_name} on {q.created_at}</p>

                      {q.is_answered && q.guide_reply ? (
                        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-950 text-xs">
                          <span className="font-bold block mb-0.5 text-emerald-800">Your Local Guide Reply:</span>
                          <p>{q.guide_reply}</p>
                        </div>
                      ) : activeReplyId === q.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type verified practical advice for the traveler..."
                            className="w-full p-3 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setActiveReplyId(null)}
                              className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-full"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSendReply(q.id)}
                              className="px-4 py-1.5 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-semibold rounded-full"
                            >
                              Publish Answer
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setActiveReplyId(q.id); setReplyText(''); }}
                          className="px-4 py-1.5 bg-[#002B49] hover:bg-[#001c30] text-white text-xs font-semibold rounded-full"
                        >
                          Answer This Traveler
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: Platform Administration Suite */}
            {activeTab === 'admin-suite' && isAdminOrSuper && (
              <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-200">
                <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1D232C]">
                      {lang === 'en' ? 'Platform Administration Suite' : 'সুপারএডমিন কন্ট্রোল সেন্টার'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {lang === 'en'
                        ? 'Master governance: Site settings, Dynamic CMS, 8 Div/64 Dist master inventory, and user roles.'
                        : 'সাইট ব্র্যান্ডিং, ৮ বিভাগ ও ৬৪ জেলা ক্যাটালগ, ৫-স্টেপ মডারেশন ও ইউজার ওটিপি কন্ট্রোলার।'}
                    </p>
                  </div>

                  <Link
                    href="/platform-admin"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#002B49] hover:bg-[#001c30] text-white text-xs font-semibold rounded-full shadow-xs"
                  >
                    <span>Full Admin Workspace</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40">
                    <div className="flex items-center gap-2 text-[#0057D9] font-bold text-sm mb-1">
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Site Settings & Branding</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      Dynamic logo, contact emails, social links, and live branding parameters.
                    </p>
                    <Link href="/platform-admin" className="text-xs font-semibold text-[#0057D9] hover:underline">
                      Manage Settings →
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                      <Layers className="w-4 h-4" />
                      <span>Master Bangladesh Geography</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      Seeded 8 Divisions, 64 Districts, 40+ tourism categories with geo-coordinates.
                    </p>
                    <Link href="/platform-admin" className="text-xs font-semibold text-emerald-700 hover:underline">
                      View Geography →
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40">
                    <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-1">
                      <Send className="w-4 h-4" />
                      <span>5-Step Content Moderation</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      Review queue cards, inspect modal, in-place edit, and comment pushback.
                    </p>
                    <Link href="/platform-admin" className="text-xs font-semibold text-amber-600 hover:underline">
                      Open Review Queue →
                    </Link>
                  </div>

                  <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/40">
                    <div className="flex items-center gap-2 text-purple-700 font-bold text-sm mb-1">
                      <Users className="w-4 h-4" />
                      <span>Staff RBAC & 6-Digit OTP</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">
                      Granular checkboxes for staff permissions and instant 6-digit OTP generator.
                    </p>
                    <Link href="/platform-admin" className="text-xs font-semibold text-purple-700 hover:underline">
                      User Management →
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Submission Modal for Moderator */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {lang === 'en' ? 'Submit Content for Admin Review' : 'এডমিন পর্যালোচনার জন্য কনটেন্ট সাবমিট'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {lang === 'en' 
                ? 'Content will remain pending in the Admin review queue until approved.' 
                : 'সাবমিট করার পর এটি পেন্ডিং থাকবে এবং এডমিন অনুমোদন করলে তবেই ফ্রন্ট-এন্ডে দেখা যাবে।'}
            </p>

            {submitSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'en' ? 'Submitted to Admin queue!' : 'এডমিন রিভিউ কিউতে সফলভাবে পাঠানো হয়েছে!'}</span>
              </div>
            )}

            <form onSubmit={handleSubmitContent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title (নাম)</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sreemangal Rainforest Trail"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Division (বিভাগ)</label>
                  <select
                    value={newDivision}
                    onChange={(e) => setNewDivision(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  >
                    <option value="Sylhet">Sylhet</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category (ক্যাটাগরি)</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  >
                    <option value="tea">Tea Gardens (চা বাগান)</option>
                    <option value="hills">Hills (পাহাড়)</option>
                    <option value="beach">Beaches (সৈকত)</option>
                    <option value="forest">Mangroves (সুন্দরবন)</option>
                    <option value="lake">Haor & Lakes (হাওর ও লেক)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Overview Description (বিবরণ)</label>
                <textarea
                  required
                  rows={4}
                  value={newOverview}
                  onChange={(e) => setNewOverview(e.target.value)}
                  placeholder="Detailed highlights, how to reach, best season..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
