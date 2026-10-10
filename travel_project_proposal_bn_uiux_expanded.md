# ভ্রমণ তথ্য ও গন্তব্য আবিষ্কার প্ল্যাটফর্ম — প্রজেক্ট প্রপোজাল

**ডকুমেন্টের ধরন:** UI ও ফিচার বিশ্লেষণ, CMS requirements, backend domain design এবং database blueprint  
**স্ট্যাটাস:** প্রাথমিক requirements proposal; কোড বা নির্দিষ্ট technology stack নির্ধারণ করা হয়নি  
**প্রস্তাবিত scope:** প্রথম পর্যায়ে বাংলাদেশভিত্তিক tourism discovery ও editorial portal; পরে provider directory, affiliate integration এবং booking সুবিধা যোগ করার সুযোগ।

---

## ১. নির্বাহী সারাংশ

প্রকল্পটির লক্ষ্য হলো একটি আধুনিক, ছবি-কেন্দ্রিক, editorial-style ভ্রমণ ওয়েবসাইট তৈরি করা—যেখানে ব্যবহারকারী বাংলাদেশে কোথায় যাবেন, কী দেখবেন, কখন যাবেন, কীভাবে যাবেন এবং সংশ্লিষ্ট ভ্রমণ-গাইড বা itinerary কোথায় পাবেন, তা সহজে আবিষ্কার করতে পারবেন। সাইটটি দেখতে আকর্ষণীয় হবে, কিন্তু এর লেখা, ছবি, গন্তব্যের বিবরণ, নেভিগেশন, হোমপেজের section, প্রচারণা এবং footer-এর তথ্য সরাসরি CMS থেকে পরিচালিত হবে। নতুন section যোগ করা বা সেগুলোর অবস্থান বদলাতে developer-কে প্রতিবার কোড পরিবর্তন করতে হবে না।

সংযুক্ত reference project-টি মূলত একটি বড়, দীর্ঘ-স্ক্রল homepage-এর static capture। এতে desktop, tablet ও mobile screenshot, CSS/JavaScript, image/font assets, navigation panels, article/destination carousel-এর markup এবং clone-audit রিপোর্ট আছে। তবে এটি পূর্ণাঙ্গ live travel platform নয়: সব পৃথক destination/article page, কার্যকর search backend, account system, booking engine বা payment workflow-এর পূর্ণ বাস্তবায়ন এতে নেই। তাই দৃশ্যমান UI থেকে presentation pattern নেওয়া হবে, আর অনুপস্থিত product features নিচে requirements হিসেবে আলাদাভাবে প্রস্তাব করা হয়েছে।

**প্রধান নীতি:** reference-এর layout pattern থেকে অনুপ্রেরণা নেওয়া হবে; reference-এর লেখা, brand, logo, ছবি, font বা অন্য proprietary asset পুনর্ব্যবহার করা হবে না। নতুন visual identity এবং নিজস্ব বা যথাযথ লাইসেন্সপ্রাপ্ত media ব্যবহার করতে হবে।

## ২. Reference project-এর UI বিশ্লেষণ

### ২.১ Header ও navigation

- Desktop-এ এক সারির horizontal header: brand/logo, কয়েকটি প্রধান navigation group, search এবং প্রয়োজনে user/account বা commerce action।
- Navigation item-এর নিচে বড় mega-menu খুলতে পারে। সেখানে অঞ্চল/বিষয়ভিত্তিক subcategory, জনপ্রিয় link এবং featured content থাকতে পারে।
- ছোট স্ক্রিনে nested mobile menu ও back navigation প্রয়োজন; desktop hover interaction-কে mobile-এ সরাসরি কপি করা যাবে না।
- Menu, submenu, featured link, CTA label ও order CMS থেকে পরিচালিত হওয়া উচিত।
- Reference-এ search/account/cart-এর UI দেখা যায়; কিন্তু static files-এ সেগুলোর সম্পূর্ণ server-side functionality প্রমাণিত নয়। নতুন প্রকল্পে যে action বাস্তবে কাজ করবে না, সেটি header-এ দেখানো হবে না।

### ২.২ Homepage-এর দৃশ্যমান content pattern

1. **Hero feature:** viewport-এর বড় অংশ জুড়ে destination/campaign image; তার উপর বড় display heading, সংক্ষিপ্ত introduction এবং প্রধান CTA। Mobile layout-এ একই content image-এর বাইরে আলাদা text panel হিসেবেও দেখানো যায়।
2. **Editorial/campaign feature:** বড় background image, text overlay এবং একটি action link; মৌসুমি বা বিশেষ destination campaign-এর জন্য ব্যবহারযোগ্য।
3. **Image-promotion grid:** কয়েকটি বড় image card, প্রতিটিতে ছোট context label, title এবং CTA। এগুলো গন্তব্য, travel stories, guides, experiences বা local services-এ যেতে পারে।
4. **Horizontal card carousel:** একই ধরনের item এক সারিতে; left/right control এবং “সব দেখুন” ধরনের category navigation। Reference-এ itinerary card-এ duration ও price metadata আছে; আমাদের portal-এ তা কেবল package feature চালু হলে প্রযোজ্য হবে।
5. **Destination spotlight:** এক পাশে image, অন্য পাশে title, description এবং CTA—বিভিন্ন section-এ layout উল্টে দেওয়া যায়।
6. **Partner/sponsored feature:** আলাদা visual treatment-সহ featured partner বা campaign। বিজ্ঞাপন/partner content হলে তা স্পষ্টভাবে চিহ্নিত করতে হবে।
7. **Article carousel:** thumbnail, publish date, reading time, title এবং article link-সহ editorial card।
8. **Featured destination carousel:** image, geography/category context, title এবং destination detail page-এ যাওয়ার link।
9. **Trust/partner logo strip:** প্রযোজ্য হলে সংস্থা, media বা সহযোগীদের logo; অনুমতি ছাড়া কোনো প্রতিষ্ঠানের logo ব্যবহার নয়।
10. **Newsletter block:** email input, consent text, subscribe action এবং form feedback।
11. **Multi-column footer:** primary/secondary links, social channels, app links (যদি থাকে), language option, newsletter shortcut, privacy/terms/copyright information।

Reference HTML-এ অনেক hidden navigation section এবং responsive markup আছে। ফলে HTML tag-এর মোট section count-কে homepage-এ দেখা যায় এমন স্বতন্ত্র content section-এর সংখ্যা ধরে নেওয়া ঠিক হবে না। আবার article ও destination carousel-এর কিছু content server-island markup-এ সংরক্ষিত—শুধু main HTML পড়ে সব dynamic pattern বোঝা যায় না।

### ২.৩ Visual design principles

নতুন সাইটে নিচের নকশাগত নীতি গ্রহণ করা যেতে পারে:

- গন্তব্যের বড়, উচ্চমানের ছবি; প্রয়োজনমতো image overlay যাতে text পরিষ্কার থাকে।
- Display heading ও body text-এর মধ্যে স্পষ্ট typography contrast। বড় headline-এর পাশাপাশি আরামদায়ক body line-height এবং ভালো readability।
- White/off-white content area-এর সঙ্গে সীমিত সংখ্যক brand accent এবং dark footer-এর contrast। Reference-এর exact color/font copy না করে নিজস্ব tokens নির্ধারণ করতে হবে।
- বড় card, পরিষ্কার spacing, section-এর মধ্যে দৃশ্যমান বিরতি এবং পুনর্ব্যবহারযোগ্য content layout।
- Desktop, tablet ও mobile-এর জন্য আলাদা layout rules। অন্তত 390px, 768px এবং 1440px viewport-এ design review করা উচিত; সঙ্গে মাঝের width ও বড় text scale-ও পরীক্ষা করা প্রয়োজন।
- Carousel controls keyboard-accessible হবে; touch gesture থাকলেও button ও focus state রাখতে হবে।
- প্রতিটি image-এর meaningful alt text, heading hierarchy, visible focus state, readable contrast এবং mobile-এ উপযুক্ত tap target থাকতে হবে।

## ৩. প্রস্তাবিত product scope

### Phase 1 — Tourism information ও discovery portal

- বাংলাদেশে গন্তব্য, tourist spot, region এবং travel category আবিষ্কার।
- destination detail pages: বিবরণ, location, map coordinates, কী দেখবেন, কখন যাবেন, যাতায়াত, প্রয়োজনীয় সতর্কতা এবং gallery।
- travel stories/articles, travel guides এবং editorial collections।
- curated itinerary/route guide; শুরুতে informational, সরাসরি payment/booking নয়।
- CMS-controlled homepage, navigation, footer, featured content এবং seasonal campaign।
- destination ও article search/filter, SEO, newsletter এবং contact form।
- Admin dashboard, media library, content approval/publishing workflow এবং audit trail।

### Phase 2 — Local provider/service directory ও commercial integration

- hotel, tour operator, local guide, transport, activity বা অন্যান্য tourism provider directory।
- provider-managed listing/offer, business profile এবং contact/lead routing।
- affiliate link/click tracking বা third-party booking API integration।
- প্রয়োজন ও ব্যবসায়িক model নিশ্চিত হলে availability, booking, cancellation, payment, refund এবং commission management।

### Phase 3 — Personalization ও AI-assisted discovery

- user account, saved destinations/articles/itineraries এবং optional reviews।
- user preference অনুযায়ী trip discovery।
- CMS-এ যাচাই করা ও published তথ্যের ভিত্তিতে AI travel assistant বা itinerary suggestion; AI-কে যাচাইহীন opening hours, price, transport schedule বা safety fact বানিয়ে দিতে দেওয়া যাবে না।

**গুরুত্বপূর্ণ সিদ্ধান্ত:** Phase 1-এ সরাসরি booking/payment না রাখাই প্রস্তাবিত। Provider data, availability, refund এবং customer support একসঙ্গে সামলানোর operational readiness না থাকলে booking engine শুধু UI নয়—আলাদা ব্যবসায়িক/operational ব্যবস্থা।

## ৪. প্রস্তাবিত sitemap ও page types

| Page type | উদ্দেশ্য ও প্রধান content |
|---|---|
| Homepage | Hero, curated collections, featured destinations, latest stories, campaign/partner block, newsletter |
| Destination directory | বিভাগ/জেলা/উপজেলা/ধরন, জনপ্রিয়তা, উপযুক্ত season বা activity অনুসারে browse/filter |
| Destination detail | title, overview, gallery, map, geography, best time, visit duration, access guidance, amenities, travel notes, related article/itinerary |
| Destination category/region page | একটি অঞ্চল বা tourism type-এর intro, destination cards, related guides এবং map/list view |
| Article/story listing | category/tag/filter, date, author, card layout এবং pagination/load-more |
| Article/story detail | title, author, publish/update date, reading time, hero, structured content blocks, related destinations/articles, share metadata |
| Travel guide listing/detail | practical guide, checklist, seasonal advice, transport/access details, related destinations |
| Itinerary listing/detail | day-wise plan, stop order, map/route links, time estimate ও প্রয়োজনীয় notes; package না হলে price/availability নয় |
| Experience/service directory (Phase 2) | service category, geography, provider, features, contact/offer |
| Search results | query, type filters, geographic filters, sort, useful empty state |
| About/contact/help | organization information, contact channel, FAQ, correction/report form |
| Legal pages | privacy, cookies, terms, editorial policy, affiliate disclosure, content correction policy |
| Account/saved content (Phase 3) | profile, saved places, saved guides, preferences |
| CMS/admin | public website থেকে আলাদা role-protected content management interface |

