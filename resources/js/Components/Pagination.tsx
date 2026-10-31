import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links?: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total?: number;
    className?: string;
}

export function Pagination({ links, from, to, total, className = '' }: PaginationProps) {
    if (!links || links.length <= 1) return null;

    return (
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 sm:px-6 border-t border-line bg-surface/50 rounded-b-2xl ${className}`}>
            <div className="text-xs text-ink-600">
                {typeof from === 'number' && typeof to === 'number' && typeof total === 'number' ? (
                    <span>
                        Showing <span className="font-semibold text-ink-900">{from}</span> to{' '}
                        <span className="font-semibold text-ink-900">{to}</span> of{' '}
                        <span className="font-semibold text-ink-900">{total}</span> results
                    </span>
                ) : null}
            </div>

            <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
                {links.map((link, index) => {
                    const isPrev = link.label.includes('Previous') || link.label.includes('&laquo;');
                    const isNext = link.label.includes('Next') || link.label.includes('&raquo;');
                    const isDots = link.label === '...';

                    if (isDots) {
                        return (
                            <span
                                key={index}
                                className="inline-flex h-9 min-w-[36px] items-center justify-center px-2 text-xs text-ink-400"
                            >
                                ...
                            </span>
                        );
                    }

                    if (!link.url) {
                        return (
                            <span
                                key={index}
                                className="inline-flex h-9 min-w-[36px] items-center justify-center rounded-lg border border-line bg-surface px-2.5 text-xs font-medium text-ink-400 opacity-50 cursor-not-allowed"
                            >
                                {isPrev ? (
                                    <span className="flex items-center gap-1">
                                        <ChevronLeftIcon className="h-3.5 w-3.5" /> Prev
                                    </span>
                                ) : isNext ? (
                                    <span className="flex items-center gap-1">
                                        Next <ChevronRightIcon className="h-3.5 w-3.5" />
                                    </span>
                                ) : (
                                    link.label
                                )}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-xs font-medium transition duration-150 ease-out ${
                                link.active
                                    ? 'bg-brand-800 text-white font-semibold shadow-sm'
                                    : 'border border-line bg-white text-ink-700 hover:border-brand-200 hover:bg-surface'
                            }`}
                        >
                            {isPrev ? (
                                <span className="flex items-center gap-1">
                                    <ChevronLeftIcon className="h-3.5 w-3.5" /> Prev
                                </span>
                            ) : isNext ? (
                                <span className="flex items-center gap-1">
                                    Next <ChevronRightIcon className="h-3.5 w-3.5" />
                                </span>
                            ) : (
                                link.label
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

