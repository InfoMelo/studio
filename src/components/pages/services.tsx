
'use client';

import { useLocalization } from '@/hooks/use-localization';
import { getServices } from '@/app/admin/actions';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Service as ServiceType } from '@/lib/types';
import Image from 'next/image';


export default function ServicesPage() {
  const { t } = useLocalization();
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const servicesFromDb = await getServices();
        setServices(servicesFromDb);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="py-16 md:py-24 bg-secondary animate-fade-in">
      <div className="container px-4 md:px-6">
        <SectionHeader title={t('layananTitle')} subtitle={t('layananSubtitle')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="items-center">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <Skeleton className="h-6 w-3/4 mt-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardContent>
              </Card>
            ))
          ) : (
            services.map((service) => (
              <Card key={service.docId} className="text-center hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                       {service.iconUrl && <Image src={service.iconUrl} alt={service.name} width={40} height={40} className="h-10 w-10 text-primary object-contain" />}
                    </div>
                  </div>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
