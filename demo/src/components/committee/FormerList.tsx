import React from 'react';
import { Avatar } from '../ui/Avatar';
import type { FormerOfficeBearer } from '../../types';

interface FormerListProps {
  records: FormerOfficeBearer[];
  roleLabel: string;
}

export function FormerList({ records, roleLabel }: FormerListProps) {
  return (
    <ul className="divide-y divide-mcaa-border border-y border-mcaa-border">
      {records.map((record) =>
      <li key={record.id} className="flex items-center gap-3 py-3">
          <Avatar name={record.name} size={48} />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold leading-snug text-mcaa-navy">{record.name}</p>
            <p className="text-[13.5px] leading-snug text-mcaa-muted">{record.company}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[14px] font-medium tabular-nums text-mcaa-text">{record.term}</p>
            <p className="text-[12.5px] text-mcaa-muted">{roleLabel}</p>
          </div>
        </li>
      )}
    </ul>);

}