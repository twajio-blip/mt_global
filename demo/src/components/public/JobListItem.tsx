import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseIcon, Building2Icon, MapPinIcon, StampIcon, UsersIcon } from 'lucide-react';
import { CountryFlag } from '../CountryFlag';
import { BenefitTags } from './BenefitTags';
import type { Job } from '../../types/job';
import { formatRelativeDay } from '../../utils/format';

interface JobListItemProps {
  job: Job;
}

export function JobListItem({ job }: JobListItemProps) {
  return (
    <article className="group relative rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-200 ease-out hover:border-brand-200 hover:shadow-lift md:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="flex items-center gap-2 font-semibold text-brand-800">
              <CountryFlag country={job.country} />
              {job.country}
            </span>
            {job.location &&
            <span className="flex items-center gap-1 text-ink-500">
                <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
                {job.location}
              </span>
            }
          </div>

          <h2 className="mt-2 text-lg font-semibold leading-snug text-ink-900 md:text-xl">
            <Link
              to={`/jobs/${job.id}`}
              className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none group-hover:text-brand-800">
              
              {job.title}
            </Link>
          </h2>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-600">
            <span className="flex items-center gap-1.5">
              <Building2Icon className="h-4 w-4 text-ink-400" aria-hidden />
              {job.employer}
            </span>
            <span className="flex items-center gap-1.5">
              <BriefcaseIcon className="h-4 w-4 text-ink-400" aria-hidden />
              {job.designation}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {job.visaType &&
            <span className="flex items-center gap-1.5 rounded-md bg-brand-50 px-2 py-1 text-[13px] font-medium text-brand-800">
                <StampIcon className="h-3.5 w-3.5" aria-hidden />
                {job.visaType}
              </span>
            }
            <BenefitTags job={job} />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-line pt-4 md:w-56 md:flex-col md:items-end md:border-0 md:pt-0 md:text-right">
          <div>
            {job.salary ?
            <p className="text-base font-semibold text-accent-700">{job.salary}</p> :

            <p className="text-sm text-ink-500">Salary on request</p>
            }
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-700 md:justify-end">
              <UsersIcon className="h-4 w-4 text-ink-400" aria-hidden />
              {job.vacancies} vacancies
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[13px] text-ink-500">{formatRelativeDay(job.publishedAt)}</span>
            <span className="inline-flex h-10 items-center rounded-lg bg-brand-800 px-4 text-sm font-semibold text-white transition-colors duration-150 ease-out group-hover:bg-brand-900">
              View Details
            </span>
          </div>
        </div>
      </div>
    </article>);

}