URL path হতে পারে readable ও SEO-friendly—যেমন `/destinations/`, `/destinations/<slug>/`, `/stories/<slug>/`, `/guides/<slug>/`। এগুলো illustrative route; final URL policy content hierarchy ও SEO review-এর পরে স্থির হবে।

## ৫. CMS-এর প্রধান ক্ষমতা

### ৫.১ Page builder / Homepage composer

Homepage যেন hard-coded section-এর তালিকা না হয়। Admin নিচের কাজগুলো করতে পারবেন:

- section যোগ, সরানো, duplicate, hide/show এবং পুনঃক্রম নির্ধারণ;
- section type নির্বাচন—hero, spotlight, card grid, article carousel, destination carousel, itinerary list, partner banner, rich text, map, FAQ, newsletter ইত্যাদি;
- section-এর heading/intro/CTA, background style, image, card count, layout variant এবং desktop/mobile presentation নির্ধারণ;
- নির্দিষ্ট content manually select করা বা collection/filter থেকে auto-populate করা;
- section-এর publish schedule ও campaign start/end date নির্ধারণ;
- publish করার আগে desktop/mobile preview দেখা;
- কোনো destination/article unpublish হলে সেটির homepage card, menu link ও collection কীভাবে handle হবে তা নিয়ন্ত্রণ করা।

### ৫.২ Content editor

- Draft, review, approved, scheduled, published ও archived state।
- title, slug, summary, main content, featured image, gallery, author, category, tags, publish date এবং SEO fields।
- structured body blocks: paragraph, heading, image/figure, quote, list, callout, map/link, FAQ ইত্যাদি; raw HTML বাধ্যতামূলক নয়।
- content revision history, previous version restore, reviewer comments এবং publish permissions।
- Bangladesh-specific information-এর জন্য source/reference link, last verified date ও verification owner রাখা; বিশেষ করে opening hours, entry fee, access restrictions এবং seasonal claims পরিবর্তনশীল হতে পারে।

### ৫.৩ Menu ও footer manager

- একাধিক menu, nested menu item, order এবং visibility rules।
- menu item internal content, category, collection অথবা অনুমোদিত external URL-এ point করতে পারবে।
- mega-menu-তে link groups এবং optional featured content/media রাখা যাবে।
- footer columns, social profile URL, legal links, language selector, contact details এবং newsletter text CMS থেকে edit করা যাবে।
- broken/unpublished internal link detect করার validation প্রয়োজন।

### ৫.৪ Media library

- upload, search, filter, folder/collection, image preview এবং reuse tracking।
- asset-এর alt text, caption, photographer/source, usage rights/license, focal point, dimensions, format এবং credit।
- hero, card thumbnail, gallery ও social preview-এর জন্য আলাদা image rendition/crop ব্যবস্থাপনা।
- licensed/owned asset ছাড়া কোনো ছবি live site-এ publish করা যাবে না।
- একই media বিভিন্ন content-এ ব্যবহৃত হলে কোথায় ব্যবহৃত হচ্ছে তা দেখা যাবে।

## ৬. Database blueprint

এটি logical data model; physical schema, data types বা database engine এখন নির্ধারণ করা হচ্ছে না। মূল নীতি হলো content-এর shared fields এক জায়গায় রাখা, type-specific fields আলাদা রাখা, এবং homepage/menu/collection যেন মূল destination/article record-এর duplicate copy না হয়ে reference ব্যবহার করে।

### ৬.১ Identity ও permission

| Entity | প্রধান fields/সম্পর্ক | কাজ |
|---|---|---|
| `User` | id, name, email/username, password credential reference, active status, last login | admin/staff এবং ভবিষ্যতের registered user identity |
| `Role` | id, name, description | Super Admin, CMS Admin, Editor, Author, Media Manager, Tourism Verifier, Partner Manager, Provider Admin ইত্যাদি |
| `Permission` | id, resource, action | যেমন destination.read/create/edit/publish/delete |
| `UserRole` | user_id, role_id | এক user-কে এক বা একাধিক role দেওয়া |
| `RolePermission` | role_id, permission_id | role অনুযায়ী অনুমতি নিয়ন্ত্রণ |
| `AuditEvent` | actor_id, action, entity type/id, timestamp, change summary, request metadata | কে কখন কোন record বদলেছেন তার audit trail |

Public website-এ browsing-এর জন্য account বাধ্যতামূলক হবে না। CMS login এবং public user account-কে আলাদা permission boundary হিসেবে ধরতে হবে।

### ৬.২ Geography / administrative hierarchy

বাংলাদেশে বিভাগ, জেলা, উপজেলা ও প্রয়োজনে ইউনিয়ন/এলাকা ধরে data সংগঠিত করতে একটি parent-child hierarchy ব্যবহার করা উচিত; নির্দিষ্ট স্তরের নাম ও seed data configuration/lookup table-এ থাকবে।

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `GeoUnit` | id, parent_id, level/type, name, local_name, slug, description, centroid_lat, centroid_lng, sort_order, active |
| `GeoUnitAlias` | geo_unit_id, alias, language, alias_type — বানান/বিকল্প নাম/বাংলা-ইংরেজি নাম খোঁজার জন্য |
| `Country` বা country-level `GeoUnit` | শুরুতে বাংলাদেশ seed হিসেবে; ভবিষ্যতে অন্য দেশে expansion হলে hierarchy পুনর্গঠন না করেই যোগ করা যাবে |

`GeoUnit.parent_id` দিয়ে দেশ → বিভাগ → জেলা → উপজেলা/এলাকা সম্পর্ক তৈরি হবে। Tourist spot নিজে `GeoUnit` নয়; এটি একটি destination content record, যার সঙ্গে উপযুক্ত administrative area যুক্ত থাকবে। এতে অঞ্চল ও tourist spot-এর অর্থ আলাদা থাকে।

### ৬.৩ Shared content record এবং type-specific details

একটি shared `ContentItem` record সব মূল content-এর common identity হবে। এর সঙ্গে type-specific detail record যুক্ত থাকবে। এর ফলে collection, homepage section, related-content link, audit ও publishing workflow একই pattern ব্যবহার করতে পারবে।

| Entity | প্রধান fields |
|---|---|
| `ContentItem` | id, content_type, title, slug, short_summary, status, language, created_by, updated_by, created_at, updated_at, published_at, scheduled_at, verified_at |
| `PageDetails` | content_item_id, page_template, canonical_path, page_visibility, page options — সাধারণ landing/information page-এর জন্য |
| `DestinationDetails` | content_item_id, geo_unit_id, destination_type, address, latitude, longitude, overview, recommended_duration, best_season, access_summary, safety_notes, official_url, verification_source, verified_at |
| `ArticleDetails` | content_item_id, author_id, body/block content, reading_time, editorial_type, source notes |
| `GuideDetails` | content_item_id, guide_type, audience, difficulty/effort level যেখানে প্রযোজ্য, estimated duration, update/review date |
| `ItineraryDetails` | content_item_id, trip duration, style, suggested budget band (ঐচ্ছিক), start/end geography, route summary |
| `CampaignDetails` | content_item_id, campaign_type, start_at, end_at, sponsor/partner (যদি থাকে), disclosure label |
| `ContentRevision` | content_item_id, version_no, snapshot/diff, changed_by, change_note, created_at |

`content_type` হলো একটি controlled vocabulary—যেমন page, destination, article, guide, itinerary, campaign। যে field সব content-এর জন্য প্রযোজ্য নয়, সেটি জোর করে common table-এ জমা না দিয়ে উপযুক্ত detail table-এ থাকবে।

### ৬.৪ Structured body blocks

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `ContentBlock` | id, content_item_id, block_type, position, structured_data, visibility, created_at, updated_at |

একটি article বা guide-এর body paragraph, subheading, image, caption, quote, list, map reference, CTA কিংবা FAQ blocks দিয়ে সাজানো যাবে। UI rendering-এর জন্য অনুমোদিত block type-এর schema নির্ধারণ করতে হবে; arbitrary raw HTML-কে default content format করা উচিত নয়।

### ৬.৫ Taxonomy: category ও tag

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `TaxonomyTerm` | id, taxonomy_type, parent_id, name, slug, description, order, active |
| `ContentTerm` | content_item_id, term_id |

Taxonomy type দিয়ে destination category, article category, activity type, interest, season অথবা travel style আলাদা রাখা যাবে। Parent-child term nested category সমর্থন করবে। একই `ContentItem` একাধিক category/tag-এর সঙ্গে যুক্ত হতে পারবে।

### ৬.৬ Media ও asset management

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `MediaAsset` | id, storage_key, original_filename, mime_type, width, height, file_size, alt_text, caption, photographer/source, license_type, license_reference, focal_x, focal_y, uploaded_by, status |
| `ContentMedia` | content_item_id, media_asset_id, usage_role (hero/card/gallery/social/inline), position, alt_override, caption_override |
| `MediaVariant` | media_asset_id, variant_name, file reference, width, height, format, generated_at |

Media-এর credit/licence metadata না থাকলে public publish আটকানোর validation রাখা যেতে পারে। শুধু image filename বা hard-coded URL দিয়ে media ব্যবস্থাপনা করা উচিত নয়।

### ৬.৭ Collections ও reusable homepage sections

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `ContentCollection` | id, title, slug, collection_type, description, manual/automatic mode, filter rule, default sort, status |
| `CollectionItem` | collection_id, content_item_id, position, start_at, end_at, optional display override |
| `PageSection` | id, page_content_item_id, section_type, internal_name, heading_override, intro_override, CTA fields, visual_variant, config, collection_id (optional), hero_content_item_id (optional), position, visible, start_at, end_at |

`config`-এ শুধু section-এর presentation option রাখা হবে—যেমন card count, layout variant, image ratio, background tone বা CTA placement। Destination-এর আসল title/slug/location/price আলাদা করে section JSON-এ কপি করা হবে না; `ContentItem` বা সংশ্লিষ্ট detail record থেকে নেওয়া হবে। এতে content update হলে একই জায়গায় সংশোধন করলেই সব card-এ নতুন তথ্য দেখা যাবে।

যদি কোনো section-এ mixed content types দেখাতে হয়, `CollectionItem` shared `ContentItem` FK ব্যবহার করবে। যদি ভবিষ্যতে collection-এর item type-কে কঠোরভাবে আলাদা রাখতে হয়, type-specific association rule যোগ করা যাবে।

### ৬.৮ Navigation menu

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `NavigationMenu` | id, menu_key, display_name, location, active |
| `NavigationItem` | id, menu_id, parent_id, label, target_content_item_id (optional), external_url (optional), item_type, icon/media (optional), position, active, opens_new_tab |

একটি item internal content অথবা অনুমোদিত external URL—একটি target বেছে নেবে। `parent_id` nested menu তৈরি করবে। Menu label, link order, featured link এবং mobile visibility CMS থেকে edit করা যাবে।

### ৬.৯ Author ও editorial attribution

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `AuthorProfile` | id, user_id (optional), display_name, bio, avatar_media_id, credentials, public_profile_slug |
| `ContentAuthor` | content_item_id, author_profile_id, contribution_role, position |

একাধিক author/contributor থাকা, এবং staff account ছাড়াও guest author-এর attribution রাখা সম্ভব হবে।

### ৬.১০ Search, SEO ও redirect

