
'use client';

import AboutPage from '@/components/pages/about';
import { useSearchParams } from 'next/navigation';

export default function AboutPageContent() {
  const searchParams = useSearchParams();
  const subPage = searchParams.get('page') || 'profile';

  return (
    <AboutPage subPage={subPage} />
  );
}
