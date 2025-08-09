'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, X } from 'lucide-react';
import TopBar from './top-bar';
import { useLocalization } from '@/hooks/use-localization';
import { getNavItems } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from 'next/navigation';

export default function Header() {
  const { t } = useLocalization();
  const navItems = getNavItems(t);
  const router = useRouter();

  const handleDropdownClick = (id: string) => {
    const [main, sub] = id.split('/');
    if (sub) {
      router.push(`/${main}?page=${sub}`);
    } else {
      router.push(`/${main}`);
    }
  }

  const getLinkHref = (id: string) => {
    return id === 'home' ? '/' : `/${id}`;
  };

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754702167/M_1_1_kwckeh.png"
                alt="Logo RSU Meloy"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-xl">RSU Meloy</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      {item.label}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.id} onClick={() => handleDropdownClick(subItem.id)} className="cursor-pointer">
                        {subItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button key={item.id} variant="ghost" asChild>
                  <Link href={getLinkHref(item.id)}>{item.label}</Link>
                </Button>
              )
            )}
          </nav>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="font-bold">Menu</h2>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon"><X/></Button>
                  </SheetClose>
                </div>
                <nav className="flex-1 p-4">
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.map((item) =>
                      item.submenu ? (
                        <AccordionItem value={item.id} key={item.id}>
                          <AccordionTrigger className="font-semibold">{item.label}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2 pl-4">
                              {item.submenu.map((subItem) => (
                                <SheetClose asChild key={subItem.id}>
                                  <Button variant="ghost" className="justify-start" onClick={() => handleDropdownClick(subItem.id)}>
                                    {subItem.label}
                                  </Button>
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <SheetClose asChild key={item.id}>
                           <Link href={getLinkHref(item.id)} passHref>
                            <Button
                                variant="ghost"
                                className="w-full justify-start font-semibold py-6 text-base"
                            >
                                {item.label}
                            </Button>
                           </Link>
                        </SheetClose>
                      )
                    )}
                  </Accordion>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
