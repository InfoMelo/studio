
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getPartners } from '@/app/admin/actions';
import type { Partner } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocalization } from '@/hooks/use-localization';
import SectionHeader from '../common/section-header';

export default function PartnersList() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLocalization();

  useEffect(() => {
    async function fetchPartners() {
      try {
        const partnersFromDb = await getPartners();
        setPartners(partnersFromDb);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  return (
    <div className="mt-12">
      <SectionHeader title={t('mitra')} subtitle={t('mitraSubtitle')} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-6 h-48">
              <Skeleton className="h-20 w-32" />
              <Skeleton className="h-6 w-24 mt-4" />
            </Card>
          ))
        ) : partners.length > 0 ? (
          partners.map((partner) => (
            <Card key={partner.docId} className="flex flex-col items-center justify-center p-6 transition-shadow hover:shadow-xl h-48">
               <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    data-ai-hint={partner.aiHint}
                    width={140}
                    height={70}
                    className="object-contain h-20"
                />
              <p className="mt-4 font-semibold text-center">{partner.name}</p>
            </Card>
          ))
        ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>Belum ada mitra yang ditambahkan.</p>
            </div>
        )}
      </div>
    </div>
  );
}
