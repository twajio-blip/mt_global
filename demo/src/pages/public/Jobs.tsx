import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon, SearchXIcon, XIcon } from 'lucide-react';
import { CountryFlag } from '../../components/CountryFlag';
import { JobListItem } from '../../components/public/JobListItem';
import { SelectField } from '../../components/ui/SelectField';
import { useData } from '../../contexts/DataContext';
import { getPublishedJobs, summarizeByCountry, summarizeByDesignation } from '../../utils/jobs';
import { buttonSecondary, inputClass, pageContainer } from '../../utils/styles';

export function Jobs() {
  const { jobs } = useData();
  const [params, setParams] = useSearchParams();
  const country = params.get('country') ?? '';
  const designation = params.get('designation') ?? '';
  const query = params.get('q') ?? '';

  const published = useMemo(() => getPublishedJobs(jobs), [jobs]);
  const countrySummaries = useMemo(() => summarizeByCountry(published), [published]);
  const designationSummaries = useMemo(() => summarizeByDesignation(published), [published]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return published.filter(
      (job) =>
      (!country || job.country === country) && (
      !designation || job.designation === designation) && (
      !q || job.title.toLowerCase().includes(q) || job.designation.toLowerCase().includes(q))
    );
  }, [published, country, designation, query]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);else
    next.delete(key);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });
  const hasFilters = Boolean(country || designation || query);

  const summaryLine = [designation, country ? `in ${country}` : ''].filter(Boolean).join(' ');

  return (
    <div className="bg-surface pb-20">
      <section className="bg-brand-900 pb-24 pt-10 md:pb-28 md:pt-14" aria-labelledby="jobs-title">
        <div className={pageContainer}>
          <h1 id="jobs-title" className="text-3xl font-bold tracking-tight text-white md:text-[40px]">
            Available Overseas Jobs
          </h1>
          <p className="mt-3 max-w-2xl text-base text-brand-100 md:text-lg">
            Explore current manpower requirements and employment opportunities by country and profession.
          </p>
        </div>
      </section>

      <div className={`${pageContainer} -mt-16 md:-mt-20`}>
        <div className="rounded-2xl bg-white p-4 shadow-lift sm:p-5" role="search" aria-label="Filter jobs">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr]">
            <div>
              <label htmlFor="filter-country" className="mb-1.5 block text-sm font-semibold text-ink-900">
                Country
              </label>
              <SelectField
                id="filter-country"
                size="lg"
                value={country}
                onChange={(v) => updateParam('country', v)}
                placeholder="All Countries"
                options={countrySummaries.map((c) => ({ value: c.country, label: `${c.country} (${c.jobs})` }))} />
              
            </div>
            <div>
              <label htmlFor="filter-designation" className="mb-1.5 block text-sm font-semibold text-ink-900">
                Designation
              </label>
              <SelectField
                id="filter-designation"
                size="lg"
                value={designation}
                onChange={(v) => updateParam('designation', v)}
                placeholder="All Designations"
                options={designationSummaries.map((d) => ({ value: d.designation, label: d.designation }))} />
              
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label htmlFor="filter-q" className="mb-1.5 block text-sm font-semibold text-ink-900">
                Search by Job Title
              </label>
              <div className="relative">
                <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden />
                <input
                  id="filter-q"
                  type="search"
                  value={query}
                  onChange={(e) => updateParam('q', e.target.value)}
                  placeholder="e.g. Welder, Driver, Chef"
                  className={`${inputClass} h-14 pl-11 text-base`} />
                
              </div>
            </div>
          </div>
        </div>

        <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" aria-label="Quick country filters">
          <button
            type="button"
            onClick={() => updateParam('country', '')}
            aria-pressed={!country}
            className={`flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 ease-out ${
            !country ? 'border-brand-800 bg-brand-800 text-white' : 'border-line bg-white text-ink-900 hover:border-brand-300'}`
            }>
            
            All
          </button>
          {countrySummaries.map((c) => {
            const active = country === c.country;
            return (
              <button
                key={c.country}
                type="button"
                aria-pressed={active}
                onClick={() => updateParam('country', active ? '' : c.country)}
                className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 ease-out ${
                active ? 'border-brand-800 bg-brand-800 text-white' : 'border-line bg-white text-ink-900 hover:border-brand-300'}`
                }>
                
                <CountryFlag country={c.country} />
                {c.country}
                <span className={active ? 'text-brand-200' : 'text-ink-500'}>{c.jobs}</span>
              </button>);

          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[15px] text-ink-700" aria-live="polite">
            <span className="font-semibold text-ink-900">{filtered.length}</span> {filtered.length === 1 ? 'job' : 'jobs'} found
            {summaryLine && <span> for {summaryLine}</span>}
            {query && <span> matching “{query}”</span>}
          </p>
          {hasFilters &&
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:text-brand-600">
            
              <XIcon className="h-4 w-4" aria-hidden />
              Clear filters
            </button>
          }
        </div>

        {filtered.length > 0 ?
        <ul className="mt-4 space-y-3">
            {filtered.map((job) =>
          <li key={job.id}>
                <JobListItem job={job} />
              </li>
          )}
          </ul> :

        <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
            <SearchXIcon className="h-10 w-10 text-ink-400" aria-hidden />
            <h2 className="mt-4 text-lg font-semibold text-ink-900">No jobs match these filters</h2>
            <p className="mt-2 max-w-sm text-[15px] text-ink-600">
              Try another country or designation. New requirements are published every week.
            </p>
            <button type="button" onClick={clearAll} className={`${buttonSecondary} mt-6`}>
              Show all jobs
            </button>
          </div>
        }
      </div>
    </div>);

}