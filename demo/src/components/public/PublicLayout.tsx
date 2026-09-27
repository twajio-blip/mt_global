import React from 'react';
import { Outlet } from 'react-router-dom';
import { FloatingScrollTopButton } from '../FloatingScrollTopButton';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift">
        
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingScrollTopButton />
    </div>);

}
