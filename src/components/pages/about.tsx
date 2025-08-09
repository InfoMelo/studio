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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-primary">{t('tentangSubNav')} RSU Meloy</h3>
        <p className="text-muted-foreground leading-relaxed">
          RSU Meloy Sangatta merupakan rumah sakit umum yang berlokasi di Sangatta Utara, Kabupaten Kutai Timur. Rumah Sakit Meloy berada dibawah naungan PT. Meloy berdiri sejak tahun 2003 dengan pengesahan Akta Notaris Wasiah, SH, Nomor 25 Tanggal 21 Oktober 2003. Rumah Sakit Meloy Sangatta merupakan perusahaan milik swasta yang menjalankan usahanya berfokus pada pelayanan kesehatan bagi masyarakat umum.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Atas ijin uji coba penyelenggaraan dari Dinas Kesehatan Propinsi Kalimantan Timur No. 503/52540/Regdit/I/2004 telah menjalankan usaha pelayanan kesehatan sejak tanggal 28 Januari 2004 dengan nama <strong>Rumah Sakit Khusus Ibu dan Anak Meloy</strong>. Pada tahun 2005 kembali diberikan Surat Ijin Uji Coba ke 2 Penyelenggaraan operasional Rumah Sakit Ibu dan Anak Meloy dengan No. 503/1313/PSTK-2/IV/2005.
        </p>
         <p className="text-muted-foreground leading-relaxed">
          Beranjak dari prestasi-prestasi yang telah dicapai oleh Rumah Sakit Meloy maka pada tanggal 05 September 2007 melalui keputusan Dinas Kesehatan Provinsi Kalimantan Timur No. 503/3154/PTSK-2/IX/2007 telah berhasil mendapatkan surat ijin uji coba penyelenggaraan operasional menjadi Rumah Sakit Umum dengan nama <strong>Rumah Sakit Umum Meloy Sangatta</strong> yang sebelumnya Rumah Sakit Khusus Ibu dan Anak, yang memberikan pelayanan kesehatan kepada semua jenis penyakit dari bersifat dasar sampai spesialistik dan mempunyai karakteristik pelayanan yang berbeda dengan industri jasa lainnya.
        </p>
         <p className="text-muted-foreground leading-relaxed">
          Setelah melalui 2 kali uji coba penyelenggaraan operasional dari Dinas Kesehatan Provinsi Kalimantan Timur yaitu tahun 2007 dan tahun 2008 maka pada tahun 2009 melalui Surat dari Dinas Kesehatan Kabupaten Kutai Timur No. 005/ Yankes-DKKT/VIII/2009 telah diberikan Surat Ijin Tetap Penyelenggaraan Rumah Sakit Umum Meloy Sangatta. Surat Ijin Tetap Penyelenggaraan Rumah Sakit Umum Meloy ini telah diperpanjang dengan No. 440/K.350/2016 dan berlaku sampai tahun 2021.
        </p>
      </div>
      <div>
        <Image 
          src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754745892/20250809_155010_nebhpv.jpg"
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
      case 'health-articles':
        return <DefaultContent title={t('artikelKesehatan')} />;
      default:
        return <ProfileContent />;
    }
  }

  return (
    <div className="py-16 md:py-24 animate-fade-in">
      <div className="container px-4 md:px-6">
        <SectionHeader title={t('tentangTitle')} />
        {renderContent()}
      </div>
    </div>
  );
}