SEO-এর গুরুত্বপূর্ণ fields `ContentItem` বা page/content-এর সংশ্লিষ্ট metadata-তে থাকবে; বড় project হলে আলাদা `ContentSEO` record করা যায়। Fields: meta title, meta description, canonical URL, robots directive, Open Graph image, social title/description এবং structured-data type।

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `URLRedirect` | old_path, new_path, redirect_type, active, created_by |
| `SearchQueryLog` (ঐচ্ছিক) | normalized_query, filters, result_count, timestamp, privacy-safe session reference |

Search index আলাদা প্রযুক্তিতে থাকতে পারে; মূল database content-এর source of truth হবে। Destination/article title, summary, aliases, category, geo hierarchy এবং tags অনুসন্ধানযোগ্য হতে হবে। Search log-এ অপ্রয়োজনীয় ব্যক্তিগত তথ্য রাখা যাবে না।

### ৬.১১ Newsletter ও contact

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `NewsletterSubscription` | id, normalized_email, status, consent_text_version, consent_at, confirmation_at, unsubscribe_at, source_page, created_at |
| `NewsletterEvent` | subscription_id, event_type, timestamp, provider_reference — opt-in/confirmation/unsubscribe evidence |
| `ContactSubmission` | id, name, email, subject/type, message, related_content_item_id (optional), status, assigned_to, submitted_at, resolved_at |

একই normalized email-এর duplicate subscription প্রতিরোধ করতে হবে। Newsletter list-এ যোগ হওয়ার আগে consent/confirmation workflow এবং unsubscribe ব্যবস্থা প্রয়োজন। Reference-এর form interaction কেবল client-side validation দেখায়; প্রকল্পে subscription database ও email-delivery workflow আলাদা করে বাস্তবায়ন করতে হবে।

### ৬.১২ Saved content, reviews এবং user features (ঐচ্ছিক/পরবর্তী পর্যায়)

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `UserProfile` | user_id, preferred_language, public display preferences, consent settings |
| `SavedContent` | user_id, content_item_id, saved_at |
| `Review` | user_id, target destination/provider listing, rating, review text, status, submitted_at, moderated_by, moderated_at |
| `ReportSubmission` | reporter reference (optional), target content, reason, details, status, action history |

Reviews চালু করার আগে moderation policy, spam control, reporting ব্যবস্থা এবং user-generated content-এর legal/privacy handling ঠিক করতে হবে। MVP-তে review বাধ্যতামূলক নয়।

### ৬.১৩ Provider directory (Phase 2)

| Entity | প্রধান fields/সম্পর্ক |
|---|---|
| `ProviderOrganization` | id, legal/business name, public name, registration/contact fields, verification status, primary_geo_unit_id |
| `ProviderUser` | provider_id, user_id, role, active — provider portal-এর staff access |
| `ProviderListing` | id, provider_id, content_item_id (বা listing detail), listing_type, geo_unit_id, contact method, status, verified_at |
| `ServiceCategory` | id, parent_id, name, slug, listing_type |
| `ListingCategory` | listing_id, category_id |
| `Offer` | id, provider_listing_id, title, description, terms, validity window, external_booking_url (optional), active |
| `ProviderVerification` | provider_id, verification_type, document/reference, status, reviewed_by, reviewed_at |

Provider profile এবং tourist destination আলাদা entity। একটি provider একাধিক service/listing পরিচালনা করতে পারে; একটি listing একাধিক category-তে থাকতে পারে। Provider-কে public content publish করার অনুমতি দেওয়া হবে কি না, তা moderation workflow দিয়ে নিয়ন্ত্রণ করতে হবে।

### ৬.১৪ Booking ও affiliate integration (শুধু ব্যবসায়িক সিদ্ধান্তের পরে)

সরাসরি booking চালু হলে প্রস্তাবিত entities:

- `Booking`: booking reference, customer, provider, status, currency, subtotal, fee/tax, total, created/confirmed/cancelled timestamps, cancellation policy snapshot।
- `BookingItem`: booking-এ থাকা offer/listing, quantity, date/time, unit price ও price snapshot।
- `BookingTraveler`: প্রয়োজনীয় traveller details; শুধুমাত্র workflow-এর জন্য দরকারি তথ্য সংগ্রহ।
- `AvailabilitySlot`/`DepartureSchedule`: product/offer, date/time, capacity, remaining inventory, cut-off time, status।
- `PaymentTransaction`: provider reference, amount, currency, status, idempotency reference, gateway response summary; card number/CVV-এর মতো payment credential নিজের database-এ সংরক্ষণ নয়।
- `Refund` ও `Cancellation`: booking reference, amount, reason, policy outcome, status এবং timestamps।
- `IntegrationEvent`: third-party API/webhook event, external reference, processing state, retry/error summary।
- Affiliate model হলে `AffiliatePartner`, `AffiliateOffer`, `AffiliateClick` ও `CommissionRecord`—direct booking/payment-এর বদলে outbound referral attribution ও reporting-এর জন্য।

Provider booking API এবং affiliate linking একই জিনিস নয়। External booking site-এ visitor পাঠানো হলে affiliate click/commission model যথেষ্ট হতে পারে। নিজে reservation/payment পরিচালনা করলে availability, payment reconciliation, cancellation/refund এবং customer support-এর আলাদা operational owner প্রয়োজন। তাই এই দুটি model-এর মধ্যে একটি আগে নির্বাচন করা উচিত।

## ৭. মূল database relationship map

- `GeoUnit` → parent-child geography; `DestinationDetails.geo_unit_id` দিয়ে destination-এর স্থান নির্ধারণ।
- `ContentItem` → `DestinationDetails` / `ArticleDetails` / `GuideDetails` / `ItineraryDetails` / `PageDetails`-এর type-specific detail record।
- `ContentItem` ↔ `TaxonomyTerm` — `ContentTerm` join table দিয়ে category/tag।
- `ContentItem` ↔ `MediaAsset` — `ContentMedia` দিয়ে hero, thumbnail, gallery ও inline media।
- `ContentItem` ↔ `ContentCollection` — `CollectionItem` দিয়ে curated order।
- `PageDetails` → `PageSection` → optional `ContentCollection` বা featured `ContentItem`।
- `NavigationMenu` → nested `NavigationItem` → internal `ContentItem` বা controlled external URL।
- `User` → `UserRole` → `Role` → `RolePermission` → `Permission`।
- `ContentItem` → `ContentRevision` এবং `AuditEvent` — version history ও accountability।
- Phase 2-তে `ProviderOrganization` → `ProviderListing` → `Offer` → optional `Booking` → `BookingItem` / `PaymentTransaction` / `Refund`।

## ৮. Backend capability groups

এগুলো logical capability group; কোনো নির্দিষ্ট framework বা technology এখন নির্ধারণ করা হচ্ছে না।

1. **Public content delivery:** homepage sections, destination, article, guide, itinerary ও collection পড়ার ব্যবস্থা। Public output-এ কেবল published ও বর্তমান সময়ের জন্য সক্রিয় content যাবে।
2. **CMS management:** create/edit/preview/review/publish/schedule/archive; role-based permission এবং change history।
3. **Navigation & site settings:** menu, footer, logo/brand configuration, social links, language options, legal links এবং homepage composition।
4. **Media service:** upload/metadata/rights, image variants, alt text, usage lookup এবং asset validation।
5. **Geography & destination:** hierarchy browse, destination filters, aliases, coordinates, related destinations এবং map metadata।
6. **Search & discovery:** text search, taxonomy filters, geographic filters, sort/pagination এবং empty/error state।
7. **Newsletter/contact:** email validation, duplicate handling, confirmation/unsubscribe, submission management এবং anti-spam control।
8. **SEO & indexing:** canonical/metadata, sitemap, robots settings, redirects, structured data এবং unpublished content গোপন রাখা।
9. **Provider/integration (Phase 2):** provider verification, service listing, external ID mapping, import/sync log, affiliate tracking বা booking workflow।
10. **Analytics/reporting:** জনপ্রিয় destination, article engagement, search queries with no results, newsletter conversions এবং CMS publishing activity। Analytics user privacy ও consent নীতি মেনে চলবে।

## ৯. Admin interface-এর প্রস্তাবিত menu

- **Dashboard:** pending review, scheduled posts, recently updated content, incomplete destination records, broken link/media alerts।
- **Destinations & Geography:** location hierarchy, destination CRUD, categories, coordinates, gallery, access/season information এবং verification।
- **Stories & Guides:** article/guide editor, author assignment, taxonomy, SEO এবং related content।
- **Itineraries:** day-wise schedule, ordered stops, map links, related destinations।
- **Collections & Campaigns:** curated sets, seasonal features, partner/sponsored content এবং start/end time।
- **Homepage & Pages:** drag/reorder section list, preview এবং publish schedule।
- **Navigation & Footer:** top-level menu, nested links, featured menu items, footer columns ও social links।
- **Media Library:** images, credits/licences, alt text, variants এবং reuse references।
- **Newsletter & Contact:** subscription status, contact inbox, assignment এবং resolution status।
- **Users & Permissions:** staff, roles, permission assignment, login/security events।
- **SEO & Redirects:** metadata completeness, canonical paths, redirect management এবং indexing checks।
- **Provider/Booking (Phase 2):** verification, offers/listings, integration events, bookings, cancellations এবং reconciliation।
- **Audit & Reports:** who changed what, publish history, search no-results, content coverage এবং verification expiry reports।

## ১০. Content publishing workflow

1. Author নতুন record তৈরি করে draft হিসেবে save করবেন।
2. Required fields, slug uniqueness, image credit/license, alt text, category এবং SEO completeness validate হবে।
3. Editor/subject reviewer content review করবেন; correction note বা approval দেবেন।
4. প্রয়োজন হলে নির্দিষ্ট সময়ে publish schedule করা হবে।
5. Publish হলে public page, relevant collection, navigation এবং search index-এ content উপলব্ধ হবে।
6. সংশোধন/নতুন তথ্য এলে version history তৈরি হবে; পুরোনো version restore করা যাবে।
7. Expired campaign auto-hide হবে; unverified/expired time-sensitive destination details review queue-তে যাবে।
8. Archive/delete করলে related pages, internal links ও saved references কীভাবে handle হবে তা নির্ধারিত policy অনুযায়ী হবে; সাধারণত live content সরানোর আগে redirect বা replacement destination ঠিক করা উচিত।

## ১১. Non-functional requirements

- **Responsive:** mobile-এ image/text order, menu, carousel, forms এবং footer সঠিকভাবে ব্যবহারযোগ্য।
- **Performance:** hero image optimized; below-the-fold image lazy-load; প্রয়োজনীয় image size/format; oversized media upload warning; caching strategy।
- **Accessibility:** semantic headings, keyboard navigation, focus state, contrast, alt text, form labels, visible error/success messages।
- **SEO:** stable slug, canonical URL, meaningful metadata, structured data where appropriate, sitemap, redirect policy এবং article/destination internal linking।
- **Security:** admin role boundary, least privilege, secure password/session handling, login throttling, validation, CSRF/XSS protection, secure file upload, audit logging।
- **Data integrity:** unique slug/path, foreign key relations, controlled statuses, duplicate newsletter prevention, active/published filtering এবং safe deletion/archive policy।
- **Backup/recovery:** database backup, media backup, restore test এবং content export strategy।
- **Privacy:** newsletter consent/unsubscribe, contact retention policy, minimal collection of personal information এবং analytics consent policy।
- **Content quality:** facts-এর source, last verified date এবং responsible editor; বিশেষত entry fee, operating hours, weather/season, transport ও safety advice-এর ক্ষেত্রে।
- **Observability:** failed publish, broken media, external API failure এবং email delivery failure-এর admin-visible logs/alerts।

