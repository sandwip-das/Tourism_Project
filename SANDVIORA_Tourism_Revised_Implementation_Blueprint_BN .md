# SANDVIORA TOURISM LTD.

## Tourism Information, Discovery & Multi-Portal Platform

**সম্পূর্ণ প্রজেক্ট গাইডলাইন ও ইমপ্লিমেন্টেশন ব্লুপ্রিন্ট**  
**সংস্করণ:** 2.0 — Tourism-only scope  
**উদ্দেশ্য:** বাংলাদেশ-কেন্দ্রিক tourism information/discovery portal থেকে পর্যায়ক্রমে service marketplace ও multi-portal ecosystem-এ সম্প্রসারণ।

> **Scope freeze:** HRIS, payroll এবং internal accounting/ERP এই tourism project-এর feature list, database schema, backend modules ও roadmap থেকে বাদ। এগুলো আলাদা project হবে। Tourism marketplace চালু হলে booking payment, refund, commission ও provider payout-এর transaction records এই project-এর মধ্যে থাকবে; এগুলো general-purpose accounting system নয়।

------------------------------------------------------------------------

# 1. নির্বাহী সারাংশ

SANDVIORA TOURISM LTD. হবে বাংলাদেশ-কেন্দ্রিক tourism information, destination discovery, travel planning এবং পর্যায়ক্রমে service marketplace ও multi-portal platform। প্রথম পর্যায়ে একক public website-এ বাংলাদেশের ৮ বিভাগ, ৬৪ জেলা, পর্যটনস্থল, travel guide, itinerary, practical travel information এবং editorial content প্রকাশ করা হবে। Public content, navigation, homepage sections, media, SEO metadata ও page configuration কেন্দ্রীয় CMS থেকে পরিচালিত হবে।

পরবর্তী পর্যায়ে একই tourism backend ও database ব্যবহার করে verified provider directory, service inventory, booking, tourism-related payment/refund, affiliate/commission, support/CRM এবং আলাদা branded portals যোগ করা যাবে। প্রথম লক্ষ্য হলো discovery portal-কে তথ্যসমৃদ্ধ, দ্রুত, সহজে ব্যবহারযোগ্য ও editorially polished করা—marketplace বা enterprise operations একসঙ্গে তৈরি করা নয়।

**বাস্তবায়ন নীতি:** modular monolith, normalized relational data model, staged delivery, content review workflow, security controls, automated tests এবং নিয়মিত backup/restore rehearsal।

## 1.1 মূল লক্ষ্য

1.  বাংলাদেশের পর্যটনস্থলের নির্ভরযোগ্য, দ্বিভাষিক তথ্যভান্ডার তৈরি।
2.  Mobile-first, visually rich এবং reference travel UI-এর মতো editorial
    presentation তৈরি, তবে নিজস্ব brand identity ও licensed assets
    ব্যবহার।
3.  Content editor যেন code পরিবর্তন ছাড়াই homepage, menu, footer, page
    section, feature card ও CTA নিয়ন্ত্রণ করতে পারেন।
4.  Search/filter দ্রুত ও নির্ভুল রাখা।
5.  User account, wishlist, saved trip, booking history এবং
    notifications দেওয়া।
6.  Partner/provider-দের নিজস্ব service ও inventory পরিচালনার সুবিধা।
7.  Booking, commission, payment এবং settlement-এর হিসাব audit-friendly
    রাখা।
8.  Role/attribute-based access control, review workflow এবং audit trail
    প্রতিষ্ঠা।
9.  পরে multi-portal architecture-এ একই central backend পুনর্ব্যবহার।
10. Tourism discovery-কে প্রথম অগ্রাধিকার দিয়ে marketplace ও multi-portal ধাপে ধাপে যোগ করা।

## 1.2 Scope boundary

- **Phase 1 — Public discovery MVP:** public portal, CMS, geography, destinations, editorial content, search, SEO, media library ও responsive UI।
- **Phase 2 — Engagement:** user accounts, wishlist, saved trips, newsletter, feedback/correction reports এবং privacy-aware analytics।
- **Phase 3 — Tourism marketplace:** verified providers, services, availability/inventory, booking, payment/refund, affiliate/commission ও payout records।
- **Phase 4 — Platform expansion:** multi-portal publishing, support/CRM এবং data-supported recommendations/AI-assisted discovery।
- প্রতিটি phase আলাদা acceptance criteria, security review, migration plan এবং backup/restore test পাস করে release করতে হবে। HRIS, payroll ও internal accounting এই scope-এর বাইরে।

------------------------------------------------------------------------

# 2. ফিচার তালিকা---ধারাবাহিক অগ্রাধিকার অনুযায়ী

## 2.1 Public tourism portal

1.  Homepage: configurable hero, featured destinations, regional
    discovery, editorial stories, travel guides, trip ideas, seasonal
    collections, partner promotions এবং newsletter.
2.  Bangladesh geography explorer: Division → District → Upazila/area →
    destination.
3.  Destination directory: category, region, travel interest, facilities
    এবং practical constraints অনুযায়ী filter.
4.  Destination detail: gallery, overview, location/map coordinates,
    visiting information, best season, access/transport, facilities,
    safety notes, nearby places, related articles ও itinerary.
5.  Editorial article: travel story, destination guide, local culture,
    responsible tourism এবং practical tips.
6.  Itinerary: day-by-day travel plan, stops, estimated duration, route
    notes এবং linked destinations.
7.  Search: destination, district, category, article, guide ও service-এর
    unified search; type-ahead suggestion; spelling-tolerant search;
    filters; sort; pagination.
8.  Content category/tag: destination type, landscape/interest,
    audience, season এবং trip style.
9.  Bilingual UI: Bangla ও English; content translation আলাদাভাবে
    পরিচালনা; missing translation হলে নির্ধারিত fallback policy.
10. Responsive navigation: desktop mega-menu, mobile drawer, breadcrumb,
    sticky search/filter (যেখানে কার্যকর).
11. SEO: unique title/description, canonical URL, Open Graph image,
    structured data, sitemap, robots rules, redirects ও clean slug.
12. Media library: optimized image variants, alt text, caption,
    copyright/source, licence, focal point.
13. Contact, newsletter consent, feedback/report correction form.
14. Accessible interactions: keyboard navigation, focus state,
    meaningful labels, sufficient contrast, reduced-motion support.
15. Editorial trust: content source, last reviewed date, correction
    contact এবং প্রয়োজনমতো verified label.

## 2.2 User account ও personalization

16. Sign-up, sign-in, email/phone verification, secure password reset,
    session/device management.
17. Profile: display name, profile image, preferred language এবং
    optional travel interests.
18. Wishlist/favorites: destination, article, package বা service save
    করা।
19. Saved trip/itinerary: trip name, travel dates (optional), saved
    stops ও notes.
20. Notification centre: booking update, moderation comment,
    account/security event, relevant opt-in alerts.
21. Account activity: login/security events এবং user-visible
    booking/payment history.
22. Privacy controls: consent, marketing preferences, account
    export/delete request এবং retention policy.

## 2.3 CMS ও editorial operations

23. Content type configuration: destination, article, guide, itinerary,
    campaign, landing page, FAQ.
24. Dynamic page builder: approved section templates, order, visibility,
    content binding, theme variant ও responsive asset.
25. Global site settings: brand name, logo, contact details, social
    links, default locale, navigation ও footer.
26. Draft → submitted → in review → changes requested →
    approved/published → archived workflow.
27. Version history, reviewer comments, resubmission এবং rollback.
28. Scheduled publishing/unpublishing, preview link, expiry date.
29. Content ownership, assignment, reviewer queue ও workload status.
30. Duplicate slug detection, broken-link checks, missing
    translation/media/SEO validation.
31. Import/export tools for geography and bulk destination records;
    import preview and error report.
32. CMS audit log: কে কী পরিবর্তন করেছেন, কখন, কোন record-এ এবং কী ফল
    হয়েছে।

## 2.4 Provider/agent marketplace---Phase 2

33. Provider onboarding, legal/business details, verification, contract
    status ও service categories.
34. Provider portal: service listing, photos, pricing, availability,
    blackout dates, cancellation policy.
35. Service types: accommodation, tour package, guide, transport,
    activity এবং অন্যান্য approved category.
36. Inventory model per service type; room/seat/slot/quantity-এর মতো
    inventory dimensions service অনুযায়ী পৃথক।
37. Booking request, provider confirmation, cancellation, refund
    request, voucher/confirmation reference.
38. Provider API integration registry: API-supported,
    website-only/manual confirmation, অথবা platform-managed provider.
39. Affiliate link/campaign, click tracking, attribution window,
    conversion event ও commission rule.
40. Payment gateway abstraction, transaction status, refund, provider
    payout ও settlement reconciliation.
41. Provider performance dashboard: views, inquiries, booking
    conversion, cancellation, settlement due.
42. Customer support/CRM: inquiry, issue, case assignment, status,
    internal note ও resolution.
43. Fraud/risk flags, rate limits, suspicious booking/payment review এবং
    dispute handling.

# 3. UI/UX নির্দেশিকা---reference style থেকে নিজস্ব উন্নত ডিজাইন

Reference project-কে visual/interaction inspiration হিসেবে ব্যবহার করতে
হবে, তার লেখা, logo, images, proprietary brand assets বা exact copy নয়।
Target হবে polished editorial travel experience + দ্রুত utility-oriented
discovery।

## 3.1 Visual direction

-   বড়, high-quality landscape photography; প্রতিটি image-এ usage rights,
    focal point ও responsive variants থাকতে হবে।
-   পরিষ্কার typography hierarchy: display heading, page heading, section
    heading, body, caption, metadata.
-   whitespace, consistent grid, restrained borders/shadows এবং clear
    CTA hierarchy.
-   Brand palette: 1 primary, 1 accent, neutral surface/background,
    semantic success/warning/error; contrast পরীক্ষা ছাড়া রং অনুমোদন নয়।
-   Card layout-এর একাধিক approved variant: featured, standard, compact,
    horizontal, editorial.
-   এক page-এ অতিরিক্ত card/section দিয়ে user-কে ক্লান্ত করা যাবে না;
    content hierarchy ও spacing বজায় রাখতে হবে।
-   Text/image ratio এবং image crop-এর consistency নিশ্চিত করতে CMS-এ
    focal point/variant controls রাখুন।

## 3.2 Homepage structure

1.  Header: logo, primary navigation, destination/search access,
    language switcher, account entry.
2.  Hero: compelling image, CMS-controlled heading/subheading,
    search/CTA; mobile-এ hero যেন viewport সম্পূর্ণ দখল না করে।
3.  Quick discovery: বিভাগ/জেলা বা popular travel interest.
4.  Featured destinations: curated card grid/carousel.
5.  Explore by region: geography-based navigation.
6.  Editorial feature: story/guide highlight.
7.  Trip ideas/itineraries: practical inspiration.
8.  Seasonal/curated collection: start/end dates ও publishing controls.
9.  Partner/service area: Phase 2-এ কেবল verified/available service.
10. Responsible travel/safety information, যেখানে প্রাসঙ্গিক।
11. Newsletter CTA with explicit consent.
12. Footer: navigation groups, contact, policies, social links,
    language/brand details.

CMS section type whitelist করবে। Editor section order ও content binding
বদলাতে পারবেন, কিন্তু arbitrary HTML/script ঢোকাতে পারবেন না।

## 3.3 Destination listing page

-   Page title + short intro + breadcrumb.
-   Search field এবং result count.
-   Desktop-এ sidebar বা top filter; mobile-এ filter drawer/bottom
    sheet.
-   Filter chips, selected filter count, "clear all".
-   Sort options: relevance, name, recently reviewed; popularity কেবল
    reliable analytics থাকলে।
-   Responsive cards: image, destination name, geography, short summary,
    key metadata, save action.
-   Pagination বা "load more"; search engine indexable listing-এর জন্য
    stable paginated URLs.
-   Empty state: filter clear করার পরামর্শ; error state ও retry.
-   URL-এ shareable filters/query state রাখা যেখানে উপযোগী।

## 3.4 Destination detail page

-   Hero/gallery with keyboard-accessible lightbox.
-   Name, location breadcrumb, category/tags, verified/reviewed date.
-   Summary before long-form content.
-   Practical information in scannable sections: how to reach, visiting
    hours/season if verified, facilities, restrictions, safety,
    accessibility.
-   Map only when coordinates are validated; do not imply live routing
    if unavailable.
-   Nearby destinations, related guides, suggested itinerary.
-   Save/share/report correction actions.
-   Phase 2-এ related bookable service আলাদা section-এ,
    price/availability freshness clearly stated.

## 3.5 Interaction specification

-   Hover is enhancement only; core actions click/tap/keyboard দিয়েও
    চলবে।
-   Buttons-এর default, hover, focus, active, disabled ও loading state
    থাকবে।
-   Form validation field-level এবং summary-level হবে; error message
    actionable হতে হবে।
-   Search autocomplete arrow keys, Enter, Escape এবং screen-reader
    announcement সমর্থন করবে।
-   Carousel swipe, keyboard control, visible controls এবং
    reduced-motion preference মানবে; auto-advance default-এ এড়িয়ে চলুন।
-   Skeleton loading কেবল content layout পরিচিত হলে ব্যবহার করুন; দীর্ঘ
    অপেক্ষায় progress/status message দিন।
-   Toast গুরুত্বপূর্ণ error-এর একমাত্র উপায় হবে না; দরকারি error স্থায়ীভাবে
    দৃশ্যমান থাকবে।
-   Destructive action-এ confirmation; undo সম্ভব হলে undo.
-   Login, booking, payment এবং content submission-এ
    idempotent/retry-safe interaction design.
-   No-results, network failure, permission denied, expired content,
    unavailable service---সবগুলোর design state আগে নির্ধারণ করতে হবে।

## 3.6 Responsive/accessibility/performance

-   Mobile-first; 320px থেকে বড় desktop পর্যন্ত real-device/browser
    testing.
-   WCAG 2.2 AA লক্ষ্য: keyboard access, visible focus, labels, contrast,
    text resizing, alt text, reduced motion.
-   Image lazy-load (hero/LCP image ছাড়া), modern formats, responsive
    srcset, dimensions reserve করে layout shift কমানো.
-   Fonts সীমিত রাখুন; প্রয়োজনের বাইরে weight/style load নয়।
-   Core Web Vitals field data monitor করুন; launch-এর আগে lab test ও পরে
    real-user metrics.
-   Third-party analytics/chat widgets privacy, performance এবং consent
    review পাস করবে।

## 3.7 UI deliverables

1.  Sitemap এবং user journey.
2.  Low-fidelity wireframe: homepage, listing, detail, article, search,
    sign-in, user dashboard, CMS.
3.  Clickable prototype---desktop ও mobile.
4.  Design tokens: colors, typography, spacing, radius, elevation,
    breakpoints.
5.  Component library ও interaction states.
6.  CMS section catalogue ও content binding map.
7.  Accessibility/performance checklist.
8.  Usability test report ও prioritized issue list.

------------------------------------------------------------------------

# 4. Database architecture এবং 3NF policy

## 4.1 Relational design rules

-   প্রতিটি table-এ primary key থাকবে; internal entities-এর জন্য UUID
    ব্যবহার করা প্রস্তাবিত।
-   Foreign key দিয়ে relationship enforce হবে; application validation
    alone যথেষ্ট নয়।
-   Atomic columns; repeating groups বা comma-separated IDs নয়।
-   Translation, categories, tags, roles, permissions, media links,
    services এবং payment records আলাদা relational tables-এ থাকবে।
-   Many-to-many relation junction table দিয়ে; junction-এর duplicate
    pair আটকাতে unique constraint.
-   Non-key field পুরো primary key-এর ওপর নির্ভর করবে; partial/transitive
    dependency এড়াতে হবে।
-   Derived totals/status aggregates অকারণে duplicate করে রাখা যাবে না।
    প্রয়োজন হলে auditable snapshot, cache/materialized view বা ledger
    entry হিসেবে স্পষ্টভাবে আলাদা রাখতে হবে।
-   Currency amount `NUMERIC`, timestamp timezone-aware, phone/email
    unique policy ও normalization requirements অনুযায়ী।
-   JSON কেবল genuinely variable metadata/configuration-এর জন্য; core
    relational facts JSON-এ লুকানো যাবে না।
-   Soft delete ও hard delete policy entity অনুযায়ী নির্ধারণ;
    financial/audit records সাধারণত immutable.
-   PostgreSQL production-এর recommended target. SQLite local
    development/prototype-এ ব্যবহারযোগ্য, কিন্তু concurrency, full-text
    search ও production operational needs যাচাই করতে হবে।
-   Migration discipline: schema change versioned; production data
    migration rehearsed; rollback/forward-fix plan.
