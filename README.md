# Al Hijama Medical Centre — React App

A modern, professional React web application for Al Hijama Medical Centre, converted from an ASP.NET MVC project.

## 🚀 Features

- **Home Page** — Hero section, services, hadith carousel, benefits
- **About Hijama** — History, benefits, 4-step process, FAQs, Prophetic hadiths
- **Practitioners** — Ahsan Ishtiaq & Akhtar Parveen profiles with skills
- **Sunnah Dates** — Interactive Hijri calendar highlighting 17th, 19th & 21st
- **Booking System** — Full form with validation, practitioner & date selection
- **Booking Confirmation** — Status tracking (Pending → Approved)
- **Auth** — Login / Register with password strength indicator
- **Admin Dashboard** — Stats cards, searchable bookings table, approve/delete
- **Responsive** — Fully mobile-friendly
- **Animations** — Hover effects, floating cards, fade-ins, carousels

## 🔐 Admin Credentials

```
Email:    admin@alhijama.com
Password: Admin@123
```

## 🛠 Tech Stack

- React 18
- React Router v6
- CSS Custom Properties (design system)
- LocalStorage (persistent bookings & auth)
- Font Awesome icons
- Google Fonts (Cormorant Garamond, DM Sans, Amiri)

## ▶️ Run Locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
```

## 🌐 Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Create React App**
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Click **Deploy** ✅

The `vercel.json` handles SPA routing automatically.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   └── Toast.js
├── context/
│   └── AppContext.js      # Global state (auth, bookings)
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Practitioners.js
│   ├── SunnahDates.js
│   ├── Booking.js
│   ├── BookingDetails.js
│   ├── Login.js
│   ├── Register.js
│   └── AdminDashboard.js
├── App.js
├── index.js
└── index.css              # Full design system (CSS variables)
```
