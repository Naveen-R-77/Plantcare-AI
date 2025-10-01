'use client'

import React from 'react';
import { Leaf, Camera, MessageCircle, TrendingUp, User, Settings, X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { LanguageSwitcher } from './language-switcher';

interface MobileNavigationProps {
  onClose?: () => void;
}

export function MobileNavigation({ onClose }: MobileNavigationProps) {
  const { t } = useLanguage();

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader className="py-6">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>{t.nav.title}</span>
          </SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col gap-1">
          <Link href="/" onClick={handleLinkClick} className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Leaf className="h-4 w-4" />
              {t.nav.title}
            </Button>
          </Link>
          
          <Link href="/dashboard" onClick={handleLinkClick} className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Camera className="h-4 w-4" />
              {t.nav.detection}
            </Button>
          </Link>
          
          <Link href="/chat" onClick={handleLinkClick} className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageCircle className="h-4 w-4" />
              {t.nav.chat}
            </Button>
          </Link>
          
          <Link href="/advisory" onClick={handleLinkClick} className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <TrendingUp className="h-4 w-4" />
              {t.nav.advisory}
            </Button>
          </Link>
          
          <Link href="/contact" onClick={handleLinkClick} className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </Button>
          </Link>
          
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              Language / भाषा / மொழி
            </div>
            <LanguageSwitcher />
          </div>
          
          <Separator className="my-2" />
          
          <div className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              {t.nav.profile}
            </Button>
          </div>
          
          <div className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              {t.nav.settings}
            </Button>
          </div>
          
          <Separator className="my-2" />
          
          <div className="px-4 py-2 text-sm">
            <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
              {t.nav.signOut}
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}