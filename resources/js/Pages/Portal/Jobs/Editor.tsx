import React, { useMemo, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, SaveIcon, LanguagesIcon } from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { FormSection } from '../../../Components/FormSection';
import { FormField } from '../../../Components/FormField';
import { SelectField } from '../../../Components/SelectField';
import { ToggleField } from '../../../Components/ToggleField';
import { buttonPrimary, buttonSecondary, inputClass, inputErrorClass } from '../../../utils/styles';

interface Country {
    id: number;
    name: string;
    name_bn?: string;
}

interface Designation {
    id: number;
    name: string;
    name_bn?: string;
}

interface JobData {
    id?: number;
    title_en: string;
    title_bn?: string;
    prefix: string;
    serial_number?: number;
    job_code?: string;
    country_id: number | '';
    designation_id: number | '';
    employer_name: string;
    employer_name_bn?: string;
    location?: string;
    location_bn?: string;
    vacancy?: number | '';
    salary?: string;
    salary_bn?: string;
    contract_duration?: string;
    contract_duration_bn?: string;
    working_hours?: string;
    working_hours_bn?: string;
    interview_date?: string;
    interview_type: string;
    interview_venue?: string;
    interview_venue_bn?: string;
    req_experience?: string;
    req_experience_bn?: string;
    req_education?: string;
    req_education_bn?: string;
    req_age?: string;
    req_age_bn?: string;
    req_gender: string;
    desc_en?: string;
    desc_bn?: string;
    req_candidate_en?: string;
    req_candidate_bn?: string;
    responsibilities_en?: string;
    responsibilities_bn?: string;
    additional_info_en?: string;
    additional_info_bn?: string;
    benefits?: {
        accommodation?: boolean;
        food?: boolean;
        transportation?: boolean;
        insurance?: boolean;
        airTicket?: boolean;
        overtime?: boolean;
    };
    visa_fee_type: string;
    visa_type?: string;
    visa_notes_en?: string;
    visa_notes_bn?: string;
    application_deadline?: string;
    status: string;
}

interface Props {
    job: JobData | null;
    countries: Country[];
    designations: Designation[];
    nextSerialFormatted: string;
}

const interviewTypeOptions = [
    { value: 'To be announced', label: 'To be announced' },
    { value: 'Delegation Interview', label: 'Delegation Interview' },
    { value: 'Online Interview', label: 'Online Interview' },
    { value: 'CV Selection / Pushing', label: 'CV Selection / Pushing' },
];

