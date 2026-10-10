'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass, LayoutDashboard, Settings, FileText, MapPin, 
  CheckSquare, Users, DollarSign, Briefcase, Download, 
  ArrowLeft, Shield, Eye, Edit3, CheckCircle2, XCircle, 
  AlertCircle, Key, RefreshCw, Send, Plus, Search, ExternalLink,
  Phone, Mail, Lock, Globe, Building2, Sliders, ChevronRight, CreditCard,
  Layers, Sparkles, Save, Image as ImageIcon
} from 'lucide-react';

interface UserItem {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  role_display: string;
  phone: string;
  location: string;
  permissions: string[];
  must_reset_password: boolean;
  has_active_otp: boolean;
  active_otp?: string;
  date_joined: string;
}

interface ReviewRequest {
  id: number;
  title: string;
  content_type: string;
  content_type_display?: string;
  division_name: string;
  district_name: string;
  category: string;
  payload: any;
  submitted_by_username: string;
  status: 'pending' | 'review_again' | 'approved' | 'rejected';
  status_display?: string;
  admin_comments: string;
  created_at: string;
}

interface FinancialRecord {
  id: number;
  title: string;
  transaction_type: string;
  transaction_type_display?: string;
  amount_bdt: string | number;
  category: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  notes: string;
  created_at: string;
}

interface AgentPartner {
  id: number;
  company_name: string;
  partner_type: string;
  partner_type_display?: string;
  integration_scenario: number;
  integration_scenario_display?: string;
  contact_person: string;
  phone: string;
  email: string;
  commission_pct: string | number;
  active_listings_count: number;
  status: string;
}

