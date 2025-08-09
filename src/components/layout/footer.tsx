'use client';

import { useLocalization } from '@/hooks/use-localization';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLocalization();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
               <Image
                src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754702167/M_1_1_kwckeh.png"
                alt="Logo RSU Meloy"
                width={40}
                height={40}
                className="object-contain bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold">RSU Meloy</h3>
            </Link>
            <p className="text-sm text-primary-foreground/80">{t('footerTagline')}</p>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10"><Facebook className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10"><Twitter className="h-5 w-5" /></Button>
              <Button size="icon" variant="ghost" className="hover:bg-primary-foreground/10"><Instagram className="h-5 w-5" /></Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('tautanCepat')}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('beranda')}</Link></li>
              <li><Link href="/services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('layanan')}</Link></li>
              <li><Link href="/doctors" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('jadwalDokter')}</Link></li>
              <li><Link href="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('kontak')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4">{t('kontak')}</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0" />
                <span>Jl. Yos Sudarso II No.101, Sangatta Utara, Kab. Kutai Timur</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 shrink-0" />
                <span>(0549) 24222</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 shrink-0" />
                <span>rsu_meloy@yahoo.co.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} Rumah Sakit Umum Meloy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
