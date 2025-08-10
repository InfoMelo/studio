
import { LanguageProvider } from '@/contexts/language-context';
import DoctorSchedulePage from '@/components/pages/doctors';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Suspense } from 'react';
import DoctorPageContent from './DoctorPageContent';
import type { Metadata } from 'next';
import { getDoctors } from '../admin/actions';

export const metadata: Metadata = {
  title: 'Jadwal Dokter',
  description: 'Temukan jadwal praktik dokter spesialis di RSU Meloy. Rencanakan kunjungan Anda dengan mudah.',
   openGraph: {
    title: 'Jadwal Praktik Dokter Spesialis di RSU Meloy',
    description: 'Cari jadwal dokter berdasarkan nama atau spesialisasi untuk merencanakan konsultasi Anda.',
  },
};

export default async function DoctorsPage() {
    const doctors = await getDoctors();
    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <Suspense fallback={<div>Loading...</div>}>
                    <DoctorPageContent doctors={doctors} />
                  </Suspense>
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
