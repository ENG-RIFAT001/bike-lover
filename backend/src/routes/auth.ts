import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { verifyToken, requireRole, AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'bike-lover-secret-key-minimum-32-chars';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'bike-lover-refresh-key';

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    throw new AppError('Invalid credentials or account inactive', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '30d' });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date(), refreshToken },
  });

  res.json({
    success: true,
    message: 'Login successful',
    token,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
    },
  });
});

// POST /api/auth/register (OWNER only can create new team accounts)
router.post('/register', verifyToken, requireRole('OWNER'), async (req: AuthRequest, res: Response) => {
  const { name, email, password, role, phone } = req.body;
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError('User with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || 'STAFF',
      phone,
    },
    select: { id: true, name: true, email: true, role: true, phone: true, isActive: true },
  });

  res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
});

// GET /api/auth/me
router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  res.json({ success: true, user: req.user });
});

// PUT /api/auth/me
router.put('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  const { name, phone, avatar } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.user!.id },
    data: { name, phone, avatar },
    select: { id: true, name: true, email: true, role: true, phone: true, avatar: true },
  });
  res.json({ success: true, message: 'Profile updated', user: updated });
});

// PUT /api/auth/change-password
router.put('/change-password', verifyToken, async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new AppError('Current and new password are required', 400);
  }

  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) throw new AppError('User not found', 404);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new AppError('Incorrect current password', 400);

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  res.json({ success: true, message: 'Password changed successfully' });
});

// GET /api/auth/users (OWNER, MANAGER)
router.get('/users', verifyToken, requireRole('OWNER', 'MANAGER'), async (_req: AuthRequest, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      lastLogin: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: users });
});

// PUT /api/auth/users/:id (OWNER only)
router.put('/users/:id', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  const { role, isActive, name, phone } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: { role, isActive, name, phone },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });
  res.json({ success: true, message: 'User updated', data: updated });
});

// DELETE /api/auth/users/:id (OWNER only)
router.delete('/users/:id', verifyToken, requireRole('OWNER'), async (req: Request, res: Response) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'User deleted' });
});

export default router;
