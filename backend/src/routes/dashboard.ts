import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../middleware/auth';

const router = Router();

// GET /api/dashboard/stats
router.get('/stats', verifyToken, async (_req: Request, res: Response) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [
    totalBikes,
    availableBikes,
    soldBikes,
    purchasedBikes,
    todaySalesAgg,
    monthSalesAgg,
    totalProfitAgg,
    recentTransactions,
    brandCounts,
  ] = await Promise.all([
    prisma.bike.count(),
    prisma.bike.count({ where: { status: 'AVAILABLE' } }),
    prisma.bike.count({ where: { status: 'SOLD' } }),
    prisma.transaction.count({ where: { type: 'PURCHASE' } }),
    prisma.transaction.aggregate({
      where: { type: 'SALE', transactionDate: { gte: today } },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.transaction.aggregate({
      where: { type: 'SALE', transactionDate: { gte: startOfMonth } },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.transaction.aggregate({
      where: { type: 'SALE' },
      _sum: { profit: true },
    }),
    prisma.transaction.findMany({
      take: 8,
      orderBy: { transactionDate: 'desc' },
      include: { customer: true, bike: true },
    }),
    prisma.bike.groupBy({
      by: ['brand'],
      _count: { brand: true },
      orderBy: { _count: { brand: 'desc' } },
      take: 6,
    }),
  ]);

  res.json({
    success: true,
    data: {
      totalBikes,
      availableBikes,
      soldBikes,
      purchasedBikes,
      todaySalesCount: todaySalesAgg._count || 0,
      todaySalesAmount: Number(todaySalesAgg._sum.amount || 0),
      monthSalesCount: monthSalesAgg._count || 0,
      monthSalesAmount: Number(monthSalesAgg._sum.amount || 0),
      totalProfit: Number(totalProfitAgg._sum.profit || 0),
      recentTransactions,
      topBrands: brandCounts.map((b) => ({ brand: b.brand, count: b._count.brand })),
    },
  });
});

export default router;
