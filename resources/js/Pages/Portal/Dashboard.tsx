import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';
import { PortalLayout } from '../../Layouts/PortalLayout';
import { PageHeader } from '../../Components/PageHeader';
import { CountryFlag } from '../../Components/CountryFlag';
import { StatusBadge } from '../../Components/StatusBadge';
import { formatRelativeDay, initials } from '../../utils/format';
import { buttonSmPrimary } from '../../utils/styles';

interface RecentApp {
    id: number;
    full_name: string;
    job_title: string;
    job_code: string;
    country: string;
    status: string;
    submitted_at: string;
}

interface RecentJob {
    id: number;
    title: string;
    job_code: string;
    country: string;
    status: string;
    vacancy?: number;
    applications_count: number;
}

interface Props {
    stats: {
        active_jobs: number;
        total_vacancies: number;
        total_jobs: number;
        draft_jobs: number;
        inactive_jobs: number;
        total_applications: number;
        jobs_with_applications: number;
        recent_applications: number;
        total_cv_profiles: number;
    };
    recentApplications: RecentApp[];
    recentJobs: RecentJob[];
    maxApplications: number;
}

export default function Dashboard({ stats, recentApplications, recentJobs, maxApplications }: Props) {
    const { props } = usePage<any>();
    const user = props.auth?.user;
    const firstName = user?.name ? user.name.split(' ')[0] : 'Admin';

    const statCards = [
        {
            label: 'Active Jobs',
            value: stats.active_jobs,
            note: `${stats.total_vacancies} open vacancies`,
            to: '/portal/jobs?status=Published',
        },
        {
            label: 'Total Jobs',
            value: stats.total_jobs,
            note: `${stats.draft_jobs} draft · ${stats.inactive_jobs} inactive`,
            to: '/portal/jobs',
        },
        {
            label: 'CVs Received',
            value: stats.total_applications,
            note: `Across ${stats.jobs_with_applications} jobs`,
            to: '/portal/applications',
        },
        {
            label: 'Recent CVs',
            value: stats.recent_applications,
            note: 'Last 7 days',
            to: '/portal/applications',
        },
    ];

    const maxCount = Math.max(1, maxApplications || 1);

    return (
        <PortalLayout>
            <Head title="Client Portal Dashboard" />

            <div className="space-y-8">
                <PageHeader
                    title={`Welcome back, ${firstName}`}
                    description="Here’s how your published jobs are performing."
                    actions={
                        <Link href="/portal/jobs/create" className={buttonSmPrimary}>
                            <PlusIcon className="h-4 w-4" aria-hidden /> Add New Job
                        </Link>
                    }
                />

                <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                    {statCards.map((s) => (
                        <li key={s.label}>
                            <Link
                                href={s.to}
                                className="block h-full rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-150 ease-out hover:border-brand-200 hover:shadow-card"
                            >
                                <p className="text-sm font-medium text-ink-600">{s.label}</p>
                                <p className="mt-2 text-3xl font-bold tabular-nums text-ink-900">{s.value}</p>
                                <p className="mt-1 text-[13px] text-ink-500">{s.note}</p>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="grid gap-6 xl:grid-cols-5">
                    {/* Recent CV Submissions */}
                    <section aria-labelledby="recent-cvs" className="rounded-2xl border border-line bg-white shadow-sm xl:col-span-3">
                        <div className="flex items-center justify-between border-b border-line px-5 py-4">
                            <h2 id="recent-cvs" className="text-base font-semibold text-ink-900">
                                Recent CV Submissions
                            </h2>
                            <Link
                                href="/portal/applications"
                                className="flex items-center gap-1 text-sm font-semibold text-brand-800 hover:text-brand-600"
                            >
                                View all <ArrowRightIcon className="h-4 w-4" aria-hidden />
                            </Link>
                        </div>
                        <ul className="divide-y divide-line">
                            {recentApplications.length === 0 ? (
                                <li className="px-5 py-8 text-center text-sm text-ink-500">
                                    No applications received yet.
                                </li>
                            ) : (
                                recentApplications.map((app) => (
                                    <li key={app.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface/50 transition">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[13px] font-semibold text-brand-800 ring-1 ring-brand-100">
                                            {initials(app.full_name)}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-[15px] font-medium text-ink-900">
                                                {app.full_name}
                                            </p>
                                            <p className="flex items-center gap-1.5 truncate text-[13px] text-ink-500">
                                                <CountryFlag country={app.country} />
                                                <span className="truncate">{app.job_title}</span>
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-[13px] text-ink-500">
                                            {formatRelativeDay(app.submitted_at)}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </section>

                    {/* Recent Job Posts */}
                    <section aria-labelledby="recent-jobs" className="rounded-2xl border border-line bg-white shadow-sm xl:col-span-2">
                        <div className="flex items-center justify-between border-b border-line px-5 py-4">
                            <h2 id="recent-jobs" className="text-base font-semibold text-ink-900">
                                Recent Job Posts
                            </h2>
                            <Link
                                href="/portal/jobs"
                                className="flex items-center gap-1 text-sm font-semibold text-brand-800 hover:text-brand-600"
                            >
                                All jobs <ArrowRightIcon className="h-4 w-4" aria-hidden />
                            </Link>
                        </div>
                        <ul className="divide-y divide-line">
                            {recentJobs.length === 0 ? (
                                <li className="px-5 py-8 text-center text-sm text-ink-500">
                                    No jobs created yet.
                                </li>
                            ) : (
                                recentJobs.map((job) => {
                                    const count = job.applications_count || 0;
                                    const pct = Math.min(100, Math.round((count / maxCount) * 100));
                                    return (
                                        <li key={job.id} className="px-5 py-3.5 hover:bg-surface/50 transition">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/portal/jobs/${job.id}/edit`}
                                                        className="block truncate text-[15px] font-medium text-ink-900 hover:text-brand-800"
                                                    >
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
                                                    <div
                                                        className="h-full rounded-full bg-brand-600 transition-all duration-300"
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                                <Link
                                                    href={`/portal/applications?job_id=${job.id}`}
                                                    className="w-14 shrink-0 text-right text-[13px] font-semibold tabular-nums text-ink-700 hover:text-brand-800"
                                                >
                                                    {count} {count === 1 ? 'CV' : 'CVs'}
                                                </Link>
                                            </div>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </section>
                </div>
            </div>
        </PortalLayout>
    );
}
