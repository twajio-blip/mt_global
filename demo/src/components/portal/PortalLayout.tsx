import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { PortalNav } from './PortalNav';

const ease = [0.23, 1, 0.32, 1] as const;

export function PortalLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen w-full bg-surface">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <PortalNav />
      </aside>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-brand-900 px-4 lg:hidden">
        <BrandLogo variant="light" subtitle="Client Portal" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10">
          
          <MenuIcon className="h-5 w-5" />
        </button>
      </header>

      <AnimatePresence>
        {open &&
        <>
            <motion.div
            className="fixed inset-0 z-40 bg-ink-900/50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)} />
          
            <motion.div
            className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Portal navigation">
            
              <PortalNav />
              <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="absolute right-3 top-5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10">
              
                <XIcon className="h-5 w-5" />
              </button>
            </motion.div>
          </>
        }
      </AnimatePresence>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>);

}