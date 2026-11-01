import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Building2Icon,
    SaveIcon,
    UploadIcon,
    Trash2Icon,
    MailIcon,
    PhoneIcon,
    MapPinIcon,
    GlobeIcon,
    QrCodeIcon,
    CheckCircle2Icon,
    FileTextIcon,
} from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { FormField } from '../../../Components/FormField';
import { FormSection } from '../../../Components/FormSection';
import { buttonPrimary, buttonSecondary, inputClass } from '../../../utils/styles';

interface CompanyData {
    id: number;
    company_name: string;
    company_email?: string;
    phone?: string;
    address?: string;
    website?: string;
    logo_path?: string;
    qr_image_path?: string;
}

interface Props {
    company: CompanyData;
}

export default function CompanySetup({ company }: Props) {
    const [logoPreview, setLogoPreview] = useState<string | null>(company.logo_path || null);
    const [qrPreview, setQrPreview] = useState<string | null>(company.qr_image_path || null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        _method: 'POST',
        company_name: company.company_name || '',
        company_email: company.company_email || '',
        phone: company.phone || '',
        address: company.address || '',
        website: company.website || '',
        logo: null as File | null,
        qr_image: null as File | null,
        remove_logo: false,
        remove_qr_image: false,
    });

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            setData('remove_logo', false);
            const reader = new FileReader();
            reader.onload = () => setLogoPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setData('logo', null);
        setData('remove_logo', true);
        setLogoPreview(null);
    };

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('qr_image', file);
            setData('remove_qr_image', false);
            const reader = new FileReader();
            reader.onload = () => setQrPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveQr = () => {
        setData('qr_image', null);
        setData('remove_qr_image', true);
        setQrPreview(null);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/portal/setup/company', {
            forceFormData: true,
        });
    };

    return (
        <PortalLayout>
            <Head title="Company Setup & Branding" />

            <div className="max-w-5xl mx-auto space-y-6 pb-20">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-800 uppercase tracking-wider mb-1">
                            <Building2Icon className="h-4 w-4" /> Agency & Company Profile
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-ink-900 md:text-[28px]">
                            Company Setup
                        </h1>
                        <p className="mt-1 text-sm text-ink-500">
                            Configure agency branding, contact credentials, company logo, and official QR code for CVs & portal documents.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={submit}
                        disabled={processing}
                        className={buttonPrimary}
                    >
                        <SaveIcon className="h-4 w-4" aria-hidden />
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>

                {recentlySuccessful && (
                    <div className="p-4 rounded-xl bg-accent-50 border border-accent-200 text-accent-800 flex items-center gap-2 text-sm font-semibold animate-in fade-in">
                        <CheckCircle2Icon className="h-5 w-5 text-accent-700 shrink-0" />
                        Company profile and branding updated successfully! All CV printouts now reflect these settings.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Primary Company Information */}
                    <FormSection title="Company Identity & Contacts">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField label="Company Name" htmlFor="company_name" error={errors.company_name} required>
                                <input
                                    id="company_name"
                                    type="text"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    placeholder="e.g. Greenland Overseas / MT Global Overseas"
                                    className={inputClass}
                                    required
                                />
                            </FormField>

                            <FormField label="Company Email" htmlFor="company_email" error={errors.company_email} optional>
                                <div className="relative">
                                    <input
                                        id="company_email"
                                        type="email"
                                        value={data.company_email}
                                        onChange={(e) => setData('company_email', e.target.value)}
                                        placeholder="e.g. gland@glandgroup.com"
                                        className={`${inputClass} pl-10`}
                                    />
                                    <MailIcon className="h-4 w-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormField>

                            <FormField label="Phone / Telephone" htmlFor="phone" error={errors.phone} optional>
                                <div className="relative">
                                    <input
                                        id="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="e.g. +880 2 48810210-17 / +880 1711-223344"
                                        className={`${inputClass} pl-10`}
                                    />
                                    <PhoneIcon className="h-4 w-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormField>

                            <FormField label="Official Website URL" htmlFor="website" error={errors.website} optional>
                                <div className="relative">
                                    <input
                                        id="website"
                                        type="text"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        placeholder="e.g. www.glandgroup.com"
                                        className={`${inputClass} pl-10`}
                                    />
                                    <GlobeIcon className="h-4 w-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </FormField>

                            <div className="md:col-span-2">
                                <FormField label="Office Address" htmlFor="address" error={errors.address} optional>
                                    <div className="relative">
                                        <textarea
                                            id="address"
                                            rows={3}
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Plot-1, Road-1, Gulshan-1, Dhaka-1212, Bangladesh"
                                            className={`${inputClass} pl-10`}
                                        />
                                        <MapPinIcon className="h-4 w-4 text-ink-400 absolute left-3.5 top-4 pointer-events-none" />
                                    </div>
                                    <p className="text-[11px] text-ink-400 mt-1">
                                        Formatted and printed on top-right corner of standard manpower PDF CVs.
                                    </p>
                                </FormField>
                            </div>
                        </div>
                    </FormSection>

                    {/* Branding Assets (Logo & QR Code) */}
                    <FormSection title="Company Logo & Official QR Code">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company Logo Card */}
                            <div className="p-5 rounded-2xl border border-line bg-surface/40 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-ink-900">Company Logo</h3>
                                        <p className="text-xs text-ink-500">Appears on CV header & portal documents</p>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-800">
                                        Header Logo
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-line bg-white">
                                    {logoPreview ? (
                                        <div className="relative group">
                                            <img
                                                src={logoPreview}
                                                alt="Company Logo"
                                                className="w-20 h-20 object-contain rounded-xl border border-line p-1 bg-white shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveLogo}
                                                className="absolute -top-2 -right-2 p-1 bg-danger-600 text-white rounded-full hover:bg-danger-700 transition shadow"
                                                title="Remove Logo"
                                            >
                                                <Trash2Icon className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl bg-surface border border-line flex flex-col items-center justify-center text-ink-400 shrink-0">
                                            <Building2Icon className="h-8 w-8" />
                                            <span className="text-[10px] mt-1 font-semibold">No Logo</span>
                                        </div>
                                    )}

                                    <div className="space-y-2 flex-1">
                                        <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-800 hover:bg-brand-100 cursor-pointer transition">
                                            <UploadIcon className="h-3.5 w-3.5" />
                                            Upload Logo
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                                                onChange={handleLogoChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-[11px] text-ink-400">
                                            Recommended: PNG, SVG, or JPG with transparent or clean background (Max 3MB).
                                        </p>
                                    </div>
                                </div>
                                {errors.logo && <p className="text-xs text-danger-600 font-semibold">{errors.logo}</p>}
                            </div>

                            {/* Client Official QR Code Card */}
                            <div className="p-5 rounded-2xl border border-line bg-surface/40 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-ink-900">Official QR Image</h3>
                                        <p className="text-xs text-ink-500">Client's own QR code for candidate CVs</p>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent-50 text-accent-800">
                                        Verification QR
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-line bg-white">
                                    {qrPreview ? (
                                        <div className="relative group">
                                            <img
                                                src={qrPreview}
                                                alt="Official QR Code"
                                                className="w-20 h-20 object-contain rounded-xl border border-line p-1 bg-white shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveQr}
                                                className="absolute -top-2 -right-2 p-1 bg-danger-600 text-white rounded-full hover:bg-danger-700 transition shadow"
                                                title="Remove QR Image"
                                            >
                                                <Trash2Icon className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl bg-surface border border-line flex flex-col items-center justify-center text-ink-400 shrink-0">
                                            <QrCodeIcon className="h-8 w-8" />
                                            <span className="text-[10px] mt-1 font-semibold">No QR</span>
                                        </div>
                                    )}

                                    <div className="space-y-2 flex-1">
                                        <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent-50 text-accent-800 hover:bg-accent-100 cursor-pointer transition">
                                            <UploadIcon className="h-3.5 w-3.5" />
                                            Upload QR Code
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                                                onChange={handleQrChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-[11px] text-ink-400">
                                            Upload your company's own QR image (PNG or JPG). Placed on the bottom of CV printouts.
                                        </p>
                                    </div>
                                </div>
                                {errors.qr_image && <p className="text-xs text-danger-600 font-semibold">{errors.qr_image}</p>}
                            </div>
                        </div>
                    </FormSection>

                    {/* Live Preview on Printed CV */}
                    <div className="p-5 rounded-2xl border border-line bg-white space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-ink-900 uppercase tracking-wider">
                            <FileTextIcon className="h-4 w-4 text-brand-800" />
                            Live Preview: How It Appears on Manpower CV Printout
                        </div>

                        {/* Miniature Preview Card */}
                        <div className="border border-black p-4 rounded-xl bg-slate-50/50 space-y-3 text-[11px] font-sans">
                            {/* Header simulation */}
                            <div className="flex items-start justify-between border-b border-black pb-2">
                                <div className="flex items-center gap-2.5">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo" className="w-10 h-10 object-contain rounded border border-black/40 bg-white" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-bold text-base">
                                            {(data.company_name || 'G')[0]}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-extrabold text-sm uppercase text-black leading-none">
                                            {data.company_name || 'Company Name'}
                                        </h4>
                                        <p className="text-[10px] text-black mt-0.5">{data.website || 'www.company.com'}</p>
                                    </div>
                                </div>

                                <div className="text-right text-[10px] leading-tight text-black">
                                    <p className="whitespace-pre-line font-medium">{data.address || 'Company Address'}</p>
                                    <p className="font-semibold">Tel: {data.phone || '+880 ...'}</p>
                                </div>
                            </div>

                            {/* Footer simulation */}
                            <div className="flex items-center justify-between pt-2 border-t border-black/20 text-[10px]">
                                <div className="text-ink-600">
                                    E-mail : <span className="font-semibold text-black">{data.company_email || 'info@company.com'}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {qrPreview ? (
                                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-black/40">
                                            <img src={qrPreview} alt="QR" className="w-8 h-8 object-contain" />
                                            <span className="text-[9px] font-bold text-black uppercase">Official QR</span>
                                        </div>
                                    ) : (
                                        <span className="text-ink-400 italic text-[10px]">Upload QR to feature on printout</span>
                                    )}
                                    <div className="border border-black px-2 py-1 text-[10px] font-bold uppercase">
                                        Ref: {data.company_name || 'AGENCY'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
                        <button
                            type="submit"
                            disabled={processing}
                            className={buttonPrimary}
                        >
                            <SaveIcon className="h-4 w-4" aria-hidden />
                            {processing ? 'Saving...' : 'Save Company Setup'}
                        </button>
                    </div>
                </form>
            </div>
        </PortalLayout>
    );
}

