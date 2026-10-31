import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    BuildingIcon,
    MapPinIcon,
    CalendarIcon,
    ClockIcon,
    DollarSignIcon,
    CheckCircle2Icon,
    UploadIcon,
    FileTextIcon,
    ShieldIcon,
    ImageIcon,
    LockIcon,
    Share2Icon,
    CheckIcon,
    AlertCircleIcon,
    BriefcaseIcon,
} from 'lucide-react';
import { BrandLogo } from '../../Components/BrandLogo';
import { CountryFlag } from '../../Components/CountryFlag';

interface JobDetail {
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
    working_hours?: string;
    interview_date?: string;
    interview_type: string;
    interview_venue?: string;
    req_experience?: string;
    req_education?: string;
    req_age?: string;
    req_gender: string;
    desc_en?: string;
    desc_bn?: string;
    req_candidate_en?: string;
    req_candidate_bn?: string;
    responsibilities_en?: string;
    responsibilities_bn?: string;
    additional_info_en?: string;
    additional_info_bn?: string;
    benefits?: Record<string, boolean>;
    visa_fee_type: string;
    visa_type?: string;
    visa_notes_en?: string;
    visa_notes_bn?: string;
    application_deadline?: string;
    country?: { id: number; name: string };
    designation?: { id: number; name: string };
}

interface Props {
    job: JobDetail;
    relatedJobs: JobDetail[];
    prefilledUser?: {
        name: string;
        phone: string;
        passport_number: string;
        email: string;
    } | null;
}

