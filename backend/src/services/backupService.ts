import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { logger } from '../lib/logger';

const execAsync = util.promisify(exec);

export class BackupService {
  private static backupDir = path.resolve(process.cwd(), process.env.BACKUP_DIR || './backups');

  private static ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  // Create database backup
  public static async createBackup(type = 'MANUAL'): Promise<any> {
    this.ensureBackupDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `backup-${type.toLowerCase()}-${timestamp}.sql`;
    const filePath = path.join(this.backupDir, fileName);

    const dbUrl = process.env.DATABASE_URL || '';

    try {
      // If PostgreSQL pg_dump is available
      if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
        try {
          await execAsync(`pg_dump "${dbUrl}" > "${filePath}"`);
        } catch (dumpErr) {
          logger.warn('pg_dump command failed, falling back to JSON state snapshot: %o', dumpErr);
          // Fallback JSON dump for development/mock
          const users = await prisma.user.findMany();
          const bikes = await prisma.bike.findMany();
          const customers = await prisma.customer.findMany();
          const transactions = await prisma.transaction.findMany();
          const agreements = await prisma.agreement.findMany();
          const data = { users, bikes, customers, transactions, agreements, exportedAt: new Date() };
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        }
      }

      const stats = fs.statSync(filePath);
      const record = await prisma.backup.create({
        data: {
          fileName,
          filePath,
          fileSize: BigInt(stats.size),
          type,
          status: 'COMPLETED',
        },
      });

      logger.info(`Backup created successfully: ${fileName} (${stats.size} bytes)`);
      return record;
    } catch (error) {
      logger.error('Failed to create backup: %o', error);
      throw error;
    }
  }

  // Restore database from backup
  public static async restoreBackup(backupId: string): Promise<boolean> {
    const backup = await prisma.backup.findUnique({ where: { id: backupId } });
    if (!backup || !fs.existsSync(backup.filePath)) {
      throw new Error('Backup record or file does not exist');
    }

    try {
      const dbUrl = process.env.DATABASE_URL || '';
      if (backup.fileName.endsWith('.sql') && dbUrl) {
        await execAsync(`psql "${dbUrl}" < "${backup.filePath}"`);
      }
      logger.info(`Database restored from backup: ${backup.fileName}`);
      return true;
    } catch (err) {
      logger.error('Database restore failed: %o', err);
      throw err;
    }
  }

  // Setup automated schedules: Daily (2AM), Weekly (Sunday 3AM), Monthly (1st 4AM)
  public static initSchedules() {
    // Daily at 02:00
    cron.schedule('0 2 * * *', async () => {
      logger.info('Running automated Daily Backup...');
      try {
        await this.createBackup('DAILY');
      } catch (err) {
        logger.error('Daily backup failed: %o', err);
      }
    });

    // Weekly at Sunday 03:00
    cron.schedule('0 3 * * 0', async () => {
      logger.info('Running automated Weekly Backup...');
      try {
        await this.createBackup('WEEKLY');
      } catch (err) {
        logger.error('Weekly backup failed: %o', err);
      }
    });

    // Monthly at 1st of month 04:00
    cron.schedule('0 4 1 * *', async () => {
      logger.info('Running automated Monthly Backup...');
      try {
        await this.createBackup('MONTHLY');
      } catch (err) {
        logger.error('Monthly backup failed: %o', err);
      }
    });

    logger.info('Automated backup crons initialized: Daily, Weekly, Monthly');
  }
}

export default BackupService;
