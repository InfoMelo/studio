
import type { Translations, NavItem } from '@/lib/types';
import * as LucideIcons from 'lucide-react';
import { UserSearch, MessageCircle, Heart, MapPin } from 'lucide-react';

export const translations: Translations = {
    id: {
        beranda: 'Beranda', layanan: 'Layanan', fasilitas: 'Fasilitas', jadwalDokter: 'Jadwal', jadwal: 'Jadwal', profil: 'Profil', tentangKami: 'Profil', kontak: 'Kontak', heroTitle: 'Layanan Kesehatan Modern & Terpercaya', heroSubtitle: 'Kesehatan Anda adalah prioritas kami. Temukan layanan dan dokter spesialis terbaik di RSU Meloy.', searchPlaceholder: 'Cari Dokter atau Layanan', buatJanji: 'Buat Janji', lihatLayanan: 'Lihat Layanan', ugd24Jam: 'UGD 24 Jam', dokterSpesialis: 'Dokter Spesialis', fasilitasModern: 'Fasilitas Modern', kenapaMemilihKami: 'Kenapa Memilih Kami?', kenapaSubtitle: 'Kami berkomitmen untuk memberikan pengalaman perawatan kesehatan yang unggul.', profesionalTitle: 'Tim Profesional', profesionalDesc: 'Dokter dan staf medis kami berpengalaman dan berdedikasi tinggi.', teknologiTitle: 'Teknologi Canggih', teknologiDesc: 'Kami menggunakan peralatan medis terkini untuk diagnosis yang akurat.', kenyamananTitle: 'Kenyamanan Pasien', kenyamananDesc: 'Fasilitas yang bersih, aman, dan nyaman untuk proses pemulihan Anda.', pusatKeunggulan: 'Pusat Keunggulan Kami', footerTagline: 'Pelayanan Diatas Harapan', tautanCepat: 'Tautan Cepat', ikutiKami: 'Ikuti Kami', jadwalDokterTitle: 'Jadwal Dokter Spesialis', jadwalDokterSubtitle: 'Rencanakan kunjungan Anda dengan melihat jadwal dokter kami.', cariNamaDokter: 'Cari Nama Dokter atau Layanan', pilihSpesialisasi: 'Pilih Spesialisasi', semua: 'Semua', dokterTidakDitemukan: 'Dokter tidak ditemukan.', layananTitle: 'Layanan Medis Komprehensif', layananSubtitle: 'Dari penanganan darurat hingga perawatan spesialis, kami siap melayani.', fasilitasTitle: 'Fasilitas & Teknologi Modern', fasilitasSubtitle: 'Dirancang untuk mendukung diagnosis akurat dan kenyamanan pasien.', tentangTitle: 'Tentang RSU Meloy', tentangSubNav: 'Profil & Sejarah', mutuSubNav: 'Kebijakan Mutu', pencapaianSubNav: 'Pencapaian', kontakTitle: 'Hubungi Kami', kontakSubtitle: 'Kami siap membantu Anda. Hubungi kami atau kunjungi lokasi kami.', infoKontak: 'Informasi Kontak', alamat: 'Alamat', telepon: 'Telepon', email: 'Email', jamOperasional: 'Jam Operasional', ugdText: 'Pendaftaran via WhatsApp', kontakDarurat: 'Kontak Darurat UGD', selengkapnya: 'Selengkapnya', waRegistration: 'Halo RSU Meloy, saya ingin mendaftar untuk konsultasi dokter.', artikelKesehatan: 'Artikel Kesehatan',
        mitra: 'Mitra Kami',
        mitraKami: 'Mitra Terpercaya Kami',
        mitraSubtitle: 'Kami bekerja sama dengan berbagai perusahaan dan asuransi terkemuka untuk memberikan pelayanan terbaik.',
        lowonganKerja: 'Lowongan Kerja',
    },
    en: {
        beranda: 'Home', layanan: 'Services', fasilitas: 'Facilities', jadwalDokter: 'Schedule', jadwal: 'Schedule', profil: 'Profile', tentangKami: 'Profile', kontak: 'Contact', heroTitle: 'Modern & Trusted Health Services', heroSubtitle: 'Your health is our priority. Find the best services and specialist doctors at RSU Meloy.', searchPlaceholder: 'Search Doctor or Service', buatJanji: 'Make an Appointment', lihatLayanan: 'View Services', ugd24Jam: '24/7 Emergency', dokterSpesialis: 'Specialist Doctors', fasilitasModern: 'Modern Facilities', kenapaMemilihKami: 'Why Choose Us?', kenapaSubtitle: 'We are committed to providing a superior healthcare experience.', profesionalTitle: 'Professional Team', profesionalDesc: 'Our doctors and medical staff are experienced and highly dedicated.', teknologiTitle: 'Advanced Technology', teknologiDesc: 'We use the latest medical equipment for accurate diagnosis.', kenyamananTitle: 'Patient Comfort', kenyamananDesc: 'Clean, safe, and comfortable facilities for your recovery process.', pusatKeunggulan: 'Our Centers of Excellence', footerTagline: 'Service Above Expectation', tautanCepat: 'Quick Links', ikutiKami: 'Follow Us', jadwalDokterTitle: 'Specialist Doctor Schedule', jadwalDokterSubtitle: 'Plan your visit by checking our doctor\'s schedule.', cariNamaDokter: 'Search Doctor Name or Service', pilihSpesialisasi: 'Select Specialty', semua: 'All', dokterTidakDitemukan: 'No doctors found.', layananTitle: 'Comprehensive Medical Services', layananSubtitle: 'From emergency care to specialist treatment, we are ready to serve.', fasilitasTitle: 'Modern Facilities & Technology', fasilitasSubtitle: 'Designed to support accurate diagnosis and patient comfort.', tentangTitle: 'About RSU Meloy', tentangSubNav: 'Profile & History', mutuSubNav: 'Quality Policy', pencapaianSubNav: 'Achievements', kontakTitle: 'Contact Us', kontakSubtitle: 'We are here to help. Contact us or visit our location.', infoKontak: 'Contact Information', alamat: 'Address', telepon: 'Phone', email: 'Email', jamOperasional: 'Operating Hours', ugdText: 'WhatsApp Registration', kontakDarurat: 'Emergency Contact', selengkapnya: 'Learn More', waRegistration: 'Hello RSU Meloy, I would like to register for a doctor consultation.', artikelKesehatan: 'Health Articles',
        mitra: 'Our Partners',
        mitraKami: 'Our Trusted Partners',
        mitraSubtitle: 'We collaborate with leading companies and insurance providers to deliver the best services.',
        lowonganKerja: 'Job Vacancies',
    }
};

