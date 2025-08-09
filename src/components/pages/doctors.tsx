'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/common/section-header';
import { useLocalization } from '@/hooks/use-localization';
import { doctorsData } from '@/lib/data';
import type { Doctor } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { handleSmartSearch } from '@/app/actions';
import { useDebounce } from 'use-debounce';

interface DoctorSchedulePageProps {
  initialSearchTerm?: string;
}

export default function DoctorSchedulePage({ initialSearchTerm = '' }: DoctorSchedulePageProps) {
  const { t } = useLocalization();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [activeSpecialty, setActiveSpecialty] = useState('Semua');
  const [filteredDoctorIds, setFilteredDoctorIds] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const specialties = useMemo(() => [t('semua'), ...new Set(doctorsData.map(doc => doc.specialty))], [t]);

  const performSearch = useCallback(async (term: string) => {
    if (!term) {
        setFilteredDoctorIds(null);
        setLoading(false);
        return;
    }
    setLoading(true);
    const result = await handleSmartSearch(term);
    setFilteredDoctorIds(result.results);
    setLoading(false);
  }, []);

  useEffect(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);
  
  const displayedDoctors = useMemo(() => {
    let doctors = doctorsData;

    if (filteredDoctorIds) {
      const idSet = new Set(filteredDoctorIds);
      doctors = doctors.filter(doc => idSet.has(doc.id));
    }

    if (activeSpecialty !== t('semua')) {
      doctors = doctors.filter(doc => doc.specialty === activeSpecialty);
    }
    
    return doctors;
  }, [filteredDoctorIds, activeSpecialty, t]);


  return (
    <div className="py-16 md:py-24 bg-background animate-fade-in min-h-[80vh]">
      <div className="container px-4 md:px-6">
        <SectionHeader title={t('jadwalDokterTitle')} subtitle={t('jadwalDokterSubtitle')} />
        
        <Card className="p-4 md:p-6 mb-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </Card>

        <div className="space-y-4">
          {loading ? (
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
              <Card key={doc.id} className="flex flex-col md:flex-row items-center p-4 md:p-6 transition-shadow hover:shadow-md">
                <Avatar className="h-24 w-24 mb-4 md:mb-0 md:mr-6 border-2 border-primary">
                  <AvatarImage src={doc.imageUrl} alt={doc.name} data-ai-hint={doc.aiHint} />
                  <AvatarFallback>
                    <User className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold">{doc.name}</h3>
                  <p className="text-primary font-semibold mb-2">{doc.specialty}</p>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-muted-foreground font-medium bg-secondary p-2 rounded-md">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>{doc.schedule}</span>
                    </div>
                </div>
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
  );
}
