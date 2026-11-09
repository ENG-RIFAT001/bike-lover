import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { verifyToken, requireRole } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { createSlug, generateBikeId, paginate } from '../utils/helpers';

const router = Router();

// GET /api/bikes (Public with filters)
router.get('/', async (req: Request, res: Response) => {
  const { brand, model, year, minPrice, maxPrice, color, status, condition, search, featured, page, limit } =
    req.query;

  const { skip, take, page: p, limit: l } = paginate(Number(page), Number(limit));

  const where: any = { isPublished: true };

  if (brand) where.brand = { equals: String(brand), mode: 'insensitive' };
  if (model) where.model = { contains: String(model), mode: 'insensitive' };
  if (year) where.year = Number(year);
  if (color) where.color = { equals: String(color), mode: 'insensitive' };
  if (status) where.status = String(status);
  if (condition) where.condition = String(condition);
  if (featured === 'true') where.isFeatured = true;

  if (minPrice || maxPrice) {
    where.salePrice = {};
    if (minPrice) where.salePrice.gte = Number(minPrice);
    if (maxPrice) where.salePrice.lte = Number(maxPrice);
  }

  if (search) {
    where.OR = [
      { brand: { contains: String(search), mode: 'insensitive' } },
      { model: { contains: String(search), mode: 'insensitive' } },
      { registrationNumber: { contains: String(search), mode: 'insensitive' } },
      { bikeId: { contains: String(search), mode: 'insensitive' } },
    ];
  }

  const [bikes, total] = await Promise.all([
    prisma.bike.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        images: { orderBy: { order: 'asc' } },
      },
    }),
    prisma.bike.count({ where }),
  ]);

  res.json({
    success: true,
    data: bikes,
    pagination: {
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    },
  });
});

// GET /api/bikes/brands/list (Distinct brands)
router.get('/brands/list', async (_req: Request, res: Response) => {
  const brands = await prisma.bike.findMany({
    select: { brand: true },
    distinct: ['brand'],
  });
  res.json({ success: true, data: brands.map((b) => b.brand) });
});

// GET /api/bikes/featured
router.get('/featured', async (_req: Request, res: Response) => {
  const bikes = await prisma.bike.findMany({
    where: { isFeatured: true, isPublished: true, status: 'AVAILABLE' },
    take: 8,
    include: { images: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: bikes });
});

// GET /api/bikes/:idOrSlug
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const bike = await prisma.bike.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }, { bikeId: idOrSlug }],
    },
    include: {
      images: { orderBy: { order: 'asc' } },
      documents: true,
      transactions: {
        include: { customer: true },
        take: 5,
        orderBy: { transactionDate: 'desc' },
      },
    },
  });

  if (!bike) {
    throw new AppError('Bike not found', 404);
  }

  res.json({ success: true, data: bike });
});

// POST /api/bikes (OWNER, MANAGER)
router.post('/', verifyToken, requireRole('OWNER', 'MANAGER'), async (req: Request, res: Response) => {
  const count = await prisma.bike.count();
  const bikeId = req.body.bikeId || generateBikeId(count + 1);

  const {
    brand,
    model,
    variant,
    year,
    color,
    registrationNumber,
    chassisNumber,
    engineNumber,
    mileage,
    purchasePrice,
    salePrice,
    condition,
    status,
    description,
    isFeatured,
    isPublished,
    images,
  } = req.body;

  if (!brand || !model || !year || !chassisNumber || !engineNumber) {
    throw new AppError('Brand, model, year, chassis and engine number are required', 400);
  }

  const slug = createSlug(brand, model, Number(year), bikeId);

  const bike = await prisma.bike.create({
    data: {
      bikeId,
      brand,
      model,
      variant,
      year: Number(year),
      color: color || 'Black',
      registrationNumber,
      chassisNumber,
      engineNumber,
      mileage: Number(mileage || 0),
      purchasePrice: Number(purchasePrice || 0),
      salePrice: Number(salePrice || 0),
      condition: condition || 'GOOD',
      status: status || 'AVAILABLE',
      description,
      slug,
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      images: images && Array.isArray(images)
        ? {
            create: images.map((img: any, idx: number) => ({
              url: typeof img === 'string' ? img : img.url,
              isPrimary: idx === 0,
              order: idx,
            })),
          }
        : undefined,
    },
    include: { images: true },
  });

  res.status(201).json({ success: true, message: 'Bike registered successfully', data: bike });
});

// PUT /api/bikes/:id (OWNER, MANAGER)
router.put('/:id', verifyToken, requireRole('OWNER', 'MANAGER'), async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  delete updateData.id;
  delete updateData.images;
  delete updateData.documents;

  if (updateData.year) updateData.year = Number(updateData.year);
  if (updateData.mileage) updateData.mileage = Number(updateData.mileage);
  if (updateData.purchasePrice) updateData.purchasePrice = Number(updateData.purchasePrice);
  if (updateData.salePrice) updateData.salePrice = Number(updateData.salePrice);

  const bike = await prisma.bike.update({
    where: { id },
    data: updateData,
    include: { images: true },
  });

  res.json({ success: true, message: 'Bike updated successfully', data: bike });
});

// DELETE /api/bikes/:id (OWNER only)
router.delete('/:id', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  await prisma.bike.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Bike deleted successfully' });
});

export default router;
