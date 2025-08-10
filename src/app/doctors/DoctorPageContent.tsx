
'use client';

import DoctorSchedulePage from '@/components/pages/doctors';
import { useSearchParams } from 'next/navigation';
import type { Doctor } from '@/lib/types';
import { useEffect, useState } from 'react';

interface DoctorPageContentProps {
  doctors: Doctor[];
}

export default function DoctorPageContent({ doctors: initialDoctors }: DoctorPageContentProps) {
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('search') || '';
    const [doctors, setDoctors] = useState(initialDoctors);

    // This is a workaround to ensure the client component re-renders when the data changes.
    useEffect(() => {
        setDoctors(initialDoctors);
    }, [initialDoctors]);

    return (
        <DoctorSchedulePage initialSearchTerm={initialSearchTerm} doctors={doctors} />
    );
}
