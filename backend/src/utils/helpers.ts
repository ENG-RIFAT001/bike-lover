import { v4 as uuidv4 } from 'uuid';

export function generateBikeId(sequence: number): string {
  return `BL-${String(sequence).padStart(4, '0')}`;
}

export function generateTransactionId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TXN-${dateStr}-${rand}`;
}

export function generateAgreementId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AGR-${dateStr}-${rand}`;
}

export function generateSecureToken(): string {
  return uuidv4();
}

export function createSlug(brand: string, model: string, year: number, uniqueId: string): string {
  const clean = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  return `${clean(brand)}-${clean(model)}-${year}-${clean(uniqueId)}`;
}

export function formatCurrency(amount: number | string | bigint | any): string {
  const num = typeof amount === 'number' ? amount : parseFloat(String(amount || '0'));
  return `৳ ${num.toLocaleString('en-IN')}`;
}

export function calculateProfit(purchasePrice: number, salePrice: number): number {
  return Number((salePrice - purchasePrice).toFixed(2));
}

export function paginate(page = 1, limit = 10) {
  const p = Math.max(1, Number(page));
  const l = Math.max(1, Math.min(100, Number(limit)));
  const skip = (p - 1) * l;
  return { skip, take: l, page: p, limit: l };
}
