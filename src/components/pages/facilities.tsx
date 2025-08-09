'use client';

import Image from 'next/image';
import { useLocalization } from '@/hooks/use-localization';
import { facilitiesData } from '@/lib/data';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FacilitiesPage() {
  const { t } = useLocalization();

  return (
    <div className="py-16 bg-secondary animate-fade-in">
      <div className="container">
        <SectionHeader title={t('fasilitasTitle')} subtitle={t('fasilitasSubtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilitiesData.map((facility) => (
            <Card key={facility.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={facility.imageUrl}
                  alt={facility.name}
                  data-ai-hint={facility.aiHint}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{facility.name}</CardTitle>
                <CardDescription>{facility.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
