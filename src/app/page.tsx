'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HomePage from '@/components/pages/home';
import DoctorSchedulePage from '@/components/pages/doctors';
import ServicesPage from '@/components/pages/services';
import FacilitiesPage from '@/components/pages/facilities';
import AboutPage from '@/components/pages/about';
import ContactPage from '@/components/pages/contact';
import { LanguageProvider } from '@/contexts/language-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [page, setPage] = useState('');
  const [subPage, setSubPage] = useState<string | null>(null);
  const [initialSearchTerm, setInitialSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const handleNavClick = (pageId: string) => {
    if (page === pageId.split('/')[0] && !window.location.hash.includes('?')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    window.location.hash = `/${pageId}`;
  };

  const handleSearch = (term: string) => {
    setInitialSearchTerm(term);
    handleNavClick('doctors');
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const [path, query] = hash.split('?');
      const [main, sub] = path.split('/');
      
      setPage(main || 'home');
      setSubPage(sub || null);
      setLoading(false);
    };

    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Initial load

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="container py-12">
          <Skeleton className="h-96 w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      );
    }
    
    switch (page) {
      case 'home':
        return <HomePage onNavClick={handleNavClick} onSearch={handleSearch} />;
      case 'doctors':
        return <DoctorSchedulePage initialSearchTerm={initialSearchTerm} />;
      case 'services':
        return <ServicesPage />;
      case 'facilities':
        return <FacilitiesPage />;
      case 'about':
        return <AboutPage subPage={subPage || 'profile'} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavClick={handleNavClick} onSearch={handleSearch} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <Header onNavClick={handleNavClick} />
        <main className="flex-1">{renderPage()}</main>
        <Footer onNavClick={handleNavClick} />
      </div>
    </LanguageProvider>
  );
}
