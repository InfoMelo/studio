'use client';

import { useLocalization } from '@/hooks/use-localization';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  onNavClick: (pageId: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const { t } = useLocalization();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
               <Image
                src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754702167/M_1_1_kwckeh.png"
                alt="Logo RSU Meloy"
                width={40}
                height={40}
                className="object-contain bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold">RSU Meloy</h3>
            </div>
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
              <li><a href="#/home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('beranda')}</a></li>
              <li><a href="#/services" onClick={(e) => { e.preventDefault(); onNavClick('services'); }} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('layanan')}</a></li>
              <li><a href="#/doctors" onClick={(e) => { e.preventDefault(); onNavClick('doctors'); }} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('jadwalDokter')}</a></li>
              <li><a href="#/contact" onClick={(e) => { e.preventDefault(); onNavClick('contact'); }} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">{t('kontak')}</a></li>
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