export default function PlatformAdminPage() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [activeMenu, setActiveMenu] = useState<
    'overview' | 'bookings' | 'settings' | 'cms' | 'inventory' | 'moderation' | 'rbac' | 'finances' | 'agents' | 'reports'
  >('overview');

  // Auth gate
  const [authAdmin, setAuthAdmin] = useState<any | null>(null);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginSecret, setLoginSecret] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const isSuperAdmin = authAdmin?.role === 'superadmin' || authAdmin?.is_superuser;
  const hasPermission = (perm: string) => {
    if (isSuperAdmin) return true;
    return Array.isArray(authAdmin?.permissions) && authAdmin.permissions.includes(perm);
  };

  // OTP Reset form state (if user logs in with OTP)
  const [mustResetPassword, setMustResetPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [oldOtp, setOldOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Data states
  const [users, setUsers] = useState<UserItem[]>([]);
  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>([]);
  const [finances, setFinances] = useState<FinancialRecord[]>([]);
  const [agents, setAgents] = useState<AgentPartner[]>([]);
  const [divisions, setDivisions] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [adminBookings, setAdminBookings] = useState<any[]>([]);
  const [bookingActionLoading, setBookingActionLoading] = useState(false);
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');

  // Card View -> Full View Modal State for Moderation
  const [selectedReviewItem, setSelectedReviewItem] = useState<ReviewRequest | null>(null);
  const [adminCommentText, setAdminCommentText] = useState('');
  const [editablePayloadTitle, setEditablePayloadTitle] = useState('');
  const [editablePayloadOverview, setEditablePayloadOverview] = useState('');
  const [moderationActionLoading, setModerationActionLoading] = useState(false);

  // Staff creation form state
  const [newStaffUsername, setNewStaffUsername] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('moderator');
  const [newStaffPerms, setNewStaffPerms] = useState<string[]>(['manage_cms', 'moderate_content']);
  const [createdStaffOtp, setCreatedStaffOtp] = useState<string | null>(null);

  // Core Site Settings form state
  const [siteName, setSiteName] = useState('SANDVIORA Tourism Ltd.');
  const [taglineEn, setTaglineEn] = useState('Discover the Untouched Beauty & Wonder of Bangladesh');
  const [taglineBn, setTaglineBn] = useState('বাংলাদেশের রূপ-লাবণ্য ও প্রাকৃতিক বিস্ময়কে আবিষ্কার করুন');
  const [contactPhone, setContactPhone] = useState('+880 1711-234567');
  const [contactEmail, setContactEmail] = useState('sandipdas050@gmail.com');
  const [officeAddress, setOfficeAddress] = useState('Level 8, Crystal Palace, Gulshan-2, Dhaka 1212');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Dynamic CMS form state
  const [cmsTab, setCmsTab] = useState<'hero' | 'campaign' | 'action_matrix' | 'spotlights'>('hero');
  const [heroBadge, setHeroBadge] = useState('★ Bangladesh’s Leading Editorial Travel Platform');
  const [heroHeadlineEn, setHeroHeadlineEn] = useState('Untouched Horizons, Eternal Stories');
  const [heroHeadlineBn, setHeroHeadlineBn] = useState('অনাবিল দিগন্ত, চিরন্তন রূপকথা');
  const [heroSubheadlineEn, setHeroSubheadlineEn] = useState('Journey through emerald hill tracts, rolling tea estates, world-record coastlines, and ancient mangrove jungles.');
  const [heroSubheadlineBn, setHeroSubheadlineBn] = useState('সবুজ পাহাড়ের মেঘের ভেলা, চা বাগানের স্নিগ্ধতা, বিশ্বের দীর্ঘতম সমুদ্র সৈকত ও সুন্দরবনের রোমাঞ্চকর অভিযান।');
  const [heroImage, setHeroImage] = useState('/media/image_jm0r06ajcd6afdte29dv2o0m7o.webp');
  const [heroPhotographerTag, setHeroPhotographerTag] = useState('PHOTO: SANDVIORA EDITORIAL ARCHIVE');
  const [heroCtaTextEn, setHeroCtaTextEn] = useState('BEST IN TRAVEL 2026');
  const [heroCtaUrl, setHeroCtaUrl] = useState('#destinations');
  const [cmsSaved, setCmsSaved] = useState(false);
  const [cmsSaving, setCmsSaving] = useState(false);

  // Campaign Banner state
  const [campaignData, setCampaignData] = useState<any>({
    id: 1,
    kicker_en: "SANDVIORA'S",
    kicker_bn: 'স্যান্ডভিওরা ম্যাগাজিন',
    title_en: 'Best in Travel 2026',
    title_bn: 'সেরা ভ্রমণ গন্তব্য ২০২৬',
    description_en: "For our annual travel rankings, we asked our community of regional explorers and seasoned writers where they're heading next.",
    description_bn: 'আমাদের বার্ষিক ভ্রমণ র্যাঙ্কিংয়ের জন্য আমরা স্থানীয় গবেষক ও ভ্রমণ বিশেষজ্ঞদের প্রশ্ন করেছিলাম: এরপর কোথায়?',
    bg_image: '/media/image_o683v8n8652o9dss1ic9nni56p.webp',
    cta_text_en: 'VIEW THE LIST',
    cta_text_bn: 'পূর্ণাঙ্গ তালিকা দেখুন',
    cta_url: '#destinations',
    is_active: true,
  });
  const [campaignSaved, setCampaignSaved] = useState(false);
  const [campaignSaving, setCampaignSaving] = useState(false);

  // Action Matrix & Spotlights state
  const [actionMatrixCards, setActionMatrixCards] = useState<any[]>([]);
  const [spotlightFeatures, setSpotlightFeatures] = useState<any[]>([]);
  const [matrixSavedId, setMatrixSavedId] = useState<number | null>(null);
  const [spotlightSavedId, setSpotlightSavedId] = useState<number | null>(null);

  // Check login on mount
  useEffect(() => {
    const stored = localStorage.getItem('sandviora_user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        if (['superadmin', 'admin', 'moderator', 'supervisor'].includes(u.role)) {
          setAuthAdmin(u);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (authAdmin) {
      loadAllAdminData();
    }
  }, [authAdmin]);

  const loadAllAdminData = async () => {
    try {
      // 1. Users
      const uRes = await fetch('http://127.0.0.1:8000/api/v1/admin/users/');
      if (uRes.ok) setUsers(await uRes.json());

      // 2. Moderation requests
      const mRes = await fetch('http://127.0.0.1:8000/api/v1/admin/moderation/');
      if (mRes.ok) {
        const d = await mRes.json();
        setReviewRequests(d.results || d);
      }

      // 3. Finances
      const fRes = await fetch('http://127.0.0.1:8000/api/v1/finances/');
      if (fRes.ok) {
        const d = await fRes.json();
        setFinances(d.results || d);
      }

      // 4. Agents
      const aRes = await fetch('http://127.0.0.1:8000/api/v1/agents/');
      if (aRes.ok) {
        const d = await aRes.json();
        setAgents(d.results || d);
      }

      // 5. Divisions & Districts
      const divRes = await fetch('http://127.0.0.1:8000/api/v1/destinations/divisions/');
      if (divRes.ok) {
        const d = await divRes.json();
        setDivisions(d.results || d);
      }

      const distRes = await fetch('http://127.0.0.1:8000/api/v1/destinations/districts/');
      if (distRes.ok) {
        const d = await distRes.json();
        setDistricts(d.results || d);
      }

      // 6. Bookings & Payment Requests
      const bRes = await fetch('http://127.0.0.1:8000/api/v1/bookings/');
      if (bRes.ok) {
        const d = await bRes.json();
        setAdminBookings(d.results || d);
      }

      // 7. Dynamic CMS Content
      const bootRes = await fetch('http://127.0.0.1:8000/api/v1/site-init/');
      if (bootRes.ok) {
        const bootData = await bootRes.json();
        if (bootData.site_config) {
          const sc = bootData.site_config;
          if (sc.hero_badge_text) setHeroBadge(sc.hero_badge_text);
          if (sc.hero_headline_en) setHeroHeadlineEn(sc.hero_headline_en);
          if (sc.hero_headline_bn) setHeroHeadlineBn(sc.hero_headline_bn);
          if (sc.hero_subheadline_en) setHeroSubheadlineEn(sc.hero_subheadline_en);
          if (sc.hero_subheadline_bn) setHeroSubheadlineBn(sc.hero_subheadline_bn);
          if (sc.hero_bg_image) setHeroImage(sc.hero_bg_image);
          if (sc.hero_photographer_tag) setHeroPhotographerTag(sc.hero_photographer_tag);
          if (sc.hero_cta_text_en) setHeroCtaTextEn(sc.hero_cta_text_en);
          if (sc.hero_cta_url) setHeroCtaUrl(sc.hero_cta_url);
        }
        if (bootData.campaign_banner) {
          setCampaignData(bootData.campaign_banner);
        }
        if (bootData.action_matrix) {
          setActionMatrixCards(bootData.action_matrix);
        }
        if (bootData.spotlights) {
          setSpotlightFeatures(bootData.spotlights);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveHeroCms = async (e: React.FormEvent) => {
    e.preventDefault();
    setCmsSaving(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/cms/config/1/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero_badge_text: heroBadge,
          hero_headline_en: heroHeadlineEn,
          hero_headline_bn: heroHeadlineBn,
          hero_subheadline_en: heroSubheadlineEn,
          hero_subheadline_bn: heroSubheadlineBn,
          hero_bg_image: heroImage,
          hero_photographer_tag: heroPhotographerTag,
          hero_cta_text_en: heroCtaTextEn,
          hero_cta_url: heroCtaUrl,
        }),
      });
      if (res.ok) {
        setCmsSaved(true);
        setTimeout(() => setCmsSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCmsSaving(false);
    }
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignSaving(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/cms/campaigns/${campaignData?.id || 1}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData),
      });
      if (res.ok) {
        setCampaignSaved(true);
        setTimeout(() => setCampaignSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCampaignSaving(false);
    }
  };

  const handleSaveActionCard = async (card: any) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/cms/action-matrix/${card.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      });
      if (res.ok) {
        setMatrixSavedId(card.id);
        setTimeout(() => setMatrixSavedId(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSpotlight = async (spotlight: any) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/cms/spotlights/${spotlight.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotlight),
      });
      if (res.ok) {
        setSpotlightSavedId(spotlight.id);
        setTimeout(() => setSpotlightSavedId(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerifyBookingPayment = async (bookingRef: string, action: 'approve' | 'reject') => {
    setBookingActionLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/bookings/${bookingRef}/verify-payment/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        const bRes = await fetch('http://127.0.0.1:8000/api/v1/bookings/');
        if (bRes.ok) {
          const d = await bRes.json();
          setAdminBookings(d.results || d);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBookingActionLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setLoginError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginIdentifier,
          password: loginSecret
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Authentication rejected. Check username/password/OTP.');
        setIsAuthenticating(false);
        return;
      }

      // Check if user is required to reset password with OTP
      if (data.status === 'must_reset_password') {
        setMustResetPassword(true);
        setResetUsername(data.username);
        setOldOtp(loginSecret);
        setIsAuthenticating(false);
        return;
      }

      const user = data.user;
      if (!['superadmin', 'admin', 'moderator', 'supervisor'].includes(user.role)) {
        setLoginError('Access Denied: Your account role does not have administrative privileges.');
        setIsAuthenticating(false);
        return;
      }

      setAuthAdmin(user);
      localStorage.setItem('sandviora_user', JSON.stringify(user));
    } catch (err: any) {
      setLoginError(err.message || 'Connection failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleOTPResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/auth/otp-reset/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: resetUsername,
          old_otp: oldOtp,
          new_password: newPassword,
          confirm_password: confirmPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setResetSuccess(true);
        setTimeout(() => {
          setMustResetPassword(false);
          setLoginSecret(newPassword);
        }, 1500);
      } else {
        setLoginError(data.error || 'Failed to update password');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Error executing OTP reset');
    }
  };

  // Open Full-View modal for a review card
  const handleOpenReviewModal = (item: ReviewRequest) => {
    setSelectedReviewItem(item);
    setAdminCommentText(item.admin_comments || '');
    setEditablePayloadTitle(item.payload?.name_en || item.title);
    setEditablePayloadOverview(item.payload?.overview_en || '');
  };

  // Admin Direct Approve & Publish
  const handleDirectPublish = async () => {
    if (!selectedReviewItem) return;
    setModerationActionLoading(true);

    try {
      const updatedPayload = {
        ...selectedReviewItem.payload,
        name_en: editablePayloadTitle,
        overview_en: editablePayloadOverview
      };

      const res = await fetch(`http://127.0.0.1:8000/api/v1/admin/moderation/${selectedReviewItem.id}/approve/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payload: updatedPayload,
          admin_comments: adminCommentText || 'Verified and approved by Administrator.'
        })
      });

      if (res.ok) {
        loadAllAdminData();
        setSelectedReviewItem(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setModerationActionLoading(false);
    }
  };

  // Admin "Review Again" with Comment Box
  const handleReviewAgain = async () => {
    if (!selectedReviewItem) return;
    if (!adminCommentText.trim()) {
      alert('Please enter specific revision comments explaining what needs correction before clicking Review Again.');
      return;
    }
    setModerationActionLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/admin/moderation/${selectedReviewItem.id}/review-again/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_comments: adminCommentText
        })
      });

      if (res.ok) {
        loadAllAdminData();
        setSelectedReviewItem(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setModerationActionLoading(false);
    }
  };

  // Admin creates new staff user & gets instant OTP
  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/admin/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newStaffUsername,
          email: newStaffEmail,
          name: newStaffName,
          phone: newStaffPhone,
          role: newStaffRole,
          permissions: newStaffPerms
        })
      });

      if (res.ok) {
        const d = await res.json();
        setCreatedStaffOtp(d.otp);
        loadAllAdminData();
        setNewStaffUsername('');
        setNewStaffEmail('');
        setNewStaffName('');
        setNewStaffPhone('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Admin generates new OTP for existing user
  const handleGenerateUserOtp = async (userId: number, username: string) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/admin/generate-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, username: username })
      });

      if (res.ok) {
        const d = await res.json();
        alert(`New OTP for ${username}: ${d.otp}\nProvide this OTP to user. They will reset their password on first login.`);
        loadAllAdminData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Finance approve/reject
  const handleFinanceDecision = async (txId: number, decision: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/finances/${txId}/approve/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision })
      });
      if (res.ok) loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // --------------------------------------------------------------------------
  // UNAUTHENTICATED OR OTP RESET VIEW
  // --------------------------------------------------------------------------
  if (!authAdmin) {
    return (
      <div className="min-h-screen bg-[#001c30] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0057D9] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#0057D9]">
              ENTERPRISE CONTROL
            </span>
            <h2 className="text-2xl font-black text-[#002B49] mt-0.5">
              {mustResetPassword ? 'Mandatory Password Reset' : 'Admin Control Panel'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {mustResetPassword 
                ? 'Your account was accessed via One-Time Password. Please configure your new permanent password.' 
                : 'Restricted to System Administrators, Supervisors, and Moderators.'}
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* OTP RESET FORM */}
          {mustResetPassword ? (
            resetSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-bold text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                Password reset successfully! Redirecting to login...
              </div>
            ) : (
              <form onSubmit={handleOTPResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    disabled
                    value={resetUsername}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Old OTP (One-Time Password)</label>
                  <input
                    type="text"
                    required
                    value={oldOtp}
                    onChange={(e) => setOldOtp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">New Permanent Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save & Activate Account
                </button>
              </form>
            )
          ) : (
            /* ADMIN LOGIN FORM */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Admin Username or Email</label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="e.g. sandwip"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password or OTP Code</label>
                <input
                  type="password"
                  required
                  value={loginSecret}
                  onChange={(e) => setLoginSecret(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isAuthenticating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Authenticate into Control Panel</span>
              </button>

              <div className="text-center pt-3 border-t border-gray-100">
                <Link href="/" className="text-xs font-bold text-gray-500 hover:text-[#0057D9]">
                  ← Return to Public Website
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATED CUSTOM ADMIN CONTROL PANEL LAYOUT
  // Strictly two main DIVs: 300px Left Nav Panel + Right Workspace Area
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col font-sans">
      
      {/* Top Admin Global Bar */}
      <header className="bg-[#001c30] text-white h-16 border-b border-gray-800 px-6 flex items-center justify-between z-30 sticky top-0 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'en' ? 'Back to Public Website' : 'মূল ওয়েবসাইটে ফিরুন'}</span>
          </Link>

          <div className="h-4 w-px bg-gray-700 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-sky-400" />
            <span className="text-sm font-black tracking-wider uppercase text-white">
              SANDVIORA ENTERPRISE ADMIN CONSOLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 cursor-pointer"
          >
            {lang === 'en' ? 'বাংলা' : 'EN'}
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-gray-700">
            <div className="w-7 h-7 rounded-full bg-[#0057D9] text-white flex items-center justify-center text-xs font-black">
              {authAdmin.username[0].toUpperCase()}
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold block leading-none">{authAdmin.username}</span>
              <span className="text-[10px] text-sky-400 uppercase font-black">{authAdmin.role_display || authAdmin.role}</span>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('sandviora_user');
                setAuthAdmin(null);
              }}
              className="ml-2 text-xs text-gray-400 hover:text-red-400 font-bold underline cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* TWO-DIV CORE LAYOUT: Fixed 300px Left Nav + Right Main Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* =========================================================================
            DIV 1: LEFT NAVIGATION PANEL (EXACTLY 300px FIXED WIDTH)
            ========================================================================= */}
        <aside className="w-[300px] min-w-[300px] max-w-[300px] bg-[#002B49] text-white flex-shrink-0 flex flex-col justify-between overflow-y-auto border-r border-[#001c30]">
          <div>
            <div className="p-5 border-b border-white/10">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 block">
                {lang === 'en' ? 'CONTROL PANEL NAVIGATION' : 'কন্ট্রোল প্যানেল মেনু'}
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {lang === 'en' ? 'Operations Console' : 'এডমিন কনসোল'}
              </h3>
            </div>

            <nav className="p-3 space-y-1">
              {/* ALWAYS AT THE VERY TOP: DASHBOARD (ড্যাশবোর্ড) */}
              <button
                onClick={() => setActiveMenu('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'overview' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-sky-400" />
                <span>{lang === 'en' ? 'Dashboard Overview' : 'ড্যাশবোর্ড (সারসংক্ষেপ)'}</span>
              </button>

              {/* BOOKINGS & REAL PAYMENT VERIFICATION QUEUE */}
              <button
                onClick={() => setActiveMenu('bookings')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  activeMenu === 'bookings' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Bookings & Payment Desk' : 'বুকিং ও পেমেন্ট ভেরিফিকেশন'}</span>
                </div>
                {adminBookings.filter(b => b.payment_status === 'pending_verification').length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                    {adminBookings.filter(b => b.payment_status === 'pending_verification').length}
                  </span>
                )}
              </button>

              {/* Dynamic permission-governed modules */}
              {(isSuperAdmin || hasPermission('manage_settings')) && (
                <button
                  onClick={() => setActiveMenu('settings')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'settings' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Core Site Settings' : 'সাইট সেটিং (গ্লোবাল)'}</span>
                </button>
              )}

              {(isSuperAdmin || hasPermission('manage_cms')) && (
                <button
                  onClick={() => setActiveMenu('cms')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'cms' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Sliders className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Dynamic CMS Management' : 'ডাইনামিক কনটেন্ট (CMS)'}</span>
                </button>
              )}

              {(isSuperAdmin || hasPermission('manage_inventory')) && (
                <button
                  onClick={() => setActiveMenu('inventory')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'inventory' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Master Tourism Inventory' : '৮ বিভাগ ও ৬৪ জেলা ইনভেন্টরি'}</span>
                </button>
              )}

              {(isSuperAdmin || hasPermission('moderate_content')) && (
                <button
                  onClick={() => setActiveMenu('moderation')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'moderation' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckSquare className="w-4 h-4 text-sky-400" />
                    <span>{lang === 'en' ? 'Content Moderation & Review' : 'কনটেন্ট মডারেশন (Request/Review)'}</span>
                  </div>
                  {reviewRequests.filter(r => r.status === 'pending').length > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-400 text-amber-950">
                      {reviewRequests.filter(r => r.status === 'pending').length}
                    </span>
                  )}
                </button>
              )}

              {(isSuperAdmin || hasPermission('manage_users')) && (
                <button
                  onClick={() => setActiveMenu('rbac')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'rbac' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'User Roles & RBAC Control' : 'ইউজার রোল ও এক্সেস কন্ট্রোল'}</span>
                </button>
              )}

              {(isSuperAdmin || hasPermission('manage_finances')) && (
                <button
                  onClick={() => setActiveMenu('finances')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'finances' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Accounts & Financials' : 'একাউন্টস ও ফাইনান্সিয়াল এপ্রুভাল'}</span>
                </button>
              )}

              {(isSuperAdmin || hasPermission('manage_agents')) && (
                <button
                  onClick={() => setActiveMenu('agents')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'agents' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'Dynamic Agent Portal' : 'ডাইনামিক এজেন্ট ও হোটেল পোর্টাল'}</span>
                </button>
              )}

              {(isSuperAdmin || hasPermission('view_reports')) && (
                <button
                  onClick={() => setActiveMenu('reports')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                    activeMenu === 'reports' ? 'bg-[#0057D9] text-white shadow-xs' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'en' ? 'PDF Reports Deck' : 'পিডিএফ অডিট রিপোর্ট'}</span>
                </button>
              )}
            </nav>
          </div>

          <div className="p-4 border-t border-white/10 text-[11px] text-gray-400">
            <span className="font-bold text-white block">SANDVIORA V2.4 Enterprise</span>
            <span>Independent Custom Control Layer</span>
          </div>
        </aside>

        {/* =========================================================================
            DIV 2: RIGHT WORKSPACE AREA (MAIN CONTENT DIV)
            ========================================================================= */}
        <main className="flex-1 min-w-0 bg-[#F4F5F7] p-8 overflow-y-auto">

          {/* -------------------------------------------------------------
              TAB 1: EXECUTIVE OVERVIEW
              ------------------------------------------------------------- */}
          {activeMenu === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-[#002B49]">
                  {lang === 'en' ? 'Operations Overview' : 'অপারেশনাল ড্যাশবোর্ড ওভারভিউ'}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Central monitoring of Bangladesh master tourism inventory, moderation pipeline, and financial approvals.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Divisions & Districts
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#002B49]">8 Div / 64 Dist</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">100% Ready</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Pending Review Requests
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-amber-600">
                      {reviewRequests.filter(r => r.status === 'pending').length}
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Card View</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Financial Volume (BDT)
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#0057D9]">৳ 257,400</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Approved</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    Integrated Partners
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-700">{agents.length}</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">3 Scenarios</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <h3 className="text-sm font-black text-gray-800 mb-3">Quick Navigation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveMenu('moderation')}
                    className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] bg-gray-50/50 hover:bg-blue-50/30 transition-all text-left cursor-pointer"
                  >
                    <CheckSquare className="w-5 h-5 text-[#0057D9] mb-2" />
                    <h4 className="text-sm font-bold text-gray-900">Moderate Content Submissions</h4>
                    <p className="text-xs text-gray-500 mt-1">Open card view to inspect, edit, or return content to users.</p>
                  </button>

                  <button
                    onClick={() => setActiveMenu('rbac')}
                    className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] bg-gray-50/50 hover:bg-blue-50/30 transition-all text-left cursor-pointer"
                  >
                    <Key className="w-5 h-5 text-[#0057D9] mb-2" />
                    <h4 className="text-sm font-bold text-gray-900">Manage Users & Generate OTP</h4>
                    <p className="text-xs text-gray-500 mt-1">Create staff accounts, assign granular permissions & OTPs.</p>
                  </button>

                  <button
                    onClick={() => setActiveMenu('reports')}
                    className="p-4 rounded-xl border border-gray-200 hover:border-[#0057D9] bg-gray-50/50 hover:bg-blue-50/30 transition-all text-left cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-[#0057D9] mb-2" />
                    <h4 className="text-sm font-bold text-gray-900">Generate Audit PDF Reports</h4>
                    <p className="text-xs text-gray-500 mt-1">1-click binary ReportLab PDFs for bookings and revenue.</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB: BOOKINGS & PAYMENT VERIFICATION DESK
              ------------------------------------------------------------- */}
          {activeMenu === 'bookings' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs space-y-6">
              <div className="pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#002B49]">
                    {lang === 'en' ? 'Expedition Bookings & Payment Verification Queue' : 'ট্যুর বুকিং ও পেমেন্ট যাচাই ডেস্ক'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Match sender TrxIDs against merchant ledger, verify payments, and authorize official ticket vouchers.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                    {adminBookings.filter(b => b.payment_status === 'pending_verification').length} Pending Verifications
                  </span>
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                    {adminBookings.filter(b => b.payment_status === 'paid').length} Confirmed
                  </span>
                </div>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2 pb-2">
                {['all', 'pending_verification', 'paid', 'failed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilterStatus(st)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      bookingFilterStatus === st
                        ? 'bg-[#1D232C] text-white font-bold'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st === 'all' ? 'All Bookings' : st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-mono uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Ref & Date</th>
                      <th className="py-3 px-4">Traveler Info</th>
                      <th className="py-3 px-4">Tour & Departure</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment Method & TrxID</th>
                      <th className="py-3 px-4">Payment Status</th>
                      <th className="py-3 px-4 text-right">Verification Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {adminBookings
                      .filter(b => bookingFilterStatus === 'all' || b.payment_status === bookingFilterStatus)
                      .map((b) => (
                        <tr key={b.booking_reference} className="hover:bg-gray-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-mono">
                            <span className="font-bold text-[#1D232C] block">{b.booking_reference}</span>
                            <span className="text-[10px] text-gray-400">
                              {new Date(b.created_at || Date.now()).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#1D232C] block">{b.customer_name}</span>
                            <span className="text-gray-500 font-mono text-[11px] block">{b.customer_phone}</span>
                            <span className="text-gray-400 text-[10px]">{b.customer_email}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-medium text-gray-900 block line-clamp-1">
                              {b.tour_details?.title_en || b.tour?.title_en || `Tour #${b.tour}`}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">
                              Date: {b.travel_date} ({b.number_of_travelers} pers)
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-[#1D232C]">
                            ৳{Number(b.total_price || 0).toLocaleString()}
                          </td>

                          <td className="py-3.5 px-4 font-mono">
                            <span className="block text-gray-700">{b.payment_method}</span>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-gray-100 text-black font-bold border border-gray-300">
                              TrxID: {b.transaction_id || 'NOT_SUBMITTED'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono">
                            {b.payment_status === 'pending_verification' && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                ⏳ Pending Review
                              </span>
                            )}
                            {b.payment_status === 'paid' && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                ✓ Paid & Confirmed
                              </span>
                            )}
                            {b.payment_status === 'failed' && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                                ✕ Invalid / Rejected
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {b.payment_status === 'pending_verification' ? (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  disabled={bookingActionLoading}
                                  onClick={() => handleVerifyBookingPayment(b.booking_reference, 'approve')}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                                >
                                  ✓ Confirm
                                </button>
                                <button
                                  disabled={bookingActionLoading}
                                  onClick={() => handleVerifyBookingPayment(b.booking_reference, 'reject')}
                                  className="px-2.5 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-mono text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                                >
                                  ✕ Reject
                                </button>
                              </div>
                            ) : (
                              <a
                                href={`http://127.0.0.1:8000/api/v1/bookings/${b.booking_reference}/voucher-pdf/`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-[11px] transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>PDF Voucher</span>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    {adminBookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-400 font-mono">
                          No booking records found in the database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 2: CORE SITE SETTINGS (সাইট সেটিং)
              ------------------------------------------------------------- */}
          {activeMenu === 'settings' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs max-w-4xl">
              <div className="pb-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#002B49]">
                    {lang === 'en' ? 'Core Site Settings' : 'সাইট সেটিং (গ্লোবাল ডাটা নিয়ন্ত্রণ)'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Central configuration for portal branding, organization identity, contact info, and footer elements.
                  </p>
                </div>
                {settingsSaved && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
                  </span>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSettingsSaved(true);
                  setTimeout(() => setSettingsSaved(false), 3000);
                }}
                className="mt-6 space-y-6"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Organization / Portal Name</label>
                  <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Tagline (English)</label>
                    <input
                      type="text"
                      value={taglineEn}
                      onChange={(e) => setTaglineEn(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">ট্যাগলাইন (বাংলা)</label>
                    <input
                      type="text"
                      value={taglineBn}
                      onChange={(e) => setTaglineBn(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Official Contact Phone</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Official Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Registered Office Address</label>
                  <input
                    type="text"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save Global Site Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 3: DYNAMIC CMS (হিরো সেকশন ও কনটেন্ট)
              ------------------------------------------------------------- */}
          {/* -------------------------------------------------------------
              TAB 3: DYNAMIC CMS (হিরো, ক্যাম্পেইন, অ্যাকশন ম্যাট্রিক্স ও স্পটলাইট)
              ------------------------------------------------------------- */}
          {activeMenu === 'cms' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs max-w-5xl">
              <div className="pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#002B49] flex items-center gap-2.5">
                    <Layers className="w-5 h-5 text-[#0057D9]" />
                    {lang === 'en' ? 'Dynamic Editorial CMS & Showcase Control' : 'ডাইনামিক এডিটোরিয়াল কনটেন্ট ও প্রচার নিয়ন্ত্রণ'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage all front-facing editorial blocks, sage cards, campaign banners, and interactive discovery matrices directly in SQLite database.
                  </p>
                </div>
              </div>

              {/* Subtabs Header */}
              <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                <button
                  type="button"
                  onClick={() => setCmsTab('hero')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    cmsTab === 'hero'
                      ? 'bg-[#002B49] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  1. Hero & Sage Editorial Card
                </button>
                <button
                  type="button"
                  onClick={() => setCmsTab('campaign')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    cmsTab === 'campaign'
                      ? 'bg-[#002B49] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  2. Campaign Banner (Best in Travel 2026)
                </button>
                <button
                  type="button"
                  onClick={() => setCmsTab('action_matrix')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    cmsTab === 'action_matrix'
                      ? 'bg-[#002B49] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  3. Action Matrix (4 Cards)
                </button>
                <button
                  type="button"
                  onClick={() => setCmsTab('spotlights')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    cmsTab === 'spotlights'
                      ? 'bg-[#002B49] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  4. Spotlight Features (2 Cards)
                </button>
              </div>

              {/* ---------------- SUBTAB 1: HERO & SAGE CARD ---------------- */}
              {cmsTab === 'hero' && (
                <form onSubmit={handleSaveHeroCms} className="mt-6 space-y-5">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0057D9]">
                      Hero Backdrop & Editorial Sage Card
                    </span>
                    {cmsSaved && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Site Config Updated!
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Hero Highlight Badge</label>
                    <input
                      type="text"
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Hero Headline (EN)</label>
                      <input
                        type="text"
                        value={heroHeadlineEn}
                        onChange={(e) => setHeroHeadlineEn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">হিরো হেডলাইন (বাংলা)</label>
                      <input
                        type="text"
                        value={heroHeadlineBn}
                        onChange={(e) => setHeroHeadlineBn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Hero Editorial Subheadline (EN)</label>
                      <textarea
                        rows={3}
                        value={heroSubheadlineEn}
                        onChange={(e) => setHeroSubheadlineEn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">হিরো এডিটোরিয়াল বিবরণ (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={heroSubheadlineBn}
                        onChange={(e) => setHeroSubheadlineBn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Hero Background Image Path / URL</label>
                      <input
                        type="text"
                        value={heroImage}
                        onChange={(e) => setHeroImage(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Photographer Attribution Tag</label>
                      <input
                        type="text"
                        value={heroPhotographerTag}
                        onChange={(e) => setHeroPhotographerTag(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Hero CTA Button Text</label>
                      <input
                        type="text"
                        value={heroCtaTextEn}
                        onChange={(e) => setHeroCtaTextEn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Hero CTA Target URL</label>
                      <input
                        type="text"
                        value={heroCtaUrl}
                        onChange={(e) => setHeroCtaUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={cmsSaving}
                      className="px-6 py-2.5 bg-[#0057D9] hover:bg-[#0042a6] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {cmsSaving ? 'Saving to Database...' : 'Save Hero & Sage Card Settings'}
                    </button>
                  </div>
                </form>
              )}

              {/* ---------------- SUBTAB 2: CAMPAIGN BANNER ---------------- */}
              {cmsTab === 'campaign' && (
                <form onSubmit={handleSaveCampaign} className="mt-6 space-y-5">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0057D9]">
                      Annual Best In Travel Feature Banner
                    </span>
                    {campaignSaved && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Campaign Banner Updated!
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Kicker EN (e.g. SANDVIORA'S)</label>
                      <input
                        type="text"
                        value={campaignData?.kicker_en || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, kicker_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Kicker BN (বাংলা কিউয়ার্ড)</label>
                      <input
                        type="text"
                        value={campaignData?.kicker_bn || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, kicker_bn: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Campaign Headline EN (e.g. Best in Travel 2026)</label>
                      <input
                        type="text"
                        value={campaignData?.title_en || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, title_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">ক্যাম্পেইন হেডলাইন BN (বাংলা)</label>
                      <input
                        type="text"
                        value={campaignData?.title_bn || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, title_bn: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Campaign Description EN</label>
                      <textarea
                        rows={3}
                        value={campaignData?.description_en || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, description_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">ক্যাম্পেইন বর্ণনা BN (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={campaignData?.description_bn || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, description_bn: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Background Banner Image URL</label>
                      <input
                        type="text"
                        value={campaignData?.bg_image || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, bg_image: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">CTA Button Text</label>
                      <input
                        type="text"
                        value={campaignData?.cta_text_en || ''}
                        onChange={(e) => setCampaignData({ ...campaignData, cta_text_en: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={campaignData?.is_active ?? true}
                        onChange={(e) => setCampaignData({ ...campaignData, is_active: e.target.checked })}
                        className="rounded border-gray-300 text-[#0057D9] focus:ring-[#0057D9]"
                      />
                      <span>Display Campaign Banner on Homepage</span>
                    </label>

                    <button
                      type="submit"
                      disabled={campaignSaving}
                      className="px-6 py-2.5 bg-[#0057D9] hover:bg-[#0042a6] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {campaignSaving ? 'Saving...' : 'Save Campaign Banner'}
                    </button>
                  </div>
                </form>
              )}

              {/* ---------------- SUBTAB 3: ACTION MATRIX CARDS ---------------- */}
              {cmsTab === 'action_matrix' && (
                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0057D9]">
                      4 Action Matrix Cards (Lonely Planet Exploration Matrix)
                    </span>
                    <span className="text-xs text-gray-500">
                      Changes save individually to SQLite database
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {actionMatrixCards.map((card, idx) => (
                      <div key={card.id || idx} className="p-5 border border-gray-200 rounded-2xl bg-gray-50/50 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#002B49] bg-white px-2.5 py-1 rounded-md border border-gray-200">
                            Card #{idx + 1}
                          </span>
                          {matrixSavedId === card.id && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Saved!
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">Kicker</label>
                          <input
                            type="text"
                            value={card.kicker || ''}
                            onChange={(e) => {
                              const updated = [...actionMatrixCards];
                              updated[idx].kicker = e.target.value;
                              setActionMatrixCards(updated);
                            }}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">Card Title</label>
                          <input
                            type="text"
                            value={card.title || ''}
                            onChange={(e) => {
                              const updated = [...actionMatrixCards];
                              updated[idx].title = e.target.value;
                              setActionMatrixCards(updated);
                            }}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">Button Text</label>
                            <input
                              type="text"
                              value={card.cta_text || ''}
                              onChange={(e) => {
                                const updated = [...actionMatrixCards];
                                updated[idx].cta_text = e.target.value;
                                setActionMatrixCards(updated);
                              }}
                              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">Target URL</label>
                            <input
                              type="text"
                              value={card.url || ''}
                              onChange={(e) => {
                                const updated = [...actionMatrixCards];
                                updated[idx].url = e.target.value;
                                setActionMatrixCards(updated);
                              }}
                              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">Image URL / Path</label>
                          <input
                            type="text"
                            value={card.image || ''}
                            onChange={(e) => {
                              const updated = [...actionMatrixCards];
                              updated[idx].image = e.target.value;
                              setActionMatrixCards(updated);
                            }}
                            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                          />
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleSaveActionCard(card)}
                            className="px-4 py-1.5 bg-[#002B49] hover:bg-[#001f35] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Update Card #{idx + 1}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- SUBTAB 4: SPOTLIGHT FEATURES ---------------- */}
              {cmsTab === 'spotlights' && (
                <div className="mt-6 space-y-6">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0057D9]">
                      2 Dual Spotlight Feature Banners (Trending Deals & Curated Collections)
                    </span>
                    <span className="text-xs text-gray-500">
                      Changes save individually to SQLite database
                    </span>
                  </div>

                  <div className="space-y-6">
                    {spotlightFeatures.map((spotlight, idx) => (
                      <div key={spotlight.id || idx} className="p-6 border border-gray-200 rounded-2xl bg-gray-50/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#002B49] bg-white px-3 py-1 rounded-md border border-gray-200">
                            Spotlight Banner #{idx + 1}: {spotlight.tag || 'EDITORIAL'}
                          </span>
                          {spotlightSavedId === spotlight.id && (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Spotlight Saved!
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Tag / Category</label>
                            <input
                              type="text"
                              value={spotlight.tag || ''}
                              onChange={(e) => {
                                const updated = [...spotlightFeatures];
                                updated[idx].tag = e.target.value;
                                setSpotlightFeatures(updated);
                              }}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-700 mb-1">Title EN</label>
                            <input
                              type="text"
                              value={spotlight.title_en || ''}
                              onChange={(e) => {
                                const updated = [...spotlightFeatures];
                                updated[idx].title_en = e.target.value;
                                setSpotlightFeatures(updated);
                              }}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Description EN</label>
                          <textarea
                            rows={2}
                            value={spotlight.description_en || ''}
                            onChange={(e) => {
                              const updated = [...spotlightFeatures];
                              updated[idx].description_en = e.target.value;
                              setSpotlightFeatures(updated);
                            }}
                            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">Image URL / Path</label>
                            <input
                              type="text"
                              value={spotlight.image || ''}
                              onChange={(e) => {
                                const updated = [...spotlightFeatures];
                                updated[idx].image = e.target.value;
                                setSpotlightFeatures(updated);
                              }}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">CTA Text</label>
                            <input
                              type="text"
                              value={spotlight.cta_text_en || ''}
                              onChange={(e) => {
                                const updated = [...spotlightFeatures];
                                updated[idx].cta_text_en = e.target.value;
                                setSpotlightFeatures(updated);
                              }}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">CTA Target URL</label>
                            <input
                              type="text"
                              value={spotlight.cta_url || ''}
                              onChange={(e) => {
                                const updated = [...spotlightFeatures];
                                updated[idx].cta_url = e.target.value;
                                setSpotlightFeatures(updated);
                              }}
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none focus:border-[#0057D9]"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleSaveSpotlight(spotlight)}
                            className="px-5 py-2 bg-[#002B49] hover:bg-[#001f35] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Update Spotlight #{idx + 1}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 4: MASTER TOURISM INVENTORY (৮ বিভাগ ও ৬৪ জেলা)
              ------------------------------------------------------------- */}
          {activeMenu === 'inventory' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
              <div className="pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#002B49]">
                    {lang === 'en' ? 'Bangladesh Master Tourism Inventory' : '৮ বিভাগ ও ৬৪ জেলা ডিজিটাল পর্যটন ইনভেন্টরি'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Hierarchical structure: Bangladesh → 8 Divisions → 64 Districts → Upazilas/Spots.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-[#0057D9] rounded-full border border-blue-100">
                    8 Divisions
                  </span>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100">
                    64 Districts
                  </span>
                </div>
              </div>

              {/* Divisions Grid */}
              <div className="mt-6">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-3">
                  All 8 Administrative Divisions of Bangladesh
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {divisions.map((div: any) => (
                    <div key={div.id || div.slug} className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h4 className="text-sm font-black text-[#002B49]">{div.name_en}</h4>
                      <p className="text-xs text-gray-500">{div.name_bn}</p>
                      <span className="inline-block mt-2 text-[10px] font-bold text-[#0057D9]">
                        {div.districts?.length || 'Districts structured'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Districts Catalogue Sample */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-3">
                  64 Districts Coverage & Clustering
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-xl border border-gray-200">
                  {districts.map((d: any) => (
                    <div key={d.id} className="p-2 bg-white rounded-lg border border-gray-200 text-center">
                      <span className="text-[11px] font-bold text-gray-800 block truncate">{d.name_en}</span>
                      <span className="text-[9px] text-gray-400 block truncate">{d.name_bn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 5: CONTENT MODERATION & REVIEW WORKFLOW (৫টি ধাপ)
              Card View -> Full View -> Direct Edit / Publish OR Review Again
              ------------------------------------------------------------- */}
          {activeMenu === 'moderation' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-[#002B49]">
                    {lang === 'en' ? 'Content Moderation & Review Workflow' : 'কনটেন্ট মডারেশন ও ওয়ার্কফ্লো (Request/Review)'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Multi-level review process: Submissions stay pending → Card View inspection → Full View edit & publish OR comment and return.
                  </p>
                </div>
                <button
                  onClick={loadAllAdminData}
                  className="px-3.5 py-2 text-xs font-bold bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Queue</span>
                </button>
              </div>

              {/* STEP 2: Dedicated 'Request/Review' CARD VIEW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviewRequests.map((req) => {
                  const isPending = req.status === 'pending';
                  const isReviewAgain = req.status === 'review_again';
                  const isApproved = req.status === 'approved';

                  return (
                    <div
                      key={req.id}
                      onClick={() => handleOpenReviewModal(req)}
                      className={`bg-white rounded-2xl p-5 border cursor-pointer hover:shadow-lg transition-all relative flex flex-col justify-between ${
                        isPending 
                          ? 'border-blue-300 ring-2 ring-blue-100' 
                          : isReviewAgain 
                          ? 'border-amber-300 bg-amber-50/30' 
                          : 'border-emerald-200'
                      }`}
                    >
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-[#0057D9]">
                            {req.content_type_display || req.content_type}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            isPending 
                              ? 'bg-amber-100 text-amber-800 animate-pulse' 
                              : isReviewAgain 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {req.status_display || req.status}
                          </span>
                        </div>

                        <h4 className="text-base font-black text-[#002B49] line-clamp-1">{req.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {req.division_name} ({req.district_name})
                        </p>
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                          {req.payload?.overview_en || 'Draft submission awaiting administrative review.'}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-gray-500">
                          By <strong className="text-gray-800">@{req.submitted_by_username}</strong>
                        </span>
                        <span className="text-xs font-bold text-[#0057D9] flex items-center gap-1">
                          Inspect Card →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* STEP 3 & 4: FULL-VIEW MODAL WITH DIRECT EDIT & "REVIEW AGAIN" FLOW */}
              {selectedReviewItem && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#0057D9] tracking-wider">
                          FULL VIEW INSPECTION & VERIFICATION
                        </span>
                        <h3 className="text-xl font-black text-[#002B49] mt-0.5">
                          {selectedReviewItem.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedReviewItem(null)}
                        className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Editable Inspection Fields */}
                    <div className="mt-5 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Destination / Service Title (Admin In-Place Editable)
                        </label>
                        <input
                          type="text"
                          value={editablePayloadTitle}
                          onChange={(e) => setEditablePayloadTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <span className="text-[10px] font-bold uppercase text-gray-400 block">Division</span>
                          <span className="text-xs font-bold text-gray-800">{selectedReviewItem.division_name}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <span className="text-[10px] font-bold uppercase text-gray-400 block">Category</span>
                          <span className="text-xs font-bold text-gray-800">{selectedReviewItem.category}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Overview & Highlights (Admin In-Place Editable)
                        </label>
                        <textarea
                          rows={4}
                          value={editablePayloadOverview}
                          onChange={(e) => setEditablePayloadOverview(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                        />
                      </div>

                      {/* STEP 4: Comment Section for 'Review Again' */}
                      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 mb-1">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>Admin Comment / Instruction Box (ফর 'Review Again' ফ্লো)</span>
                        </div>
                        <textarea
                          rows={2}
                          value={adminCommentText}
                          onChange={(e) => setAdminCommentText(e.target.value)}
                          placeholder="If there are missing fields or errors, write instructions here and click 'Review Again' to return to submitter..."
                          className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl outline-none focus:border-amber-500 text-gray-800"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={handleReviewAgain}
                        disabled={moderationActionLoading}
                        className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>Send Back: Review Again</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedReviewItem(null)}
                          className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDirectPublish}
                          disabled={moderationActionLoading}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          {moderationActionLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                          <span>Approve & Direct Publish</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 6: RBAC & USER MANAGEMENT (রোল-বেসড এক্সেস ও ওটিপি)
              ------------------------------------------------------------- */}
          {activeMenu === 'rbac' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#002B49]">
                  {lang === 'en' ? 'User Roles, Permissions & Security (RBAC)' : 'রোল-বেসড এক্সেস কন্ট্রোল ও ইউজার সিকিউরিটি'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Superuser creates administrative and moderator accounts, manages granular permissions, and generates OTPs for recovery.
                </p>
              </div>

              {/* Created OTP Notice */}
              {createdStaffOtp && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>User created! One-Time Password (OTP) for first-time login: <strong className="font-mono text-sm bg-white px-2 py-0.5 rounded border">{createdStaffOtp}</strong></span>
                  </div>
                  <button
                    onClick={() => setCreatedStaffOtp(null)}
                    className="text-xs text-gray-500 hover:text-gray-900 font-bold"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Create Staff User Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <h3 className="text-sm font-black text-gray-800 mb-3">Create Staff Account (Moderator, Supervisor, Accounts)</h3>
                <form onSubmit={handleCreateStaff} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={newStaffUsername}
                      onChange={(e) => setNewStaffUsername(e.target.value)}
                      placeholder="e.g. mod_sylhet"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={newStaffEmail}
                      onChange={(e) => setNewStaffEmail(e.target.value)}
                      placeholder="mod@sandviora.com"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      placeholder="e.g. Mofazzal Hossain"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      {lang === 'en' ? 'Assigned Primary Role' : 'নির্ধারিত ভূমিকা (রোল)'}
                    </label>
                    <select
                      value={newStaffRole}
                      onChange={(e) => {
                        const r = e.target.value;
                        setNewStaffRole(r);
                        if (r === 'admin') {
                          setNewStaffPerms(['manage_settings', 'manage_cms', 'manage_inventory', 'moderate_content', 'manage_users', 'manage_finances', 'manage_agents', 'view_reports']);
                        } else if (r === 'moderator') {
                          setNewStaffPerms(['manage_inventory', 'moderate_content']);
                        } else if (r === 'creator') {
                          setNewStaffPerms(['manage_inventory', 'manage_cms']);
                        } else if (r === 'accounts_hrm') {
                          setNewStaffPerms(['manage_finances', 'view_reports']);
                        }
                      }}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                    >
                      <option value="moderator">Content Moderator (মডারেটর)</option>
                      <option value="creator">Content Creator (ক্রিয়েটর)</option>
                      <option value="supervisor">Supervisor (সুপারভাইজার)</option>
                      <option value="accounts_hrm">Accounts & HRM (হিসাব ও পে-রোল)</option>
                      <option value="admin">Central Admin (সেন্ট্রাল এডমিন)</option>
                    </select>
                  </div>

                  {/* GRANULAR PERMISSION CHECKBOXES (স্পেসিফাইড পারমিশন কন্ট্রোল) */}
                  <div className="sm:col-span-2 lg:col-span-4 pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-gray-700 block mb-2">
                      {lang === 'en' 
                        ? 'Granular Permissions (Checked options will be active in user left navigation):' 
                        : 'সুনির্দিষ্ট পারমিশন নির্বাচন (যেসব বক্সে টিক মার্ক থাকবে ব্যবহারকারী শুধুমাত্র সেই মেনু দেখতে ও কাজ করতে পারবে):'}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { key: 'manage_settings', label_en: 'Site Settings', label_bn: 'সাইট সেটিং' },
                        { key: 'manage_cms', label_en: 'Dynamic CMS', label_bn: 'হিরো ও কনটেন্ট' },
                        { key: 'manage_inventory', label_en: 'Tourism Inventory', label_bn: '৮ বিভাগ ও ৬৪ জেলা' },
                        { key: 'moderate_content', label_en: 'Content Moderation', label_bn: 'কনটেন্ট রিভিউ' },
                        { key: 'manage_users', label_en: 'User RBAC & OTP', label_bn: 'ইউজার ও ওটিপি' },
                        { key: 'manage_finances', label_en: 'Accounts Ledger', label_bn: 'একাউন্টস ও পে-রোল' },
                        { key: 'manage_agents', label_en: 'Agent Portal', label_bn: 'এজেন্ট পোর্টাল' },
                        { key: 'view_reports', label_en: 'PDF Reports', label_bn: 'পিডিএফ রিপোর্ট' },
                      ].map((perm) => {
                        const isChecked = newStaffPerms.includes(perm.key);
                        return (
                          <label
                            key={perm.key}
                            className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                              isChecked ? 'bg-blue-50 border-[#0057D9] text-[#002B49] font-medium' : 'bg-gray-50 border-gray-200 text-gray-500'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewStaffPerms([...newStaffPerms, perm.key]);
                                } else {
                                  setNewStaffPerms(newStaffPerms.filter(k => k !== perm.key));
                                }
                              }}
                              className="rounded text-[#0057D9] focus:ring-[#0057D9]"
                            />
                            <span>{lang === 'en' ? perm.label_en : perm.label_bn}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2">
                    <span className="text-[11px] text-gray-500">
                      {lang === 'en' 
                        ? '* A 6-digit OTP will be generated. The staff member must set a new password on first login.' 
                        : '* স্বয়ংক্রিয়ভাবে একটি ওটিপি তৈরি হবে যা দিয়ে প্রথমবার লগইন করামাত্র বাধ্যতামূলক পাসওয়ার্ড রিসেট করতে হবে।'}
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-medium rounded-full shadow-xs transition-colors cursor-pointer"
                    >
                      {lang === 'en' ? 'Create User & Generate OTP' : 'ইউজার ক্রিয়েট ও ওটিপি জেনারেট'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-black text-gray-800">System User Directory & OTP Controller</h3>
                  <span className="text-xs text-gray-500 font-bold">{users.length} Registered Accounts</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 uppercase font-black text-[10px] border-b border-gray-200">
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Email (Locked)</th>
                        <th className="py-3 px-4">Phone (Locked)</th>
                        <th className="py-3 px-4">OTP Security State</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            <div>@{u.username}</div>
                            <span className="text-[10px] text-gray-400 font-normal">{u.name}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-50 text-[#0057D9]">
                              {u.role_display || u.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 font-mono text-[11px]">{u.email}</td>
                          <td className="py-3.5 px-4 text-gray-600 font-mono text-[11px]">{u.phone || '—'}</td>
                          <td className="py-3.5 px-4">
                            {u.has_active_otp ? (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                OTP Active: {u.active_otp}
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-gray-400">Regular Password</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleGenerateUserOtp(u.id, u.username)}
                              className="px-3 py-1 bg-gray-100 hover:bg-[#0057D9] hover:text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                            >
                              Generate OTP
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 7: ACCOUNTS & FINANCIAL GOVERNANCE (একাউন্টস ও এপ্রুভাল)
              ------------------------------------------------------------- */}
          {activeMenu === 'finances' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#002B49]">
                  {lang === 'en' ? 'Accounts & Financial Governance' : 'একাউন্টস ও ফাইনান্সিয়াল এপ্রুভাল ওয়ার্কফ্লো'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Mandatory approval workflow for staff payroll, inventory purchases, and dynamic partner payouts.
                </p>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-sm font-black text-gray-800">Financial Ledger & Approvals</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 uppercase font-black text-[10px] border-b border-gray-200">
                        <th className="py-3 px-4">Transaction / Purpose</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Amount (BDT)</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Approval Decision</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {finances.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            <div>{tx.title}</div>
                            <span className="text-[10px] text-gray-400 font-normal">{tx.notes}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-700">
                              {tx.transaction_type_display || tx.transaction_type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-black font-mono text-gray-900">
                            ৳ {Number(tx.amount_bdt).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              tx.approval_status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : tx.approval_status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800 animate-pulse'
                            }`}>
                              {tx.approval_status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {tx.approval_status === 'pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleFinanceDecision(tx.id, 'approved')}
                                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleFinanceDecision(tx.id, 'rejected')}
                                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] text-gray-400 font-bold">Settled</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 8: DYNAMIC AGENT PORTAL & PARTNERS (৩টি সিনারিও)
              ------------------------------------------------------------- */}
          {activeMenu === 'agents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#002B49]">
                  {lang === 'en' ? 'Dynamic Agent Portal & Partners' : 'ডাইনামিক এজেন্ট পোর্টাল ও পার্টনার ইন্টিগ্রেশন'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Hotels, resorts, transport agencies and local guides managed across 3 technical integration tiers.
                </p>
              </div>

              {/* 3 Integration Scenarios Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 bg-white rounded-2xl border border-blue-200 shadow-xs">
                  <span className="text-[10px] font-black uppercase text-[#0057D9] block mb-1">
                    Scenario 1: Direct API Sync
                  </span>
                  <h4 className="text-sm font-black text-gray-900">Partners with Booking APIs</h4>
                  <p className="text-xs text-gray-500 mt-1">Sayeman Beach Resort and modern airlines syncing live inventory.</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-indigo-200 shadow-xs">
                  <span className="text-[10px] font-black uppercase text-indigo-600 block mb-1">
                    Scenario 2: Portal Sync
                  </span>
                  <h4 className="text-sm font-black text-gray-900">Websites Without API</h4>
                  <p className="text-xs text-gray-500 mt-1">Eco Cottages using Sandviora agent dashboard to update room vacancies.</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-amber-200 shadow-xs">
                  <span className="text-[10px] font-black uppercase text-amber-600 block mb-1">
                    Scenario 3: Zero-Tech Managed
                  </span>
                  <h4 className="text-sm font-black text-gray-900">Zero-Tech Operators</h4>
                  <p className="text-xs text-gray-500 mt-1">Indigenous mountain guides and boatmen fully managed by central platform.</p>
                </div>
              </div>

              {/* Agents Directory */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="text-sm font-black text-gray-800">Partner Directory</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 uppercase font-black text-[10px] border-b border-gray-200">
                        <th className="py-3 px-4">Partner Entity</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Technical Tier</th>
                        <th className="py-3 px-4">Commission</th>
                        <th className="py-3 px-4">Listings</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {agents.map((ag) => (
                        <tr key={ag.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            <div>{ag.company_name}</div>
                            <span className="text-[10px] text-gray-400 font-normal">{ag.contact_person} • {ag.phone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                              {ag.partner_type_display || ag.partner_type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0057D9]">
                              Scenario {ag.integration_scenario}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-700">{ag.commission_pct}%</td>
                          <td className="py-3.5 px-4 font-bold">{ag.active_listings_count}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                              {ag.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              TAB 9: PDF REPORTS DECK (পিডিএফ অডিট রিপোর্ট)
              ------------------------------------------------------------- */}
          {activeMenu === 'reports' && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs max-w-4xl">
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-xl font-black text-[#002B49]">
                  {lang === 'en' ? 'PDF Reports & Enterprise Audit Deck' : 'পিডিএফ অডিট ও এন্টারপ্রাইজ রিপোর্টিং'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Generate official 1-click binary downloadable PDF statements via ReportLab engine.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-5 rounded-2xl border border-gray-200 hover:border-[#0057D9] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-black text-gray-900">Bookings & Reservations Ledger (PDF)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Audit trail of customer names, dates, payment status, contact numbers, and voucher references.
                    </p>
                  </div>
                  <a
                    href="http://127.0.0.1:8000/api/v1/reports/pdf/bookings/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Bookings PDF</span>
                  </a>
                </div>

                <div className="p-5 rounded-2xl border border-gray-200 hover:border-[#0057D9] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-black text-gray-900">Financial Revenue & Settlement Audit (PDF)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Platform gross transaction volume, revenue breakdown by destination cluster, and profit margin analysis.
                    </p>
                  </div>
                  <a
                    href="http://127.0.0.1:8000/api/v1/reports/pdf/revenue/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Revenue PDF</span>
                  </a>
                </div>

                <div className="p-5 rounded-2xl border border-gray-200 hover:border-[#0057D9] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-black text-gray-900">Master Tour Inventory & Capacity Catalogue (PDF)</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Full catalogue of 8 divisions, 64 districts, package itineraries, inclusions, and difficulty tiers.
                    </p>
                  </div>
                  <a
                    href="http://127.0.0.1:8000/api/v1/reports/pdf/inventory/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#0057D9] hover:bg-[#0042a6] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Inventory PDF</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
