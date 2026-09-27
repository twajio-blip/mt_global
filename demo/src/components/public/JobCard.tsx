import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, StampIcon } from 'lucide-react';
import { CountryFlag } from '../CountryFlag';
import type { Job } from '../../types/job';
import { formatRelativeDay } from '../../utils/format';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-200 ease-out hover:border-brand-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100">
      
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-brand-800">
          <CountryFlag country={job.country} />
          {job.country}
        </span>
        <span className="text-[13px] text-ink-500">{formatRelativeDay(job.publishedAt)}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-ink-900 group-hover:text-brand-800">{job.title}</h3>
      <p className="mt-1 text-sm text-ink-500">{job.employer}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-[13px] text-ink-500">Designation</dt>
          <dd className="mt-0.5 font-medium text-ink-900">{job.designation}</dd>
        </div>
        <div>
          <dt className="text-[13px] text-ink-500">Vacancy</dt>
          <dd className="mt-0.5 font-medium text-ink-900">{job.vacancies} positions</dd>
        </div>
        {job.salary &&
        <div className="col-span-2">
            <dt className="text-[13px] text-ink-500">Salary</dt>
            <dd className="mt-0.5 font-semibold text-accent-700">{job.salary}</dd>
          </div>
        }
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        {job.visaType ?
        <span className="flex min-w-0 items-center gap-1.5 text-[13px] text-ink-600">
            <StampIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">{job.visaType}</span>
          </span> :

        <span />
        }
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-800">
          View Details
          <ArrowRightIcon
            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden />
          
        </span>
      </div>
    </Link>);

}