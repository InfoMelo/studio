
'use client';

import { useLocalization } from '@/hooks/use-localization';
import { servicesData } from '@/lib/data';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ServicesPage() {
  const { t } = useLocalization();

  return (
    <div className="py-16 md:py-24 bg-secondary animate-fade-in">
      <div className="container px-4 md:px-6">
        <SectionHeader title={t('layananTitle')} subtitle={t('layananSubtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {servicesData.map((service) => (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                       <Image src={service.iconUrl} alt={service.name} width={40} height={40} className="h-10 w-10 text-primary object-contain" />
                    </div>
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

    