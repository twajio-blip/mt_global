import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLinkIcon, MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ASSOCIATION, FOOTER_IMPORTANT_LINKS, FOOTER_QUICK_LINKS } from '../../data/site';

export function Footer() {
  return (
    <footer className="mt-8 w-full bg-mcaa-footer text-[14px] text-[#C6D6E5]">
      <div className="mx-auto grid max-w-shell gap-8 px-4 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={54} />
            <div className="min-w-0">
              <p className="font-bn text-[16px] font-semibold leading-tight text-white">{ASSOCIATION.nameBn}</p>
              <p className="text-[13px] text-[#9FC2DE]">{ASSOCIATION.nameEn}</p>
            </div>
          </div>
          <p className="mt-3 leading-relaxed">
            MCAA is the recognised association of licensed customs clearing and forwarding agents operating through
            Mongla Custom House and Mongla Port, representing member firms before customs, port and government
            authorities.
          </p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="mb-3 border-b border-[#12456F] pb-2 text-[15px] font-semibold uppercase tracking-wide text-white">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {FOOTER_QUICK_LINKS.map((link) =>
            <li key={link.label}>
                <Link to={link.to} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <nav aria-label="Important links">
          <h2 className="mb-3 border-b border-[#12456F] pb-2 text-[15px] font-semibold uppercase tracking-wide text-white">
            Important Links
          </h2>
          <ul className="space-y-2">
            {FOOTER_IMPORTANT_LINKS.map((link) =>
            <li key={link.label}>
                <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white hover:underline">
                
                  {link.label}
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 border-b border-[#12456F] pb-2 text-[15px] font-semibold uppercase tracking-wide text-white">
            Contact Information
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-gold" aria-hidden="true" />
              <span>{ASSOCIATION.address}</span>
            </li>
            <li className="flex gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-gold" aria-hidden="true" />
              <span>
                <a href={`tel:${ASSOCIATION.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {ASSOCIATION.phone}
                </a>
                <br />
                <a href={`tel:${ASSOCIATION.altPhone.replace(/\s/g, '')}`} className="hover:text-white">
                  {ASSOCIATION.altPhone}
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-gold" aria-hidden="true" />
              <a href={`mailto:${ASSOCIATION.email}`} className="break-all hover:text-white">
                {ASSOCIATION.email}
              </a>
            </li>
            <li className="flex gap-2">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-gold" aria-hidden="true" />
              <span>{ASSOCIATION.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#0C3A64] bg-[#04223E]">
        <div className="mx-auto flex max-w-shell flex-col gap-1 px-4 py-4 text-[13px] text-[#9FC2DE] sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>© 2026 Mongla Customs Agents’ Association. All Rights Reserved.</p>
          <p>Mongla, Bagerhat, Bangladesh</p>
        </div>
      </div>
    </footer>);

}