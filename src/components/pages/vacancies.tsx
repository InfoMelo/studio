
import type { Vacancy } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SectionHeader from '../common/section-header';
import { useLanguage } from '@/hooks/use-language';

interface VacanciesListProps {
  vacancies: Vacancy[];
}

export default function VacanciesList({ vacancies }: VacanciesListProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-12">
        <SectionHeader title={t('lowonganKerja')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <Card key={vacancy.docId} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
              <CardHeader>
                <CardTitle className="mb-2 text-xl">{vacancy.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        <span>{vacancy.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{vacancy.location}</span>
                    </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-4 text-muted-foreground">{vacancy.description}</p>
              </CardContent>
              <CardFooter className="p-6 bg-secondary flex-wrap justify-between items-center gap-4">
                 <div className="flex items-center gap-1.5 text-sm text-destructive font-medium">
                    <Calendar className="h-4 w-4"/>
                    <span>Batas Akhir: {format(new Date(vacancy.deadline), 'd MMMM yyyy', { locale: id })}</span>
                 </div>
                 <Button asChild>
                    <a href="mailto:rsu_meloy@yahoo.co.id?subject=Lamaran%20Pekerjaan%20-%20Posisi:%20'Nama Posisi'">
                        Kirim Lamaran
                    </a>
                 </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
            <div className="col-span-full text-center py-16 text-muted-foreground">
                <p>Saat ini belum ada lowongan pekerjaan yang tersedia. Silakan periksa kembali nanti.</p>
            </div>
        )}
      </div>
    </div>
  );
}
