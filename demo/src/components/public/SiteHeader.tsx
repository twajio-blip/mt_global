import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LockIcon, MenuIcon, PhoneIcon, ShieldCheckIcon, XIcon } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { company } from '../../data/company';
import { buttonPrimary, pageContainer } from '../../utils/styles';

const navItems = [
{ to: '/', label: 'Home', end: true },
{ to: '/about', label: 'About', end: false },
{ to: '/jobs', label: 'Jobs', end: false },
{ to: '/contact', label: 'Contact', end: false }];


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="hidden bg-brand-950 text-[13px] text-brand-100 md:block">
        <div className={`${pageContainer} flex h-9 items-center justify-between`}>
          <p className="flex items-center gap-2">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-accent-500" aria-hidden />
            Government-licensed recruiting agency · {company.license}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${company.phoneHref}`}
              className="flex items-center gap-1.5 transition-colors duration-150 ease-out hover:text-white">
              
              <PhoneIcon className="h-3.5 w-3.5" aria-hidden />
              {company.phone}
            </a>
            <Link
              to="/portal/login"
              className="flex items-center gap-1.5 transition-colors duration-150 ease-out hover:text-white">
              
              <LockIcon className="h-3.5 w-3.5" aria-hidden />
              Client Login
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-b border-line">
        <div className={`${pageContainer} flex h-16 items-center justify-between gap-4 md:h-[72px]`}>
          <Link to="/" aria-label={`${company.name} home`} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200">
            <BrandLogo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
              `rounded-md px-4 py-2 text-[15px] font-medium transition-colors duration-150 ease-out ${
              isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-600 hover:text-brand-800'}`

              }>
              
                {item.label}
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/jobs" className={`${buttonPrimary} h-10 px-4 text-sm md:h-11`}>
              <span className="sm:hidden">Find Jobs</span>
              <span className="hidden sm:inline">Find Overseas Jobs</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-900 md:hidden">
              
              {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open &&
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lift md:hidden">
            
              <nav aria-label="Mobile" className={`${pageContainer} flex flex-col py-3`}>
                {navItems.map((item) =>
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                `flex h-12 items-center rounded-lg px-3 text-base font-medium ${
                isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-900'}`

                }>
                
                    {item.label}
                  </NavLink>
              )}
                <div className="mt-3 flex flex-col gap-2 border-t border-line pt-4">
                  <a href={`tel:${company.phoneHref}`} className="flex h-11 items-center gap-2 px-3 text-[15px] text-ink-700">
                    <PhoneIcon className="h-4 w-4" aria-hidden />
                    {company.phone}
                  </a>
                  <Link to="/portal/login" className="flex h-11 items-center gap-2 px-3 text-[15px] text-ink-700">
                    <LockIcon className="h-4 w-4" aria-hidden />
                    Client Login
                  </Link>
                </div>
              </nav>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </header>);

}