## ১২. Data validation ও indexing rules

- `ContentItem.slug` এবং public path uniqueness policy; language-specific route হলে uniqueness-এর scope স্পষ্ট করতে হবে।
- `published` content-এর জন্য title, slug, required summary, main image যেখানে প্রয়োজন, author/credit এবং required taxonomy পূরণ থাকতে হবে।
- `GeoUnit.parent_id`, destination coordinate range এবং hierarchy rule validate করতে হবে।
- Published content-এ যে media asset দেখানো হচ্ছে তার rights/license status গ্রহণযোগ্য হতে হবে।
- Lists/carousels-এ active, published, date-valid content ছাড়া item দেখানো যাবে না।
- Search fields: title, summary, aliases, tags, region hierarchy এবং article body-এর নির্বাচিত অংশ।
- Common indexes: slug/path, status + published_at, geo_unit_id, taxonomy relation, collection order এবং article publish date। Map-based search থাকলে coordinate/geospatial index বিবেচনা করতে হবে।
- `Booking` চালু হলে price/currency snapshot, status transition, idempotent payment processing এবং duplicate webhook protection বাধ্যতামূলক হবে।

## ১৩. প্রস্তাবিত delivery phases

### Phase 0 — Requirements ও content planning

- সাইটটি informational/referral/booking—কোন business model-এ চলবে তা নির্ধারণ।
- বাংলাদেশে geography hierarchy ও destination taxonomy স্থির করা।
- Brand identity, typography, color tokens, image rules এবং reusable UI module design।
- CMS field list, roles/workflow, content templates ও import spreadsheet format নির্ধারণ।

### Phase 1 — Public portal + CMS MVP

- responsive homepage composer;
- geography ও destination management;
- articles/stories/guides এবং media library;
- content collections, dynamic navigation ও footer;
- search/filter, SEO/redirect, newsletter/contact;
- role permission, approvals, scheduling, audit/version history;
- sample desktop/tablet/mobile content দিয়ে acceptance testing।

### Phase 2 — Provider ecosystem

- provider organization, verification এবং service directory;
- provider listing/offer এবং lead/referral tracking;
- affiliate বা direct booking integration model নির্বাচন;
- selected model অনুযায়ী availability/booking/payment/refund/reconciliation requirements।

### Phase 3 — User experience ও AI

- saved content, user preferences এবং moderated reviews (যদি দরকার হয়);
- recommendation এবং itinerary builder;
- published/verified CMS content-ভিত্তিক AI discovery assistant;
- AI response source attribution, uncertainty messaging এবং outdated facts detection।

## ১৪. Acceptance criteria — প্রথম version সম্পন্ন হয়েছে বলা যাবে যখন

- homepage-এর প্রতিটি title, summary, image, CTA, section order ও visibility CMS দিয়ে বদলানো যায়;
- navigation/menu/footer content-এর জন্য template/code change দরকার হয় না;
- destination/article/guide নতুন করে তৈরি, preview, approve, schedule, publish, update এবং archive করা যায়;
- destination page-এ administrative geography, coordinates, gallery, related stories ও SEO metadata থাকে;
- published content-এর বাইরে draft/scheduled/archived data public response বা search result-এ প্রকাশ পায় না;
- desktop, tablet ও mobile-এ menu, hero, cards, carousel, form ও footer পরীক্ষা করা হয়েছে;
- newsletter subscription consent/confirmation/unsubscribe-এর বাস্তব workflow আছে; শুধু browser alert/inline message নয়;
- media source/licence ও alt text track করা যায়;
- role-based access এবং audit history কাজ করে;
- database/media backup ও restore process যাচাই করা হয়েছে;
- proprietary reference text, branding, fonts এবং images deployable project-এ অন্তর্ভুক্ত নয়।

## ১৫. Final recommendation

প্রথমে একটি **CMS-driven tourism discovery ও editorial portal** তৈরি করা সবচেয়ে যুক্তিযুক্ত। Reference-এর visual strength—বড় hero image, clean navigation, feature cards, editorial carousel, destination spotlight এবং strong footer—রাখা যেতে পারে, কিন্তু নকশা, branding, copy ও media নতুন হবে। Database-এ `ContentItem`-কেন্দ্রিক reusable content model, hierarchical geography, collections/page sections, media rights metadata, taxonomy, navigation এবং publishing workflow-কে ভিত্তি করতে হবে।

Provider directory ও booking-এর schema-র জন্য extension points রাখা হবে, কিন্তু প্রথম release-এ booking/payment implementation না করাই ভালো—যতক্ষণ না booking model, supplier responsibilities, payment/cancellation policy এবং support workflow নিশ্চিত হয়। এভাবে MVP-তে প্রয়োজনীয় content architecture তৈরি হবে, অথচ অপ্রয়োজনীয় commerce complexity শুরুতেই project-কে ভারী করবে না।

---

# ১৬. বিস্তারিত UI/UX Design Brief — Reference-এর মতো বা তার চেয়েও ভালো অভিজ্ঞতা

এই অধ্যায়টি প্রকল্পের visual design, interaction ও user experience-এর মূল নির্দেশনা। লক্ষ্য শুধু reference-এর মতো বড় ছবি ও card ব্যবহার করা নয়; বরং এমন একটি ভ্রমণ-আবিষ্কার অভিজ্ঞতা তৈরি করা, যেখানে সাইটটি প্রথম দেখায় আকর্ষণীয়, ব্যবহার করতে সহজ, তথ্য খুঁজতে দ্রুত এবং mobile-এ নির্ভরযোগ্য হবে। Reference-এর presentation pattern অনুপ্রেরণা হিসেবে নেওয়া হবে, কিন্তু নতুন brand identity, content hierarchy, interaction design ও visual details তৈরি করতে হবে।

## ১৬.১ ডিজাইনের অবস্থান: “Editorial beauty + practical travel utility”

প্রস্তাবিত UI হবে travel magazine-এর মতো visually rich, কিন্তু কেবল magazine-এর মতো পড়ার অভিজ্ঞতায় সীমাবদ্ধ থাকবে না। ব্যবহারকারী যেন একসঙ্গে তিনটি কাজ করতে পারেন:

1. **Discover:** নতুন destination, experience, seasonal attraction এবং travel story খুঁজে পাওয়া।
2. **Plan:** কোথায় অবস্থিত, কীভাবে যাবেন, কত সময় লাগতে পারে, কখন যাওয়া ভালো, কী প্রস্তুতি প্রয়োজন—এসব ব্যবহারযোগ্য তথ্য পাওয়া।
3. **Continue:** related destination, itinerary, guide, service listing বা external booking/resource-এ স্বাভাবিকভাবে এগিয়ে যাওয়া।

সাইটটি যেন শুধু সুন্দর ছবি ও অসংখ্য card-এর একটি পৃষ্ঠা না হয়ে যায়। প্রতিটি visual section-এর একটি নির্দিষ্ট উদ্দেশ্য থাকবে: নতুন কিছু আবিষ্কার করানো, একটি প্রশ্নের উত্তর দেওয়া, কোনো category-তে প্রবেশ করানো বা পরবর্তী action সহজ করা।

### নকশাগত ভারসাম্য

- **Visual impact:** বড় hero image, strong headline, editorial composition এবং high-quality destination photography।
- **Information clarity:** ছোট ও স্পষ্ট label, পরিষ্কার heading, পড়ার উপযোগী text width এবং predictable navigation।
- **Action clarity:** প্রতিটি গুরুত্বপূর্ণ জায়গায় বোঝা যাবে কোনটি clickable, কোথায় গেলে কী পাওয়া যাবে এবং filter/search কীভাবে reset করা যায়।
- **Trust:** তথ্য কখন update/verify হয়েছে, কোন তথ্য আনুমানিক, এবং sponsored/affiliate content কোনটি—এসব যথাযথভাবে দেখানো।
- **Performance:** বড় ছবি থাকবে, কিন্তু ছবি লোড হতে দীর্ঘ সময় লাগা বা scroll করার সময় layout লাফিয়ে ওঠা চলবে না।

## ১৬.২ প্রস্তাবিত visual direction ও brand system

### Overall visual character

- Clean, editorial, modern এবং image-led layout।
- বড় heading, কিন্তু প্রতিটি section-এ একাধিক বড় headline নয়; hierarchy সংযত রাখতে হবে।
- White বা warm-neutral surface-এর মধ্যে কিছু full-bleed image section এবং গাঢ় footer ব্যবহার করা যায়।
- Card, border, shadow ও rounded corner ব্যবহারে সংযম। সবকিছুকে আলাদা “floating card” বানালে সাইট ভারী ও template-সদৃশ দেখাতে পারে।
- ছবির সঙ্গে text panel কখনও overlay, কখনও split layout, কখনও open background-এ থাকবে—তবে একই ধরনের content-এ pattern consistent হতে হবে।
- Bangladesh travel context-এর জন্য নদী, সবুজ, পাহাড়, সমুদ্র, heritage ও rural landscape-এর ছবি ব্যবহার করা যেতে পারে; তবে পুরো UI-কে শুধু green/eco theme-এ আটকে না রেখে বিভিন্ন destination-এর রঙকে জায়গা দিতে হবে।

### প্রাথমিক colour direction

নিচের palette একটি starting point, চূড়ান্ত branding নয়। আসল palette নির্বাচন করার সময় text/background contrast যাচাই করতে হবে।

| Design token | প্রস্তাবিত দিক | কোথায় ব্যবহার হতে পারে |
|---|---|---|
| Primary dark | গভীর forest/ink tone | header text, footer, primary dark surface |
| Primary brand | forest green বা deep teal | primary CTA, selected navigation, links |
| Secondary accent | river/sky blue বা teal | map, geographic elements, secondary accents |
| Warm neutral | ivory/sand/off-white | main content background, calm section surface |
| Highlight accent | restrained coral/amber | ছোট highlight, badge বা campaign label; বড় area-তে নয় |
| Text primary | near-black/charcoal | body/headings on light surface |
| Text secondary | contrast-checked muted grey | date, helper text, metadata |
| Status colours | success/warning/error/info-এর আলাদা token | validation, alerts ও system feedback |

**নিয়ম:** brand accent-কে সব জায়গায় ব্যবহার করা হবে না। বড় title, body text, disabled state, link এবং button-এর contrast আলাদা করে পরীক্ষা করতে হবে। শুধু রঙ দিয়ে selected/error/success state বোঝানো যাবে না; icon বা text label-ও থাকবে।

### Typography

- Display heading-এর জন্য characterful কিন্তু পাঠযোগ্য typeface ব্যবহার করা যেতে পারে; body copy হবে শান্ত, নিরপেক্ষ ও অত্যন্ত legible।
- বাংলা ও ইংরেজি দুই ভাষা দেখানোর পরিকল্পনা থাকলে font pairing, line-height, numeral, punctuation, bold weight এবং একই heading-এর line wrapping দুই ভাষায় পরীক্ষা করতে হবে।
- সম্ভাব্য প্রাথমিক candidate হিসেবে Noto Sans Bengali বা Hind Siliguri (বাংলা), এবং Inter/Manrope-এর মতো neutral Latin font পরীক্ষা করা যায়; কোনটি ভালো দেখায় তা prototype-এ যাচাই করে স্থির করতে হবে। এগুলো বাধ্যতামূলক নয়।
- Font weight শুধু bold করে hierarchy তৈরি না করে size, spacing, line length এবং colour-ও ব্যবহার করতে হবে।
- Paragraph-এর লাইন খুব লম্বা হবে না; দীর্ঘ article body-কে desktop-এ আরামদায়ক reading width-এ সীমাবদ্ধ রাখতে হবে।
- CMS-এ heading style-এর জন্য অনুমোদিত preset থাকবে; editor যেন প্রতি block-এ অনিয়ন্ত্রিত font size/style দিয়ে design নষ্ট করতে না পারেন।

