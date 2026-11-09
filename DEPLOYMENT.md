# 🚀 BIKE LOVER — PRODUCTION DEPLOYMENT GUIDE

This guide details deploying the Bike Lover platform into production:
- **Frontend:** Vercel
- **Backend:** Self-Hosted on Office Desktop / Linux Server (PM2 Cluster)
- **Database:** PostgreSQL with automated cron backups

---

## 1. Frontend Deployment on Vercel

1. Push the code repository to GitHub.
2. In the Vercel Dashboard, click **Import Project** and set Root Directory to `frontend`.
3. Set the Framework Preset to **Next.js**.
4. Configure Environment Variables in Vercel:
   - `NEXT_PUBLIC_API_URL`: `https://api.bikelover.com.bd/api`
   - `NEXT_PUBLIC_SITE_URL`: `https://bikelover.com.bd`
   - `NEXT_PUBLIC_SITE_NAME`: `Bike Lover`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `+8801700000000`
   - `NEXT_PUBLIC_PHONE`: `+8801700000000`
5. Click **Deploy**. Vercel will handle global CDN edge caching, dynamic SEO generation, and image optimization.

---

## 2. Backend Deployment on Office PC / VPS

### Prerequisites
Install Node.js 20, PostgreSQL 16, and PM2 globally:
```bash
npm install -g pm2
```

### Deploying the Backend
1. On the office PC or server:
```bash
cd backend
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
```

2. Start the API using PM2 cluster mode:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 3. Nginx Reverse Proxy with SSL (Let's Encrypt)

Create an Nginx configuration `/etc/nginx/sites-available/bikelover-api`:

```nginx
server {
    server_name api.bikelover.com.bd;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 50M;
    }
}
```

Enable SSL:
```bash
sudo certbot --nginx -d api.bikelover.com.bd
```

---

## 4. Automated Backup Verification

Automated backups are enabled in the backend via `node-cron`:
- **Daily:** 02:00 AM (Saved to `backend/backups/`)
- **Weekly:** Sunday 03:00 AM
- **Monthly:** 1st of month 04:00 AM

Backups can be downloaded or restored at any time from the Admin Panel under **Backups**.

---

Developed by [WebCraftersPro](https://www.webcrafterspro.com).
