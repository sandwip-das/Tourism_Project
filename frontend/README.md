# SANDVIORA Frontend Web Portal

The official editorial web application for **SANDVIORA TOURISM LTD.**, built using **Next.js 16**, **React 19**, **TypeScript**, and build-time **Tailwind CSS**.

---

## ⚡ Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Local Development Server:**
   ```bash
   npm run dev -- -p 3000
   ```

3. **Open in Browser:**
   - Homepage: [http://localhost:3000](http://localhost:3000)
   - Platform Administration: [http://localhost:3000/platform-admin](http://localhost:3000/platform-admin)
   - Traveler Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🎨 Architectural Overview

- **Editorial Design System**: Custom typography, sage green accents, responsive carousels, and interactive discovery matrices.
- **Dynamic CMS Hydration**: Calls `http://127.0.0.1:8000/api/v1/site-init/` on initial load for instant zero-roundtrip hydration.
- **Secure Reservation Engine**: Multi-step booking guard requiring authenticated user accounts, payment gateway selection (bKash, Nagad, Bank Escrow), and TrxID verification before PDF voucher issuance.
