import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    BriefcaseIcon,
    PlusIcon,
    SearchIcon,
    PencilIcon,
    Trash2Icon,
    EyeIcon,
    PowerIcon,
} from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { PageHeader } from '../../../Components/PageHeader';
import { CountryFlag } from '../../../Components/CountryFlag';
import { StatusBadge } from '../../../Components/StatusBadge';
import { Pagination, PaginationLink } from '../../../Components/Pagination';
import { formatDate } from '../../../utils/format';
import { buttonSmPrimary, iconButton, inputClass } from '../../../utils/styles';

interface JobItem {
    id: number;
    title_en: string;
    title_bn?: string;
    prefix: string;
    serial_number: number;
    job_code: string;
    employer_name: string;
    location?: string;
    vacancy?: number;
    salary?: string;
    contract_duration?: string;
    interview_date?: string;
    interview_type: string;
    status: string;
    created_at: string;
    country?: { id: number; name: string; code?: string };
    designation?: { id: number; name: string };
    applications_count: number;
}

interface Props {
    jobs: {
        data: JobItem[];
        current_page: number;
        last_page: number;
        total: number;
        from?: number | null;
        to?: number | null;
        links?: PaginationLink[];
    };
    countries: { id: number; name: string }[];
    designations: { id: number; name: string }[];
    filters: {
        search?: string;
        country_id?: string;
        status?: string;
    };
}

type Tab = 'All' | 'Published' | 'Draft' | 'Inactive';
const tabs: Tab[] = ['All', 'Published', 'Draft', 'Inactive'];
const tabLabel = (t: Tab) => (t === 'Published' ? 'Active' : t);

