'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, ChevronRight, X } from 'lucide-react';
import TopBar from './top-bar';
import { useLocalization } from '@/hooks/use-localization';
import { getNavItems } from '@/lib/data';
import type { NavItem } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface HeaderProps {
  onNavClick: (pageId: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const { t } = useLocalization();
  const navItems = getNavItems(t);

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/#/" onClick={(e) => { e.preventDefault(); onNavClick('home'); }} className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754702167/M_1_1_kwckeh.png"
                alt="Logo RSU Meloy"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-xl">RSU Meloy</span>
            </a>
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
                      <DropdownMenuItem key={subItem.id} onClick={() => onNavClick(subItem.id)} className="cursor-pointer">
                        {subItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button key={item.id} variant="ghost" onClick={() => onNavClick(item.id)}>
                  {item.label}
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
            <SheetContent side="right">
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
                                  <Button variant="ghost" className="justify-start" onClick={() => onNavClick(subItem.id)}>
                                    {subItem.label}
                                  </Button>
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <SheetClose asChild key={item.id}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start font-semibold py-6 text-base"
                            onClick={() => onNavClick(item.id)}
                          >
                            {item.label}
                          </Button>
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
