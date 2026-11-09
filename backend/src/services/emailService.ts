import nodemailer from 'nodemailer';
import path from 'path';
import { BUSINESS_INFO, DEVELOPER_INFO } from '../utils/constants';
import { logger } from '../lib/logger';

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  public static async sendAgreementLink(
    toEmail: string,
    customerName: string,
    agreementId: string,
    token: string
  ): Promise<boolean> {
    const signingUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/agreement/${token}`;
    const subject = `Action Required: Digital Motorcycle Agreement - ${agreementId}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #111827; padding: 24px; text-align: center; border-bottom: 3px solid #DC2626;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">BIKE LOVER</h1>
          <p style="color: #9ca3af; margin: 4px 0 0 0; font-size: 13px;">${BUSINESS_INFO.address}</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <h2 style="color: #111827; font-size: 18px;">Dear ${customerName},</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Your transaction agreement (<strong>${agreementId}</strong>) has been generated and is ready for your digital signature.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${signingUrl}" style="background-color: #DC2626; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
              Review & Sign Agreement
            </a>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Or copy and paste this secure link into your browser:<br/>
            <a href="${signingUrl}" style="color: #DC2626;">${signingUrl}</a>
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            This link is secure, unique to your transaction, and legally binding under Bangladesh IT Act.
          </p>
        </div>
        <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb;">
          © 2026 ${BUSINESS_INFO.name}. All Rights Reserved.<br/>
          ${DEVELOPER_INFO.creditText} | <a href="${DEVELOPER_INFO.website}" target="_blank" style="color: #DC2626;">${DEVELOPER_INFO.website}</a>
        </div>
      </div>
    `;

    try {
      if (!process.env.SMTP_USER) {
        logger.warn(`SMTP not configured. Mocking agreement email to ${toEmail}: ${signingUrl}`);
        return true;
      }
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || `"${BUSINESS_INFO.name}" <noreply@bikelover.com>`,
        to: toEmail,
        subject,
        html,
      });
      return true;
    } catch (err) {
      logger.error('Failed to send agreement email: %o', err);
      return false;
    }
  }

  public static async sendDocumentCopy(
    toEmail: string,
    customerName: string,
    documentType: string,
    pdfRelativePath: string
  ): Promise<boolean> {
    const fullPath = path.resolve(process.cwd(), `.${pdfRelativePath}`);
    const subject = `${BUSINESS_INFO.name} - ${documentType} Copy`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb;">
        <div style="background-color: #111827; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">${BUSINESS_INFO.name}</h2>
        </div>
        <div style="padding: 24px;">
          <p>Dear ${customerName},</p>
          <p>Please find attached your official ${documentType} from ${BUSINESS_INFO.name}.</p>
          <p>Thank you for choosing ${BUSINESS_INFO.name}!</p>
        </div>
        <div style="background-color: #f9fafb; padding: 12px; text-align: center; font-size: 11px; color: #6b7280;">
          ${DEVELOPER_INFO.creditText}
        </div>
      </div>
    `;

    try {
      if (!process.env.SMTP_USER) {
        logger.warn(`SMTP not configured. Mocking document email to ${toEmail} with attachment ${fullPath}`);
        return true;
      }
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || `"${BUSINESS_INFO.name}" <noreply@bikelover.com>`,
        to: toEmail,
        subject,
        html,
        attachments: [{ filename: path.basename(fullPath), path: fullPath }],
      });
      return true;
    } catch (err) {
      logger.error('Failed to send document email: %o', err);
      return false;
    }
  }
}

export default EmailService;
