import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import { Module } from '../ui/Module';

interface LinkListModuleProps {
  title: string;
  links: {label: string;to: string;}[];
}

export function LinkListModule({ title, links }: LinkListModuleProps) {
  return (
    <Module title={title}>
      <ul className="divide-y divide-mcaa-border">
        {links.map((link, index) =>
        <li key={link.to} className={index === 0 ? 'pb-1' : 'py-1 last:pb-0'}>
            <Link
            to={link.to}
            className="flex min-h-[36px] items-center gap-1.5 text-[14px] text-mcaa-text hover:text-mcaa-blue hover:underline">
            
              <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-mcaa-gold" aria-hidden="true" />
              <span className="min-w-0">{link.label}</span>
            </Link>
          </li>
        )}
      </ul>
    </Module>);

}