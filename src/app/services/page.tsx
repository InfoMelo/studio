'use client';
import { LanguageProvider } from '@/contexts/language-context';
import ServicesPage from '@/components/pages/services';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

export default function Services() {
    const router = useRouter();
    const handleNavClick = (pageId: string) => {
        router.push(`/${pageId.split('/')[0]}`);
    };

    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header onNavClick={handleNavClick} />
                <main className="flex-1">
                    <ServicesPage />
                </main>
                <Footer onNavClick={handleNavClick} />
            </div>
        </LanguageProvider>
    );
}
