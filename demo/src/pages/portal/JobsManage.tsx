import React, { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BriefcaseIcon, EyeIcon, PencilIcon, PlusIcon, PowerIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { CountryFlag } from '../../components/CountryFlag';
import { ConfirmDialog } from '../../components/portal/ConfirmDialog';
import { PageHeader } from '../../components/portal/PageHeader';
import { StatusBadge } from '../../components/portal/StatusBadge';
import { useData } from '../../contexts/DataContext';
import type { Job, JobStatus } from '../../types/job';
import { formatDate } from '../../utils/format';
import { buttonSmPrimary, iconButton, inputClass } from '../../utils/styles';

type Tab = 'All' | JobStatus;
const tabs: Tab[] = ['All', 'Published', 'Draft', 'Inactive'];
const tabLabel = (t: Tab) => t === 'Published' ? 'Active' : t;

export function JobsManage() {
  const { jobs, cvCounts, setJobStatus, deleteJob } = useData();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('All');
  const [search, setSearch] = useState('');
  const [toDelete, setToDelete] = useState<Job | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...jobs].
    filter((j) => tab === 'All' || j.status === tab).
    filter(
      (j) =>
      !q ||
      [j.title, j.country, j.designation, j.employer].some((v) => v.toLowerCase().includes(q))
    ).
    sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [jobs, tab, search]);

  const toggle = (job: Job) => {
    const next: JobStatus = job.status === 'Published' ? 'Inactive' : 'Published';
    setJobStatus(job.id, next);
    toast.success(next === 'Published' ? `“${job.title}” is now active` : `“${job.title}” deactivated`);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteJob(toDelete.id);
    toast.success(`“${toDelete.title}” deleted`);
    setToDelete(null);
  };
  const cancelDelete = useCallback(() => setToDelete(null), []);

  const actions = (job: Job) =>
  <div className="flex items-center justify-end gap-0.5">
      <button type="button" className={iconButton} title="View" aria-label={`View ${job.title}`} onClick={() => window.open(`/jobs/${job.id}`, '_blank')}>
        <EyeIcon className="h-4 w-4" />
      </button>
      <button type="button" className={iconButton} title="Edit" aria-label={`Edit ${job.title}`} onClick={() => navigate(`/portal/jobs/${job.id}/edit`)}>
        <PencilIcon className="h-4 w-4" />
      </button>
      <button
      type="button"
      className={`${iconButton} ${job.status === 'Published' ? 'text-accent-700' : ''}`}
      title={job.status === 'Published' ? 'Deactivate' : 'Activate'}
      aria-label={`${job.status === 'Published' ? 'Deactivate' : 'Activate'} ${job.title}`}
      onClick={() => toggle(job)}>
      
        <PowerIcon className="h-4 w-4" />
      </button>
      <button type="button" className={`${iconButton} hover:text-danger-600`} title="Delete" aria-label={`Delete ${job.title}`} onClick={() => setToDelete(job)}>
        <Trash2Icon className="h-4 w-4" />
      </button>
    </div>;


  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs"
        description="Publish, edit and manage your overseas job posts."
        actions={
        <Link to="/portal/jobs/new" className={buttonSmPrimary}>
            <PlusIcon className="h-4 w-4" aria-hidden /> Add New Job
          </Link>
        } />
      

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filter by status" className="no-scrollbar flex gap-1 overflow-x-auto rounded-lg bg-white p-1 ring-1 ring-line">
          {tabs.map((t) => {
            const count = t === 'All' ? jobs.length : jobs.filter((j) => j.status === t).length;
            const active = tab === t;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setTab(t)}
                className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition-colors duration-150 ease-out ${
                active ? 'bg-brand-800 text-white' : 'text-ink-600 hover:text-ink-900'}`
                }>
                
                {tabLabel(t)}
                <span className={`tabular-nums ${active ? 'text-brand-200' : 'text-ink-400'}`}>{count}</span>
              </button>);

          })}
        </div>
        <div className="relative md:w-80">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, country, employer"
            aria-label="Search jobs"
            className={`${inputClass} h-11 pl-10 text-sm`} />
          
        </div>
      </div>

      {filtered.length === 0 ?
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
          <BriefcaseIcon className="h-10 w-10 text-ink-400" aria-hidden />
          <p className="mt-4 font-semibold text-ink-900">No jobs found</p>
          <p className="mt-1 text-sm text-ink-600">Try a different status or search term.</p>
        </div> :

      <>
          <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white md:block">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-line bg-surface text-[13px] text-ink-500">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Job Title</th>
                  <th scope="col" className="px-4 py-3 font-medium">Country</th>
                  <th scope="col" className="px-4 py-3 font-medium">Designation</th>
                  <th scope="col" className="px-4 py-3 font-medium">Employer</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Vacancy</th>
                  <th scope="col" className="px-4 py-3 font-medium">Published</th>
                  <th scope="col" className="px-4 py-3 font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">CVs</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((job) =>
              <tr key={job.id} className="hover:bg-surface/60">
                    <td className="px-4 py-3.5 font-medium text-ink-900">
                      <Link to={`/portal/jobs/${job.id}/edit`} className="hover:text-brand-800">{job.title}</Link>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-2 whitespace-nowrap text-ink-700">
                        <CountryFlag country={job.country} /> {job.country}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-ink-700">{job.designation}</td>
                    <td className="max-w-[180px] truncate px-4 py-3.5 text-ink-700" title={job.employer}>{job.employer}</td>
                    <td className="px-4 py-3.5 text-right tabular-nums text-ink-900">{job.vacancies}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-ink-600">{formatDate(job.publishedAt)}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={job.status} /></td>
                    <td className="px-4 py-3.5 text-right">
                      <Link to={`/portal/cvs?jobId=${job.id}`} className="font-semibold tabular-nums text-brand-800 hover:underline">
                        {cvCounts[job.id] ?? 0}
                      </Link>
                    </td>
                    <td className="px-2 py-2">{actions(job)}</td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {filtered.map((job) =>
          <li key={job.id} className="rounded-xl border border-line bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900">{job.title}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-500">
                      <CountryFlag country={job.country} /> {job.country} · {job.vacancies} vacancies
                    </p>
                  </div>
                  <StatusBadge status={job.status} />
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <Link to={`/portal/cvs?jobId=${job.id}`} className="text-sm font-semibold text-brand-800">
                    {cvCounts[job.id] ?? 0} CVs received
                  </Link>
                  {actions(job)}
                </div>
              </li>
          )}
          </ul>
        </>
      }

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this job?"
        description={`“${toDelete?.title ?? ''}” will be removed from the website. CVs already received stay in your CV list.`}
        confirmLabel="Delete Job"
        onConfirm={confirmDelete}
        onCancel={cancelDelete} />
      
    </div>);

}