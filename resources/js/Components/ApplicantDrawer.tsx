import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import {
    XIcon,
    PhoneIcon,
    MapPinIcon,
    FileTextIcon,
    ExternalLinkIcon,
    DownloadIcon,
    BriefcaseIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    ShieldIcon,
    ImageIcon,
} from 'lucide-react';
import { CountryFlag } from './CountryFlag';
import { StatusBadge } from './StatusBadge';
import { formatDateTime, initials } from '../utils/format';
import { getCountryNameByCode } from '../utils/isoCountries';
import { buttonSmPrimary, buttonSmSecondary, iconButton } from '../utils/styles';

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

interface ApplicantDrawerProps {
    application: ApplicationItem | null;
    onClose: () => void;
}

export function ApplicantDrawer({ application, onClose }: ApplicantDrawerProps) {
    useEffect(() => {
        if (!application) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [application, onClose]);

    if (!application) return null;

    const handleStatusChange = (newStatus: string) => {
        router.patch(
            `/portal/applications/${application.id}/status`,
            { status: newStatus },
            { preserveScroll: true }
        );
    };

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
                aria-hidden
            />

            {/* Slide-over panel */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="applicant-name"
                className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-lift border-l border-line"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-line px-6 py-4">
                    <p className="text-sm font-semibold text-ink-500">Applicant Details</p>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-500 hover:bg-surface"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {/* Candidate header */}
                    <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-800 ring-1 ring-brand-100">
                            {initials(application.full_name)}
                        </span>
                        <div className="min-w-0">
                            <h2 id="applicant-name" className="text-xl font-bold text-ink-900 truncate">
                                {application.full_name}
                            </h2>
                            <p className="text-sm text-ink-500">
                                Submitted {formatDateTime(application.submitted_at)}
                            </p>
                        </div>
                    </div>

                    {/* Status & Review action */}
                    <div className="rounded-xl border border-line bg-surface p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-ink-500">Review Status</span>
                            <StatusBadge status={application.status} />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => handleStatusChange('Pending')}
                                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                                    application.status === 'Pending'
                                        ? 'bg-warn-600 text-white shadow-sm'
                                        : 'bg-white text-warn-700 ring-1 ring-warn-200 hover:bg-warn-50'
                                }`}
                            >
                                <ClockIcon className="h-3.5 w-3.5" /> Pending
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange('Approved')}
                                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                                    application.status === 'Approved' || application.status === 'Selected'
                                        ? 'bg-accent-600 text-white shadow-sm'
                                        : 'bg-white text-accent-700 ring-1 ring-accent-200 hover:bg-accent-50'
                                }`}
                            >
                                <CheckCircleIcon className="h-3.5 w-3.5" /> Approved
                            </button>
                        </div>
                    </div>

                    {/* Contact & Passport Info */}
                    <ul className="space-y-3 text-[15px]">
                        <li className="flex items-center gap-3">
                            <PhoneIcon className="h-4 w-4 text-ink-400 shrink-0" aria-hidden />
                            <a
                                href={`tel:${application.mobile_number.replace(/\s/g, '')}`}
                                className="font-medium text-ink-900 hover:text-brand-800"
                            >
                                {application.mobile_number}
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <ShieldIcon className="h-4 w-4 text-ink-400 shrink-0" aria-hidden />
                            <span className="text-ink-700">
                                Passport No: <span className="font-semibold text-ink-900">{application.passport_number}</span>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPinIcon className="h-4 w-4 text-ink-400 shrink-0" aria-hidden />
                            <span className="text-ink-700 flex items-center gap-1.5">
                                Location: <CountryFlag code={application.current_location_code || application.current_location} />
                                <span className="font-semibold text-ink-900">
                                    {application.current_location_name || getCountryNameByCode(application.current_location)}
                                    {application.current_location_code ? ` (${application.current_location_code})` : ''}
                                </span>
                            </span>
                        </li>
                    </ul>

                    {/* Applied Position */}
                    <section aria-labelledby="applied-for">
                        <h3 id="applied-for" className="text-sm font-semibold text-ink-900">
                            Applied For
                        </h3>
                        <div className="mt-3 rounded-xl border border-line p-4">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                    {application.job_code}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                    application.has_overseas_experience
                                        ? 'bg-accent-50 text-accent-700 ring-1 ring-accent-100'
                                        : 'bg-surface text-ink-600 ring-1 ring-line'
                                }`}>
                                    {application.has_overseas_experience ? 'Overseas Experienced' : 'Local Only'}
                                </span>
                            </div>
                            <p className="mt-2 font-semibold text-ink-900">{application.job_title}</p>
                            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <dt className="text-ink-500 text-xs">Country</dt>
                                    <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-ink-900">
                                        <CountryFlag country={application.country} /> {application.country}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-ink-500 text-xs">Designation</dt>
                                    <dd className="mt-0.5 font-medium text-ink-900">{application.designation}</dd>
                                </div>
                                <div>
                                    <dt className="text-ink-500 text-xs">Experience</dt>
                                    <dd className="mt-0.5 font-medium text-ink-900">{application.experience_years}</dd>
                                </div>
                                <div>
                                    <dt className="text-ink-500 text-xs">Current Location</dt>
                                    <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-ink-900">
                                        <CountryFlag code={application.current_location_code || application.current_location} />
                                        <span>
                                            {application.current_location_name || getCountryNameByCode(application.current_location)}
                                            {application.current_location_code ? ` (${application.current_location_code})` : ''}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                            <a
                                href={`/jobs/${application.job_id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:text-brand-600"
                            >
                                View related job <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                            </a>
                        </div>
                    </section>

                    {/* 3 Uploaded Documents */}
                    <section aria-labelledby="applicant-docs">
                        <h3 id="applicant-docs" className="text-sm font-semibold text-ink-900">
                            Uploaded Documents (3)
                        </h3>
                        <div className="mt-3 space-y-2.5">
                            {/* CV */}
                            <div className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-200 transition">
                                <div className="flex items-center gap-3 min-w-0">
                                    <FileTextIcon className="h-6 w-6 shrink-0 text-brand-800" aria-hidden />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-ink-900">1. Original CV Document</p>
                                        <p className="text-xs text-ink-500 truncate">{application.cv_file_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    <a
                                        href={application.cv_file_path}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={iconButton}
                                        title="Open file"
                                    >
                                        <ExternalLinkIcon className="h-4 w-4" />
                                    </a>
                                    <a
                                        href={application.cv_file_path}
                                        download
                                        className={iconButton}
                                        title="Download file"
                                    >
                                        <DownloadIcon className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Additional Document 1 */}
                            {application.passport_file_path ? (
                                <div className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-200 transition">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <FileTextIcon className="h-6 w-6 shrink-0 text-ink-600" aria-hidden />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-ink-900">2. Additional Document 1</p>
                                            <p className="text-xs text-ink-500 truncate">{application.passport_file_name || 'Document File'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <a
                                            href={application.passport_file_path}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={iconButton}
                                            title="Open document"
                                        >
                                            <ExternalLinkIcon className="h-4 w-4" />
                                        </a>
                                        <a
                                            href={application.passport_file_path}
                                            download
                                            className={iconButton}
                                            title="Download document"
                                        >
                                            <DownloadIcon className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ) : null}

                            {/* Additional Document 2 */}
                            {application.photo_file_path ? (
                                <div className="flex items-center justify-between rounded-xl border border-line p-3 hover:border-brand-200 transition">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <FileTextIcon className="h-6 w-6 shrink-0 text-ink-600" aria-hidden />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-ink-900">3. Additional Document 2</p>
                                            <p className="text-xs text-ink-500 truncate">{application.photo_file_name || 'Document File'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <a
                                            href={application.photo_file_path}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={iconButton}
                                            title="Open document"
                                        >
                                            <ExternalLinkIcon className="h-4 w-4" />
                                        </a>
                                        <a
                                            href={application.photo_file_path}
                                            download
                                            className={iconButton}
                                            title="Download document"
                                        >
                                            <DownloadIcon className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </section>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-2 border-t border-line px-6 py-4 bg-surface/50">
                    <a
                        href={application.cv_file_path}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonSmSecondary}
                    >
                        <ExternalLinkIcon className="h-4 w-4" aria-hidden /> Open CV
                    </a>
                    <a
                        href={application.cv_file_path}
                        download
                        className={buttonSmPrimary}
                    >
                        <DownloadIcon className="h-4 w-4" aria-hidden /> Download CV
                    </a>
                </div>
            </aside>
        </div>
    );
}
