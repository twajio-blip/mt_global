import React from 'react';

const styles: Record<string, string> = {
    Published: 'bg-accent-50 text-accent-700 ring-accent-100',
    Draft: 'bg-surface text-ink-600 ring-line',
    Inactive: 'bg-warn-50 text-warn-700 ring-warn-100',
    Approved: 'bg-accent-50 text-accent-700 ring-accent-100',
    Selected: 'bg-accent-50 text-accent-700 ring-accent-100',
    Pending: 'bg-warn-50 text-warn-700 ring-warn-100',
    Rejected: 'bg-danger-50 text-danger-700 ring-danger-100',
};

export function StatusBadge({ status }: { status: string }) {
    let display = status;
    if (status === 'Published') display = 'Active';
    if (status === 'Selected') display = 'Approved';
    const style = styles[status] || styles[display] || 'bg-surface text-ink-600 ring-line';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ring-1 ${style}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            {display}
        </span>
    );
}
