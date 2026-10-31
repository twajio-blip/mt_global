import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PrinterIcon, ArrowLeftIcon, GlobeIcon } from 'lucide-react';

interface Props {
    cv: {
        name: string;
        phone: string;
        passport_number: string;
        email?: string;
        photo_path?: string;
        father_name?: string;
        mother_name?: string;
        dob?: string;
        pob?: string;
        nationality?: string;
        gender?: string;
        marital_status?: string;
        religion?: string;
        height?: string;
        weight?: string;
        passport_expiry?: string;
        passport_issue_place?: string;
        village_area?: string;
        post_office?: string;
        police_station?: string;
        district?: string;
        country?: string;
        languages?: string[];
        total_experience?: string;
        qualifications?: any[];
        experiences?: any[];
        trainings?: any[];
    };
}

export default function CvPrintPreview({ cv }: Props) {
    return (
        <div className="min-h-screen bg-ink-100/50 py-8 px-4 font-sans print:bg-white print:p-0">
            <Head title={`Standard Manpower CV - ${cv.name}`} />

            {/* Non-printing Control Bar */}
            <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
                <Link
                    href="/portal/applications?tab=cvs"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-brand-800"
                >
                    <ArrowLeftIcon className="h-4 w-4" /> Back to CV Manager
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-800 text-white hover:bg-brand-700 shadow-md transition"
                    >
                        <PrinterIcon className="h-4 w-4" /> Print / Save as PDF
                    </button>
                </div>
            </div>

            {/* Standard Manpower CV Printable Sheet (A4 format) */}
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-lift border border-line rounded-2xl print:border-0 print:shadow-none print:p-0 text-ink-900">
                {/* Header with Photo */}
                <div className="flex items-start justify-between border-b-2 border-brand-900 pb-6 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-brand-900 font-extrabold uppercase tracking-wider text-xs mb-1">
                            <GlobeIcon className="h-4 w-4 text-brand-700" />
                            Standard Manpower Curriculum Vitae
                        </div>
                        <h1 className="text-3xl font-black text-ink-900 tracking-tight">{cv.name}</h1>
                        <p className="text-sm font-semibold text-ink-600 mt-1">
                            Passport No: <span className="font-mono font-bold text-brand-900">{cv.passport_number || 'N/A'}</span> • Mobile:{' '}
                            <span className="font-mono">{cv.phone || 'N/A'}</span>
                        </p>
                        <p className="text-xs text-ink-500">
                            Total Experience Evaluated: <span className="font-bold text-accent-700">{cv.total_experience || 'None'}</span>
                        </p>
                    </div>

                    {cv.photo_path ? (
                        <img
                            src={cv.photo_path}
                            alt={cv.name}
                            className="w-24 h-28 object-cover rounded border-2 border-brand-900 shadow-sm"
                        />
                    ) : (
                        <div className="w-24 h-28 rounded border-2 border-dashed border-ink-300 flex items-center justify-center text-xs text-ink-400 font-bold uppercase text-center p-2">
                            Passport Photo
                        </div>
                    )}
                </div>

                {/* 1. Personal & Passport Information Table */}
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider bg-brand-900 text-white px-3 py-1 mb-2">
                        1. Personal & Passport Details
                    </h2>
                    <table className="w-full text-xs border border-line">
                        <tbody>
                            <tr className="border-b border-line">
                                <td className="p-2 font-semibold bg-surface w-1/4">Father's Name:</td>
                                <td className="p-2 w-1/4">{cv.father_name || '—'}</td>
                                <td className="p-2 font-semibold bg-surface w-1/4">Mother's Name:</td>
                                <td className="p-2 w-1/4">{cv.mother_name || '—'}</td>
                            </tr>
                            <tr className="border-b border-line">
                                <td className="p-2 font-semibold bg-surface">Date of Birth:</td>
                                <td className="p-2">{cv.dob || '—'}</td>
                                <td className="p-2 font-semibold bg-surface">Place of Birth:</td>
                                <td className="p-2">{cv.pob || '—'}</td>
                            </tr>
                            <tr className="border-b border-line">
                                <td className="p-2 font-semibold bg-surface">Gender / Status:</td>
                                <td className="p-2">{cv.gender || '—'} / {cv.marital_status || '—'}</td>
                                <td className="p-2 font-semibold bg-surface">Nationality / Religion:</td>
                                <td className="p-2">{cv.nationality || 'Bangladeshi'} / {cv.religion || '—'}</td>
                            </tr>
                            <tr className="border-b border-line">
                                <td className="p-2 font-semibold bg-surface">Height & Weight:</td>
                                <td className="p-2">{cv.height || '—'} / {cv.weight || '—'}</td>
                                <td className="p-2 font-semibold bg-surface">Passport Expiry:</td>
                                <td className="p-2 font-mono font-semibold">{cv.passport_expiry || '—'} ({cv.passport_issue_place || 'Dhaka'})</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold bg-surface">Permanent Address:</td>
                                <td colSpan={3} className="p-2">
                                    {cv.village_area ? `${cv.village_area}, ` : ''}
                                    {cv.post_office ? `P.O: ${cv.post_office}, ` : ''}
                                    {cv.police_station ? `P.S: ${cv.police_station}, ` : ''}
                                    {cv.district ? `Dist: ${cv.district}, ` : ''}
                                    {cv.country || 'Bangladesh'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 2. Employment & Overseas Work Experience */}
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider bg-brand-900 text-white px-3 py-1 mb-2">
                        2. Employment & Overseas Experience Record (Total: {cv.total_experience})
                    </h2>
                    <table className="w-full text-xs border border-line text-left">
                        <thead className="bg-surface font-semibold border-b border-line">
                            <tr>
                                <th className="p-2">Position / Trade</th>
                                <th className="p-2">Company / Employer</th>
                                <th className="p-2">Country</th>
                                <th className="p-2">Period</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {cv.experiences && cv.experiences.length > 0 ? (
                                cv.experiences.map((exp: any, i: number) => (
                                    <tr key={i}>
                                        <td className="p-2 font-bold">{exp.job_title}</td>
                                        <td className="p-2">{exp.company}</td>
                                        <td className="p-2">{exp.country || '—'}</td>
                                        <td className="p-2 font-mono text-[11px]">
                                            {exp.start_date} to {exp.is_current ? 'Present' : exp.end_date || 'N/A'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-2 text-center text-ink-400">No employment record entered</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 3. Academic Qualifications */}
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider bg-brand-900 text-white px-3 py-1 mb-2">
                        3. Educational & Academic Background
                    </h2>
                    <table className="w-full text-xs border border-line text-left">
                        <thead className="bg-surface font-semibold border-b border-line">
                            <tr>
                                <th className="p-2">Degree / Certificate</th>
                                <th className="p-2">Institute / Board</th>
                                <th className="p-2">Year</th>
                                <th className="p-2">Result / Grade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                            {cv.qualifications && cv.qualifications.length > 0 ? (
                                cv.qualifications.map((q: any, i: number) => (
                                    <tr key={i}>
                                        <td className="p-2 font-bold">{q.degree}</td>
                                        <td className="p-2">{q.institution}</td>
                                        <td className="p-2 font-mono">{q.passing_year}</td>
                                        <td className="p-2">{q.result_grade || 'Passed'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-2 text-center text-ink-400">No educational credentials added</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 4. Technical Training & Languages */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider bg-brand-900 text-white px-3 py-1 mb-2">
                            4. Vocational / Technical Training
                        </h2>
                        <ul className="text-xs border border-line divide-y divide-line p-0 m-0">
                            {cv.trainings && cv.trainings.length > 0 ? (
                                cv.trainings.map((t: any, i: number) => (
                                    <li key={i} className="p-2">
                                        <div className="font-bold text-ink-900">{t.course_name}</div>
                                        <div className="text-ink-500 text-[11px]">{t.institute} • {t.duration}</div>
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-ink-400 text-center">No vocational training listed</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider bg-brand-900 text-white px-3 py-1 mb-2">
                            5. Languages Known
                        </h2>
                        <div className="p-3 border border-line flex flex-wrap gap-1.5 min-h-[70px]">
                            {cv.languages && cv.languages.length > 0 ? (
                                cv.languages.map((l: string) => (
                                    <span key={l} className="px-2 py-1 rounded bg-surface border border-line text-xs font-semibold">
                                        ✓ {l}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-ink-400">Bangla, English</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Signatures */}
                <div className="pt-10 flex items-center justify-between text-xs text-ink-500 border-t border-line">
                    <div className="text-center">
                        <div className="w-40 border-t border-ink-400 pt-1">Candidate Signature</div>
                    </div>
                    <div className="text-center">
                        <div className="w-40 border-t border-ink-400 pt-1">Authorized Agency Officer</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

