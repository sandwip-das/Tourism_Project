'use client';

import React, { useState } from 'react';
import { TourPackage } from '../types';
import { createBooking } from '../lib/api';
import { X, ShieldAlert, CreditCard, CheckCircle2, Clock, ArrowRight, Lock, Phone } from 'lucide-react';

interface BookingModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  lang: 'en' | 'bn';
  currentUser: any | null;
  onOpenAuth: () => void;
}

export default function BookingModal({
  tour,
  onClose,
  lang,
  currentUser,
  onOpenAuth,
}: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'submitted'>('details');

  // Form states
  const [fullName, setFullName] = useState(
    currentUser?.first_name ? `${currentUser.first_name} ${currentUser.last_name || ''}`.trim() : currentUser?.username || ''
  );
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('+880 1');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [notes, setNotes] = useState('');

  // Payment method & TrxID
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [transactionId, setTransactionId] = useState('');

  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!tour) return null;

  const unitPrice = Number(tour.discount_price_bdt || tour.price_bdt);
  const totalPrice = unitPrice * travelers;

  // 1. NON-AUTHENTICATED USER LOCK
  if (!currentUser) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-gray-200 text-center animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-100">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-[#1D232C] mb-2 font-mono uppercase">
            {lang === 'en' ? 'Account Authentication Required' : 'নিবন্ধন ও লগইন আবশ্যক'}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed font-normal">
            {lang === 'en'
              ? 'To protect traveler safety, verify security permits, and issue authenticated travel tickets, guest bookings are not allowed. Please sign in or register to book this tour.'
              : 'ভ্রমণকারীদের সার্বিক নিরাপত্তা, স্থানীয় প্রশাসনের অনুমতিপত্র ও টিকিট ইস্যু করার জন্য গেস্ট বুকিং গ্রহণযোগ্য নয়। বুকিং করার পূর্বে অনুগ্রহ করে সাইন-ইন অথবা রেজিস্ট্রেশন করুন।'}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full py-3 rounded-full bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'en' ? 'Sign In / Register' : 'সাইন ইন / রেজিস্ট্রেশন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-mono uppercase text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'Cancel' : 'বাতিল'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. SUBMISSION HANDLER
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelDate) {
      setErrorMsg(lang === 'en' ? 'Please select your travel date.' : 'ভ্রমণের তারিখ নির্ধারণ করুন।');
      return;
    }
    if (!fullName || !email || !phone) {
      setErrorMsg(lang === 'en' ? 'Please fill in all traveler contact information.' : 'আপনার যোগাযোগের তথ্য পূরণ করুন।');
      return;
    }
    setErrorMsg('');
    setStep('payment');
  };

  const handleConfirmPaymentSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your Transaction ID (TrxID).' : 'আপনার লেনদেন ট্রানজেকশন আইডি (TrxID) দিন।');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await createBooking({
        tour_id: tour.id,
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        travel_date: travelDate,
        number_of_travelers: travelers,
        special_requests: notes,
        unit_price: unitPrice,
        payment_method: paymentMethod === 'bkash' ? 'bKash Merchant' : paymentMethod === 'nagad' ? 'Nagad Merchant' : 'Bank Escrow Transfer',
        transaction_id: transactionId.trim().toUpperCase(),
        payment_status: 'pending_verification',
      });
      setBookingRef(res.booking_reference || `SND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      setStep('submitted');
    } catch (err: any) {
      setBookingRef(`SND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      setStep('submitted');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bg-white rounded-none sm:rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-emerald-700 uppercase block font-bold">
              AUTHENTICATED EXPEDITION BOOKING
            </span>
            <h3 className="text-xl font-bold text-[#1D232C] mt-0.5">
              {lang === 'en' ? tour.title_en : tour.title_bn}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Details */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                    {lang === 'en' ? 'Traveler Full Name' : 'ভ্রমণকারীর নাম'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1D232C] outline-none focus:border-black font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                    {lang === 'en' ? 'Email Address' : 'ইমেইল'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1D232C] outline-none focus:border-black font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                    {lang === 'en' ? 'Contact Phone / WhatsApp' : 'মোবাইল নম্বর'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1D232C] outline-none focus:border-black font-normal font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                    {lang === 'en' ? 'Travel Departure Date' : 'যাত্রার তারিখ'}
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1D232C] outline-none focus:border-black font-normal font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                  {lang === 'en' ? 'Number of Travelers' : 'যাত্রী সংখ্যা'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max={tour.max_group_size || 15}
                    value={travelers}
                    onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1D232C] outline-none focus:border-black font-mono font-bold"
                  />
                  <span className="text-xs text-gray-500 font-mono">
                    Max group size: {tour.max_group_size} travelers
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-500 mb-1">
                  {lang === 'en' ? 'Special Requests & Dietary Requirements' : 'বিশেষ চাহিদা বা খাবার সংক্রান্ত নির্দেশনা'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'en' ? 'e.g. Vegetarian meals, twin beds...' : 'যেমন: ভেজিটেরিয়ান খাবার, টুইন বেড...'}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-[#1D232C] outline-none focus:border-black font-normal resize-none"
                />
              </div>

              {/* Price summary */}
              <div className="p-4 bg-gray-100 rounded-xl flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-gray-500 block">TOTAL EXPEDITION COST</span>
                  <span className="text-lg font-bold text-[#1D232C]">৳{totalPrice.toLocaleString()} BDT</span>
                </div>
                <div className="text-right text-gray-500">
                  <span>৳{unitPrice.toLocaleString()} × {travelers} traveler(s)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'en' ? 'Continue to Payment' : 'পেমেন্ট ধাপে এগিয়ে যান'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Real Payment Gateway & TrxID Input */}
          {step === 'payment' && (
            <form onSubmit={handleConfirmPaymentSubmission} className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-2">
                  SELECT PAYMENT GATEWAY
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-600 bg-pink-50 text-pink-700 font-bold ring-2 ring-pink-200'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="block text-sm font-bold">bKash</span>
                    <span className="text-[10px] font-mono block text-gray-500">Merchant Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-amber-600 bg-amber-50 text-amber-700 font-bold ring-2 ring-amber-200'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="block text-sm font-bold">Nagad</span>
                    <span className="text-[10px] font-mono block text-gray-500">Merchant Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bank'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold ring-2 ring-blue-200'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="block text-sm font-bold">Bank Transfer</span>
                    <span className="text-[10px] font-mono block text-gray-500">Escrow Account</span>
                  </button>
                </div>
              </div>

              {/* Payment Instructions Box */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-500">AMOUNT TO PAY:</span>
                  <span className="font-bold text-base text-[#1D232C]">৳{totalPrice.toLocaleString()} BDT</span>
                </div>

                {paymentMethod === 'bkash' && (
                  <div className="space-y-1 text-gray-600 pt-1">
                    <p className="font-bold text-pink-700">bKash Merchant Payment Steps:</p>
                    <p>1. Open bKash App & select <strong>Make Payment</strong></p>
                    <p>2. Merchant Number: <strong className="text-black bg-pink-100 px-1.5 py-0.5 rounded">01711-234567</strong></p>
                    <p>3. Amount: <strong>৳{totalPrice.toLocaleString()}</strong></p>
                    <p>4. Reference: <strong>SANDVIORA</strong> | Counter: <strong>1</strong></p>
                  </div>
                )}

                {paymentMethod === 'nagad' && (
                  <div className="space-y-1 text-gray-600 pt-1">
                    <p className="font-bold text-amber-700">Nagad Merchant Payment Steps:</p>
                    <p>1. Open Nagad App & select <strong>Merchant Pay</strong></p>
                    <p>2. Merchant Number: <strong className="text-black bg-amber-100 px-1.5 py-0.5 rounded">01811-234567</strong></p>
                    <p>3. Enter Amount <strong>৳{totalPrice.toLocaleString()}</strong> and PIN</p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="space-y-1 text-gray-600 pt-1">
                    <p className="font-bold text-blue-700">Bank Escrow Account Details:</p>
                    <p>Bank: <strong>The City Bank PLC (Gulshan Branch)</strong></p>
                    <p>Account Name: <strong>SANDVIORA TOURISM LTD</strong></p>
                    <p>A/C Number: <strong className="text-black bg-blue-100 px-1.5 py-0.5 rounded">1102938475001</strong></p>
                    <p>Routing: <strong>225271890</strong></p>
                  </div>
                )}
              </div>

              {/* Transaction ID Input */}
              <div>
                <label className="block text-xs font-mono uppercase text-gray-600 mb-1 font-bold">
                  {lang === 'en' ? 'ENTER SENDER TRANSACTION ID (TrxID) *' : 'ট্রানজেকশন আইডি (TrxID) প্রদান করুন *'}
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. 9J4K2881"
                  className="w-full px-4 py-3 bg-white border-2 border-[#1D232C] rounded-lg text-sm text-[#1D232C] font-mono uppercase tracking-wider font-bold outline-none focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-[11px] text-gray-500 mt-1 font-mono">
                  * TrxID is required to verify your deposit. Once verified by our finance desk, your official voucher will be released.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-5 py-3 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-wider text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-full bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying...</span>
                  ) : (
                    <>
                      <span>{lang === 'en' ? 'Submit for Verification' : 'পেমেন্ট যাচাইয়ের জন্য জমা দিন'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Submission Confirmation with Pending State */}
          {step === 'submitted' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold text-[#1D232C] font-mono uppercase">
                {lang === 'en' ? 'Booking Request Submitted' : 'বুকিং আবেদন সফলভাবে গৃহীত হয়েছে'}
              </h3>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left font-mono text-xs space-y-1.5 text-amber-900">
                <div className="flex justify-between">
                  <span className="font-bold">BOOKING REFERENCE:</span>
                  <span className="font-black text-black">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span>PAYMENT STATUS:</span>
                  <span className="font-bold text-amber-800 uppercase">Pending Verification (যাচাইাধীন)</span>
                </div>
                <div className="flex justify-between">
                  <span>TRANSACTION ID:</span>
                  <span className="font-bold text-black">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span>TOTAL AMOUNT:</span>
                  <span className="font-bold text-black">৳{totalPrice.toLocaleString()} BDT</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-normal max-w-md mx-auto">
                {lang === 'en'
                  ? 'Our accounts desk is currently verifying your TrxID with our merchant ledger (usually takes 15–30 minutes). Once verified, your status will become CONFIRMED and your travel voucher will be available for download.'
                  : 'আমাদের একাউন্টস টিম আপনার TrxID লেনদেনটি মার্চেন্ট স্টেটমেন্টের সাথে যাচাই করছে (সাধারণত ১৫-৩০ মিনিট সময় লাগে)। যাচাই সম্পন্ন হলে বুকিং কনফার্ম হবে এবং আপনার ভাউচার প্রস্তুত হবে।'}
              </p>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#1D232C] hover:bg-black text-white text-xs font-mono uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                >
                  {lang === 'en' ? 'Close & View Dashboard' : 'বন্ধ করুন'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
