import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    SearchIcon,
    XIcon,
    EyeIcon,
    Edit3Icon,
    PrinterIcon,
    BriefcaseIcon,
    GraduationCapIcon,
    AwardIcon,
    ExternalLinkIcon,
    InboxIcon,
    DownloadIcon,
    FileTextIcon,
} from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { PageHeader } from '../../../Components/PageHeader';
import { SelectField } from '../../../Components/SelectField';
import { CountryFlag } from '../../../Components/CountryFlag';
import { StatusBadge } from '../../../Components/StatusBadge';
import { ApplicantDrawer } from '../../../Components/ApplicantDrawer';
import { Pagination, PaginationLink } from '../../../Components/Pagination';
import { formatDate } from '../../../utils/format';
import { getCountryNameByCode } from '../../../utils/isoCountries';
import { iconButton, inputClass, buttonSmPrimary, buttonSmSecondary } from '../../../utils/styles';

interface SelectOption {
    value: string;
    label: string;
}

interface ApplicationItem {
    id: number;
    job_id: number;
    user_id?: number;
    full_name: string;
    passport_number: string;
    mobile_number: string;
    job_title: string;
    job_code: string;
    country: string;
    designation: string;
    experience_years: string;
    has_overseas_experience: boolean;
    current_location: string;
    current_location_id?: number;
    current_location_name?: string;
    current_location_code?: string;
    cv_file_path: string;
    cv_file_name: string;
    passport_file_path: string;
    passport_file_name: string;
    photo_file_path: string;
    photo_file_name: string;
    status: string;
    submitted_at: string;
}

interface CvProfileItem {
    id: number;
    user_id: number;
    full_name: string;
    email: string;
    mobile_number: string;
    passport_number: string;
    photo_path?: string;
    country: string;
    district?: string;
    total_experience: string;
    qualifications_count: number;
    experiences_count: number;
    trainings_count: number;
    languages: string[];
    updated_at: string;
}

interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
    from?: number | null;
    to?: number | null;
    total: number;
    current_page?: number;
    last_page?: number;
}

interface Props {
    activeTab: 'applications' | 'cvs';
    applications: PaginatedData<ApplicationItem> | ApplicationItem[];
    cvProfiles: PaginatedData<CvProfileItem> | CvProfileItem[];
    allJobs: SelectOption[];
    allCountries: SelectOption[];
    allDesignations: SelectOption[];
    filters: {
        job_id: string;
        country: string;
        designation: string;
        search: string;
        cv_search: string;
    };
}

