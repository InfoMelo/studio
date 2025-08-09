'use client';
import { LanguageProvider } from '@/contexts/language-context';
import FacilitiesPage from '@/components/pages/facilities';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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
