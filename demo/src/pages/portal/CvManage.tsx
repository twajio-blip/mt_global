import React, { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BriefcaseIcon, DownloadIcon, ExternalLinkIcon, EyeIcon, FileTextIcon, InboxIcon, SearchIcon, XIcon } from 'lucide-react';
import { CountryFlag } from '../../components/CountryFlag';
import { ApplicantDrawer } from '../../components/portal/ApplicantDrawer';
import { PageHeader } from '../../components/portal/PageHeader';
import { SelectField } from '../../components/ui/SelectField';
import { useData } from '../../contexts/DataContext';
import type { Application } from '../../types/application';
import { downloadCv, fileExtension, openCv } from '../../utils/cv';
import { formatDate } from '../../utils/format';
import { iconButton, inputClass } from '../../utils/styles';

export function CvManage() {
  const { applications, jobs } = useData();
  const [params, setParams] = useSearchParams();
  const jobId = params.get('jobId') ?? '';
  const [country, setCountry] = useState('');
  const [designation, setDesignation] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Application | null>(null);

  const countryOptions = useMemo(
    () => Array.from(new Set(applications.map((a) => a.country))).sort().map((c) => ({ value: c, label: c })),
    [applications]
  );
  const designationOptions = useMemo(
    () => Array.from(new Set(applications.map((a) => a.designation))).sort().map((d) => ({ value: d, label: d })),
    [applications]
  );
  const jobFilter = jobs.find((j) => j.id === jobId);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...applications].
    filter((a) => !jobId || a.jobId === jobId).
    filter((a) => !country || a.country === country).
    filter((a) => !designation || a.designation === designation).
    filter((a) => !q || a.fullName.toLowerCase().includes(q) || a.jobTitle.toLowerCase().includes(q)).
    sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  }, [applications, jobId, country, designation, search]);

  const hasFilters = Boolean(jobId || country || designation || search);
  const clearAll = () => {
    setCountry('');
    setDesignation('');
    setSearch('');
    setParams(new URLSearchParams(), { replace: true });
  };
  const closeDrawer = useCallback(() => setSelected(null), []);

  const actions = (app: Application) =>
  <div className="flex items-center justify-end gap-0.5">
      <button type="button" className={iconButton} title="View Applicant" aria-label={`View ${app.fullName}`} onClick={() => setSelected(app)}>
        <EyeIcon className="h-4 w-4" />
      </button>
      <button type="button" className={iconButton} title="Open CV" aria-label={`Open CV of ${app.fullName}`} onClick={() => openCv(app)}>
        <ExternalLinkIcon className="h-4 w-4" />
      </button>
      <button type="button" className={iconButton} title="Download CV" aria-label={`Download CV of ${app.fullName}`} onClick={() => downloadCv(app)}>
        <DownloadIcon className="h-4 w-4" />
      </button>
      <button type="button" className={iconButton} title="View Related Job" aria-label={`View job ${app.jobTitle}`} onClick={() => window.open(`/jobs/${app.jobId}`, '_blank')}>
        <BriefcaseIcon className="h-4 w-4" />
      </button>
    </div>;


  return (
    <div className="space-y-6">
      <PageHeader title="CVs" description={`${applications.length} CVs received from job seekers.`} />

      <div className="rounded-2xl border border-line bg-white p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.3fr]">
          <SelectField id="cv-country" ariaLabel="Filter by country" value={country} onChange={setCountry} placeholder="All Countries" options={countryOptions} />
          <SelectField id="cv-designation" ariaLabel="Filter by designation" value={designation} onChange={setDesignation} placeholder="All Designations" options={designationOptions} />
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search applicant name or job title"
              aria-label="Search CVs"
              className={`${inputClass} pl-10`} />
            
          </div>
        </div>
        {(jobFilter || hasFilters) &&
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            {jobFilter &&
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 py-1 pl-3 pr-1 font-medium text-brand-800">
                Job: {jobFilter.title}
                <button
              type="button"
              aria-label="Remove job filter"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-brand-100">
              
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </span>
          }
            <span className="text-ink-600" aria-live="polite">{filtered.length} results</span>
            <button type="button" onClick={clearAll} className="font-semibold text-brand-800 hover:text-brand-600">
              Clear filters
            </button>
          </div>
        }
      </div>

      {filtered.length === 0 ?
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
          <InboxIcon className="h-10 w-10 text-ink-400" aria-hidden />
          <p className="mt-4 font-semibold text-ink-900">No CVs match these filters</p>
          <p className="mt-1 text-sm text-ink-600">Try another country or designation.</p>
        </div> :

      <>
          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white md:block">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-line bg-surface text-[13px] text-ink-500">
                <tr>
                  {['Applicant Name', 'Phone', 'Email', 'Job Title', 'Country', 'Designation', 'Submitted', 'CV'].map((h) =>
                <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>
                )}
                  <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((app) =>
              <tr key={app.id} className="hover:bg-surface/60">
                    <td className="px-4 py-3.5">
                      <button type="button" onClick={() => setSelected(app)} className="text-left font-medium text-ink-900 hover:text-brand-800">
                        {app.fullName}
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-ink-700">{app.phone}</td>
                    <td className="max-w-[190px] truncate px-4 py-3.5 text-ink-700" title={app.email}>{app.email}</td>
                    <td className="max-w-[180px] truncate px-4 py-3.5 text-ink-900" title={app.jobTitle}>{app.jobTitle}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-2 whitespace-nowrap text-ink-700">
                        <CountryFlag country={app.country} /> {app.country}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-700">{app.designation}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-ink-600">{formatDate(app.submittedAt)}</td>
                    <td className="px-4 py-3.5">
                      <button
                    type="button"
                    onClick={() => openCv(app)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[12px] font-semibold text-brand-800 ring-1 ring-line hover:ring-brand-200">
                    
                        <FileTextIcon className="h-3.5 w-3.5" aria-hidden />
                        {fileExtension(app.cvFileName)}
                      </button>
                    </td>
                    <td className="px-2 py-2">{actions(app)}</td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {filtered.map((app) =>
          <li key={app.id} className="rounded-xl border border-line bg-white p-4">
                <button type="button" onClick={() => setSelected(app)} className="block w-full text-left">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-ink-900">{app.fullName}</p>
                    <span className="shrink-0 text-[13px] text-ink-500">{formatDate(app.submittedAt)}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-700">{app.jobTitle}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-500">
                    <CountryFlag country={app.country} /> {app.country} · {app.designation}
                  </p>
                  <p className="mt-1 text-[13px] text-ink-500">{app.phone}</p>
                </button>
                <div className="mt-3 flex justify-end border-t border-line pt-2">{actions(app)}</div>
              </li>
          )}
          </ul>
        </>
      }

      <ApplicantDrawer application={selected} onClose={closeDrawer} />
    </div>);

}