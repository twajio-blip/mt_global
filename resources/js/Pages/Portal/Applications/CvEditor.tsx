import React, { useState, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    SaveIcon,
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
    LockIcon,
    XIcon,
} from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';

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
    salary?: string;
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

interface CvProfileData {
    id: number;
    user_id: number;
    user_name: string;
    user_passport: string;
    user_phone: string;
    user_email: string;
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
}

interface CountryOption {
    id: number;
    name: string;
    code?: string;
}

interface Props {
    cvProfile: CvProfileData;
    countries?: CountryOption[];
    manpowerCountries?: string[];
}

const COMMON_LANGUAGES = ['Bangla', 'English', 'Arabic', 'Hindi', 'Urdu', 'French'];

export default function CvEditor({ cvProfile, countries, manpowerCountries }: Props) {
    // Accordion state toggles
    const [openSections, setOpenSections] = useState({
        personal: true,
        passport: true,
        address: true,
        academic: true,
        experience: true,
        training: true,
        languages: true,
    });

    const [newLangInput, setNewLangInput] = useState('');

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const countriesList = useMemo(() => {
        if (countries && countries.length > 0) return countries;
        if (manpowerCountries && manpowerCountries.length > 0) {
            return manpowerCountries.map((c, i) => ({ id: i + 1, name: c }));
        }
        return [
            { id: 1, name: 'Bangladesh' },
            { id: 2, name: 'Saudi Arabia' },
            { id: 3, name: 'United Arab Emirates' },
            { id: 4, name: 'Qatar' },
            { id: 5, name: 'Oman' },
            { id: 6, name: 'Kuwait' },
            { id: 7, name: 'Bahrain' },
            { id: 8, name: 'Malaysia' },
            { id: 9, name: 'Singapore' },
        ];
    }, [countries, manpowerCountries]);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'POST',
        user_name: cvProfile.user_name || '',
        user_phone: cvProfile.user_phone || '',
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
        email: cvProfile.email || cvProfile.user_email || '',
        languages: cvProfile.languages && cvProfile.languages.length > 0 ? cvProfile.languages : ['Bangla', 'English'],
        qualifications: cvProfile.qualifications.length > 0 ? cvProfile.qualifications : [
            { degree: '', institution: '', passing_year: '', result_grade: '' }
        ],
        experiences: cvProfile.experiences.length > 0 ? cvProfile.experiences : [
            { job_title: '', company: '', country: 'Bangladesh', salary: '', start_date: '', end_date: '', is_current: false }
        ],
        trainings: cvProfile.trainings.length > 0 ? cvProfile.trainings : [
            { course_name: '', institute: '', duration: '' }
        ],
    });

    // Dynamic Live Total Experience Calculation
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

    // Dynamic List Handlers - Qualifications
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

    // Dynamic List Handlers - Experiences
    const addExperience = () => {
        setData('experiences', [
            ...data.experiences,
            { job_title: '', company: '', country: 'Bangladesh', salary: '', start_date: '', end_date: '', is_current: false },
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

    // Dynamic List Handlers - Trainings
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

    // Languages Handlers
    const toggleLanguage = (lang: string) => {
        if (data.languages.includes(lang)) {
            setData('languages', data.languages.filter((l) => l !== lang));
        } else {
            setData('languages', [...data.languages, lang]);
        }
    };

    const handleAddCustomLanguage = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = newLangInput.trim();
        if (!trimmed) return;
        if (!data.languages.some((l) => l.toLowerCase() === trimmed.toLowerCase())) {
            setData('languages', [...data.languages, trimmed]);
        }
        setNewLangInput('');
    };

    const handleRemoveLanguage = (lang: string) => {
        setData('languages', data.languages.filter((l) => l !== lang));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/portal/cvs/${cvProfile.id}`);
    };

    return (
        <PortalLayout title="Manpower CV Profile Editor">
            <Head title={`Edit CV - ${data.user_name || cvProfile.user_name}`} />

            <div className="space-y-6 max-w-5xl mx-auto pb-16">
                {/* Top Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/portal/applications?tab=cvs"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-brand-800 mb-1"
                        >
                            <ArrowLeftIcon className="h-3.5 w-3.5" /> Back to Created CVs
                        </Link>
                        <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                            Manpower CV Profile: {data.user_name || cvProfile.user_name}
                        </h2>
                        <p className="text-sm text-ink-500">
                            Complete the structured fields below to generate the standardized manpower PDF CV.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/portal/cvs/${cvProfile.id}/export`}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-white border border-line text-ink-700 hover:bg-surface shadow-sm"
                        >
                            <PrinterIcon className="h-4 w-4" /> Standard Manpower PDF
                        </Link>
                        <button
                            type="button"
                            onClick={submit}
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-brand-800 text-white hover:bg-brand-700 shadow-sm transition disabled:opacity-60"
                        >
                            <SaveIcon className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Save CV Profile'}
                        </button>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Editable Core Account Data Banner */}
                    <div className="bg-brand-50/70 rounded-2xl border border-brand-200 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-xs font-bold text-brand-900 uppercase tracking-wider">
                                <UserIcon className="h-4 w-4 text-brand-700" />
                                Candidate Core User Information
                            </div>
                            <span className="text-[11px] text-brand-800 font-medium">
                                Updates candidate master record & CV
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-ink-800 mb-1">
                                    Full Name <span className="text-danger-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.user_name}
                                    onChange={(e) => setData('user_name', e.target.value)}
                                    placeholder="e.g. Md Sumon Ali"
                                    className="w-full text-sm rounded-lg border-line bg-white text-ink-900 font-semibold focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                                    required
                                />
                                {errors.user_name && <p className="text-xs text-danger-500 mt-1">{errors.user_name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-ink-800 mb-1 flex items-center justify-between">
                                    <span>Passport Number</span>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-ink-500 font-normal">
                                        <LockIcon className="h-2.5 w-2.5" /> Read-only
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={cvProfile.user_passport || 'Not set'}
                                    className="w-full text-sm rounded-lg border-line bg-ink-100 text-ink-600 font-mono font-bold cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-ink-800 mb-1">
                                    Mobile Number <span className="text-danger-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.user_phone}
                                    onChange={(e) => setData('user_phone', e.target.value)}
                                    placeholder="e.g. 01712345678"
                                    className="w-full text-sm rounded-lg border-line bg-white text-ink-900 font-mono font-semibold focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                                    required
                                />
                                {errors.user_phone && <p className="text-xs text-danger-500 mt-1">{errors.user_phone}</p>}
                            </div>
                        </div>
                    </div>

                    {/* ==================== 1. PERSONAL INFORMATION ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">1. Personal Information</h3>
                                    <p className="text-xs text-ink-500">Applicant Photo, parents, birth, physical parameters</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.personal ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.personal && (
                            <div className="p-6 space-y-5">
                                {/* Photo Upload */}
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
                                            Applicant Photo (Passport-size, JPG or PNG)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => setData('photo', e.target.files?.[0] || null)}
                                            className="text-xs text-ink-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-800 hover:file:bg-brand-100"
                                        />
                                        <p className="text-[11px] text-ink-400">Will be featured on the standard manpower PDF top corner.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Father's Name</label>
                                        <input
                                            type="text"
                                            value={data.father_name}
                                            onChange={(e) => setData('father_name', e.target.value)}
                                            placeholder="e.g. Md Soleman Ali"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Mother's Name</label>
                                        <input
                                            type="text"
                                            value={data.mother_name}
                                            onChange={(e) => setData('mother_name', e.target.value)}
                                            placeholder="e.g. Mst Joygon Neca"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            value={data.dob}
                                            onChange={(e) => setData('dob', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Place of Birth</label>
                                        <input
                                            type="text"
                                            value={data.pob}
                                            onChange={(e) => setData('pob', e.target.value)}
                                            placeholder="e.g. Pabna / Cumilla"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Nationality</label>
                                        <input
                                            type="text"
                                            value={data.nationality}
                                            onChange={(e) => setData('nationality', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Gender</label>
                                        <select
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
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
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        >
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Religion</label>
                                        <input
                                            type="text"
                                            value={data.religion}
                                            onChange={(e) => setData('religion', e.target.value)}
                                            placeholder="e.g. Islam / Hinduism"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Height</label>
                                        <input
                                            type="text"
                                            value={data.height}
                                            onChange={(e) => setData('height', e.target.value)}
                                            placeholder="e.g. 5 Feet 5 Inches"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Weight</label>
                                        <input
                                            type="text"
                                            value={data.weight}
                                            onChange={(e) => setData('weight', e.target.value)}
                                            placeholder="e.g. 58 KGS"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ==================== 2. PASSPORT INFORMATION ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">2. Passport Information</h3>
                                    <p className="text-xs text-ink-500">Dates, place of issue, passport number</p>
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
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">
                                            Passport Number (From Core User)
                                        </label>
                                        <input
                                            type="text"
                                            disabled
                                            value={cvProfile.user_passport || ''}
                                            className="w-full text-sm rounded-lg border-line bg-ink-100 text-ink-500 font-mono font-bold cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Passport Expiry Date</label>
                                        <input
                                            type="date"
                                            value={data.passport_expiry}
                                            onChange={(e) => setData('passport_expiry', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Place of Issue</label>
                                        <input
                                            type="text"
                                            value={data.passport_issue_place}
                                            onChange={(e) => setData('passport_issue_place', e.target.value)}
                                            placeholder="e.g. DHAKA"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ==================== 3. ADDRESS & CONTACT ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">3. Address & Contact Information</h3>
                                    <p className="text-xs text-ink-500">Village, Upazila, District, Country dropdown</p>
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
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Village / Area (Vill.)</label>
                                        <input
                                            type="text"
                                            value={data.village_area}
                                            onChange={(e) => setData('village_area', e.target.value)}
                                            placeholder="e.g. NUR JAMAL"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Post Office (P.O.)</label>
                                        <input
                                            type="text"
                                            value={data.post_office}
                                            onChange={(e) => setData('post_office', e.target.value)}
                                            placeholder="e.g. MULADULI - 6623"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Police Station / Upazila (P.S.)</label>
                                        <input
                                            type="text"
                                            value={data.police_station}
                                            onChange={(e) => setData('police_station', e.target.value)}
                                            placeholder="e.g. ISHWARDI"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">District (Dist.)</label>
                                        <input
                                            type="text"
                                            value={data.district}
                                            onChange={(e) => setData('district', e.target.value)}
                                            placeholder="e.g. PABNA"
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Country</label>
                                        <select
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        >
                                            {countriesList.map((c) => (
                                                <option key={c.id || c.name} value={c.name}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-ink-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ==================== 4. ACADEMIC QUALIFICATIONS (DYNAMIC LIST & LABELED RESULT) ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">
                                        4. Academic Qualifications ({data.qualifications.length} Entries)
                                    </h3>
                                    <p className="text-xs text-ink-500">Add or edit certificates with explicit degree, institution, passing year & result labels</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.academic ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.academic && (
                            <div className="p-6 space-y-4">
                                {data.qualifications.map((q, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-end gap-3 p-3.5 bg-surface rounded-xl border border-line">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1 w-full">
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Degree / Examination
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. S.S.C, H.S.C, Class VIII"
                                                    value={q.degree}
                                                    onChange={(e) => updateQualification(idx, 'degree', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Institution / Board
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Rajshahi Board / Technical Board"
                                                    value={q.institution}
                                                    onChange={(e) => updateQualification(idx, 'institution', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Passing Year
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 2018"
                                                    value={q.passing_year}
                                                    onChange={(e) => updateQualification(idx, 'passing_year', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Result / Grade
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. GPA 4.5 / Passed"
                                                    value={q.result_grade || ''}
                                                    onChange={(e) => updateQualification(idx, 'result_grade', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeQualification(idx)}
                                            className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition mb-0.5"
                                            title="Remove Qualification"
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addQualification}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 text-brand-800 hover:bg-brand-100 transition"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" /> Add Qualification
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ==================== 5. WORK EXPERIENCE (SALARY & COUNTRY DROPDOWN) ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">
                                        5. Work Experience ({data.experiences.length} Entries)
                                    </h3>
                                    <p className="text-xs text-ink-500">
                                        Job title, company, country dropdown, editable salary & live total: <span className="font-bold text-accent-700">{liveTotalExperience}</span>
                                    </p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.experience ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.experience && (
                            <div className="p-6 space-y-4">
                                <div className="p-3 bg-accent-50 rounded-xl border border-accent-200 flex items-center justify-between text-xs text-accent-800 font-semibold">
                                    <span>Calculated total from dates below:</span>
                                    <span className="text-sm font-bold">{liveTotalExperience}</span>
                                </div>

                                {data.experiences.map((exp, idx) => (
                                    <div key={idx} className="p-4 bg-surface rounded-xl border border-line space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">Position / Job Title</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. TRANSMISSION LINEMAN"
                                                    value={exp.job_title}
                                                    onChange={(e) => updateExperience(idx, 'job_title', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">Company Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. SOHEL ENGINEERING"
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">Country</label>
                                                <select
                                                    value={exp.country || ''}
                                                    onChange={(e) => updateExperience(idx, 'country', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                >
                                                    <option value="">Select Country</option>
                                                    {countriesList.map((c) => (
                                                        <option key={c.id || c.name} value={c.name}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">Salary</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 30000 BDT / 1500 SAR"
                                                    value={exp.salary || ''}
                                                    onChange={(e) => updateExperience(idx, 'salary', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={exp.start_date || ''}
                                                    onChange={(e) => updateExperience(idx, 'start_date', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    disabled={exp.is_current}
                                                    value={exp.end_date || ''}
                                                    onChange={(e) => updateExperience(idx, 'end_date', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white disabled:bg-ink-100 disabled:text-ink-400"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between pt-5">
                                                <label className="flex items-center gap-2 text-xs font-semibold text-ink-700 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={exp.is_current || false}
                                                        onChange={(e) => updateExperience(idx, 'is_current', e.target.checked)}
                                                        className="rounded text-brand-800 focus:ring-brand-500"
                                                    />
                                                    Currently Working Here
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => removeExperience(idx)}
                                                    className="p-1.5 text-danger-600 hover:bg-danger-50 rounded-lg"
                                                    title="Remove Experience"
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
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent-50 text-accent-700 hover:bg-accent-100 transition"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" /> Add Experience Row
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ==================== 6. TRAINING (DYNAMIC LIST WITH LABELS) ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">6. Technical & Vocational Training</h3>
                                    <p className="text-xs text-ink-500">Course / Trade, Training Institute, and Duration</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.training ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.training && (
                            <div className="p-6 space-y-4">
                                {data.trainings.map((t, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-end gap-3 p-3.5 bg-surface rounded-xl border border-line">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Course / Trade
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Building Electrician / Lineman"
                                                    value={t.course_name}
                                                    onChange={(e) => updateTraining(idx, 'course_name', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Training Institute
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. BKTTC / Technical Training Centre"
                                                    value={t.institute}
                                                    onChange={(e) => updateTraining(idx, 'institute', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold text-ink-700 mb-1">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 6 Months / 360 Hrs"
                                                    value={t.duration}
                                                    onChange={(e) => updateTraining(idx, 'duration', e.target.value)}
                                                    className="w-full text-sm rounded-lg border-line bg-white"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTraining(idx)}
                                            className="p-2 text-danger-600 hover:bg-danger-50 rounded-lg transition mb-0.5"
                                            title="Remove Training"
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={addTraining}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-50 text-brand-800 hover:bg-brand-100 transition"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" /> Add Training
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ==================== 7. LANGUAGES KNOWN (CUSTOM ADDABLE JSON ARRAY) ==================== */}
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
                                    <h3 className="text-base font-bold text-ink-900">7. Languages Known ({data.languages.length})</h3>
                                    <p className="text-xs text-ink-500">Add or toggle languages (stored as JSON array in candidate CV profile)</p>
                                </div>
                            </div>
                            <span className="text-ink-400">
                                {openSections.languages ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </span>
                        </button>

                        {openSections.languages && (
                            <div className="p-6 space-y-5">
                                {/* Currently Selected Languages Display */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">
                                        Active Languages on CV:
                                    </label>
                                    {data.languages.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {data.languages.map((lang) => (
                                                <span
                                                    key={lang}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold bg-brand-800 text-white shadow-sm"
                                                >
                                                    {lang}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveLanguage(lang)}
                                                        className="hover:bg-brand-700 p-0.5 rounded-full transition"
                                                        title={`Remove ${lang}`}
                                                    >
                                                        <XIcon className="h-3.5 w-3.5" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-ink-400 italic">No languages selected yet.</p>
                                    )}
                                </div>

                                {/* Custom Language Input */}
                                <div className="pt-2 border-t border-line">
                                    <label className="block text-xs font-semibold text-ink-700 mb-1.5">
                                        Add Custom Language
                                    </label>
                                    <div className="flex gap-2 max-w-md">
                                        <input
                                            type="text"
                                            value={newLangInput}
                                            onChange={(e) => setNewLangInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddCustomLanguage();
                                                }
                                            }}
                                            placeholder="Type language name (e.g. Japanese, German)"
                                            className="flex-1 text-sm rounded-lg border-line bg-surface text-ink-900"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleAddCustomLanguage()}
                                            disabled={!newLangInput.trim()}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-800 text-white hover:bg-brand-700 disabled:opacity-40 transition"
                                        >
                                            <PlusIcon className="h-3.5 w-3.5" /> Add
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Suggestions */}
                                <div>
                                    <label className="block text-[11px] font-semibold text-ink-500 mb-2">
                                        Quick Presets:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {COMMON_LANGUAGES.map((lang) => {
                                            const active = data.languages.includes(lang);
                                            return (
                                                <button
                                                    key={lang}
                                                    type="button"
                                                    onClick={() => toggleLanguage(lang)}
                                                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                                                        active
                                                            ? 'bg-brand-100 text-brand-900 border-brand-300'
                                                            : 'bg-surface text-ink-600 border-line hover:border-brand-300'
                                                    }`}
                                                >
                                                    {active ? '✓ ' : '+ '}
                                                    {lang}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="pt-4 flex items-center justify-end gap-3">
                        <Link
                            href="/portal/applications?tab=cvs"
                            className="px-4 py-2 text-sm font-semibold text-ink-600 hover:text-ink-900"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-brand-800 text-white hover:bg-brand-700 shadow-sm transition disabled:opacity-60"
                        >
                            <SaveIcon className="h-4 w-4" />
                            {processing ? 'Saving...' : 'Save CV Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}
