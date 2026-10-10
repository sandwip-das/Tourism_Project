# SANDVIORA TOURISM LTD. — Travel Discovery & Governance Platform

A high-performance, editorial-first travel platform for Bangladesh, built following the **SANDVIORA Master Project Plan**. The application consolidates destination discovery, curated tour packages, instant reservations, and administrative governance into a single cohesive portal (similar to Lonely Planet), backed by a central RESTful API designed for future multi-portal distribution.

---

## 🚀 Key Features

1. **100% Backend CMS Driven**:
   - Every headline, tagline, navigation menu item, feature badge, section title, and footer address is dynamically served from Django DRF endpoints.
   - Bilingual support: Seamless toggle between **English** and **বাংলা**.

2. **Consolidated Travel Experience (Lonely Planet Style)**:
   - **Handpicked Destinations**: Sajek Valley, Cox's Bazar, Sundarbans, Sreemangal, Bandarban, and Tanguar Haor with geo-division filtering, ratings, climate guides, and duration specs.
   - **Curated All-Inclusive Expeditions**: Pricing in BDT, discounts, max group sizes, difficulty levels, and full day-by-day itineraries.
   - **Interactive Reservation Engine**: Real-time traveler multiplier, instant booking reference generation (`SND-XXXXXXXX`), and automated downloadable PDF booking vouchers.

3. **Integrated PDF Reporting System**:
   - Built server-side using **ReportLab** in Python.
   - Accessible via 1-click downloads in the frontend Administrative Console and Django Admin:
     - 📄 **Bookings Summary Report (PDF)** (`/api/v1/reports/pdf/bookings/`)
     - 📄 **Financial & Revenue Statement (PDF)** (`/api/v1/reports/pdf/revenue/`)
     - 📄 **Tour Inventory & Capacity Report (PDF)** (`/api/v1/reports/pdf/inventory/`)
     - 📄 **Customer Booking Voucher (PDF)** (`/api/v1/bookings/{ref}/voucher-pdf/`)

4. **Future-Proof Multi-Portal Architecture**:
   - Modular monolith backend ready to distribute APIs to partner sites, agent portals, or mobile apps without restructuring.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Backend Runtime** | Python 3.12 (`backend/venv`) | Virtual environment in `backend/venv` |
| **Backend Framework** | Django 6.x + DRF | RESTful endpoints, ORM, SQLite (dev) |
| **PDF Generation** | ReportLab 5.0 | Corporate watermarks, tables, branding headers |
| **Frontend Framework** | Next.js 16 (App Router) + Turbopack | React 19, TypeScript |
| **Styling** | Build-time Tailwind CSS v4 + PostCSS | Zero CDN, fully tree-shaken, ultra-lightweight, Lonely Planet design system |
| **Icons** | Lucide React | Lightweight vector travel iconography |

---

## 🔐 Administrative Access & Security

- **Django Admin URL:** [http://127.0.0.1:8000/django-admin/](http://127.0.0.1:8000/django-admin/)
- **Superuser Username:** `sandwip` (configured locally)
- **Security Note:** Keep all administrative credentials and secrets in local `.env` files. Never commit passwords or expose them in the public UI.

---

## 📁 Project Structure

```
Tourism_Project/
├── SANDVIORA_Master_Project_Plan.md   # Unified Master Plan (updated)
├── backend/
│   ├── venv/                         # Python 3.12 Virtual Environment
│   ├── config/                       # Settings, URLs, WSGI
│   │   ├── settings.py               # DRF, CORS, media configuration
│   │   └── urls.py                   # Central routing & PDF endpoints
│   ├── apps/
│   │   ├── cms/                      # SiteConfig, Navigation, Badges, Sections
│   │   ├── destinations/             # Divisions, Districts, Destinations, Attractions
│   │   ├── tours/                    # Categories, TourPackages, Itineraries, Inclusions
│   │   ├── bookings/                 # Bookings, Inquiries, Reference Generator
│   │   └── reports/                  # ReportLab PDF services & Stats views
│   ├── seed_data.py                  # Database seeder with authentic Bangladesh data
│   ├── manage.py
│   └── db.sqlite3
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx            # SEO metadata, OpenGraph tags
    │   │   ├── page.tsx              # Main consolidated portal
    │   │   └── globals.css           # Glassmorphism, color tokens, vanilla CSS
    │   ├── components/
    │   │   ├── Navbar.tsx            # Dynamic CMS navigation & language switcher
    │   │   ├── Hero.tsx              # Dynamic hero, search, and category pills
    │   │   ├── Destinations.tsx      # Lonely Planet style cards & guide modals
    │   │   ├── Tours.tsx             # Expedition cards, pricing in BDT
    │   │   ├── AdminPortal.tsx       # Live KPI dashboard & 1-click PDF download deck
    │   │   ├── BookingModal.tsx      # Real-time booking form & instant voucher
    │   │   └── Footer.tsx            # Bilingual footer with contact details
    │   ├── lib/
    │   │   ├── api.ts                # API client with endpoints
    │   │   └── fallbackData.ts       # Instant SSR hydration data
    │   └── types/                    # Full TypeScript schema interfaces
    ├── package.json
    └── tsconfig.json
```

---

## ⚡ How to Run

### 1. Start the Django Backend (Port 8000)
```powershell
cd e:\Deployment\Tourism_Project\backend
.\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```
- API Base: `http://127.0.0.1:8000/api/v1/`
- Site Initialization Payload: `http://127.0.0.1:8000/api/v1/site-init/`
- Django Admin: `http://127.0.0.1:8000/django-admin/`

### 2. Start the Next.js Frontend (Port 3000)
```powershell
cd e:\Deployment\Tourism_Project\frontend
npm run dev -- -p 3000
```
- Open your browser at: `http://localhost:3000`

---

## 📊 Summary of Implemented PDF Reports

1. **Bookings & Reservations Audit Report**:  
   `GET /api/v1/reports/pdf/bookings/`  
   Includes reference codes, customer contacts, dates, guest counts, and status flags.

2. **Financial Performance & Revenue Statement**:  
   `GET /api/v1/reports/pdf/revenue/`  
   Aggregated revenue per package, total guests accommodated, and gross booking volume.

3. **Tour Inventory & Capacity Report**:  
   `GET /api/v1/reports/pdf/inventory/`  
   Breakdown of all active tour packages, durations, maximum group sizes, and base prices.

4. **Customer Tour Confirmation Voucher**:  
   `GET /api/v1/bookings/<ref>/voucher-pdf/`  
   Official travel confirmation voucher issued to travelers upon reservation.
