
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import SectionHeader from '@/components/common/section-header';
import { useLocalization } from '@/hooks/use-localization';
import type { Doctor } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { handleSmartSearch } from '@/app/actions';
import { useDebounce } from 'use-debounce';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import DownloadScheduleButton from './DownloadScheduleButton';

interface DoctorSchedulePageProps {
  initialSearchTerm?: string;
  doctors: Doctor[];
}

export default function DoctorSchedulePage({ initialSearchTerm = '', doctors: allDoctors }: DoctorSchedulePageProps) {
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [activeSpecialty, setActiveSpecialty] = useState('Semua');
  const [filteredDoctorIds, setFilteredDoctorIds] = useState<string[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const specialties = useMemo(() => {
    return [t('semua'), ...new Set(allDoctors.map(doc => doc.specialty))];
  }, [t, allDoctors]);

  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
        setFilteredDoctorIds(null);
        setSearchLoading(false);
        return;
    }
    setSearchLoading(true);
    try {
      const result = await handleSmartSearch(term);
      setFilteredDoctorIds(result.results);
    } catch(error) {
        console.error("Smart search failed:", error);
        const lowerCaseTerm = term.toLowerCase();
        const fallbackResults = allDoctors.filter(d => 
            d.name.toLowerCase().includes(lowerCaseTerm) ||
            d.specialty.toLowerCase().includes(lowerCaseTerm)
        ).map(d => d.id);
        setFilteredDoctorIds(fallbackResults);
    } finally {
      setSearchLoading(false);
    }
  }, [allDoctors]);

  useEffect(() => {
    if (debouncedSearchTerm) {
        performSearch(debouncedSearchTerm);
    } else {
        setFilteredDoctorIds(null);
    }
  }, [debouncedSearchTerm, performSearch]);
  
  const displayedDoctors = useMemo(() => {
    let doctors = allDoctors;

    if (debouncedSearchTerm && filteredDoctorIds) {
      const idSet = new Set(filteredDoctorIds);
      doctors = doctors.filter(doc => idSet.has(doc.id));
    }

    if (activeSpecialty !== t('semua')) {
      doctors = doctors.filter(doc => doc.specialty === activeSpecialty);
    }
    
    return doctors;
  }, [allDoctors, debouncedSearchTerm, filteredDoctorIds, activeSpecialty, t]);


  const getTooltipContent = (doctor: Doctor) => {
    if (doctor.status === 'Tutup' && doctor.statusInfo) {
      return doctor.statusInfo;
    }
    if (doctor.status === 'Tutup') {
      return 'Dokter tidak membuka praktek saat ini.';
    }
    return 'Dokter sedang membuka praktek sesuai jadwal.';
  }

  return (
    <TooltipProvider>
      <div className="py-16 md:py-24 bg-background animate-fade-in min-h-[80vh]">
        <div className="container px-4 md:px-6">
          <SectionHeader title={t('jadwalDokterTitle')} subtitle={t('jadwalDokterSubtitle')} />
          
          <Card className="p-4 md:p-6 mb-8 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <Input
                  placeholder={t('cariNamaDokter')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="text-base"
                />
              </div>
              <div>
                <Select value={activeSpecialty} onValueChange={setActiveSpecialty}>
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder={t('pilihSpesialisasi')} />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map(spec => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
             <div className="mt-4 flex justify-end">
                <DownloadScheduleButton doctors={displayedDoctors} specialty={activeSpecialty} />
            </div>
          </Card>

          <div className="space-y-4">
            {searchLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="flex items-center p-4">
                  <Skeleton className="h-24 w-24 rounded-full mr-4" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </Card>
              ))
            ) : displayedDoctors.length > 0 ? (
              displayedDoctors.map((doc: Doctor) => (
                <Card key={doc.id} className="transition-shadow hover:shadow-lg">
                  <CardContent className="p-4 md:p-6 flex items-start gap-4 md:gap-6">
                    <div className="p-2 bg-primary/10 rounded-full flex-shrink-0 mt-1">
                        <User className="h-16 w-16 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                          <div>
                              <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                              <p className="text-primary font-semibold">{doc.specialty}</p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant={doc.status === 'Praktek' ? 'default' : 'destructive'} className={`${doc.status === 'Praktek' ? 'bg-green-600' : ''} text-white`}>
                                  {doc.status}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{getTooltipContent(doc)}</p>
                            </TooltipContent>
                          </Tooltip>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{doc.schedule}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center text-muted-foreground">
                {t('dokterTidakDitemukan')}
              </Card>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
