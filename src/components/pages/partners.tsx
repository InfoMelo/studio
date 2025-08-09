
import Image from 'next/image';
import type { Partner } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { useLocalization } from '@/hooks/use-localization';
import SectionHeader from '../common/section-header';

interface PartnersListProps {
  partners: Partner[];
}

export default function PartnersList({ partners }: PartnersListProps) {
  const { t } = useLocalization();

  return (
    <div className="mt-12">
      <SectionHeader title={t('mitra')} subtitle={t('mitraSubtitle')} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {partners.length > 0 ? (
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
