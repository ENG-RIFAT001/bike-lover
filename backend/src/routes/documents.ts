import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import EmailService from '../services/emailService';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

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

// POST /api/documents/send-memo-email (Send memo directly with PDF/Image attachment)
router.post('/send-memo-email', async (req: Request, res: Response) => {
  const {
    customerEmail,
    customerName,
    challanNo,
    pdfBase64,
    imageBase64,
    memoDetails,
  } = req.body;

  if (!customerEmail) {
    return res.status(400).json({ success: false, message: 'Customer email is required' });
  }

  const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || './uploads', 'documents');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let attachmentPath = '';
  let filename = `Bike-Lover-Challan-${challanNo || Date.now()}.pdf`;

  if (pdfBase64) {
    const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
    attachmentPath = path.join(uploadDir, filename);
    fs.writeFileSync(attachmentPath, Buffer.from(cleanBase64, 'base64'));
  } else if (imageBase64) {
    filename = `Bike-Lover-Challan-${challanNo || Date.now()}.png`;
    const cleanImg = imageBase64.replace(/^data:image\\/\\w+;base64,/, '');
    attachmentPath = path.join(uploadDir, filename);
    fs.writeFileSync(attachmentPath, Buffer.from(cleanImg, 'base64'));
  }

  const emailSent = await EmailService.sendDocumentCopy(
    customerEmail,
    customerName || 'Valued Customer',
    `Delivery Challan & Cash Memo (#${challanNo || ''})`,
    `/uploads/documents/${filename}`
  );

  res.json({
    success: true,
    message: emailSent
      ? `Cash memo successfully emailed to ${customerEmail}`
      : `Email queued. Document saved on server: /uploads/documents/${filename}`,
    fileUrl: `/uploads/documents/${filename}`,
  });
});

export default router;