### Spacing, shape ও grid

- একটি spacing scale নির্ধারণ করতে হবে (যেমন 4/8-point ভিত্তিক scale), যাতে section-to-section gap, card padding, button height এবং form spacing ধারাবাহিক থাকে।
- Desktop-এ content সর্বদা browser-এর পুরো প্রস্থ জুড়ে লেখা হবে না; একটি readable maximum content width থাকবে। Full-bleed image section ইচ্ছাকৃতভাবে edge-to-edge হতে পারে।
- Card-এর image ratio, title spacing, metadata placement ও CTA position type অনুযায়ী নির্দিষ্ট হবে। একই ধরনের card-এ একই alignment রাখতে হবে।
- Border radius, shadow, divider ও surface elevation-এর নির্দিষ্ট token থাকবে; প্রতিটি component-এ নতুন করে আলাদা style বানানো হবে না।

## ১৬.৩ Homepage-এর প্রস্তাবিত user-oriented layout

Reference-এর pattern বজায় রেখে homepage-এ অনেক section রাখা সম্ভব, তবে সব section একই গুরুত্ব পাবে না। প্রথম screen থেকেই ব্যবহারকারীকে বোঝাতে হবে: এই সাইটে কী পাওয়া যায়, কীভাবে গন্তব্য খুঁজবেন, এবং কোন action দিয়ে শুরু করবেন।

### Section 1 — Header ও primary navigation

- Brand/logo এবং মূল navigation এক নজরে বোঝা যাবে।
- প্রস্তাবিত primary navigation: **গন্তব্য**, **ভ্রমণ-গাইড**, **ভ্রমণ-কাহিনি**, **ইটিনারারি**, এবং প্রয়োজন হলে **স্থানীয় সেবা**। প্রকৃত taxonomy ও business model অনুযায়ী final label স্থির হবে।
- Search button দৃশ্যমান থাকবে; search ব্যবহারকারীর প্রধান task হওয়ায় সেটিকে icon-only লুকিয়ে রাখা ঠিক হবে না, বিশেষত desktop-এ।
- Header sticky হবে কি না তা prototype-এ পরীক্ষা করতে হবে। Sticky হলে scroll-এর সময় header content-এর বেশি vertical space দখল করবে না এবং mobile-এ প্রয়োজনীয় reading area ঢেকে রাখবে না।
- Menu item-এর label ছোট ও স্বাভাবিক ভাষার হবে; অস্পষ্ট creative label-এর বদলে ব্যবহারকারীর প্রত্যাশার সঙ্গে মেলে এমন নাম বেছে নিতে হবে।

### Section 2 — Hero feature

- একটি primary visual story বা destination; একইসঙ্গে পাঁচটি message দেওয়ার চেষ্টা নয়।
- ছবির উপর heading থাকলে subtle dark gradient/overlay থাকবে, যাতে সাদা text কেবল ছবির নির্দিষ্ট অন্ধকার অংশের উপর নির্ভরশীল না হয়।
- Heading-এর নিচে এক বা দুই লাইনের introduction এবং একটি প্রধান CTA; প্রয়োজন হলে দ্বিতীয়টি low-emphasis link হতে পারে।
- Hero-র height responsive হবে। Desktop-এ dramatic composition রাখা যায়, কিন্তু mobile-এ এত লম্বা করা যাবে না যে heading, CTA ও পরবর্তী content খুঁজতে অযথা scroll করতে হয়।
- Hero image focal point CMS-এ set করা যাবে, যাতে একই ছবি mobile crop-এও subject হারিয়ে না ফেলে।
- Hero background image-এ লেখা baked-in থাকবে না; title, caption এবং CTA HTML content হবে, যাতে responsive, accessible ও CMS-editable থাকে।
- **প্রস্তাব:** homepage hero-কে স্বয়ংক্রিয়ভাবে প্রতি কয়েক সেকেন্ডে বদলানো carousel না করে একটি curated, স্থিতিশীল featured story দিয়ে শুরু করুন। সময়ভিত্তিক campaign প্রয়োজন হলে editor সেটি বদলাতে পারবেন।

### Section 3 — Quick discovery/search

Hero-র পরে, অথবা hero-র নিচের compact strip-এ user-এর intent অনুযায়ী destination discovery শুরু করা যায়। এটি অত্যধিক জটিল booking form হবে না।

প্রস্তাবিত field/control:
- “কোথায় ঘুরতে চান?” — destination, district, division বা alias search;
- “কী ধরনের জায়গা?” — সমুদ্র, পাহাড়, বন, heritage, নদী, family-friendly, nature ইত্যাদি taxonomy-driven quick filter;
- optional “কখন/কোন season?” — কেবল তথ্য নির্ভরযোগ্যভাবে maintain করা গেলে;
- “খুঁজুন” action এবং filter clear/reset control।

প্রথম screen-এ একসঙ্গে ৬–৮টি field দেখাবেন না। অধিকাংশ visitor-এর জন্য location/category search এবং curated shortcuts যথেষ্ট। Advanced filters directory page-এ থাকবে।

### Section 4 — Region/division দিয়ে browse

- ব্যবহারকারী যে অঞ্চল বা বিভাগের নাম চেনেন তা দিয়ে browse করতে পারবেন।
- বিভাগগুলোর visual tile বা compact list রাখা যায়; প্রত্যেকটিকে বড় photo card করা বাধ্যতামূলক নয়।
- কোনো division-এর image নেই বা featured destination কম থাকলে empty tile বা ভাঙা grid দেখাবে না; fallback presentation থাকবে।
- Division select করলে region overview page-এ যাবে, যেখান থেকে district ও destination-এ drill down করা যাবে।

### Section 5 — Popular / editor-picked destinations

- প্রথমে 3–6টি শক্তিশালী destination card দেখানো যায়; card layout screen width অনুযায়ী responsive হবে।
- “Popular” যদি বাস্তব analytics দ্বারা নির্ধারিত না হয়, সেটিকে “Editor’s picks”, “এই মুহূর্তে বাছাই করা” বা অনুরূপ label দিয়ে প্রকাশ করতে হবে। ভুয়া popularity claim করা যাবে না।
- প্রতিটি card-এ title, geographic context এবং এক লাইনের useful clue থাকবে। Metadata যেমন distance/duration/price তখনই দেখাতে হবে, যখন তা সঠিক, তুলনাযোগ্য এবং নিয়মিত update হয়।
- “সব গন্তব্য দেখুন” link section-এর শেষে নয়, heading-এর কাছে দৃশ্যমান রাখা যায়।

### Section 6 — Editorial campaign বা destination spotlight

- Reference-এর মতো image + text split panel ব্যবহার করা যায়।
- একই layout বারবার পুনরাবৃত্তি না করে image-left/text-right এবং text-left/image-right variant ঘুরিয়ে ব্যবহার করা যায়, তবে অকারণে প্রতিটি section-এ layout বদলাবেন না।
- CTA-এর destination আগে থেকেই পরিষ্কার হবে। Sponsored content হলে sponsor label দৃশ্যমান থাকবে।

### Section 7 — Travel guides ও planning content

- “কীভাবে যাবেন”, “কখন যাবেন”, “কী প্রস্তুতি নেবেন”, “স্থানীয় পরিবহন”, “প্রবেশ/অনুমতির নিয়ম”—এই ধরনের practical guide-কে editorial story-এর পাশাপাশি গুরুত্ব দিন।
- Safety, transport schedule, entry fee বা opening hours-কে evergreen decorative text হিসেবে নয়; source এবং verification date-সহ তথ্য হিসেবে পরিচালনা করুন।

### Section 8 — Stories/articles

- Card-এ category/label, title, ছোট excerpt এবং publish/update date-এর মতো দরকারি context থাকবে।
- সব article card-এ date, author, category, reading time একসঙ্গে গাদাগাদি করবেন না; content type ও screen অনুযায়ী দরকারি metadata বেছে নিন।
- “আরও পড়ুন” সব card-এ থাকতেই হবে এমন নয়—কার্ডের title/image link-এর পাশাপাশি পুরো card click করা গেলে keyboard focus ও accessible link name সঠিক রাখতে হবে।

### Section 9 — Itinerary ও suggested travel routes

- একটি itinerary card-এ duration/route style-এর মতো তথ্য দেখানো যায়। Price বা “from” price কেবল প্রকৃত package/offer থাকলে দেখাতে হবে; informational itinerary-কে paid package-এর মতো উপস্থাপন নয়।
- Itinerary detail page-এ day-wise plan এবং map/route link থাকবে। Route/duration অনিশ্চিত হলে সুনির্দিষ্ট প্রতিশ্রুতি না দিয়ে estimated বলে স্পষ্ট করা হবে।

### Section 10 — Partner/service spotlight (শুধু প্রাসঙ্গিক হলে)

- Phase 1-এ commercial partner না থাকলে এই section বাদ থাকবে; placeholder logo বা কল্পিত partner দিয়ে page পূরণ করা যাবে না।
- Phase 2-তে listing/offer থাকলে sponsor/affiliate disclosure এবং destination content থেকে commercial offer-এর পার্থক্য স্পষ্ট করতে হবে।

### Section 11 — Newsletter / updates

- একটি পরিষ্কার value proposition, email field, consent/ privacy note এবং subscribe action।
- Submission feedback একই জায়গায় দেখাতে হবে: validation error, successful subscription, duplicate email বা confirmation প্রয়োজন হলে কী ঘটবে।
- Newsletter form যেন পড়ার অভিজ্ঞতা বাধাগ্রস্ত করা intrusive pop-up না হয়। Exit-intent popup MVP-তে প্রয়োজন নেই।

### Section 12 — Footer

- Footer-এ link-গুলো group অনুযায়ী থাকবে: Explore, Travel guides, About, Contact, Legal, Social/Newsletter—প্রকৃত site structure অনুযায়ী।
- Dark footer ব্যবহার করা যেতে পারে, কিন্তু link contrast, focus ring ও mobile accordion behavior সঠিক হতে হবে।
- সব district/spot-এর লম্বা তালিকা footer-এ ঢোকাবেন না; sitemap বা directory page-এ structured access থাকবে।

## ১৬.৪ Desktop mega-menu ও mobile navigation behaviour

### Desktop

- Menu item-এ hover করলে submenu খুলতে পারে, কিন্তু click দিয়েও toggle/visit করা যাবে। শুধু hover-এর উপর নির্ভর করলে keyboard ও touch ব্যবহারকারী সমস্যায় পড়েন।
- Mega-menu-তে 3–4টি অর্থবহ group, সংক্ষিপ্ত link list এবং ঐচ্ছিক featured destination/story রাখা যায়। প্রতিটি link-এর সঙ্গে দীর্ঘ description জুড়ে mega-menu-কে অকারণে বড় করবেন না।
- Pointer trigger থেকে menu panel-এ যাওয়ার সময় accidental close যেন না হয়। Menu বাইরে click, Escape অথবা অন্য primary item select করলে predictableভাবে বন্ধ হবে।
- Focus menu থেকে বাইরে গেলে menu বন্ধ হবে, তবে submenu-এর ভেতরে tab করলে অপ্রত্যাশিতভাবে collapse হবে না।

