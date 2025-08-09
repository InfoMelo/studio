
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from 'react';
import { PT_Sans, Source_Code_Pro } from 'next/font/google';
import { cn } from '@/lib/utils';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-code',
});


const APP_NAME = "RSU Meloy";
const APP_DESCRIPTION = "Layanan Kesehatan Modern & Terpercaya oleh RSU Meloy. Kesehatan Anda adalah prioritas kami. Temukan layanan dan dokter spesialis terbaik.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} - Kesehatan Anda, Prioritas Kami`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_NAME,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_NAME,
      template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const hospitalSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "RSU Meloy",
  "url": "https://websitersmeloy.web.app/",
  "logo": "https://res.cloudinary.com/ddyqhlilj/image/upload/v1754702167/M_1_1_kwckeh.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Yos Sudarso II No.101",
    "addressLocality": "Sangatta Utara",
    "addressRegion": "Kutai Timur",
    "addressCountry": "ID"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-549-24222",
    "contactType": "Customer Service"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(ptSans.variable, sourceCodePro.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
