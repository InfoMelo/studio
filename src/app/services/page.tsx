
import { LanguageProvider } from '@/contexts/language-context';
import ServicesPage from '@/components/pages/services';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan Medis',
  description: 'Jelajahi layanan medis komprehensif yang kami tawarkan di RSU Meloy, dari UGD, rawat inap, hingga poliklinik spesialis.',
  openGraph: {
    title: 'Layanan Medis Komprehensif di RSU Meloy',
    description: 'Kami menyediakan berbagai layanan medis untuk memenuhi kebutuhan kesehatan Anda dan keluarga.',
  },
};

export default function Services() {
    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <ServicesPage />
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
