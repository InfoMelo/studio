
import { LanguageProvider } from '@/hooks/language-context';
import ContactPage from '@/components/pages/contact';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontak Kami',
  description: 'Hubungi RSU Meloy untuk informasi, pendaftaran, atau layanan darurat. Temukan alamat, nomor telepon, dan lokasi kami di peta.',
   openGraph: {
    title: 'Hubungi RSU Meloy - Informasi & Pendaftaran',
    description: 'Kami siap membantu Anda. Hubungi kami melalui telepon, email, atau kunjungi langsung rumah sakit kami.',
  },
};

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
