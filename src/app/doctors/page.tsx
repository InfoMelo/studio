
import { LanguageProvider } from '@/contexts/language-context';
import DoctorSchedulePage from '@/components/pages/doctors';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jadwal Dokter',
  description: 'Temukan jadwal praktik dokter spesialis di RSU Meloy. Rencanakan kunjungan Anda dengan mudah.',
   openGraph: {
    title: 'Jadwal Praktik Dokter Spesialis di RSU Meloy',
    description: 'Cari jadwal dokter berdasarkan nama atau spesialisasi untuk merencanakan konsultasi Anda.',
  },
};

function DoctorPageContent() {
    'use client';
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('search') || '';

    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <DoctorSchedulePage initialSearchTerm={initialSearchTerm} />
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}

function DoctorsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DoctorPageContent />
        </Suspense>
    )
}

export default DoctorsPage;
