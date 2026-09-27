import React from 'react';
import type { JobStatus } from '../../types/job';

const styles: Record<JobStatus, string> = {
  Published: 'bg-accent-50 text-accent-700 ring-accent-100',
  Draft: 'bg-surface text-ink-600 ring-line',
  Inactive: 'bg-warn-50 text-warn-700 ring-warn-100'
};

export function StatusBadge({ status }: {status: JobStatus;}) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ring-1 ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status === 'Published' ? 'Active' : status}
    </span>);

}