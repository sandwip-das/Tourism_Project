'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
  initialTab?: 'signin' | 'signup';
  onLoginSuccess: (userData: any) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  lang,
  initialTab = 'signin',
  onLoginSuccess,
}: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (tab === 'signin') {
        const res = await fetch('http://127.0.0.1:8000/api/v1/auth/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: identifier,
            password: password
          })
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || 'Failed to sign in. Please verify your credentials.');
          setIsLoading(false);
          return;
        }

        if (data.status === 'must_reset_password') {
          setErrorMsg('One-Time Password active. Please visit /platform-admin to set your new permanent password.');
          setIsLoading(false);
          return;
        }

        const userObj = data.user;
        localStorage.setItem('sandviora_user', JSON.stringify(userObj));
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess(userObj);
          onClose();
          setSuccess(false);
        }, 1000);

      } else {
        // Register new customer
        const username = identifier.includes('@') ? identifier.split('@')[0] : identifier;
        const email = identifier.includes('@') ? identifier : `${identifier}@sandviora.com`;

        const res = await fetch('http://127.0.0.1:8000/api/v1/auth/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            full_name: fullName,
            phone: phone
          })
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || 'Registration failed. Username or email may already be taken.');
          setIsLoading(false);
          return;
        }

        const userObj = data.user;
        localStorage.setItem('sandviora_user', JSON.stringify(userObj));
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess(userObj);
          onClose();
          setSuccess(false);
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#1D232C] mb-1">
              {tab === 'signin' ? (lang === 'en' ? 'Welcome Back!' : 'স্বাগতম!') : (lang === 'en' ? 'Account Created!' : 'অ্যাকাউন্ট তৈরি সম্পন্ন!')}
            </h3>
            <p className="text-sm text-gray-500">
              {lang === 'en' ? 'Signing you in to your travel profile...' : 'আপনার প্রোফাইলে প্রবেশ করা হচ্ছে...'}
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold text-[#0057D9] uppercase tracking-wider block mb-1">
                SANDVIORA COMMUNITY
              </span>
              <h2 className="text-2xl font-bold text-[#1D232C]">
                {tab === 'signin'
                  ? (lang === 'en' ? 'Sign in to your account' : 'অ্যাকাউন্টে সাইন ইন করুন')
                  : (lang === 'en' ? 'Join our travel community' : 'নতুন অ্যাকাউন্ট তৈরি করুন')}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'en'
                  ? 'Access your saved wishlist, personalized bookings, and travel vouchers.'
                  : 'পছন্দের গন্তব্য সংরক্ষণ করুন এবং সহজে বুকিং ম্যানেজ করুন।'}
              </p>
            </div>

            {/* Tab switch */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => { setTab('signin'); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  tab === 'signin' ? 'bg-white text-[#1D232C] shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {lang === 'en' ? 'Sign In' : 'লগইন'}
              </button>
              <button
                type="button"
                onClick={() => { setTab('signup'); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  tab === 'signup' ? 'bg-white text-[#1D232C] shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {lang === 'en' ? 'Create Account' : 'রেজিস্ট্রেশন'}
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {tab === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'en' ? 'Full Name' : 'পূর্ণ নাম'}
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-gray-400 absolute left-3" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {lang === 'en' ? 'Phone Number (Permanent)' : 'ফোন নম্বর (স্থায়ী)'}
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1700-000000"
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {tab === 'signin' 
                    ? (lang === 'en' ? 'Username or Email' : 'ইউজারনেম অথবা ইমেইল')
                    : (lang === 'en' ? 'Email Address (Permanent)' : 'ইমেইল অ্যাড্রেস (স্থায়ী)')}
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={tab === 'signin' ? 'username or email' : 'traveler@email.com'}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {lang === 'en' ? 'Password' : 'পাসওয়ার্ড'}
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl outline-none focus:border-[#0057D9]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0057D9] hover:bg-[#0042a6] text-white text-sm font-bold rounded-xl transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{tab === 'signin' ? (lang === 'en' ? 'Sign In' : 'সাইন ইন করুন') : (lang === 'en' ? 'Register Now' : 'রেজিস্ট্রেশন সম্পন্ন করুন')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
              {tab === 'signin' ? (
                <span>
                  {lang === 'en' ? "Don't have an account? " : "কোনো অ্যাকাউন্ট নেই? "}
                  <button
                    onClick={() => { setTab('signup'); setErrorMsg(''); }}
                    className="font-bold text-[#0057D9] hover:underline cursor-pointer"
                  >
                    {lang === 'en' ? 'Join here' : 'এখানে যোগ দিন'}
                  </button>
                </span>
              ) : (
                <span>
                  {lang === 'en' ? 'Already have an account? ' : 'ইতিমধ্যে অ্যাকাউন্ট আছে? '}
                  <button
                    onClick={() => { setTab('signin'); setErrorMsg(''); }}
                    className="font-bold text-[#0057D9] hover:underline cursor-pointer"
                  >
                    {lang === 'en' ? 'Sign in' : 'লগইন করুন'}
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
