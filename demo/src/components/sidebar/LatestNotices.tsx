import React from 'react';
import { Link } from 'react-router-dom';
import { FileTextIcon } from 'lucide-react';
import { Module } from '../ui/Module';
import { notices } from '../../data/notices';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function LatestNotices() {
  return (
    <Module
      title="Latest Notices"
      footer={
      <Link to="/notices" className="font-medium text-mcaa-blue hover:underline">
          View All Notices →
        </Link>
      }>
      
      <ul className="divide-y divide-mcaa-border">
        {notices.slice(0, 6).map((notice, index) =>
        <li key={notice.id} className={index === 0 ? 'pb-2' : 'py-2 last:pb-0'}>
            <Link to="/notices" className="group flex gap-2">
              <FileTextIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-blue" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[12.5px] text-mcaa-muted">{formatDate(notice.date)}</span>
                <span className="block text-[14px] leading-snug text-mcaa-text group-hover:text-mcaa-blue group-hover:underline">
                  {notice.title}
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>
    </Module>);

}