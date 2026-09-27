import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangleIcon,
  BriefcaseIcon,
  Building2Icon,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  StampIcon,
  UploadIcon,
  UsersIcon } from
'lucide-react';
import { CountryFlag } from '../../components/CountryFlag';
import { ApplyForm } from '../../components/jobDetails/ApplyForm';
import { JobSummary } from '../../components/jobDetails/JobSummary';
import { MobileApplyBar } from '../../components/jobDetails/MobileApplyBar';
import { ShareJobButton } from '../../components/jobDetails/ShareJobButton';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatDate } from '../../utils/format';
import { getPublishedJobs } from '../../utils/jobs';
import { buttonPrimary, buttonSecondary, pageContainer } from '../../utils/styles';

export function JobDetails() {
  const { jobId } = useParams();
  const { jobs } = useData();
  const { user } = useAuth();
  const job = jobs.find((j) => j.id === jobId);

  const related = useMemo(
    () => job ? getPublishedJobs(jobs).filter((j) => j.country === job.country && j.id !== job.id).slice(0, 3) : [],
    [jobs, job]
  );

  if (!job || job.status !== 'Published' && !user) {
    return (
      <div className={`${pageContainer} flex flex-col items-center py-24 text-center`}>
        <BriefcaseIcon className="h-10 w-10 text-ink-400" aria-hidden />
        <h1 className="mt-4 text-2xl font-bold text-ink-900">This job is no longer available</h1>
        <p className="mt-2 max-w-md text-[15px] text-ink-600">
          The position may have been filled or closed. Browse our current overseas openings instead.
        </p>
        <Link to="/jobs" className={`${buttonPrimary} mt-6`}>
          Browse Jobs
        </Link>
      </div>);

  }

  const contentSections = [
  { id: 'description', title: 'Job Description', html: job.description },
  { id: 'responsibilities', title: 'Responsibilities', html: job.responsibilities },
  { id: 'requirements', title: 'Candidate Requirements', html: job.requirements },
  { id: 'additional', title: 'Additional Information', html: job.additionalInfo }].
  filter((s) => Boolean(s.html));

  return (
    <div className="bg-surface pb-28 lg:pb-20">
      {job.status !== 'Published' &&
      <div className="bg-warn-100 text-warn-700">
          <p className={`${pageContainer} flex items-center gap-2 py-2.5 text-sm font-medium`}>
            <AlertTriangleIcon className="h-4 w-4" aria-hidden />
            Preview only — this job is {job.status.toLowerCase()} and not visible to job seekers.
          </p>
        </div>
      }

      <section className="border-b border-line bg-white">
        <div className={`${pageContainer} py-6 md:py-10`}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
            <Link to="/jobs" className="hover:text-brand-800">Jobs</Link>
            <ChevronRightIcon className="h-4 w-4" aria-hidden />
            <Link to={`/jobs?country=${encodeURIComponent(job.country)}`} className="hover:text-brand-800">
              {job.country}
            </Link>
            <ChevronRightIcon className="h-4 w-4" aria-hidden />
            <span className="truncate text-ink-700" aria-current="page">{job.title}</span>
          </nav>

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-brand-800">
                <CountryFlag country={job.country} size="md" />
                {job.country}
                {job.location && <span className="font-normal text-ink-500">· {job.location}</span>}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[40px]">{job.title}</h1>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ink-600">
                <span className="flex items-center gap-1.5">
                  <Building2Icon className="h-4 w-4 text-ink-400" aria-hidden /> {job.employer}
                </span>
                <span className="flex items-center gap-1.5">
                  <BriefcaseIcon className="h-4 w-4 text-ink-400" aria-hidden /> {job.designation}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-ink-400" aria-hidden /> Published {formatDate(job.publishedAt)}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <ShareJobButton title={job.title} className={`${buttonSecondary} px-4`} />
              <a href="#apply" className={`${buttonPrimary} flex-1 px-7 lg:flex-none`}>
                <UploadIcon className="h-4 w-4" aria-hidden />
                Submit Your CV
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={`${pageContainer} mt-6 grid gap-6 md:mt-8 lg:grid-cols-12 lg:gap-8`}>
        <div className="space-y-6 lg:col-span-8">
          <JobSummary job={job} />

          {contentSections.length > 0 &&
          <div className="divide-y divide-line rounded-2xl border border-line bg-white">
              {contentSections.map((section) =>
            <section key={section.id} aria-labelledby={`sec-${section.id}`} className="px-5 py-6 md:px-6">
                  <h2 id={`sec-${section.id}`} className="text-lg font-semibold text-ink-900">
                    {section.title}
                  </h2>
                  <div className="rich-content mt-3" dangerouslySetInnerHTML={{ __html: section.html ?? '' }} />
                </section>
            )}
            </div>
          }

          {job.visaType &&
          <section aria-labelledby="visa-title" className="rounded-2xl border border-line bg-white px-5 py-6 md:px-6">
              <h2 id="visa-title" className="flex items-center gap-2 text-lg font-semibold text-ink-900">
                <StampIcon className="h-5 w-5 text-brand-800" aria-hidden />
                Visa Information
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-[13px] text-ink-500">Visa Type</dt>
                  <dd className="mt-1 text-[15px] font-medium text-ink-900">{job.visaType}</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-ink-500">Country</dt>
                  <dd className="mt-1 flex items-center gap-2 text-[15px] font-medium text-ink-900">
                    <CountryFlag country={job.country} /> {job.country}
                  </dd>
                </div>
                {job.contractDuration &&
              <div>
                    <dt className="text-[13px] text-ink-500">Contract Duration</dt>
                    <dd className="mt-1 text-[15px] font-medium text-ink-900">{job.contractDuration}</dd>
                  </div>
              }
              </dl>
              {job.visaInfo && <div className="rich-content mt-4" dangerouslySetInnerHTML={{ __html: job.visaInfo }} />}
              <p className="mt-4 text-[13px] text-ink-500">
                Visa approval is decided by the destination country’s authorities and is not guaranteed.
              </p>
            </section>
          }

          <ApplyForm job={job} />
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="hidden rounded-2xl border border-line bg-white p-6 lg:block">
              <p className="text-[13px] text-ink-500">Salary</p>
              <p className="mt-1 text-2xl font-bold text-accent-700">{job.salary ?? 'On request'}</p>
              <ul className="mt-5 space-y-3 border-t border-line pt-5 text-[15px] text-ink-700">
                <li className="flex items-center gap-2.5">
                  <UsersIcon className="h-4 w-4 text-ink-400" aria-hidden /> {job.vacancies} vacancies
                </li>
                {job.contractDuration &&
                <li className="flex items-center gap-2.5">
                    <ClockIcon className="h-4 w-4 text-ink-400" aria-hidden /> {job.contractDuration}
                  </li>
                }
                {job.deadline &&
                <li className="flex items-center gap-2.5">
                    <CalendarIcon className="h-4 w-4 text-ink-400" aria-hidden /> Apply by {formatDate(job.deadline)}
                  </li>
                }
              </ul>
              <a href="#apply" className={`${buttonPrimary} mt-6 w-full`}>
                <UploadIcon className="h-4 w-4" aria-hidden />
                Submit Your CV
              </a>
              <p className="mt-3 text-center text-[13px] text-ink-500">Takes about 2 minutes with your existing CV</p>
            </div>

            {related.length > 0 &&
            <div className="rounded-2xl border border-line bg-white p-6">
                <h2 className="text-base font-semibold text-ink-900">More jobs in {job.country}</h2>
                <ul className="mt-3 divide-y divide-line">
                  {related.map((r) =>
                <li key={r.id}>
                      <Link to={`/jobs/${r.id}`} className="group block py-3">
                        <p className="font-medium text-ink-900 group-hover:text-brand-800">{r.title}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-ink-500">
                          <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
                          {r.location ?? r.country} · {r.vacancies} vacancies
                        </p>
                      </Link>
                    </li>
                )}
                </ul>
              </div>
            }
          </div>
        </aside>
      </div>

      <MobileApplyBar salary={job.salary} vacancies={job.vacancies} />
    </div>);

}