import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import type { Job } from '../../types/job';
import { formatDate } from '../../utils/format';
import { benefitLabels, getActiveBenefits } from '../../utils/jobs';

interface JobSummaryProps {
  job: Job;
}

export function JobSummary({ job }: JobSummaryProps) {
  const fields: [string, string | undefined][] = [
  ['Country', job.country],
  ['Job Location', job.location],
  ['Designation', job.designation],
  ['Employer / Company', job.employer],
  ['Number of Vacancies', `${job.vacancies}`],
  ['Salary', job.salary],
  ['Employment Type', job.employmentType],
  ['Contract Duration', job.contractDuration],
  ['Working Hours', job.workingHours],
  ['Overtime', job.overtime],
  ['Experience', job.experience],
  ['Education', job.education],
  ['Age', job.age],
  ['Gender', job.gender],
  ['Application Deadline', job.deadline ? formatDate(job.deadline) : undefined]];

  const visible = fields.filter(([, value]) => Boolean(value));
  const benefits = getActiveBenefits(job);

  return (
    <section aria-labelledby="summary-title" className="rounded-2xl border border-line bg-white">
      <h2 id="summary-title" className="border-b border-line px-5 py-4 text-lg font-semibold text-ink-900 md:px-6">
        Job Summary
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-5 md:grid-cols-3 md:px-6">
        {visible.map(([label, value]) =>
        <div key={label}>
            <dt className="text-[13px] text-ink-500">{label}</dt>
            <dd className={`mt-1 text-[15px] font-medium ${label === 'Salary' ? 'text-accent-700' : 'text-ink-900'}`}>
              {value}
            </dd>
          </div>
        )}
      </dl>

      {benefits.length > 0 &&
      <div className="border-t border-line px-5 py-5 md:px-6">
          <h3 className="text-sm font-semibold text-ink-900">Facilities provided by employer</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {benefits.map((key) =>
          <li
            key={key}
            className="flex items-center gap-1.5 rounded-lg bg-accent-50 px-3 py-2 text-sm font-medium text-accent-700">
            
                <CheckCircle2Icon className="h-4 w-4" aria-hidden />
                {benefitLabels[key]}
              </li>
          )}
          </ul>
        </div>
      }
    </section>);

}