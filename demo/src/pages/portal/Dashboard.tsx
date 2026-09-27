import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import { CountryFlag } from '../../components/CountryFlag';
import { PageHeader } from '../../components/portal/PageHeader';
import { StatusBadge } from '../../components/portal/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { formatRelativeDay, initials, isWithinDays } from '../../utils/format';
import { buttonSmPrimary } from '../../utils/styles';

export function Dashboard() {
  const { jobs, applications, cvCounts } = useData();
  const { user } = useAuth();

  const stats = useMemo(() => {
    const active = jobs.filter((j) => j.status === 'Published');
    const drafts = jobs.filter((j) => j.status === 'Draft').length;
    const inactive = jobs.filter((j) => j.status === 'Inactive').length;
    const recent = applications.filter((a) => isWithinDays(a.submittedAt, 7)).length;
    const jobsWithCvs = Object.keys(cvCounts).length;
    return [
    { label: 'Active Jobs', value: active.length, note: `${active.reduce((s, j) => s + j.vacancies, 0)} open vacancies`, to: '/portal/jobs' },
    { label: 'Total Jobs', value: jobs.length, note: `${drafts} draft · ${inactive} inactive`, to: '/portal/jobs' },
    { label: 'CVs Received', value: applications.length, note: `Across ${jobsWithCvs} jobs`, to: '/portal/cvs' },
    { label: 'Recent CVs', value: recent, note: 'Last 7 days', to: '/portal/cvs' }];

  }, [jobs, applications, cvCounts]);

  const recentCvs = useMemo(
    () => [...applications].sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)).slice(0, 7),
    [applications]
  );
  const recentJobs = useMemo(
    () => [...jobs].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6),
    [jobs]
  );
  const maxCvs = Math.max(1, ...recentJobs.map((j) => cvCounts[j.id] ?? 0));

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${user ? `, ${user.name.split(' ')[0]}` : ''}`}
        description="Here’s how your published jobs are performing."
        actions={
        <Link to="/portal/jobs/new" className={buttonSmPrimary}>
            <PlusIcon className="h-4 w-4" aria-hidden /> Add New Job
          </Link>
        } />
      

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((s) =>
        <li key={s.label}>
            <Link
            to={s.to}
            className="block h-full rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-200 hover:shadow-card">
            
              <p className="text-sm font-medium text-ink-600">{s.label}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-ink-900">{s.value}</p>
              <p className="mt-1 text-[13px] text-ink-500">{s.note}</p>
            </Link>
          </li>
        )}
      </ul>

      <div className="grid gap-6 xl:grid-cols-5">
        <section aria-labelledby="recent-cvs" className="rounded-2xl border border-line bg-white xl:col-span-3">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 id="recent-cvs" className="text-base font-semibold text-ink-900">Recent CV Submissions</h2>
            <Link to="/portal/cvs" className="flex items-center gap-1 text-sm font-semibold text-brand-800 hover:text-brand-600">
              View all <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {recentCvs.map((app) =>
            <li key={app.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-brand-800">
                  {initials(app.fullName)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium text-ink-900">{app.fullName}</p>
                  <p className="flex items-center gap-1.5 truncate text-[13px] text-ink-500">
                    <CountryFlag country={app.country} />
                    <span className="truncate">{app.jobTitle}</span>
                  </p>
                </div>
                <span className="shrink-0 text-[13px] text-ink-500">{formatRelativeDay(app.submittedAt)}</span>
              </li>
            )}
          </ul>
        </section>

        <section aria-labelledby="recent-jobs" className="rounded-2xl border border-line bg-white xl:col-span-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 id="recent-jobs" className="text-base font-semibold text-ink-900">Recent Job Posts</h2>
            <Link to="/portal/jobs" className="flex items-center gap-1 text-sm font-semibold text-brand-800 hover:text-brand-600">
              All jobs <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {recentJobs.map((job) => {
              const count = cvCounts[job.id] ?? 0;
              return (
                <li key={job.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link to={`/portal/jobs/${job.id}/edit`} className="block truncate text-[15px] font-medium text-ink-900 hover:text-brand-800">
                        {job.title}
                      </Link>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-ink-500">
                        <CountryFlag country={job.country} /> {job.country}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface" aria-hidden>
                      <div className="h-full rounded-full bg-brand-600" style={{ width: `${count / maxCvs * 100}%` }} />
                    </div>
                    <Link
                      to={`/portal/cvs?jobId=${job.id}`}
                      className="w-14 shrink-0 text-right text-[13px] font-semibold tabular-nums text-ink-700 hover:text-brand-800">
                      
                      {count} {count === 1 ? 'CV' : 'CVs'}
                    </Link>
                  </div>
                </li>);

            })}
          </ul>
        </section>
      </div>
    </div>);

}