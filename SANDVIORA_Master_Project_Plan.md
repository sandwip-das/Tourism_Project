# SANDVIORA TOURISM LTD. — Master Project Plan

**Version:** 1.0  
**Date:** October 2026  
**Purpose:** Unified, actionable project blueprint combining the Implementation Blueprint and UI/UX Proposal into a single development-ready reference.  
**Scope:** Bangladesh-centric tourism information/discovery portal → CMS-driven multi-portal platform.

> **Core Principle:** Every icon, headline, text, button label, navigation item, footer column, homepage section — everything visible to the user — is managed from the backend/CMS. No hard-coded frontend content.

---

## TABLE OF CONTENTS

1. [Project Vision & Scope](#1-project-vision--scope)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Database Architecture](#4-database-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Frontend Architecture (UI/UX)](#6-frontend-architecture-uiux)
7. [CMS Architecture](#7-cms-architecture)
8. [Admin Panel Architecture](#8-admin-panel-architecture)
9. [Security Architecture](#9-security-architecture)
10. [Phase-wise Delivery Roadmap](#10-phase-wise-delivery-roadmap)
11. [Testing & Acceptance Criteria](#11-testing--acceptance-criteria)
12. [Operations & DevOps](#12-operations--devops)
13. [Design System Specification](#13-design-system-specification)
14. [API Contract Overview](#14-api-contract-overview)
15. [Deliverables Checklist](#15-deliverables-checklist)
16. [Key Design Cautions](#16-key-design-cautions)

---

## 1. Project Vision & Scope

### 1.1 Vision Statement

SANDVIORA TOURISM LTD. is a Bangladesh-centric tourism information, destination discovery, travel planning, and (phased) service marketplace platform. The platform is editorial-first, CMS-controlled, bilingual (Bangla + English), mobile-first, and designed to scale from a discovery portal into a full multi-portal ecosystem.

**Core principle:** Every piece of visible content — icons, headlines, navigation labels, footer text, homepage sections, CTAs, card content — is managed through the CMS backend. No content is hard-coded in the frontend.

### 1.2 What This Project Is NOT

- HRIS, payroll, or internal enterprise accounting (separate project)
- A pixel-for-pixel clone of any existing travel platform
- A static website with hard-coded content
- A microservices architecture (starts as modular monolith)

### 1.3 Scope Boundaries by Phase

| Phase | Scope |
|---|---|
| **Phase 0** | Requirements, design system, ERD, CMS section catalogue, wireframes |
| **Phase 1** | Consolidated Public discovery & travel portal (Lonely Planet style), CMS, geography, destinations, editorial content, search, SEO, media, unified single application |
| **Phase 2** | User accounts, wishlist, saved trips, itinerary planner, newsletter, feedback |
| **Phase 3** | Verified provider directory, packages, services, availability, booking, payment, affiliate, PDF reporting in admin panels |
| **Phase 4** | *(Deferred for later)* Multi-portal publishing, multi-domain distribution, CRM, AI-assisted discovery |

### 1.4 Key Goals

1. Reliable, bilingual (BN/EN) tourism information database for Bangladesh
2. Mobile-first, visually rich editorial travel UI — CMS-controlled without code changes (Lonely Planet-style consolidated travel experience)
3. Centralized RESTful API architecture designed to power the initial consolidated application and seamlessly distribute to future multi-portal channels
4. Comprehensive PDF Reporting System within all Admin Panels for operational, booking, financial, and engagement activities
5. Fast, accurate search and filter across destinations, experiences, and tours
6. User accounts: wishlist, saved trips, booking history, notifications
7. Partner/provider service and inventory management
8. Booking, commission, payment, settlement — audit-friendly
9. Role/attribute-based access control, review workflow, audit trail

---

## 2. Technology Stack

### 2.1 Backend

| Component | Technology | Notes |
|---|---|---|
| Runtime | Python 3.12+ | |
| Framework | Django 5.x | Modular monolith |
| API Layer | Django REST Framework (DRF) | Versioned /api/v1/ |
| Database (Prod) | PostgreSQL 16+ | NOT exposed to public internet |
| Database (Dev) | SQLite | Local dev only; not for production booking/concurrency |
| Auth | djangorestframework-simplejwt + Django sessions | Short-lived access token, refresh rotation |
| Password Hashing | Argon2id (via django[argon2]) | Never plaintext |
| Task Queue | Celery + Redis | Image processing, scheduled publishing, notifications, search indexing |
| Search | PostgreSQL FTS + pg_trgm | Phase 1; external search engine only if volume/relevance requires |
| Media Storage | AWS S3 / Cloudflare R2 | Never serve binary from app server |
| Cache | Redis | Public content responses; never personalized/financial |
| Email | SMTP / SendGrid / SES | Newsletter, verification, notifications |

### 2.2 Frontend (Public Website)

| Component | Technology | Notes |
|---|---|---|
| Framework | Next.js 15+ (App Router) | SSR/SSG for SEO |
| Language | TypeScript | Strict mode |
| Styling | Vanilla CSS + CSS Custom Properties | Design token system |
| Fonts | Noto Sans Bengali + Inter/Manrope | Test in prototype; not mandatory |
| State | React Server Components + React Query | Minimal client state |
| Animations | CSS transitions / Framer Motion | Respect prefers-reduced-motion |
| Maps | Mapbox GL / Leaflet | Only when coordinates are validated |
| Images | next/image | WebP variants, responsive srcset, focal point |

### 2.3 Admin Panel (Custom Super Admin)

| Component | Technology | Notes |
|---|---|---|
| Framework | Next.js 15+ (App Router) | Separate app or /platform-admin/* route group |
| Language | TypeScript | Strict mode |
| API | DRF endpoints (admin-scoped) | Server-enforced permissions |
| Auth | Session/JWT with MFA for superadmins | HttpOnly, Secure, SameSite cookies |

### 2.4 Infrastructure & DevOps

| Component | Technology |
|---|---|
| Container | Docker + Docker Compose (dev) |
| Orchestration | Docker Swarm / Kubernetes (prod) |
| CI/CD | GitHub Actions |
| CDN/WAF | Cloudflare |
| Monitoring | Sentry (errors) + Prometheus/Grafana (metrics) |
| Secrets | Environment variables / hosting secret manager |
| Backup | Automated PostgreSQL pg_dump + S3 off-site |

---

## 3. Project Structure

### 3.1 Repository Layout

```
sandviora/
├── backend/                        # Django application
│   ├── config/                     # Django settings, WSGI/ASGI, URL root
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   ├── staging.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── apps/                       # Domain modules (modular monolith)
│   │   ├── accounts/               # Users, profiles, roles, permissions, sessions
│   │   ├── geography/              # Division, district, upazila, place hierarchy
│   │   ├── media/                  # Asset upload, metadata, variants, rights
│   │   ├── destinations/           # Spots, categories, facilities, tags, relations
│   │   ├── editorial/              # Articles, guides, itineraries
│   │   ├── cms/                    # Pages, sections, menus, site settings, redirects
│   │   ├── workflow/               # Review, comments, revisions, audit
│   │   ├── search/                 # Synonyms, query normalization, indexing
│   │   ├── engagement/             # Wishlist, saved trips, newsletter
│   │   ├── analytics/              # Privacy-safe event logging
│   │   ├── notifications/          # Email/SMS/in-app delivery
│   │   ├── support/                # Contact submissions, correction reports
│   │   ├── providers/              # Phase 3: onboarding, verification, staff
│   │   ├── services/               # Phase 3: listings, pricing, inventory
│   │   ├── bookings/               # Phase 3: reservation lifecycle
│   │   ├── payments/               # Phase 3: gateway adapter, transactions, refunds
│   │   ├── affiliate/              # Phase 3: campaign, attribution, commission
│   │   └── settlements/            # Phase 3: payout, reconciliation
│   ├── api/
│   │   └── v1/                     # Versioned DRF routers and viewsets
│   │       ├── public/             # Public unauthenticated endpoints
│   │       ├── auth/               # Login, register, reset
│   │       ├── user/               # Authenticated user endpoints
│   │       ├── admin/              # CMS/admin panel endpoints
│   │       └── marketplace/        # Phase 3 endpoints
│   ├── core/                       # Shared base models, mixins, permissions, utils
│   ├── tasks/                      # Celery tasks (image processing, indexing, etc.)
│   ├── tests/                      # Test suite (unit, integration, API)
│   ├── fixtures/                   # Seed data (geography, locales, roles)
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── development.txt
│   │   └── production.txt
│   └── manage.py
│
├── frontend/                       # Next.js public website
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── (public)/           # Public route group
│   │   │   │   ├── page.tsx        # Homepage /
│   │   │   │   ├── destinations/   # /destinations, /destinations/[slug]
│   │   │   │   ├── divisions/      # /divisions/[slug]
│   │   │   │   ├── districts/      # /districts/[slug]
│   │   │   │   ├── stories/        # /stories/[slug]
│   │   │   │   ├── guides/         # /guides/[slug]
│   │   │   │   ├── itineraries/    # /itineraries/[slug]
│   │   │   │   ├── categories/     # /categories/[slug]
│   │   │   │   ├── collections/    # /collections/[slug]
│   │   │   │   ├── search/         # /search?q=...
│   │   │   │   └── [slug]/         # Static pages (about, contact, privacy, terms)
│   │   │   ├── (account)/          # Phase 2 authenticated user pages
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── layout/             # GlobalHeader, Footer, Breadcrumbs
│   │   │   ├── navigation/         # DesktopMegaMenu, MobileDrawer, LanguageSwitcher
│   │   │   ├── sections/           # One component per CMS section type
│   │   │   ├── cards/              # DestinationCard, EditorialCard, GuideCard, etc.
│   │   │   ├── ui/                 # Button, Input, FilterPanel, Pagination, etc.
│   │   │   ├── media/              # ImageGallery, AccessibleLightbox, LazyImage
│   │   │   ├── search/             # SearchOverlay, FilterChip, SortControl
│   │   │   ├── forms/              # NewsletterForm, ContactForm, ConsentNotice
│   │   │   └── feedback/           # EmptyState, ErrorState, SkeletonCard, Toast
│   │   ├── lib/
│   │   │   ├── api/                # API client, typed fetchers
│   │   │   ├── hooks/              # Custom React hooks
│   │   │   └── utils/              # Formatters, date, slug helpers
│   │   ├── styles/
│   │   │   ├── tokens.css          # Design tokens (CSS custom properties)
│   │   │   ├── typography.css      # Font loading, type scale
│   │   │   ├── reset.css           # CSS reset/normalize
│   │   │   ├── utilities.css       # Spacing, layout utilities
│   │   │   └── global.css          # Global styles
│   │   └── types/                  # TypeScript types matching API responses
│   ├── public/                     # Static assets (favicon, og-default.jpg)
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── admin-panel/                    # Custom Next.js Super Admin Panel
│   ├── src/
│   │   ├── app/
│   │   │   └── platform-admin/     # All admin routes
│   │   │       ├── page.tsx        # Dashboard
│   │   │       ├── users/
│   │   │       ├── roles/
│   │   │       ├── cms/
│   │   │       ├── geography/
│   │   │       ├── destinations/
│   │   │       ├── providers/
│   │   │       ├── bookings/
│   │   │       ├── payments/
│   │   │       ├── support/
│   │   │       ├── analytics/
│   │   │       ├── audit/
│   │   │       └── settings/
│   │   ├── components/
│   │   │   ├── layout/             # AdminSidebar, AdminHeader, Breadcrumbs
│   │   │   ├── tables/             # DataTable, BulkActions, SavedFilters
│   │   │   ├── forms/              # AdminForm, FieldGroup, RichTextEditor
│   │   │   └── ui/                 # AdminButton, Badge, Modal, ConfirmDialog
│   │   ├── lib/
│   │   └── types/
│   └── package.json
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── Dockerfile.admin
│   └── nginx/nginx.conf
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
└── docs/
    ├── api/
    ├── erd/
    ├── design/
    └── runbooks/
```

---

## 4. Database Architecture

### 4.1 Design Principles

- Every table has a UUID primary key
- Foreign keys enforced at database level (not just application layer)
- Atomic columns — no comma-separated IDs, no repeating groups
- Translations in separate `_translation` tables (bilingual: BN + EN)
- Many-to-many via junction tables with unique constraints
- 3NF compliance: no partial/transitive dependencies
- `NUMERIC` for currency, timezone-aware `TIMESTAMPTZ` for all timestamps
- JSON/JSONB only for genuinely variable presentation config — never for core relational facts
- Soft delete policy defined per entity; financial/audit records are immutable
- PostgreSQL is production target; SQLite for local dev only

### 4.2 Common Column Conventions

Every entity table includes:
```sql
id           UUID         PRIMARY KEY DEFAULT gen_random_uuid()
created_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
created_by   UUID         NULL REFERENCES accounts_user(id)
updated_by   UUID         NULL REFERENCES accounts_user(id)
```

### 4.3 Schema Map by Module

#### MODULE 1: Accounts & Access Control

```
accounts_user
  id, email, phone_e164, password_hash,
  is_email_verified, is_phone_verified, is_active,
  is_staff, is_superuser, last_login_at

accounts_profile                       (1:1 with accounts_user)
  user_id PK/FK, display_name, avatar_media_id FK,
  preferred_locale FK cms_locale, home_district_id FK, bio

accounts_role
  id, code UNIQUE, name, description, is_system_role

accounts_permission
  id, code UNIQUE, module, description

accounts_user_role                     (M:M junction)
  user_id FK, role_id FK, assigned_by FK, assigned_at
  PK(user_id, role_id)

accounts_role_permission               (M:M junction)
  role_id FK, permission_id FK
  PK(role_id, permission_id)

accounts_user_scope                    (ABAC scope constraints)
  id, user_id FK, scope_type, scope_id, granted_by FK

accounts_login_event                   (security audit)
  id, user_id FK NULL, event_type, ip_address INET,
  user_agent, success, occurred_at, metadata JSONB

accounts_password_reset
  id, user_id FK, token_hash UNIQUE, expires_at, used_at
```

#### MODULE 2: Locale & Geography

```
cms_locale
  code VARCHAR(5) PK, name, is_enabled, is_default

geo_division
  id, code UNIQUE

geo_division_translation
  division_id FK, locale_code FK
  name, slug
  PK(division_id, locale_code), UNIQUE(locale_code, slug)

geo_district
  id, division_id FK NOT NULL, official_code UNIQUE

geo_district_translation
  district_id FK, locale_code FK, name, slug
  PK(district_id, locale_code), UNIQUE(locale_code, slug)

geo_upazila
  id, district_id FK NOT NULL, official_code UNIQUE

geo_upazila_translation
  upazila_id FK, locale_code FK, name, slug
  PK(upazila_id, locale_code), UNIQUE(locale_code, slug)

geo_place  (optional locality level; lat/lng validated)
  id, upazila_id FK NULL, district_id FK NULL,
  latitude NUMERIC(9,6), longitude NUMERIC(9,6)
```

#### MODULE 3: Media Library

```
media_asset
  id, storage_key UNIQUE, original_filename, mime_type,
  byte_size, width, height,
  alt_text_default, copyright_holder, source_url,
  licence_code, rights_status (owned/licensed/permission_pending/restricted),
  rights_note, focal_x NUMERIC(5,4), focal_y NUMERIC(5,4),
  dominant_color CHAR(7), uploaded_by FK, is_active

media_asset_translation
  media_id FK, locale_code FK, alt_text, caption
  PK(media_id, locale_code)

media_variant
  id, asset_id FK
  variant_key (original|hero_wide|card_landscape|portrait|thumbnail|mobile_hero|social)
  storage_key UNIQUE, width_px, height_px, format, file_size_bytes
  UNIQUE(asset_id, variant_key, format)
```

#### MODULE 4: Destination Taxonomy

```
destination
  id, district_id FK NOT NULL, upazila_id FK NULL,
  place_id FK NULL,
  latitude NUMERIC(9,6), longitude NUMERIC(9,6),
  status VARCHAR(24), verification_status VARCHAR(24),
  published_at, created_by FK, updated_by FK

destination_translation
  destination_id FK, locale_code FK
  name, slug UNIQUE(locale_code,slug), short_description,
  body_content, how_to_reach, best_time_to_visit,
  visitor_information, safety_notes, seo_title, seo_description
  PK(destination_id, locale_code)

destination_visit_info            (separate lifecycle for visit facts)
  destination_id PK/FK,
  best_month_start SMALLINT, best_month_end SMALLINT,
  typical_visit_duration_minutes, accessibility_notes,
  safety_notes, last_verified_at, verified_by FK

destination_category
  id, code UNIQUE, is_active

destination_category_translation
  category_id FK, locale_code FK, name, slug
  PK(category_id, locale_code)

destination_category_link         (M:M junction)
  destination_id FK, category_id FK
  PK(destination_id, category_id)

taxonomy_tag
  id, code UNIQUE,
  tag_type (destination_type|landscape|audience|season|trip_style),
  is_active

taxonomy_tag_translation
  tag_id FK, locale_code FK, name, slug
  PK(tag_id, locale_code)

destination_tag                   (M:M junction)
  destination_id FK, tag_id FK
  PK(destination_id, tag_id)

destination_media
  destination_id FK, media_id FK, usage_type,
  sort_order, is_cover BOOLEAN
  PK(destination_id, media_id, usage_type)

destination_facility
  id, code UNIQUE

destination_facility_translation
  facility_id FK, locale_code FK, name
  PK(facility_id, locale_code)

destination_facility_link
  destination_id FK, facility_id FK, availability_note
  PK(destination_id, facility_id)

destination_related
  destination_id FK, related_destination_id FK,
  relation_type, sort_order
  PK(destination_id, related_destination_id, relation_type)
  CHECK destination != related_destination
```

#### MODULE 5: Editorial Content

```
editorial_content
  id, content_type (article|guide|itinerary|campaign),
  status, author_id FK, reviewer_id FK NULL,
  published_at, scheduled_at

editorial_translation
  content_id FK, locale_code FK
  title, slug UNIQUE(locale_code,slug), excerpt,
  body_content, seo_title, seo_description
  PK(content_id, locale_code)

editorial_destination_link
  content_id FK, destination_id FK, link_role, sort_order
  PK(content_id, destination_id, link_role)

editorial_media
  content_id FK, media_id FK, usage_type, sort_order
  PK(content_id, media_id, usage_type)

editorial_tag
  content_id FK, tag_id FK
  PK(content_id, tag_id)

itinerary
  id, editorial_content_id UNIQUE FK,
  duration_days SMALLINT CHECK > 0,
  difficulty

itinerary_stop
  id, itinerary_id FK, destination_id FK,
  day_number SMALLINT, stop_order SMALLINT,
  duration_minutes, travel_note
  UNIQUE(itinerary_id, day_number, stop_order)
```

#### MODULE 6: CMS — Pages, Sections, Menus, Settings

```
cms_page
  id, page_type, status,
  created_by FK, updated_by FK, published_at

cms_page_translation
  page_id FK, locale_code FK
  title, slug UNIQUE(locale_code,slug),
  seo_title, seo_description
  PK(page_id, locale_code)

cms_page_section
  id, page_id FK, section_type (allowlisted registry value),
  sort_order, is_enabled, layout_variant, theme_variant,
  config JSONB (schema-validated visual options ONLY),
  starts_at, ends_at
  created_by FK, updated_by FK
  INDEX(page_id, is_enabled, sort_order)

  section_type allowlist:
    hero_feature | search_and_discovery | browse_by_division |
    featured_destinations_grid | destination_carousel |
    editorial_story_feature | travel_guide_list | itinerary_spotlight |
    seasonal_collection | category_explorer | nearby_or_map_discovery |
    provider_service_spotlight | newsletter_signup | custom_cta

cms_section_translation
  section_id FK, locale_code FK
  heading, subheading, cta_label, cta_url
  PK(section_id, locale_code)

cms_section_content_link          (type-specific FKs, not polymorphic)
  id, section_id FK NOT NULL,
  destination_id FK NULL,
  editorial_content_id FK NULL,
  itinerary_id FK NULL,
  service_id FK NULL (Phase 3),
  sort_order NOT NULL
  CHECK: exactly one target FK is non-null
  INDEX(section_id, sort_order)

cms_menu
  id, menu_code UNIQUE, is_active

cms_menu_item
  id, menu_id FK, parent_item_id FK NULL (self-ref),
  sort_order, link_type, internal_url, external_url, is_enabled
  INDEX(menu_id, parent_item_id, sort_order)

cms_menu_item_translation
  menu_item_id FK, locale_code FK, label, aria_label
  PK(menu_item_id, locale_code)

cms_site_setting
  id, setting_key UNIQUE, setting_type, is_public,
  updated_by FK, updated_at
  NOTE: NO secrets stored here

cms_site_setting_translation
  setting_id FK, locale_code FK, text_value
  PK(setting_id, locale_code)

cms_redirect
  id, locale_code FK, source_path, target_path,
  http_status (301|302|307|308), is_active, created_by
  UNIQUE(locale_code, source_path)
  INDEX(is_active, source_path)
```

#### MODULE 7: Review Workflow & Versioning

```
workflow_submission
  id, entity_type, entity_id,
  submitted_by FK, assigned_reviewer FK NULL,
  status, submitted_at, resolved_at

workflow_comment
  id, submission_id FK, author_id FK,
  comment_text, visibility, created_at

workflow_event
  id, submission_id FK, actor_id FK,
  from_status NULL, to_status, event_note, created_at

content_revision                  (immutable snapshot history)
  id, entity_type, entity_id,
  revision_number, snapshot JSONB NOT NULL,
  created_by FK, created_at
  UNIQUE(entity_type, entity_id, revision_number)
```

#### MODULE 8: Search Support

```
search_synonym
  id, locale_code FK,
  term, normalized_term, synonym_term, normalized_synonym,
  is_active, created_by FK
  INDEX(locale_code, normalized_term)

search_query_log                  (privacy-limited; retention-policy governed)
  id, locale_code FK,
  query_text, normalized_query, result_count,
  clicked_destination_id FK NULL, clicked_editorial_id FK NULL,
  session_hash CHAR(64) NULL, created_at
  INDEX(created_at), INDEX(locale_code, normalized_query, created_at)
```

#### MODULE 9: User Engagement (Phase 2)

```
user_wishlist
  id, user_id FK, name, created_at

wishlist_item
  id, wishlist_id FK, target_type, target_id, created_at
  UNIQUE(wishlist_id, target_type, target_id)

saved_trip
  id, user_id FK, name, start_date, end_date,
  visibility, created_at, updated_at

saved_trip_stop
  id, saved_trip_id FK, destination_id FK,
  visit_date, sort_order, user_note
  UNIQUE(saved_trip_id, sort_order)

newsletter_subscription
  id, email UNIQUE (normalized), locale_code FK,
  status, consent_at, confirmed_at, unsubscribed_at,
  confirmation_token_hash

newsletter_event
  subscription_id FK, event_type, timestamp, provider_reference

contact_submission
  id, name, email, topic, message,
  status, assigned_to FK NULL,
  created_at, resolved_at

content_correction_report
  id, destination_id FK NULL, editorial_content_id FK NULL,
  reporter_email, report_type, message, status,
  assigned_to FK NULL, created_at, resolved_at
  CHECK: exactly one target FK non-null
```

#### MODULE 10: Analytics (Privacy-Safe)

```
analytics_event
  id, anonymous_id UUID NULL, user_id FK NULL,
  event_name, entity_type NULL, entity_id NULL,
  session_id NULL, occurred_at, consent_state,
  properties JSONB NULL
  NOTE: no passwords, payment credentials, or sensitive form data
```

#### MODULE 11: Provider & Marketplace (Phase 3)

```
provider
  id, legal_name, display_name, provider_type,
  verification_status, status, primary_contact_name,
  contact_email, contact_phone

provider_user
  provider_id FK, user_id FK, provider_role, is_active, assigned_at
  PK(provider_id, user_id)

provider_document
  id, provider_id FK, media_id FK,
  document_type, verification_status, expires_at, reviewed_by FK

provider_contract
  id, provider_id FK, contract_reference UNIQUE,
  starts_on, ends_on, commission_plan_id FK NULL, status, approved_by FK

provider_integration
  id, provider_id FK, integration_type, base_endpoint,
  credential_reference (NO plaintext secrets), sync_mode,
  last_sync_at, status

service
  id, provider_id FK, service_type, district_id FK NULL,
  status, verification_status

service_translation
  service_id FK, locale_code FK, name, slug, description, terms
  PK(service_id, locale_code), UNIQUE(locale_code, slug)

service_media
  service_id FK, media_id FK, sort_order, is_cover
  PK(service_id, media_id)

service_price
  id, service_id FK, price_type, amount NUMERIC(12,2) CHECK >= 0,
  currency CHAR(3), valid_from, valid_to NULL, is_active
  INDEX(service_id, is_active, valid_from, valid_to)

inventory_unit
  id, service_id FK, unit_code, unit_type, capacity, is_active
  UNIQUE(service_id, unit_code)

inventory_availability
  id, inventory_unit_id FK, starts_at, ends_at,
  total_quantity, held_quantity, booked_quantity, updated_at
  UNIQUE(inventory_unit_id, starts_at, ends_at)
  NOTE: availability changes require transactional locking
```

#### MODULE 12: Booking (Phase 3)

```
booking
  id, booking_reference UNIQUE, customer_id FK,
  status, currency CHAR(3),
  subtotal, discount_total, tax_total, grand_total NUMERIC(12,2),
  customer_note, created_at, updated_at, confirmed_at, cancelled_at

booking_item
  id, booking_id FK, service_id FK, provider_id FK,
  service_name_snapshot, unit_price, quantity CHECK > 0,
  line_total, service_date, starts_at, ends_at,
  provider_confirmation_code, status

booking_status_event              (immutable status history)
  id, booking_id FK, from_status NULL, to_status,
  actor_id FK NULL, reason, created_at

booking_guest
  id, booking_item_id FK, guest_type,
  display_name, age_band
  NOTE: collect ONLY necessary personal data
```

#### MODULE 13: Payments & Settlements (Phase 3)

```
payment
  id, booking_id FK, provider_gateway, gateway_reference,
  idempotency_key UNIQUE, amount NUMERIC(12,2), currency,
  status, created_at, completed_at
  NOTE: NEVER store card PAN/CVV

payment_event
  id, payment_id FK, event_type, gateway_event_id UNIQUE,
  payload_hash, received_at, processed_at

refund
  id, payment_id FK, amount NUMERIC CHECK > 0,
  reason, status, requested_by FK, approved_by FK NULL
  NOTE: maker-checker separation

affiliate_partner
  id, name, status, default_attribution_days

affiliate_campaign
  id, partner_id FK, campaign_name, tracking_code UNIQUE,
  target_url, starts_at, ends_at, status

affiliate_click
  id, campaign_id FK, anonymous_id NULL, user_id FK NULL,
  clicked_at, referrer_host, attribution_id UNIQUE
  NOTE: do not retain full IP beyond policy

commission_plan
  id, name, calculation_type, rate NUMERIC(7,4),
  fixed_amount, currency, starts_at, ends_at, status

commission_entry                  (immutable; adjustments via separate entries)
  id, booking_item_id FK NULL, affiliate_click_id FK NULL,
  provider_id FK NULL, commission_plan_id FK,
  basis_amount, commission_amount, currency, status

provider_payout
  id, provider_id FK, period_start, period_end, currency,
  gross_amount, commission_amount, refund_adjustment,
  net_amount NUMERIC(12,2), status, approved_by FK NULL, paid_at

payout_line
  id, payout_id FK, booking_item_id FK NULL,
  commission_entry_id FK NULL, line_type, amount, currency

audit_event                       (append-only; tamper-resistant)
  id, actor_id FK NULL, action, object_type, object_id NULL,
  occurred_at, request_id, ip_address INET,
  change_summary JSONB NULL
  NOTE: redact secrets and PII
```

#### MODULE 14: CRM & Support (Phase 4)

```
crm_case
  id, case_reference UNIQUE, customer_id FK NULL,
  booking_id FK NULL, case_type, priority, status,
  assigned_to FK NULL, subject, created_at, resolved_at

crm_case_message
  id, case_id FK, author_id FK NULL,
  message, is_internal_note, created_at

crm_case_event
  id, case_id FK, actor_id FK NULL,
  from_status NULL, to_status, created_at
```

#### MODULE 15: Admin Panel Specific

```
admin_audit_event                 (append-only; never updateable by normal roles)
  id UUID, actor_id FK, action_code, target_type, target_id,
  timestamp, request_id, reason, safe_before_after_diff,
  outcome, metadata
  NOTE: redacts credentials, payment secrets, unnecessary PII

admin_approval_request            (maker-checker for high-risk actions)
  id, requester FK, action_type, target_reference,
  proposed_change, reason, status,
  requested_at, reviewed_at, reviewer FK NULL,
  decision_reason, idempotency_reference

platform_setting                  (typed; no secrets here)
  setting_key UNIQUE, typed_value, scope,
  sensitivity_class, updated_by FK, approval_reference
```

### 4.4 Index Strategy

| Pattern | Index Type | Tables |
|---|---|---|
| `(locale_code, slug)` UNIQUE | Per translation table | All `_translation` tables |
| `(status, published_at DESC)` | B-tree | editorial_content, destination |
| `(page_id, is_enabled, sort_order)` | B-tree | cms_page_section |
| `(district_id, status)` | B-tree | destination |
| `(section_id, sort_order)` | B-tree | cms_section_content_link |
| `(created_at DESC)` | B-tree | Recent list queries |
| `normalized_term` | Trigram GIN | search_synonym |
| `search_vector` | GIN | Any FTS tsvector column |
| All FK columns used in joins | B-tree | All tables |

> Do NOT index every column. Measure with `EXPLAIN (ANALYZE, BUFFERS)` on representative data.

---

## 5. Backend Architecture

### 5.1 Logical Layers

```
1. API / Transport Layer
   Request parsing, authentication, throttling,
   serialization, versioned endpoints (/api/v1/)

2. Application / Service Layer
   Use cases: publish_content, submit_review,
   create_booking, process_refund, settle_payout

3. Domain Layer
   Business rules, status transitions,
   price/commission calculations, availability invariants

4. Persistence Layer
   Django ORM, transactions, repositories, constraints

5. Async Jobs (Celery + Redis)
   Image variants, scheduled publishing, notifications,
   search indexing, provider sync, reports

6. Integration Adapters
   Payment gateway, email/SMS, maps, affiliate partner APIs

7. Observability
   Structured logs, metrics, traces, errors, audit events
```

### 5.2 API Endpoint Groups

**Public (No Auth)**
```
GET  /api/v1/site-config/?locale=bn
GET  /api/v1/navigation/{menu_code}/?locale=bn
GET  /api/v1/pages/{slug}/?locale=bn
GET  /api/v1/destinations/?district=...&category=...&locale=bn
GET  /api/v1/destinations/{slug}/?locale=bn
GET  /api/v1/geography/divisions/
GET  /api/v1/geography/districts/?division=...
GET  /api/v1/geography/upazilas/?district=...
GET  /api/v1/search/?q=...&locale=bn&type=destination
GET  /api/v1/editorial/?type=article&locale=bn
GET  /api/v1/editorial/{slug}/?locale=bn
GET  /api/v1/collections/{slug}/
POST /api/v1/newsletter/subscribe/
POST /api/v1/contact/submit/
```

**Authenticated User (Phase 2)**
```
POST /api/v1/auth/register/
POST /api/v1/auth/login/
POST /api/v1/auth/logout/
POST /api/v1/auth/password-reset/
POST /api/v1/auth/token/refresh/
GET|PATCH /api/v1/me/
GET|POST|DELETE /api/v1/me/wishlists/
GET|POST /api/v1/me/trips/
GET /api/v1/me/notifications/
```

**CMS / Admin (Permission-Protected)**
```
/api/v1/admin/content/
/api/v1/admin/destinations/
/api/v1/admin/media/
/api/v1/admin/pages/
/api/v1/admin/sections/
/api/v1/admin/menus/
/api/v1/admin/settings/
/api/v1/admin/users/
/api/v1/admin/roles/
/api/v1/admin/workflow/
/api/v1/admin/analytics/
/api/v1/admin/audit/
```

**Marketplace (Phase 3)**
```
/api/v1/providers/
/api/v1/provider/services/
/api/v1/provider/inventory/
/api/v1/bookings/
/api/v1/payments/
/api/v1/refunds/
/api/v1/provider/payouts/
```

### 5.3 Content Workflow (State Machine)

```
DRAFT
  → SUBMITTED → IN_REVIEW
                  → CHANGES_REQUESTED → (Author revises) → SUBMITTED
                  → APPROVED
                      → SCHEDULED → PUBLISHED
                      → PUBLISHED
                                  → ARCHIVED
```

Rules:
- Public API serves ONLY published content with active schedule window
- Status changes recorded in `workflow_event` (immutable)
- Cache invalidated + search index refreshed on publish/unpublish
- Slug changes automatically create `cms_redirect` records

---

## 6. Frontend Architecture (UI/UX)

### 6.1 Design Philosophy

"Editorial Beauty + Practical Travel Utility"

Users must be able to simultaneously:
1. **Discover** — new destinations, experiences, seasonal attractions, travel stories
2. **Plan** — location, transport, duration, season, preparation
3. **Continue** — naturally progress to related destination, itinerary, guide, or booking

Every visual section has a specific purpose. Not just beautiful images.

### 6.2 Design Token System (CSS Custom Properties)

```css
:root {
  /* Brand Colors */
  --color-primary-dark:    hsl(210, 30%, 12%);
  --color-primary-brand:   hsl(155, 45%, 28%);
  --color-accent:          hsl(200, 55%, 42%);
  --color-highlight:       hsl(25, 75%, 55%);

  /* Surfaces */
  --color-surface-warm:    hsl(40, 20%, 97%);
  --color-surface-white:   hsl(0, 0%, 100%);
  --color-footer-dark:     hsl(210, 25%, 10%);

  /* Text */
  --color-text-primary:    hsl(210, 15%, 15%);
  --color-text-secondary:  hsl(210, 10%, 45%);
  --color-text-on-dark:    hsl(0, 0%, 98%);

  /* Status */
  --color-success: hsl(140, 50%, 35%);
  --color-warning: hsl(38, 85%, 45%);
  --color-error:   hsl(0, 65%, 45%);
  --color-info:    hsl(210, 70%, 45%);

  /* Spacing Scale (4px base) */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-6: 1.5rem;   --space-8: 2rem;
  --space-12: 3rem;    --space-16: 4rem;    --space-24: 6rem;

  /* Typography Scale */
  --text-sm: 0.875rem; --text-base: 1rem;   --text-lg: 1.125rem;
  --text-xl: 1.25rem;  --text-2xl: 1.5rem;  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem; --text-5xl: 3rem;    --text-6xl: 3.75rem;

  /* Border Radius */
  --radius-sm: 4px;  --radius-md: 8px;
  --radius-lg: 12px; --radius-full: 9999px;

  /* Motion */
  --duration-micro:  120ms;  --duration-short:  180ms;
  --duration-panel:  220ms;  --duration-large:  300ms;
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);

  /* Content Width */
  --content-max: 1200px;
  --article-max: 680px;
}
```

### 6.3 Typography

| Role | Font | Weight | Size Range |
|---|---|---|---|
| Display (BN) | Noto Sans Bengali | 700–900 | 3rem–6rem |
| Display (EN) | Inter / Manrope | 700–800 | 3rem–6rem |
| Page heading | Same | 600–700 | 2rem–3rem |
| Section heading | Same | 600 | 1.5rem–2rem |
| Body (BN) | Noto Sans Bengali | 400 | 1rem |
| Body (EN) | Inter | 400 | 1rem |
| Caption / Meta | Inter | 400 | 0.75rem–0.875rem |

### 6.4 Homepage Section Architecture (CMS-driven)

Every homepage section is driven by `cms_page_section`. Frontend renders each `section_type` using its matching React component. Content editors control everything below from the CMS.

| Section Type | Component | Configurable by Editor |
|---|---|---|
| `hero_feature` | `<HeroFeature>` | heading, subheading, CTA, media, focal_point, theme |
| `search_and_discovery` | `<SearchDiscovery>` | heading, placeholder, quick_filter_tags |
| `browse_by_division` | `<BrowseByDivision>` | heading, division selection, layout |
| `featured_destinations_grid` | `<DestinationGrid>` | heading, destinations[], card_count, layout |
| `destination_carousel` | `<DestinationCarousel>` | heading, destinations[], CTA |
| `editorial_story_feature` | `<EditorialFeature>` | editorial_content_id, image position, theme |
| `travel_guide_list` | `<GuideList>` | heading, guides[], layout |
| `itinerary_spotlight` | `<ItinerarySpotlight>` | heading, itinerary_id, CTA |
| `seasonal_collection` | `<SeasonalCollection>` | heading, collection_id, start/end dates |
| `category_explorer` | `<CategoryExplorer>` | heading, categories[], layout |
| `newsletter_signup` | `<NewsletterForm>` | heading, subheading, consent text, button label |
| `custom_cta` | `<CustomCTA>` | heading, body, CTA, theme, media |
| `provider_service_spotlight` | `<ServiceSpotlight>` | Phase 3 only |

> The `config JSONB` field contains ONLY presentation options (card_count, layout_variant, theme_token). NEVER duplicate destination title, slug, description, or price into section config.

### 6.5 Page Templates

**Homepage (`/`)**
```
GlobalHeader (logo, nav, search, language, account)
  ↓
CMS Section Renderer (renders each section by section_type)
  ↓
GlobalFooter (from cms_menu footer groups + cms_site_setting)
```

**Destination Listing (`/destinations`)**
```
Breadcrumb → PageTitle → SearchFilter →
ResultCount + ActiveFilterChips →
DestinationGrid → Pagination → EmptyState
```

**Destination Detail (`/destinations/[slug]`)**
```
Breadcrumb (Home → Division → District → Destination)
DestinationHero (gallery with AccessibleLightbox)
DestinationIntro (name, location, categories, verified date)
QuickFacts (verified facts only: best season, visit duration)
PrimaryActions (Map | Itinerary | Save | Share | Report)
Overview (body_content from destination_translation)
PlanYourVisit (access, entry fee if verified, amenities, safety)
MapPanel (only when coordinates validated; text fallback)
Gallery (keyboard lightbox, captions, credits)
RelatedContent (guides, stories, nearby)
LastVerified (last_verified_at + editor note)
ReportCorrectionForm
```

**Article Detail (`/stories/[slug]`)**
```
ArticleHero (cover image with caption/credit)
ArticleMeta (title, author, published, updated, reading_time)
TableOfContents (collapsible on mobile)
ArticleBody (structured blocks: no raw HTML)
RelatedDestinations → RelatedArticles → ShareControl
```

**Search Results (`/search?q=...`)**
```
SearchHeader (query, result_count) →
ActiveFilters → TypeFilter → SortControl → FilterPanel →
ResultsList → Pagination →
EmptyState (with suggestions: clear filters, broader search)
```

### 6.6 Reusable Component Inventory

**Layout**
- `GlobalHeader`, `GlobalFooter`, `Breadcrumbs`

**Navigation**
- `DesktopMegaMenu` — hover+click+keyboard; backdrop; Escape/outside-click close
- `MobileNavigationDrawer` — hamburger; accordion nested items; back navigation
- `SearchOverlay` — keyboard suggestions with arrow/Enter/Escape
- `LanguageSwitcher`

**Section Components** — one per CMS section type (see 6.4)

**Cards** (with variants: featured, standard, compact, horizontal, editorial)
- `DestinationCard`, `EditorialCard`, `GuideCard`, `ItineraryCard`, `CollectionCard`

**UI Primitives**
- `Button` (all states), `Input` (with persistent label), `FilterPanel`, `FilterChip`
- `SortControl`, `Pagination`, `MapPanel`, `HorizontalCarousel`
- `ImageGallery`, `AccessibleLightbox`, `SaveButton`, `ShareControl`

**Feedback**
- `EmptyState`, `ErrorState`, `SkeletonCard`, `Toast/InlineNotice`

**Forms**
- `NewsletterForm`, `ContactForm`, `ConsentNotice`, `ReportCorrectionForm`

### 6.7 Interaction States (Mandatory for all components)

| Component | Required States |
|---|---|
| Button/link | default, hover, focus, pressed, disabled, loading |
| Search | idle, typing, suggestions, submitting, results, no-results, error |
| Filter | closed, open, selected, applied, cleared, result-updating |
| Form | empty, invalid, submitting, success, server-error, duplicate |
| Content card | default, hover/focus, missing-image-fallback |
| Carousel | default, prev/next disabled at boundaries, reduced-motion |
| Newsletter | input-error, submitting, accepted, confirmation-pending, already-subscribed |
| Map | loading, loaded, unavailable, provider-error, text-fallback |

### 6.8 Motion Specification

| Interaction | Duration | Notes |
|---|---|---|
| Desktop mega-menu | 180–220ms | fade + slide + backdrop; click/keyboard/Escape |
| Card hover image scale | 120ms | ~1.02 scale; no essential info hidden on hover |
| Carousel scroll | 180ms | disable arrows at boundary; instant on reduced-motion |
| Filter drawer | 200ms | focus trap; return focus to trigger on close |
| Image lightbox | 220ms | keyboard close; prev/next; focus managed |
| Page scroll reveals | 300ms | optional; respect prefers-reduced-motion |

**RULE:** No auto-rotating carousels. Static hero recommended. Every animation must have a `prefers-reduced-motion: reduce` variant.

### 6.9 Responsive Behavior

| Layout Element | Mobile ≤767px | Tablet 768–1023px | Desktop ≥1024px |
|---|---|---|---|
| Navigation | Hamburger → Drawer | Hamburger → Drawer | Full mega-menu |
| Hero | Stacked image + text | Large with overlay | Full dramatic |
| Destination grid | 1 column | 2 columns | 3–4 columns |
| Filter panel | Bottom sheet | Sidebar or bottom sheet | Sidebar |
| Footer | Accordion columns | 2 columns | 4 columns |
| Article body | Full width | Constrained | ~680px reading width |

**Test viewports:** 360–390px | 480px | 768px | 1024px | 1366px | 1440px | 1920px+

### 6.10 Accessibility (WCAG 2.2 AA)

- Meaningful alt text on all informative images; empty alt on decorative
- Single H1 per page; logical section heading hierarchy
- All interactive components keyboard operable (mega-menu, filter, lightbox, carousel)
- Visible focus indicators; not obscured by sticky elements
- Visible form labels (NOT placeholder-as-label); required field marking; error guidance
- Text and UI control contrast verified; image-overlay text tested per crop
- Color not used as sole indicator of state; icon/text used alongside color
- Correct `lang` attributes for BN and EN content
- Touch targets ~44×44 CSS px with adequate gap
- Screen reader: suggestion count announced; lightbox described; carousel state

---

## 7. CMS Architecture

### 7.1 What Editors Can Control (Zero Code Changes)

- Homepage section type, order, visibility, publication schedule
- Each section's heading, subheading, CTA label, CTA URL (per locale)
- Which destinations/articles/itineraries appear in each section
- Navigation menu structure, labels, links (per locale)
- Footer columns, social links, contact details, legal links
- Site brand name, logo, default locale
- All page titles, slugs, SEO metadata (per locale)
- Article/guide/itinerary body content (structured blocks)
- Destination content, gallery, practical information
- Media library: upload, alt text, credit/license, focal point
- Redirect rules and search synonyms

### 7.2 Content Publishing Workflow

```
1. Author creates draft
2. Validation: title, slug uniqueness, media license, alt text, category, SEO completeness
3. Author submits → workflow_submission created
4. Reviewer sees queue; adds comments; decides
5. "Changes Requested" → returned to Author
6. Resubmission → new workflow_event + content_revision snapshot
7. Publisher approves / schedules
8. Public API: only published content within active schedule window
9. Update/unpublish → cache invalidated + search index refreshed
10. Every action recorded: actor, time, action, entity, outcome (audit_event)
```

### 7.3 Approved Content Block Types

Editors compose article/guide body from:
`paragraph` | `heading` (h2/h3 presets only) | `image_figure` | `quote` | `list` | `callout` | `map_link` | `faq` | `related_destinations` | `cta_block`

Editors **cannot** enter arbitrary HTML or `<script>` tags.

### 7.4 Media Library Rules

- Upload → async Celery job generates all variants
- License/rights status REQUIRED before content can be published
- Alt text REQUIRED (per locale) before content published
- Focal point (0–1 normalized) stored for crop direction
- "Used in" tracking prevents orphaned or misused assets
- No deployment of rights-unknown images

---

## 8. Admin Panel Architecture

### 8.1 Two Distinct Interfaces (Strict Decoupling)

| Interface | Path | Audience | Accessibility |
|---|---|---|---|
| **Custom Enterprise Admin Panel** | `/platform-admin` | Super Admin, Central Admin, Content Moderator, Supervisor, Accounts/HRM | Dedicated custom two-div UI. Completely autonomous control center. |
| **Django Admin** | `/django-admin/` | Developer / Internal Technical Maintenance ONLY | Decoupled; **Zero links or buttons** anywhere on user-facing UI or admin console. |

### 8.2 Enterprise Admin Layout Specification

The Custom Admin Panel at `/platform-admin` is built strictly on a **two-container architecture**:
1. **Left Navigation Panel (`div`)**:
   - **Fixed 300px width** (`w-[300px] min-w-[300px] max-w-[300px] bg-[#002B49] text-white flex-shrink-0`).
   - Houses navigation modules categorized by operational domain.
   - Permission-aware: restricted moderator sees only assigned modules (e.g. Content Moderation), while Super Admin sees all modules.
2. **Right Workspace Area (`div`)**:
   - **Main Content Area** (`flex-1 min-w-0 bg-[#F4F5F7] p-8 overflow-y-auto`).
   - Dynamically renders data tables, action cards, inline editors, and PDF report generators according to the active menu selection.

### 8.3 5-Step Content Moderation & Review Workflow (কনটেন্ট মডারেশন ও ওয়ার্কফ্লো প্রক্রিয়া)

To maintain platform safety, editorial fidelity, and multi-user governance, content created by staff/moderators follows a strict 5-stage lifecycle:
1. **Content & Service Submission**: Moderator/Creator fills out draft details in their `/dashboard` or admin workspace. The item is saved with status `pending` and is **never** published directly to the public live website.
2. **Admin Review Dashboard & Card View**: A dedicated 'Request/Review' tab presents all pending requests in an intuitive **Card View**. Clicking any card triggers an overlay **Full-View Modal** displaying all submission details.
3. **Editing & Direct Publication**: Inside the Full-View Modal, the Admin can inspect, verify, and directly edit any field in-place before clicking **"Approve & Direct Publish"**, which instantly publishes the destination/tour to the live public platform.
4. **Comment Section & 'Review Again' Flow**: If corrections or missing information are detected, the Admin writes specific guidance into the feedback comment box and clicks the **"Review Again"** button, changing status to `review_again`.
5. **Notification & Resubmission**: The submitter receives an alert on their `/dashboard`, reviews the Admin's comments, corrects the payload, and resubmits for final approval.

### 8.4 User Roles (RBAC), Security & OTP Recovery Flow

- **Role Hierarchy**: Superadmin (`sandwip`), Central Admin, Content Moderator, Content Creator, Supervisor, Accounts/HRM, Dynamic Agent Partner, Registered Traveler.
- **Account Creation**: Super Admin creates staff accounts, assigns granular permissions, and triggers an OTP.
- **Safe Password Reset via Admin-Generated OTP**:
  1. If a moderator/user forgets credentials, they contact Admin.
  2. Admin clicks **"Generate OTP"** in the custom admin panel, creating a 6-digit OTP with `must_reset_password=True`.
  3. Moderator logs in with the OTP and is immediately presented with a mandatory **Password Reset Form** (Old OTP, New Password, Confirm Password).
  4. Saving the form activates their permanent password and unlocks their dashboard.
- **Profile Immutability**:
  - Customer Profile: Name, Avatar/Photo, and Location are editable.
  - **Email and Phone are strictly immutable/locked** to ensure account provenance and fraud protection.

### 8.5 Dynamic Agent & Provider Portal (`/agent-portal`)

To empower hoteliers, resort operators, transport managers, and local guides, a dedicated dynamic portal is provided at `/agent-portal`:
1. **Hotel & Resort Vacancy Management**:
   - Room / Cottage tiers (Deluxe, Suite, Eco-Wood Cottage, Standard).
   - Real-time room inventory: Total units, available vacancies, and night rent (BDT).
   - Instant stock adjustment buttons (+/-) syncing directly to the main portal's card view and search filters.
2. **Real-time Booking Notifications Dispatch**:
   - Incoming reservations dispatch simultaneously to the partner agent and platform admin.
   - Shows guest name, phone, dates, unit count, and total BDT.
3. **Ask a Local Guide / Destination Expert Advice**:
   - Travelers submit queries about destinations without needing cold-calls.
   - Local guides and partners review queries and dispatch expert answers via email & portal.
4. **Three Technical Integration Scenarios Supported**:
   - **Scenario 1 (Full API Sync)**: High-tech partners with booking systems and APIs (e.g. Sayeman Beach Resort, airlines).
   - **Scenario 2 (Portal Inventory Sync)**: Partners with websites but no API; staff update vacancies via dynamic portal.
   - **Scenario 3 (Zero-Tech Platform Managed)**: Small eco-resorts, local boatmen, and indigenous guides managed centrally by platform operations.

### 8.6 Accounts & Financial Governance Workflow

- Centralized income, operational expense, payroll budgets, and partner settlements.
- Mandatory approval mechanism: pending transactions require two-click authorization (`Approve` / `Reject`).
- Audited statements and automated balance tracking.

### 8.7 PDF Reporting System (Admin Panels)

Every administrative portal includes an integrated **PDF Report Generation Engine**:
1. **Report Types Supported:**
   - **Bookings & Reservations Summary:** Audit log with guest details, totals, dates, and confirmation codes (`/api/v1/reports/pdf/bookings/`).
   - **Financial & Revenue Statement:** Gross platform volume, package breakdowns, and audit totals (`/api/v1/reports/pdf/revenue/`).
   - **Tour Packages & Inventory Status:** Catalogue of all 8 divisions, 64 districts, and pricing tiers (`/api/v1/reports/pdf/inventory/`).
2. **Implementation Architecture:**
   - Server-side generation using ReportLab engine for high fidelity, branding headers, corporate watermarks, page numbering, and tabular styling.
   - Direct 1-click Download buttons in both the custom Admin UI and traveler dashboard.
---

## 9. Security Architecture

### 9.1 Authentication

| Requirement | Implementation |
|---|---|
| Password hashing | Argon2id |
| Access tokens | Short-lived JWT (15 min) |
| Refresh tokens | Rotated; HttpOnly, Secure, SameSite=Strict cookies |
| Email verification | Short-lived single-use hashed token |
| Password reset | Short-lived single-use hashed token; generic response |
| MFA | Required: superadmins, finance-sensitive roles |
| Session revocation | Redis-based refresh token blacklist |
| Login throttling | By IP + account |
| Token storage | Never in localStorage for privileged tokens |

### 9.2 Authorization (RBAC + ABAC)

- **Deny by default** — explicit permission for every action
- **RBAC:** granular permission codes (e.g., `cms.page.publish`, `provider.application.review`)
- **ABAC scopes:** assigned portal, provider, division/district, content ownership
- Server-enforced on every API request — not just by hiding UI buttons
- Object-level permission checks (prevent IDOR/BOLA)
- Users cannot assign their own roles (privilege escalation prevention)
- Separation of duties: content creator ≠ publisher; refund preparer ≠ approver

### 9.3 Web & API Protections

- HTTPS everywhere; HSTS after HTTPS confirmed
- CORS allowlist (no wildcard credentials)
- CSRF protection for cookie-authenticated requests
- Input validation + output encoding + ORM parameterization
- File upload: MIME/signature validation, randomized storage key, re-encoding, no executables
- Rate limits: by IP/account/endpoint; stricter for login, OTP, search, contact, booking, payment
- Webhook: signature validation, timestamp/replay protection, idempotent processing
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options
- No secrets in: source control, client bundles, logs, CMS settings

### 9.4 Payment & Booking Security

- Never store card PAN/CVV — gateway-hosted checkout/tokenization only
- Amount/currency recalculated server-side — never trust client totals
- Idempotency keys for create payment/refund operations
- Webhook signature verification + periodic reconciliation
- Immutable transaction events; adjustments via separate audit entries
- High-value transactions require dual approval (maker-checker)

### 9.5 Anti-Spam Layers (every public form endpoint)

1. Server-side validation (mirror of client validation)
2. Rate limiting (IP + account + endpoint specific)
3. Honeypot fields
4. CAPTCHA/Turnstile for high-risk endpoints
5. Message content length limits
6. Duplicate submission prevention
7. Email normalization + deduplication

---

## 10. Phase-wise Delivery Roadmap

### Phase 0 — Discovery & Design (Weeks 1–4)

- [ ] Confirm MVP scope, explicitly document excluded modules
- [ ] Finalize Bangladesh geography hierarchy + destination taxonomy
- [ ] Design system: tokens, typography, spacing, motion, components
- [ ] Desktop + mobile wireframes (all page types listed in Section 6.5)
- [ ] Clickable prototype (desktop + mobile)
- [ ] Finalize ERD, field dictionary, status transitions, data-retention rules
- [ ] CMS section catalogue + content binding map
- [ ] Permission matrix + role definitions
- [ ] Acceptance criteria + performance/security goals

**Exit:** Approved scope, ERD, UI prototype, API contract draft, prioritized backlog

### Phase 1 — Foundation (Weeks 5–8)

- [ ] Repository setup: environments, CI, secrets management
- [ ] Database migrations: custom user model, roles/permissions, geography
- [ ] Geography seed: 8 divisions, 64 districts, verified upazilas
- [ ] Media storage pipeline: upload, Celery variant generation, metadata
- [ ] Logging, error handling, audit events, backup automation
- [ ] Authentication: email verification, password reset, staff MFA
- [ ] Basic admin panel: user management, RBAC interface

**Exit:** Migrations reproducible; restore test passes; unauthorized access tests pass

### Phase 2 — CMS & Content (Weeks 9–14)

- [ ] Destination, category, tag, facility models + translations
- [ ] Article, guide, itinerary models
- [ ] CMS pages, sections, menus, site settings
- [ ] Review workflow, revisions, comments, scheduled publishing
- [ ] Media rights/alt-text checks, SEO metadata, preview
- [ ] Admin panel: editorial interface, workflow queue, media library
- [ ] Seed + import tools with validation report

**Exit:** Editor can build/update homepage from CMS sections without code edits; publish/rollback work

### Phase 3 — Public Frontend (Weeks 15–22)

- [ ] Design token CSS file + accessible component library
- [ ] GlobalHeader + GlobalFooter + all navigation components
- [ ] Homepage with all CMS section types rendered
- [ ] Destination directory + destination detail pages
- [ ] Article/story, guide, itinerary pages
- [ ] Geography pages (division, district)
- [ ] Search/filter (all states: loading, empty, error, success)
- [ ] Locale switcher + bilingual content rendering
- [ ] SEO: metadata, structured data, sitemap.xml, robots.txt
- [ ] Performance: image pipeline, Core Web Vitals baseline
- [ ] Accessibility: WCAG 2.2 AA audit
- [ ] Usability testing

**Exit:** Core journeys complete on mobile/desktop; accessibility tests pass; no blocking CWV issues

### Phase 4 — User Accounts (Weeks 23–26)

- [ ] Registration, login, email verification, secure password reset
- [ ] Profile: display name, avatar, preferred language
- [ ] Wishlist/favorites
- [ ] Saved trips and itineraries
- [ ] Notification centre + consent controls
- [ ] Account activity and privacy request workflow

### Phase 5 — Marketplace Readiness (Future)

- [ ] Provider onboarding, verification, dashboard
- [ ] Service catalogue, pricing, inventory management
- [ ] Booking state machine + concurrency tests
- [ ] Payment gateway sandbox, webhook validation, refund workflow
- [ ] Affiliate attribution, commission ledger, payout reconciliation
- [ ] Legal/policy review before real payments go live

### Phase 6 — Multi-Portal (Future)

- [ ] Portal registry, domain mapping, portal-specific config
- [ ] Content publication scope per portal + locale
- [ ] API scopes, cache separation, SEO/canonical rules
- [ ] Portal isolation + cross-portal permission tests
- [ ] Proof with second portal before mass rollout

### Phase 7 — CRM & AI Discovery (Future)

- [ ] Support case management (CRM module)
- [ ] Customer feedback + moderation
- [ ] Consent-aware analytics + recommendations
- [ ] AI travel assistant (only on published/verified CMS content; no hallucinated facts)

---

## 11. Testing & Acceptance Criteria

### 11.1 Functional

- [ ] Every public page rendered from CMS-backed content (zero hard-coded content)
- [ ] BN/EN switch changes all available translations consistently
- [ ] Draft/review/publish/unpublish and scheduled publication work correctly
- [ ] Geography filters correct; invalid parent relationships rejected
- [ ] Search handles exact, partial, alias queries; pagination stable
- [ ] User can manage their own profile, wishlist, trips only
- [ ] Provider user can manage only their provider's services
- [ ] Booking/availability updates are concurrency-safe
- [ ] Payment webhook duplicate delivery does not duplicate payment or booking

### 11.2 Security

- [ ] Object-level access tests for every protected endpoint
- [ ] Role escalation attempts fail
- [ ] CSRF/CORS/XSS/SQL injection/file-upload/rate-limit tests pass
- [ ] Expired/reused reset token rejected
- [ ] Admin MFA and session revocation verified
- [ ] Webhook signature and replay tests pass
- [ ] Secrets/PII absent from client bundle and application logs
- [ ] Backup restore and incident recovery tested

### 11.3 UI/UX

- [ ] Core tasks tested with BN and EN users
- [ ] Search-to-destination flow understandable
- [ ] Mobile layout at 360–390px without horizontal overflow
- [ ] Keyboard navigation and focus order verified
- [ ] All component states (empty, loading, error, disabled, success) consistent
- [ ] Images load correct dimensions; CLS < 0.1
- [ ] Reduced-motion preference respected (no auto-playing carousels)
- [ ] Screen reader smoke tests pass

### 11.4 Performance

- [ ] Realistic content volume + concurrent user load test
- [ ] p95 API latency budgets defined per endpoint class
- [ ] No unbounded listing endpoints
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms (mobile/4G)
- [ ] Hero/LCP image NOT lazy-loaded
- [ ] Image containers have reserved dimensions

### 11.5 Phase 1 Acceptance (Minimum for First Release)

- [ ] Every homepage title, summary, image, CTA, section order/visibility changeable from CMS
- [ ] Navigation/menu/footer requires zero template/code change
- [ ] Destination/article/guide: create, preview, approve, schedule, publish, update, archive all work
- [ ] Destination page has geography, coordinates, gallery, related stories, SEO metadata
- [ ] Draft/scheduled/archived content NOT visible in public responses or search
- [ ] Desktop, tablet, mobile: menu, hero, cards, carousel, form, footer all tested
- [ ] Newsletter: consent/confirmation/unsubscribe functional (not just browser alert)
- [ ] Media source/licence and alt text trackable
- [ ] Role-based access and audit history work
- [ ] Database and media backup/restore process verified
- [ ] No proprietary reference text, branding, fonts, or images in deployable project

---

## 12. Operations & DevOps

### 12.1 Environment Strategy

| Environment | Database | Media | Notes |
|---|---|---|---|
| Development | SQLite / PostgreSQL (Docker) | Local filesystem | .env.local |
| Staging | PostgreSQL | S3 (staging bucket) | Mirror production config |
| Production | PostgreSQL (managed service) | S3 / R2 | Encrypted; no ephemeral storage |

### 12.2 Backup & Recovery

- Automated encrypted PostgreSQL backup (PITR where available)
- Off-site copy (different account/region)
- RPO/RTO defined; **scheduled restore drills** — not just backup-success checks
- Media storage backup/versioning separately configured
- Every production migration: tested on data copy first; rollback plan ready; row counts verified

### 12.3 CI/CD Pipeline

```
Push to main/feature branch → GitHub Actions:
  1. Lint (ruff, ESLint)
  2. Type check (mypy, tsc)
  3. Unit + integration tests (pytest, jest)
  4. Security scan (dependency audit, secret scan)
  5. Build Docker images
  6. Deploy to Staging
  7. Run acceptance tests
  8. Manual approval gate (production)
  9. Deploy to Production
  10. Migration: rehearsed on staging copy first
```

### 12.4 Monitoring & Alerting

| Signal | Tool | Alert Condition |
|---|---|---|
| Application errors | Sentry | Immediate |
| API latency p95 | Prometheus/Grafana | > budget threshold |
| Slow queries | pg_stat_statements | > 500ms |
| Queue failures | Celery Flower | Job failure spike |
| Failed webhooks | Application logs | Error rate |
| Email delivery failure | Provider dashboard | Bounce/error rate |
| Backup status | Cron + alerting | Failure |
| Security events | Application logs | Suspicious login count |

---

## 13. Design System Specification

### 13.1 Component State Matrix

All states must be designed before implementation begins:

| Component | default | hover | focus | disabled | loading | error | success | empty |
|---|---|---|---|---|---|---|---|---|
| Button (primary) | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| Input field | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | — |
| Search | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Filter chip | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| Card | ✓ | ✓ | ✓ | — | ✓ | — | — | ✓ |
| Carousel | ✓ | ✓ | ✓ | ✓(arrows) | — | — | — | — |
| Newsletter form | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | — |
| Map panel | ✓ | — | — | — | ✓ | ✓ | — | — |

### 13.2 Card Variants

| Variant | Usage | Image Ratio | Layout |
|---|---|---|---|
| Featured | Hero section | 16:9 or 3:2 | Vertical, large |
| Standard | Grid listing | 4:3 | Vertical |
| Compact | Carousel item | 16:9 | Vertical, small |
| Horizontal | Search result | 4:3 | Horizontal |
| Editorial | Article/story | 16:9 | Vertical with overlay |

### 13.3 Image Variant Registry

| Variant Key | Approx Width | Use Case |
|---|---|---|
| `hero_wide` | 1920px | Homepage hero, destination hero |
| `card_landscape` | 800px | Standard grid cards |
| `card_wide` | 800px | Featured/editorial cards |
| `portrait` | 600px | Mobile hero, portrait layouts |
| `thumbnail` | 400px | Article list, small cards |
| `mobile_hero` | 768px | Mobile-specific hero crop |
| `social` | 1200px | Open Graph image |
| `original` | — | Source kept in storage |

Formats: WebP + AVIF (where supported) + JPEG fallback.

---

## 14. API Contract Overview

### 14.1 Conventions

- All responses: `Content-Type: application/json`
- Versioned: `/api/v1/`
- Locale: `?locale=bn` (fallback to site default)
- Pagination: `{ count, next, previous, results }` (cursor-based for large/changing sets)
- Error format: `{ error: { code, message, field_errors? } }`
- Timestamps: ISO 8601, timezone-aware
- Amounts: string-encoded decimal
- UUIDs: lowercase hyphenated

### 14.2 Example: Site Config

```json
GET /api/v1/site-config/?locale=bn
{
  "site_name": "SANDVIORA",
  "logo_url": "https://cdn.example.com/logo.svg",
  "default_locale": "bn",
  "available_locales": ["bn", "en"],
  "contact_email": "hello@sandviora.com",
  "social_links": { "facebook": "...", "instagram": "..." },
  "footer_tagline": "বাংলাদেশ আবিষ্কার করুন"
}
```

### 14.3 Example: Homepage Sections

```json
GET /api/v1/pages/home/?locale=bn
{
  "id": "uuid",
  "sections": [
    {
      "id": "uuid",
      "section_type": "hero_feature",
      "sort_order": 1,
      "is_enabled": true,
      "heading": "বাংলাদেশ আবিষ্কার করুন",
      "subheading": "আপনার পরবর্তী গন্তব্য খুঁজুন",
      "cta_label": "গন্তব্য দেখুন",
      "cta_url": "/destinations",
      "media": {
        "url": "https://cdn.example.com/variants/hero_wide.webp",
        "alt": "কক্সবাজার সমুদ্র সৈকত",
        "focal_x": 0.5, "focal_y": 0.3
      },
      "content_items": []
    },
    {
      "id": "uuid",
      "section_type": "featured_destinations_grid",
      "sort_order": 2,
      "heading": "বাছাই করা গন্তব্য",
      "content_items": [
        {
          "type": "destination",
          "id": "uuid",
          "name": "কক্সবাজার",
          "slug": "cox-s-bazar",
          "district": "কক্সবাজার",
          "division": "চট্টগ্রাম",
          "short_description": "পৃথিবীর দীর্ঘতম সমুদ্র সৈকত",
          "card_image": {
            "url": "https://cdn.example.com/variants/card_landscape.webp",
            "alt": "কক্সবাজার সমুদ্র সৈকতের দৃশ্য"
          }
        }
      ]
    }
  ]
}
```

### 14.4 Example: Navigation

```json
GET /api/v1/navigation/primary_nav/?locale=bn
{
  "menu_code": "primary_nav",
  "items": [
    {
      "id": "uuid",
      "label": "গন্তব্য",
      "url": "/destinations",
      "children": [
        {
          "label": "বিভাগ অনুযায়ী",
          "children": [
            { "label": "ঢাকা বিভাগ", "url": "/divisions/dhaka" },
            { "label": "চট্টগ্রাম বিভাগ", "url": "/divisions/chittagong" }
          ]
        }
      ]
    },
    {
      "id": "uuid",
      "label": "ভ্রমণ-গাইড",
      "url": "/guides",
      "children": []
    }
  ]
}
```

---

## 15. Deliverables Checklist

### Product & Design
- [ ] Product scope, phase boundaries, and user journeys documented
- [ ] Complete sitemap with all page types
- [ ] Responsive wireframes for all page types (all 3 viewports)
- [ ] Clickable prototype (desktop + mobile)
- [ ] Design tokens: colors, typography, spacing, radius, elevation, breakpoints
- [ ] Component library with all interaction state variants
- [ ] CMS section catalogue and content binding map
- [ ] Accessibility and performance checklist
- [ ] Usability test report with prioritized issue list

### Data
- [ ] ERD with cardinality and FK delete rules
- [ ] Field dictionary: types, nullability, defaults, constraints
- [ ] 3NF review and functional dependency notes
- [ ] Index plan tied to query patterns
- [ ] Bangladesh geography import specification
- [ ] Migration procedure and backup/restore runbook
- [ ] Data retention policy per entity type

### Backend & Security
- [ ] API contract with versioning policy and error format
- [ ] Permission matrix and ABAC scope rules
- [ ] Authentication/session policy (token lifecycle, MFA requirements)
- [ ] Threat model and security test plan
- [ ] Audit/retention/privacy policy
- [ ] Anti-spam and abuse prevention specification
- [ ] Integration and webhook specification (payment gateway, email)

### Frontend
- [ ] Design token CSS file (`tokens.css`)
- [ ] All component files with full state variants
- [ ] Page templates for all page types
- [ ] CMS section renderer (one component per section type)
- [ ] Bilingual rendering (BN/EN) with fallback behavior
- [ ] SEO: metadata, structured data (JSON-LD), sitemap.xml, robots.txt
- [ ] Performance baseline: image pipeline, Core Web Vitals report
- [ ] Accessibility audit: WCAG 2.2 AA report

### Operations
- [ ] Environment and secrets management documentation
- [ ] CI/CD pipeline configuration and runbook
- [ ] Monitoring and alerting configuration
- [ ] Backup and restore test evidence (restore drill completed)
- [ ] Load test report with p95 latency measurements
- [ ] Incident response and operational ownership documented

---

## 16. Key Design Cautions

> Do NOT make one giant model. Geography, translation, destinations, media, content, users, booking, and payment are separate domain modules.

> Do NOT use generic polymorphic FKs indiscriminately. Use typed junction tables where referential integrity matters.

> Do NOT store multiple IDs as comma-separated text. Use junction tables.

> Do NOT copy division names into destination records. Derive via district relationship.

> Do NOT put passwords, OTPs, payment secrets, or API keys in CMS settings.

> Do NOT claim real-time availability when data is manually updated. Show last-updated status.

> Do NOT expose unreviewed content. Public API enforces publication status strictly.

> Do NOT build marketplace/payment features simultaneously with the tourism MVP.

> Do NOT call a design "responsive" without device testing at defined viewports.

> Do NOT optimize indexes by guesswork. Benchmark with `EXPLAIN (ANALYZE, BUFFERS)`.

> Do NOT store every click forever. Analytics require consent, minimization, and retention policy.

> Do NOT permit unrestricted CMS HTML/JavaScript. Enforce block type allowlist.

> Do NOT use a single `is_admin` boolean as the whole authorization system.

> Do NOT treat backup-success as restore-success. Scheduled restore drills are mandatory.

> Do NOT auto-play carousels. Use static featured hero. Respect `prefers-reduced-motion`.

> Do NOT hide essential UI interactions behind hover-only states. Touch devices have no hover.

---

*This document is the living project reference. Update it as decisions are finalized during Phase 0 discovery.*
