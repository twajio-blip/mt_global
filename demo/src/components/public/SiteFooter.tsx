import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { company } from '../../data/company';
import { legalRoutes } from '../../pages/public/LegalPage';
import { pageContainer } from '../../utils/styles';

export function SiteFooter() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className={`${pageContainer} grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <BrandLogo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">
            We publish verified overseas manpower requirements and collect CVs on behalf of employers across the
            Middle East, Asia and Europe.
          </p>
          <p className="mt-4 text-[13px] font-medium text-white">{company.license}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legalRoutes.map((l) =>
            <li key={l.to}>
                <Link to={l.to} className="transition-colors duration-150 ease-out hover:text-white">
                  {l.label}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
            { to: '/about', label: 'About Us' },
            { to: '/jobs', label: 'All Jobs' },
            { to: '/contact', label: 'Contact' },
            { to: '/portal/login', label: 'Client Portal' }].
            map((l) =>
            <li key={l.to}>
                <Link to={l.to} className="transition-colors duration-150 ease-out hover:text-white">
                  {l.label}
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Office</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
              <span>{company.addressLines.join(', ')}</span>
            </li>
            <li>
              <a href={`tel:${company.phoneHref}`} className="flex gap-2.5 hover:text-white">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="flex gap-2.5 hover:text-white">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden />
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${pageContainer} flex flex-col gap-3 py-6 text-[13px] text-brand-200 md:flex-row md:items-center md:justify-between`}>
          <p>© 2026 {company.name}. All rights reserved. Developed by DataDSS LTD.</p>
          <p className="max-w-2xl md:text-right">
            Final selection is made by the employer. Work visas are issued solely by the destination country’s
            authorities.
          </p>
        </div>
      </div>
    </footer>);

}
