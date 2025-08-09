'use client';

import Image from 'next/image';
import { useLocalization } from '@/hooks/use-localization';
import SectionHeader from '@/components/common/section-header';
import { Card, CardContent } from '@/components/ui/card';

interface AboutPageProps {
  subPage: string;
}

const ProfileContent = () => {
  const { t } = useLocalization();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">{t('tentangSubNav')} RSU Meloy</h3>
        <p className="text-muted-foreground leading-relaxed">
          RS Meloy Sangatta merupakan rumah sakit umum yang berlokasi di Sangatta Utara, Kabupaten Kutai Timur. Berdiri sejak tahun 2003, kami berkomitmen memberikan pelayanan terbaik.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Sejak 2009, kami resmi beroperasi sebagai <strong>Rumah Sakit Umum Meloy Sangatta</strong> dan terus berkembang hingga kini.
        </p>
      </div>
      <div>
        <Image 
          src="https://placehold.co/500x350.png"
          alt="Gedung RS Meloy" 
          data-ai-hint="hospital building"
          width={500} 
          height={350} 
          className="w-full rounded-lg shadow-md object-cover" 
        />
      </div>
    </div>
  );
};

const DefaultContent = ({ title }: { title: string }) => (
    <Card className="mt-8">
        <CardContent className="p-12 text-center text-muted-foreground">
            <p>Konten untuk <strong>{title}</strong> akan ditampilkan di sini.</p>
        </CardContent>
    </Card>
);

export default function AboutPage({ subPage }: AboutPageProps) {
  const { t } = useLocalization();

  const renderContent = () => {
    switch(subPage) {
      case 'profile':
        return <ProfileContent />;
      case 'quality':
        return <DefaultContent title={t('mutuSubNav')} />;
      case 'achievements':
        return <DefaultContent title={t('pencapaianSubNav')} />;
      default:
        return <ProfileContent />;
    }
  }

  return (
    <div className="py-16 md:py-24 animate-fade-in">
      <div className="container">
        <SectionHeader title={t('tentangTitle')} />
        {renderContent()}
      </div>
    </div>
  );
}