export const getNavItems = (t: (key: string) => string): NavItem[] => [
    { id: 'home', label: t('beranda') },
    { id: 'services', label: t('layanan') },
    { id: 'facilities', label: t('fasilitas') },
    { id: 'doctors', label: t('jadwalDokter') },
    { 
        id: 'about', 
        label: t('tentangKami'),
        submenu: [
            { id: 'about/profile', label: t('tentangSubNav') },
            { id: 'about/quality', label: t('mutuSubNav') },
            { id: 'about/achievements', label: t('pencapaianSubNav') },
            { id: 'about/health-articles', label: t('artikelKesehatan') },
            { id: 'about/partners', label: t('mitra') },
            { id: 'about/vacancies', label: t('lowonganKerja') },
        ]
    },
    { id: 'contact', label: t('kontak') },
];

export const allLucideIcons = Object.keys(LucideIcons).filter(key => key !== 'createLucideIcon' && key !== 'icons' && typeof (LucideIcons as any)[key] === 'object');

export const quickAccessItems = (t: (key: string) => string, navigate: (path: string) => void) => [
    { icon: UserSearch, title: t('cariNamaDokter'), subtitle: 'Temukan spesialis kami', action: () => navigate('/doctors') },
    { icon: MessageCircle, title: 'Pendaftaran WhatsApp', subtitle: 'Daftar online via WA', action: () => window.open(`https://wa.me/6282151545477?text=${encodeURIComponent(t('waRegistration'))}`, '_blank') },
    { icon: Heart, title: 'Paket Kesehatan', subtitle: 'Lihat promosi terbaru', action: () => navigate('/services') },
    { icon: MapPin, title: t('kontak'), subtitle: 'Lokasi & informasi', action: () => navigate('/contact') }
];