-   3NF compliance table-by-table review করতে হবে; "3NF" মানে index যোগ
    করা নয়---functional dependency ও table design ঠিক থাকা।

## 4.2 Common conventions

-   `id UUID PRIMARY KEY`
-   `created_at TIMESTAMPTZ NOT NULL`
-   `updated_at TIMESTAMPTZ NOT NULL`
-   `created_by UUID NULL REFERENCES accounts_user(id)` এবং `updated_by`
    প্রয়োজনমতো.
-   `is_active BOOLEAN NOT NULL DEFAULT TRUE` কেবল entity-তে meaningful
    হলে.
-   Status-এর জন্য controlled lookup/check constraint বা database enum;
    workflow পরিবর্তনশীল হলে lookup table ভালো।
-   Slug unique scope অনুযায়ী: global page slug অথবা `(locale, slug)`
    unique.
-   FK delete behaviour: restrictive by default; junction rows-এ
    controlled cascade; financial history cascade করে মুছে ফেলা যাবে না।

নিচের schema PostgreSQL-oriented logical blueprint। সব table Phase 1-এ
লাগবে না। Field list production implementation-এর আগে legal, provider
contract ও business rules অনুযায়ী final করতে হবে।

------------------------------------------------------------------------

# 5. Database schema --- Core, CMS এবং geography

## 5.1 Account, profile, roles এবং permissions

### `accounts_user`

  Field               Type           Rules
  ------------------- -------------- --------------------------------------------
  id                  UUID           PK
  email               VARCHAR(254)   NOT NULL, normalized unique where supplied
  phone_e164          VARCHAR(20)    NULL, unique where supplied
  password_hash       VARCHAR(255)   NOT NULL
  is_email_verified   BOOLEAN        NOT NULL DEFAULT FALSE
  is_phone_verified   BOOLEAN        NOT NULL DEFAULT FALSE
  is_active           BOOLEAN        NOT NULL DEFAULT TRUE
  is_staff            BOOLEAN        NOT NULL DEFAULT FALSE
  is_superuser        BOOLEAN        NOT NULL DEFAULT FALSE; tightly controlled
  last_login_at       TIMESTAMPTZ    NULL
  created_at          TIMESTAMPTZ    NOT NULL
  updated_at          TIMESTAMPTZ    NOT NULL

Indexes: unique normalized email; partial unique phone;
`(is_active, created_at DESC)` only if query pattern requires.

### `accounts_profile`

  Field              Type           Rules
  ------------------ -------------- --------------------------------
  user_id            UUID           PK, FK → accounts_user
  display_name       VARCHAR(120)   NOT NULL
  avatar_media_id    UUID           NULL, FK → media_asset
  preferred_locale   VARCHAR(5)     NOT NULL, FK → cms_locale.code
  home_district_id   UUID           NULL, FK → geo_district
  bio                VARCHAR(500)   NULL
  created_at         TIMESTAMPTZ    NOT NULL
  updated_at         TIMESTAMPTZ    NOT NULL

### `accounts_role`

`id UUID PK`, `code VARCHAR(60) UNIQUE NOT NULL`,
`name VARCHAR(120) NOT NULL`, `description TEXT NULL`,
`is_system_role BOOLEAN NOT NULL DEFAULT FALSE`.

### `accounts_permission`

`id UUID PK`, `code VARCHAR(120) UNIQUE NOT NULL`,
`module VARCHAR(60) NOT NULL`, `description TEXT NULL`.

### `accounts_user_role`

`user_id UUID FK`, `role_id UUID FK`,
`assigned_by UUID FK → accounts_user`, `assigned_at TIMESTAMPTZ`; PK
`(user_id, role_id)`.

### `accounts_role_permission`

`role_id UUID FK`, `permission_id UUID FK`; PK
`(role_id, permission_id)`.

### `accounts_user_scope`

For ABAC limits such as assigned division/provider/portal: `id UUID PK`,
`user_id UUID FK`, `scope_type VARCHAR(40)`, `scope_id UUID`,
`granted_by UUID FK`, `created_at TIMESTAMPTZ`. Validate scope target in
application/domain service; if strict FK integrity is required, use
separate scope junction tables per target type.

### `accounts_login_event`

`id UUID PK`, `user_id UUID NULL FK`, `event_type VARCHAR(40)`,
`ip_address INET NULL`, `user_agent TEXT NULL`, `success BOOLEAN`,
`occurred_at TIMESTAMPTZ`, `metadata JSONB NULL`. Avoid storing secrets
or full credentials.

### `accounts_password_reset`

`id UUID PK`, `user_id UUID FK`, `token_hash VARCHAR(255) UNIQUE`,
`expires_at TIMESTAMPTZ`, `used_at TIMESTAMPTZ NULL`,
`created_at TIMESTAMPTZ`. Store hashed one-time token, not plaintext
OTP/token.

## 5.2 Locale এবং geography

### `cms_locale`

`code VARCHAR(5) PK` (e.g. `bn`, `en`), `name VARCHAR(60) NOT NULL`,
`is_enabled BOOLEAN NOT NULL`,
`is_default BOOLEAN NOT NULL DEFAULT FALSE`.

### `geo_division`

`id UUID PK`, `code VARCHAR(20) UNIQUE`, `created_at TIMESTAMPTZ`.

### `geo_division_translation`

`division_id UUID FK`, `locale_code VARCHAR(5) FK`,
`name VARCHAR(120) NOT NULL`, `slug VARCHAR(140) NOT NULL`; PK
`(division_id, locale_code)`, unique `(locale_code, slug)`.

### `geo_district`

`id UUID PK`, `division_id UUID NOT NULL FK → geo_division`,
`official_code VARCHAR(20) UNIQUE NULL`, `created_at TIMESTAMPTZ`.

### `geo_district_translation`

`district_id UUID FK`, `locale_code VARCHAR(5) FK`,
`name VARCHAR(120) NOT NULL`, `slug VARCHAR(140) NOT NULL`; PK
`(district_id, locale_code)`, unique `(locale_code, slug)`.

### `geo_upazila`

`id UUID PK`, `district_id UUID NOT NULL FK → geo_district`,
`official_code VARCHAR(20) UNIQUE NULL`.

### `geo_upazila_translation`

`upazila_id UUID FK`, `locale_code VARCHAR(5) FK`,
`name VARCHAR(120) NOT NULL`, `slug VARCHAR(140) NOT NULL`; PK
`(upazila_id, locale_code)`, unique `(locale_code, slug)`.

### `geo_place`

For village/locality/area where needed: `id UUID PK`,
`upazila_id UUID NULL FK`, `district_id UUID NULL FK`,
`latitude NUMERIC(9,6) NULL`, `longitude NUMERIC(9,6) NULL`,
`created_at TIMESTAMPTZ`. Constraint: latitude between -90 and 90;
longitude between -180 and 180; geography parent consistency validated.
Avoid making this a mandatory level for every destination.

## 5.3 Media library

### `media_asset`

`id UUID PK`, `storage_key VARCHAR(500) UNIQUE NOT NULL`,
`original_filename VARCHAR(255)`, `mime_type VARCHAR(100) NOT NULL`,
`byte_size BIGINT NOT NULL CHECK (byte_size >= 0)`,
`width INTEGER NULL`, `height INTEGER NULL`,
`alt_text_default VARCHAR(250) NULL`,
`copyright_holder VARCHAR(200) NULL`, `source_url TEXT NULL`,
`licence_code VARCHAR(60) NULL`, `uploaded_by UUID FK`,
`created_at TIMESTAMPTZ`, `is_active BOOLEAN NOT NULL DEFAULT TRUE`.

### `media_asset_translation`

`media_id UUID FK`, `locale_code VARCHAR(5) FK`,
`alt_text VARCHAR(250) NULL`, `caption VARCHAR(500) NULL`; PK
`(media_id, locale_code)`.

### `media_variant`

`id UUID PK`, `media_id UUID FK`, `variant_code VARCHAR(40)`,
`storage_key VARCHAR(500) UNIQUE`, `width INTEGER`, `height INTEGER`,
`format VARCHAR(20)`, `byte_size BIGINT`; unique
`(media_id, variant_code)`.

Keep binary files in object storage/CDN; database stores metadata and
stable keys, not large binary blobs.

## 5.4 Destination taxonomy এবং content

### `destination`

`id UUID PK`, `district_id UUID NOT NULL FK`, `upazila_id UUID NULL FK`,
`place_id UUID NULL FK`, `latitude NUMERIC(9,6) NULL`,
`longitude NUMERIC(9,6) NULL`, `status VARCHAR(24) NOT NULL`,
`verification_status VARCHAR(24) NOT NULL`,
`published_at TIMESTAMPTZ NULL`, `created_by UUID FK`,
`updated_by UUID FK`, `created_at TIMESTAMPTZ`,
`updated_at TIMESTAMPTZ`.

Do not store division name redundantly; obtain it via district
relationship. Parent consistency between district/upazila/place must be
validated.

### `destination_translation`

`destination_id UUID FK`, `locale_code VARCHAR(5) FK`,
`name VARCHAR(200) NOT NULL`, `slug VARCHAR(220) NOT NULL`,
`short_description VARCHAR(500) NULL`, `body_content TEXT NULL`,
`how_to_reach TEXT NULL`, `best_time_to_visit TEXT NULL`,
`visitor_information TEXT NULL`, `safety_notes TEXT NULL`,
`seo_title VARCHAR(70) NULL`, `seo_description VARCHAR(170) NULL`; PK
`(destination_id, locale_code)`, unique `(locale_code, slug)`.

### `destination_category`

`id UUID PK`, `code VARCHAR(60) UNIQUE`, `is_active BOOLEAN NOT NULL`.

### `destination_category_translation`

`category_id UUID FK`, `locale_code VARCHAR(5) FK`, `name VARCHAR(120)`,
`slug VARCHAR(140)`; PK `(category_id, locale_code)`, unique
`(locale_code, slug)`.

### `destination_category_link`

`destination_id UUID FK`, `category_id UUID FK`; PK
`(destination_id, category_id)`.

### `taxonomy_tag`

`id UUID PK`, `code VARCHAR(80) UNIQUE`,
`tag_type VARCHAR(40) NOT NULL`, `is_active BOOLEAN NOT NULL`.

### `taxonomy_tag_translation`

`tag_id UUID FK`, `locale_code VARCHAR(5) FK`, `name VARCHAR(100)`,
`slug VARCHAR(120)`; PK `(tag_id, locale_code)`, unique
`(locale_code, slug)`.

### `destination_tag`

`destination_id UUID FK`, `tag_id UUID FK`; PK
`(destination_id, tag_id)`.

### `destination_media`

`destination_id UUID FK`, `media_id UUID FK`, `usage_type VARCHAR(30)`,
`sort_order SMALLINT`, `is_cover BOOLEAN NOT NULL DEFAULT FALSE`; PK
`(destination_id, media_id, usage_type)`. Enforce one cover per
destination/usage type using a partial unique index if supported.

### `destination_facility`

`id UUID PK`, `code VARCHAR(60) UNIQUE`.

### `destination_facility_translation`

`facility_id UUID FK`, `locale_code VARCHAR(5) FK`, `name VARCHAR(100)`;
PK `(facility_id, locale_code)`.

### `destination_facility_link`

`destination_id UUID FK`, `facility_id UUID FK`,
`availability_note VARCHAR(250) NULL`; PK
`(destination_id, facility_id)`.

### `destination_related`

`destination_id UUID FK`, `related_destination_id UUID FK`,
`relation_type VARCHAR(30)`, `sort_order SMALLINT`; PK
`(destination_id, related_destination_id, relation_type)`, CHECK
destination differs from related destination.

## 5.5 Articles, guides এবং itinerary

### `editorial_content`

Common identity/status table: `id UUID PK`,
`content_type VARCHAR(30) NOT NULL`, `status VARCHAR(24) NOT NULL`,
`author_id UUID FK`, `reviewer_id UUID NULL FK`,
`published_at TIMESTAMPTZ NULL`, `scheduled_at TIMESTAMPTZ NULL`,
`created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`.

### `editorial_translation`

`content_id UUID FK`, `locale_code VARCHAR(5) FK`,
`title VARCHAR(220) NOT NULL`, `slug VARCHAR(240) NOT NULL`,
`excerpt VARCHAR(600) NULL`, `body_content TEXT NOT NULL`,
`seo_title VARCHAR(70) NULL`, `seo_description VARCHAR(170) NULL`; PK
`(content_id, locale_code)`, unique `(locale_code, slug)`.

### `editorial_destination_link`

`content_id UUID FK`, `destination_id UUID FK`, `link_role VARCHAR(30)`,
`sort_order SMALLINT`; PK `(content_id, destination_id, link_role)`.

### `editorial_media`

`content_id UUID FK`, `media_id UUID FK`, `usage_type VARCHAR(30)`,
`sort_order SMALLINT`; PK `(content_id, media_id, usage_type)`.

### `editorial_tag`

`content_id UUID FK`, `tag_id UUID FK`; PK `(content_id, tag_id)`.

### `itinerary`

`id UUID PK`, `editorial_content_id UUID UNIQUE FK → editorial_content`,
`duration_days SMALLINT CHECK (duration_days > 0)`,
`difficulty VARCHAR(20) NULL`.

### `itinerary_stop`

`id UUID PK`, `itinerary_id UUID FK`, `destination_id UUID FK`,
`day_number SMALLINT CHECK (day_number > 0)`,
`stop_order SMALLINT CHECK (stop_order > 0)`,
`duration_minutes INTEGER NULL CHECK (duration_minutes > 0)`,
`travel_note TEXT NULL`; unique
`(itinerary_id, day_number, stop_order)`.

## 5.6 CMS pages, sections, menus এবং settings

### `cms_page`

`id UUID PK`, `page_type VARCHAR(40)`, `status VARCHAR(24)`,
`created_by UUID FK`, `updated_by UUID FK`,
`published_at TIMESTAMPTZ NULL`, `created_at TIMESTAMPTZ`,
`updated_at TIMESTAMPTZ`.

### `cms_page_translation`

`page_id UUID FK`, `locale_code VARCHAR(5) FK`, `title VARCHAR(220)`,
`slug VARCHAR(240)`, `seo_title VARCHAR(70) NULL`,
`seo_description VARCHAR(170) NULL`; PK `(page_id, locale_code)`, unique
`(locale_code, slug)`.

### `cms_page_section`

`id UUID PK`, `page_id UUID FK`, `section_type VARCHAR(50)`,
`sort_order SMALLINT`, `is_enabled BOOLEAN`,
`layout_variant VARCHAR(40)`, `config JSONB NULL`,
`starts_at TIMESTAMPTZ NULL`, `ends_at TIMESTAMPTZ NULL`; index
`(page_id, sort_order)`. `config`-এ only presentation options রাখুন; core
destination/service data copy করবেন না। `section_type` approved
registry-এর সঙ্গে validate হবে।

### `cms_section_translation`

`section_id UUID FK`, `locale_code VARCHAR(5) FK`,
`heading VARCHAR(220) NULL`, `subheading VARCHAR(500) NULL`,
`cta_label VARCHAR(80) NULL`, `cta_url TEXT NULL`; PK
`(section_id, locale_code)`.

### `cms_section_content_link`

`section_id UUID FK`, `content_type VARCHAR(30)`, `content_id UUID`,
`sort_order SMALLINT`; PK `(section_id, content_type, content_id)`.
Polymorphic target-এর FK database দিয়ে সরাসরি enforce হয় না; strong
integrity চাইলে destination/editorial/page-specific link tables ব্যবহার
করুন।

### `cms_menu`

`id UUID PK`, `menu_code VARCHAR(40) UNIQUE`, `is_active BOOLEAN`.

### `cms_menu_item`

`id UUID PK`, `menu_id UUID FK`,
`parent_item_id UUID NULL FK → cms_menu_item`, `sort_order SMALLINT`,
`link_type VARCHAR(30)`, `internal_url TEXT NULL`,
`external_url TEXT NULL`, `is_enabled BOOLEAN`; index
`(menu_id, parent_item_id, sort_order)`.

### `cms_menu_item_translation`

`menu_item_id UUID FK`, `locale_code VARCHAR(5) FK`,
`label VARCHAR(120)`, `aria_label VARCHAR(160) NULL`; PK
`(menu_item_id, locale_code)`.

### `cms_site_setting`

`id UUID PK`, `setting_key VARCHAR(100) UNIQUE`,
`setting_type VARCHAR(30)`, `is_public BOOLEAN`, `updated_by UUID FK`,
`updated_at TIMESTAMPTZ`. Keep secrets out of public CMS settings and
store secrets in a secrets manager/environment.

