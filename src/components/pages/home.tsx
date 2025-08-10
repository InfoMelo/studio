
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { quickAccessItems } from '@/lib/data';
import SectionHeader from '@/components/common/section-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import type { Service, Partner } from '@/lib/types';

const heroSlides = [
    { imageUrl: 'https://res.cloudinary.com/ddyqhlilj/image/upload/v1754745892/20250809_155010_nebhpv.jpg', titleKey: 'heroTitle', subtitleKey: 'heroSubtitle', aiHint: 'hospital building' },
    { imageUrl: 'https://images.pexels.com/photos/3957987/pexels-photo-3957987.jpeg?auto=compress&cs=tinysrgb&w=1600', titleKey: 'fasilitasTitle', subtitleKey: 'fasilitasSubtitle', aiHint: 'medical technology' },
    { imageUrl: 'https://images.pexels.com/photos/5214996/pexels-photo-5214996.jpeg?auto=compress&cs=tinysrgb&w=1600', titleKey: 'profesionalTitle', subtitleKey: 'profesionalDesc', aiHint: 'medical team' }
];

const whyUsItems = (t: (key: string) => string) => [
    { title: t('profesionalTitle'), desc: t('profesionalDesc'), imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', aiHint: 'doctors discussing' },
    { title: t('teknologiTitle'), desc: t('teknologiDesc'), imageUrl: 'https://res.cloudinary.com/ddyqhlilj/image/upload/v1754749759/panoramic-x-ray-thegem-blog-default_y8f15e.jpg', aiHint: 'modern medical equipment' },
    { title: t('kenyamananTitle'), desc: t('kenyamananDesc'), imageUrl: 'https://res.cloudinary.com/ddyqhlilj/image/upload/v1754741672/lobi_y0el0x.jpg', aiHint: 'hospital lobby' },
];

interface HomePageProps {
  services: Service[];
  partners: Partner[];
}

export default function HomePage({ services, partners }: HomePageProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const qai = quickAccessItems(t, (path: string) => router.push(path));
  const whyUs = whyUsItems(t);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <Carousel className="w-full relative" opts={{ loop: true }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}>
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="h-[calc(100vh-104px)] w-full relative">
                <Image
                  src={slide.imageUrl}
                  alt={t(slide.titleKey)}
                  data-ai-hint={slide.aiHint}
                  fill
                  objectFit="cover"
                  className="brightness-50"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="container px-4 md:px-6 h-full relative flex items-center">
                  <div className="max-w-2xl text-white space-y-6 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">{t(slide.titleKey)}</h1>
                    <p className="text-lg md:text-xl text-gray-200">{t(slide.subtitleKey)}</p>
                    <div className="flex gap-4">
                      <Button size="lg" asChild>
                        <Link href="/contact">{t('buatJanji')}</Link>
                      </Button>
                      <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                        <Link href="/services">{t('lihatLayanan')}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
      </Carousel>
      
      {/* Quick Access Section */}
      <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-background p-4 md:p-6 rounded-2xl shadow-lg border -mt-36 relative z-10 backdrop-blur-sm bg-background/80">
                  {qai.map((item, index) => (
                      <div
                          key={index}
                          onClick={item.action}
                          className="group flex flex-col items-center text-center p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                      >
                          <Avatar className="h-16 w-16 mb-4 bg-primary text-primary-foreground transition-all duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
                              <AvatarFallback className="bg-transparent">
                                  <item.icon className="h-8 w-8" />
                              </AvatarFallback>
                          </Avatar>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground transition-all duration-300 group-hover:text-primary-foreground/80">{item.subtitle}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 pt-0">
        <div className="container px-4 md:px-6">
          <SectionHeader title={t('kenapaMemilihKami')} subtitle={t('kenapaSubtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {whyUs.map((item, index) => (
              <Card key={index} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-0">
                  <Image src={item.imageUrl} data-ai-hint={item.aiHint} alt={item.title} width={600} height={400} className="w-full h-48 object-cover" />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{item.title}</CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0" asChild>
                      <Link href="/about?page=profile">
                          {t('selengkapnya')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Centers of Excellence Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <SectionHeader title={t('pusatKeunggulan')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services && services.slice(0, 6).map(service => (
            <Card key={service.docId} className="text-center flex flex-col items-center justify-start p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <Image src={service.iconUrl} alt={service.name} width={48} height={48} className="h-12 w-12 text-primary mb-4 object-contain" />
                <CardTitle className="mb-2 text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <SectionHeader title={t('mitraKami')} subtitle={t('mitraSubtitle')} />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {partners && partners.slice(0, 8).map((partner) => (
              <div key={partner.docId} className="flex justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src={partner.imageUrl}
                  alt={partner.name}
                  data-ai-hint={partner.aiHint}
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
