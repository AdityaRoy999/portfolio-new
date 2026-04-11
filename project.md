
Twilight Garden 🌸
Your Personal Menstrual Health Companion
Twilight Garden is a beautifully designed, privacy-focused menstrual health application that helps you track your cycle, understand your symptoms, and gain personalized insights into your body's rhythm.

Twilight Garden Banner

✨ Key Features
Cycle Tracking & Prediction: Log your period dates and get smart predictions for your next cycle, fertile window, and ovulation.
Symptom & Mood Logging: Detailed daily logs for flow intensity, physical symptoms, and emotional well-being.
Smart Insights: Visual charts and analysis of your cycle history, symptom trends, and phase-specific advice.
Doctor's Report: Generate a professional PDF medical report summarizing your last 6 months of health data.
Today's Report Card: Create and share beautiful daily summary cards (PNG/PDF) with a gradient aesthetic.
Privacy First: Secure authentication and local-first performance optimizations.
Notifications: Smart reminders for period start, ovulation, and daily logging.
🛠 Tech Stack
Frontend: React 19, TypeScript, Vite
Styling: Tailwind CSS (Custom Design System)
State Management: React Context API
Backend / Auth: Supabase (PostgreSQL, Auth, Edge Functions)
Charts: Recharts
PDF/Image Generation: jsPDF, html2canvas
Animations: Framer Motion


📥 Download Twilight Garden

🌐 View Live: https://lnkd.in/dVrFq8nn

🌍 Web Version: https://lnkd.in/d5yy7HbU

🤖 Android: https://lnkd.in/dpRiSKHG

🪟 Windows: https://lnkd.in/dBbB3VqK

🍎 macOS: Coming Soon

📱 iOS: Coming Soon

⚠️ Pre-Alpha Testing — Bugs may occur. Report to: twilightgarden6@gmail.com

🤝 Collaboration inquiries: twilightgarden6@gmail.com

🌸 Shipping Twilight Garden: Privacy-First Cycle Tracking at Scale


✅ End-to-end encrypted messaging (ECDH P-256 + AES-GCM) for Love Notes
✅ Real-time multi-platform sync across web, mobile, desktop (Supabase Realtime)
✅ Granular privacy controls + Ghost Mode for instant data hiding
✅ 19 real-time multiplayer couple games with live turn-sync
✅ PDF health reports & medically-formatted doctor's documents
✅ WebRTC peer-to-peer calling with ICE servers
✅ Full data visualization dashboard (Recharts)
✅ PIN-based security lockdown + identity verification
✅ 15+ symptom categories, 8 mood types, sleep/energy tracking
✅ Guided breathing exercises with animated guides

Tech: React 19, TypeScript, Supabase, Capacitor, Tauri, WebRTC, Framer Motion

Special thanks to Shambhavi Dubey for the AI layer that makes this truly intelligent.

Philosophy: Users own their data. Encryption keys live on their devices. Partners have explicit consent controls.


==================================================================================================

AETERNA - Timeless Luxury Website
Logo

AETERNA is a meticulously crafted luxury e-commerce website, designed to offer a seamless and premium shopping experience. Featuring elegant UI, smooth animations, comprehensive product management, and robust user authentication, this platform embodies sophistication and functionality.

Tech Stack
The AETERNA website leverages a modern and robust technology stack to deliver a high-performance and scalable application.

Category	Technology	Description
Frontend	React.js	A declarative, component-based JavaScript library for building user interfaces.
TypeScript	A strongly typed superset of JavaScript for enhanced code quality.
Vite	A next-generation frontend tooling that provides an incredibly fast dev experience.
Tailwind CSS	A utility-first CSS framework for rapidly building custom designs.
Backend/DB	Supabase	An open-source Firebase alternative providing a Postgres database, Auth, Storage, and Realtime capabilities.
Animations/UI	Framer Motion	A production-ready motion library for React.
AOS	Animate On Scroll library for captivating scroll-based animations.
@react-three/fiber	React renderer for Three.js, for declarative 3D scenes.
@react-three/drei	A collection of useful helpers and abstractions for @react-three/fiber.
Lenis	A performant and smooth scroll library.
Payment Gateway	Stripe	Secure and flexible payment processing.
Email Service	EmailJS	Send emails directly from JavaScript, with no backend code.
AI Integration	Google GenAI	For AI-powered features like chatbots.
Utilities	jsPDF / jspdf-autotable	Client-side PDF generation for reports.
Recharts	A composable charting library built with React and D3.
Lucide-React	Beautifully simple and consistent open-source icons.
Vite PWA	Progressive Web App support for an enhanced mobile experience.
Sharp	High-performance Node.js image processing.
vite-plugin-image-optimizer	Optimize images during the build process.
Features
AETERNA offers a rich set of features for both customers and administrators:

