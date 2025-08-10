
'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Facility } from '@/lib/types';

interface FacilitiesPageProps {
  facilities: Facility[];
}

export default function FacilitiesPage({ facilities }: FacilitiesPageProps) {
  const { t } = useLanguage();

  if (!facilities) {
     return <div className="py-16 md:py-24 text-center">Memuat fasilitas...</div>;
  }

  return (
    <div className="py-16 md:py-24 bg-secondary animate-fade-in">
      <div className="container px-4 md:px-6">
        <SectionHeader title={t('fasilitasTitle')} subtitle={t('fasilitasSubtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {facilities.map((facility) => (
            <Card key={facility.docId} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
