import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { paginate } from '../utils/helpers';

const router = Router();

// GET /api/customers
router.get('/', verifyToken, async (req: Request, res: Response) => {
  const { search, page, limit } = req.query;
  const { skip, take, page: p, limit: l } = paginate(Number(page), Number(limit));

  const where: any = { isActive: true };
  if (search) {
    where.OR = [
      { fullName: { contains: String(search), mode: 'insensitive' } },
      { mobile: { contains: String(search) } },
      { nidNumber: { contains: String(search) } },
      { drivingLicenseNumber: { contains: String(search) } },
    ];
  }

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { transactions: true } },
      },
    }),
    prisma.customer.count({ where }),
  ]);

  res.json({
    success: true,
    data: customers,
    pagination: { total, page: p, limit: l, totalPages: Math.ceil(total / l) },
  });
});

// GET /api/customers/:id
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const customer = await prisma.customer.findUnique({
    where: { id: req.params.id },
    include: {
      transactions: {
        include: { bike: true },
        orderBy: { transactionDate: 'desc' },
      },
      agreements: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!customer) throw new AppError('Customer not found', 404);
  res.json({ success: true, data: customer });
});

// POST /api/customers
router.post('/', verifyToken, async (req: Request, res: Response) => {
  const {
    fullName,
    fatherName,
    motherName,
    dateOfBirth,
    mobile,
    email,
    presentAddress,
    permanentAddress,
    nidNumber,
    drivingLicenseNumber,
    nidFront,
    nidBack,
    drivingLicenseFront,
    drivingLicenseBack,
    photo,
    notes,
  } = req.body;

  if (!fullName || !mobile) {
    throw new AppError('Full Name and Mobile Number are required', 400);
  }

  const customer = await prisma.customer.create({
    data: {
      fullName,
      fatherName,
      motherName,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      mobile,
      email,
      presentAddress,
      permanentAddress,
      nidNumber,
      drivingLicenseNumber,
      nidFront,
      nidBack,
      drivingLicenseFront,
      drivingLicenseBack,
      photo,
      notes,
    },
  });

  res.status(201).json({ success: true, message: 'Customer registered successfully', data: customer });
});

// PUT /api/customers/:id
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
  const customer = await prisma.customer.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json({ success: true, message: 'Customer updated successfully', data: customer });
});

// DELETE /api/customers/:id (Soft delete)
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  await prisma.customer.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });
  res.json({ success: true, message: 'Customer deactivated' });
});

export default router;