Luxury E-commerce Experience: Browse exquisite collections and shop for premium products.
Intuitive Page Navigation: Smooth transitions between pages using Lenis and custom transition logic.
Dynamic Product Catalog: Detailed product pages with images, descriptions, and pricing.
User Authentication: Secure sign-up, sign-in, and profile management powered by Supabase Auth.
Shopping Cart & Wishlist: Add items to cart for purchase or save them to a wishlist for later.
Secure Checkout: Integrated with Stripe for a smooth and secure payment process.
Order Tracking: Customers can track the status of their orders.
Interactive Journal/Blog: Engaging content section with articles and updates.
Appointment Booking: Schedule consultations or viewings directly through the website.
Careers & Job Application: Explore career opportunities and apply directly online.
AI Chatbot: An intelligent chatbot for customer support and inquiries.
Admin Dashboard:
Overview: Key metrics, sales charts, and quick actions.
Inventory Management: Add, edit, delete products, manage stock levels.
Order Management: View and update order statuses.
Content Management: Manage journal entries.
Communication Hub: Review contact messages, manage appointments, and job applications.
System Settings: Configuration options for the platform.
Realtime Notifications: Admin dashboard receives live updates via Supabase Realtime.
PDF/CSV Export: Export data from the Admin Dashboard for reports and analysis.
Responsive Design: Optimized for various devices and screen sizes.
Custom Cursor: A unique custom cursor for an enhanced user interface.
Accessibility: Focus on accessible practices for a broad audience.
PWA Support: Installable as a Progressive Web App for offline capabilities and native-app like experience.

website :- https://aeterna-lyart.vercel.app/


==================================================================================================

# TuDu Project Description

## Overview
TuDu is a full productivity platform centered on task execution, planning, and personal/team organization. It combines a rich web app, a mobile shell app, serverless backend logic, and a secured Supabase database layer.

The product is not just a basic to-do list. It supports:
- Task management with priorities, dates, times, tags, and list/workspace context
- Habit tracking with streaks and 30-day heatmaps
- Calendar/event management with reminders
- Focus mode (Pomodoro-like timer with ambient audio)
- Whiteboard workflows (with Excalidraw) and collaboration controls
- Reusable task templates
- Multi-workspace collaboration (invites, members, owner/member roles)
- Subscription plans and billing (Razorpay)
- AI chat capability through a protected edge function
- Notifications via push and email
- Bot-based command/integration flows for Telegram and WhatsApp

## What the System Contains

### 1. Web Application
Main app is built with React + Vite and contains modular pages/components such as:
- Main dashboard/task experience
- Calendar view
- Habits manager
- Templates manager
- Subscription plans page
- Settings page (profile, invoices, preferences)
- Focus mode overlay/session timer

It uses Framer Motion heavily for transitions/animations and includes custom UI modules (modals, selectors, visualizers, animated icons, sliders).

### 2. Mobile App
The `React-native-app` folder contains an Expo React Native wrapper app that loads the deployed web app through `react-native-webview` for Android distribution. It includes:
- In-app navigation/back handling
- OAuth-aware URL handling
- External link routing
- EAS profiles for APK and AAB builds

### 3. Backend/API Layer
There are two backend styles in the repo:
- `api/` Node serverless handlers (Telegram and WhatsApp webhook bots)
- `supabase/functions/` Deno Edge Functions

The server side handles:
- AI chat proxying (NVIDIA API integration)
- Payment order creation and payment verification
- Notification fan-out (Firebase push + SMTP email)
- Auth checks, request validation, rate-limiting, retry/timeout logic, and webhook signature verification

### 4. Data Layer
Supabase PostgreSQL is used as the core data platform with SQL setup/migration scripts for:
- Habits + habit logs
- Templates
- Workspaces + members + invite flows
- Transactional payment write RPC
- Workspace profile/member lookup RPC
- Cron schedule setup for periodic notification jobs
- Whiteboard collaboration role and policy updates

Row Level Security (RLS) is used extensively to secure user/workspace access boundaries.

## Core Product Direction
TuDu is positioned as a premium productivity OS rather than a simple checklist app. It blends personal productivity (tasks, habits, focus), team collaboration (workspaces), and automation/intelligence (AI + bot channels + reminders), with monetization and subscription lifecycle built in.

---

## Tech Stack

### Frontend (Web)
- React 19
- Vite 8
- Framer Motion / Motion
- Lucide React icons
- Excalidraw (whiteboard canvas)
- react-easy-crop (image cropping)
- jsPDF + jspdf-autotable (invoice/PDF generation)

### Mobile
- React Native 0.79 (Expo 53)
- react-native-webview
- EAS Build (APK/AAB pipelines)

### Backend / Serverless
- Supabase Edge Functions (Deno + TypeScript)
- Node.js serverless API routes (`api/telegram.js`, `api/whatsapp.js`)
- Webhook processing (Telegram + WhatsApp)
- NVIDIA-hosted LLM API integration

### Database & Auth
- Supabase (PostgreSQL)
- Supabase Auth
- Supabase Storage
- SQL migrations/scripts with RLS policies
- Postgres RPC functions (e.g., payment and workspace helper RPCs)

### Notifications & Messaging
- Firebase Cloud Messaging (web push)
- Firebase Admin SDK (server-side push send)
- SMTP email notifications (Gmail TLS in current setup)
- Supabase cron + net.http_post for scheduled notification trigger

### Payments
- Razorpay Orders API
- Razorpay signature verification
- Subscription + invoice persistence via transactional RPC

### Deployment / Tooling
- Vercel (hosting + headers policy config)
- ESLint (linting)
- Expo/EAS (mobile build and release)

### Languages
- JavaScript (React web, Node serverless)
- TypeScript (Supabase edge functions)

https://www.newtudu.tech/