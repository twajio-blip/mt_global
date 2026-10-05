import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
}

export function PageHeader({ crumbs, title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-4">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[13px] text-mcaa-muted">
          {crumbs.map((crumb, index) =>
          <li key={`${crumb.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRightIcon aria-hidden="true" className="h-3.5 w-3.5 text-mcaa-border" />}
              {crumb.to ?
            <Link to={crumb.to} className="hover:text-mcaa-blue hover:underline">
                  {crumb.label}
                </Link> :

            <span className="text-mcaa-text">{crumb.label}</span>
            }
            </li>
          )}
        </ol>
      </nav>
      <h1 className="mt-2 text-[26px] font-semibold leading-tight text-mcaa-navy sm:text-[30px]">{title}</h1>
      {subtitle ? <p className="mt-1 font-bn text-[16px] text-mcaa-muted">{subtitle}</p> : null}
      <div className="mt-3 h-px w-full bg-mcaa-border" />
    </header>);

}