import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BUSINESS_INFO, DEVELOPER_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bikelover.com.bd'),
  title: {
    default: 'Bike Lover | Premium Used Motorcycle Buy, Sell & Exchange in Dhaka, Bangladesh',
    template: '%s | Bike Lover Bangladesh',
  },
  description:
    'Bike Lover is Dhaka premier motorcycle dealership in Japani Bazar, Sonir Akhra. Browse certified used bikes, legal digital sales agreements, and transparent ownership transfer.',
  keywords: [
    'used bikes bangladesh',
    'buy used motorcycle dhaka',
    'bike lover sonir akhra',
    'yamaha used bikes',
    'honda used bikes dhaka',
    'second hand bike showroom',
    'brta bike ownership transfer',
    'bike exchange bangladesh',
  ],
  authors: [{ name: DEVELOPER_INFO.name, url: DEVELOPER_INFO.website }],
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: 'https://bikelover.com.bd',
    siteName: 'Bike Lover',
    title: 'Bike Lover | Premium Motorcycle Buy, Sell & Exchange',
    description: 'Certified used bikes, digital sales agreements, and instant ownership transfer at Sonir Akhra, Dhaka.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Bike Lover Motorcycle Dealership' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bike Lover | Premium Motorcycle Dealership',
    description: 'Buy, Sell, Exchange certified used bikes in Dhaka, Bangladesh.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: BUSINESS_INFO.name,
    image: 'https://bikelover.com.bd/logo.png',
    '@id': 'https://bikelover.com.bd',
    url: 'https://bikelover.com.bd',
    telephone: BUSINESS_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Japani Bazar, Sonir Akhra',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.7028,
      longitude: 90.4533,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:00',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
