import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken, requireRole } from '../middleware/auth';
import { BUSINESS_INFO, DEVELOPER_INFO } from '../utils/constants';

const router = Router();

// GET /api/settings/company (Public)
router.get('/company', async (_req: Request, res: Response) => {
  const dbSettings = await prisma.setting.findMany();
  const settingsMap: any = {};
  dbSettings.forEach((s) => (settingsMap[s.key] = s.value));

  res.json({
    success: true,
    data: {
      name: settingsMap.company_name || BUSINESS_INFO.name,
      address: settingsMap.company_address || BUSINESS_INFO.address,
      phone: settingsMap.company_phone || BUSINESS_INFO.phone,
      email: settingsMap.company_email || BUSINESS_INFO.email,
      website: settingsMap.company_website || BUSINESS_INFO.website,
      developer: DEVELOPER_INFO,
    },
  });
});

// GET /api/settings (Admin)
router.get('/', verifyToken, async (_req: Request, res: Response) => {
  const settings = await prisma.setting.findMany();
  res.json({ success: true, data: settings });
});

// PUT /api/settings (OWNER only)
router.put('/', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  const updates = req.body; // { key: value }
  const keys = Object.keys(updates);

  for (const key of keys) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(updates[key]) },
      create: { key, value: String(updates[key]) },
    });
  }

  res.json({ success: true, message: 'Settings saved successfully' });
});

export default router;
