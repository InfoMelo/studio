'use client';

import Image from 'next/image';
import { useLocalization } from '@/hooks/use-localization';
import { getFacilities } from '@/app/admin/actions';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Facility } from '@/lib/types';


export default function FacilitiesPage() {
  const { t } = useLocalization();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const facilitiesFromDb = await getFacilities();
        setFacilities(facilitiesFromDb);
      } catch (error) {
        console.error("Failed to fetch facilities:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFacilities();
  }, []);

  return (
    <div className="py-16 md:py-24 bg-secondary animate-fade-in">
      <div className="container px-4 md:px-6">
        <SectionHeader title={t('fasilitasTitle')} subtitle={t('fasilitasSubtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {loading ? (
             Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                    <Skeleton className="w-full h-56" />
                    <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                </Card>
             ))
          ) : (
            facilities.map((facility) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
