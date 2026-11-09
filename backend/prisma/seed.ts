import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash passwords
  const ownerPassword = await bcrypt.hash('Admin@123!', 12);
  const managerPassword = await bcrypt.hash('Manager@123!', 12);
  const staffPassword = await bcrypt.hash('Staff@123!', 12);

  // Create Owner
  const owner = await prisma.user.upsert({
    where: { email: 'admin@bikelover.com' },
    update: {},
    create: {
      name: 'Bike Lover Admin',
      email: 'admin@bikelover.com',
      password: ownerPassword,
      role: 'OWNER',
      phone: '+8801700000000',
      isActive: true,
    },
  });
  console.log('✅ Owner created:', owner.email);

  // Create Manager
  const manager = await prisma.user.upsert({
    where: { email: 'manager@bikelover.com' },
    update: {},
    create: {
      name: 'Bike Lover Manager',
      email: 'manager@bikelover.com',
      password: managerPassword,
      role: 'MANAGER',
      phone: '+8801700000001',
      isActive: true,
    },
  });
  console.log('✅ Manager created:', manager.email);

  // Create Staff
  const staff = await prisma.user.upsert({
    where: { email: 'staff@bikelover.com' },
    update: {},
    create: {
      name: 'Bike Lover Staff',
      email: 'staff@bikelover.com',
      password: staffPassword,
      role: 'STAFF',
      phone: '+8801700000002',
      isActive: true,
    },
  });
  console.log('✅ Staff created:', staff.email);

  // Default Settings
  const settings = [
    { key: 'company_name', value: 'Bike Lover' },
    { key: 'company_tagline', value: 'Your Trusted Motorcycle Dealership' },
    { key: 'company_phone', value: '+8801700000000' },
    { key: 'company_email', value: 'info@bikelover.com' },
    { key: 'company_address', value: 'Japani Bazar, Sonir Akhra, Dhaka, Bangladesh' },
    { key: 'company_website', value: 'https://bikelover.com' },
    { key: 'company_logo', value: '' },
    { key: 'company_facebook', value: 'https://facebook.com/bikelover' },
    { key: 'currency', value: 'BDT' },
    { key: 'currency_symbol', value: '৳' },
    { key: 'tax_rate', value: '0' },
    { key: 'invoice_prefix', value: 'BL' },
    { key: 'agreement_expiry_days', value: '7' },
    { key: 'allow_public_listing', value: 'true' },
    { key: 'agreement_terms_purchase', value: 'I hereby confirm that I have sold the above mentioned motorcycle to Bike Lover. The vehicle is free from all encumbrances and disputes. All documents are genuine and I take full responsibility for any legal issues arising from this transaction.' },
    { key: 'agreement_terms_sale', value: 'I hereby confirm that I have purchased the above mentioned motorcycle from Bike Lover. I have inspected the vehicle thoroughly and am satisfied with its condition. I acknowledge receipt of all relevant documents.' },
    { key: 'smtp_host', value: 'smtp.gmail.com' },
    { key: 'smtp_port', value: '587' },
    { key: 'smtp_secure', value: 'false' },
    { key: 'backup_schedule', value: 'daily' },
    { key: 'backup_retention_days', value: '30' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Default settings created');

  // Sample Testimonials
  const testimonials = [
    {
      name: 'Md. Rahim Uddin',
      rating: 5,
      comment: 'Excellent service! Got my dream Yamaha FZS at a great price. The team at Bike Lover is very professional and helpful.',
      isActive: true,
    },
    {
      name: 'Karim Hassan',
      rating: 5,
      comment: 'Best motorcycle dealership in Dhaka. Transparent pricing, genuine documents, and hassle-free experience. Highly recommended!',
      isActive: true,
    },
    {
      name: 'Sultana Begum',
      rating: 4,
      comment: 'Bought a Honda CB Hornet for my son. The staff was very patient and explained everything clearly. Great experience overall.',
      isActive: true,
    },
    {
      name: 'Arif Ahmed',
      rating: 5,
      comment: 'Amazing collection of bikes! Found exactly what I was looking for. The digital agreement process was very smooth and convenient.',
      isActive: true,
    },
    {
      name: 'Nasrin Akter',
      rating: 5,
      comment: 'Sold my old bike here and got a fair price. The process was quick and they handled all the paperwork professionally.',
      isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Sample testimonials created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\nLogin Credentials:');
  console.log('👑 Owner:   admin@bikelover.com   / Admin@123!');
  console.log('👔 Manager: manager@bikelover.com / Manager@123!');
  console.log('👷 Staff:   staff@bikelover.com   / Staff@123!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
