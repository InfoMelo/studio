
import { LanguageProvider } from '@/hooks/language-context';
import FacilitiesPage from '@/components/pages/facilities';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';
import { getFacilities } from '../admin/actions';
import { Suspense } from 'react';
import LoadingLogo from '@/components/common/loading-logo';

export const metadata: Metadata = {
  title: 'Fasilitas Rumah Sakit',
  description: 'Lihat fasilitas modern dan teknologi canggih di RSU Meloy yang dirancang untuk kenyamanan dan keselamatan pasien.',
   openGraph: {
    title: 'Fasilitas Modern & Teknologi Canggih di RSU Meloy',
    description: 'Fasilitas kami mendukung diagnosis yang akurat dan perawatan pasien yang optimal.',
  },
};

export default async function Facilities() {
    const facilities = await getFacilities();
    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <Suspense fallback={<div className='h-screen w-full flex items-center justify-center'><LoadingLogo /></div>}>
                        <FacilitiesPage facilities={facilities} />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
