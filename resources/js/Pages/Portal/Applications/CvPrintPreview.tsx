import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PrinterIcon, ArrowLeftIcon, DownloadIcon } from 'lucide-react';

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
        position_applied?: string;
        qualifications?: Array<{
            id?: number;
            degree: string;
            institution: string;
            passing_year: string;
            result_grade: string;
        }>;
        experiences?: Array<{
            id?: number;
            job_title: string;
            company: string;
            country: string;
            from_year?: string;
            to_year?: string;
            years?: string | number;
            salary?: string;
        }>;
        trainings?: Array<{
            id?: number;
            course_name: string;
            institute: string;
            duration: string;
        }>;
    };
}

export default function CvPrintPreview({ cv }: Props) {
    const experiences = cv.experiences || [];
    const qualifications = cv.qualifications || [];
    const trainings = cv.trainings || [];

    // Ensure at least 5 table rows in Experience section for the classic printed agency look
    const totalExpRows = Math.max(5, experiences.length);
    const expRows = Array.from({ length: totalExpRows }, (_, i) => experiences[i] || null);

    // Language check helper
    const hasLang = (lang: string) => {
        if (!cv.languages || cv.languages.length === 0) {
            return lang.toLowerCase() === 'english' || lang.toLowerCase() === 'bangla';
        }
        return cv.languages.some((l) => l.toLowerCase().includes(lang.toLowerCase()));
    };

    // Height & Weight parser / formatter
    const formattedHeight = cv.height || '5 Feet 5 Inches';
    const formattedWeight = cv.weight ? (cv.weight.toLowerCase().includes('kg') ? cv.weight : `${cv.weight} KGS`) : '58 KGS';

    // Auto-trigger print/save as PDF when ?download=1 or ?print=1 is present
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            if (params.get('download') === '1' || params.get('print') === '1') {
                const docTitle = `${cv.name.replace(/\s+/g, '_')}_${cv.passport_number || 'CV'}`;
                document.title = docTitle;
                const timer = setTimeout(() => {
                    window.print();
                }, 350);
                return () => clearTimeout(timer);
            }
        }
    }, [cv]);

    const handleDownloadPdf = () => {
        const docTitle = `${cv.name.replace(/\s+/g, '_')}_${cv.passport_number || 'CV'}`;
        document.title = docTitle;
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 py-6 px-4 font-serif text-black print:bg-white print:p-0 print:m-0">
            <Head title={`Resume - ${cv.name} (${cv.passport_number || 'CV'})`} />

            {/* Non-printing Top Bar */}
            <div className="max-w-[794px] mx-auto mb-4 flex items-center justify-between print:hidden font-sans">
                <Link
                    href="/portal/applications?tab=cvs"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm transition"
                >
                    <ArrowLeftIcon className="h-4 w-4" /> Back to CVs
                </Link>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 shadow-sm transition"
                    >
                        <PrinterIcon className="h-4 w-4" /> Print
                    </button>
                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-800 text-white hover:bg-brand-700 shadow transition"
                    >
                        <DownloadIcon className="h-4 w-4" /> Download PDF
                    </button>
                </div>
            </div>

            {/* Printable A4 Resume Sheet */}
            <div className="max-w-[794px] mx-auto bg-white p-8 sm:p-10 shadow-lg border border-slate-300 print:border-0 print:shadow-none print:p-0 text-black leading-tight text-[12px]">
                {/* Header Section */}
                <div className="flex items-start justify-between border-b border-black pb-3">
                    {/* Left: Agency Logo & Name */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-bold text-xl tracking-tighter">
                            G
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold uppercase tracking-tight text-black leading-none font-sans">
                                Greenland Overseas
                            </h1>
                            <p className="text-[11px] font-medium text-black mt-0.5 font-sans">www.glandgroup.com</p>
                        </div>
                    </div>

                    {/* Center: Arabic Bismillah */}
                    <div className="text-center pt-1">
                        <span className="text-base text-black font-semibold font-serif tracking-widest">
                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                        </span>
                    </div>

                    {/* Right: Agency Address */}
                    <div className="text-right text-[10px] leading-tight text-black font-sans">
                        <p className="font-semibold">Plot-1, Road-1, Gulshan-1</p>
                        <p>Dhaka-1212, Bangladesh</p>
                        <p>Tel: +880 2 48810210-17</p>
                        <p>Fax: +880 2 888 1844-45</p>
                    </div>
                </div>

                {/* Subheader & Position Applied with Photo */}
                <div className="relative mt-3 mb-4 flex items-start justify-between">
                    <div className="flex-1 text-center pr-28">
                        <h2 className="text-xl font-bold uppercase tracking-wide underline underline-offset-4 mb-2 font-sans">
                            Resume
                        </h2>

                        <div className="inline-block">
                            <div className="border border-black rounded-full px-4 py-0.5 text-[10px] font-bold uppercase tracking-wider inline-block bg-white font-sans">
                                POSITION APPLIED
                            </div>
                            <div className="mt-1 border-2 border-black rounded-lg px-6 py-1 text-sm sm:text-base font-black uppercase tracking-wider bg-white font-sans">
                                {cv.position_applied || 'GENERAL WORKER'}
                            </div>
                        </div>
                    </div>

                    {/* Passport Photo Box (Right top) */}
                    <div className="absolute right-0 top-0">
                        {cv.photo_path ? (
                            <img
                                src={cv.photo_path}
                                alt={cv.name}
                                className="w-24 h-32 object-cover border-2 border-red-600 p-0.5 bg-white shadow-sm"
                            />
                        ) : (
                            <div className="w-24 h-32 border-2 border-red-600 p-0.5 bg-white flex flex-col items-center justify-center text-center text-[10px] font-bold text-red-700">
                                <span className="uppercase">Passport Photo</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Personal Information */}
                <div className="mt-4 space-y-1.5">
                    <h3 className="font-bold text-[12px] uppercase tracking-wide text-black font-sans">
                        Personal Information :
                    </h3>

                    <div className="grid grid-cols-12 gap-x-2 text-[11px] leading-relaxed">
                        <div className="col-span-3 font-semibold text-black">Name</div>
                        <div className="col-span-9 font-bold uppercase border-b border-black/40 pb-0.5">
                            {cv.name}
                        </div>

                        <div className="col-span-3 font-semibold text-black">Father's Name</div>
                        <div className="col-span-9 font-bold uppercase border-b border-black/40 pb-0.5">
                            {cv.father_name || '—'}
                        </div>

                        <div className="col-span-3 font-semibold text-black">Mother's Name</div>
                        <div className="col-span-9 font-bold uppercase border-b border-black/40 pb-0.5">
                            {cv.mother_name || '—'}
                        </div>

                        <div className="col-span-3 font-semibold text-black">Date & Place of Birth</div>
                        <div className="col-span-5 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.dob || '—'} &nbsp;&nbsp;&nbsp; {cv.pob ? cv.pob.toUpperCase() : ''}
                        </div>
                        <div className="col-span-2 font-semibold text-right pr-2">Marital Status</div>
                        <div className="col-span-2 border-b border-black/40 pb-0.5 font-bold uppercase text-center">
                            {cv.marital_status || 'Married'}
                        </div>

                        <div className="col-span-3 font-semibold text-black">Nationality</div>
                        <div className="col-span-5 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.nationality || 'BANGLADESHI'}
                        </div>
                        <div className="col-span-2 font-semibold text-right pr-2">Gender:</div>
                        <div className="col-span-2 border-b border-black/40 pb-0.5 font-bold uppercase text-center">
                            {cv.gender || 'MALE'}
                        </div>

                        <div className="col-span-3 font-semibold text-black">Religion</div>
                        <div className="col-span-3 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.religion || 'ISLAM'}
                        </div>
                        <div className="col-span-3 font-semibold text-right pr-1">Height & Weight</div>
                        <div className="col-span-3 border-b border-black/40 pb-0.5 font-bold text-center">
                            {formattedHeight} &nbsp; {formattedWeight}
                        </div>

                        <div className="col-span-3 font-semibold text-black">Data of Passport</div>
                        <div className="col-span-9 border-b border-black/40 pb-0.5">
                            <span className="font-semibold">No.</span>{' '}
                            <span className="font-mono font-bold">{cv.passport_number || '—'}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="font-semibold">Expiry Date</span>{' '}
                            <span className="font-bold uppercase">{cv.passport_expiry || '—'}</span> &nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="font-semibold">Place</span>{' '}
                            <span className="font-bold uppercase">{cv.passport_issue_place || 'DHAKA'}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Address */}
                <div className="mt-3 space-y-1">
                    <h3 className="font-bold text-[12px] uppercase tracking-wide text-black font-sans">
                        Contact Address:
                    </h3>

                    <div className="grid grid-cols-12 gap-x-2 text-[11px] leading-relaxed">
                        <div className="col-span-2 font-semibold">Permanent</div>
                        <div className="col-span-1 text-right font-semibold">Vill.</div>
                        <div className="col-span-4 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.village_area || '—'}
                        </div>
                        <div className="col-span-1 text-right font-semibold">P.O.</div>
                        <div className="col-span-4 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.post_office || '—'}
                        </div>

                        <div className="col-span-2"></div>
                        <div className="col-span-1 text-right font-semibold">P.S.</div>
                        <div className="col-span-4 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.police_station || '—'}
                        </div>
                        <div className="col-span-1 text-right font-semibold">Dist.</div>
                        <div className="col-span-4 border-b border-black/40 pb-0.5 font-bold uppercase">
                            {cv.district || '—'}
                        </div>

                        <div className="col-span-2"></div>
                        <div className="col-span-2 font-semibold">Contact :</div>
                        <div className="col-span-8 border-b border-black/40 pb-0.5 font-mono font-bold">
                            {cv.phone ? `00 88 ${cv.phone.replace('+880', '').replace('+88', '').trim()}` : '—'}
                        </div>
                    </div>
                </div>

                {/* Academic Qualification */}
                <div className="mt-3.5 space-y-1.5">
                    <h3 className="font-bold text-[12px] uppercase tracking-wide text-black font-sans">
                        Academic Qualification :
                    </h3>

                    {qualifications.length > 0 ? (
                        <table className="w-full text-[10px] border border-black border-collapse text-left font-sans">
                            <thead className="bg-slate-50 font-bold border-b border-black uppercase">
                                <tr>
                                    <th className="border-r border-black p-1 text-center w-1/4">Examination / Degree</th>
                                    <th className="border-r border-black p-1 text-center w-2/5">Institute / Board</th>
                                    <th className="border-r border-black p-1 text-center w-1/6">Passing Year</th>
                                    <th className="p-1 text-center w-1/6">Result / Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qualifications.map((q, idx) => (
                                    <tr key={idx} className="border-b border-black/40">
                                        <td className="border-r border-black/40 p-1 font-bold text-center uppercase">{q.degree}</td>
                                        <td className="border-r border-black/40 p-1 uppercase">{q.institution}</td>
                                        <td className="border-r border-black/40 p-1 text-center font-mono font-semibold">{q.passing_year}</td>
                                        <td className="p-1 text-center uppercase">{q.result_grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="border border-black p-1">
                            <div className="grid grid-cols-5 text-center text-[10px] font-bold uppercase border-b border-black py-0.5 font-sans">
                                <div className="border-r border-black">S.S.C</div>
                                <div className="border-r border-black">H.S.C</div>
                                <div className="border-r border-black">Graduation</div>
                                <div className="border-r border-black">Post-Graduation</div>
                                <div>Others</div>
                            </div>
                            <div className="grid grid-cols-5 text-center py-1 font-sans">
                                <div className="border-r border-black flex items-center justify-center">
                                    <span className="w-3.5 h-3.5 border border-black inline-block"></span>
                                </div>
                                <div className="border-r border-black flex items-center justify-center">
                                    <span className="w-3.5 h-3.5 border border-black inline-block"></span>
                                </div>
                                <div className="border-r border-black flex items-center justify-center">
                                    <span className="w-3.5 h-3.5 border border-black inline-block"></span>
                                </div>
                                <div className="border-r border-black flex items-center justify-center">
                                    <span className="w-3.5 h-3.5 border border-black inline-block"></span>
                                </div>
                                <div className="flex items-center justify-center gap-1 font-bold text-[10px]">
                                    <span>IX</span>
                                    <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[9px] font-bold">✓</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Experience Table */}
                <div className="mt-3.5 space-y-1.5">
                    <h3 className="font-bold text-[12px] uppercase tracking-wide text-black font-sans">
                        Experience :
                    </h3>

                    <table className="w-full text-[10px] border border-black border-collapse text-center font-sans">
                        <thead className="font-bold border-b border-black uppercase bg-slate-50">
                            <tr>
                                <th className="border-r border-black p-1 w-[14%]">COUNTRY</th>
                                <th className="border-r border-black p-1 w-[8%]">YEARS</th>
                                <th className="border-r border-black p-1 w-[32%]">COMPANY NAME</th>
                                <th className="border-r border-black p-1 w-[22%]">POSITION</th>
                                <th className="border-r border-black p-1 w-[8%]">FROM</th>
                                <th className="border-r border-black p-1 w-[8%]">TO</th>
                                <th className="p-1 w-[8%]">SALARY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expRows.map((exp, idx) => (
                                <tr key={idx} className="border-b border-black h-6">
                                    <td className="border-r border-black p-1 uppercase font-semibold">
                                        {exp ? exp.country : ''}
                                    </td>
                                    <td className="border-r border-black p-1 font-mono font-semibold">
                                        {exp ? exp.years || '' : ''}
                                    </td>
                                    <td className="border-r border-black p-1 text-left px-1.5 font-bold uppercase truncate max-w-[200px]">
                                        {exp ? exp.company : ''}
                                    </td>
                                    <td className="border-r border-black p-1 text-left px-1.5 font-bold uppercase truncate max-w-[150px]">
                                        {exp ? exp.job_title : ''}
                                    </td>
                                    <td className="border-r border-black p-1 font-mono">
                                        {exp ? exp.from_year || '' : ''}
                                    </td>
                                    <td className="border-r border-black p-1 font-mono">
                                        {exp ? exp.to_year || '' : ''}
                                    </td>
                                    <td className="p-1 font-mono text-[9px]">
                                        {exp ? exp.salary || '' : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Training Course */}
                <div className="mt-3 flex items-baseline gap-2 text-[11px]">
                    <span className="font-bold uppercase tracking-wide text-black font-sans shrink-0">
                        Training Course :
                    </span>
                    <span className="flex-1 font-bold uppercase border-b border-black/40 pb-0.5">
                        {trainings.length > 0
                            ? trainings.map((t) => `${t.course_name} (${t.institute}${t.duration ? `, ${t.duration}` : ''})`).join('; ')
                            : '...............................................................................................................................................'}
                    </span>
                </div>

                {/* Languages Known */}
                <div className="mt-3 flex items-center gap-3 text-[11px] font-sans">
                    <span className="font-bold uppercase tracking-wide text-black shrink-0">
                        Language Known :
                    </span>
                    <div className="flex items-center gap-4 flex-wrap">
                        <label className="inline-flex items-center gap-1.5">
                            <span>English</span>
                            <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                {hasLang('english') ? '✓' : ''}
                            </span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                            <span>Arabic</span>
                            <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                {hasLang('arabic') ? '✓' : ''}
                            </span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                            <span>French</span>
                            <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                {hasLang('french') ? '✓' : ''}
                            </span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                            <span>Hindi</span>
                            <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                {hasLang('hindi') ? '✓' : ''}
                            </span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                            <span>Urdu</span>
                            <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                {hasLang('urdu') ? '✓' : ''}
                            </span>
                        </label>
                        <label className="inline-flex items-center gap-1.5">
                            <span>Bangla</span>
                            <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                {hasLang('bangla') || hasLang('bengali') ? '✓' : '✓'}
                            </span>
                        </label>
                        {cv.languages && cv.languages.filter(l => !['english', 'arabic', 'french', 'hindi', 'urdu', 'bangla', 'bengali'].includes(l.toLowerCase())).map((customLang) => (
                            <label key={customLang} className="inline-flex items-center gap-1.5">
                                <span className="capitalize">{customLang}</span>
                                <span className="w-3.5 h-3.5 border border-black inline-flex items-center justify-center text-[10px] font-bold">
                                    ✓
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Footer Signatures & Agency Reference */}
                <div className="mt-6 pt-3 flex items-end justify-between font-sans">
                    {/* Left: Applicant Signature Box */}
                    <div>
                        <p className="text-[10px] font-bold text-black mb-1">Signature of the Applicant</p>
                        <div className="w-56 h-10 rounded-xl border border-black bg-white"></div>
                    </div>

                    {/* Right: Agency Ref Stamp */}
                    <div className="border border-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        <span className="text-[10px] italic border-r border-black pr-2">Ref:</span>
                        <span>MT GLOBAL OVERSEAS</span>
                    </div>
                </div>

                {/* Footer Email */}
                <div className="mt-4 pt-2 border-t border-black text-center text-[11px] font-semibold text-black font-sans">
                    E-mail : gland@glandgroup.com
                </div>
            </div>
        </div>
    );
}
