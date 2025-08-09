
import { LanguageProvider } from '@/contexts/language-context';
import FacilitiesPage from '@/components/pages/facilities';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fasilitas Rumah Sakit',
  description: 'Lihat fasilitas modern dan teknologi canggih di RSU Meloy yang dirancang untuk kenyamanan dan keselamatan pasien.',
   openGraph: {
    title: 'Fasilitas Modern & Teknologi Canggih di RSU Meloy',
    description: 'Fasilitas kami mendukung diagnosis yang akurat dan perawatan pasien yang optimal.',
  },
};

export default function Facilities() {
    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <FacilitiesPage />
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