### `cms_site_setting_translation`

`setting_id UUID FK`, `locale_code VARCHAR(5) FK`, `text_value TEXT`; PK
`(setting_id, locale_code)`.

## 5.7 Review workflow, comments, versioning

### `workflow_submission`

`id UUID PK`, `entity_type VARCHAR(40)`, `entity_id UUID`,
`submitted_by UUID FK`, `assigned_reviewer UUID NULL FK`,
`status VARCHAR(30)`, `submitted_at TIMESTAMPTZ`,
`resolved_at TIMESTAMPTZ NULL`.

### `workflow_comment`

`id UUID PK`, `submission_id UUID FK`, `author_id UUID FK`,
`comment_text TEXT NOT NULL`, `visibility VARCHAR(20)`,
`created_at TIMESTAMPTZ`.

### `workflow_event`

`id UUID PK`, `submission_id UUID FK`, `actor_id UUID FK`,
`from_status VARCHAR(30) NULL`, `to_status VARCHAR(30)`,
`event_note TEXT NULL`, `created_at TIMESTAMPTZ`.

### `content_revision`

`id UUID PK`, `entity_type VARCHAR(40)`, `entity_id UUID`,
`revision_number INTEGER`, `snapshot JSONB NOT NULL`,
`created_by UUID FK`, `created_at TIMESTAMPTZ`; unique
`(entity_type, entity_id, revision_number)`. Snapshot is immutable
history, not the canonical current content.

For high-integrity FK constraints, replace generic entity references
with type-specific revision tables or a shared content root table.

## 5.8 Search, wishlist, saved trips, newsletter

### `user_wishlist`

`id UUID PK`, `user_id UUID FK`, `created_at TIMESTAMPTZ`,
`name VARCHAR(120) NULL`.

### `wishlist_item`

`id UUID PK`, `wishlist_id UUID FK`, `target_type VARCHAR(30)`,
`target_id UUID`, `created_at TIMESTAMPTZ`; unique
`(wishlist_id, target_type, target_id)`. For strict referential
integrity use separate destination/editorial/service wishlist item
tables.

### `saved_trip`

`id UUID PK`, `user_id UUID FK`, `name VARCHAR(160)`,
`start_date DATE NULL`, `end_date DATE NULL`, `visibility VARCHAR(20)`,
`created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`.

### `saved_trip_stop`

`id UUID PK`, `saved_trip_id UUID FK`, `destination_id UUID FK`,
`visit_date DATE NULL`, `sort_order SMALLINT`, `user_note TEXT NULL`;
unique `(saved_trip_id, sort_order)`.

### `newsletter_subscription`

`id UUID PK`, `email VARCHAR(254) NOT NULL`,
`locale_code VARCHAR(5) FK`, `status VARCHAR(20)`,
`consent_at TIMESTAMPTZ`, `confirmed_at TIMESTAMPTZ NULL`,
`unsubscribed_at TIMESTAMPTZ NULL`,
`confirmation_token_hash VARCHAR(255) NULL`; unique normalized email.
Store consent evidence and retention rules.

### `contact_submission`

`id UUID PK`, `name VARCHAR(120)`, `email VARCHAR(254)`,
`topic VARCHAR(60)`, `message TEXT`, `status VARCHAR(24)`,
`assigned_to UUID NULL FK`, `created_at TIMESTAMPTZ`,
`resolved_at TIMESTAMPTZ NULL`. Rate-limit and anti-spam protect this
endpoint.

### `analytics_event`

`id UUID PK`, `anonymous_id UUID NULL`, `user_id UUID NULL FK`,
`event_name VARCHAR(80)`, `entity_type VARCHAR(40) NULL`,
`entity_id UUID NULL`, `session_id UUID NULL`,
`occurred_at TIMESTAMPTZ`, `consent_state VARCHAR(30)`,
`properties JSONB NULL`. Define retention, access controls and
privacy-safe event properties; do not log passwords, payment credentials
or sensitive form content.

------------------------------------------------------------------------

# 6. Marketplace, supplier, booking ও financial schema---Phase 2

## 6.1 Provider registry

### `provider`

`id UUID PK`, `legal_name VARCHAR(220)`, `display_name VARCHAR(180)`,
`provider_type VARCHAR(40)`, `verification_status VARCHAR(24)`,
`status VARCHAR(24)`, `primary_contact_name VARCHAR(120)`,
`contact_email VARCHAR(254)`, `contact_phone VARCHAR(20)`,
`created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`.

### `provider_user`

`provider_id UUID FK`, `user_id UUID FK`, `provider_role VARCHAR(40)`,
`is_active BOOLEAN`, `assigned_at TIMESTAMPTZ`; PK
`(provider_id, user_id)`.

### `provider_document`

`id UUID PK`, `provider_id UUID FK`, `media_id UUID FK`,
`document_type VARCHAR(50)`, `verification_status VARCHAR(24)`,
`expires_at DATE NULL`, `reviewed_by UUID NULL FK`,
`created_at TIMESTAMPTZ`.

### `provider_contract`

`id UUID PK`, `provider_id UUID FK`,
`contract_reference VARCHAR(100) UNIQUE`, `starts_on DATE`,
`ends_on DATE NULL`, `commission_plan_id UUID NULL FK`,
`status VARCHAR(24)`, `approved_by UUID NULL FK`.

### `provider_integration`

`id UUID PK`, `provider_id UUID FK`, `integration_type VARCHAR(30)`,
`base_endpoint TEXT NULL`, `credential_reference VARCHAR(200) NULL`,
`sync_mode VARCHAR(30)`, `last_sync_at TIMESTAMPTZ NULL`,
`status VARCHAR(24)`. Secret credential values must not be stored as
plaintext in this table.

## 6.2 Services and inventory

### `service`

`id UUID PK`, `provider_id UUID FK`, `service_type VARCHAR(40)`,
`district_id UUID NULL FK`, `status VARCHAR(24)`,
`verification_status VARCHAR(24)`, `created_at TIMESTAMPTZ`,
`updated_at TIMESTAMPTZ`.

### `service_translation`

`service_id UUID FK`, `locale_code VARCHAR(5) FK`, `name VARCHAR(220)`,
`slug VARCHAR(240)`, `description TEXT`, `terms TEXT NULL`; PK
`(service_id, locale_code)`, unique `(locale_code, slug)`.

### `service_media`

`service_id UUID FK`, `media_id UUID FK`, `sort_order SMALLINT`,
`is_cover BOOLEAN`; PK `(service_id, media_id)`.

### `service_price`

`id UUID PK`, `service_id UUID FK`, `price_type VARCHAR(40)`,
`amount NUMERIC(12,2) CHECK (amount >= 0)`, `currency CHAR(3)`,
`valid_from TIMESTAMPTZ`, `valid_to TIMESTAMPTZ NULL`,
`is_active BOOLEAN`; index
`(service_id, is_active, valid_from, valid_to)`. Currency and effective
date are required for auditable price history.

### `inventory_unit`

`id UUID PK`, `service_id UUID FK`, `unit_code VARCHAR(80)`,
`unit_type VARCHAR(30)`, `capacity INTEGER NULL`, `is_active BOOLEAN`;
unique `(service_id, unit_code)`.

### `inventory_availability`

`id UUID PK`, `inventory_unit_id UUID FK`, `starts_at TIMESTAMPTZ`,
`ends_at TIMESTAMPTZ`,
`total_quantity INTEGER CHECK (total_quantity >= 0)`,
`held_quantity INTEGER CHECK (held_quantity >= 0)`,
`booked_quantity INTEGER CHECK (booked_quantity >= 0)`,
`updated_at TIMESTAMPTZ`; unique
`(inventory_unit_id, starts_at, ends_at)`. Availability changes require
transactional locking or an equivalent concurrency-safe reservation
mechanism.

## 6.3 Booking

### `booking`

`id UUID PK`, `booking_reference VARCHAR(40) UNIQUE`,
`customer_id UUID FK`, `status VARCHAR(30)`, `currency CHAR(3)`,
`subtotal NUMERIC(12,2)`, `discount_total NUMERIC(12,2)`,
`tax_total NUMERIC(12,2)`, `grand_total NUMERIC(12,2)`,
`customer_note TEXT NULL`, `created_at TIMESTAMPTZ`,
`updated_at TIMESTAMPTZ`, `confirmed_at TIMESTAMPTZ NULL`,
`cancelled_at TIMESTAMPTZ NULL`.

### `booking_item`

`id UUID PK`, `booking_id UUID FK`, `service_id UUID FK`,
`provider_id UUID FK`, `service_name_snapshot VARCHAR(220)`,
`unit_price NUMERIC(12,2)`, `quantity INTEGER CHECK (quantity > 0)`,
`line_total NUMERIC(12,2)`, `service_date DATE NULL`,
`starts_at TIMESTAMPTZ NULL`, `ends_at TIMESTAMPTZ NULL`,
`provider_confirmation_code VARCHAR(100) NULL`, `status VARCHAR(30)`.
Snapshot fields preserve what was purchased if the listing later
changes.

### `booking_status_event`

`id UUID PK`, `booking_id UUID FK`, `from_status VARCHAR(30) NULL`,
`to_status VARCHAR(30)`, `actor_id UUID NULL FK`, `reason TEXT NULL`,
`created_at TIMESTAMPTZ`.

### `booking_guest`

`id UUID PK`, `booking_item_id UUID FK`, `guest_type VARCHAR(30)`,
`display_name VARCHAR(160) NULL`, `age_band VARCHAR(30) NULL`,
`created_at TIMESTAMPTZ`. Collect only necessary personal data; avoid
storing passport/ID data unless required and protected by a specific
policy.

## 6.4 Payment, refund, affiliate and settlement

### `payment`

`id UUID PK`, `booking_id UUID FK`, `provider_gateway VARCHAR(60)`,
`gateway_reference VARCHAR(160) NULL`,
`idempotency_key VARCHAR(120) UNIQUE`, `amount NUMERIC(12,2)`,
`currency CHAR(3)`, `status VARCHAR(24)`, `created_at TIMESTAMPTZ`,
`completed_at TIMESTAMPTZ NULL`. Never store card PAN/CVV or gateway
secret.

### `payment_event`

`id UUID PK`, `payment_id UUID FK`, `event_type VARCHAR(40)`,
`gateway_event_id VARCHAR(160) NULL`, `payload_hash VARCHAR(128) NULL`,
`received_at TIMESTAMPTZ`, `processed_at TIMESTAMPTZ NULL`; unique
gateway event ID where supplied.

### `refund`

`id UUID PK`, `payment_id UUID FK`,
`amount NUMERIC(12,2) CHECK (amount > 0)`, `reason TEXT`,
`status VARCHAR(24)`, `requested_by UUID FK`,
`approved_by UUID NULL FK`, `created_at TIMESTAMPTZ`,
`processed_at TIMESTAMPTZ NULL`.

### `affiliate_partner`

`id UUID PK`, `name VARCHAR(180)`, `status VARCHAR(24)`,
`default_attribution_days INTEGER`, `created_at TIMESTAMPTZ`.

### `affiliate_campaign`

`id UUID PK`, `partner_id UUID FK`, `campaign_name VARCHAR(180)`,
`tracking_code VARCHAR(100) UNIQUE`, `target_url TEXT`,
`starts_at TIMESTAMPTZ NULL`, `ends_at TIMESTAMPTZ NULL`,
`status VARCHAR(24)`.

### `affiliate_click`

`id UUID PK`, `campaign_id UUID FK`, `anonymous_id UUID NULL`,
`user_id UUID NULL FK`, `clicked_at TIMESTAMPTZ`,
`referrer_host VARCHAR(255) NULL`, `attribution_id UUID UNIQUE`; do not
retain full IP longer than policy requires.

### `commission_plan`

`id UUID PK`, `name VARCHAR(160)`, `calculation_type VARCHAR(20)`,
`rate NUMERIC(7,4)`, `fixed_amount NUMERIC(12,2) NULL`,
`currency CHAR(3) NULL`, `starts_at TIMESTAMPTZ`,
`ends_at TIMESTAMPTZ NULL`, `status VARCHAR(24)`.

### `commission_entry`

`id UUID PK`, `booking_item_id UUID NULL FK`,
`affiliate_click_id UUID NULL FK`, `provider_id UUID NULL FK`,
`commission_plan_id UUID FK`, `basis_amount NUMERIC(12,2)`,
`commission_amount NUMERIC(12,2)`, `currency CHAR(3)`,
`status VARCHAR(24)`, `created_at TIMESTAMPTZ`. A commission calculation
must identify exactly which business event it belongs to and must be
reversible through adjustment entries rather than silently overwritten.

### `provider_payout`

`id UUID PK`, `provider_id UUID FK`, `period_start DATE`,
`period_end DATE`, `currency CHAR(3)`, `gross_amount NUMERIC(12,2)`,
`commission_amount NUMERIC(12,2)`, `refund_adjustment NUMERIC(12,2)`,
`net_amount NUMERIC(12,2)`, `status VARCHAR(24)`,
`approved_by UUID NULL FK`, `paid_at TIMESTAMPTZ NULL`.

### `payout_line`

`id UUID PK`, `payout_id UUID FK`, `booking_item_id UUID NULL FK`,
`commission_entry_id UUID NULL FK`, `line_type VARCHAR(30)`,
`amount NUMERIC(12,2)`, `currency CHAR(3)`.

### `audit_event`

`id UUID PK`, `actor_id UUID NULL FK`, `action VARCHAR(100)`,
`object_type VARCHAR(60)`, `object_id UUID NULL`,
`occurred_at TIMESTAMPTZ`, `request_id UUID NULL`,
`ip_address INET NULL`, `change_summary JSONB NULL`. Restrict access;
redact secrets and personal data.

------------------------------------------------------------------------

# 7. CRM schema---Phase 3

### `crm_case`

`id UUID PK`, `case_reference VARCHAR(40) UNIQUE`,
`customer_id UUID NULL FK`, `booking_id UUID NULL FK`,
`case_type VARCHAR(40)`, `priority VARCHAR(20)`, `status VARCHAR(24)`,
`assigned_to UUID NULL FK`, `subject VARCHAR(220)`,
`created_at TIMESTAMPTZ`, `resolved_at TIMESTAMPTZ NULL`.

### `crm_case_message`

`id UUID PK`, `case_id UUID FK`, `author_id UUID NULL FK`,
`message TEXT`, `is_internal_note BOOLEAN`, `created_at TIMESTAMPTZ`.

### `crm_case_event`

`id UUID PK`, `case_id UUID FK`, `actor_id UUID NULL FK`,
`from_status VARCHAR(24) NULL`, `to_status VARCHAR(24)`,
`created_at TIMESTAMPTZ`.

------------------------------------------------------------------------

# 9. Indexing ও high-volume search strategy

## 9.1 Baseline indexes

-   Every PK automatically indexed.
-   Every FK frequently used for joins/filtering should be indexed;
    PostgreSQL does not automatically index every referencing FK.
-   Unique indexes: email, locale+slug, booking reference, provider
    contract reference, tracking code, gateway event idempotency keys.
-   Geography: `geo_district(division_id)`, `geo_upazila(district_id)`,
    `destination(district_id, status, published_at DESC)`.
-   Published content: `(status, published_at DESC)`; translation slug
    unique `(locale_code, slug)`.
-   Junctions: both directions where reverse lookup is common,
    e.g. destination-category and editorial-tag.
-   CMS: `cms_page_section(page_id, sort_order)`, workflow queue
    `(status, submitted_at)`, assigned reviewer/status.
-   Provider/services: `(provider_id, status)`,
    `(service_type, status, district_id)`.
-   Booking: `(customer_id, created_at DESC)`, `(status, created_at)`,
    `(provider_id, status)` on appropriate booking item/service tables.
-   Financial: `(status, created_at)`, payout provider/period, journal
    entry date/period.
-   Analytics events: time-based index and selected event dimensions;
    partition by month when volume justifies it.

Avoid indexing every column. Indexes consume disk and slow writes;
verify with representative data and `EXPLAIN (ANALYZE, BUFFERS)`.

## 9.2 Search implementation

1.  Phase 1: PostgreSQL full-text search over approved locale-specific
    content, combined with indexed filters and exact slug lookups.
2.  For Bangla/English search, test stemming/tokenization and ranking
    against real queries; language-specific dictionaries may not fully
    support Bangla, so trigram/fuzzy matching and curated aliases may be
    needed.
3.  Maintain a `search_alias` table for alternative names, spelling
    variants, transliterations and common misspellings.
4.  Use `pg_trgm` GIN/GiST index for similarity where tested; use GIN on
    `tsvector` for full-text search. Do not rely on a generic JSONB
    index for all search.
5.  Query only published, locale-eligible content. Permission-sensitive
    service/admin data must not leak into public results.
