import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { generateAgreementId, generateSecureToken, paginate } from '../utils/helpers';
import { AGREEMENT_TERMS } from '../utils/constants';
import PdfService from '../services/pdfService';
import EmailService from '../services/emailService';

const router = Router();

// GET /api/agreements (Admin list)
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const { status, page, limit } = req.query;
  const { skip, take, page: p, limit: l } = paginate(Number(page), Number(limit));

  const where: any = {};
  if (status) where.status = String(status);

  const [agreements, total] = await Promise.all([
    prisma.agreement.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        transaction: { include: { bike: true } },
      },
    }),
    prisma.agreement.count({ where }),
  ]);

  res.json({
    success: true,
    data: agreements,
    pagination: { total, page: p, limit: l, totalPages: Math.ceil(total / l) },
  });
});

// POST /api/agreements (Create & Send Digital Agreement)
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const { transactionId, customerId } = req.body;
  if (!transactionId || !customerId) {
    throw new AppError('transactionId and customerId are required', 400);
  }

  const existing = await prisma.agreement.findUnique({ where: { transactionId } });
  if (existing) {
    return res.json({ success: true, message: 'Agreement already exists', data: existing });
  }

  const agreementId = generateAgreementId();
  const secureToken = generateSecureToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const agreement = await prisma.agreement.create({
    data: {
      agreementId,
      transactionId,
      customerId,
      status: 'SENT',
      secureToken,
      expiresAt,
      terms: AGREEMENT_TERMS.join('

'),
      emailSentAt: new Date(),
    },
    include: {
      customer: true,
      transaction: { include: { bike: true } },
    },
  });

  // Send Email with link
  if (agreement.customer.email) {
    await EmailService.sendAgreementLink(
      agreement.customer.email,
      agreement.customer.fullName,
      agreement.agreementId,
      secureToken
    );
  }

  res.status(201).json({
    success: true,
    message: 'Digital agreement created and sent to customer',
    data: agreement,
    signingUrl: `/agreement/${secureToken}`,
  });
});

// GET /api/agreements/:token/view (Public customer view)
router.get('/:token/view', async (req: Request, res: Response) => {
  const { token } = req.params;
  const agreement = await prisma.agreement.findUnique({
    where: { secureToken: token },
    include: {
      customer: true,
      transaction: { include: { bike: true } },
    },
  });

  if (!agreement) {
    throw new AppError('Invalid or expired agreement link', 404);
  }

  // Update viewed status if still pending/sent
  if (agreement.status === 'SENT') {
    await prisma.agreement.update({
      where: { id: agreement.id },
      data: { status: 'VIEWED', viewedAt: new Date() },
    });
  }

  res.json({ success: true, data: agreement });
});

// POST /api/agreements/:token/sign (Customer submits digital signature)
router.post('/:token/sign', async (req: Request, res: Response) => {
  const { token } = req.params;
  const { signatureImage, acceptedTerms } = req.body;

  if (!signatureImage || !acceptedTerms) {
    throw new AppError('Signature image and acceptance of terms are required', 400);
  }

  const agreement = await prisma.agreement.findUnique({
    where: { secureToken: token },
    include: {
      customer: true,
      transaction: { include: { bike: true } },
    },
  });

  if (!agreement) throw new AppError('Agreement not found', 404);
  if (agreement.status === 'SIGNED') {
    return res.json({ success: true, message: 'Agreement already signed', data: agreement });
  }

  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Web Browser';

  // Update status to SIGNED
  const updated = await prisma.agreement.update({
    where: { id: agreement.id },
    data: {
      status: 'SIGNED',
      signatureImage,
      ipAddress,
      userAgent,
      deviceInfo: userAgent.slice(0, 150),
      signedAt: new Date(),
    },
    include: {
      customer: true,
      transaction: { include: { bike: true } },
    },
  });

  // Generate Final Signed PDF
  const pdfUrl = await PdfService.generateDigitalAgreement(updated);
  await prisma.agreement.update({
    where: { id: updated.id },
    data: { signedPdfUrl: pdfUrl },
  });

  // Email copy to customer if exists
  if (updated.customer.email) {
    EmailService.sendDocumentCopy(
      updated.customer.email,
      updated.customer.fullName,
      'Signed Digital Agreement',
      pdfUrl
    ).catch(() => {});
  }

  res.json({
    success: true,
    message: 'Agreement signed successfully! Thank you.',
    data: { ...updated, signedPdfUrl: pdfUrl },
  });
});

export default router;