export default function JobsIndex({ jobs, countries, designations, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const currentTab = (filters.status as Tab) || 'All';

    const handleTabChange = (t: Tab) => {
        const nextStatus = t === 'All' ? '' : t;
        router.get(
            '/portal/jobs',
            {
                search,
                country_id: filters.country_id,
                status: nextStatus,
            },
            { preserveState: true, replace: true }
        );
    };

    const handleSearchChange = (q: string) => {
        setSearch(q);
        router.get(
            '/portal/jobs',
            {
                search: q,
                country_id: filters.country_id,
                status: filters.status,
            },
            { preserveState: true, replace: true }
        );
    };

    const toggleStatus = (job: JobItem) => {
        const next = job.status === 'Published' ? 'Inactive' : 'Published';
        router.patch(`/portal/jobs/${job.id}/status`, { status: next }, { preserveScroll: true });
    };

    const handleDelete = (job: JobItem) => {
        if (confirm(`Are you sure you want to delete “${job.title_en}” (${job.job_code})?`)) {
            router.delete(`/portal/jobs/${job.id}`);
        }
    };

    const jobList = jobs.data || [];

    return (
        <PortalLayout>
            <Head title="Jobs Management" />

            <div className="space-y-6">
                <PageHeader
                    title="Jobs"
                    description="Publish, edit and manage your overseas job posts."
                    actions={
                        <Link href="/portal/jobs/create" className={buttonSmPrimary}>
                            <PlusIcon className="h-4 w-4" aria-hidden /> Add New Job
                        </Link>
                    }
                />

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div
                        role="tablist"
                        aria-label="Filter by status"
                        className="no-scrollbar flex gap-1 overflow-x-auto rounded-lg bg-white p-1 ring-1 ring-line"
                    >
                        {tabs.map((t) => {
                            const active = currentTab === t || (t === 'All' && !filters.status);
                            return (
                                <button
                                    key={t}
                                    role="tab"
                                    aria-selected={active}
                                    type="button"
                                    onClick={() => handleTabChange(t)}
                                    className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition-colors duration-150 ease-out ${
                                        active
                                            ? 'bg-brand-800 text-white'
                                            : 'text-ink-600 hover:text-ink-900'
                                    }`}
                                >
                                    {tabLabel(t)}
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative md:w-80">
                        <SearchIcon
                            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                            aria-hidden
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search title, country, employer"
                            aria-label="Search jobs"
                            className={`${inputClass} h-11 pl-10 text-sm`}
                        />
                    </div>
                </div>

                {jobList.length === 0 ? (
                    <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
                        <BriefcaseIcon className="h-10 w-10 text-ink-400" aria-hidden />
                        <p className="mt-4 font-semibold text-ink-900">No jobs found</p>
                        <p className="mt-1 text-sm text-ink-600">Try a different status or search term.</p>
                    </div>
                ) : (
                    <div className="w-full max-w-full rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full min-w-[980px] text-left text-sm">
                            <thead className="border-b border-line bg-surface text-[13px] text-ink-500">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium">Job Title</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Job Code</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Country</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Designation</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Employer</th>
                                    <th scope="col" className="px-4 py-3 text-right font-medium">Vacancy</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Created</th>
                                    <th scope="col" className="px-4 py-3 font-medium">Status</th>
                                    <th scope="col" className="px-4 py-3 text-right font-medium">CVs</th>
                                    <th scope="col" className="px-4 py-3 text-right font-medium"><span className="sr-only">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line">
                                {jobList.map((job) => (
                                    <tr key={job.id} className="hover:bg-surface/60 transition">
                                        <td className="px-4 py-3.5 font-medium text-ink-900">
                                            <Link
                                                href={`/portal/jobs/${job.id}/edit`}
                                                className="hover:text-brand-800"
                                            >
                                                {job.title_en}
                                            </Link>
                                            {job.title_bn && (
                                                <p className="text-xs text-ink-500 font-normal">{job.title_bn}</p>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3.5">
                                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                                {job.job_code}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="flex items-center gap-2 whitespace-nowrap text-ink-700">
                                                <CountryFlag country={job.country?.name || ''} code={job.country?.code} />
                                                {job.country?.name || '-'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-ink-700">{job.designation?.name || '-'}</td>
                                        <td className="max-w-[180px] truncate px-4 py-3.5 text-ink-700" title={job.employer_name}>
                                            {job.employer_name}
                                        </td>
                                        <td className="px-4 py-3.5 text-right tabular-nums text-ink-900">
                                            {job.vacancy ?? '-'}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3.5 text-ink-600">
                                            {formatDate(job.created_at)}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <StatusBadge status={job.status} />
                                        </td>
                                        <td className="px-4 py-3.5 text-right">
                                            <Link
                                                href={`/portal/applications?job_id=${job.id}`}
                                                className="font-semibold tabular-nums text-brand-800 hover:underline"
                                            >
                                                {job.applications_count ?? 0}
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2 text-right">
                                            <div className="flex items-center justify-end gap-0.5">
                                                <a
                                                    href={`/jobs/${job.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={iconButton}
                                                    title="View Public Page"
                                                    aria-label={`View ${job.title_en}`}
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </a>
                                                <Link
                                                    href={`/portal/jobs/${job.id}/edit`}
                                                    className={iconButton}
                                                    title="Edit Job"
                                                    aria-label={`Edit ${job.title_en}`}
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className={`${iconButton} ${job.status === 'Published' ? 'text-accent-700' : ''}`}
                                                    title={job.status === 'Published' ? 'Deactivate' : 'Publish'}
                                                    aria-label={`${job.status === 'Published' ? 'Deactivate' : 'Publish'} ${job.title_en}`}
                                                    onClick={() => toggleStatus(job)}
                                                >
                                                    <PowerIcon className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`${iconButton} hover:text-danger-600`}
                                                    title="Delete"
                                                    aria-label={`Delete ${job.title_en}`}
                                                    onClick={() => handleDelete(job)}
                                                >
                                                    <Trash2Icon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <Pagination
                            links={jobs.links}
                            from={jobs.from}
                            to={jobs.to}
                            total={jobs.total}
                        />
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