const genderOptions = [
    { value: 'Not applicable', label: 'Not applicable' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Male / Female', label: 'Male / Female' },
];

const visaFeeOptions = [
    { value: 'Visa Fee', label: 'Visa Fee (Subject to Conditions)' },
    { value: 'Visa Fee (All Costs Included)', label: 'Visa Fee (All Costs Included)' },
];

const statusOptions = [
    { value: 'Draft', label: 'Draft — Only visible in portal' },
    { value: 'Published', label: 'Published — Live on website' },
    { value: 'Inactive', label: 'Inactive — Hidden, kept for records' },
];

export default function JobEditor({ job, countries, designations, nextSerialFormatted }: Props) {
    const isEdit = Boolean(job?.id);
    const [langTab, setLangTab] = useState<'both' | 'en' | 'bn'>('both');

    const { data, setData, post, put, processing, errors } = useForm({
        title_en: job?.title_en || '',
        title_bn: job?.title_bn || '',
        prefix: job?.prefix || 'HR',
        country_id: job?.country_id || (countries[0]?.id || ''),
        designation_id: job?.designation_id || (designations[0]?.id || ''),
        employer_name: job?.employer_name || '',
        employer_name_bn: job?.employer_name_bn || '',
        location: job?.location || '',
        location_bn: job?.location_bn || '',
        vacancy: job?.vacancy ?? '',
        salary: job?.salary || '',
        salary_bn: job?.salary_bn || '',
        contract_duration: job?.contract_duration || '',
        contract_duration_bn: job?.contract_duration_bn || '',
        working_hours: job?.working_hours || '',
        working_hours_bn: job?.working_hours_bn || '',
        interview_date: job?.interview_date || '',
        interview_type: job?.interview_type || 'To be announced',
        interview_venue: job?.interview_venue || '',
        interview_venue_bn: job?.interview_venue_bn || '',
        req_experience: job?.req_experience || '',
        req_experience_bn: job?.req_experience_bn || '',
        req_education: job?.req_education || '',
        req_education_bn: job?.req_education_bn || '',
        req_age: job?.req_age || '',
        req_age_bn: job?.req_age_bn || '',
        req_gender: job?.req_gender || 'Not applicable',
        desc_en: job?.desc_en || '',
        desc_bn: job?.desc_bn || '',
        req_candidate_en: job?.req_candidate_en || '',
        req_candidate_bn: job?.req_candidate_bn || '',
        responsibilities_en: job?.responsibilities_en || '',
        responsibilities_bn: job?.responsibilities_bn || '',
        additional_info_en: job?.additional_info_en || '',
        additional_info_bn: job?.additional_info_bn || '',
        benefits: {
            accommodation: job?.benefits?.accommodation ?? true,
            food: job?.benefits?.food ?? true,
            transportation: job?.benefits?.transportation ?? true,
            insurance: job?.benefits?.insurance ?? true,
            airTicket: job?.benefits?.airTicket ?? true,
            overtime: job?.benefits?.overtime ?? true,
        },
        visa_fee_type: job?.visa_fee_type || 'Visa Fee (All Costs Included)',
        visa_type: job?.visa_type || 'Employment / Work Visa',
        visa_notes_en: job?.visa_notes_en || '',
        visa_notes_bn: job?.visa_notes_bn || '',
        application_deadline: job?.application_deadline || '',
        status: job?.status || 'Published',
    });

    const previewCode = useMemo(() => {
        const clean = (data.prefix || 'JOB').toUpperCase().trim();
        return `${clean}-${nextSerialFormatted}`;
    }, [data.prefix, nextSerialFormatted]);

    const setBenefit = (key: keyof typeof data.benefits, val: boolean) => {
        setData('benefits', {
            ...data.benefits,
            [key]: val,
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/portal/jobs/${job!.id}`);
        } else {
            post('/portal/jobs');
        }
    };

    const countryOptions = countries.map((c) => ({
        value: String(c.id),
        label: c.name_bn ? `${c.name} · ${c.name_bn}` : c.name,
    }));

    const designationOptions = designations.map((d) => ({
        value: String(d.id),
        label: d.name_bn ? `${d.name} · ${d.name_bn}` : d.name,
    }));

    const showEn = !isEdit || langTab === 'en' || langTab === 'both';
    const showBn = !isEdit || langTab === 'bn' || langTab === 'both';

    return (
        <PortalLayout>
            <Head title={isEdit ? `Edit Job ${job?.job_code}` : 'Add New Job'} />

            <div className="pb-24">
                <Link
                    href="/portal/jobs"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-800"
                >
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Back to Jobs
                </Link>

                <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink-900 md:text-[28px]">
                    {isEdit ? `Edit Job: ${job?.job_code}` : 'Add New Job'}
                </h1>
                <p className="mt-1 text-[15px] text-ink-600">
                    Fields left empty are hidden on the public job page. Required fields are marked{' '}
                    <span className="text-danger-600">*</span>
                </p>

                {/* Top Language Toggle Switcher (Edit Mode Only) */}
                {isEdit && (
                    <div className="mt-6 max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-800 ring-1 ring-brand-100">
                                <LanguagesIcon className="h-5 w-5" />
                            </span>
                            <div>
                                <h2 className="text-sm font-semibold text-ink-900">Content Language Mode</h2>
                                <p className="text-xs text-ink-500">Switch tabs to edit in English, বাংলা, or both simultaneously.</p>
                            </div>
                        </div>

                        <div role="tablist" aria-label="Language Mode" className="no-scrollbar inline-flex gap-1 overflow-x-auto rounded-lg bg-surface p-1 ring-1 ring-line">
                            <button
                                type="button"
                                role="tab"
                                aria-selected={langTab === 'both'}
                                onClick={() => setLangTab('both')}
                                className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-all ${
                                    langTab === 'both' ? 'bg-brand-800 text-white shadow-sm' : 'text-ink-600 hover:text-ink-900'
                                }`}
                            >
                                Both (EN & বাংলা)
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={langTab === 'en'}
                                onClick={() => setLangTab('en')}
                                className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-all ${
                                    langTab === 'en' ? 'bg-brand-800 text-white shadow-sm' : 'text-ink-600 hover:text-ink-900'
                                }`}
                            >
                                English Only
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={langTab === 'bn'}
                                onClick={() => setLangTab('bn')}
                                className={`flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-semibold transition-all ${
                                    langTab === 'bn' ? 'bg-brand-800 text-white shadow-sm' : 'text-ink-600 hover:text-ink-900'
                                }`}
                            >
                                বাংলা Only
                            </button>
                        </div>
                    </div>
                )}

                <form noValidate onSubmit={submit} className="mt-6 max-w-4xl space-y-6">
                    {/* Basic Information */}
                    <FormSection title="Basic Information">
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Job Title EN */}
                            {showEn && (
                                <FormField
                                    label="Job Title (English)"
                                    htmlFor="job-title-en"
                                    required
                                    error={errors.title_en}
                                    className={langTab === 'en' ? 'md:col-span-2' : ''}
                                >
                                    <input
                                        id="job-title-en"
                                        type="text"
                                        required
                                        placeholder="e.g. Electrical Technician"
                                        value={data.title_en}
                                        onChange={(e) => setData('title_en', e.target.value)}
                                        className={`${inputClass} ${errors.title_en ? inputErrorClass : ''}`}
                                    />
                                </FormField>
                            )}

                            {/* Job Title BN */}
                            {showBn && (
                                <FormField
                                    label="Job Title (বাংলা)"
                                    htmlFor="job-title-bn"
                                    optional
                                    error={errors.title_bn}
                                    className={langTab === 'bn' ? 'md:col-span-2' : ''}
                                >
                                    <input
                                        id="job-title-bn"
                                        type="text"
                                        placeholder="e.g. ইলেকট্রিক্যাল টেকনিশিয়ান"
                                        value={data.title_bn}
                                        onChange={(e) => setData('title_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Code Prefix */}
                            <FormField
                                label="Job Code Prefix"
                                htmlFor="job-prefix"
                                required
                                error={errors.prefix}
                                hint={`Generates sequential code: ${previewCode}`}
                            >
                                <input
                                    id="job-prefix"
                                    type="text"
                                    required
                                    placeholder="e.g. HR, DEV, SA-ET"
                                    value={data.prefix}
                                    onChange={(e) => setData('prefix', e.target.value)}
                                    className={`${inputClass} font-mono font-bold uppercase ${errors.prefix ? inputErrorClass : ''}`}
                                />
                            </FormField>

                            {/* Country & Designation */}
                            <FormField label="Country" htmlFor="job-country" required error={errors.country_id}>
                                <SelectField
                                    id="job-country"
                                    value={String(data.country_id)}
                                    onChange={(v) => setData('country_id', Number(v))}
                                    placeholder="Select country"
                                    invalid={Boolean(errors.country_id)}
                                    options={countryOptions}
                                />
                            </FormField>

                            <FormField label="Designation" htmlFor="job-designation" required error={errors.designation_id}>
                                <SelectField
                                    id="job-designation"
                                    value={String(data.designation_id)}
                                    onChange={(v) => setData('designation_id', Number(v))}
                                    placeholder="Select designation"
                                    invalid={Boolean(errors.designation_id)}
                                    options={designationOptions}
                                />
                            </FormField>

                            {/* Employer Name EN */}
                            {showEn && (
                                <FormField
                                    label="Employer / Company (English)"
                                    htmlFor="job-employer"
                                    required
                                    error={errors.employer_name}
                                >
                                    <input
                                        id="job-employer"
                                        type="text"
                                        required
                                        placeholder="e.g. Al-Rashid Trading & Contracting"
                                        value={data.employer_name}
                                        onChange={(e) => setData('employer_name', e.target.value)}
                                        className={`${inputClass} ${errors.employer_name ? inputErrorClass : ''}`}
                                    />
                                </FormField>
                            )}

                            {/* Employer Name BN */}
                            {showBn && (
                                <FormField
                                    label="Employer / Company (বাংলা)"
                                    htmlFor="job-employer-bn"
                                    optional
                                >
                                    <input
                                        id="job-employer-bn"
                                        type="text"
                                        placeholder="e.g. আল-রশীদ ট্রেডিং অ্যান্ড কনট্রাক্টিং"
                                        value={data.employer_name_bn}
                                        onChange={(e) => setData('employer_name_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Location EN */}
                            {showEn && (
                                <FormField label="Job Location (English)" htmlFor="job-location" optional>
                                    <input
                                        id="job-location"
                                        type="text"
                                        placeholder="e.g. Riyadh, Saudi Arabia"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Location BN */}
                            {showBn && (
                                <FormField label="Job Location (বাংলা)" htmlFor="job-location-bn" optional>
                                    <input
                                        id="job-location-bn"
                                        type="text"
                                        placeholder="e.g. রিয়াদ, সৌদি আরব"
                                        value={data.location_bn}
                                        onChange={(e) => setData('location_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Vacancy */}
                            <FormField label="Vacancy" htmlFor="job-vacancy" optional>
                                <input
                                    id="job-vacancy"
                                    type="number"
                                    min="1"
                                    placeholder="e.g. 25"
                                    value={data.vacancy}
                                    onChange={(e) => setData('vacancy', e.target.value === '' ? '' : Number(e.target.value))}
                                    className={inputClass}
                                />
                            </FormField>

                            {/* Salary EN */}
                            {showEn && (
                                <FormField label="Salary (English)" htmlFor="job-salary" optional>
                                    <input
                                        id="job-salary"
                                        type="text"
                                        placeholder="e.g. SAR 1,800 – 2,200 / month"
                                        value={data.salary}
                                        onChange={(e) => setData('salary', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Salary BN */}
                            {showBn && (
                                <FormField label="Salary (বাংলা)" htmlFor="job-salary-bn" optional>
                                    <input
                                        id="job-salary-bn"
                                        type="text"
                                        placeholder="e.g. ১,৮০০ – ২,২০০ রিয়াল / মাস"
                                        value={data.salary_bn}
                                        onChange={(e) => setData('salary_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Contract Duration EN */}
                            {showEn && (
                                <FormField label="Contract Duration (English)" htmlFor="job-contract" optional>
                                    <input
                                        id="job-contract"
                                        type="text"
                                        placeholder="e.g. 2 years (renewable)"
                                        value={data.contract_duration}
                                        onChange={(e) => setData('contract_duration', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Contract Duration BN */}
                            {showBn && (
                                <FormField label="Contract Duration (বাংলা)" htmlFor="job-contract-bn" optional>
                                    <input
                                        id="job-contract-bn"
                                        type="text"
                                        placeholder="e.g. ২ বছর (নবায়নযোগ্য)"
                                        value={data.contract_duration_bn}
                                        onChange={(e) => setData('contract_duration_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Working Hours EN */}
                            {showEn && (
                                <FormField
                                    label="Working Hours (English)"
                                    htmlFor="job-working-hours"
                                    optional
                                    className={langTab === 'en' ? 'md:col-span-2' : ''}
                                >
                                    <input
                                        id="job-working-hours"
                                        type="text"
                                        placeholder="e.g. 8 hours/day, 6 days/week"
                                        value={data.working_hours}
                                        onChange={(e) => setData('working_hours', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Working Hours BN */}
                            {showBn && (
                                <FormField
                                    label="Working Hours (বাংলা)"
                                    htmlFor="job-working-hours-bn"
                                    optional
                                    className={langTab === 'bn' ? 'md:col-span-2' : ''}
                                >
                                    <input
                                        id="job-working-hours-bn"
                                        type="text"
                                        placeholder="e.g. দৈনিক ৮ ঘণ্টা, সপ্তাহে ৬ দিন"
                                        value={data.working_hours_bn}
                                        onChange={(e) => setData('working_hours_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}
                        </div>
                    </FormSection>

                    {/* Interview Information */}
                    <FormSection
                        title="Interview Information"
                        description="Shown prominently on the job card and job details page."
                    >
                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField
                                label="Interview Date"
                                htmlFor="job-interview-date"
                                optional
                                hint="Leave date empty to show “To Be Announced”."
                            >
                                <input
                                    id="job-interview-date"
                                    type="date"
                                    value={data.interview_date}
                                    onChange={(e) => setData('interview_date', e.target.value)}
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Interview Type" htmlFor="job-interview-type">
                                <SelectField
                                    id="job-interview-type"
                                    value={data.interview_type}
                                    onChange={(v) => setData('interview_type', v)}
                                    options={interviewTypeOptions}
                                />
                            </FormField>

                            {/* Venue EN */}
                            {showEn && (
                                <FormField
                                    label="Interview Venue (English)"
                                    htmlFor="job-venue"
                                    optional
                                    className={langTab === 'en' ? 'md:col-span-2' : ''}
                                >
                                    <input
                                        id="job-venue"
                                        type="text"
                                        placeholder="e.g. Head Office, Banani, Dhaka"
                                        value={data.interview_venue}
                                        onChange={(e) => setData('interview_venue', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Venue BN */}
                            {showBn && (
                                <FormField
                                    label="Interview Venue (বাংলা)"
                                    htmlFor="job-venue-bn"
                                    optional
                                    className={langTab === 'bn' ? 'md:col-span-2' : ''}
                                >
                                    <input
                                        id="job-venue-bn"
                                        type="text"
                                        placeholder="e.g. প্রধান কার্যালয়, বনানী, ঢাকা"
                                        value={data.interview_venue_bn}
                                        onChange={(e) => setData('interview_venue_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}
                        </div>
                    </FormSection>

                    {/* Job Requirements */}
                    <FormSection title="Job Requirements">
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Experience EN & BN */}
                            {showEn && (
                                <FormField label="Experience (English)" htmlFor="job-experience" optional>
                                    <input
                                        id="job-experience"
                                        type="text"
                                        placeholder="e.g. 2–3 Years Overseas or Local"
                                        value={data.req_experience}
                                        onChange={(e) => setData('req_experience', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}
                            {showBn && (
                                <FormField label="Experience (বাংলা)" htmlFor="job-experience-bn" optional>
                                    <input
                                        id="job-experience-bn"
                                        type="text"
                                        placeholder="e.g. ২–৩ বছরের কাজের অভিজ্ঞতা"
                                        value={data.req_experience_bn}
                                        onChange={(e) => setData('req_experience_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Education EN & BN */}
                            {showEn && (
                                <FormField label="Education (English)" htmlFor="job-education" optional>
                                    <input
                                        id="job-education"
                                        type="text"
                                        placeholder="e.g. SSC / Trade Certificate"
                                        value={data.req_education}
                                        onChange={(e) => setData('req_education', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}
                            {showBn && (
                                <FormField label="Education (বাংলা)" htmlFor="job-education-bn" optional>
                                    <input
                                        id="job-education-bn"
                                        type="text"
                                        placeholder="e.g. এসএসসি / ট্রেড সার্টিফিকেট"
                                        value={data.req_education_bn}
                                        onChange={(e) => setData('req_education_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            {/* Age EN & BN */}
                            {showEn && (
                                <FormField label="Age (English)" htmlFor="job-age" optional>
                                    <input
                                        id="job-age"
                                        type="text"
                                        placeholder="e.g. 21 – 38 Years"
                                        value={data.req_age}
                                        onChange={(e) => setData('req_age', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}
                            {showBn && (
                                <FormField label="Age (বাংলা)" htmlFor="job-age-bn" optional>
                                    <input
                                        id="job-age-bn"
                                        type="text"
                                        placeholder="e.g. ২১ থেকে ৩৮ বছর"
                                        value={data.req_age_bn}
                                        onChange={(e) => setData('req_age_bn', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            )}

                            <FormField label="Gender" htmlFor="job-gender" optional>
                                <SelectField
                                    id="job-gender"
                                    value={data.req_gender}
                                    onChange={(v) => setData('req_gender', v)}
                                    options={genderOptions}
                                />
                            </FormField>
                        </div>
                    </FormSection>

                    {/* Job Content */}
                    <FormSection title="Job Content">
                        <div className="space-y-5">
                            {/* Job Description */}
                            <div className={`grid gap-5 ${langTab === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                {showEn && (
                                    <FormField label="Job Description (English)" htmlFor="job-desc-en" optional>
                                        <textarea
                                            id="job-desc-en"
                                            rows={4}
                                            placeholder="Detailed English description of the role..."
                                            value={data.desc_en}
                                            onChange={(e) => setData('desc_en', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                                {showBn && (
                                    <FormField label="Job Description (বাংলা)" htmlFor="job-desc-bn" optional>
                                        <textarea
                                            id="job-desc-bn"
                                            rows={4}
                                            placeholder="চাকরির বিস্তারিত বাংলা বিবরণ..."
                                            value={data.desc_bn}
                                            onChange={(e) => setData('desc_bn', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                            </div>

                            {/* Candidate Requirements */}
                            <div className={`grid gap-5 ${langTab === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                {showEn && (
                                    <FormField label="Candidate Requirements (English)" htmlFor="job-req-candidate-en" optional>
                                        <textarea
                                            id="job-req-candidate-en"
                                            rows={4}
                                            placeholder="Skills, competencies, or certifications..."
                                            value={data.req_candidate_en}
                                            onChange={(e) => setData('req_candidate_en', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                                {showBn && (
                                    <FormField label="Candidate Requirements (বাংলা)" htmlFor="job-req-candidate-bn" optional>
                                        <textarea
                                            id="job-req-candidate-bn"
                                            rows={4}
                                            placeholder="প্রার্থীর প্রয়োজনীয় যোগ্যতা..."
                                            value={data.req_candidate_bn}
                                            onChange={(e) => setData('req_candidate_bn', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                            </div>

                            {/* Responsibilities */}
                            <div className={`grid gap-5 ${langTab === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                {showEn && (
                                    <FormField label="Responsibilities (English)" htmlFor="job-resp-en" optional>
                                        <textarea
                                            id="job-resp-en"
                                            rows={4}
                                            placeholder="Daily key duties and responsibilities..."
                                            value={data.responsibilities_en}
                                            onChange={(e) => setData('responsibilities_en', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                                {showBn && (
                                    <FormField label="Responsibilities (বাংলা)" htmlFor="job-resp-bn" optional>
                                        <textarea
                                            id="job-resp-bn"
                                            rows={4}
                                            placeholder="দায়িত্ব ও কার্যাবলী..."
                                            value={data.responsibilities_bn}
                                            onChange={(e) => setData('responsibilities_bn', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                            </div>

                            {/* Additional Information */}
                            <div className={`grid gap-5 ${langTab === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                {showEn && (
                                    <FormField label="Additional Information (English)" htmlFor="job-add-en" optional>
                                        <textarea
                                            id="job-add-en"
                                            rows={3}
                                            placeholder="Working environment, dress code, shifts..."
                                            value={data.additional_info_en}
                                            onChange={(e) => setData('additional_info_en', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                                {showBn && (
                                    <FormField label="Additional Information (বাংলা)" htmlFor="job-add-bn" optional>
                                        <textarea
                                            id="job-add-bn"
                                            rows={3}
                                            placeholder="অতিরিক্ত অন্যান্য তথ্য..."
                                            value={data.additional_info_bn}
                                            onChange={(e) => setData('additional_info_bn', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                            </div>
                        </div>
                    </FormSection>

                    {/* Benefits / Facilities */}
                    <FormSection
                        title="Benefits & Facilities"
                        description="Switch on what the employer provides for this overseas role."
                    >
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <ToggleField
                                label="Accommodation"
                                checked={Boolean(data.benefits?.accommodation)}
                                onChange={(val) => setBenefit('accommodation', val)}
                            />
                            <ToggleField
                                label="Food"
                                checked={Boolean(data.benefits?.food)}
                                onChange={(val) => setBenefit('food', val)}
                            />
                            <ToggleField
                                label="Transportation"
                                checked={Boolean(data.benefits?.transportation)}
                                onChange={(val) => setBenefit('transportation', val)}
                            />
                            <ToggleField
                                label="Insurance"
                                checked={Boolean(data.benefits?.insurance)}
                                onChange={(val) => setBenefit('insurance', val)}
                            />
                            <ToggleField
                                label="Air Ticket"
                                checked={Boolean(data.benefits?.airTicket)}
                                onChange={(val) => setBenefit('airTicket', val)}
                            />
                            <ToggleField
                                label="Overtime"
                                checked={Boolean(data.benefits?.overtime)}
                                onChange={(val) => setBenefit('overtime', val)}
                            />
                        </div>
                    </FormSection>

                    {/* Visa Information */}
                    <FormSection
                        title="Visa Information"
                        description="Informational only — shown to candidates on the job page."
                    >
                        <div className="space-y-5">
                            <div className="grid gap-5 md:grid-cols-2">
                                <FormField label="Visa Fee" htmlFor="job-visa-fee">
                                    <SelectField
                                        id="job-visa-fee"
                                        value={data.visa_fee_type}
                                        onChange={(v) => setData('visa_fee_type', v)}
                                        options={visaFeeOptions}
                                    />
                                </FormField>

                                <FormField label="Visa Type" htmlFor="job-visa-type" optional>
                                    <input
                                        id="job-visa-type"
                                        type="text"
                                        placeholder="e.g. Employment / Work Visa"
                                        value={data.visa_type}
                                        onChange={(e) => setData('visa_type', e.target.value)}
                                        className={inputClass}
                                    />
                                </FormField>
                            </div>

                            <div className={`grid gap-5 ${langTab === 'both' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                {showEn && (
                                    <FormField label="Visa Notes (English)" htmlFor="job-visa-notes-en" optional>
                                        <textarea
                                            id="job-visa-notes-en"
                                            rows={3}
                                            placeholder="Processing duration, medical check requirements..."
                                            value={data.visa_notes_en}
                                            onChange={(e) => setData('visa_notes_en', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                                {showBn && (
                                    <FormField label="Visa Notes (বাংলা)" htmlFor="job-visa-notes-bn" optional>
                                        <textarea
                                            id="job-visa-notes-bn"
                                            rows={3}
                                            placeholder="ভিসা সংক্রান্ত বিশেষ নির্দেশনা..."
                                            value={data.visa_notes_bn}
                                            onChange={(e) => setData('visa_notes_bn', e.target.value)}
                                            className="w-full rounded-lg border-line bg-surface p-3 text-sm focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100"
                                        />
                                    </FormField>
                                )}
                            </div>
                        </div>
                    </FormSection>

                    {/* Application & Publishing Status */}
                    <FormSection title="Application & Publishing Status">
                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField label="Application Deadline" htmlFor="job-deadline" optional>
                                <input
                                    id="job-deadline"
                                    type="date"
                                    value={data.application_deadline}
                                    onChange={(e) => setData('application_deadline', e.target.value)}
                                    className={inputClass}
                                />
                            </FormField>

                            <FormField label="Status" htmlFor="job-status">
                                <SelectField
                                    id="job-status"
                                    value={data.status}
                                    onChange={(v) => setData('status', v)}
                                    options={statusOptions}
                                />
                            </FormField>
                        </div>
                    </FormSection>

                    {/* Bottom Save bar */}
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Link href="/portal/jobs" className={buttonSecondary}>
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className={buttonPrimary}
                        >
                            <SaveIcon className="h-4 w-4" aria-hidden />
                            {processing ? 'Saving...' : isEdit ? 'Update Job' : 'Publish Job'}
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}