6.  Use bounded pagination, max page size, query timeout and rate limit;
    avoid unbounded wildcard scans.
7.  Add external search engine only when relevance, typo tolerance,
    geo-search or volume requires it; database remains source of truth.
8.  Record search analytics in privacy-safe form: query category, result
    count, click-through; avoid indefinite retention of identifiable raw
    searches.

### Suggested search tables

`search_alias(id UUID PK, entity_type VARCHAR(30), entity_id UUID, locale_code VARCHAR(5) FK, alias_text VARCHAR(220), normalized_alias VARCHAR(220))`;
index `(locale_code, normalized_alias)` and trigram index on normalized
alias. For strict FK integrity use separate destination/editorial alias
tables.

`search_document` is optional denormalized search projection, not
canonical data. If used, fields may include `entity_type`, `entity_id`,
`locale_code`, `title`, `summary`, `search_vector`, `published_at`;
refresh through reliable background jobs and rebuild from canonical
tables.

## 9.3 Data growth

-   Use pagination and limit/offset for small lists; cursor/keyset
    pagination for large, frequently changing feeds.
-   Archive/partition analytics and high-volume event tables by time.
-   Cache public destination/detail responses carefully; invalidate
    cache on publish/update.
-   Never cache personalized dashboard/financial responses in shared
    public cache.
-   Load test with projected records and concurrent searches, not just a
    handful of sample rows.

------------------------------------------------------------------------

# 10. Backend architecture

## 10.1 Logical layers

1.  **API/transport layer:** request parsing, authentication,
    throttling, serialization, versioned endpoints.
2.  **Application/service layer:** use cases such as publish content,
    submit review, create booking, refund, settle payout.
3.  **Domain layer:** business rules, status transitions,
    price/commission calculations, availability invariants.
4.  **Persistence layer:** relational models, transactions,
    repositories/query services, constraints.
5.  **Async jobs:** image variants, scheduled publishing, notifications,
    search indexing, provider sync, reports.
6.  **Integration adapters:** payment gateway, email/SMS, maps,
    affiliate partner APIs.
7.  **Observability:** structured logs, metrics, traces, error
    monitoring, audit events.
8.  **Admin/CMS UI APIs:** separate permission boundaries from public
    APIs.
9.  **Public API:** only published and approved content; no internal
    fields.
10. **Versioning:** `/api/v1/` and compatibility policy for future
    portals.

## 10.2 Suggested domain modules

-   `accounts`: users, profile, authentication, roles and scopes.
-   `geography`: division/district/upazila and location.
-   `media`: asset metadata and processing.
-   `destinations`: spots, categories, facilities, relations.
-   `editorial`: articles, guides, itinerary.
-   `cms`: pages, sections, menus, site settings, translations.
-   `workflow`: review, comments, revision and audit.
-   `search`: aliases, query, ranking and indexing.
-   `engagement`: wishlist, saved trips, newsletter.
-   `providers`: onboarding, contract, documents, staff.
-   `services_inventory`: service listings, price and availability.
-   `bookings`: reservation lifecycle and status history.
-   `payments`: gateway adapter, transaction, refund.
-   `affiliate`: click attribution and commission.
-   `settlements`: provider payouts and reconciliation.
-   `crm`: cases and support.
-   `analytics`: privacy-safe events and reporting.
-   `notifications`: email/SMS/in-app delivery and retries.

Use a modular monolith initially, with explicit module boundaries and
transactional database. Do not start with microservices without
operational need. Extract a service only when independent
scaling/team/security boundary justifies it.

## 10.3 API endpoint groups (illustrative)

Public: - `GET /api/v1/site-config/` -
`GET /api/v1/navigation/{menu_code}/` -
`GET /api/v1/pages/{slug}/?locale=bn` - `GET /api/v1/destinations/` -
`GET /api/v1/destinations/{slug}/` -
`GET /api/v1/geography/divisions/` -
`GET /api/v1/geography/districts/?division=...` -
`GET /api/v1/search/?q=...&locale=bn` - `GET /api/v1/editorial/` -
`GET /api/v1/editorial/{slug}/`

Authenticated user: - `POST /api/v1/auth/register/` -
`POST /api/v1/auth/login/` - `POST /api/v1/auth/logout/` -
`POST /api/v1/auth/password-reset/` - `GET/PATCH /api/v1/me/` -
`GET/POST/DELETE /api/v1/me/wishlists/...` -
`GET/POST /api/v1/me/trips/`

CMS/admin: - `/api/v1/admin/content/` - `/api/v1/admin/reviews/` -
`/api/v1/admin/media/` - `/api/v1/admin/pages/` -
`/api/v1/admin/users/roles/`

Marketplace (Phase 2): - `/api/v1/providers/`,
`/api/v1/provider/services/`, `/api/v1/provider/inventory/` -
`/api/v1/bookings/`, `/api/v1/payments/`, `/api/v1/refunds/` -
`/api/v1/provider/payouts/`

Endpoint list is illustrative; each endpoint requires explicit
request/response schema, permissions, rate limits and error contract.

------------------------------------------------------------------------

# 11. Authentication, authorization ও security

## 11.1 Authentication

-   Use a proven framework authentication implementation; never design
    password cryptography manually.
-   Password hashing via Argon2id or appropriately configured supported
    password hasher; no plaintext passwords.
-   Email verification and secure password reset with short-lived,
    single-use, hashed tokens.
-   JWT can be used for API authentication, but define short
    access-token lifetime, refresh-token rotation/revocation and logout
    semantics.
-   Browser app: prefer Secure, HttpOnly, SameSite cookies for
    refresh/session credentials where architecture allows; protect
    cookie-authenticated state-changing requests with CSRF controls. Do
    not store long-lived secrets in localStorage.
-   Enforce login throttling, suspicious-attempt monitoring, generic
    reset responses, session/device revocation.
-   Require MFA for superadmins and finance-sensitive roles; consider
    for all staff.
-   Admin-generated temporary credential must be single-use,
    short-lived, stored hashed, delivered through verified channel, and
    force reset at first use. Prefer self-service reset over an admin
    reading/providing an OTP.
-   Email/phone change requires re-verification and audit; do not make
    immutable contact details an absolute rule if a secure
    verified-change workflow is required.

## 11.2 Authorization: RBAC + ABAC

-   RBAC controls actions: view, create, edit, submit, review, publish,
    delete, export, approve, settle.
-   ABAC restricts scope: assigned portal, provider, division/district,
    content ownership, department, financial period.
-   Enforce permission in every backend request/service, not only by
    hiding UI buttons.
-   Deny by default; least privilege; explicit object-level permission
    checks.
-   Prevent privilege escalation: user cannot assign their own role or
    change protected role fields.
-   Separate duties: content creator vs publisher; high-value refund/payout preparer vs
    approver.
-   Regularly review inactive accounts, role assignments and provider
    staff.

## 11.3 Web/API protections

-   HTTPS everywhere; HSTS after HTTPS deployment is confirmed.
-   CORS allowlist; do not use wildcard credentials.
-   CSRF protection where cookie authentication is used.
-   Input validation, output encoding, ORM parameterization, file
    type/size limits.
-   SSRF protection for external URL fetches and webhook callbacks.
-   Secure upload pipeline: MIME/signature validation, randomized
    storage key, malware scan where feasible, image re-encoding, no
    executable public uploads.
-   Rate limits by IP/account/endpoint; stronger controls for login,
    OTP, search, contact, booking and payment.
-   API pagination caps; request body size limits; timeouts.
-   Webhook signature validation, timestamp/replay protection,
    idempotent processing.
-   Security headers, CSP compatible with the frontend, safe error
    responses.
-   Dependency scanning, patching, secret scanning and least-privilege
    production credentials.
-   No secrets in source control, client bundles, logs or CMS.
-   Avoid leaking PII in logs; define data retention and access audit.
-   Incident response process, backup restore drills and key rotation.

## 11.4 Booking transaction, payment ও refund security

-   Never store card number/CVV. Use gateway-hosted
    checkout/tokenization.
-   Amount and currency must be recalculated/validated server-side;
    never trust client totals.
-   Idempotency keys for create payment/refund operations.
-   Verify signed webhook and reconcile gateway records periodically.
-   Use immutable transaction events and adjustment/refund entries.
-   Restrict payment, refund, commission and payout endpoints to authorized roles and approved states.
-   Audit exports, payout account changes and high-value transactions.
-   Payment success page alone is not proof of payment; verified gateway
    event/reconciliation determines status.

------------------------------------------------------------------------

# 12. Content workflow এবং data quality

1.  Author creates draft.
2.  Required fields, translations, media licence, geography and slug
    validated.
3.  Author submits for review; submitted version becomes immutable or
    changes are tracked.
4.  Reviewer receives queue item; comments and decision recorded.
5.  "Changes requested" returns item to author with required actions.
6.  Resubmission creates a new workflow event/revision.
7.  Authorized publisher approves/schedules publication.
8.  Public API exposes only published content whose schedule window is
    active.
9.  Update/unpublish invalidates cache and refreshes search index.
10. Audit record records actor, time, action and entity.
11. Critical destination changes (location/safety/official information)
    may require elevated review.
12. Translation status tracked separately; one locale should not
    silently display incorrect content from another locale without
    configured fallback.

------------------------------------------------------------------------

# 13. Implementation roadmap

## Phase 0 --- Discovery and design

1.  Confirm MVP scope and exclude deferred modules explicitly.
2.  Prepare sitemap, user journeys and role/permission matrix.
3.  Produce desktop/mobile wireframes and clickable prototype.
4.  Finalize relational ERD, field dictionary, status transitions and
    data-retention rules.
5.  Define design system and CMS section catalogue.
6.  Set acceptance criteria and baseline performance/security goals.

**Exit criteria:** approved scope, ERD, UI prototype, API contract draft
and implementation backlog.

## Phase 1 --- Foundation

1.  Repository, environments, configuration/secrets, CI checks.
2.  Relational schema/migrations, custom user model, roles and
    permission tests.
3.  Geography import for 8 divisions/64 districts plus verified
    subdistrict data as sourced.
4.  Media storage pipeline and metadata.
5.  Logging, error handling, audit events, backup automation.
6.  Authentication, verification, reset, staff MFA policy.

**Exit criteria:** migrations reproducible; test restore succeeds;
unauthorized access tests pass.

## Phase 2 --- CMS and content

1.  Destination/category/tag/facility models and translations.
2.  Article/guide/itinerary models.
3.  CMS page/section/menu/settings.
4.  Review workflow, revisions, comments, schedule publishing.
5.  Media rights/alt-text checks, SEO metadata, preview.
6.  Seed and import tools with validation report.

**Exit criteria:** editor can build/update homepage from approved
sections without code edits; publish/unpublish and rollback work.

## Phase 3 --- Public frontend

1.  Implement shared design tokens and accessible component library.
2.  Header/footer, hero, cards, search and navigation.
3.  Homepage and geography/destination listing.
4.  Destination detail, article, guide, itinerary.
5.  Locale switcher, responsive behavior and SEO rendering.
6.  Search/filter, empty/error/loading states.
7.  Performance/accessibility test and usability test.

**Exit criteria:** core journeys complete on mobile/desktop; no blocking
accessibility defects; search and content freshness validated.

## Phase 4 --- User account

1.  Profile, wishlist, saved trip.
2.  Notification centre and consent controls.
3.  Account history and privacy request workflow.
4.  Rate-limit and abuse testing.

## Phase 5 --- Marketplace readiness

1.  Provider onboarding and verification.
2.  Provider roles/scopes and agent dashboard.
3.  Service catalogue, price history, availability.
4.  Booking state machine and concurrency tests.
5.  Payment gateway sandbox, webhook validation, refund workflow.
6.  Affiliate attribution, commission ledger and payout reconciliation.
7.  Legal/policy review before real payments.

## Phase 6 --- Multi-portal

1.  Portal registry/domain mapping, portal-specific
    navigation/theme/settings.
2.  Content publication scope per portal and locale.
3.  API scopes, cache separation, SEO/canonical rules.
4.  Portal isolation and cross-portal permission tests.
5.  Add a second portal as a proof of architecture before mass rollout.

## Phase 7 --- Multi-portal, support/CRM ও recommendation

1. একই central tourism database ও content-management workflow ব্যবহার করে portal-specific presentation configuration চালু করুন।
2. Support case, customer feedback, moderation queue ও service escalation যোগ করুন।
3. Consent-aware analytics ও recommendation features চালু করুন; পর্যাপ্ত data না থাকলে popularity বা personalization দাবি করবেন না।
4. প্রতিটি নতুন portal-এর domain mapping, locale, theme tokens, navigation, SEO/canonical policy, permissions এবং release tests আলাদাভাবে যাচাই করুন.

# 14. Testing and acceptance criteria

## Functional

-   Every public page is rendered from CMS-backed content.
-   Bangla/English switch changes all available UI/content translations
    consistently.
-   Draft/review/publish/unpublish and scheduled publication behave
    correctly.
-   Geography filters return correct results; invalid parent
    relationships rejected.
-   Search handles exact, partial and known alias queries; pagination
    stable.
-   User can manage profile, wishlist and saved trips only for their own
    account.
-   Provider user can manage only their provider's services.
-   Booking/availability updates are concurrency-safe.
-   Payment webhook duplicate delivery does not duplicate payment or
    booking.
-   Refund/payout/commission calculations reconcile against test
    scenarios.

## Security

-   Object-level access tests for every protected endpoint.
-   Role escalation attempts fail.
-   CSRF/CORS/XSS/SQL injection/file upload/rate-limit tests.
-   Expired/reused reset token rejected.
-   Admin MFA and session revocation verified.
-   Webhook signature and replay tests pass.
-   Secrets/PII absent from client bundle and application logs.
-   Backup restore and incident recovery tested.

## UI/UX

-   Core tasks test with representative Bangla and English users.
-   Search-to-destination and destination-to-itinerary flows are
    understandable.
-   Mobile layout works at narrow widths without horizontal overflow.
-   Keyboard navigation and focus order verified.
-   Empty, loading, error, disabled and success states are consistent.
-   Images load in suitable dimensions; no severe layout shift.
-   Measure task completion, search success, abandonment, and
    support/contact confusion.

## Performance

-   Test with realistic destination/content volume and concurrent users.
-   Use query plans and slow-query monitoring.
-   Define p95 API latency budgets by endpoint class before load test.
-   No unbounded listing endpoints.
-   Search response time and result relevance measured using a
    representative query set.
-   Backup, restore, indexing and migrations tested on production-like
    data volume.

------------------------------------------------------------------------

# 15. Operations, backups and migration

1.  Separate development, staging and production environments.
2.  Production database must not rely on an ephemeral filesystem.
3.  Automated encrypted backups with retention policy and off-site copy.
4.  Define RPO/RTO; perform scheduled restore drills, not just
    backup-success checks.
5.  Monitor application errors, database connections, slow queries,
    storage, queue failures and payment reconciliation.
6.  Use migrations with pre-deployment checks and
    rollback/forward-recovery plans.
7.  SQLite-to-PostgreSQL migration requires schema/data compatibility
    review, ID/constraint validation, encoding/timezone checks, row
    counts and reconciliation.
8.  Test migration against a copy; freeze writes or use a planned
    cutover; preserve a verified pre-migration backup.
9.  Do not treat a provider's "free tier" as durable storage/backup
    guarantee; verify retention, suspension and export policy.
10. Establish incident response, contact ownership, credential rotation
    and recovery runbook.

------------------------------------------------------------------------

# 16. Important design decisions and cautions

1.  **Do not make one giant table.** Geography, translation,
    destination, media, content, users, booking and payment/commission records are separate
    domains.
2.  **Do not use generic polymorphic foreign keys indiscriminately.**
    They weaken database-level referential integrity. Use typed junction
    tables when data integrity matters.
3.  **Do not duplicate division names in destination records.** Derive
    via district relationship.
4.  **Do not store multiple IDs as comma-separated text.** Use junction
    tables.
5.  **Do not put passwords, OTPs, payment secrets or API keys in
    ordinary CMS settings.**
6.  **Do not assume all partners support API.** Maintain manual
    confirmation and provider-managed inventory paths.
7.  **Do not claim real-time availability when data is manually updated
    or stale.** Display last-updated/confirmation status.
8.  **Do not expose unreviewed content.** Public API must enforce
    publication status.
9.  **Do not treat JWT as a complete security strategy.** Session
    lifecycle, refresh rotation, cookie/CSRF policy and object
    permissions are equally important.
10. **Do not build every marketplace/payment feature simultaneously with the tourism
    MVP.** Establish boundaries now; deliver after the public content
    product is stable.
