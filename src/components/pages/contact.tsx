'use client';

import { useLocalization } from '@/hooks/use-localization';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const { t } = useLocalization();

  const contactInfo = [
    { icon: MapPin, text: "Jl. Yos Sudarso II No.101, Sangatta Utara, Kab. Kutai Timur" },
    { icon: Phone, text: "(0549) 24222" },
    { icon: Mail, text: "rsu_meloy@yahoo.co.id" },
    { icon: Clock, text: t('ugdText') },
  ];

  return (
    <div className="py-16 animate-fade-in">
      <div className="container">
        <SectionHeader title={t('kontakTitle')} subtitle={t('kontakSubtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">{t('infoKontak')}</h3>
              <ul className="space-y-6">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                       <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="pt-2 text-muted-foreground">{item.text}</span>
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
  );
}
