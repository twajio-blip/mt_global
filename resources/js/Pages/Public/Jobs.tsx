import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    BriefcaseIcon,
    Building2Icon,
    MapPinIcon,
    SearchIcon,
    UsersIcon,
    XIcon,
    StampIcon,
    InboxIcon,
    LogInIcon,
    UserCheckIcon,
} from 'lucide-react';
import { BrandLogo } from '../../Components/BrandLogo';
import { CountryFlag } from '../../Components/CountryFlag';
import { SelectField } from '../../Components/SelectField';
import { Pagination, PaginationLink } from '../../Components/Pagination';
import { inputClass, pageContainer, buttonSecondary } from '../../utils/styles';

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
    visa_type?: string;
    benefits?: Record<string, boolean>;
    country?: { id: number; name: string; code?: string };
    designation?: { id: number; name: string };
    created_at: string;
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
    countries: { id: number; name: string; code?: string; jobs_count?: number }[];
    designations: { id: number; name: string }[];
    filters: {
        search?: string;
        country?: string;
        designation?: string;
    };
}

export default function PublicJobs({ jobs, countries, designations, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [country, setCountry] = useState(filters.country || '');
    const [designation, setDesignation] = useState(filters.designation || '');

    const applyFilters = (newParams: any) => {
        router.get(
            '/jobs',
            {
                search: newParams.search ?? search,
                country: newParams.country ?? country,
                designation: newParams.designation ?? designation,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setCountry('');
        setDesignation('');
        router.get('/jobs', {}, { preserveState: true, replace: true });
    };

    const hasFilters = Boolean(country || designation || search);
    const jobList = jobs.data || [];

    const countryOptions = countries.map((c) => ({ value: c.name, label: c.name }));
    const designationOptions = designations.map((d) => ({ value: d.name, label: d.name }));

    return (
        <div className="min-h-screen bg-surface">
            <Head title="Available Overseas Jobs" />

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-900 shadow-sm">
                <div className={`${pageContainer} flex h-16 items-center justify-between`}>
                    <Link href="/" className="inline-block">
                        <BrandLogo variant="light" subtitle="Overseas Manpower" />
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/my-cv"
                            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-brand-200 hover:bg-white/10 hover:text-white transition"
                        >
                            <UserCheckIcon className="h-4 w-4" />
                            My Manpower CV
                        </Link>
                        <Link
                            href="/portal/dashboard"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-2 text-sm font-semibold text-white hover:bg-white/20 transition"
                        >
                            <LogInIcon className="h-4 w-4" />
                            Client Portal
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
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

            {/* Floating Filter Card */}
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
                                onChange={(v) => {
                                    setCountry(v);
                                    applyFilters({ country: v });
                                }}
                                placeholder="All Countries"
                                options={countryOptions}
                            />
                        </div>

                        <div>
                            <label htmlFor="filter-designation" className="mb-1.5 block text-sm font-semibold text-ink-900">
                                Designation
                            </label>
                            <SelectField
                                id="filter-designation"
                                size="lg"
                                value={designation}
                                onChange={(v) => {
                                    setDesignation(v);
                                    applyFilters({ designation: v });
                                }}
                                placeholder="All Designations"
                                options={designationOptions}
                            />
                        </div>

                        <div className="md:col-span-2 lg:col-span-1">
                            <label htmlFor="filter-q" className="mb-1.5 block text-sm font-semibold text-ink-900">
                                Search by Job Title
                            </label>
                            <div className="relative">
                                <SearchIcon
                                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400"
                                    aria-hidden
                                />
                                <input
                                    id="filter-q"
                                    type="search"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        applyFilters({ search: e.target.value });
                                    }}
                                    placeholder="e.g. Welder, Driver, Electrician"
                                    className={`${inputClass} h-14 pl-11 text-base`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Country Pills */}
                <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                    <button
                        type="button"
                        onClick={() => {
                            setCountry('');
                            applyFilters({ country: '' });
                        }}
                        className={`flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 ease-out ${
                            !country
                                ? 'border-brand-800 bg-brand-800 text-white'
                                : 'border-line bg-white text-ink-900 hover:border-brand-300'
                        }`}
                    >
                        All Countries
                    </button>
                    {countries.slice(0, 10).map((c) => {
                        const active = country === c.name;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => {
                                    const next = active ? '' : c.name;
                                    setCountry(next);
                                    applyFilters({ country: next });
                                }}
                                className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors duration-150 ease-out ${
                                    active
                                        ? 'border-brand-800 bg-brand-800 text-white'
                                        : 'border-line bg-white text-ink-900 hover:border-brand-300'
                                }`}
                            >
                                <CountryFlag country={c.name} code={c.code} />
                                {c.name}
                            </button>
                        );
                    })}
                </div>

                {/* Results count & Clear */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[15px] text-ink-700">
                        <span className="font-semibold text-ink-900">{jobs.total}</span>{' '}
                        {jobs.total === 1 ? 'job' : 'jobs'} available
                    </p>
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:text-brand-600"
                        >
                            <XIcon className="h-4 w-4" aria-hidden />
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Job Cards List */}
                <div className="mt-4 space-y-4 pb-20">
                    {jobList.length === 0 ? (
                        <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
                            <InboxIcon className="h-10 w-10 text-ink-400" aria-hidden />
                            <p className="mt-4 font-semibold text-ink-900">No jobs match your criteria</p>
                            <p className="mt-1 text-sm text-ink-600">Try adjusting your filters or search term.</p>
                        </div>
                    ) : (
                        jobList.map((job) => (
                            <article
                                key={job.id}
                                className="group relative rounded-xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-200 ease-out hover:border-brand-200 hover:shadow-lift md:p-6"
                            >
                                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                            <span className="flex items-center gap-2 font-semibold text-brand-800">
                                                <CountryFlag country={job.country?.name || ''} code={job.country?.code} />
                                                {job.country?.name}
                                            </span>
                                            {job.location && (
                                                <span className="flex items-center gap-1 text-ink-500">
                                                    <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
                                                    {job.location}
                                                </span>
                                            )}
                                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                                {job.job_code}
                                            </span>
                                        </div>

                                        <h2 className="mt-2 text-lg font-semibold leading-snug text-ink-900 md:text-xl">
                                            <Link
                                                href={`/jobs/${job.id}`}
                                                className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none group-hover:text-brand-800"
                                            >
                                                {job.title_en}
                                            </Link>
                                        </h2>
                                        {job.title_bn && (
                                            <p className="text-sm text-ink-500 mt-0.5">{job.title_bn}</p>
                                        )}

                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-600">
                                            <span className="flex items-center gap-1.5">
                                                <Building2Icon className="h-4 w-4 text-ink-400" aria-hidden />
                                                {job.employer_name}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <BriefcaseIcon className="h-4 w-4 text-ink-400" aria-hidden />
                                                {job.designation?.name}
                                            </span>
                                        </div>

                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            {job.visa_type && (
                                                <span className="flex items-center gap-1.5 rounded-md bg-brand-50 px-2 py-1 text-[13px] font-medium text-brand-800">
                                                    <StampIcon className="h-3.5 w-3.5" aria-hidden />
                                                    {job.visa_type}
                                                </span>
                                            )}
                                            {job.benefits?.accommodation && (
                                                <span className="rounded-md bg-surface px-2 py-1 text-[12px] font-medium text-ink-700 ring-1 ring-line">
                                                    Accommodation
                                                </span>
                                            )}
                                            {job.benefits?.food && (
                                                <span className="rounded-md bg-surface px-2 py-1 text-[12px] font-medium text-ink-700 ring-1 ring-line">
                                                    Food
                                                </span>
                                            )}
                                            {job.benefits?.transportation && (
                                                <span className="rounded-md bg-surface px-2 py-1 text-[12px] font-medium text-ink-700 ring-1 ring-line">
                                                    Transport
                                                </span>
                                            )}
                                            {job.benefits?.medical && (
                                                <span className="rounded-md bg-surface px-2 py-1 text-[12px] font-medium text-ink-700 ring-1 ring-line">
                                                    Medical
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between gap-4 border-t border-line pt-4 md:w-56 md:flex-col md:items-end md:border-0 md:pt-0 md:text-right">
                                        <div>
                                            {job.salary ? (
                                                <p className="text-base font-semibold text-accent-700">{job.salary}</p>
                                            ) : (
                                                <p className="text-sm text-ink-500">Salary on interview</p>
                                            )}
                                            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-700 md:justify-end">
                                                <UsersIcon className="h-4 w-4 text-ink-400" aria-hidden />
                                                {job.vacancy ?? 'Multiple'} vacancies
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="inline-flex h-10 items-center rounded-lg bg-brand-800 px-4 text-sm font-semibold text-white transition-colors duration-150 ease-out group-hover:bg-brand-900 shadow-sm">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}

                    {/* Pagination */}
                    {jobList.length > 0 && (
                        <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden mt-6">
                            <Pagination
                                links={jobs.links}
                                from={jobs.from}
                                to={jobs.to}
                                total={jobs.total}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
