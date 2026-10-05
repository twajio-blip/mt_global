import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { MainNav } from './MainNav';
import { Footer } from './Footer';
import { LeftSidebarContent, RightSidebarContent } from './Sidebars';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-mcaa-page">
      <Header />
      <MainNav />

      <div className="mx-auto w-full max-w-shell flex-1 px-4 py-5 lg:px-6">
        <div className="lg:flex lg:items-start lg:gap-5">
          <aside
            aria-label="Association information"
            className="hidden shrink-0 space-y-5 lg:block lg:w-[260px]">
            
            <LeftSidebarContent />
          </aside>

          <main className="min-w-0 lg:flex-1">
            <Outlet />
          </main>

          <aside
            aria-label="Regulatory and service information"
            className="hidden shrink-0 space-y-5 lg:block lg:w-[260px]">
            
            <RightSidebarContent />
          </aside>
        </div>

        {/* Tablet and mobile: sidebars stacked below the page content */}
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:hidden">
          <LeftSidebarContent />
          <RightSidebarContent />
        </div>
      </div>

      <Footer />
    </div>);

}