11. **Do not call a design "100% responsive" without device testing.**
    Use defined breakpoints, test cases and acceptance criteria.
12. **Do not optimize indexes by guesswork.** Benchmark representative
    queries and inspect query plans.
13. **Do not store every click forever.** Analytics require consent,
    minimization, retention and access policy.
14. **Do not permit unrestricted CMS HTML/JavaScript.** Use trusted
    section types and sanitized rich text.
15. **Do not let a single admin account perform every sensitive action
    without audit or separation of duties.**

------------------------------------------------------------------------

# 17. Deliverables checklist

## Product and UI

-   [ ] Product scope, phase boundaries and user journeys
-   [ ] Sitemap and responsive wireframes
-   [ ] Clickable prototype
-   [ ] Design tokens and component library
-   [ ] UI state/interaction specification
-   [ ] Accessibility and performance checklist

## Data

-   [ ] ERD with cardinality and delete rules
-   [ ] Field dictionary with types, nullability, defaults and
    constraints
-   [ ] 3NF review and functional dependency notes
-   [ ] Index plan tied to query patterns
-   [ ] Geography import specification
-   [ ] Migration and backup/restore runbook

## Backend and security

-   [ ] API contract and versioning policy
-   [ ] Permission matrix and ABAC scope rules
-   [ ] Authentication/session policy
-   [ ] Threat model and security test plan
-   [ ] Audit/retention/privacy policy
-   [ ] Integration and webhook specification

## Operations

-   [ ] Environment/secrets management
-   [ ] CI/CD and migration procedure
-   [ ] Monitoring/alerting
-   [ ] Backup and restore test evidence
-   [ ] Load test report
-   [ ] Incident response and operational ownership

------------------------------------------------------------------------

# 18. ZIP reference audit এবং tourism-specific implementation amendments

এই অধ্যায়টি ব্যবহারকারীর `loanly planet.zip` ফাইলের local notes, clone report, HTML capture, CSS/JS interaction layer এবং আগের tourism proposal-কে একত্র করে। ZIP-টি Lonely Planet homepage-এর একটি static/local capture; এটি সম্পূর্ণ source repository বা reusable licensed template নয়। ZIP report-এ homepage capture-এর 100 sections, 945 links, 121 image elements এবং 200 buttons-এর মতো high-density page structure নথিভুক্ত আছে। Local interaction layer বিশেষভাবে desktop mega-menu, overlay/backdrop, horizontal carousel arrows, newsletter validation এবং search-input focus আচরণ যোগ করেছে। এগুলো reference থেকে পর্যবেক্ষণ করা interaction patterns—আপনার প্রজেক্টে একই কনটেন্ট বা exact code কপি করার নির্দেশ নয়।

## 18.1 Reference থেকে গ্রহণযোগ্য design behaviour

1. **Editorial travel composition:** বড় image-led hero, পরিষ্কার display typography, section-ভিত্তিক editorial hierarchy, featured destination/story cards, horizontal discovery rows এবং যথেষ্ট whitespace.
2. **Mega-menu:** desktop-এ nav item activate করলে wide panel খুলবে; backdrop দিয়ে page content আলাদা হবে; Escape, বাইরে click, focus management ও route change-এ menu বন্ধ হবে। Hover শুধু enhancement; click/tap/keyboard সমর্থন আবশ্যক।
3. **Carousel:** previous/next controls, smooth horizontal scrolling, touch swipe, scroll-snap, disabled arrow state, keyboard access এবং reduced-motion preference. Carousel-এ hidden focusable items রাখা যাবে না।
4. **Search affordance:** header search button search field-এ focus দেবে বা accessible search overlay খুলবে; search suggestions backend index থেকে আসবে, hard-coded static list থেকে নয়।
5. **Newsletter:** backend validation, duplicate subscription handling, consent timestamp, verification/confirmation workflow ও success/error state. শুধু browser-side email regex subscription complete করে না।
6. **Responsive adaptation:** desktop mega-menu থেকে mobile drawer/accordion-এ পরিবর্তন; card grid, hero crop, font size, spacing ও controls breakpoint অনুযায়ী পুনর্বিন্যাস।
7. **Motion system:** menu panel, backdrop, card hover, carousel scroll, image reveal এবং page feedback-এ consistent short transitions. Motion decorative থাকবে; content পড়া বা action সম্পন্ন করা animation-এর উপর নির্ভর করবে না।
8. **System feedback:** loading, empty, error, success, disabled, selected এবং focus state প্রতিটি relevant control-এ নির্দিষ্টভাবে design করতে হবে।

## 18.2 Reference-এর visual fidelity বনাম স্বাধীন brand identity

- Lonely Planet-এর logo, proprietary font files, images, text, icon set, exact copy, CSS class structure বা original compiled JS production-এ ব্যবহার করা যাবে না, যদি না আলাদা বৈধ license থাকে। ZIP-এর `NOTES.md`-ও source assets-কে proprietary এবং local study only বলে চিহ্নিত করে।
- নতুন brand-এর জন্য নিজস্ব typography pairing, color tokens, icon rules, component radius, shadows, grid, motion curves ও image treatment নির্ধারণ করতে হবে।
- User নিজস্ব ছবি upload করবেন। প্রতিটি asset-এর alt text, caption/credit, usage rights, focal point, orientation এবং responsive crop variant CMS-এ নিয়ন্ত্রণযোগ্য হবে।
- “Lonely Planet-এর মতো” বলতে editorial quality, navigation clarity, image-led discovery এবং interaction patterns বোঝাবে—pixel-for-pixel clone নয়।

## 18.3 Tourism homepage-এর CMS-driven section registry

Homepage-এর প্রতিটি section backend থেকে configurable হবে, কিন্তু frontend arbitrary HTML/script render করবে না। অনুমোদিত section registry-তে অন্তত রাখুন:

- `hero_feature`
- `search_and_discovery`
- `browse_by_division`
- `featured_destinations_grid`
- `destination_carousel`
- `editorial_story_feature`
- `travel_guide_list`
- `itinerary_spotlight`
- `seasonal_collection`
- `category_explorer`
- `nearby_or_map_discovery` (location permission/valid coordinates থাকলেই)
- `provider_service_spotlight` (provider phase থেকে)
- `newsletter_signup`
- `custom_cta`

প্রতিটি section-এর configurable fields: heading/subheading per locale, section type, layout variant, sort order, visibility, start/end publication window, selected content references, CTA target, theme variant, background/foreground token, image aspect ratio, focal point override, mobile-specific asset (optional), carousel settings এবং analytics key. `config JSONB` কেবল validated presentation options-এর জন্য; canonical destination title, price বা article body JSON config-এ duplicate করবেন না।

## 18.4 Database schema-তে প্রস্তাবিত tourism-specific additions

নিচের additions-গুলো base schema-কে reference-driven UI এবং future CMS operations-এর জন্য আরও কার্যকর করবে। এগুলোকে 3NF-এর বাইরে অপ্রয়োজনীয় duplication হিসেবে নয়, স্বতন্ত্র entity/relationship হিসেবে model করতে হবে।

### `cms_page_section` — field extension

- `id UUID PK`
- `page_id UUID FK NOT NULL`
- `section_type VARCHAR(50) NOT NULL` — allowlisted registry value
- `sort_order SMALLINT NOT NULL`
- `is_enabled BOOLEAN NOT NULL DEFAULT TRUE`
- `layout_variant VARCHAR(40) NULL`
- `theme_variant VARCHAR(40) NULL`
- `config JSONB NULL` — schema-validated visual config only
- `starts_at TIMESTAMPTZ NULL`, `ends_at TIMESTAMPTZ NULL`
- `created_by UUID FK`, `updated_by UUID FK`, `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`
- Indexes: `(page_id, is_enabled, sort_order)`, `(starts_at, ends_at)` when scheduled publishing queries need it.

### `cms_section_content_link` — curated content ordering

