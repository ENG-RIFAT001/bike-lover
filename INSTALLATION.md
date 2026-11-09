# 🛠️ BIKE LOVER PLATFORM — INSTALLATION GUIDE

This document explains how to set up the complete Bike Lover system on Windows, macOS, or Linux.

---

## 1. System Requirements

- **Node.js:** v20.0.0 or higher
- **PostgreSQL:** v15 or higher
- **npm:** v9.0.0 or higher
- **Git**

---

## 2. PostgreSQL Database Setup

1. Open PostgreSQL terminal or pgAdmin:
```sql
CREATE DATABASE bike_lover_db;
CREATE USER bikelover WITH ENCRYPTED PASSWORD 'BikeL0ver@2024';
GRANT ALL PRIVILEGES ON DATABASE bike_lover_db TO bikelover;
```

---

## 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Configure environment file:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` matches your local PostgreSQL setup:
```
DATABASE_URL="postgresql://bikelover:BikeL0ver@2024@localhost:5432/bike_lover_db"
JWT_SECRET="bike-lover-enterprise-secret-key-super-secure-32-chars-long"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

3. Install packages and generate Prisma Client:
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
```

4. Seed the database with default Owner, Manager, Staff accounts:
```bash
npm run seed
```

5. Start the backend development server:
```bash
npm run dev
```
The API is live at `http://localhost:5000`. Test health status at `http://localhost:5000/health`.

---

## 4. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Configure environment:
```bash
cp .env.local.example .env.local
```
Ensure `NEXT_PUBLIC_API_URL` points to `http://localhost:5000/api`.

3. Install packages:
```bash
npm install
```

4. Start Next.js development server:
```bash
npm run dev
```
The public portal is accessible at `http://localhost:3000`.  
The Admin Dashboard is accessible at `http://localhost:3000/admin/login`.

---

## 5. Desktop Application Setup

1. Navigate to the desktop directory:
```bash
cd ../desktop
npm install
```

2. Run Electron in development mode:
```bash
npm start
```

3. To bundle the Windows desktop installer (`.exe`):
```bash
npm run build:win
```
The installer will be generated in `desktop/dist/Bike Lover Setup 1.0.0.exe`.

---

Developed by [WebCraftersPro](https://www.webcrafterspro.com).
