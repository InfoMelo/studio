
'use client';

import DoctorSchedulePage from '@/components/pages/doctors';
import { useSearchParams } from 'next/navigation';
import type { Doctor } from '@/lib/types';

interface DoctorPageContentProps {
    doctors: Doctor[];
}

export default function DoctorPageContent({ doctors }: DoctorPageContentProps) {
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('search') || '';

    return (
        <DoctorSchedulePage initialSearchTerm={initialSearchTerm} doctors={doctors} />
    );
}
