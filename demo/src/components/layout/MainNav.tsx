import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { NAV_ITEMS } from '../../data/site';
import type { NavItem } from '../../data/site';

function isItemActive(item: NavItem, pathname: string) {
  if (item.to) return item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
  return (item.children ?? []).some((child) => pathname.startsWith(child.to));
}

export function MainNav() {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav aria-label="Main navigation" className="w-full border-b-2 border-mcaa-gold bg-mcaa-navy">
      <div className="mx-auto max-w-shell px-4 lg:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mcaa-mobile-nav"
          className="flex min-h-[48px] w-full items-center gap-2 text-[15px] font-medium text-white lg:hidden">
          
          {mobileOpen ? <XIcon className="h-5 w-5" aria-hidden="true" /> : <MenuIcon className="h-5 w-5" aria-hidden="true" />}
          Menu
        </button>

        {/* Desktop */}
        <ul className="hidden lg:flex lg:flex-wrap">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item, pathname);
            const activeClasses = active ? 'bg-mcaa-blue text-white' : 'text-[#DCE9F4] hover:bg-mcaa-blue hover:text-white';
            if (!item.children) {
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to as string}
                    className={`relative block px-4 py-3 text-[15px] font-medium transition-colors ${activeClasses} ${
                    active ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-mcaa-gold' : ''}`
                    }>
                    
                    {item.label}
                  </NavLink>
                </li>);

            }
            const open = openMenu === item.label;
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}>
                
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenMenu(open ? null : item.label)}
                  className={`relative flex items-center gap-1 px-4 py-3 text-[15px] font-medium transition-colors ${activeClasses} ${
                  active ? 'after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-mcaa-gold' : ''}`
                  }>
                  
                  {item.label}
                  <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                {open &&
                <ul className="absolute left-0 top-full z-30 w-[264px] border border-mcaa-border border-t-0 bg-white py-1 shadow-sm">
                    {item.children.map((child) =>
                  <li key={child.to}>
                        <Link
                      to={child.to}
                      className={`block px-4 py-2 text-[14px] ${
                      pathname === child.to ?
                      'bg-mcaa-light font-medium text-mcaa-blue' :
                      'text-mcaa-text hover:bg-mcaa-light hover:text-mcaa-blue'}`
                      }>
                      
                          {child.label}
                        </Link>
                      </li>
                  )}
                  </ul>
                }
              </li>);

          })}
        </ul>

        {/* Mobile */}
        {mobileOpen &&
        <ul id="mcaa-mobile-nav" className="pb-3 lg:hidden">
            {NAV_ITEMS.map((item) =>
          <li key={item.label} className="border-t border-[#0F4C86]">
                {item.to ?
            <NavLink
              to={item.to}
              className={`block min-h-[46px] py-3 text-[15px] ${
              isItemActive(item, pathname) ? 'font-semibold text-mcaa-gold' : 'text-white'}`
              }>
              
                    {item.label}
                  </NavLink> :

            <div className="py-2">
                    <p className="py-1 text-[13px] font-semibold uppercase tracking-wide text-[#9FC2DE]">
                      {item.label}
                    </p>
                    <ul>
                      {item.children?.map((child) =>
                <li key={child.to}>
                          <NavLink
                    to={child.to}
                    className={`block min-h-[44px] py-2.5 pl-3 text-[15px] ${
                    pathname === child.to ? 'font-semibold text-mcaa-gold' : 'text-white'}`
                    }>
                    
                            {child.label}
                          </NavLink>
                        </li>
                )}
                    </ul>
                  </div>
            }
              </li>
          )}
          </ul>
        }
      </div>
    </nav>);

}