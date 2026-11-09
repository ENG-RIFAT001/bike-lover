import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { generateTransactionId, calculateProfit, paginate } from '../utils/helpers';
import PdfService from '../services/pdfService';
import EmailService from '../services/emailService';

const router = Router();

// GET /api/transactions
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const { type, search, from, to, page, limit } = req.query;
  const { skip, take, page: p, limit: l } = paginate(Number(page), Number(limit));

  const where: any = {};
  if (type) where.type = String(type);
  if (from || to) {
    where.transactionDate = {};
    if (from) where.transactionDate.gte = new Date(String(from));
    if (to) where.transactionDate.lte = new Date(String(to));
  }
  if (search) {
    where.OR = [
      { transactionId: { contains: String(search), mode: 'insensitive' } },
      { customer: { fullName: { contains: String(search), mode: 'insensitive' } } },
      { bike: { model: { contains: String(search), mode: 'insensitive' } } },
    ];
  }

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      skip,
      take,
      orderBy: { transactionDate: 'desc' },
      include: {
        customer: true,
        bike: true,
        user: { select: { id: true, name: true, role: true } },
        documents: true,
      },
    }),
    prisma.transaction.count({ where }),
  ]);

  res.json({
    success: true,
    data: transactions,
    pagination: { total, page: p, limit: l, totalPages: Math.ceil(total / l) },
  });
});

// GET /api/transactions/:id
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: req.params.id },
    include: {
      customer: true,
      bike: { include: { images: true } },
      user: { select: { id: true, name: true, role: true } },
      documents: true,
      agreement: true,
    },
  });

  if (!transaction) throw new AppError('Transaction not found', 404);
  res.json({ success: true, data: transaction });
});

// POST /api/transactions (New Sale or Purchase)
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  const {
    type, // 'SALE' | 'PURCHASE' | 'EXCHANGE'
    bikeId,
    customerId,
    amount,
    purchasePrice,
    salePrice,
    transactionDate,
    notes,
    paymentMethod,
    paymentStatus,
    generatePdf = true,
  } = req.body;

  if (!type || !bikeId || !customerId || !amount) {
    throw new AppError('Type, bikeId, customerId, and amount are required', 400);
  }

  const transactionId = generateTransactionId();

  // Fetch current bike details
  const bike = await prisma.bike.findUnique({ where: { id: bikeId } });
  if (!bike) throw new AppError('Bike not found', 404);

  let calculatedProfit = 0;
  if (type === 'SALE') {
    const cost = Number(bike.purchasePrice);
    const sale = Number(salePrice || amount);
    calculatedProfit = calculateProfit(cost, sale);
  }

  // Create transaction in atomic manner
  const transaction = await prisma.$transaction(async (tx) => {
    const createdTxn = await tx.transaction.create({
      data: {
        transactionId,
        type,
        bikeId,
        customerId,
        userId: req.user!.id,
        amount: Number(amount),
        purchasePrice: type === 'PURCHASE' ? Number(amount) : Number(bike.purchasePrice),
        salePrice: type === 'SALE' ? Number(amount) : Number(salePrice || 0),
        profit: type === 'SALE' ? calculatedProfit : 0,
        transactionDate: transactionDate ? new Date(transactionDate) : new Date(),
        notes,
        paymentMethod: paymentMethod || 'CASH',
        paymentStatus: paymentStatus || 'PAID',
      },
      include: { customer: true, bike: true },
    });

    // Update bike status
    if (type === 'SALE') {
      await tx.bike.update({
        where: { id: bikeId },
        data: { status: 'SOLD' },
      });
    } else if (type === 'PURCHASE') {
      await tx.bike.update({
        where: { id: bikeId },
        data: {
          status: 'AVAILABLE',
          purchasePrice: Number(amount),
        },
      });
    }

    return createdTxn;
  });

  // Generate Official PDF
  let pdfUrl = '';
  if (generatePdf) {
    try {
      if (type === 'SALE') {
        pdfUrl = await PdfService.generateSaleInvoice(transaction);
        await prisma.generatedDocument.create({
          data: {
            transactionId: transaction.id,
            type: 'SALE_INVOICE',
            url: pdfUrl,
            fileName: `SALE-INVOICE-${transaction.transactionId}.pdf`,
          },
        });
      } else if (type === 'PURCHASE') {
        pdfUrl = await PdfService.generatePurchaseInvoice(transaction);
        await prisma.generatedDocument.create({
          data: {
            transactionId: transaction.id,
            type: 'PURCHASE_INVOICE',
            url: pdfUrl,
            fileName: `PURCHASE-VOUCHER-${transaction.transactionId}.pdf`,
          },
        });
      }

      // Send email if customer has email
      if (transaction.customer?.email) {
        EmailService.sendDocumentCopy(
          transaction.customer.email,
          transaction.customer.fullName,
          type === 'SALE' ? 'Sale Invoice' : 'Purchase Voucher',
          pdfUrl
        ).catch(() => {});
      }
    } catch (err) {
      console.error('PDF generation warning:', err);
    }
  }

  res.status(201).json({
    success: true,
    message: `${type} transaction recorded successfully`,
    data: transaction,
    pdfUrl,
  });
});

export default router;
