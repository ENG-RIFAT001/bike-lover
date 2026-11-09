export interface User {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'STAFF' | string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
}

export interface BikeImage {
  id?: string;
  url: string;
  isPrimary?: boolean;
  order?: number;
}

export interface Bike {
  id: string;
  bikeId: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  color: string;
  registrationNumber?: string;
  chassisNumber: string;
  engineNumber: string;
  mileage: number;
  purchasePrice: number;
  salePrice: number;
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | string;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'PURCHASED' | string;
  description?: string;
  slug: string;
  isFeatured: boolean;
  isPublished: boolean;
  images?: BikeImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  fatherName?: string;
  motherName?: string;
  dateOfBirth?: string;
  mobile: string;
  email?: string;
  presentAddress?: string;
  permanentAddress?: string;
  nidNumber?: string;
  drivingLicenseNumber?: string;
  nidFront?: string;
  nidBack?: string;
  drivingLicenseFront?: string;
  drivingLicenseBack?: string;
  photo?: string;
  isActive?: boolean;
  notes?: string;
  createdAt?: string;
  transactions?: Transaction[];
}

export interface Transaction {
  id: string;
  transactionId: string;
  type: 'PURCHASE' | 'SALE' | 'EXCHANGE' | string;
  bikeId: string;
  bike?: Bike;
  customerId: string;
  customer?: Customer;
  userId?: string;
  user?: User;
  amount: number;
  purchasePrice?: number;
  salePrice?: number;
  profit?: number;
  transactionDate: string;
  notes?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  documents?: GeneratedDocument[];
}

export interface Agreement {
  id: string;
  agreementId: string;
  transactionId: string;
  transaction?: Transaction;
  customerId: string;
  customer?: Customer;
  status: 'PENDING' | 'SENT' | 'VIEWED' | 'SIGNED' | 'EXPIRED' | string;
  secureToken: string;
  expiresAt: string;
  terms: string;
  signatureImage?: string;
  signedPdfUrl?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
  signedAt?: string;
  createdAt?: string;
}

export interface GeneratedDocument {
  id: string;
  transactionId: string;
  type: string;
  url: string;
  fileName: string;
  createdAt: string;
}

export interface DashboardStats {
  totalBikes: number;
  availableBikes: number;
  soldBikes: number;
  purchasedBikes: number;
  todaySalesCount: number;
  todaySalesAmount: number;
  monthSalesCount: number;
  monthSalesAmount: number;
  totalProfit: number;
  recentTransactions: Transaction[];
  topBrands: { brand: string; count: number }[];
}
