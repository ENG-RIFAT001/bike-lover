import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { BUSINESS_INFO, DEVELOPER_INFO, BRAND_COLORS, AGREEMENT_TERMS } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';
import { logger } from '../lib/logger';

export class PdfService {
  private static docsDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || './uploads', 'documents');

  private static ensureDocsDir() {
    if (!fs.existsSync(this.docsDir)) {
      fs.mkdirSync(this.docsDir, { recursive: true });
    }
  }

  // Draw Official Company Pad Header
  private static drawOfficialHeader(doc: PDFKit.PDFDocument, title: string) {
    // Red Accent Top Bar
    doc.rect(0, 0, doc.page.width, 10).fill(BRAND_COLORS.secondary);

    // Business Name
    doc.fillColor(BRAND_COLORS.primary)
      .fontSize(24)
      .font('Helvetica-Bold')
      .text(BUSINESS_INFO.name.toUpperCase(), 50, 25, { characterSpacing: 1.5 });

    // Business Address & Contact Info
    doc.fillColor('#4B5563')
      .fontSize(9)
      .font('Helvetica')
      .text(BUSINESS_INFO.address, 50, 52)
      .text(`Phone: ${BUSINESS_INFO.phone}  |  Email: ${BUSINESS_INFO.email}  |  Web: ${BUSINESS_INFO.website}`, 50, 65);

    // Document Title Banner on the right
    doc.rect(doc.page.width - 230, 25, 180, 28).fill(BRAND_COLORS.primary);
    doc.fillColor('#FFFFFF')
      .fontSize(11)
      .font('Helvetica-Bold')
      .text(title.toUpperCase(), doc.page.width - 225, 33, { width: 170, align: 'center' });

    // Divider Line
    doc.strokeColor(BRAND_COLORS.secondary).lineWidth(2)
      .moveTo(50, 85).lineTo(doc.page.width - 50, 85).stroke();

    doc.moveDown();
  }

  // Draw Official Pad Footer with WebCraftersPro Credit
  private static drawOfficialFooter(doc: PDFKit.PDFDocument) {
    const bottomY = doc.page.height - 70;

    // Divider
    doc.strokeColor('#E5E7EB').lineWidth(1)
      .moveTo(50, bottomY).lineTo(doc.page.width - 50, bottomY).stroke();

    // Signatures Area above footer
    doc.strokeColor('#9CA3AF').lineWidth(1)
      .moveTo(60, bottomY - 35).lineTo(200, bottomY - 35).stroke();
    doc.fillColor('#374151').fontSize(8).font('Helvetica-Bold')
      .text('CUSTOMER SIGNATURE', 60, bottomY - 30, { width: 140, align: 'center' });

    doc.strokeColor('#9CA3AF').lineWidth(1)
      .moveTo(doc.page.width - 200, bottomY - 35).lineTo(doc.page.width - 60, bottomY - 35).stroke();
    doc.fillColor('#374151').fontSize(8).font('Helvetica-Bold')
      .text('AUTHORIZED SIGNATURE & SEAL', doc.page.width - 200, bottomY - 30, { width: 140, align: 'center' });

    // Developer Credit in Footer
    doc.fillColor('#6B7280').fontSize(7).font('Helvetica')
      .text(
        `© 2026 ${BUSINESS_INFO.name}. All Rights Reserved.  |  ${DEVELOPER_INFO.creditText}  |  ${DEVELOPER_INFO.website}`,
        50,
        bottomY + 10,
        { align: 'center', width: doc.page.width - 100 }
      );
    doc.fillColor('#9CA3AF').fontSize(6)
      .text(DEVELOPER_INFO.copyrightNotice, 50, bottomY + 22, { align: 'center', width: doc.page.width - 100 });
  }

  // Generate Sale Invoice PDF
  public static async generateSaleInvoice(transaction: any): Promise<string> {
    this.ensureDocsDir();
    const fileName = `SALE-INVOICE-${transaction.transactionId || Date.now()}.pdf`;
    const filePath = path.join(this.docsDir, fileName);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      this.drawOfficialHeader(doc, 'SALES INVOICE');

      let y = 105;

      // Meta Info Box
      doc.rect(50, y, doc.page.width - 100, 60).fill('#F9FAFB');
      doc.strokeColor('#E5E7EB').rect(50, y, doc.page.width - 100, 60).stroke();

      doc.fillColor('#111827').font('Helvetica-Bold').fontSize(9)
        .text('INVOICE NO:', 60, y + 10)
        .text('DATE:', 60, y + 26)
        .text('PAYMENT STATUS:', 60, y + 42);

      doc.font('Helvetica').fillColor('#374151')
        .text(transaction.transactionId, 160, y + 10)
        .text(new Date(transaction.transactionDate || Date.now()).toLocaleDateString('en-GB'), 160, y + 26)
        .text(transaction.paymentStatus || 'PAID', 160, y + 42);

      const customer = transaction.customer || {};
      doc.fillColor('#111827').font('Helvetica-Bold')
        .text('CUSTOMER NAME:', 320, y + 10)
        .text('CONTACT NO:', 320, y + 26)
        .text('NID / DL NO:', 320, y + 42);

      doc.font('Helvetica').fillColor('#374151')
        .text(customer.fullName || 'N/A', 430, y + 10)
        .text(customer.mobile || 'N/A', 430, y + 26)
        .text(customer.nidNumber || customer.drivingLicenseNumber || 'N/A', 430, y + 42);

      y += 80;

      // Motorcycle Specification Table Header
      doc.rect(50, y, doc.page.width - 100, 24).fill(BRAND_COLORS.primary);
      doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(9)
        .text('SL', 60, y + 7)
        .text('MOTORCYCLE DETAILS & SPECIFICATIONS', 90, y + 7)
        .text('REG / CHASSIS NO', 330, y + 7)
        .text('TOTAL AMOUNT', 450, y + 7, { align: 'right', width: 90 });

      y += 24;

      const bike = transaction.bike || {};
      doc.rect(50, y, doc.page.width - 100, 110).fill('#FFFFFF');
      doc.strokeColor('#E5E7EB').rect(50, y, doc.page.width - 100, 110).stroke();

      doc.fillColor('#111827').font('Helvetica-Bold').fontSize(9)
        .text('01', 60, y + 12)
        .text(`${bike.brand || ''} ${bike.model || ''} (${bike.year || ''})`, 90, y + 12);

      doc.font('Helvetica').fontSize(8).fillColor('#4B5563')
        .text(`Variant: ${bike.variant || 'Standard'}`, 90, y + 28)
        .text(`Color: ${bike.color || 'N/A'}`, 90, y + 42)
        .text(`Mileage: ${bike.mileage ? bike.mileage + ' km' : 'N/A'}`, 90, y + 56)
        .text(`Condition: ${bike.condition || 'GOOD'}`, 90, y + 70)
        .text(`Engine No: ${bike.engineNumber || 'N/A'}`, 90, y + 84);

      doc.font('Helvetica').fontSize(8).fillColor('#374151')
        .text(`Reg: ${bike.registrationNumber || 'Not Registered'}`, 330, y + 28)
        .text(`Chassis: ${bike.chassisNumber || 'N/A'}`, 330, y + 42);

      doc.font('Helvetica-Bold').fontSize(11).fillColor(BRAND_COLORS.secondary)
        .text(formatCurrency(transaction.salePrice || transaction.amount || 0), 450, y + 12, {
          align: 'right',
          width: 90,
        });

      y += 125;

      // Summary Total
      doc.rect(340, y, doc.page.width - 390, 30).fill('#FEF2F2');
      doc.strokeColor(BRAND_COLORS.secondary).rect(340, y, doc.page.width - 390, 30).stroke();
      doc.fillColor(BRAND_COLORS.primary).font('Helvetica-Bold').fontSize(10)
        .text('NET PAYABLE:', 350, y + 10)
        .fillColor(BRAND_COLORS.secondary)
        .text(formatCurrency(transaction.salePrice || transaction.amount || 0), 440, y + 10, {
          align: 'right',
          width: 100,
        });

      y += 50;

      // Terms snippet
      doc.fillColor(BRAND_COLORS.primary).font('Helvetica-Bold').fontSize(8)
        .text('TERMS & CONDITIONS:', 50, y);
      y += 12;
      doc.font('Helvetica').fontSize(7).fillColor('#6B7280');
      for (let i = 0; i < 4; i++) {
        doc.text(AGREEMENT_TERMS[i], 50, y + i * 11);
      }

      this.drawOfficialFooter(doc);

      doc.end();
      stream.on('finish', () => resolve(`/uploads/documents/${fileName}`));
      stream.on('error', (err) => reject(err));
    });
  }

  // Generate Purchase Invoice / Voucher
  public static async generatePurchaseInvoice(transaction: any): Promise<string> {
    this.ensureDocsDir();
    const fileName = `PURCHASE-VOUCHER-${transaction.transactionId || Date.now()}.pdf`;
    const filePath = path.join(this.docsDir, fileName);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      this.drawOfficialHeader(doc, 'PURCHASE VOUCHER');

      let y = 105;
      doc.rect(50, y, doc.page.width - 100, 60).fill('#F9FAFB');
      doc.strokeColor('#E5E7EB').rect(50, y, doc.page.width - 100, 60).stroke();

      doc.fillColor('#111827').font('Helvetica-Bold').fontSize(9)
        .text('VOUCHER NO:', 60, y + 10)
        .text('DATE:', 60, y + 26)
        .text('STATUS:', 60, y + 42);

      doc.font('Helvetica').fillColor('#374151')
        .text(transaction.transactionId, 160, y + 10)
        .text(new Date(transaction.transactionDate || Date.now()).toLocaleDateString('en-GB'), 160, y + 26)
        .text('ACQUIRED / PURCHASED', 160, y + 42);

      const customer = transaction.customer || {};
      doc.fillColor('#111827').font('Helvetica-Bold')
        .text('SELLER NAME:', 320, y + 10)
        .text('MOBILE:', 320, y + 26)
        .text('NID NO:', 320, y + 42);

      doc.font('Helvetica').fillColor('#374151')
        .text(customer.fullName || 'N/A', 430, y + 10)
        .text(customer.mobile || 'N/A', 430, y + 26)
        .text(customer.nidNumber || 'N/A', 430, y + 42);

      y += 85;

      const bike = transaction.bike || {};
      doc.rect(50, y, doc.page.width - 100, 100).fill('#FFFFFF');
      doc.strokeColor('#E5E7EB').rect(50, y, doc.page.width - 100, 100).stroke();

      doc.fillColor('#111827').font('Helvetica-Bold').fontSize(10)
        .text(`${bike.brand || ''} ${bike.model || ''} - Year: ${bike.year || ''}`, 60, y + 12);

      doc.font('Helvetica').fontSize(8).fillColor('#4B5563')
        .text(`Chassis No: ${bike.chassisNumber || 'N/A'}`, 60, y + 30)
        .text(`Engine No: ${bike.engineNumber || 'N/A'}`, 60, y + 44)
        .text(`Registration: ${bike.registrationNumber || 'N/A'}`, 60, y + 58)
        .text(`Color: ${bike.color || 'N/A'} | Mileage: ${bike.mileage || 0} km`, 60, y + 72);

      doc.font('Helvetica-Bold').fontSize(12).fillColor(BRAND_COLORS.secondary)
        .text(`Purchase Price: ${formatCurrency(transaction.purchasePrice || transaction.amount || 0)}`, 320, y + 40);

      this.drawOfficialFooter(doc);

      doc.end();
      stream.on('finish', () => resolve(`/uploads/documents/${fileName}`));
      stream.on('error', (err) => reject(err));
    });
  }

  // Generate Digital Legal Agreement PDF
  public static async generateDigitalAgreement(agreement: any): Promise<string> {
    this.ensureDocsDir();
    const fileName = `AGREEMENT-${agreement.agreementId || Date.now()}.pdf`;
    const filePath = path.join(this.docsDir, fileName);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      this.drawOfficialHeader(doc, 'LEGAL AGREEMENT');

      let y = 100;
      doc.fillColor(BRAND_COLORS.primary).font('Helvetica-Bold').fontSize(11)
        .text('MOTORCYCLE SALE, PURCHASE & OWNERSHIP TRANSFER AGREEMENT', 50, y, {
          align: 'center',
          width: doc.page.width - 100,
        });

      y += 25;
      const cust = agreement.customer || {};
      const txn = agreement.transaction || {};
      const bike = txn.bike || {};

      doc.rect(50, y, doc.page.width - 100, 75).fill('#F9FAFB');
      doc.strokeColor('#E5E7EB').rect(50, y, doc.page.width - 100, 75).stroke();

      doc.font('Helvetica-Bold').fontSize(8).fillColor('#111827')
        .text('AGREEMENT ID:', 60, y + 8)
        .text('CUSTOMER NAME:', 60, y + 22)
        .text('NID NUMBER:', 60, y + 36)
        .text('ADDRESS:', 60, y + 50);

      doc.font('Helvetica').fontSize(8).fillColor('#374151')
        .text(agreement.agreementId, 160, y + 8)
        .text(cust.fullName || 'N/A', 160, y + 22)
        .text(cust.nidNumber || 'N/A', 160, y + 36)
        .text(cust.presentAddress || 'N/A', 160, y + 50, { width: 140 });

      doc.font('Helvetica-Bold').fontSize(8).fillColor('#111827')
        .text('BIKE MODEL:', 320, y + 8)
        .text('REG NUMBER:', 320, y + 22)
        .text('CHASSIS NO:', 320, y + 36)
        .text('PRICE:', 320, y + 50);

      doc.font('Helvetica').fontSize(8).fillColor('#374151')
        .text(`${bike.brand || ''} ${bike.model || ''}`, 410, y + 8)
        .text(bike.registrationNumber || 'N/A', 410, y + 22)
        .text(bike.chassisNumber || 'N/A', 410, y + 36)
        .text(formatCurrency(txn.salePrice || txn.amount || 0), 410, y + 50);

      y += 90;

      // Complete 9 Terms and Conditions
      doc.fillColor(BRAND_COLORS.primary).font('Helvetica-Bold').fontSize(9)
        .text('TERMS AND CONDITIONS', 50, y);
      y += 14;

      doc.font('Helvetica').fontSize(7.5).fillColor('#374151');
      AGREEMENT_TERMS.forEach((term) => {
        doc.text(term, 50, y, { width: doc.page.width - 100 });
        y += 16;
      });

      y += 10;

      // Digital Signature Verification Block
      if (agreement.status === 'SIGNED' && agreement.signedAt) {
        doc.rect(50, y, doc.page.width - 100, 80).fill('#ECFDF5');
        doc.strokeColor('#10B981').rect(50, y, doc.page.width - 100, 80).stroke();

        doc.fillColor('#065F46').font('Helvetica-Bold').fontSize(8.5)
          .text('✓ DIGITALLY SIGNED & VERIFIED DOCUMENT', 60, y + 8);

        doc.font('Helvetica').fontSize(7.5).fillColor('#047857')
          .text(`Signer Name: ${cust.fullName || 'Customer'}`, 60, y + 24)
          .text(`Timestamp: ${new Date(agreement.signedAt).toISOString()}`, 60, y + 37)
          .text(`IP Address: ${agreement.ipAddress || 'Verified'}`, 60, y + 50)
          .text(`Device Info: ${agreement.deviceInfo || agreement.userAgent || 'Web Browser'}`, 60, y + 63, {
            width: 250,
          });

        if (agreement.signatureImage && agreement.signatureImage.startsWith('data:image')) {
          try {
            const base64Data = agreement.signatureImage.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            doc.image(buffer, doc.page.width - 180, y + 20, { width: 110, height: 45 });
          } catch (e) {
            logger.warn('Could not embed signature image: %o', e);
          }
        }
      }

      this.drawOfficialFooter(doc);

      doc.end();
      stream.on('finish', () => resolve(`/uploads/documents/${fileName}`));
      stream.on('error', (err) => reject(err));
    });
  }
}

export default PdfService;
