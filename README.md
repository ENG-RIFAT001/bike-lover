# 🏍️ BIKE LOVER — Enterprise Motorcycle Dealership ERP & Marketplace Platform

> **Business Information:**  
> **Name:** Bike Lover  
> **Address:** Japani Bazar, Sonir Akhra, Dhaka, Bangladesh  
> **Primary Showroom:** Dhaka South Highway Corridor  

---

### 💻 Developer Credit & Intellectual Property Notice
- **Website Designed & Developed By:** [WebCraftersPro](https://www.webcrafterspro.com)
- **Official Agency URL:** [https://www.webcrafterspro.com](https://www.webcrafterspro.com)
- **Powered By:** WebCraftersPro
- **Copyright:** © 2026 Bike Lover. All Rights Reserved.
- **Legal Notice:** All intellectual property rights, design rights, source code rights, UI/UX rights, and branding rights reserved by WebCraftersPro unless otherwise transferred through a written agreement.

---

## 🚀 Platform Architecture & Tech Stack

| Module | Technologies |
| :--- | :--- |
| **Public Website & Portal** | Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| **Admin Dashboard ERP** | Next.js 15, Role-Based Access Control (Owner / Manager / Staff), ShadCN UI |
| **Backend REST API** | Node.js, Express.js, Prisma ORM, Helmet, Express-Rate-Limit, Winston Logger |
| **Relational Database** | PostgreSQL 16 (13 Schema Models: User, Bike, Customer, Transaction, Agreement...) |
| **Desktop Software** | Electron 28 + Windows NSIS Installer (Custom Window State, Native Pad Printing) |
| **Digital E-Signatures** | HTML5 Signature Canvas + Verification Hash (IP, Timestamp, Browser Fingerprint) |
| **Official Pad System** | A4 Letterhead Printing with Logo, Auto-Invoicing, Authorized Signatures & Seal Box |
| **Automated Backups** | PostgreSQL automated cron schedule (Daily 2AM, Weekly Sun 3AM, Monthly 1st 4AM) |

---

## 📂 Project Directory Structure

```
Bike lover/
├── backend/                  # Node.js + Express + Prisma + PostgreSQL
│   ├── prisma/
│   │   ├── schema.prisma     # 13 Enterprise Models & Enums
│   │   └── seed.ts           # Database Seeder (Owner, Manager, Staff)
│   ├── src/
│   │   ├── lib/              # Prisma Client & Winston Logger
│   │   ├── middleware/       # JWT Auth, Role Guard, Audit Log, Upload
│   │   ├── routes/           # 11 REST API Route Controllers
│   │   ├── services/         # PDF Pad Engine, Email Service, Backup Crons
│   │   ├── utils/            # Constants, Slugs, Currency Formatter
│   │   └── server.ts         # Express Application Bootstrapper
│   ├── Dockerfile            # Multi-stage production container
│   └── ecosystem.config.js   # PM2 Cluster Deployment Configuration
│
├── frontend/                 # Next.js 15 Public Portal & Admin Dashboard
│   ├── src/
│   │   ├── app/              # App Router (SEO Pages, Catalog, Admin, Digital Signature)
│   │   │   ├── (public)/     # Home, Bikes, Brand Showcases, Buying/Selling Guides
│   │   │   ├── admin/        # 20 Admin ERP Pages (Inventory, Sales, KYC, Pad Print)
│   │   │   └── agreement/    # Customer Digital Signature Landing Page
│   │   ├── components/       # UI Components, Navbars, Footers, Pad Printers
│   │   ├── lib/              # Axios Interceptor, Utilities, Constants
│   │   └── types/            # Complete TypeScript Interfaces
│   ├── tailwind.config.ts    # Brand Colors (#111827, #DC2626, #F59E0B)
│   └── next.config.ts        # Next.js Production Configuration
│
├── desktop/                  # Electron Desktop Application
│   ├── main.js               # Main process, native menus, print handlers
│   ├── preload.js            # Secure context bridge
│   └── package.json          # electron-builder Windows NSIS setup
│
├── docker-compose.yml        # Multi-container PostgreSQL + API
├── INSTALLATION.md           # Step-by-step Local Setup Guide
└── DEPLOYMENT.md             # Production Vercel & On-Premise Guide
```

---

## 🔑 Default Administrator Credentials

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **OWNER** | `admin@bikelover.com` | `Admin@123!` | Full Access (Users, Backups, Financials, Settings) |
| **MANAGER** | `manager@bikelover.com` | `Manager@123!` | Inventory, Purchases, Sales, Customer Management |
| **STAFF** | `staff@bikelover.com` | `Staff@123!` | Data Entry, Customer Verification, Pad Printing |

---

## ⚡ Quick Start

### 1. Database & Backend API
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
# API running at http://localhost:5000
```

### 2. Frontend Public Web & Admin
```bash
cd frontend
npm install
npm run dev
# Website accessible at http://localhost:3000
# Admin login at http://localhost:3000/admin/login
```

### 3. Windows Desktop App
```bash
cd desktop
npm install
npm start
# Build Windows Installer (.exe):
npm run build:win
```

---

Designed & Developed by [WebCraftersPro](https://www.webcrafterspro.com).
