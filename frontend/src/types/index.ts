export interface SiteConfig {
  site_name: string;
  site_tagline_en: string;
  site_tagline_bn: string;
  logo_url: string;
  contact_phone: string;
  contact_email: string;
  office_address_en: string;
  office_address_bn: string;
  hero_badge_text: string;
  hero_headline_en: string;
  hero_headline_bn: string;
  hero_subheadline_en: string;
  hero_subheadline_bn: string;
  hero_cta_text_en: string;
  hero_cta_text_bn: string;
  hero_cta_url: string;
  hero_bg_image: string;
  hero_photographer_tag?: string;
  search_placeholder_en: string;
  search_placeholder_bn: string;
}

export interface CampaignBanner {
  id?: number;
  kicker_en: string;
  kicker_bn: string;
  title_en: string;
  title_bn: string;
  description_en: string;
  description_bn: string;
  bg_image: string;
  cta_text_en: string;
  cta_text_bn: string;
  cta_url: string;
  is_active?: boolean;
}

export interface ActionMatrixCard {
  id?: number;
  kicker_en: string;
  kicker_bn: string;
  title_en: string;
  title_bn: string;
  cta_text_en: string;
  cta_text_bn: string;
  target_url: string;
  image_url: string;
  bg_color: string;
  order: number;
  is_active?: boolean;
}

export interface SpotlightFeature {
  id?: number;
  feature_type: 'trending' | 'partner';
  kicker_en: string;
  kicker_bn: string;
  title_en: string;
  title_bn: string;
  description_en: string;
  description_bn: string;
  image_url: string;
  cta_text_en: string;
  cta_text_bn: string;
  cta_url: string;
  order: number;
  is_active?: boolean;
}

export interface NavigationItem {
  id: number;
  label_en: string;
  label_bn: string;
  url: string;
  icon_name: string;
  order: number;
  is_active: boolean;
  is_highlighted: boolean;
}

export interface FeatureBadge {
  id: number;
  title_en: string;
  title_bn: string;
  description_en: string;
  description_bn: string;
  icon_name: string;
  order: number;
}

export interface SectionContent {
  id: number;
  section_key: string;
  badge_en: string;
  badge_bn: string;
  title_en: string;
  title_bn: string;
  subtitle_en: string;
  subtitle_bn: string;
  cta_label_en: string;
  cta_label_bn: string;
  cta_url: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  author_avatar: string;
  rating: number;
  comment_en: string;
  comment_bn: string;
  destination_visited: string;
}

export interface FAQ {
  id: number;
  question_en: string;
  question_bn: string;
  answer_en: string;
  answer_bn: string;
  category: string;
}

export interface Destination {
  id: number;
  name_en: string;
  name_bn: string;
  slug: string;
  division_name: string;
  tagline_en: string;
  tagline_bn: string;
  category: string;
  category_display?: string;
  best_time_to_visit: string;
  ideal_duration: string;
  hero_image: string;
  overview_en?: string;
  overview_bn?: string;
  climate_info?: string;
  rating: number | string;
  review_count: number;
  is_featured: boolean;
  order: number;
}

export interface TourPackage {
  id: number;
  title_en: string;
  title_bn: string;
  slug: string;
  category_name?: string;
  destination_name?: string;
  tagline_en: string;
  tagline_bn: string;
  duration_days: number;
  duration_nights: number;
  price_bdt: number | string;
  discount_price_bdt?: number | string | null;
  max_group_size: number;
  difficulty_level: string;
  start_location: string;
  end_location: string;
  featured_image: string;
  badge_label_en: string;
  badge_label_bn: string;
  rating: number | string;
  review_count: number;
  is_featured: boolean;
  overview_en?: string;
  overview_bn?: string;
  itinerary_days?: {
    day_number: number;
    title_en: string;
    title_bn: string;
    description_en: string;
    description_bn: string;
    meals_included: string;
    accommodation_info: string;
  }[];
  inclusions?: {
    item_en: string;
    item_bn: string;
    is_included: boolean;
  }[];
}

export interface Booking {
  id?: number;
  booking_reference: string;
  tour: number | TourPackage;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  travel_date: string;
  number_of_travelers: number;
  unit_price: number;
  total_price: number;
  special_requests?: string;
  payment_status: 'pending_verification' | 'paid' | 'failed' | 'partially_paid' | 'refunded';
  booking_status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_method: string;
  transaction_id: string;
  created_at?: string;
}

export interface ReportStats {
  kpis: {
    total_bookings: number;
    confirmed_bookings: number;
    total_revenue_bdt: number;
    total_destinations: number;
    total_active_tours: number;
    pending_inquiries: number;
  };
  recent_bookings: {
    ref: string;
    customer: string;
    tour: string;
    amount: number;
    date: string;
    status: string;
    payment: string;
  }[];
  pdf_reports: {
    id: string;
    title: string;
    description: string;
    endpoint: string;
  }[];
}
