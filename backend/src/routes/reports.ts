import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../middleware/auth';
import * as xlsx from 'xlsx';

const router = Router();

// GET /api/reports/daily
router.get('/daily', verifyToken, async (req: Request, res: Response) => {
  const dateStr = (req.query.date as string) || new Date().toISOString().slice(0, 10);
  const start = new Date(dateStr);
  start.setHours(0, 0, 0, 0);
  const end = new Date(dateStr);
  end.setHours(23, 59, 59, 999);

  const transactions = await prisma.transaction.findMany({
    where: { transactionDate: { gte: start, lte: end } },
    include: { customer: true, bike: true },
  });

  const totalSales = transactions.filter((t) => t.type === 'SALE');
  const totalPurchases = transactions.filter((t) => t.type === 'PURCHASE');

  const salesVolume = totalSales.reduce((acc, t) => acc + Number(t.amount), 0);
  const purchaseVolume = totalPurchases.reduce((acc, t) => acc + Number(t.amount), 0);
  const profit = totalSales.reduce((acc, t) => acc + Number(t.profit || 0), 0);

  res.json({
    success: true,
    data: {
      date: dateStr,
      salesCount: totalSales.length,
      purchaseCount: totalPurchases.length,
      salesVolume,
      purchaseVolume,
      profit,
      transactions,
    },
  });
});

// GET /api/reports/monthly
router.get('/monthly', verifyToken, async (req: Request, res: Response) => {
  const year = parseInt((req.query.year as string) || String(new Date().getFullYear()), 10);
  const month = parseInt((req.query.month as string) || String(new Date().getMonth() + 1), 10);

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);

  const transactions = await prisma.transaction.findMany({
    where: { transactionDate: { gte: start, lte: end } },
    include: { customer: true, bike: true },
  });

  const totalSales = transactions.filter((t) => t.type === 'SALE');
  const salesVolume = totalSales.reduce((acc, t) => acc + Number(t.amount), 0);
  const profit = totalSales.reduce((acc, t) => acc + Number(t.profit || 0), 0);

  res.json({
    success: true,
    data: {
      year,
      month,
      transactionsCount: transactions.length,
      salesVolume,
      profit,
      transactions,
    },
  });
});

// GET /api/reports/export/excel
router.get('/export/excel', verifyToken, async (_req: Request, res: Response) => {
  const transactions = await prisma.transaction.findMany({
    include: { customer: true, bike: true },
    orderBy: { transactionDate: 'desc' },
  });

  const rows = transactions.map((t) => ({
    'Transaction ID': t.transactionId,
    Type: t.type,
    Date: new Date(t.transactionDate).toLocaleDateString(),
    Customer: t.customer?.fullName || 'N/A',
    Mobile: t.customer?.mobile || 'N/A',
    Bike: `${t.bike?.brand} ${t.bike?.model} (${t.bike?.year})`,
    'Chassis No': t.bike?.chassisNumber || 'N/A',
    'Amount (BDT)': Number(t.amount),
    'Profit (BDT)': Number(t.profit || 0),
    Status: t.paymentStatus,
  }));

  const worksheet = xlsx.utils.json_to_sheet(rows);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  const buf = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Disposition', 'attachment; filename="BikeLover-Transactions-Report.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
});

export default router;
