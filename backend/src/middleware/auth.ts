import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { AppError } from './errorHandler';

export interface AuthUser {
  id: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'STAFF';
  name: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export async function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required. Bearer token missing.', 401);
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'bike-lover-secret-key-minimum-32-chars';

    const decoded = jwt.verify(token, secret) as { id: string; role: string; email: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true, isActive: true },
    });

    if (!user || !user.isActive) {
      throw new AppError('User not found or account is deactivated.', 401);
    }

    req.user = user as AuthUser;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired. Please login again.', 401));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token.', 401));
    }
    next(error);
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthenticated request', 401));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(`Access denied. Allowed roles: ${allowedRoles.join(', ')}`, 403));
    }
    next();
  };
}
