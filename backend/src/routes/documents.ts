import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import path from 'path';
import fs from 'fs';

const router = Router();

// GET /api/documents
router.get('/', verifyToken, async (_req: Request, res: Response) => {
  const documents = await prisma.generatedDocument.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      transaction: {
        include: { customer: true, bike: true },
      },
    },
  });
  res.json({ success: true, data: documents });
});

// GET /api/documents/:id/download
router.get('/:id/download', verifyToken, async (req: Request, res: Response) => {
  const doc = await prisma.generatedDocument.findUnique({ where: { id: req.params.id } });
  if (!doc) throw new AppError('Document not found', 404);

  const filePath = path.resolve(process.cwd(), `.${doc.url}`);
  if (!fs.existsSync(filePath)) {
    throw new AppError('File not found on disk', 404);
  }
  res.download(filePath, doc.fileName);
});

export default router;
