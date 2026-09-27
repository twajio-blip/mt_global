import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { CountryFlag } from '../CountryFlag';
import type { CountrySummary } from '../../utils/jobs';
import { pageContainer } from '../../utils/styles';

interface DestinationsSectionProps {
  summaries: CountrySummary[];
}

export function DestinationsSection({ summaries }: DestinationsSectionProps) {
  const featured = summaries.slice(0, 6);
  const others = summaries.slice(6);

  return (
    <section className="py-16 lg:py-24" aria-labelledby="destinations-title">
      <div className={pageContainer}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="destinations-title" className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
              Popular Job Destinations
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-600">
              Choose a country to see every open manpower requirement there.
            </p>
          </div>
          <Link to="/jobs" className="flex items-center gap-1.5 text-[15px] font-semibold text-brand-800 hover:text-brand-600">
            All destinations <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {featured.map((c) =>
          <li key={c.country}>
              <Link
              to={`/jobs?country=${encodeURIComponent(c.country)}`}
              className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100">
              
                <CountryFlag country={c.country} size="lg" />
                <span className="mt-5 text-lg font-bold text-ink-900">{c.country}</span>
                <span className="mt-1 text-[15px] font-semibold text-accent-700">
                  {c.jobs} Available {c.jobs === 1 ? 'Job' : 'Jobs'}
                </span>
                <span className="mt-auto flex items-center justify-between pt-4 text-[13px] text-ink-500">
                  {c.vacancies} vacancies
                  <ArrowRightIcon
                  className="h-4 w-4 text-brand-800 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  aria-hidden />
                
                </span>
              </Link>
            </li>
          )}
        </ul>

        {others.length > 0 &&
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-ink-500">Also hiring in</span>
            {others.map((c) =>
          <Link
            key={c.country}
            to={`/jobs?country=${encodeURIComponent(c.country)}`}
            className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-medium text-ink-900 transition-colors duration-150 ease-out hover:border-brand-300 hover:text-brand-800">
            
                <CountryFlag country={c.country} />
                {c.country}
                <span className="text-ink-500">{c.jobs}</span>
              </Link>
          )}
          </div>
        }
      </div>
    </section>);

}