- `id UUID PK`
- `section_id UUID FK NOT NULL`
- `destination_id UUID FK NULL`
- `editorial_content_id UUID FK NULL`
- `itinerary_id UUID FK NULL`
- `service_id UUID FK NULL` (marketplace phase)
- `sort_order SMALLINT NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- Constraint: each link row must identify exactly one supported target; implement with CHECK constraint. Unique index per section/target and index `(section_id, sort_order)`.
- এই type-specific FK approach generic `(content_type, content_id)`-এর চেয়ে referential integrity শক্তিশালী করে। Future content types এলে migration দিয়ে নতুন FK যোগ হবে।

### `media_asset` — editorial display fields

Existing `media_asset` schema-তে না থাকলে যোগ করুন:

- `alt_text_default VARCHAR(300) NULL`
- `credit_line VARCHAR(300) NULL`
- `rights_status VARCHAR(30) NOT NULL` — e.g. owned/licensed/permission_pending/restricted
- `rights_note TEXT NULL`
- `focal_x NUMERIC(5,4) NULL`, `focal_y NUMERIC(5,4) NULL` — normalized 0–1 coordinates
- `dominant_color CHAR(7) NULL` (optional UI placeholder)
- `width_px INTEGER NULL`, `height_px INTEGER NULL`
- `mime_type VARCHAR(100) NOT NULL`, `file_size_bytes BIGINT NOT NULL`
- `uploaded_by UUID FK`, `created_at TIMESTAMPTZ NOT NULL`
- Validate positive dimensions/size, focal point range 0–1, permitted MIME types, and image decode/content checks. Keep per-locale alt text/caption/credit in `media_asset_translation` where localized.

### `media_variant`

- `id UUID PK`, `asset_id UUID FK NOT NULL`
- `variant_key VARCHAR(40) NOT NULL` — original, hero_wide, card_landscape, portrait, thumbnail, mobile_hero
- `storage_key TEXT NOT NULL`, `width_px INTEGER NOT NULL`, `height_px INTEGER NOT NULL`
- `format VARCHAR(20) NOT NULL`, `file_size_bytes BIGINT NOT NULL`
- `created_at TIMESTAMPTZ NOT NULL`
- Unique `(asset_id, variant_key, format)`; index `(asset_id)`; ensure variant processing is idempotent.

### `cms_redirect`

- `id UUID PK`, `locale_code VARCHAR(5) FK NOT NULL`
- `source_path VARCHAR(500) NOT NULL`, `target_path VARCHAR(500) NOT NULL`
- `http_status SMALLINT NOT NULL` — allow only 301/302/307/308 as policy requires
- `is_active BOOLEAN NOT NULL DEFAULT TRUE`
- `created_by UUID FK`, `created_at TIMESTAMPTZ NOT NULL`
- Unique `(locale_code, source_path)`; index `(is_active, source_path)`. Prevent redirect loops and unsafe open redirects.

### `search_synonym`

- `id UUID PK`, `locale_code VARCHAR(5) FK NOT NULL`
- `term VARCHAR(180) NOT NULL`, `normalized_term VARCHAR(180) NOT NULL`
- `synonym_term VARCHAR(180) NOT NULL`, `normalized_synonym VARCHAR(180) NOT NULL`
- `is_active BOOLEAN NOT NULL DEFAULT TRUE`, `created_by UUID FK`, `created_at TIMESTAMPTZ NOT NULL`
- Index `(locale_code, normalized_term)`, optional unique `(locale_code, normalized_term, normalized_synonym)`.
- Use for Bangla/English variants, alternate spellings and transliteration; synonym expansion must not make irrelevant results dominate exact matches.

### `search_query_log` (privacy-limited analytics)

- `id UUID PK`, `locale_code VARCHAR(5) FK NOT NULL`
- `query_text VARCHAR(300) NOT NULL`, `normalized_query VARCHAR(300) NOT NULL`
- `result_count INTEGER NOT NULL`, `clicked_destination_id UUID FK NULL`, `clicked_editorial_id UUID FK NULL`
- `session_hash CHAR(64) NULL`, `created_at TIMESTAMPTZ NOT NULL`
- Index `(created_at)`, `(locale_code, normalized_query, created_at)`; retain only according to documented retention policy. Do not store raw IP, account secrets or sensitive query metadata by default. Consider sampling/aggregation at high volume.

### `destination_visit_info` (only if visit facts need separate lifecycle)

- `destination_id UUID PK/FK`
- `best_month_start SMALLINT NULL`, `best_month_end SMALLINT NULL`
- `typical_visit_duration_minutes INTEGER NULL`
- `accessibility_notes TEXT NULL`, `safety_notes TEXT NULL`
- `last_verified_at TIMESTAMPTZ NULL`, `verified_by UUID FK NULL`
- If these fields are already correctly modeled in `destination`/translation, do not duplicate them; create this table only where it improves separation and data governance.

### Optional review/reporting additions

- `content_correction_report(id UUID PK, destination_id UUID FK NULL, editorial_content_id UUID FK NULL, reporter_email VARCHAR(254) NULL, report_type VARCHAR(40), message TEXT, status VARCHAR(24), assigned_to UUID FK NULL, created_at TIMESTAMPTZ, resolved_at TIMESTAMPTZ NULL)`; enforce exactly one target FK and index `(status, created_at)`.
- `destination_review` only if user reviews are an explicit product decision. Fields: `id UUID PK`, `destination_id UUID FK`, `user_id UUID FK`, `rating SMALLINT`, `review_text TEXT`, `status VARCHAR(20)`, `created_at TIMESTAMPTZ`, `updated_at TIMESTAMPTZ`; unique `(destination_id, user_id)` if one active review per user/destination; index `(destination_id, status, created_at)`. Keep review feature optional because an information portal does not automatically need user-generated reviews.

## 18.5 3NF, integrity ও index policy clarifications

1. Keep one canonical value in one authoritative table; translated strings belong in translation tables, not repeated in section configuration.
2. Use FK relationships for section-to-content references rather than unchecked polymorphic IDs where possible.
3. Add composite indexes based on actual query patterns, e.g. `(status, published_at DESC)`, `(division_id, status)`, `(district_id, status)`, `(locale_code, slug)`, `(page_id, is_enabled, sort_order)`, `(destination_id, sort_order)` and `(created_at DESC)` for recent lists.
4. Do not index every column indiscriminately: measure with representative data and `EXPLAIN (ANALYZE, BUFFERS)`; every index increases write/storage costs.
5. Search index may be a derived/search-optimized representation; it must be rebuildable from canonical normalized records and must not become a second manually edited source of truth.
6. All slugs must be unique in their intended scope; content updates that change slugs should create redirect records.
7. Use soft-delete/status only when business/audit requirements justify it; enforce uniqueness across active rows carefully.
8. For bookings, use transaction boundaries, row-level locks or exclusion/unique constraints where needed to prevent double-booking; payment callbacks must be idempotent.

## 18.6 Frontend information architecture and reusable component map

### Public pages

- `/` homepage
- `/destinations` directory/search results
- `/destinations/[slug]` destination detail
- `/divisions/[slug]`, `/districts/[slug]`, `/upazilas/[slug]` geography landing pages
- `/categories/[slug]`, `/collections/[slug]`
- `/stories/[slug]`, `/guides/[slug]`, `/itineraries/[slug]`
- `/search?q=...` unified search results
- `/about`, `/contact`, `/editorial-policy`, `/privacy`, `/terms`
- `/account/...` account and saved-trip pages when user features are enabled
- `/services/...` and `/bookings/...` only when marketplace phase is implemented

Routes/slugs are illustrative; locale strategy (prefix vs domain) and canonical URL rules must be decided before launch.

### Reusable UI components

- `GlobalHeader`, `DesktopMegaMenu`, `MobileNavigationDrawer`, `SearchOverlay`, `LanguageSwitcher`, `Breadcrumbs`
- `HeroFeature`, `SectionHeading`, `DestinationCard`, `EditorialCard`, `GuideCard`, `ItineraryCard`, `CollectionCard`
- `HorizontalCarousel`, `FilterPanel`, `FilterChip`, `SortControl`, `Pagination`, `MapPanel`
- `ImageGallery`, `AccessibleLightbox`, `SaveButton`, `ShareControl`, `ReportCorrectionForm`
- `NewsletterForm`, `ConsentNotice`, `EmptyState`, `ErrorState`, `SkeletonCard`, `Toast/InlineNotice`
- `FooterNavigation`, `SocialLinks`, `BackToTop`

Every content-driven component should receive content IDs/data from backend APIs; design tokens and layout templates live in the frontend design system, not as raw code entered by CMS editors.

## 18.7 Motion and interaction specification

| Interaction | Recommended behaviour | Fallback/accessibility |
|---|---|---|
| Desktop mega-menu | short fade/slide + backdrop opacity transition | click/keyboard access, Escape/outside-click close, focus remains predictable |
| Card hover | subtle image scale/underline/arrow movement | no essential information hidden on hover; touch-friendly |
| Carousel arrows | smooth scroll by a card-group distance | disable arrows at boundaries; reduced motion uses instant/less motion |
| Search suggestions | debounced query, active-option highlight | arrow keys, Enter, Escape, announced result count |
| Filter drawer | slide-in panel with selected count | focus trap, return focus to trigger, clear/apply controls |
| Image lightbox | fade/scale transition | keyboard close, previous/next, descriptive alt, focus management |
| Newsletter submit | inline progress then success/error | server-confirmed state; duplicate and network error handled |
| Page sections | restrained reveal on scroll if tested | respect `prefers-reduced-motion`; avoid delaying main content |
| Route change | preserve meaningful scroll/focus behavior | do not hide focus or trap browser navigation |

Suggested duration bands: micro feedback 100–180 ms; panels 160–240 ms; larger transitions 220–320 ms. These are starting points, not rigid rules; test on low-end mobile devices and avoid motion that slows task completion.

## 18.8 Backend modules: tourism scope only

- `identity`: users, profiles, roles, permissions, sessions/security events.
- `geography`: division/district/upazila/place hierarchy and translations.
- `media`: upload validation, rights metadata, variants, focal points and processing status.
- `destinations`: destination records, categories, facilities, tags, nearby/related links.
- `editorial`: articles, guides, itinerary content and localization.
- `cms`: pages, sections, menu trees, global settings, redirects, revisions and publishing workflow.
- `search`: query normalization, synonyms, indexing, filters, suggestions and search analytics.
- `personalization`: wishlists and saved trips, introduced after public MVP.
- `providers`: provider identity, verification, services and inventory; later phase.
- `booking`: booking lifecycle, guests, status history and availability reservation; later phase.
- `payments`: gateway references, webhook events, refunds and reconciliation specific to tourism bookings; no general ledger or enterprise accounting.
- `affiliate`: campaign attribution, commission rules and payout records; later phase.
- `support`: contact submissions, correction reports, CRM/support cases.
- `notifications`: email/SMS/in-app delivery preferences, templates and delivery logs.
- `analytics`: consent-aware aggregate product metrics, avoiding unnecessary personal data.

Keep a modular monolith as the default initial shape. Do not split microservices solely because the module list is long; split only when operational scale, independent deployment or team boundaries justify it.

## 18.9 Custom Super Admin Panel — mandatory platform control centre

### 18.9.1 Product requirement and separation from Django Admin

The platform MUST provide a purpose-built, production-grade **Super Admin Panel** for authorized platform administrators/superusers. It is a first-class Next.js application interface (for example, `/platform-admin/*`) connected to secured Django REST Framework APIs. It must not be treated as merely a styled Django Admin site.

Django Admin MUST remain enabled as a separate developer/technical back-office for trusted technical staff, data inspection, controlled maintenance and emergency operations. It is not the primary operational interface for business administrators, content managers, support staff, finance operations or vendor reviewers. Do not expose Django Admin to ordinary users or vendors. Protect it independently, restrict access, and consider network/VPN restrictions in production.

The custom panel must provide a consistent admin design system: responsive sidebar/navigation, global search, breadcrumbs, page titles, actionable data tables, saved filters where appropriate, bulk actions with confirmation, detail drawers/pages, pagination, export permissions, loading/empty/error states, notifications, accessible forms, and audit/history views. It should be efficient on desktop and usable on tablet/mobile for essential operations.

### 18.9.2 Central control modules

The exact navigation is permission-aware. At minimum, plan the following modules as the corresponding platform phases are implemented:

1. **Overview dashboard:** booking volume/value, payment/refund status, pending provider approvals, listing moderation queue, support queue, content publishing queue, failed webhook/job alerts, recent security events and system-health indicators. Every metric must link to a filtered list; date range and timezone must be explicit. Do not expose sensitive customer/payment data on the default dashboard unnecessarily.
2. **Users and access:** search/view users, verify account state, suspend/reactivate with reason, manage sessions where supported, trigger secure password-reset flows (never view or set plaintext passwords), assign roles, revoke access and inspect audit history. Protect the last active superuser and prevent accidental self-lockout.
3. **Roles and permissions (RBAC):** create/edit role definitions, map granular permissions, assign users/roles, preview effective permissions, and review privileged assignments. Example roles: Super Admin, Platform Operations Admin, Content Admin/Editor, Provider Verification Officer, Booking Operations, Customer Support, Finance Operations, Read-only Auditor and Analytics Viewer. These are examples, not hard-coded universal roles. Least privilege is the default; high-risk permissions require explicit assignment and may require re-authentication or a second approver.
4. **CMS and editorial control:** pages, page sections, menus, destination stories/guides, media, translations, SEO metadata, redirects, publication scheduling, revision history, preview, draft/review/publish workflow and rollback to a previous revision. CMS users must not be allowed to execute arbitrary code or scripts.
5. **Geography and tourism catalogue:** divisions, districts, upazilas, destinations, categories, tags, facilities, related places and moderation of user-submitted corrections.
6. **Provider/agent governance:** provider applications, identity/business verification records, approval/rejection with reason, provider users, listing review, package/hotel/service status, policy violations, suspension, disputes and provider activity history.
7. **Packages, inventory and offers:** inspect and moderate packages, hotel/service listings, pricing rules, availability/inventory, blackout dates, promotion validity, publication status and changes. Where inventory is externally managed, display source/sync status rather than pretending the platform controls it.
8. **Booking operations:** searchable bookings, booking status history, manual operational actions only through explicit validated workflows, cancellation requests, customer/provider communication records and exception queue. Every privileged status change must capture actor, timestamp, reason and before/after values.
9. **Payments, refunds, commissions and settlements:** gateway transaction references/status, webhook processing status, reconciliation exceptions, refund requests/approvals, commission configuration/version, provider payable calculations and payout/settlement status. Use immutable transaction/audit history; never allow an administrator to silently edit a completed gateway transaction or overwrite a financial history row. Any manual adjustment must be a separately recorded adjustment with reason, evidence/reference, actor and approval trail. Support maker-checker approval for high-risk refunds, adjustments or payouts where applicable. This is tourism marketplace transaction operations—not a general ledger, payroll or enterprise accounting module.
10. **Support and disputes:** tickets, contact forms, correction reports, booking complaints, dispute status, assignment, internal notes and response history, with privacy-aware access to customer information.
11. **Notifications and communication templates:** email/SMS/in-app templates, delivery status, retry queues and test preview. Only trusted roles may change templates; sanitize rendered content and do not permit executable templates.
12. **Analytics and reports:** filters by date, destination, provider, product, booking status and permitted business dimensions; CSV export only for authorized roles, with sensitive-field minimization and export audit records.
13. **Platform configuration:** feature flags, public-site navigation/section configuration, localization settings, booking policies, cancellation windows, commission rules and integration status. Separate harmless presentation configuration from high-risk payment/security settings; changes to critical settings must be audited and, where appropriate, require re-authentication or dual approval.
14. **Audit, security and system operations:** append-only business audit trail, login/security events, suspicious activity, failed jobs, webhook failures, integration health, scheduled task status and backup/restore status where observable. Do not show secrets, API keys, passwords, full card data or raw sensitive payloads in the UI or logs.

### 18.9.3 Role and permission model

Use explicit, server-enforced permissions; hiding a button in Next.js is not authorization. DRF must verify permissions and object ownership on every request. Use deny-by-default, least privilege and scoped permissions such as `cms.page.publish`, `provider.application.review`, `booking.cancel`, `payment.refund.request`, `payment.refund.approve`, `commission.rule.manage`, `settlement.approve`, `user.role.assign`, `audit.read` and `report.export`. Define permissions according to actual operations and separate sensitive request/approve actions.

Role assignment and privileged actions must be audited. A user must not be able to grant themselves privileges or edit their own role unless an explicitly designed, secure break-glass process allows it. Superuser access is rare, individually assigned, protected by MFA, and reviewed periodically. Do not use a single generic `is_admin` boolean as the whole authorization system. Django's `is_staff` and `is_superuser` flags are useful framework controls, but the custom portal's business RBAC and object-level rules still require deliberate design.

### 18.9.4 Required data model additions / review

Reuse the existing identity, provider, CMS, booking, payments, affiliate and support entities where they already exist. Add or refine these tables only where the current schema does not provide equivalent functionality:

- `accounts_role`: `id`, `code` (unique), `name`, `description`, `is_system_role`, `is_active`, timestamps.
- `accounts_permission`: `id`, `code` (unique), `name`, `module`, `description`.
- `accounts_role_permission`: composite unique/primary key (`role_id`, `permission_id`).
- `accounts_user_role`: `user_id`, `role_id`, optional `scope_type`/`scope_id` for provider or other constrained scope, `assigned_by`, `assigned_at`, `expires_at`, `revoked_at`, `revoked_by`, `reason`; enforce constraints and validate scope server-side.
- `admin_audit_event`: UUID, actor user, action code, target type and ID, timestamp, request/correlation ID, reason, safe before/after diff or selected changed fields, outcome, and appropriate metadata. Avoid storing secrets or unnecessary personal data. Protect the table from ordinary update/delete operations; retention and access policies must be documented.
- `admin_approval_request`: requester, action type, target reference, proposed change/amount where relevant, reason/evidence reference, status, requested/reviewed timestamps, reviewer, decision reason and idempotency/reference fields. Apply only to operations requiring maker-checker approval; enforce requester and approver separation.
- `admin_saved_view` (optional): user/role-scoped saved table filters and columns; never store arbitrary executable code.
- `admin_export_job` (optional): requester, export type, filter snapshot, status, expiry, storage reference, row count and audit reference; secure downloads with short-lived authorization and expiration.
- `platform_setting` or a typed configuration model (if absent): setting key, typed value, scope, version, updated by, timestamps, sensitivity class and approval/audit reference. Keep secrets in a secret manager/environment, not in ordinary editable database settings.

The existing schema already mentions role/permission tables; do not create duplicate alternatives. Review and extend those definitions to meet the requirements above. All foreign keys, unique constraints, scope checks, deletion rules and migration steps must be documented.

### 18.9.5 Security requirements for the custom panel

- MFA for superusers and privileged roles; strong session management, idle timeout and re-authentication for high-risk actions.
- Secure, HTTP-only, Secure and appropriate SameSite cookies for session-based authentication; CSRF protection for cookie-authenticated mutations. Define token storage/rotation/revocation carefully if token auth is selected. Never store long-lived privileged tokens in browser local storage by default.
- Server-side authorization on every API route, including object-level checks; protect against IDOR/BOLA and cross-provider data access.
- Rate limiting and monitoring for login, password reset, exports, role assignment, refunds and other sensitive endpoints.
- CSRF, XSS, SQL injection, SSRF, mass-assignment, file-upload and open-redirect protections; validate input server-side and sanitize output.
- Sensitive actions use explicit confirmation, show the target and consequences, require a reason, and prevent duplicate submissions through idempotency where relevant.
- Secrets and payment credentials are never returned to the frontend; use environment/secret management, key rotation and least-privilege service credentials.
- Audit logs are tamper-resistant and access-controlled; logs must redact credentials, payment secrets and unnecessary personal data.
- Exports have permission checks, minimized fields, audit logs, expiry and safe file delivery. Avoid exporting all user/customer records by default.
- Backup/restore procedures, database migration rehearsals, security monitoring and incident-response procedures must be defined before production launch.

### 18.9.6 UI routes and implementation boundaries

Illustrative route structure:

- `/platform-admin` — overview dashboard
- `/platform-admin/users`, `/platform-admin/roles`, `/platform-admin/permissions`
- `/platform-admin/cms/pages`, `/platform-admin/cms/menus`, `/platform-admin/media`
- `/platform-admin/geography`, `/platform-admin/destinations`, `/platform-admin/listings`
- `/platform-admin/providers`, `/platform-admin/packages`, `/platform-admin/offers`
- `/platform-admin/bookings`, `/platform-admin/payments`, `/platform-admin/refunds`
- `/platform-admin/commissions`, `/platform-admin/settlements`
- `/platform-admin/support`, `/platform-admin/reports`, `/platform-admin/settings`
- `/platform-admin/audit`, `/platform-admin/security`, `/platform-admin/system-health`

Use shared typed table/form components, but do not make one generic form capable of bypassing each module's business rules. The Next.js panel is an operator interface; authoritative rules, validation, permission checks, payment state and audit writes belong in Django/DRF and the database. Critical actions must not depend on client-side state alone.

### 18.9.7 Acceptance criteria

- [ ] The custom Super Admin Panel is independent from the default Django Admin interface; both have distinct intended audiences and access policies.
- [ ] A Super Admin can manage the platform's implemented modules from one permission-aware control centre.
- [ ] Non-superuser roles see only permitted navigation, data and actions, and direct API requests are also denied when unauthorized.
- [ ] Role/permission changes, provider approvals, listing moderation and critical configuration changes create audit events.
- [ ] High-risk financial actions have validated workflows, idempotency, reason capture and approval separation where configured.
- [ ] No admin UI or API exposes secrets or allows silent mutation/deletion of completed transaction history.
- [ ] Cross-provider and cross-customer access tests fail safely; privilege escalation and last-superuser lockout tests pass.
- [ ] Audit and export permissions, retention, download expiry, MFA and session policies are tested.
- [ ] Dashboards distinguish live values from delayed/aggregated values and link to the underlying filtered records.
- [ ] Essential admin workflows are keyboard accessible, responsive, and include loading, empty, error, success and confirmation states.

---

## 18.10 Acceptance checklist for the Lonely Planet-inspired tourism UI

- [ ] Desktop homepage reproduces the desired editorial rhythm without copied text, imagery, brand assets or proprietary fonts.
- [ ] Mobile at 390 px, tablet at 768 px and desktop at 1440 px have designed—not merely shrunk—layouts.
- [ ] Header mega-menu works by pointer, click, keyboard and touch where appropriate; Escape and outside click close it.
- [ ] Carousel arrows, touch swipe, focus order and reduced-motion behavior are tested.
- [ ] Every home section can be reordered/disabled/scheduled from CMS without arbitrary script entry.
- [ ] Images use the correct crop/focal point, responsive variants, alt text, credit and rights status.
- [ ] Search and filters reflect backend data; URL state can be shared when appropriate; empty/error states are designed.
- [ ] All primary actions have hover/focus/active/disabled/loading/success/error states.
- [ ] Newsletter/contact forms persist to backend and enforce consent, validation, spam controls and duplicate handling.
- [ ] Keyboard-only and screen-reader smoke tests pass; contrast and reduced-motion requirements are met.
- [ ] Core Web Vitals and API/search performance are measured on realistic mobile/network conditions.
- [ ] All production content is managed by the CMS; no source-page copy or static reference content remains.

# 19. Final recommendation

Build SANDVIORA TOURISM LTD. first as a **tourism-first, CMS-first destination information and discovery platform** with a normalized relational database, explicit permission boundaries, fast search and a premium editorial UI inspired by interaction patterns observed in the supplied Lonely Planet reference ZIP. Use PostgreSQL as the intended production database; SQLite may be used for a local prototype, but should not be assumed to support production booking concurrency and operational needs without a separate assessment.

The first release should deliver verified Bangladesh geography and destinations, bilingual CMS, homepage/page builder, destination/article/guide/itinerary pages, accessible navigation and carousels, fast search/filter, SEO, media pipeline, editorial review, audit trail, backup/restore and responsive accessible UI. Add user accounts and saved trips after the public discovery experience is stable.

Only then add provider inventory, booking, tourism payment/refund, affiliate/commission and multi-portal capabilities. These transactions are tourism product features, not a general-purpose accounting/ERP system. HRIS, payroll and internal accounting are explicitly excluded and should be designed as a separate project.

The supplied ZIP is a local capture of a proprietary reference, not an open-source template. Recreate the design principles and interaction behavior with original branding, original design tokens, licensed or user-owned images, and independently authored text. Do not deploy copied Lonely Planet text, photos, fonts, logo or proprietary assets.

---

# 19. Production security, anti-spam, anti-phishing, SEO ও operational hardening

এই অধ্যায়টি বাধ্যতামূলক implementation requirement। শুধু Next.js, Django, PostgreSQL বা payment gateway ব্যবহার করলেই ওয়েবসাইট নিরাপদ হয়ে যায় না। নিরাপত্তা হবে layered: edge/CDN protection, frontend controls, backend validation/authorization, database constraints, monitoring এবং operational recovery। কোনো একক CAPTCHA, WAF বা package সব ধরনের attack ঠেকাতে পারে না।

## 19.1 পূর্ণ stack-এ যেসব security layer যোগ করতে হবে

- **Edge/CDN/WAF:** production domain-এ reputable CDN/WAF ব্যবহার করুন। Managed OWASP-style rules, bot mitigation, request-size limits এবং volumetric DDoS protection চালু করুন। শুরুতে monitoring mode-এ false positive পর্যবেক্ষণ করে পরে উপযুক্ত blocking rules প্রয়োগ করুন। WAF-কে application validation-এর বিকল্প ভাববেন না।
- **TLS/HTTPS:** সব public/admin/API endpoint HTTPS-এ; HTTP থেকে HTTPS redirect; HSTS কেবল HTTPS configuration যাচাইয়ের পর। TLS termination ও origin connection সুরক্ষিত রাখুন।
- **Next.js security:** supported patched release; production mode; security headers; CSP; safe rendering; untrusted CMS content-কে HTML হিসেবে সরাসরি render নয়; `dangerouslySetInnerHTML` এড়িয়ে চলুন বা rigorously sanitize করুন। Server Actions/API handlers-এও authentication, authorization, schema validation এবং rate limiting বাধ্যতামূলক।
- **Django/DRF hardening:** production `DEBUG=False`; strict `ALLOWED_HOSTS`; correct trusted-origin CSRF configuration; secure session/CSRF cookies; HTTPS proxy configuration যাচাই; CORS allowlist; DRF throttling-এর পাশাপাশি edge-level rate limits; generic error response; Django deployment checklist চালানো। CORS authentication বা authorization নয়।
- **Database/network:** PostgreSQL public internet-এ expose করবেন না; private network/firewall, TLS where appropriate, separate least-privilege DB roles, migration role ও runtime role আলাদা, encryption at rest যেখানে hosting সমর্থন করে, connection limits এবং tested backup/restore।
- **Secrets:** development/staging/production আলাদা; secret manager বা hosting environment secrets; rotate-able API keys; repository, frontend bundle, error message ও logs-এ secrets নিষিদ্ধ। Secret scanning CI-তে চালান।
- **Dependencies/CI/CD:** pinned and reviewed dependencies, automated vulnerability/dependency scanning, lockfiles, protected main branch, code review, test/lint/build checks, staging release, controlled database migrations ও rollback plan। Production dependency update আগে staging-এ যাচাই করুন।
- **Security monitoring:** centralized structured logs, application error tracking, uptime/health checks, unusual login/booking/payment alerts, failed job/webhook queue alerts, log retention এবং incident response owner নির্ধারণ করুন। Log-এ password, token, full payment credentials বা অপ্রয়োজনীয় PII রাখবেন না।
- **Backup & recovery:** database-এর automated backup/PITR সুবিধা থাকলে enable করুন; আলাদা account/location-এ encrypted backup copy রাখুন; restore rehearsal ও documented RPO/RTO; media storage-এর backup/versioning; backup deletion-এ restricted permissions। Backup সফল হয়েছে মানেই restore সফল—এমন ধরে নেবেন না।

## 19.2 Public forms-এ spam, phishing, malicious text ও email abuse প্রতিরোধ

Contact form, newsletter signup, review, provider application, package submission, search, support ticket এবং account registration—প্রতিটি endpoint-এর আলাদা abuse profile থাকবে। সব form-এ একই CAPTCHA বসানো যথেষ্ট নয়। নিচের layered controls প্রয়োগ করতে হবে।

### A. Server-side validation (প্রতিটি form-এ বাধ্যতামূলক)

- Frontend validation শুধু usability; backend-এ একই field schema, type, length, allowed values, required fields ও format পুনরায় validate করতে হবে।
- Message/body-র সর্বোচ্চ দৈর্ঘ্য নির্ধারণ করুন; oversized request ও excessive nested payload reject করুন।
- Plain text-কে plain text হিসেবেই store/render করুন; HTML, script, iframe, event handler ও unsafe URL sanitize/strip করুন। Rich text দরকার হলে vetted allowlist sanitizer ব্যবহার করুন। Escape output context অনুযায়ী করুন।
- User-supplied URL, HTML, markdown, email address ও attachment বিশ্বাস করবেন না। URL auto-link করলে `javascript:`, `data:` এবং অন্য unsafe scheme block করুন; link নতুন tab-এ খুললে `rel="noopener noreferrer"` ব্যবহার করুন।
- Email header injection ঠেকাতে user input-কে mail header-এ concatenate করবেন না। `From` হিসেবে verified platform address, `Reply-To` হিসেবে validated user address এবং message body-তে user text ব্যবহার করুন। `To`, `CC`, `BCC`, sender identity বা template user-controlled হতে দেওয়া যাবে না।
- Public user input দিয়ে arbitrary recipient, arbitrary URL fetch, SMTP destination, webhook target বা template code নির্ধারণ করা যাবে না। SSRF প্রতিরোধে outbound fetch প্রয়োজন হলে host allowlist, private IP/link-local block, redirect validation এবং egress restrictions ব্যবহার করুন।
- Uploaded file-এর extension নয়, MIME ও file signature যাচাই; size limit; random storage name; malware scan যেখানে সম্ভব; image re-encoding; public web root-এর বাইরে store; file download-এ authorization।

### B. Bot/spam controls

- Rate limits IP, account, endpoint এবং প্রয়োজনে subnet/ASN reputation-এর ভিত্তিতে; login, registration, OTP, contact, newsletter, reviews, search, provider applications, booking initiation ও password reset-এ আলাদা thresholds। NAT/shared networks-এর কারণে শুধু IP-ভিত্তিক কঠোর limit করবেন না।
- Honeypot field ও minimum form-fill time-এর মতো low-friction controls ব্যবহার করুন; এগুলো একা যথেষ্ট নয়।
- Risk-based CAPTCHA/Turnstile-জাতীয় challenge suspicious traffic-এ ব্যবহার করা যেতে পারে। Server-এ challenge token-এর validity, hostname/action ও expiry যাচাই করুন; শুধু client response বিশ্বাস করবেন না। Accessibility ও legitimate-user fallback রাখুন।
- Duplicate submission detection, idempotency key, cooldown, per-email signup limit এবং suspicious burst detection যোগ করুন। Legitimate retry যেন অযথা duplicate booking/message না তৈরি করে।
- Newsletter-এ **double opt-in**; unsubscribe link, suppression list, consent timestamp/source এবং consent withdrawal সংরক্ষণ করুন। Purchased/scraped email list ব্যবহার করবেন না।
- Contact/review/provider application-এ moderation queue, spam score, quarantine ও rate-limited publish workflow। সন্দেহজনক content স্বয়ংক্রিয়ভাবে public publish না করে review-তে পাঠান।
- Search endpoint-এ query length cap, pagination cap, request timeout, expensive filter restrictions ও abuse throttling; search log-এ personal data অপ্রয়োজনীয়ভাবে রাখবেন না।

### C. Phishing, scam ও malicious links

- User-generated content—reviews, package descriptions, provider profile, comments ও support messages—প্রথমে untrusted content হিসেবে ধরুন। Safe text rendering, URL scheme validation এবং suspicious link moderation চালু রাখুন।
- Vendor/provider onboarding-এ email verification, identity/business-document review এবং privileged listing/payout details change-এর জন্য step-up authentication ও audit trail রাখুন।
- সন্দেহজনক content-এর report button, admin moderation queue, block/suspend workflow এবং review history দিন।
- Email sender domain-এ SPF, DKIM ও DMARC সঠিকভাবে configure করুন; প্রথমে DMARC monitoring/reporting দিয়ে legitimate mail source যাচাই করে ধাপে ধাপে enforcement policy উন্নীত করুন। DNS configuration ও third-party email provider alignment নিয়মিত যাচাই করুন।
- Transactional email-এ trusted domain, consistent branding, no misleading links, minimum necessary personal data এবং delivery/provider logs ব্যবহার করুন। User-provided content সরাসরি email HTML template-এ বসাবেন না।
- Admin/finance staff-এর জন্য MFA, phishing-resistant MFA সম্ভব হলে অগ্রাধিকার, privileged account আলাদা রাখা এবং unexpected payout/account change-এ out-of-band verification।

### D. Email sending architecture

- Contact/newsletter request সরাসরি web request-এর মধ্যে synchronous SMTP loop দিয়ে পাঠাবেন না। Validated request database-এ নিরাপদে record করে Celery queue-তে পাঠান; retry/backoff, idempotency, dead-letter/failed state, alerting ও per-recipient limits রাখুন।
- Application-কে arbitrary destination-এ mail পাঠানোর general-purpose relay বানাবেন না। Recipient list ও email purpose allowlist/authorization দ্বারা নিয়ন্ত্রিত হবে।
- Bounce, complaint ও unsubscribe event গ্রহণ করে suppression list update করুন; delivery provider-এর API secret server-side রাখুন।
- Admin export-এ email address ও PII access-controlled হবে; bulk email campaign-এ approval, audience consent validation, send-rate limit এবং audit log প্রয়োজন।

## 19.3 Authentication, account takeover ও privilege escalation

- Super Admin ও finance-sensitive users-এর জন্য MFA বাধ্যতামূলক; staff access-এ short session lifetime, idle timeout, session revocation এবং suspicious login alerts। High-risk operation-এ recent re-authentication।
- Login/reset/OTP endpoints-এ throttling; account enumeration এড়াতে generic responses; single-use expiring reset tokens; OTP brute-force limits। Password reset দিয়ে MFA silently disable করা যাবে না।
- User self-registration কখনো নিজে থেকে admin/vendor privileges পাবে না। Provider account approval আলাদা workflow; role assignment ও payout-account change-এর audit আবশ্যক।
- Cookie-based authentication হলে CSRF protection; token-based হলে secure storage, short lifetime, refresh rotation/revocation এবং XSS risk mitigation। Browser-এ long-lived access/refresh secret localStorage-এ রাখা এড়িয়ে চলুন।
- Object-level authorization: customer শুধু নিজের booking/profile; vendor শুধু নিজের listing/booking/settlement; support staff সীমিত customer fields; finance role কেবল অনুমোদিত financial operations। প্রতিটি API endpoint-এ enforce করুন।

## 19.4 Booking/payment-specific security

- Gateway-hosted checkout/tokenization; card number/CVV নিজস্ব database/log-এ store নয়। প্রযোজ্য PCI obligations gateway/provider ও integration অনুযায়ী যাচাই করুন।
- Client পাঠানো amount, discount, tax, currency, commission বা vendor payout বিশ্বাস নয়; server-side pricing rules থেকে পুনরায় হিসাব করুন। Price/availability পরিবর্তন হলে booking confirmation-এর আগে স্পষ্ট revalidation করুন।
- Payment webhook-এর signature, timestamp, event identity এবং replay/duplicate handling যাচাই; idempotent processing ও reconciliation। Payment success redirect/page নিজে payment proof নয়।
- Booking, inventory ও payment transition atomic/transaction-safe হতে হবে; concurrent booking-এর জন্য database constraints/locking strategy এবং expiry/hold policy নির্ধারণ করুন।
- Refund/payout high-risk actions-এ maker-checker approval, threshold-based second approver, beneficiary change cooling-off/verification, daily limits ও audit log বিবেচনা করুন। Super Admin হওয়া মানেই সব financial control bypass করা নয়।
- Payment gateway secret, payout credentials এবং signing keys rotate করার documented process রাখুন; webhook secret versioning/rotation-এ overlap window পরিকল্পনা করুন।

## 19.5 SEO-এর জন্য কী যোগ করতে হবে

SEO আলাদা security product নয়; এটি rendering, content quality, technical metadata ও site operations-এর সমন্বয়। Next.js public tourism pages-এ নিচের কাজগুলো করতে হবে:

- **Server-rendered/indexable content:** destination, district, tourist spot, hotel ও package detail-এর মূল title/content HTML-এ দৃশ্যমান রাখুন; শুধু client-side API fetch শেষ হওয়ার পর content দেখানোর ওপর নির্ভর করবেন না। Private dashboard-কে indexable public page হিসেবে render করবেন না।
- **Metadata:** প্রতিটি indexable page-এর unique title, description, canonical URL, Open Graph/Twitter metadata, language/locale alternate links (যদি bilingual content বাস্তবেই থাকে), accurate image alt text এবং breadcrumbs। CMS publish validation-এ title/description/slug/hero image/alt text checks রাখুন।
- **Sitemap & robots:** canonical public URLs-এর XML sitemap তৈরি/আপডেট; `robots.txt`-এ sitemap reference; staging/private/admin paths-এ indexing বন্ধ। তবে `robots.txt` access control নয়—sensitive page authentication দিয়ে protect করতে হবে।
- **Structured data:** page content-এর সঙ্গে মিল রেখে উপযুক্ত Schema.org structured data (যেমন Organization, BreadcrumbList, Article; সত্যিকারের উপযুক্ত হলে TouristAttraction, Hotel, Product/Offer) ব্যবহার করুন। কল্পিত rating/review/price/availability বা misleading schema দেবেন না। Search engine guidelines ও validation tools দিয়ে যাচাই করুন।
- **URL and redirect governance:** stable readable slug; lowercase/normalization policy; pagination/filter URL-এর canonical/indexing rules; slug change হলে 301 redirect registry; redirect loop/chain check; 404/410 semantics।
- **Duplicate/thin content:** একই package-এর অসংখ্য query-param URL index হওয়া নিয়ন্ত্রণ; district/destination pages-এ unique, useful content; empty/thin pages noindex বা publish block; user-generated review moderation।
- **Performance/Core Web Vitals:** responsive image sizes, modern formats, lazy loading below fold, hero image-এর সঠিক priority, width/height reservation, font optimization, cache strategy, JS bundle control এবং real-user performance monitoring।
- **Internal linking/discovery:** logical destination→district→division hierarchy, breadcrumbs, related places, descriptive link text, useful search result pages এবং orphan-page audit।
- **Search Console/analytics:** search performance ও indexing errors monitor; consent/privacy requirements অনুযায়ী analytics; query tracking-এ PII নয়। Sitemap submission করলেই indexing নিশ্চিত হয় না।
- **CMS editorial governance:** author/reviewer/publisher workflow, publication/update dates, image licensing, source attribution where required, correction process, translation completeness এবং stale travel information review date। SEO metadata কখনো deceptive keyword stuffing-এর জন্য ব্যবহার করবেন না।

## 19.6 Security headers এবং CSP deployment policy

Production-এ অন্তত `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy` এবং উপযুক্ত `Permissions-Policy` বিবেচনা করুন। Clickjacking প্রতিরোধে CSP `frame-ancestors` (এবং প্রয়োজনমতো `X-Frame-Options`) সঠিকভাবে সেট করুন। CSP প্রথমে Report-Only mode-এ report পর্যবেক্ষণ করে third-party payment, map, analytics ও image domains-এর exact allowlist নির্ধারণ করে enforce করুন। অকারণে `unsafe-eval`, broad wildcard বা inline script অনুমোদন করবেন না। Header সেট করলেই XSS prevention সম্পূর্ণ হয় না; output encoding, safe templates, dependency hygiene ও testing একসঙ্গে লাগবে।

## 19.7 Threat modelling ও security testing plan

Release-এর আগে threat model-এ অন্তত এই assets/risks অন্তর্ভুক্ত করুন: customer PII, credentials, admin privileges, provider listings, booking inventory, payment/refund/settlement records, email reputation, media uploads, secrets ও backups। Trust boundaries: browser, CDN/WAF, Next.js server, Django API, Celery workers, PostgreSQL, object storage, email provider ও payment gateway।

- OWASP Top 10 এবং OWASP API Security Top 10-ভিত্তিক test plan তৈরি করুন।
- Unit/integration tests: authorization matrix, object-level isolation, validation, CSRF, rate limiting, upload rejection, email header injection, webhook signature/replay, idempotency, refund approval এবং audit logs।
- Dependency/secret scans CI-তে; staging-এ DAST এবং অনুমোদিত security testing; production-এর আগে critical/high findings-এর documented disposition।
- Admin panel, API ও public forms-এ automated abuse tests; realistic load test; backup restore এবং incident-response tabletop exercise।
- Production incident runbook: contain, credential/key revoke, affected session invalidate, preserve evidence, notify responsible parties as legally/contractually required, recover and post-incident review।

## 19.8 Suggested rollout priority

1. **Before public launch:** HTTPS, production Django hardening, secure cookies/CSRF/CORS, MFA for privileged accounts, object-level authorization, server-side validation, form rate limits, safe email handling, upload controls, secret management, payment webhook verification, backup/restore, audit logs এবং basic monitoring।
2. **Before vendor/payment launch:** maker-checker refund/payout controls, provider verification, email SPF/DKIM/DMARC, risk-based bot challenge, reconciliation, alerting, privacy/retention policy এবং end-to-end security tests।
3. **Continuous:** dependency patching, WAF rule tuning, access reviews, log/alert review, phishing awareness, restore drills, threat-model updates, performance/SEO monitoring এবং periodic independent security assessment।

**Acceptance gate:** critical/high security finding unresolved থাকলে public payment/vendor launch অনুমোদন করা যাবে না। Security checklist পূরণ হয়েছে—এটাই যথেষ্ট নয়; test evidence, owner, monitoring এবং recovery procedure থাকতে হবে।

---

# 20. Admin Panel-এ Revenue, Affiliate Earnings ও Financial Reconciliation Module

## 20.1 উদ্দেশ্য ও scope

SANDVIORA-তে affiliate/advertising/referral partnerships, third-party booking providers এবং নিজস্ব marketplace booking—একাধিক উৎস থেকে আয় হতে পারে। তাই Admin Panel-এ একটি dedicated **Revenue & Financial Operations** module বাধ্যতামূলক। এটি শুধু booking count বা আনুমানিক earnings দেখাবে না; প্রতিটি আয়, commission, fee, refund, adjustment, payout এবং বাস্তবে পাওয়া অর্থের traceable হিসাব রাখবে। Super Admin ও অনুমোদিত finance-role ব্যবহারকারী source-wise, provider-wise, booking-wise এবং date-wise বিস্তারিত দেখতে ও export করতে পারবেন।

**Scope boundary:** এটি platform-এর নিজস্ব আয় ও booking/payment/refund/vendor settlement-সংক্রান্ত operational accounting এবং reconciliation। এই প্রকল্পে পূর্ণাঙ্গ corporate ERP/general ledger, payroll, HRIS, procurement বা statutory tax filing system তৈরি করা হবে না। ভবিষ্যতে প্রয়োজন হলে accounting software-এ export/integration যোগ করা যাবে।

## 20.2 Admin Panel navigation

`Finance & Revenue` নামে আলাদা navigation group রাখুন:

- **Revenue Dashboard:** gross booking value, platform gross revenue, refunds, fees, net revenue, collected cash এবং outstanding receivables-এর আলাদা KPI।
- **Revenue Sources:** affiliate network, direct affiliate partner, third-party booking provider, marketplace booking commission, sponsored listing/advertising এবং অন্য অনুমোদিত revenue stream।
- **Affiliate & Partner Earnings:** partner/network-ভিত্তিক click/conversion/booking/commission, pending/approved/paid/reversed earnings এবং statement history।
- **Booking Financials:** প্রতিটি booking-এর customer payment, provider/vendor payable, platform commission, gateway fee, discount, tax/levy (যদি প্রযোজ্য), refund এবং final status।
- **Reconciliation:** provider/network statement, payment gateway settlement, bank receipt এবং internal transaction-এর matching ও discrepancy queue।
- **Refunds & Adjustments:** refund, cancellation, chargeback, commission reversal, correction এবং approval history।
- **Vendor/Partner Settlements:** payable balance, payout batch, payment reference, payout status ও failed payout follow-up।
- **Reports & Exports:** CSV/XLSX export, date range, currency, source, partner, booking status ও settlement status filter।
- **Audit Trail:** কে কোন financial record তৈরি, edit, approve, reverse বা export করেছেন—কারণসহ immutable audit events।

## 20.3 Revenue source ও attribution tracking

প্রতিটি monetization integration-এর জন্য `RevenueSource`/`PartnerIntegration`-জাতীয় configuration রাখুন। Source record-এ থাকবে: source type, partner/provider name, external account/reference, contract/commission rule reference, currency, active dates, attribution window (প্রযোজ্য হলে), API/import method, statement format, settlement terms, status এবং credential reference (secret সরাসরি database-এ নয়)।

Affiliate click বা outbound referral-এর জন্য privacy policy ও consent requirements মেনে unique click/reference ID, source/campaign, destination, timestamp এবং প্রয়োজনীয় attribution metadata সংরক্ষণ করুন। Affiliate partner conversion report/API বা statement-এ booking/conversion ID পাওয়া গেলে internal referral ID-এর সঙ্গে match করুন। Provider সমর্থন না করলে conversion নিশ্চিত বলে দেখাবেন না; record-কে `unmatched`/`estimated` হিসেবে চিহ্নিত করতে হবে।

প্রতিটি revenue entry-তে `source_type`, `source_id`, `external_transaction_id`, `internal_booking_id` (যদি থাকে), `event_date`, `earned_at`, `approved_at`, `settled_at`, `currency`, `status` এবং source document/statement reference থাকবে। External ID unique constraint/idempotency ব্যবহার করে একই statement বা webhook import পুনরায় এলে duplicate earning তৈরি হওয়া ঠেকাতে হবে।

## 20.4 Financial calculations ও terminology

Dashboard-এ নিচের পরিমাপগুলো পৃথকভাবে দেখাতে হবে—একটিকে আরেকটির বিকল্প হিসেবে ব্যবহার করা যাবে না:

- **Gross Booking Value (GBV):** booking-গুলোর মোট মূল্য; এটি নিজে platform revenue নয়।
- **Platform Gross Revenue:** platform-এর অর্জিত commission, affiliate commission, advertising/sponsorship revenue ও অন্যান্য platform fee—নির্ধারিত accounting policy অনুযায়ী।
- **Refunds/Reversals:** ফেরত বা বাতিল হওয়া সংশ্লিষ্ট আয়/commission-এর বিপরীত এন্ট্রি।
- **Payment/Provider Fees:** payment gateway, network বা provider-এর fee; প্রযোজ্য হলে আলাদা expense/contra-revenue classification-এ।
- **Net Platform Revenue:** নির্ধারিত policy অনুযায়ী gross platform revenue থেকে refunds/reversals এবং সংশ্লিষ্ট deductions বাদ দিয়ে হিসাব করা পরিমাপ। Report-এ ব্যবহৃত formula স্পষ্ট দেখাতে হবে।
- **Collected Cash / Settled Amount:** gateway, affiliate network, provider বা bank থেকে বাস্তবে received/settled হয়েছে এমন অর্থ। Earned কিন্তু unpaid amount-এর সঙ্গে এটি এক নয়।
- **Outstanding Receivable:** partner/network/provider-এর কাছ থেকে পাওনা, কিন্তু এখনো settle হয়নি এমন amount।
- **Vendor/Provider Payable:** customer payment থেকে vendor/provider-কে দেওয়ার বাকি অর্থ; এটি platform revenue হিসেবে গণনা করা যাবে না।

সব financial calculation backend-এ Decimal/fixed-precision monetary fields দিয়ে করতে হবে; floating-point arithmetic নয়। প্রতিটি transaction-এ currency রাখতে হবে। একাধিক currency থাকলে original amount ও currency অপরিবর্তিত রেখে converted reporting amount, exchange-rate value/source এবং conversion timestamp সংরক্ষণ করতে হবে। FX conversion rate গোপনে বা পরে overwrite করা যাবে না।

## 20.5 Booking ও affiliate earning lifecycle

**Marketplace booking:** booking confirmed → payment authorized/captured → service completed বা contract অনুযায়ী commission earned → refund/cancellation/chargeback window ও policy অনুযায়ী commission approved → settlement due → payout initiated → payout confirmed। বাস্তব business rule অনুযায়ী status flow পরিবর্তনযোগ্য হবে, তবে প্রতিটি transition logged এবং validated হতে হবে।

**Affiliate/provider earning:** click/referral (যদি track করা হয়) → partner conversion reported → internal attribution match → pending validation → approved/locked → statement reconciliation → payment due → received/settled। Partner-এর terms অনুযায়ী pending period, cancellation reversal ও minimum payout threshold configure করা যাবে।

Status-গুলো স্পষ্টভাবে আলাদা রাখুন: `estimated`, `reported`, `pending_validation`, `approved`, `rejected`, `payable`, `paid/settled`, `reversed`, `disputed`, `unmatched`। UI-তে অনুমানভিত্তিক earning-কে confirmed revenue হিসেবে দেখানো যাবে না।

## 20.6 Reconciliation ও discrepancy handling

প্রতি affiliate network, booking provider, payment gateway ও bank payout-এর জন্য manual CSV/XLSX import বা অনুমোদিত API integration সমর্থন করুন। Import-এর সময় source, statement period, currency, file hash/import batch ID, uploader এবং import timestamp রেকর্ড করুন। Matching priority: external transaction/conversion ID → provider booking reference → internal booking/referral ID → amount/currency/date-based candidate match। Amount/date matching একা final automatic approval-এর জন্য যথেষ্ট নয়; ambiguity থাকলে manual review queue-তে পাঠাতে হবে।

Reconciliation screen-এ অন্তত দেখান:

- internal expected amount বনাম external reported/settled amount;
- matched, unmatched, duplicate, missing, reversed ও amount-mismatch records;
- commission rate/contract rule mismatch;
- statement period ও payout reference;
- discrepancy amount, reason, owner, status এবং resolution note;
- original source row/document এবং সংশ্লিষ্ট booking/earning detail।

কোনো discrepancy resolve করলে আগের source record মুছবেন বা silently edit করবেন না। Reversal/adjustment entry তৈরি করুন, কারণ লিখুন এবং প্রয়োজনে দ্বিতীয় অনুমোদন নিন। Reconciliation totals source statement-এর total-এর সঙ্গে মিলেছে কি না তা batch-level control total দিয়ে যাচাই করতে হবে।

## 20.7 Data model ও relationship requirements

Backend schema-তে প্রয়োজন অনুযায়ী নিম্নোক্ত entity-সমূহ আলাদা রাখুন; এগুলো conceptual names, final naming convention Django app/schema design-এর সময় নির্ধারিত হবে:

- `RevenueSource` / `PartnerIntegration`
- `AffiliateClick` বা `ReferralAttribution` (শুধু applicable হলে)
- `ExternalConversion` / `PartnerEarning`
- `BookingFinancialRecord` বা booking-এর সঙ্গে সম্পর্কিত financial snapshot
- `CommissionRule` / `CommissionCalculation`
- `FinancialTransaction` (append-only financial event/ledger entry)
- `RefundRecord` / `ChargebackRecord` / `AdjustmentRecord`
- `PartnerStatement` / `StatementLine` / `ReconciliationBatch` / `ReconciliationMatch`
- `SettlementBatch` / `SettlementLine` / `PayoutRecord`
- `ExchangeRateSnapshot` (multi-currency চালু হলে)
- `FinancialApproval` / `FinancialAuditEvent`

প্রতিটি record-এ প্রয়োজনমতো created/updated timestamp, actor, source reference, status, currency, amount এবং idempotency/external reference থাকতে হবে। Booking, transaction, statement line, refund ও payout-এর foreign-key relationship এমন হতে হবে যাতে Admin Panel থেকে একটি booking খুলে তার সম্পূর্ণ financial history এবং একটি statement খুলে সংশ্লিষ্ট সব earning/booking দেখা যায়। Financial records hard-delete করা যাবে না; correction হবে reversal/adjustment-এর মাধ্যমে।

## 20.8 Admin permissions ও financial controls

Role-based access control (RBAC) এবং প্রয়োজনমতো object-level restrictions প্রয়োগ করুন। প্রস্তাবিত roles:

- **Super Admin:** সব financial data ও configuration দেখতে পারবেন; sensitive actions-এ approval workflow অতিক্রম করা যাবে না।
- **Finance Viewer/Analyst:** dashboard, reports ও detail দেখতে/export করতে পারবেন; financial entries edit বা payout initiate করতে পারবেন না।
- **Finance Operator:** statement import, reconciliation proposal, adjustment draft ও payout batch প্রস্তুত করতে পারবেন।
- **Finance Approver:** policy threshold অনুযায়ী earning approval, refund/adjustment ও payout approve করতে পারবেন।
- **Auditor:** read-only access, audit history ও exports; write permissions নয়।

একই ব্যক্তি যেন high-risk transaction তৈরি ও final approve—দুটিই একা করতে না পারেন (maker-checker / segregation of duties)। Refund, manual earning adjustment, partner payout, bank-detail change এবং reconciliation write-off-এর জন্য configurable approval threshold, reason code ও audit event রাখুন। MFA, session revocation, export logging এবং least-privilege access বাধ্যতামূলক।

## 20.9 Dashboard ও report requirements

Admin Panel-এ date range এবং filters-সহ এই reports রাখুন:

1. Revenue summary by day/week/month/quarter/year।
2. Source-wise, affiliate network-wise, provider-wise ও campaign-wise earnings।
3. Booking-wise financial breakdown এবং commission calculation explanation।
4. Pending vs approved vs paid/settled vs reversed earnings aging report।
5. Partner receivables, expected payout date এবং overdue settlement report।
6. Gateway settlement, bank receipt ও internal collection reconciliation report।
7. Refund/cancellation/chargeback impact report।
8. Vendor/provider payable ও settlement history (marketplace চালু হলে)।
9. Commission rule performance ও rule-change history।
10. Currency-wise totals, FX conversion summary এবং period-end snapshots (multi-currency হলে)।
11. Reconciliation exceptions, unmatched conversions ও unresolved discrepancy report।
12. CSV/XLSX export—active filters, timezone, currency, generated-by, generated-at এবং report definition metadata-সহ।

প্রতিটি KPI-তে date basis (booking date, service date, earning date, settlement date) নির্বাচন স্পষ্ট হতে হবে। Dashboard-এ একই নামের metric বিভিন্ন date basis-এ নীরবে মিশিয়ে দেওয়া যাবে না। বড় report background job-এ generate করা যেতে পারে; export link role-protected ও expiry-limited হবে।

## 20.10 Notifications ও operational alerts

- Partner payout expected date অতিক্রম করলে alert।
- Statement import-এর পর unmatched/mismatched amount threshold ছাড়ালে alert।
- Webhook duplicate/signature failure, statement duplicate বা payout failure হলে alert।
- Approved earning দীর্ঘদিন unpaid থাকলে aging alert।
- Manual adjustment, refund, write-off বা bank-detail change হলে relevant approver-কে notification।
- Daily/weekly revenue digest শুধুমাত্র অনুমোদিত recipients-কে; email-এ অপ্রয়োজনীয় customer/payment sensitive data নয়।

## 20.11 API, background jobs ও integrity

Django REST Framework-এ permission-enforced endpoints দিয়ে dashboard aggregates, source management, statement import, reconciliation, earning detail, adjustments, settlements ও reports পরিবেশন করুন। Next.js Admin Panel কেবল এই API ব্যবহার করবে; browser-side calculation-কে financial source of truth ধরা যাবে না। Statement parsing, report generation, partner API polling ও scheduled reconciliation Celery workers-এ চালান।

Webhook signature verification, replay protection, idempotency key, database transactions, row locking/unique constraints এবং immutable financial events ব্যবহার করুন। Commission calculation-এর ক্ষেত্রে কোন rule version প্রয়োগ হয়েছে, calculation inputs, rounding policy ও result snapshot সংরক্ষণ করুন; পরবর্তী rule change পুরোনো transaction-এর হিসাব স্বয়ংক্রিয়ভাবে বদলাবে না। Manual override করলে before/after value, reason, actor এবং approver রেকর্ড করতে হবে।

## 20.12 Acceptance criteria

- Admin অনুমোদিত role অনুযায়ী যেকোনো affiliate/provider source থেকে earning detail, status ও external reference দেখতে পারবেন।
- প্রতিটি earning-এর internal record থেকে source statement/conversion এবং সংশ্লিষ্ট booking পর্যন্ত trace করা যাবে।
- GBV, platform revenue, collected cash, receivable এবং vendor payable পৃথকভাবে দেখানো হবে।
- Duplicate webhook/import একই earning বা transaction দ্বিতীয়বার তৈরি করতে পারবে না।
- Refund, cancellation, chargeback ও commission reversal পূর্ববর্তী record মুছে না দিয়ে auditable correction হিসেবে দেখা যাবে।
- Statement-to-system reconciliation-এ matched/unmatched/mismatch ও control totals পাওয়া যাবে।
- Finance viewer write করতে পারবেন না; operator ও approver-এর অনুমতি আলাদা থাকবে; high-risk action maker-checker approval ছাড়া সম্পন্ন হবে না।
- Reports date basis, currency ও filter অনুযায়ী consistent totals দেবে এবং export access log হবে।
- Financial records backup/restore test-এর আওতায় থাকবে; audit ও financial history hard-delete করা যাবে না।

**Implementation priority:** Phase 1-এ revenue-source registry, affiliate/provider earning ledger, booking financial breakdown, Admin dashboard, statement import, basic reconciliation ও reports তৈরি করুন। Marketplace payment, refund, vendor payable/settlement এবং multi-currency FX-কে সংশ্লিষ্ট booking/payment capabilities-এর সঙ্গে ধাপে ধাপে চালু করুন। পূর্ণাঙ্গ ERP/general ledger যোগ করবেন না, যদি না business requirement আলাদাভাবে অনুমোদিত হয়।
