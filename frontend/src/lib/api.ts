import { 
  SiteConfig, NavigationItem, FeatureBadge, SectionContent, 
  Destination, TourPackage, Testimonial, FAQ, ReportStats,
  CampaignBanner, ActionMatrixCard, SpotlightFeature 
} from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function fetchSiteInit(): Promise<{
  site_config: SiteConfig;
  campaign_banner?: CampaignBanner | null;
  action_matrix?: ActionMatrixCard[];
  spotlights?: SpotlightFeature[];
  navigation: NavigationItem[];
  feature_badges: FeatureBadge[];
  sections: Record<string, SectionContent>;
  testimonials: Testimonial[];
  faqs: FAQ[];
} | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/site-init/`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error('Site init fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend site-init offline or loading fallback:', err);
    return null;
  }
}

// Backward compatibility alias
export const fetchBootstrap = fetchSiteInit;

export async function fetchDestinations(category?: string, search?: string): Promise<Destination[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/api/v1/destinations/?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Destinations fetch failed');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('Destinations fallback:', err);
    return [];
  }
}

export async function fetchDestinationDetail(slug: string): Promise<Destination | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/destinations/${slug}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Destination detail fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('Destination detail fallback:', err);
    return null;
  }
}

export async function fetchTours(category?: string, search?: string): Promise<TourPackage[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/api/v1/tours/?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Tours fetch failed');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('Tours fallback:', err);
    return [];
  }
}

export async function fetchTourDetail(slug: string): Promise<TourPackage | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/tours/${slug}/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Tour detail fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('Tour detail fallback:', err);
    return null;
  }
}

export async function createBooking(data: {
  tour_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  travel_date: string;
  number_of_travelers: number;
  special_requests?: string;
  unit_price: number;
  payment_method?: string;
  transaction_id?: string;
  payment_status?: string;
}) {
  const res = await fetch(`${API_BASE}/api/v1/bookings/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tour: data.tour_id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      travel_date: data.travel_date,
      number_of_travelers: data.number_of_travelers,
      unit_price: data.unit_price,
      special_requests: data.special_requests || '',
      payment_method: data.payment_method || 'bKash Merchant',
      transaction_id: data.transaction_id || '',
      payment_status: data.payment_status || 'pending_verification',
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }
  return await res.json();
}

export async function submitInquiry(data: {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/api/v1/inquiries/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }
  return await res.json();
}

export async function fetchReportStats(): Promise<ReportStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/reports/stats/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Report stats fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('Report stats fallback:', err);
    return null;
  }
}

export function getPdfReportUrl(type: 'bookings' | 'revenue' | 'inventory') {
  return `${API_BASE}/api/v1/reports/pdf/${type}/`;
}

export function getVoucherPdfUrl(ref: string) {
  return `${API_BASE}/api/v1/bookings/${ref}/voucher-pdf/`;
}
