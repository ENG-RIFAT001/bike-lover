import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { prisma } from '../lib/prisma';
import { logger } from '../lib/logger';

export function logAudit(action: string, entity: string) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    res.json = function (body: any) {
      // Run audit logging after response
      if (req.user && res.statusCode >= 200 && res.statusCode < 300) {
        prisma.auditLog
          .create({
            data: {
              userId: req.user.id,
              action,
              entity,
              entityId: req.params.id || body?.data?.id || null,
              newData: typeof req.body === 'object' ? req.body : undefined,
              ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '',
              userAgent: req.headers['user-agent'] || '',
            },
          })
          .catch((err) => logger.error('AuditLog creation failed: %o', err));
      }
      return originalJson(body);
    };
    next();
  };
}
