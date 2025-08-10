
import { LanguageProvider } from '@/hooks/language-context';
import ServicesPage from '@/components/pages/services';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';
import { getServices } from '../admin/actions';
import { Suspense } from 'react';
import LoadingLogo from '@/components/common/loading-logo';

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
                    <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><LoadingLogo /></div>}>
                        <ServicesPage services={services} />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
