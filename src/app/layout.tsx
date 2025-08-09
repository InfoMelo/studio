
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from 'react';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
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
