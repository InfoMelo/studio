'use client';
import { LanguageProvider } from '@/contexts/language-context';
import ContactPage from '@/components/pages/contact';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Contact() {
    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                    <ContactPage />
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
