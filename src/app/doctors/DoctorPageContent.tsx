
'use client';

import DoctorSchedulePage from '@/components/pages/doctors';
import { useSearchParams } from 'next/navigation';

export default function DoctorPageContent() {
    const searchParams = useSearchParams();
    const initialSearchTerm = searchParams.get('search') || '';

    return (
        <DoctorSchedulePage initialSearchTerm={initialSearchTerm} />
    );
}