### Mobile/tablet

- Hamburger/menu button-এর accessible name ও expanded/collapsed state থাকবে।
- Nested item-এর জন্য accordion বা “এক ধাপ ভিতরে” drill-in view; back button/label দৃশ্যমান।
- Desktop mega-menu-কে ক্ষুদ্র font দিয়ে ফোনে সংকুচিত করা যাবে না। Mobile-এ hierarchy simplify করতে হবে।
- Menu open থাকলে page-এর পেছনের content scroll হওয়া নিয়ন্ত্রণ করতে হবে; close করলে আগের scroll position থাকবে।
- Search এবং প্রধান destination browse path menu-এর গভীরে লুকানো থাকবে না।

## ১৬.৫ Search ও filter-এর UX specification

Search হলো site-এর সবচেয়ে গুরুত্বপূর্ণ utility-এর একটি। শুধু একটি input থাকলেই ভালো search হয় না; typing, suggestion, filter, reset, no-result ও spelling variation-এর behavior নির্দিষ্ট করতে হবে।

### Search input

- Placeholder-এর পাশাপাশি persistent label বা accessible name থাকবে।
- ব্যবহারকারী টাইপ করলে destination/article/guide-এর suggestion দেখা যেতে পারে, কিন্তু suggestion panel input-কে ঢেকে ফেলবে না।
- Keyboard up/down, Enter, Escape এবং mouse/touch—সব দিয়ে suggestion ব্যবহার করা যাবে।
- Search term-এর alias/support থাকবে—বাংলা/ইংরেজি নাম, প্রচলিত বানান ও transliteration উপযোগীভাবে index করা যায়।
- Search submitted হলে URL-এ query/filters প্রকাশ করা গেলে back/forward, share ও refresh-এ একই ফলাফল ধরে রাখা সহজ হবে; sensitive data URL-এ রাখা যাবে না।

### Results page

- Top-এ search query, result count এবং active filter chip দেখাবে।
- Sort options কেবল বাস্তব sort strategy থাকলে দেখানো হবে—যেমন relevance, recently updated, alphabetical; ভুয়া popularity sort নয়।
- Desktop-এ sidebar filters রাখা যায়; mobile-এ “Filter” button চাপলে bottom sheet/full-screen panel খুলবে। Apply/clear action স্পষ্ট থাকবে। Filter panel বন্ধ করলেই অনিচ্ছাকৃতভাবে সব selection হারিয়ে যাবে না।
- Filter apply করলে result count এবং visible content update হবে; loading state দেখাতে হবে।
- No-result state-এ “কোনো ফল নেই” বলে থেমে না গিয়ে বানান পরীক্ষা, filter clear, broader geography, suggested destinations অথবা related guide-এর পথ দেখাতে হবে।
- Filter, sort ও pagination একত্রে কাজ করবে; নতুন filter প্রয়োগে page number reset করতে হবে।
- Infinite scroll-এর বদলে pagination বা স্পষ্ট “আরও দেখুন” action অধিক নিয়ন্ত্রণযোগ্য। ব্যবহারকারী refresh/back করলে অবস্থান ও search context অপ্রত্যাশিতভাবে হারাবে না।

## ১৬.৬ Destination directory/list page

- Page title, short intro এবং breadcrumb দিয়ে শুরু হবে।
- Search/filter toolbar সহজে খুঁজে পাওয়া যাবে; অপ্রয়োজনীয় filter শুরুতেই প্রসারিত না রেখে advanced option-এ রাখা যায়।
- List/grid switch কেবল যদি দুই view-তেই তথ্যের ব্যবহারিক সুবিধা থাকে। Map view থাকলে list-এর বিকল্প হিসেবে রাখুন—map একাই একমাত্র navigation mechanism হবে না।
- Card-এ image, place name, administrative context এবং এক লাইনের differentiator থাকবে। একই district-এর অনেক destination card-এ label বা title layout ধারাবাহিক হবে।
- Desktop grid-এ তিন বা চারটি card মানানসই হতে পারে; ফোনে এক/দুই কলাম ব্যবহারযোগ্যতা ও screen width অনুযায়ী prototype-এ পরীক্ষা করতে হবে। নির্দিষ্ট সংখ্যা সব device-এ জোর করে প্রয়োগ নয়।
- Pagination/load more-এর সময় screen reader status বা visible result feedback থাকবে।

## ১৬.৭ Destination detail page — প্রস্তাবিত anatomy

Destination page হবে এই সাইটের প্রধান reusable page template। এটি beautiful editorial page এবং practical travel reference—দুই ভূমিকা পালন করবে।

1. **Breadcrumb:** Home → Division/Region → District → Destination; mobile-এ প্রয়োজনমতো সংক্ষিপ্ত করা যায়।
2. **Intro zone:** destination name, short summary, location context এবং meaningful hero image/gallery।
3. **Quick facts:** প্রয়োজন অনুযায়ী best season, suggested visit duration, destination type, accessibility/amenity highlights। যাচাই করা হয়নি এমন তথ্য quick facts হিসেবে দেখাবেন না।
4. **Primary actions:** map/directions, related itinerary/guide, save/share (account feature চালু হলে)। যে action কার্যকর নয় তা দৃশ্যমান হবে না।
5. **Overview:** মূল বিবরণ এবং কেন/কার জন্য স্থানটি উপযোগী।
6. **What to see/do:** curated activities/attractions, প্রয়োজন হলে ordered stops।
7. **Plan your visit:** access/transport guidance, opening hour/entry fee যদি যাচাই করা থাকে, suggested duration, amenities এবং practical notes।
8. **Map/location:** map-এ coordinate, place label এবং external directions link। Location data অসম্পূর্ণ হলে map failure যেন পুরো page ভেঙে না দেয়।
9. **Gallery:** responsive image grid/lightbox, keyboard close ও clear caption/credit।
10. **Related guide/stories/nearby places:** context অনুযায়ী selected content; একই ধরনের সব card এলোমেলোভাবে দেখানো নয়।
11. **Last verified/updated:** সময়-সংবেদনশীল information-এর পাশে তারিখ/প্রাসঙ্গিক source বা editorial note।
12. **Correction/report path:** ভুল তথ্য জানাতে ছোট link/form, যা moderation workflow-তে যাবে।

Sticky table of contents কেবল দীর্ঘ page-এ প্রয়োজন হলে দিন। Sticky panel mobile-এর content ঢেকে ফেলবে না।

## ১৬.৮ Article ও travel guide-এর reading experience

- Article title, short dek/summary, author/source, published date এবং last updated date-এর hierarchy পরিষ্কার হবে। Reading time ঐচ্ছিক; দেখালে consistent content-length rule ব্যবহার করতে হবে।
- Body text-এর line length, line-height এবং paragraph spacing পড়ার উপযোগী হবে। Image caption ও credit image-এর কাছেই থাকবে।
- দীর্ঘ guide-এ “এই পৃষ্ঠায়” table of contents এবং section anchor রাখা যায়; mobile-এ এটি collapsible হতে পারে।
- Article body-র মাঝখানে CTA বা affiliate card সীমিত ও contextually relevant হবে; পড়ার মধ্যে ঘন ঘন promotional interruption নয়।
- Related destination linkগুলো user-এর current reading context-এর সঙ্গে সম্পর্কিত হবে।
- Content update হলে visible update date এবং structured metadata সঙ্গতিপূর্ণ হতে হবে।
- Background/foreground contrast, zoom ও text resizing-এ body content ব্যবহারযোগ্য থাকবে।

## ১৬.৯ Itinerary ও map UX

- Itinerary-তে duration, trip style, start/end point এবং day-wise stop sequence স্পষ্ট হবে।
- Day/stop card-এ place name, কী করার জন্য থামছেন, estimated time/duration এবং পরবর্তী stop link রাখা যায়। তথ্য অনিশ্চিত হলে estimate হিসেবে label করতে হবে।
- Map-এ প্রতিটি pin clickable হলে তার label/summary পাওয়া যাবে; ব্যবহারকারী একই তথ্য list আকারেও দেখতে পারবেন।
- Route line বা drive time কেবল route calculation/data source সত্যিই support করলে দেখাতে হবে। দুই স্থানের সরলরেখার দূরত্বকে road distance বলা যাবে না।
- Map loading/permission/API failure হলে address/location text এবং external directions link থাকতেই হবে।
- ছোট স্ক্রিনে map পুরো viewport দখল করে content access বাধাগ্রস্ত করবে না; map height ও list layout আলাদা ভাবে বিবেচনা করতে হবে।
- Destination coordinates যাচাই করা না থাকলে “map location verified” বলে দাবি করা যাবে না।

## ১৬.১০ Card, carousel ও image interaction

### Cards

- Image hover করলে খুব হালকা zoom (যেমন 1.02-এর কাছাকাছি) বা arrow movement করা যায়; interaction যেন distraction না হয়।
- Hover-এর আগে যে তথ্য নেই, শুধু hover-এ গুরুত্বপূর্ণ title/CTA দেখানো যাবে না। Touch device-এ hover নেই।
- পুরো card clickable করলে nested links/button নিয়ে interaction conflict এড়াতে হবে। Accessible label-এ destination/article-এর নাম বোঝা উচিত।
- সব card-এর image ratio নির্দিষ্ট হবে; source image না মিললে crop strategy ও focal point CMS-এ নির্ধারণ করা যাবে।
- Missing image হলে consistent branded fallback/neutral placeholder থাকবে; broken-image icon নয়।

### Carousel

- Carousel শুধু এমন content-এ ব্যবহার করুন যেখানে horizontal comparison বা compact editorial strip বাস্তবে কাজে দেয়। সবচেয়ে গুরুত্বপূর্ণ navigation বা একমাত্র discovery path carousel-এর মধ্যে লুকিয়ে রাখবেন না।
- **Auto-rotating carousel এড়িয়ে চলুন।** User-এর নিজস্ব click/touch-এ slide বদলানো ভালো। Auto-rotation অপরিহার্য হলে pause control, reduced-motion support এবং focus/hover আচরণ নির্দিষ্ট করতে হবে; তবে homepage hero-র জন্য static feature-ই সুপারিশ।
- Prev/next button স্পষ্ট হবে; button disabled হলে state বোঝা যাবে। Keyboard focus/arrow navigation এবং screen-reader-friendly label থাকবে।
- Mobile-এ swipe gesture-এর পাশাপাশি visible cue/partial next card বা navigation control থাকবে যাতে ব্যবহারকারী বুঝতে পারেন আরও content আছে।
- “সব দেখুন” link carousel-এর বাইরে থাকবে; বহু item দেখতে ব্যবহারকারীকে একে একে arrow click করতে বাধ্য করা যাবে না।
- Card content যতটা সম্ভব একই baseline-এ থাকবে; title-এর দৈর্ঘ্য বদলালে button এলোমেলোভাবে ওঠানামা করবে না।

## ১৬.১১ Micro-interaction ও system feedback

UI responsive মনে হওয়া দরকার, কিন্তু অতিরিক্ত animation দরকার নেই। প্রতিটি interactive component-এর state আগে থেকে নির্ধারণ করুন।

| Component | প্রয়োজনীয় state/feedback |
|---|---|
| Button/link | default, hover, focus, pressed, disabled, loading (যেখানে দরকার) |
| Search | idle, typing, suggestions, submitting, results, no results, error |
| Filter | closed/open, selected, applied, cleared, result update |
| Form | empty, invalid, submitting, success, server error, duplicate/confirmation-needed |
| Content card | default, hover/focus, unavailable image fallback |
| Accordion/menu | expanded/collapsed, focused, active/current item |
| Newsletter | input error, submitting, accepted, confirmation pending, already subscribed |
| Map | loading, loaded, location unavailable, provider error, alternate directions |
| Data loading | skeleton বা restrained progress state; layout placeholder-এর মাপ বাস্তব content-এর কাছাকাছি |

