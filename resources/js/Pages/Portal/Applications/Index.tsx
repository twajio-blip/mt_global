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
} from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { PageHeader } from '../../../Components/PageHeader';
import { SelectField } from '../../../Components/SelectField';
import { CountryFlag } from '../../../Components/CountryFlag';
import { StatusBadge } from '../../../Components/StatusBadge';
import { ApplicantDrawer } from '../../../Components/ApplicantDrawer';
import { Pagination, PaginationLink } from '../../../Components/Pagination';
import { formatDate } from '../../../utils/format';
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

            <div className="space-y-6">
                <PageHeader
                    title="CVs & Applications"
                    description={`${appTotal} applications received · ${cvTotal} manpower profiles created.`}
                    actions={
                        <div role="tablist" aria-label="View tabs" className="no-scrollbar flex gap-1 overflow-x-auto rounded-lg bg-white p-1 ring-1 ring-line">
                            <button
                                role="tab"
                                aria-selected={selectedTab === 'applications'}
                                type="button"
                                onClick={() => handleTabChange('applications')}
                                className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition-colors duration-150 ease-out ${
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
                                className={`flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3.5 text-sm font-medium transition-colors duration-150 ease-out ${
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
                    <div className="space-y-6">
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
                            <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
                                <table className="w-full min-w-[1100px] text-left text-sm">
                                    <thead className="border-b border-line bg-surface text-[13px] text-ink-500">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 font-medium">Candidate Name</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Passport No.</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Mobile</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Job Title</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Job Code</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Country</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Designation</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Experience</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Overseas</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Location</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Submitted</th>
                                            <th scope="col" className="px-4 py-3 font-medium">Status</th>
                                            <th scope="col" className="px-4 py-3 text-right"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-line">
                                        {appList.map((app) => (
                                            <tr key={app.id} className="hover:bg-surface/60 transition">
                                                <td className="px-4 py-3.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedApp(app)}
                                                        className="text-left font-medium text-ink-900 hover:text-brand-800"
                                                    >
                                                        {app.full_name}
                                                    </button>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 font-mono text-ink-700">
                                                    {app.passport_number}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5 text-ink-700 font-mono text-xs">
                                                    {app.mobile_number}
                                                </td>
                                                <td className="max-w-[200px] truncate px-4 py-3.5 text-ink-900" title={app.job_title}>
                                                    {app.job_title}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-3.5">
                                                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                                        {app.job_code}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <span className="flex items-center gap-2 whitespace-nowrap text-ink-700">
                                                        <CountryFlag country={app.country} /> {app.country}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5 text-ink-700">{app.designation}</td>
                                                <td className="px-4 py-3.5 font-medium text-ink-900">{app.experience_years}</td>
                                                <td className="px-4 py-3.5">
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${
                                                        app.has_overseas_experience
                                                            ? 'bg-accent-50 text-accent-700 ring-accent-100'
                                                            : 'bg-surface text-ink-600 ring-line'
                                                    }`}>
                                                        {app.has_overseas_experience ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5 text-ink-600">{app.current_location}</td>
                                                <td className="whitespace-nowrap px-4 py-3.5 text-ink-500 text-xs">
                                                    {formatDate(app.submitted_at)}
                                                </td>
                                                <td className="px-4 py-3.5">
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
                                                        <a
                                                            href={app.cv_file_path}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className={iconButton}
                                                            title="Open CV file"
                                                        >
                                                            <ExternalLinkIcon className="h-4 w-4" />
                                                        </a>
                                                        <a
                                                            href={app.cv_file_path}
                                                            download
                                                            className={iconButton}
                                                            title="Download CV file"
                                                        >
                                                            <DownloadIcon className="h-4 w-4" />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination for Applications table */}
                                <Pagination
                                    links={appLinks}
                                    from={appFrom}
                                    to={appTo}
                                    total={appTotal}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* -------------------- VIEW B: CREATED CVS (MANPOWER PROFILE MANAGER) -------------------- */}
                {selectedTab === 'cvs' && (
                    <div className="space-y-6">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                                            <div className="pt-4 mt-3 border-t border-line flex items-center justify-between gap-2">
                                                <a
                                                    href={`/portal/cvs/${cv.id}/export`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={buttonSmSecondary}
                                                >
                                                    <PrinterIcon className="h-3.5 w-3.5" /> Print Manpower CV
                                                </a>
                                                <Link
                                                    href={`/portal/cvs/${cv.id}/edit`}
                                                    className={buttonSmPrimary}
                                                >
                                                    <Edit3Icon className="h-3.5 w-3.5" /> Edit Profile
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
