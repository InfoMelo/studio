
'use client';

import { useEffect, useState } from 'react';
import { getVacancies } from '@/app/admin/actions';
import type { Vacancy } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Calendar, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import SectionHeader from '../common/section-header';
import { useLocalization } from '@/hooks/use-localization';

export default function VacanciesList() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLocalization();

  useEffect(() => {
    async function fetchVacancies() {
      try {
        const vacanciesFromDb = await getVacancies();
        setVacancies(vacanciesFromDb);
      } catch (error) {
        console.error("Failed to fetch vacancies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVacancies();
  }, []);

  return (
    <div className="mt-12">
        <SectionHeader title={t('lowonganKerja')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-7 w-3/4" />
                <div className='flex gap-4 pt-2'>
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-5 w-1/4" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </CardContent>
              <CardFooter className="flex justify-between">
                 <Skeleton className="h-6 w-1/3" />
                 <Skeleton className="h-9 w-28" />
              </CardFooter>
            </Card>
          ))
        ) : vacancies.length > 0 ? (
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
