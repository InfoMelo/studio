'use client';
import { LanguageProvider } from '@/contexts/language-context';
import ContactPage from '@/components/pages/contact';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

export default function Contact() {
    const router = useRouter();
    const handleNavClick = (pageId: string) => {
        router.push(`/${pageId.split('/')[0]}`);
    };

    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header onNavClick={handleNavClick} />
                <main className="flex-1">
                    <ContactPage />
                </main>
                <Footer onNavClick={handleNavClick} />
            </div>
        </LanguageProvider>
    );
}
