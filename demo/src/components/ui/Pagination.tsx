import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-mcaa border border-mcaa-border bg-white text-mcaa-navy disabled:opacity-40 hover:enabled:bg-mcaa-light">
        
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      {pages.map((item) =>
      <button
        key={item}
        type="button"
        onClick={() => onChange(item)}
        aria-current={item === page ? 'page' : undefined}
        className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-mcaa border px-2 text-[14px] ${
        item === page ?
        'border-mcaa-blue bg-mcaa-blue font-semibold text-white' :
        'border-mcaa-border bg-white text-mcaa-navy hover:bg-mcaa-light'}`
        }>
        
          {item}
        </button>
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="inline-flex h-9 w-9 items-center justify-center rounded-mcaa border border-mcaa-border bg-white text-mcaa-navy disabled:opacity-40 hover:enabled:bg-mcaa-light">
        
        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>);

}