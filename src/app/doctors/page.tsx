'use client';

import { LanguageProvider } from '@/contexts/language-context';
import DoctorSchedulePage from '@/components/pages/doctors';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DoctorPageContent() {
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

export default function DoctorsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DoctorPageContent />
        </Suspense>
    )
}
