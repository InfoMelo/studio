
import { LanguageProvider } from '@/hooks/language-context';
import ServicesPage from '@/components/pages/services';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';
import { getServices } from '../admin/actions';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Layanan Medis',
  description: 'Jelajahi layanan medis komprehensif yang kami tawarkan di RSU Meloy, dari UGD, rawat inap, hingga poliklinik spesialis.',
  openGraph: {
    title: 'Layanan Medis Komprehensif di RSU Meloy',
    description: 'Kami menyediakan berbagai layanan medis untuk memenuhi kebutuhan kesehatan Anda dan keluarga.',
  },
};

export default async function Services() {
    const services = await getServices();
    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ServicesPage services={services} />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