- Action-এর ফলে data বদলালে user-কে তাৎক্ষণিকভাবে ফলাফল জানাতে হবে—যেমন “filter প্রয়োগ হয়েছে” বা “subscription confirmation email পাঠানো হয়েছে”। Server confirmation ছাড়াই সফলতার দাবি করা যাবে না।
- Error message সমস্যাটি কী এবং user কী করতে পারেন তা বলবে। শুধু লাল border বা generic “Something went wrong” যথেষ্ট নয়।
- Toast ব্যবহার করলে গুরুত্বপূর্ণ message যথেষ্ট সময় থাকবে এবং keyboard/screen reader ব্যবহারকারীর জন্য উপলব্ধ হবে; critical validation শুধু অদৃশ্য হয়ে যাওয়া toast-এ নয়।
- Animation ছোট ও purposeful হবে। `prefers-reduced-motion` অনুসারে non-essential motion কমিয়ে দিতে হবে।

## ১৬.১২ Mobile-first UX ও responsive behavior

Mobile layout desktop layout-এর ছোট অনুলিপি নয়। Bangladesh-এর বাস্তব ব্যবহারে বিভিন্ন screen size, mobile network এবং কম ক্ষমতার device ধরে পরিকল্পনা করতে হবে।

- Mobile design-এ primary action ও search সহজে পাওয়া যাবে; গুরুত্বপূর্ণ content শুধু hover, hover tooltip বা desktop mega-menu-তে থাকবে না।
- Body text পড়তে zoom বাধ্যতামূলক হওয়া যাবে না। Text resize করলে heading, card ও form ভেঙে যাবে না।
- Touch target-এর চারপাশে পর্যাপ্ত gap থাকবে, যাতে পাশাপাশি button ভুল করে চাপা না পড়ে। সাধারণ control-এর জন্য প্রায় 44×44 CSS pixel target একটি ভালো design goal; WCAG 2.2-এর নির্দিষ্ট target-size criteria ও exceptions অনুযায়ী চূড়ান্ত audit করতে হবে।
- Fixed bottom bar দরকার আছে কি না task testing-এ যাচাই করুন; প্রয়োজন না হলে viewport-এর নিচে সবসময় UI আটকে রাখবেন না।
- Image crop mobile-এ গুরুত্বপূর্ণ subject বাদ দিলে CMS focal-point/alternative crop ব্যবহার করতে হবে।
- Desktop-এ 3-column card grid mobile-এ 1-column list হতে পারে; শুধু সব component-কে 50% width করে দেওয়া responsive design নয়।
- Mobile-এ long filter sidebar bottom sheet হতে পারে; apply/clear button সহজে পাওয়া যাবে।
- Mobile footer column accordion হতে পারে, তবে section title ও expanded state স্পষ্ট থাকতে হবে।

### Responsive testing viewport set

Design review-তে অন্তত একটি ছোট ফোন (~360–390px), বড় ফোন, tablet portrait/landscape, সাধারণ laptop (~1366–1440px) এবং wide desktop পরীক্ষা করুন। এগুলো test viewport, rigid breakpoint নয়; content যেখানেই ভাঙে, breakpoint সেখানে adjust হবে। Text zoom, browser zoom এবং portrait/landscape state-ও পরীক্ষা করতে হবে।

## ১৬.১৩ Accessibility ও inclusive design

প্রস্তাবিত লক্ষ্য WCAG 2.2 Level AA-র সঙ্গে সামঞ্জস্য রেখে design ও testing করা। W3C-এর WCAG 2.2 guidance-এ text alternative, contrast, keyboard operation, focus visibility, content on hover/focus, target size, accessible form labels এবং error identification-এর মতো বিষয় রয়েছে। এগুলো final QA checklist-এ রাখতে হবে।

- অর্থপূর্ণ image-এ সংক্ষিপ্ত, context-specific alt text; decorative image-এ empty alt/সঠিক decorative handling। শুধু “image of” দিয়ে অকার্যকর alt text পূরণ নয়।
- Semantic heading order: page title-এর জন্য একটি প্রধান H1, তারপর logical section heading; heading level কেবল text বড় করার জন্য ব্যবহার নয়।
- Keyboard-only path দিয়ে navigation, mega-menu, search suggestions, filter panel, lightbox, accordion, carousel এবং form ব্যবহার করতে হবে। Focus indicator দৃশ্যমান থাকবে এবং sticky header/modal সেটি ঢেকে রাখবে না।
- Form field-এ visible label, required status, input error এবং error fix করার guidance থাকবে। Placeholder-কে label-এর বিকল্প হিসেবে ব্যবহার নয়।
- Text এবং UI control-এর contrast যাচাই করতে হবে; ছবি-উপর text থাকলে প্রতিটি crop-এ legibility পরীক্ষা করুন।
- Colour ছাড়াও icon/text/state marker ব্যবহার করুন।
- ভাষা ও mixed-language content সঠিকভাবে mark করা হবে। বাংলা body text, Latin names, numerals এবং screen-reader pronunciation নিয়ে পরীক্ষা করা দরকার।
- Keyboard focus-এর order visual order-এর সঙ্গে সামঞ্জস্যপূর্ণ হবে; modal/lightbox open হলে focus manage হবে এবং close হলে আগের trigger-এ ফিরে আসবে।
- Touch gesture-এর একমাত্র বিকল্প হিসেবে visible button দিতে হবে। Dragging বাধ্যতামূলক action নয়।
- Captcha/security challenge থাকলে accessible alternative দরকার; সম্ভব হলে low-friction anti-spam design ব্যবহার করুন।

