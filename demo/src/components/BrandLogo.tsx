import React from 'react';
import { GlobeIcon } from 'lucide-react';
import { company } from '../data/company';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  subtitle?: string;
}

export function BrandLogo({ variant = 'dark', subtitle = 'Overseas Manpower' }: BrandLogoProps) {
  const light = variant === 'light';
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
        light ? 'bg-white text-brand-900' : 'bg-brand-800 text-white'}`
        }>
        
        <GlobeIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-[17px] font-bold tracking-tight ${light ? 'text-white' : 'text-brand-900'}`}>
          {company.shortName}
        </span>
        <span className={`mt-1 text-[11px] font-medium ${light ? 'text-brand-200' : 'text-ink-500'}`}>{subtitle}</span>
      </span>
    </span>);

}
