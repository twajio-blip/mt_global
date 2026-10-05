import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Module } from '../ui/Module';

interface LeaderMessageProps {
  title: string;
  name: string;
  designation: string;
  company: string;
  portrait: string;
  excerpt: string;
  to: string;
}

export function LeaderMessage({
  title,
  name,
  designation,
  company,
  portrait,
  excerpt,
  to
}: LeaderMessageProps) {
  return (
    <Module title={title}>
      <div className="flex gap-3">
        <img
          src={portrait}
          alt={`Portrait of ${name}, ${designation}`}
          className="h-[74px] w-[62px] shrink-0 rounded-mcaa border border-mcaa-border object-cover" />
        
        <div className="min-w-0">
          <p className="text-[14px] font-semibold leading-snug text-mcaa-navy">{name}</p>
          <p className="text-[13px] text-mcaa-blue">{designation}</p>
          <p className="text-[13px] leading-snug text-mcaa-muted">{company}</p>
        </div>
      </div>
      <p className="mt-2.5 text-[14px] leading-relaxed text-mcaa-text line-clamp-4">{excerpt}</p>
      <Link
        to={to}
        className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-mcaa-blue hover:underline">
        
        Read Full Message
        <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </Module>);

}