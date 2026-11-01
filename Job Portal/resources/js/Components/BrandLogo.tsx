import React from 'react';
import { usePage } from '@inertiajs/react';
import { GlobeIcon } from 'lucide-react';

interface BrandLogoProps {
    variant?: 'dark' | 'light';
    subtitle?: string;
    customName?: string;
    customLogo?: string;
}

export function BrandLogo({
    variant = 'dark',
    subtitle,
    customName,
    customLogo,
}: BrandLogoProps) {
    const page = usePage<any>();
    const company = page.props?.company;
    const light = variant === 'light';

    const companyName = customName || company?.company_name || 'Overseas Portal';
    const logoUrl = customLogo || company?.logo_path;
    const sub = subtitle ?? (company?.website ? company.website.replace(/^https?:\/\//, '') : 'Overseas Jobs & Manpower');

    return (
        <span className="flex items-center gap-2.5 max-w-full">
            {logoUrl ? (
                <img
                    src={logoUrl}
                    alt={companyName}
                    className="h-10 w-10 shrink-0 rounded-xl object-contain bg-white p-1 shadow-sm border border-white/20"
                />
            ) : (
                <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-lg shadow-sm ${
                        light ? 'bg-white text-brand-900' : 'bg-brand-800 text-white'
                    }`}
                >
                    {companyName ? companyName[0].toUpperCase() : <GlobeIcon className="h-5 w-5" strokeWidth={2.2} />}
                </span>
            )}
            <span className="flex flex-col leading-tight min-w-0">
                <span className={`text-[16px] font-bold tracking-tight truncate ${light ? 'text-white' : 'text-brand-900'}`} title={companyName}>
                    {companyName}
                </span>
                <span className={`mt-0.5 text-[11px] font-medium truncate ${light ? 'text-brand-200' : 'text-ink-500'}`}>
                    {sub}
                </span>
            </span>
        </span>
    );
}

