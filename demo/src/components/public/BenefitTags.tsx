import React from 'react';
import { CheckIcon } from 'lucide-react';
import type { Job } from '../../types/job';
import { benefitLabels, getActiveBenefits } from '../../utils/jobs';

interface BenefitTagsProps {
  job: Job;
  limit?: number;
}

export function BenefitTags({ job, limit = 3 }: BenefitTagsProps) {
  const active = getActiveBenefits(job).filter((k) => k === 'accommodation' || k === 'food' || k === 'airTicket');
  if (active.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Facilities provided">
      {active.slice(0, limit).map((key) =>
      <li key={key} className="flex items-center gap-1 text-[13px] text-accent-700">
          <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
          {benefitLabels[key]}
        </li>
      )}
    </ul>);

}