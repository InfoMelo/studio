'use client';
import { LanguageProvider } from '@/contexts/language-context';
import FacilitiesPage from '@/components/pages/facilities';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

export default function Facilities() {
    const router = useRouter();
    const handleNavClick = (pageId: string) => {
        router.push(`/${pageId.split('/')[0]}`);
    };

    return (
        <LanguageProvider>
            <div className="flex min-h-screen flex-col">
                <Header onNavClick={handleNavClick} />
                <main className="flex-1">
                    <FacilitiesPage />
                </main>
                <Footer onNavClick={handleNavClick} />
            </div>
        </LanguageProvider>
    );
}