Accessibility-এর reference: [W3C — Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) এবং [W3C — WCAG 2.2 Standard](https://www.w3.org/TR/WCAG22/).

## ১৬.১৪ Performance ও perceived speed

উচ্চমানের travel photography প্রয়োজন, তবে high-resolution original সরাসরি প্রতিটি viewport-এ download করানো উচিত নয়। Visual quality ও speed একসঙ্গে design করতে হবে।

- Upload-এর পর media pipeline থেকে প্রয়োজনমতো responsive sizes/crops ও modern image format তৈরি করতে হবে। Browser/device উপযোগী image variant পরিবেশন করুন।
- Hero/LCP image সাধারণত lazy-load করবেন না; এটি দৃশ্যমান page content-এর বড় অংশ হতে পারে। নিচের section-এর ছবি lazy-load করা যায়।
- Image container-এর width/height বা aspect ratio আগে নির্ধারণ করুন, যাতে image আসার সময় layout shift না হয়।
- Thumbnail-এ full-resolution image ব্যবহার করবেন না। Hero, card, gallery ও social share-এর image rendition আলাদা হতে পারে।
- Video auto-download/autoplay এড়িয়ে চলুন; poster image ও user-initiated playback ব্যবহার করুন। Background video হলে mobile/performance/reduced-motion impact বিচার করতে হবে।
- Third-party map, social embed, analytics ও chat widget একসঙ্গে load না করে প্রয়োজনমতো defer/lazy-load করুন।
- Skeleton state বাস্তব content-এর মতো জায়গা রাখবে; skeleton নিজেই দীর্ঘক্ষণ animation করতে থাকবে না।
- Fonts subset/preload শুধু প্রয়োজন অনুযায়ী; একসঙ্গে অনেক font family/weight load করা এড়ান।
- Caching, CDN বা image delivery strategy নির্বাচন করা হবে traffic, hosting ও operational cost দেখে; proposal পর্যায়ে নির্দিষ্ট vendor বাধ্যতামূলক নয়।

প্রস্তাবিত field performance goals হিসেবে Google-এর Core Web Vitals guidance-এর “good” thresholds অনুসরণ করুন: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 — field data-এর 75th percentile-এ, mobile ও desktop আলাদাভাবে বিশ্লেষণ করে। এগুলো testable target, সব device-এ সবসময় নিশ্চিত ফল নয়। Reference: [web.dev — Core Web Vitals](https://web.dev/articles/vitals).

## ১৬.১৫ CMS থেকে UI পরিচালনার সীমানা

UI-কে editable করা মানে admin-কে unrestricted design tool দেওয়া নয়। এতে typography, contrast, spacing ও responsive behavior নষ্ট হওয়ার ঝুঁকি থাকে। সুপারিশ হলো **controlled page composer**: content editor সহজে section বাছাই, সাজানো ও content সংযোগ করতে পারবেন; কিন্তু design token বা unsupported CSS ইচ্ছেমতো বদলাতে পারবেন না।

### CMS-এ editable হওয়া উচিত

- Section heading, introduction, CTA label/destination, featured content reference;
- Section order, visibility, scheduling/start-end time;
- অনুমোদিত section variant — যেমন split-left, split-right, card-grid, horizontal-carousel, full-width feature;
- card count বা density-এর কয়েকটি controlled option;
- image, focal point/crop, alt text, caption/credit;
- background surface-এর অনুমোদিত token, theme variant;
- menu, nested navigation, footer groups, social links ও newsletter message;
- mobile/desktop-এ section লুকানো বা দেখানোর প্রয়োজন হলে predefined visibility rule—তবে গুরুত্বপূর্ণ content শুধুমাত্র desktop-এ লুকিয়ে রাখা যাবে না।

### CMS-এ unrestricted করা উচিত নয়

- arbitrary font size/colour, negative margin, custom CSS/HTML;
- অসীম card style বা অসংগত border/shadow;
- heading-এর মধ্যে image/text জুড়ে একত্রে raster image upload;
- published content-এ invalid link/placeholder image;
- unverified claims-কে “verified” mark করা;
- sponsored content-কে editorial feature বলে label করা।

### Section configuration model-এর UX

প্রতিটি section edit panel-এ predictable field থাকবে: **Content → Layout → Media → Link/CTA → Visibility/Schedule → Preview**। “Card grid” select করলে শুধু grid-এর প্রাসঙ্গিক field দেখা যাবে; carousel-specific setting অপ্রাসঙ্গিক section-এ দেখানো যাবে না। Preview panel-এ desktop/tablet/mobile preview থাকবে। Admin-এর edit form-এ public website-এর visual rules-এর duplicate implementation না করে shared design tokens অনুসরণ করতে হবে।

## ১৬.১৬ ভাষা, content density ও Bangladesh-specific usability

- Phase 1-এ বাংলা প্রধান language হবে কি না এবং ইংরেজি parallel content দরকার কি না নির্ধারণ করুন। দুই ভাষা থাকলে translation-কে আলাদা content record/locale হিসেবে model করতে হবে; একই field-এ বাংলা ও ইংরেজি মিশিয়ে রাখা ঠিক নয়।
- Language switcher থাকলে বর্তমান page-এর অন্য ভাষার equivalent না থাকলে ব্যবহারকারীকে language homepage-এ পাঠিয়ে বিভ্রান্ত না করে স্পষ্ট fallback দিতে হবে।
- বিভাগ/জেলা/উপজেলা, স্থানীয় নাম, বিকল্প বানান এবং প্রচলিত English transliteration search ও page content-এ সহায়ক হবে।
- যাতায়াত/season/entry fee/সুবিধা/সafety information-এর তথ্যসূত্র এবং সর্বশেষ যাচাইয়ের তারিখ maintain করতে হবে। Content type অনুযায়ী verification expiry policy নির্ধারণ করা যায়।
- কম bandwidth-এর জন্য text-based practical information আগে দেখানো, image lazy-load এবং map-এর বিকল্প রাখা দরকার।
- Offline mode বাধ্যতামূলক নয়, তবে error/loading state এমন হবে যাতে নেটওয়ার্ক ব্যর্থ হলেও page-এর text navigation ও গুরুত্বপূর্ণ তথ্য ব্যবহারযোগ্য থাকে যেখানে ইতোমধ্যে load হয়েছে।
- Site বাংলা হলে date format, numeral usage, currency display, time-zone এবং location naming consistency বজায় রাখতে হবে। Currency/price শুধুমাত্র actual service/package থাকলে প্রদর্শন করুন।

## ১৬.১৭ UX validation: UI বানানোর আগে ও পরে পরীক্ষা

শুধু designer বা developer-এর পছন্দের ভিত্তিতে UI final করা উচিত নয়। প্রথমে user task define করে low-fidelity wireframe, তারপর visual prototype, এরপর real-content prototype পরীক্ষা করতে হবে।

### Prototype test-এর জন্য task

1. একজন নতুন ব্যবহারকারীকে একটি নির্দিষ্ট জেলা বা destination খুঁজে detail page-এ যেতে বলুন।
2. কোনো জায়গা খোঁজার পর category/region filter প্রয়োগ এবং clear করতে বলুন।
3. destination-এর “কীভাবে যাবেন” বা best-time information খুঁজতে বলুন।
4. article থেকে related destination বা itinerary-তে যেতে বলুন।
5. mobile-এ mega-menu/nested menu খুলে আবার parent category-তে ফিরতে বলুন।
6. Newsletter subscription form পূরণ করে validation/error/success message বুঝতে বলুন।
7. keyboard-only দিয়ে menu, search suggestion এবং modal/lightbox ব্যবহার করান।

### কী মাপবেন

- Task completion rate: ব্যবহারকারী সাহায্য ছাড়া কাজটি শেষ করতে পারছেন কি না;
- Time on task: স্বাভাবিক কাজ করতে অযথা বেশি সময় লাগছে কি না;
- Misclick/backtracking: ভুল link-এ যাওয়া বা বারবার আগের পৃষ্ঠায় ফিরতে হচ্ছে কি না;
- Search no-result rate এবং search query-এর পর user abandonment;
- Mobile navigation ও filter ব্যবহারের সমস্যা;
- Content comprehension: user location, travel duration, estimated vs confirmed information বুঝতে পারছেন কি না;
- Accessibility defects ও performance metrics;
- Newsletter conversion-এর পাশাপাশি form error/drop-off—শুধু conversion বাড়ানোর জন্য deceptive pattern নয়।

Test-এ ভিন্ন ডিজিটাল-দক্ষতার user এবং mobile-first ব্যবহারকারী অন্তর্ভুক্ত করুন। সমস্যাগুলো severity অনুযায়ী ঠিক করুন: (1) task block/critical error, (2) repeated confusion, (3) cosmetic polish। Prototype test ছাড়া শুধু UI সুন্দর দেখাচ্ছে বলে launch readiness ধরে নেওয়া যাবে না।

## ১৬.১৮ UI acceptance criteria — আলাদা design checklist

### Visual consistency
- [ ] Colour, typography, spacing, card, button, form ও focus token documented এবং reused।
- [ ] Image crop/focal point desktop ও mobile-এ পরীক্ষা করা হয়েছে।
- [ ] Heading hierarchy ও section rhythm সুস্পষ্ট; সব section একই রকম card grid নয়।
- [ ] Brand asset, photograph, font ও text ব্যবহারের অনুমতি/লাইসেন্স নিশ্চিত।

### Discoverability ও navigation
- [ ] Visitor সহজেই main destination browsing ও search খুঁজে পান।
- [ ] Mega-menu hover এবং click উভয়ভাবে ব্যবহারযোগ্য; keyboard/escape behavior সঠিক।
- [ ] Mobile menu-তে nested navigation, back এবং close action স্পষ্ট।
- [ ] Search suggestions, aliases, no-result ও filter-reset tested।
- [ ] গুরুত্বপূর্ণ content কেবল carousel বা hover-এর মধ্যে আটকে নেই।

### Page-level usability
- [ ] Homepage-এ প্রতিটি section-এর স্পষ্ট purpose ও CTA আছে।
- [ ] Destination page-এর quick facts ও practical planning information যথাযথভাবে structured।
- [ ] Article readability, breadcrumb, related content ও image credit আছে।
- [ ] Map unavailable হলে readable location এবং external direction link থাকে।
- [ ] Form error/success/subscription confirmation স্পষ্ট।

### Mobile, accessibility ও performance
- [ ] Small screen, tablet, laptop ও wide screen-এ manual QA হয়েছে।
- [ ] Keyboard-only, visible focus, accessible labels, alt text, contrast ও reduced motion যাচাই করা হয়েছে।
- [ ] Layout shift, oversized images এবং unnecessary third-party scripts কমানো হয়েছে।
- [ ] Core Web Vitals বাস্তব field data/representative testing-এ monitor করার ব্যবস্থা আছে।
- [ ] Loading, empty, error, missing-image ও stale-content state-এর design প্রস্তুত।

## ১৬.১৯ যেসব design mistake এড়িয়ে চলতে হবে

1. **শুধু reference-এর pixel-level clone:** নতুন brand-এর প্রয়োজন, content hierarchy বা Bangladesh-specific visitor needs এতে উপেক্ষিত হতে পারে। Pattern অনুসরণ করুন, exact branding/asset নয়।
2. **প্রথম screen-এ বহু competing CTA:** visitor বুঝবেন না কোথা থেকে শুরু করবেন। একটি প্রধান action ও সীমিত secondary path দিন।
3. **অতিরিক্ত auto-rotating hero/carousel:** ব্যবহারকারী লেখা পড়ার আগেই content বদলে যায় এবং গুরুত্বপূর্ণ content miss হতে পারে। Static hero ও user-controlled carousel অগ্রাধিকার দিন।
4. **দেখতে clickable কিন্তু কাজ করে না এমন UI:** disabled, demo বা future feature হলে public page-এ primary action হিসেবে দেখাবেন না।
5. **সব তথ্য কার্ডে ঢোকানো:** card-এ শুধু সিদ্ধান্ত নিতে প্রয়োজনীয় clue দিন; detail page-এ পূর্ণ তথ্য রাখুন।
6. **অনির্ভরযোগ্য “popular”, price, duration বা opening hour:** যাচাই করা source/criteria না থাকলে এই ধরনের claim দেখাবেন না।
7. **hover-only reveal:** mobile ও keyboard user গুরুত্বপূর্ণ content পাবে না।
8. **Image-heavy, unoptimized homepage:** সুন্দর দেখালেও slow load, data cost এবং layout shift ব্যবহারকারীর অভিজ্ঞতা নষ্ট করবে।
9. **অতিরিক্ত animation, parallax বা video:** purposeful নয় এমন motion distraction ও performance cost বাড়ায়।
10. **অসংযত CMS customization:** arbitrary style option দিয়ে design system ভেঙে ফেলা যাবে না; predefined variant প্রয়োজন।
11. **Modal/pop-up অতিরিক্ত ব্যবহার:** newsletter prompt, login wall বা promotional overlay-এর কারণে content পড়া বাধাগ্রস্ত হবে।
12. **শুধু desktop screenshot দেখে acceptance:** keyboard, touch, slow network, screen reader এবং long content-এর সমস্যাগুলো ধরা পড়বে না।

## ১৬.২০ UI/UX-এর প্রস্তাবিত deliverables

UI design শুরু হলে নিচের deliverables তৈরি করা উচিত। এগুলো না থাকলে visual design থেকে সরাসরি development শুরু করলে design inconsistency ও rework হওয়ার ঝুঁকি বাড়বে।

1. **Information architecture:** sitemap, navigation hierarchy ও primary user task map।
2. **Low-fidelity wireframes:** homepage, destination directory, destination detail, article/guide, search results ও mobile menu।
3. **Visual moodboard:** image treatment, typography, palette, editorial style ও intended brand character।
4. **Design tokens:** colour, typography, spacing, breakpoint strategy, radius, shadow, motion ও focus state।
5. **Component library:** header/mega-menu, mobile navigation, card variants, section headers, buttons, input, filter chips, carousel controls, breadcrumbs, gallery, alerts, footer।
6. **Page templates:** প্রতিটি main page type-এর desktop ও mobile layout।
7. **Interaction specification:** hover/focus/click/touch/keyboard, validation, loading/error/empty/success state।
8. **CMS page-builder specification:** section type, supported variant, field rules, preview, visibility/scheduling এবং fallback behavior।
9. **Responsive prototype:** অন্তত প্রধান user flow clickable prototype হিসেবে test করা।
10. **Accessibility/performance QA plan:** WCAG checklist, responsive viewports, image sizing, Core Web Vitals monitoring এবং acceptance results।

---

## ১৭. চূড়ান্ত UI/UX সুপারিশ

এই project-এর জন্য সবচেয়ে ভালো direction হবে **high-quality editorial travel design + practical destination discovery + CMS-governed component system**। Reference-এর বড় hero, image grid, destination spotlight, article carousel এবং footer structure অনুপ্রেরণা হিসেবে রাখা যায়; কিন্তু user journey-কে আরও উন্নত করতে clear search, category/region browsing, well-structured destination detail page, reliable practical information এবং predictable mobile navigation-কে সমান গুরুত্ব দিতে হবে।

**প্রাথমিক design priority:**

1. প্রথমে homepage, destination listing, destination detail ও article/guide page-এর wireframe তৈরি করা।
2. একই সঙ্গে desktop এবং mobile navigation/search-এর prototype বানানো; পরে mobile-এ convert করার জন্য অপেক্ষা নয়।
3. Visual polish-এর আগে content hierarchy ও user task validate করা; তারপর colour, typography, imagery, subtle motion এবং component styling refine করা।
4. প্রতিটি UI section-কে CMS data model-এর সঙ্গে যুক্ত করে ভাবা, যাতে content editor layout ভাঙা ছাড়াই page update করতে পারেন।
5. Production-ready design-এর আগে real users দিয়ে representative task test ও accessibility/performance check করা।

UI-এর চূড়ান্ত মান হবে শুধু “দেখতে সুন্দর” হওয়া নয়; visitor যেন কম সময়ে সঠিক destination/guide খুঁজে পান, information-এর reliability বুঝতে পারেন, mobile-এ স্বচ্ছন্দে ব্যবহার করতে পারেন এবং CMS team যেন developer ছাড়াই অনুমোদিত visual pattern-এর মধ্যে content update করতে পারে।

### UI/UX reference reading

- [W3C — Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) — accessibility requirements ও practical explanation।
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) — formal accessibility success criteria।
- [Google web.dev — Core Web Vitals](https://web.dev/articles/vitals) — loading, responsiveness ও visual stability goals।
- [Nielsen Norman Group — Carousel Usability](https://www.nngroup.com/articles/designing-effective-carousels/) — carousel discoverability, navigation ও content overload-এর বিষয়ে guidance।
- [Nielsen Norman Group — Auto-forwarding Carousels and Accordions Annoy Users](https://www.nngroup.com/articles/auto-forwarding/) — user-controlled interaction কেন গুরুত্বপূর্ণ, সে বিষয়ে আলোচনা।
