import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken, requireRole } from '../middleware/auth';
import BackupService from '../services/backupService';
import fs from 'fs';

const router = Router();

// GET /api/backups
router.get('/', verifyToken, requireRole('OWNER'), async (_req: Request, res: Response) => {
  const backups = await prisma.backup.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({
    success: true,
    data: backups.map((b) => ({
      ...b,
      fileSize: b.fileSize.toString(),
    })),
  });
});

// POST /api/backups/create
router.post('/create', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  const type = req.body.type || 'MANUAL';
  const backup = await BackupService.createBackup(type);
  res.status(201).json({
    success: true,
    message: 'Backup created successfully',
    data: { ...backup, fileSize: backup.fileSize.toString() },
  });
});

// POST /api/backups/:id/restore
router.post('/:id/restore', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  await BackupService.restoreBackup(req.params.id);
  res.json({ success: true, message: 'Database successfully restored from backup' });
});

// GET /api/backups/:id/download
router.get('/:id/download', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  const backup = await prisma.backup.findUnique({ where: { id: req.params.id } });
  if (!backup || !fs.existsSync(backup.filePath)) {
    return res.status(404).json({ success: false, message: 'Backup file not found' });
  }
  res.download(backup.filePath, backup.fileName);
});

// DELETE /api/backups/:id
router.delete('/:id', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  const backup = await prisma.backup.findUnique({ where: { id: req.params.id } });
  if (backup && fs.existsSync(backup.filePath)) {
    fs.unlinkSync(backup.filePath);
  }
  await prisma.backup.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Backup deleted' });
});

export default router;