export default function JobDetails({ job, relatedJobs, prefilledUser }: Props) {
    const { flash } = usePage<any>().props;
    const successApplication = flash?.success_application;

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: prefilledUser?.name || '',
        passport_number: prefilledUser?.passport_number || '',
        mobile_number: prefilledUser?.phone || '',
        experience_years: '5 years',
        has_overseas_experience: true,
        current_location: 'Dhaka, Bangladesh',
        cv_file: null as File | null,
        passport_file: null as File | null,
        photo_file: null as File | null,
    });

    const submitApply = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/jobs/${job.id}/apply`, {
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-surface font-sans text-ink-900 flex flex-col">
            <Head title={`${job.job_code} · ${job.title_en} - Overseas Job Opportunity`} />

            {/* Navigation Header */}
            <header className="bg-brand-900 border-b border-white/10 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                    <Link href="/jobs">
                        <BrandLogo variant="light" subtitle="Overseas Employment Opportunities" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/jobs"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-200 hover:text-white"
                        >
                            <ArrowLeftIcon className="h-4 w-4" /> Back to Jobs
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
                {/* Job Hero Banner */}
                <div className="bg-white rounded-3xl border border-line shadow-card p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-900 border border-brand-200">
                                    Job Code: {job.job_code}
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800">
                                    <CountryFlag country={job.country?.name || ''} />
                                    {job.country?.name}
                                </span>
                                {job.location && (
                                    <span className="text-xs text-ink-500 flex items-center gap-1">
                                        <MapPinIcon className="h-3 w-3" /> {job.location}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                                {job.title_en}
                            </h1>
                            {job.title_bn && (
                                <p className="text-sm text-ink-500 font-medium">{job.title_bn}</p>
                            )}
                        </div>

                        <div className="flex flex-col sm:items-end gap-1">
                            {job.salary && (
                                <span className="text-xl font-extrabold text-accent-700 bg-accent-50 px-3.5 py-1.5 rounded-xl border border-accent-200">
                                    {job.salary}
                                </span>
                            )}
                            <span className="text-xs text-ink-500">
                                Employer: <strong className="text-ink-900">{job.employer_name}</strong>
                            </span>
                        </div>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div className="p-3 bg-surface rounded-xl border border-line">
                            <span className="text-ink-400 block mb-0.5">Designation</span>
                            <span className="font-bold text-ink-900 text-sm">{job.designation?.name}</span>
                        </div>
                        <div className="p-3 bg-surface rounded-xl border border-line">
                            <span className="text-ink-400 block mb-0.5">Contract Period</span>
                            <span className="font-bold text-ink-900 text-sm">{job.contract_duration || '2 Years'}</span>
                        </div>
                        <div className="p-3 bg-surface rounded-xl border border-line">
                            <span className="text-ink-400 block mb-0.5">Working Hours</span>
                            <span className="font-bold text-ink-900 text-sm">{job.working_hours || '8 hrs/day'}</span>
                        </div>
                        <div className="p-3 bg-surface rounded-xl border border-line">
                            <span className="text-ink-400 block mb-0.5">Vacancies</span>
                            <span className="font-bold text-ink-900 text-sm">{job.vacancy || 'Open Demand'}</span>
                        </div>
                    </div>

                    {/* Interview Notice Box */}
                    <div className="p-4 bg-brand-50/70 rounded-2xl border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-brand-800 text-white">
                                <CalendarIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-brand-900">
                                    Interview: {job.interview_date ? new Date(job.interview_date).toLocaleDateString() : 'To Be Announced'}
                                </h3>
                                <p className="text-xs text-brand-700">
                                    Type: {job.interview_type} {job.interview_venue && `• Venue: ${job.interview_venue}`}
                                </p>
                            </div>
                        </div>
                        <a
                            href="#apply-form"
                            className="px-5 py-2.5 bg-brand-800 text-white text-xs font-bold rounded-xl hover:bg-brand-700 text-center transition"
                        >
                            Jump to Application Form
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Job Details, Requirements & Benefits */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        {job.desc_en && (
                            <div className="bg-white rounded-2xl border border-line p-6 shadow-card space-y-2">
                                <h3 className="font-bold text-base text-ink-900">Job Description</h3>
                                <p className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">{job.desc_en}</p>
                                {job.desc_bn && (
                                    <p className="text-xs text-ink-500 pt-2 border-t border-line">{job.desc_bn}</p>
                                )}
                            </div>
                        )}

                        {/* Requirements */}
                        <div className="bg-white rounded-2xl border border-line p-6 shadow-card space-y-4">
                            <h3 className="font-bold text-base text-ink-900">Candidate Requirements</h3>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="p-3 bg-surface rounded-lg">
                                    <span className="text-ink-400 block">Experience Required</span>
                                    <span className="font-semibold text-ink-900">{job.req_experience || 'Any experience'}</span>
                                </div>
                                <div className="p-3 bg-surface rounded-lg">
                                    <span className="text-ink-400 block">Education Level</span>
                                    <span className="font-semibold text-ink-900">{job.req_education || 'Not specified'}</span>
                                </div>
                                <div className="p-3 bg-surface rounded-lg">
                                    <span className="text-ink-400 block">Age Limit</span>
                                    <span className="font-semibold text-ink-900">{job.req_age || '18 – 45 years'}</span>
                                </div>
                                <div className="p-3 bg-surface rounded-lg">
                                    <span className="text-ink-400 block">Gender Preference</span>
                                    <span className="font-semibold text-ink-900">{job.req_gender}</span>
                                </div>
                            </div>

                            {job.req_candidate_en && (
                                <p className="text-sm text-ink-700 whitespace-pre-line leading-relaxed pt-2">
                                    {job.req_candidate_en}
                                </p>
                            )}
                        </div>

                        {/* Facilities Provided */}
                        {job.benefits && (
                            <div className="bg-white rounded-2xl border border-line p-6 shadow-card space-y-3">
                                <h3 className="font-bold text-base text-ink-900">Provided Facilities & Benefits</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                    {Object.entries(job.benefits).map(([key, val]) => (
                                        <div
                                            key={key}
                                            className={`p-2.5 rounded-xl border flex items-center gap-2 font-semibold ${
                                                val ? 'bg-accent-50 border-accent-200 text-accent-800' : 'bg-surface border-line text-ink-400'
                                            }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${val ? 'bg-accent-600' : 'bg-ink-300'}`} />
                                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <span className="ml-auto text-[10px]">{val ? '✓ Yes' : '✗ No'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Visa Information */}
                        <div className="bg-white rounded-2xl border border-line p-6 shadow-card space-y-3">
                            <h3 className="font-bold text-base text-ink-900">Visa & Recruitment Conditions</h3>
                            <div className="p-4 bg-brand-50 rounded-xl border border-brand-100 text-xs space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-ink-500">Visa Fee Terms:</span>
                                    <span className="font-bold text-brand-900">{job.visa_fee_type}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-ink-500">Visa Category:</span>
                                    <span className="font-bold text-brand-900">{job.visa_type || 'Employment Visa'}</span>
                                </div>
                                {job.visa_notes_en && (
                                    <p className="text-ink-700 pt-2 border-t border-brand-200">{job.visa_notes_en}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: THE QUICK APPLY FORM */}
                    <div className="lg:col-span-1" id="apply-form">
                        <div className="bg-white rounded-2xl border-2 border-brand-800 shadow-lift overflow-hidden sticky top-6">
                            <div className="bg-brand-800 px-6 py-4 text-white">
                                <h3 className="font-bold text-lg">Quick Job Application</h3>
                                <p className="text-xs text-brand-200 mt-0.5">
                                    Applying for: <strong className="text-white">{job.job_code}</strong>
                                </p>
                            </div>

                            <div className="p-6">
                                {successApplication ? (
                                    <div className="text-center py-6 space-y-4">
                                        <div className="w-14 h-14 rounded-full bg-accent-100 text-accent-700 flex items-center justify-center mx-auto">
                                            <CheckIcon className="h-8 w-8" strokeWidth={3} />
                                        </div>
                                        <h4 className="text-xl font-bold text-ink-900">Application Submitted!</h4>
                                        <p className="text-xs text-ink-600 leading-relaxed">
                                            Your application and 3 required documents have been received successfully.
                                            Our recruitment agency will verify your passport and contact you on WhatsApp.
                                        </p>
                                        <div className="p-3 bg-surface rounded-xl border border-line text-xs text-left space-y-1">
                                            <p><strong>Job:</strong> {successApplication.job_title} ({successApplication.job_code})</p>
                                            <p><strong>Country:</strong> {successApplication.country}</p>
                                            <p><strong>Employer:</strong> {successApplication.employer}</p>
                                        </div>
                                        <Link
                                            href="/jobs"
                                            className="block w-full py-2.5 rounded-xl bg-brand-800 text-white font-semibold text-xs text-center"
                                        >
                                            Browse More Jobs
                                        </Link>
                                    </div>
                                ) : (
                                    <form onSubmit={submitApply} className="space-y-4">
                                        <p className="text-xs text-ink-500">
                                            Fill the quick form and upload your 3 documents. No prior account creation needed.
                                        </p>

                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-xs font-semibold text-ink-700 mb-1">
                                                Full Name <span className="text-danger-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="As written on your passport"
                                                value={data.full_name}
                                                onChange={(e) => setData('full_name', e.target.value)}
                                                className="w-full text-xs rounded-lg border-line bg-surface"
                                            />
                                            <p className="text-[10px] text-ink-400 mt-0.5">
                                                Please enter your name in English as shown in your passport.
                                            </p>
                                            {errors.full_name && <p className="text-xs text-danger-600">{errors.full_name}</p>}
                                        </div>

                                        {/* Passport Number */}
                                        <div>
                                            <label className="block text-xs font-semibold text-ink-700 mb-1">
                                                Passport Number <span className="text-danger-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. A08812345"
                                                value={data.passport_number}
                                                onChange={(e) => setData('passport_number', e.target.value.toUpperCase())}
                                                className="w-full text-xs font-mono font-bold rounded-lg border-line bg-surface"
                                            />
                                            {errors.passport_number && <p className="text-xs text-danger-600">{errors.passport_number}</p>}
                                        </div>

                                        {/* Mobile Number */}
                                        <div>
                                            <label className="block text-xs font-semibold text-ink-700 mb-1">
                                                Mobile Number <span className="text-danger-600">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+880 1811-204576"
                                                value={data.mobile_number}
                                                onChange={(e) => setData('mobile_number', e.target.value)}
                                                className="w-full text-xs font-mono rounded-lg border-line bg-surface"
                                            />
                                            <p className="text-[10px] text-brand-700 mt-0.5">WhatsApp number preferred</p>
                                            {errors.mobile_number && <p className="text-xs text-danger-600">{errors.mobile_number}</p>}
                                        </div>

                                        {/* Work Experience */}
                                        <div>
                                            <label className="block text-xs font-semibold text-ink-700 mb-1">
                                                Work Experience <span className="text-danger-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. 5 years"
                                                value={data.experience_years}
                                                onChange={(e) => setData('experience_years', e.target.value)}
                                                className="w-full text-xs rounded-lg border-line bg-surface"
                                            />
                                            <p className="text-[10px] text-ink-400 mt-0.5">Total years of experience in this work</p>
                                        </div>

                                        {/* Overseas Experience Toggle */}
                                        <div>
                                            <label className="block text-xs font-semibold text-ink-700 mb-1">
                                                Do you have overseas work experience? <span className="text-danger-600">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setData('has_overseas_experience', true)}
                                                    className={`py-2 rounded-lg text-xs font-semibold border transition ${
                                                        data.has_overseas_experience
                                                            ? 'bg-accent-600 text-white border-accent-600'
                                                            : 'bg-surface text-ink-600 border-line'
                                                    }`}
                                                >
                                                    Yes (Gulf / Abroad)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('has_overseas_experience', false)}
                                                    className={`py-2 rounded-lg text-xs font-semibold border transition ${
                                                        !data.has_overseas_experience
                                                            ? 'bg-ink-800 text-white border-ink-800'
                                                            : 'bg-surface text-ink-600 border-line'
                                                    }`}
                                                >
                                                    No Overseas
                                                </button>
                                            </div>
                                        </div>

                                        {/* Current Location */}
                                        <div>
                                            <label className="block text-xs font-semibold text-ink-700 mb-1">
                                                Where are you currently located? <span className="text-danger-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Cumilla, Bangladesh or Riyadh, KSA"
                                                value={data.current_location}
                                                onChange={(e) => setData('current_location', e.target.value)}
                                                className="w-full text-xs rounded-lg border-line bg-surface"
                                            />
                                        </div>

                                        {/* 3 Required Uploaded Documents */}
                                        <div className="pt-2 border-t border-line space-y-3">
                                            <span className="text-xs font-bold text-brand-900 uppercase tracking-wider block">
                                                3 Required Uploaded Documents
                                            </span>

                                            {/* File 1: CV File */}
                                            <div>
                                                <label className="block text-xs font-medium text-ink-700 mb-0.5">
                                                    1. Candidate CV File (PDF / DOC) *
                                                </label>
                                                <input
                                                    type="file"
                                                    required
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => setData('cv_file', e.target.files?.[0] || null)}
                                                    className="w-full text-xs text-ink-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-brand-50 file:text-brand-800"
                                                />
                                                {errors.cv_file && <p className="text-xs text-danger-600">{errors.cv_file}</p>}
                                            </div>

                                            {/* File 2: Passport Copy */}
                                            <div>
                                                <label className="block text-xs font-medium text-ink-700 mb-0.5">
                                                    2. Passport Copy Scan (PDF / JPG / PNG) *
                                                </label>
                                                <input
                                                    type="file"
                                                    required
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => setData('passport_file', e.target.files?.[0] || null)}
                                                    className="w-full text-xs text-ink-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-brand-50 file:text-brand-800"
                                                />
                                                {errors.passport_file && <p className="text-xs text-danger-600">{errors.passport_file}</p>}
                                            </div>

                                            {/* File 3: Photo */}
                                            <div>
                                                <label className="block text-xs font-medium text-ink-700 mb-0.5">
                                                    3. Passport-Size Photo (JPG / PNG) *
                                                </label>
                                                <input
                                                    type="file"
                                                    required
                                                    accept=".jpg,.jpeg,.png"
                                                    onChange={(e) => setData('photo_file', e.target.files?.[0] || null)}
                                                    className="w-full text-xs text-ink-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-brand-50 file:text-brand-800"
                                                />
                                                {errors.photo_file && <p className="text-xs text-danger-600">{errors.photo_file}</p>}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-3 rounded-xl bg-brand-800 text-white font-bold text-sm hover:bg-brand-700 shadow-md transition disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                                        >
                                            <UploadIcon className="h-4 w-4" />
                                            {processing ? 'Uploading & Applying...' : 'Submit Application (Quick Apply)'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

