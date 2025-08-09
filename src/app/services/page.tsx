'use client';
import { LanguageProvider } from '@/contexts/language-context';
import ServicesPage from '@/components/pages/services';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

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
