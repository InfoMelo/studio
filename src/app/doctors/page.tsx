'use client';

import { LanguageProvider } from '@/contexts/language-context';
import DoctorSchedulePage from '@/components/pages/doctors';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DoctorPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('search') || '';

    const handleNavClick = (pageId: string) => {
        router.push(`/${pageId.split('/')[0]}`);
    };

    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header onNavClick={handleNavClick} />
                <main className="flex-1">
                    <DoctorSchedulePage initialSearchTerm={initialSearchTerm} />
                </main>
                <Footer onNavClick={handleNavClick} />
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
