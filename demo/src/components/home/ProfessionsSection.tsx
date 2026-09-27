import React from 'react';
import { Link } from 'react-router-dom';
import type { DesignationSummary } from '../../utils/jobs';
import { groupDesignationsBySector } from '../../utils/jobs';
import { pageContainer } from '../../utils/styles';

interface ProfessionsSectionProps {
  summaries: DesignationSummary[];
}

export function ProfessionsSection({ summaries }: ProfessionsSectionProps) {
  const groups = groupDesignationsBySector(summaries);

  return (
    <section className="bg-surface py-16 lg:py-24" aria-labelledby="professions-title">
      <div className={pageContainer}>
        <h2 id="professions-title" className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
          Jobs by Profession
        </h2>
        <p className="mt-3 max-w-xl text-base text-ink-600">
          Pick your trade or profession to see matching openings in every country.
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) =>
          <div key={group.sector}>
              <h3 className="border-b border-line pb-3 text-sm font-semibold text-ink-500">{group.sector}</h3>
              <ul className="mt-2">
                {group.items.map((item) =>
              <li key={item.designation}>
                    <Link
                  to={`/jobs?designation=${encodeURIComponent(item.designation)}`}
                  className="-mx-3 flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 text-[15px] font-medium text-ink-900 transition-colors duration-150 ease-out hover:bg-white hover:text-brand-800">
                  
                      {item.designation}
                      <span className="min-w-[28px] rounded-md bg-white px-2 py-0.5 text-center text-[13px] font-semibold tabular-nums text-brand-800 ring-1 ring-line">
                        {item.jobs}
                      </span>
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>);

}