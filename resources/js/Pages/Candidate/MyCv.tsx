import React, { useState, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    SaveIcon,
    ArrowLeftIcon,
    PlusIcon,
    Trash2Icon,
    UploadIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    UserIcon,
    ShieldIcon,
    MapPinIcon,
    GraduationCapIcon,
    BriefcaseIcon,
    AwardIcon,
    LanguagesIcon,
    PrinterIcon,
    CheckCircle2Icon,
    LockIcon,
    GlobeIcon,
} from 'lucide-react';
import { BrandLogo } from '../../Components/BrandLogo';

interface Qualification {
    id?: number;
    degree: string;
    institution: string;
    passing_year: string;
    result_grade?: string;
}

interface WorkExperience {
    id?: number;
    job_title: string;
    company: string;
    country?: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
}

interface Training {
    id?: number;
    course_name: string;
    institute: string;
    duration: string;
}

interface Props {
    user: {
        name: string;
        email: string;
        phone: string;
        passport_number: string;
    };
    cvProfile: {
        id: number;
        photo_path?: string;
        father_name: string;
        mother_name: string;
        dob: string;
        pob: string;
        nationality: string;
        gender: string;
        marital_status: string;
        religion: string;
        height: string;
        weight: string;
        passport_expiry: string;
        passport_issue_place: string;
        village_area: string;
        post_office: string;
        police_station: string;
        district: string;
        country: string;
        email: string;
        qualifications: Qualification[];
        experiences: WorkExperience[];
        trainings: Training[];
        total_experience: string;
        languages: string[];
    };
    manpowerCountries: string[];
}

const LANGUAGE_OPTIONS = ['Bangla', 'English', 'Arabic', 'Hindi', 'Urdu', 'Other'];