export default function ApplicationsIndex({
    activeTab,
    applications,
    cvProfiles,
    allJobs,
    allCountries,
    allDesignations,
    filters,
}: Props) {
    const [selectedTab, setSelectedTab] = useState<'applications' | 'cvs'>(activeTab || 'applications');
    const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

    // Extract paginated arrays and meta
    const appList: ApplicationItem[] = Array.isArray(applications) ? applications : (applications?.data || []);
    const appLinks = Array.isArray(applications) ? [] : (applications?.links || []);
    const appTotal = Array.isArray(applications) ? applications.length : (applications?.total || 0);
    const appFrom = Array.isArray(applications) ? 1 : applications?.from;
    const appTo = Array.isArray(applications) ? applications.length : applications?.to;

    const cvList: CvProfileItem[] = Array.isArray(cvProfiles) ? cvProfiles : (cvProfiles?.data || []);
    const cvLinks = Array.isArray(cvProfiles) ? [] : (cvProfiles?.links || []);
    const cvTotal = Array.isArray(cvProfiles) ? cvProfiles.length : (cvProfiles?.total || 0);
    const cvFrom = Array.isArray(cvProfiles) ? 1 : cvProfiles?.from;
    const cvTo = Array.isArray(cvProfiles) ? cvProfiles.length : cvProfiles?.to;

    // Filter states
    const [jobId, setJobId] = useState(filters.job_id || '');
    const [country, setCountry] = useState(filters.country || '');
    const [designation, setDesignation] = useState(filters.designation || '');
    const [search, setSearch] = useState(filters.search || '');
    const [cvSearch, setCvSearch] = useState(filters.cv_search || '');

    const applyFilters = (newParams: Partial<typeof filters>) => {
        router.get(
            '/portal/applications',
            {
                tab: selectedTab,
                job_id: newParams.job_id ?? jobId,
                country: newParams.country ?? country,
                designation: newParams.designation ?? designation,
                search: newParams.search ?? search,
                cv_search: newParams.cv_search ?? cvSearch,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        setJobId('');
        setCountry('');
        setDesignation('');
        setSearch('');
        router.get('/portal/applications', { tab: selectedTab }, { preserveState: true, replace: true });
    };

    const handleTabChange = (tab: 'applications' | 'cvs') => {
        setSelectedTab(tab);
        router.get('/portal/applications', { tab }, { preserveState: true, replace: true });
    };

    const hasFilters = Boolean(jobId || country || designation || search);
    const activeJobFilter = allJobs.find((j) => j.value === jobId);

    return (
        <PortalLayout>
            <Head title="CVs & Applications" />

            <div className="space-y-6 w-full max-w-full min-w-0">
                <PageHeader
                    title="CVs & Applications"
                    description={`${appTotal} applications received · ${cvTotal} manpower profiles created.`}
                    actions={
                        <div role="tablist" aria-label="View tabs" className="no-scrollbar flex w-full sm:w-auto gap-1 overflow-x-auto rounded-lg bg-white p-1 ring-1 ring-line">
                            <button
                                role="tab"
                                aria-selected={selectedTab === 'applications'}
                                type="button"
                                onClick={() => handleTabChange('applications')}
                                className={`flex-1 sm:flex-initial flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 sm:px-3.5 text-xs sm:text-sm font-medium transition-colors duration-150 ease-out ${
                                    selectedTab === 'applications' ? 'bg-brand-800 text-white' : 'text-ink-600 hover:text-ink-900'
                                }`}
                            >
                                Job Applications
                                <span className={`tabular-nums ${selectedTab === 'applications' ? 'text-brand-200' : 'text-ink-400'}`}>
                                    {appTotal}
                                </span>
                            </button>
                            <button
                                role="tab"
                                aria-selected={selectedTab === 'cvs'}
                                type="button"
                                onClick={() => handleTabChange('cvs')}
                                className={`flex-1 sm:flex-initial flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 sm:px-3.5 text-xs sm:text-sm font-medium transition-colors duration-150 ease-out ${
                                    selectedTab === 'cvs' ? 'bg-brand-800 text-white' : 'text-ink-600 hover:text-ink-900'
                                }`}
                            >
                                Created CVs
                                <span className={`tabular-nums ${selectedTab === 'cvs' ? 'text-brand-200' : 'text-ink-400'}`}>
                                    {cvTotal}
                                </span>
                            </button>
                        </div>
                    }
                />

                {/* -------------------- VIEW A: JOB APPLICATIONS -------------------- */}
                {selectedTab === 'applications' && (
                    <div className="space-y-6 w-full max-w-full min-w-0">
                        {/* Filter card */}
                        <div className="rounded-2xl border border-line bg-white p-4">
                            <div className="grid gap-3 md:grid-cols-4">
                                <SelectField
                                    id="filter-job"
                                    ariaLabel="Filter by job"
                                    value={jobId}
                                    onChange={(v) => {
                                        setJobId(v);
                                        applyFilters({ job_id: v });
                                    }}
                                    placeholder="All Jobs & Codes"
                                    options={allJobs}
                                />
                                <SelectField
                                    id="filter-country"
                                    ariaLabel="Filter by country"
                                    value={country}
                                    onChange={(v) => {
                                        setCountry(v);
                                        applyFilters({ country: v });
                                    }}
                                    placeholder="All Countries"
                                    options={allCountries}
                                />
                                <SelectField
                                    id="filter-designation"
                                    ariaLabel="Filter by designation"
                                    value={designation}
                                    onChange={(v) => {
                                        setDesignation(v);
                                        applyFilters({ designation: v });
                                    }}
                                    placeholder="All Designations"
                                    options={allDesignations}
                                />
                                <div className="relative">
                                    <SearchIcon
                                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                                        aria-hidden
                                    />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            applyFilters({ search: e.target.value });
                                        }}
                                        placeholder="Search candidate, passport..."
                                        aria-label="Search applications"
                                        className={`${inputClass} pl-10`}
                                    />
                                </div>
                            </div>

                            {hasFilters && (
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm border-t border-line pt-3">
                                    {activeJobFilter && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 py-1 pl-3 pr-1 font-medium text-brand-800">
                                            Job: {activeJobFilter.label}
                                            <button
                                                type="button"
                                                aria-label="Remove job filter"
                                                onClick={() => {
                                                    setJobId('');
                                                    applyFilters({ job_id: '' });
                                                }}
                                                className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-brand-100"
                                            >
                                                <XIcon className="h-3.5 w-3.5" />
                                            </button>
                                        </span>
                                    )}
                                    <span className="text-ink-600" aria-live="polite">
                                        {appTotal} results
                                    </span>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="font-semibold text-brand-800 hover:text-brand-600"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Data table */}
                        {appList.length === 0 ? (
                            <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
                                <InboxIcon className="h-10 w-10 text-ink-400" aria-hidden />
                                <p className="mt-4 font-semibold text-ink-900">No applications match these filters</p>
                                <p className="mt-1 text-sm text-ink-600">Try adjusting your filters or search term.</p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden md:block w-full max-w-full rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto w-full">
                                        <table className="w-full text-left text-sm">
                                            <thead className="border-b border-line bg-surface text-xs text-ink-500 whitespace-nowrap">
                                                <tr>
                                                    <th scope="col" className="px-3 py-3 font-medium">Candidate</th>
                                                    <th scope="col" className="px-3 py-3 font-medium">Applied Job</th>
                                                    <th scope="col" className="px-2.5 py-3 font-medium">Exp</th>
                                                    <th scope="col" className="px-2 py-3 font-medium">Location</th>
                                                    <th scope="col" className="px-2.5 py-3 font-medium">Files</th>
                                                    <th scope="col" className="px-2.5 py-3 font-medium">Date</th>
                                                    <th scope="col" className="px-2.5 py-3 font-medium">Status</th>
                                                    <th scope="col" className="px-2 py-3 text-right"><span className="sr-only">Actions</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-line">
                                                {appList.map((app) => (
                                                    <tr key={app.id} className="hover:bg-surface/60 transition">
                                                        <td className="px-3 py-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedApp(app)}
                                                                className="text-left font-semibold text-ink-900 hover:text-brand-800 block truncate max-w-[150px]"
                                                                title={app.full_name}
                                                            >
                                                                {app.full_name}
                                                            </button>
                                                            <span className="text-[11px] text-ink-500 block mt-0.5 whitespace-nowrap">
                                                                {app.passport_number ? <span className="font-mono text-ink-700">{app.passport_number}</span> : null}
                                                                {app.passport_number && app.mobile_number ? ' · ' : ''}
                                                                {app.mobile_number ? <span>{app.mobile_number}</span> : null}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-3">
                                                            <div className="max-w-[160px] truncate font-medium text-ink-900" title={app.job_title}>
                                                                {app.job_title}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                <span className="font-mono text-[10px] font-semibold px-1 py-0.2 rounded bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                                                    {app.job_code}
                                                                </span>
                                                                <span className="text-xs text-ink-500 flex items-center gap-1 truncate max-w-[120px]">
                                                                    <CountryFlag country={app.country} /> {app.country}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-2.5 py-3 whitespace-nowrap">
                                                            <span className="font-medium text-ink-900 text-xs block leading-tight">{app.experience_years}</span>
                                                            <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.2 text-[9px] font-semibold mt-0.5 ring-1 whitespace-nowrap ${
                                                                app.has_overseas_experience
                                                                    ? 'bg-accent-50 text-accent-700 ring-accent-100'
                                                                    : 'bg-surface text-ink-600 ring-line'
                                                            }`}>
                                                                {app.has_overseas_experience ? 'Overseas: Yes' : 'Overseas: No'}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 py-3 text-xs whitespace-nowrap">
                                                            <span
                                                                title={app.current_location_name || getCountryNameByCode(app.current_location)}
                                                                className={`inline-flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded text-[10px] ring-1 whitespace-nowrap ${
                                                                    app.current_location_code === 'BD' || app.current_location_name === 'Bangladesh'
                                                                        ? 'bg-brand-50 text-brand-800 ring-brand-100'
                                                                        : 'bg-accent-50 text-accent-700 ring-accent-100'
                                                                }`}
                                                            >
                                                                <CountryFlag code={app.current_location_code} country={app.current_location_name} size="sm" />
                                                                <span>{app.current_location_code || app.current_location_name || app.current_location}</span>
                                                            </span>
                                                        </td>
                                                        <td className="px-2.5 py-3 whitespace-nowrap">
                                                            <div className="flex items-center gap-1">
                                                                {app.cv_file_path && (
                                                                    <a
                                                                        href={app.cv_file_path}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="inline-flex items-center gap-1 rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-100"
                                                                        title={app.cv_file_name || 'CV Document'}
                                                                    >
                                                                        <FileTextIcon className="h-3 w-3" /> CV
                                                                    </a>
                                                                )}
                                                                {app.passport_file_path && (
                                                                    <a
                                                                        href={app.passport_file_path}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-ink-700 ring-1 ring-line hover:bg-slate-100"
                                                                        title={app.passport_file_name || 'Additional Document 1'}
                                                                    >
                                                                        Doc 2
                                                                    </a>
                                                                )}
                                                                {app.photo_file_path && (
                                                                    <a
                                                                        href={app.photo_file_path}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        className="inline-flex items-center gap-1 rounded bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-ink-700 ring-1 ring-line hover:bg-slate-100"
                                                                        title={app.photo_file_name || 'Additional Document 2'}
                                                                    >
                                                                        Doc 3
                                                                    </a>
                                                                )}
                                                                {!app.cv_file_path && !app.passport_file_path && !app.photo_file_path && (
                                                                    <span className="text-xs text-ink-400">—</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-2.5 py-3 text-ink-500 text-xs">
                                                            {formatDate(app.submitted_at)}
                                                        </td>
                                                        <td className="px-2.5 py-3 whitespace-nowrap">
                                                            <StatusBadge status={app.status} />
                                                        </td>
                                                        <td className="px-2 py-2 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <button
                                                                    type="button"
                                                                    className={iconButton}
                                                                    title="View Applicant & Files"
                                                                    aria-label={`View ${app.full_name}`}
                                                                    onClick={() => setSelectedApp(app)}
                                                                >
                                                                    <EyeIcon className="h-4 w-4" />
                                                                </button>
                                                                {app.cv_file_path && (
                                                                    <a
                                                                        href={app.cv_file_path}
                                                                        download
                                                                        className={iconButton}
                                                                        title="Download CV file"
                                                                    >
                                                                        <DownloadIcon className="h-4 w-4" />
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination for Applications table */}
                                    <Pagination
                                        links={appLinks}
                                        from={appFrom}
                                        to={appTo}
                                        total={appTotal}
                                    />
                                </div>

                                {/* Mobile Cards (md:hidden - zero horizontal scroll on small screens) */}
                                <div className="md:hidden space-y-3">
                                    <ul className="space-y-3">
                                        {appList.map((app) => (
                                            <li key={app.id} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedApp(app)}
                                                    className="block w-full text-left"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-ink-900 text-base truncate">{app.full_name}</p>
                                                            <p className="text-xs text-ink-500 font-mono mt-0.5 truncate">
                                                                {app.passport_number || 'No Passport'} · {app.mobile_number}
                                                            </p>
                                                        </div>
                                                        <StatusBadge status={app.status} />
                                                    </div>

                                                    <div className="mt-2.5 pt-2 border-t border-line/60">
                                                        <p className="font-medium text-sm text-ink-900">{app.job_title}</p>
                                                        <div className="flex items-center gap-2 mt-1 text-xs text-ink-500">
                                                            <span className="font-mono font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                                                {app.job_code}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-ink-700">
                                                                <CountryFlag country={app.country} /> {app.country}
                                                            </span>
                                                            <span>· {app.designation}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span>Exp: <strong className="text-ink-800">{app.experience_years}</strong> {app.has_overseas_experience ? '(Overseas)' : ''}</span>
                                                            <span
                                                                title={app.current_location_name || getCountryNameByCode(app.current_location)}
                                                                className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full text-[10px] ring-1 whitespace-nowrap ${
                                                                    app.current_location_code === 'BD' || app.current_location_name === 'Bangladesh'
                                                                        ? 'bg-brand-50 text-brand-800 ring-brand-100'
                                                                        : 'bg-accent-50 text-accent-700 ring-accent-100'
                                                                }`}
                                                            >
                                                                <CountryFlag code={app.current_location_code} country={app.current_location_name} size="sm" />
                                                                <span>{app.current_location_code || app.current_location_name || app.current_location}</span>
                                                            </span>
                                                        </div>
                                                        <span>{formatDate(app.submitted_at)}</span>
                                                    </div>
                                                </button>

                                                <div className="mt-3 pt-3 border-t border-line flex flex-wrap items-center justify-between gap-2">
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        {app.cv_file_path && (
                                                            <a
                                                                href={app.cv_file_path}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 rounded bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-100"
                                                            >
                                                                <FileTextIcon className="h-3 w-3" /> CV
                                                            </a>
                                                        )}
                                                        {app.passport_file_path && (
                                                            <a
                                                                href={app.passport_file_path}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 rounded bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink-700 ring-1 ring-line hover:bg-slate-100"
                                                                title={app.passport_file_name || 'Additional Document 1'}
                                                            >
                                                                Doc 2
                                                            </a>
                                                        )}
                                                        {app.photo_file_path && (
                                                            <a
                                                                href={app.photo_file_path}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 rounded bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink-700 ring-1 ring-line hover:bg-slate-100"
                                                                title={app.photo_file_name || 'Additional Document 2'}
                                                            >
                                                                Doc 3
                                                            </a>
                                                        )}
                                                        {!app.cv_file_path && !app.passport_file_path && !app.photo_file_path && (
                                                            <span className="text-xs text-ink-400">No files</span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedApp(app)}
                                                            className={`${buttonSmSecondary} text-xs h-8 px-3`}
                                                        >
                                                            <EyeIcon className="h-3.5 w-3.5" /> View Details
                                                        </button>
                                                        {app.cv_file_path && (
                                                            <a
                                                                href={app.cv_file_path}
                                                                download
                                                                className={iconButton}
                                                                title="Download CV"
                                                            >
                                                                <DownloadIcon className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Mobile Pagination */}
                                    <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
                                        <Pagination
                                            links={appLinks}
                                            from={appFrom}
                                            to={appTo}
                                            total={appTotal}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* -------------------- VIEW B: CREATED CVS (MANPOWER PROFILE MANAGER) -------------------- */}
                {selectedTab === 'cvs' && (
                    <div className="space-y-6 w-full max-w-full min-w-0">
                        <div className="rounded-2xl border border-line bg-white p-4">
                            <div className="relative max-w-md">
                                <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
                                <input
                                    type="search"
                                    value={cvSearch}
                                    onChange={(e) => {
                                        setCvSearch(e.target.value);
                                        applyFilters({ cv_search: e.target.value });
                                    }}
                                    placeholder="Search candidate, passport, district..."
                                    aria-label="Search CV profiles"
                                    className={`${inputClass} pl-10`}
                                />
                            </div>
                        </div>

                        {cvList.length === 0 ? (
                            <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
                                <InboxIcon className="h-10 w-10 text-ink-400" aria-hidden />
                                <p className="mt-4 font-semibold text-ink-900">No CV profiles found</p>
                                <p className="mt-1 text-sm text-ink-600">Candidates who complete the CV builder will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {cvList.map((cv) => (
                                        <div
                                            key={cv.id}
                                            className="rounded-2xl border border-line bg-white p-5 shadow-sm flex flex-col justify-between hover:border-brand-200 transition"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    {cv.photo_path ? (
                                                        <img
                                                            src={cv.photo_path}
                                                            alt={cv.full_name}
                                                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-line"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-800 font-bold flex items-center justify-center text-lg ring-1 ring-brand-100">
                                                            {cv.full_name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <h3 className="font-bold text-ink-900 text-base truncate">{cv.full_name}</h3>
                                                        <p className="flex items-center gap-1.5 text-xs text-ink-500 mt-0.5">
                                                            <CountryFlag country={cv.country} />
                                                            <span>{cv.country}</span>
                                                            {cv.district && <span>· {cv.district}</span>}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                                                    <div className="p-2.5 rounded-lg bg-surface border border-line">
                                                        <span className="text-ink-400 block text-[11px]">Passport No. (Core)</span>
                                                        <span className="font-mono font-semibold text-ink-800">
                                                            {cv.passport_number || '-'}
                                                        </span>
                                                    </div>
                                                    <div className="p-2.5 rounded-lg bg-surface border border-line">
                                                        <span className="text-ink-400 block text-[11px]">Mobile (Core)</span>
                                                        <span className="font-mono font-semibold text-ink-800">
                                                            {cv.mobile_number || '-'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5 text-xs pt-2 border-t border-line">
                                                    <div className="flex items-center justify-between text-ink-700">
                                                        <span className="flex items-center gap-1 text-ink-500">
                                                            <BriefcaseIcon className="h-3.5 w-3.5" /> Total Experience:
                                                        </span>
                                                        <span className="font-semibold text-brand-900">{cv.total_experience}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-ink-700">
                                                        <span className="flex items-center gap-1 text-ink-500">
                                                            <GraduationCapIcon className="h-3.5 w-3.5" /> Qualifications:
                                                        </span>
                                                        <span className="font-medium">{cv.qualifications_count} degree(s)</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-ink-700">
                                                        <span className="flex items-center gap-1 text-ink-500">
                                                            <AwardIcon className="h-3.5 w-3.5" /> Trainings:
                                                        </span>
                                                        <span className="font-medium">{cv.trainings_count} course(s)</span>
                                                    </div>
                                                </div>

                                                {cv.languages && cv.languages.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 pt-1">
                                                        {cv.languages.map((lang) => (
                                                            <span
                                                                key={lang}
                                                                className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-brand-50 text-brand-800 ring-1 ring-brand-100"
                                                            >
                                                                {lang}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-4 mt-3 border-t border-line grid grid-cols-3 gap-1.5">
                                                <a
                                                    href={`/portal/cvs/${cv.id}/export`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`${buttonSmSecondary} text-xs px-1.5 justify-center`}
                                                    title="View & Print CV"
                                                >
                                                    <PrinterIcon className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">Print</span>
                                                </a>
                                                <a
                                                    href={`/portal/cvs/${cv.id}/export?download=1`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`${buttonSmSecondary} text-xs px-1.5 justify-center text-brand-800 hover:text-brand-900`}
                                                    title="Download CV as PDF"
                                                >
                                                    <DownloadIcon className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">Download</span>
                                                </a>
                                                <Link
                                                    href={`/portal/cvs/${cv.id}/edit`}
                                                    className={`${buttonSmPrimary} text-xs px-1.5 justify-center`}
                                                    title="Edit CV Profile"
                                                >
                                                    <Edit3Icon className="h-3.5 w-3.5 shrink-0" />
                                                    <span className="truncate">Edit</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination for CV Profiles grid */}
                                <div className="rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
                                    <Pagination
                                        links={cvLinks}
                                        from={cvFrom}
                                        to={cvTo}
                                        total={cvTotal}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Applicant Drawer preview of 3 uploaded files and details */}
            <ApplicantDrawer application={selectedApp} onClose={() => setSelectedApp(null)} />
        </PortalLayout>
    );
}
