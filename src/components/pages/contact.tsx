
'use client';

import { useLocalization } from '@/hooks/use-localization';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
)

export default function ContactPage() {
  const { t } = useLocalization();

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=RSU+Meloy+Sangatta";
  const waUrl = `https://wa.me/6282151545477?text=${encodeURIComponent(t('waRegistration'))}`;

  const contactInfo = [
    { 
      icon: MapPin, 
      text: "Jl. Yos Sudarso II No.101, Sangatta Utara, Kab. Kutai Timur",
      href: googleMapsUrl,
      target: "_blank"
    },
    { 
      icon: Phone, 
      text: "(0549) 24222",
      href: "tel:054924222",
      target: "_self"
    },
    { 
      icon: Mail, 
      text: "rsu_meloy@yahoo.co.id",
      href: "mailto:rsu_meloy@yahoo.co.id",
      target: "_self"
    },
    { 
      icon: WhatsAppIcon, 
      text: "Pendaftaran via WhatsApp",
      href: waUrl,
      target: "_blank"
    },
  ];

  return (
    <div className="animate-fade-in">
       <div className="relative h-64 md:h-80 w-full">
            <Image
                src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754741672/lobi_y0el0x.jpg"
                alt="Kontak RSU Meloy"
                data-ai-hint="hospital reception"
                fill
                className="object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="container relative z-10 flex h-full items-center justify-center text-center text-white">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-headline">
                        {t('kontakTitle')}
                    </h1>
                </div>
            </div>
        </div>

      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
            <SectionHeader subtitle={t('kontakSubtitle')} title="" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card>
                <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">{t('infoKontak')}</h3>
                <ul className="space-y-6">
                    {contactInfo.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                        <a href={item.href} target={item.target} rel="noopener noreferrer" className="flex items-start gap-4 group">
                            <div className="p-3 bg-primary/10 rounded-full transition-colors group-hover:bg-primary/20">
                            <item.icon className="h-6 w-6 text-primary" />
                            </div>
                            <span className="pt-2 text-muted-foreground transition-colors group-hover:text-primary">{item.text}</span>
                        </a>
                    </li>
                    ))}
                </ul>
                </CardContent>
            </Card>
            <Card className="overflow-hidden">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.680041834211!2d117.5326139758836!3d0.5047782047620181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x320a399479633333%3A0x6b87d75d2753066!2sRSU%20Meloy!5e0!3m2!1sen!2sid!4v1722854041243!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[400px]"
                ></iframe>
            </Card>
            </div>
        </div>
        </div>
    </div>
  );
}