export default function CandidateMyCv({ user, cvProfile, manpowerCountries }: Props) {
    const [openSections, setOpenSections] = useState({
        personal: true,
        passport: true,
        address: true,
        academic: true,
        experience: true,
        training: true,
        languages: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const { data, setData, post, processing, errors } = useForm({
        _method: 'POST',
        photo: null as File | null,
        father_name: cvProfile.father_name || '',
        mother_name: cvProfile.mother_name || '',
        dob: cvProfile.dob || '',
        pob: cvProfile.pob || '',
        nationality: cvProfile.nationality || 'Bangladeshi',
        gender: cvProfile.gender || 'Male',
        marital_status: cvProfile.marital_status || 'Married',
        religion: cvProfile.religion || 'Islam',
        height: cvProfile.height || '',
        weight: cvProfile.weight || '',
        passport_expiry: cvProfile.passport_expiry || '',
        passport_issue_place: cvProfile.passport_issue_place || 'Dhaka',
        village_area: cvProfile.village_area || '',
        post_office: cvProfile.post_office || '',
        police_station: cvProfile.police_station || '',
        district: cvProfile.district || '',
        country: cvProfile.country || 'Bangladesh',
        email: cvProfile.email || user.email || '',
        languages: cvProfile.languages || ['Bangla', 'English'],
        qualifications: cvProfile.qualifications.length > 0 ? cvProfile.qualifications : [
            { degree: '', institution: '', passing_year: '', result_grade: '' }
        ],
        experiences: cvProfile.experiences.length > 0 ? cvProfile.experiences : [
            { job_title: '', company: '', country: '', start_date: '', end_date: '', is_current: false }
        ],
        trainings: cvProfile.trainings.length > 0 ? cvProfile.trainings : [
            { course_name: '', institute: '', duration: '' }
        ],
    });

    const liveTotalExperience = useMemo(() => {
        let totalMonths = 0;
        data.experiences.forEach((exp) => {
            if (exp.start_date) {
                const start = new Date(exp.start_date);
                const end = exp.is_current || !exp.end_date ? new Date() : new Date(exp.end_date);
                if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
                    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                    totalMonths += Math.max(0, diffMonths);
                }
            }
        });

        if (totalMonths <= 0) return '0 years';
        const yrs = Math.floor(totalMonths / 12);
        const mos = totalMonths % 12;
        if (yrs > 0 && mos > 0) return `${yrs} yrs ${mos} mos`;
        if (yrs > 0) return `${yrs} yrs`;
        return `${mos} mos`;
    }, [data.experiences]);

    const addQualification = () => {
        setData('qualifications', [
            ...data.qualifications,
            { degree: '', institution: '', passing_year: '', result_grade: '' },
        ]);
    };

    const removeQualification = (index: number) => {
        setData('qualifications', data.qualifications.filter((_, i) => i !== index));
    };

    const updateQualification = (index: number, field: keyof Qualification, value: string) => {
        const updated = [...data.qualifications];
        updated[index] = { ...updated[index], [field]: value };
        setData('qualifications', updated);
    };

    const addExperience = () => {
        setData('experiences', [
            ...data.experiences,
            { job_title: '', company: '', country: '', start_date: '', end_date: '', is_current: false },
        ]);
    };

    const removeExperience = (index: number) => {
        setData('experiences', data.experiences.filter((_, i) => i !== index));
    };

    const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
        const updated = [...data.experiences];
        updated[index] = { ...updated[index], [field]: value };
        setData('experiences', updated);
    };

    const addTraining = () => {
        setData('trainings', [
            ...data.trainings,
            { course_name: '', institute: '', duration: '' },
        ]);
    };

    const removeTraining = (index: number) => {
        setData('trainings', data.trainings.filter((_, i) => i !== index));
    };

    const updateTraining = (index: number, field: keyof Training, value: string) => {
        const updated = [...data.trainings];
        updated[index] = { ...updated[index], [field]: value };
        setData('trainings', updated);
    };

    const toggleLanguage = (lang: string) => {
        if (data.languages.includes(lang)) {
            setData('languages', data.languages.filter((l) => l !== lang));
        } else {
            setData('languages', [...data.languages, lang]);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/my-cv');
    };

    return (
        <div className="min-h-screen bg-surface font-sans text-ink-900 flex flex-col">
            <Head title="My Standard Manpower CV" />

            {/* Header */}
            <header className="bg-brand-900 border-b border-white/10 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                    <Link href="/jobs">
                        <BrandLogo variant="light" subtitle="Candidate Dashboard" />
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/jobs"
                            className="text-xs font-semibold text-brand-200 hover:text-white"
                        >
                            Browse Jobs
                        </Link>
                        <Link
                            href="/portal/applications"
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        >
                            Admin Switch
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 space-y-6 pb-20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link href="/jobs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-brand-800 mb-1">
                            <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to Jobs Portal
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
                            My Standard Manpower CV
                        </h1>
                        <p className="text-sm text-ink-500">
                            Build your comprehensive profile once. Agencies and foreign employers will view this standardized CV.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/portal/cvs/${cvProfile.id}/export`}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-line text-ink-700 hover:bg-surface shadow-sm"
                        >
                            <PrinterIcon className="h-4 w-4" /> Preview Standard PDF
                        </Link>
                        <button
                            type="button"
                            onClick={submit}
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-brand-800 text-white hover:bg-brand-700 shadow-sm transition disabled:opacity-60"
                        >
                            <SaveIcon className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Save My CV'}
                        </button>
                    </div>
                </div>

                {/* Auto-filled Core info */}
                <div className="bg-brand-50/70 rounded-2xl border border-brand-200 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
                        <LockIcon className="h-3.5 w-3.5 text-brand-700" />
                        Core Profile Information (Auto-synced from User Account)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-white p-3 rounded-xl border border-brand-100">
                            <span className="text-[11px] font-medium text-ink-500 block">Candidate Name</span>
                            <span className="font-bold text-ink-900 text-sm">{user.name}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-brand-100">
                            <span className="text-[11px] font-medium text-ink-500 block">Passport Number</span>
                            <span className="font-mono font-bold text-ink-900 text-sm">{user.passport_number || 'N/A'}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-brand-100">
                            <span className="text-[11px] font-medium text-ink-500 block">Mobile Number</span>
                            <span className="font-mono font-bold text-ink-900 text-sm">{user.phone || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* 1. PERSONAL INFORMATION */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('personal')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-brand-50 text-brand-800">
                                    <UserIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Personal Information</h3>
                                    <p className="text-xs text-ink-500">Applicant Photo, parents' names, date of birth, physical statistics</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.personal ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.personal && (
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-6 p-4 rounded-xl border border-dashed border-line bg-surface/30">
                                    {cvProfile.photo_path ? (
                                        <img
                                            src={cvProfile.photo_path}
                                            alt="Candidate"
                                            className="w-20 h-24 object-cover rounded-lg border border-line shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-20 h-24 rounded-lg bg-ink-100 flex items-center justify-center text-ink-400 border border-line">
                                            <UploadIcon className="h-6 w-6" />
                                        </div>
                                    )}
                                    <div className="space-y-1.5 flex-1">
                                        <label className="block text-sm font-semibold text-ink-900">
                                            Upload Passport-Size Photo (JPG / PNG)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => setData('photo', e.target.files?.[0] || null)}
                                            className="text-xs text-ink-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-800"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Father's Name</label>
                                        <input
                                            type="text"
                                            value={data.father_name}
                                            onChange={(e) => setData('father_name', e.target.value)}
                                            placeholder="Father's full name"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Mother's Name</label>
                                        <input
                                            type="text"
                                            value={data.mother_name}
                                            onChange={(e) => setData('mother_name', e.target.value)}
                                            placeholder="Mother's full name"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            value={data.dob}
                                            onChange={(e) => setData('dob', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Place of Birth</label>
                                        <input
                                            type="text"
                                            value={data.pob}
                                            onChange={(e) => setData('pob', e.target.value)}
                                            placeholder="District / City"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Gender</label>
                                        <select
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Marital Status</label>
                                        <select
                                            value={data.marital_status}
                                            onChange={(e) => setData('marital_status', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        >
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Height</label>
                                        <input
                                            type="text"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                            placeholder="e.g. 5 ft 8 in"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Weight</label>
                                        <input
                                            type="text"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            placeholder="e.g. 68 kg"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. PASSPORT INFORMATION */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('passport')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-accent-50 text-accent-700">
                                    <ShieldIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Passport Information</h3>
                                    <p className="text-xs text-ink-500">Passport Number, expiry date, place of issue</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.passport ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.passport && (
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Passport Number</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={user.passport_number || 'N/A'}
                                            className="w-full text-sm font-mono font-bold rounded-lg border-line bg-ink-100 text-ink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Passport Expiry Date</label>
                                        <input
                                            type="date"
                                            value={data.passport_expiry}
                                            onChange={(e) => setData('passport_expiry', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Place of Issue</label>
                                        <input
                                            type="text"
                                            value={data.passport_issue_place}
                                            onChange={(e) => setData('passport_issue_place', e.target.value)}
                                            placeholder="e.g. Dhaka"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. ADDRESS */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('address')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-brand-50 text-brand-800">
                                    <MapPinIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Address Information</h3>
                                    <p className="text-xs text-ink-500">Village, Upazila, District, Country</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.address ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.address && (
                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Village / Area</label>
                                        <input
                                            type="text"
                                            value={data.village_area}
                                            onChange={(e) => setData('village_area', e.target.value)}
                                            placeholder="Village / Ward"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Post Office</label>
                                        <input
                                            type="text"
                                            value={data.post_office}
                                            onChange={(e) => setData('post_office', e.target.value)}
                                            placeholder="Post Office"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Police Station / Upazila</label>
                                        <input
                                            type="text"
                                            value={data.police_station}
                                            onChange={(e) => setData('police_station', e.target.value)}
                                            placeholder="Upazila"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">District</label>
                                        <input
                                            type="text"
                                            value={data.district}
                                            onChange={(e) => setData('district', e.target.value)}
                                            placeholder="District"
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Country</label>
                                        <select
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface"
                                        >
                                            {manpowerCountries.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 4. ACADEMIC QUALIFICATIONS */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('academic')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-brand-50 text-brand-800">
                                    <GraduationCapIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Academic Qualifications</h3>
                                    <p className="text-xs text-ink-500">Add degree, school/board, passing year</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.academic ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.academic && (
                            <div className="p-6 space-y-3">
                                {data.qualifications.map((q, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-surface rounded-xl border border-line">
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 w-full">
                                            <input
                                                type="text"
                                                placeholder="Degree (e.g. SSC)"
                                                value={q.degree}
                                                onChange={(e) => updateQualification(idx, 'degree', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution / Board"
                                                value={q.institution}
                                                onChange={(e) => updateQualification(idx, 'institution', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Year"
                                                value={q.passing_year}
                                                onChange={(e) => updateQualification(idx, 'passing_year', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Result"
                                                value={q.result_grade || ''}
                                                onChange={(e) => updateQualification(idx, 'result_grade', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeQualification(idx)}
                                            className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg"
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addQualification}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 text-brand-800"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" /> Add Qualification
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 5. WORK EXPERIENCE */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('experience')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-accent-50 text-accent-700">
                                    <BriefcaseIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Work Experience</h3>
                                    <p className="text-xs text-ink-500">
                                        Total experience calculated:{' '}
                                        <span className="font-bold text-accent-700">{liveTotalExperience}</span>
                                    </p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.experience ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.experience && (
                            <div className="p-6 space-y-4">
                                {data.experiences.map((exp, idx) => (
                                    <div key={idx} className="p-4 bg-surface rounded-xl border border-line space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Job Title / Trade"
                                                value={exp.job_title}
                                                onChange={(e) => updateExperience(idx, 'job_title', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Country (e.g. UAE / BD)"
                                                value={exp.country || ''}
                                                onChange={(e) => updateExperience(idx, 'country', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                                            <input
                                                type="date"
                                                value={exp.start_date || ''}
                                                onChange={(e) => updateExperience(idx, 'start_date', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="date"
                                                disabled={exp.is_current}
                                                value={exp.end_date || ''}
                                                onChange={(e) => updateExperience(idx, 'end_date', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white disabled:bg-ink-100"
                                            />
                                            <div className="flex items-center justify-between">
                                                <label className="flex items-center gap-2 text-xs font-semibold text-ink-700">
                                                    <input
                                                        type="checkbox"
                                                        checked={exp.is_current || false}
                                                        onChange={(e) => updateExperience(idx, 'is_current', e.target.checked)}
                                                        className="rounded text-brand-800"
                                                    />
                                                    Currently Working
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => removeExperience(idx)}
                                                    className="p-1.5 text-danger-600 hover:bg-danger-50 rounded-lg"
                                                >
                                                    <Trash2Icon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent-50 text-accent-700"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" /> Add Experience Row
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 6. TRAINING */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('training')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-brand-50 text-brand-800">
                                    <AwardIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Technical Training</h3>
                                    <p className="text-xs text-ink-500">Trade course, training institute, duration</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.training ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.training && (
                            <div className="p-6 space-y-3">
                                {data.trainings.map((t, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-surface rounded-xl border border-line">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                                            <input
                                                type="text"
                                                placeholder="Course / Trade"
                                                value={t.course_name}
                                                onChange={(e) => updateTraining(idx, 'course_name', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institute"
                                                value={t.institute}
                                                onChange={(e) => updateTraining(idx, 'institute', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Duration (e.g. 3 Months)"
                                                value={t.duration}
                                                onChange={(e) => updateTraining(idx, 'duration', e.target.value)}
                                                className="text-sm rounded-lg border-line bg-white"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTraining(idx)}
                                            className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg"
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addTraining}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 text-brand-800"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" /> Add Training
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 7. LANGUAGES */}
                    <div className="bg-white rounded-2xl border border-line shadow-card overflow-hidden">
                        <button
                            type="button"
                            onClick={() => toggleSection('languages')}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-surface/50 border-b border-line hover:bg-surface transition"
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-brand-50 text-brand-800">
                                    <LanguagesIcon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-bold text-ink-900">Languages Known</h3>
                                    <p className="text-xs text-ink-500">Select all languages you speak</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.languages ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.languages && (
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2.5">
                                    {LANGUAGE_OPTIONS.map((lang) => {
                                        const checked = data.languages.includes(lang);
                                        return (
                                            <button
                                                key={lang}
                                                type="button"
                                                onClick={() => toggleLanguage(lang)}
                                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
                                                    checked
                                                        ? 'bg-brand-800 text-white border-brand-800'
                                                        : 'bg-surface text-ink-700 border-line hover:border-brand-300'
                                                }`}
                                            >
                                                {checked ? '✓ ' : '+ '}
                                                {lang}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-800 text-white hover:bg-brand-700 shadow-sm transition disabled:opacity-60"
                        >
                            <SaveIcon className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Save My CV Profile'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

