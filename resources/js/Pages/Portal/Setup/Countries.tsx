import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusIcon, ExternalLinkIcon, PencilIcon, XIcon, CheckIcon } from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { PageHeader } from '../../../Components/PageHeader';
import { FormField } from '../../../Components/FormField';
import { CountryFlag } from '../../../Components/CountryFlag';
import { ISO_COUNTRIES, findIsoByCountryName } from '../../../utils/isoCountries';
import { buttonPrimary, buttonSecondary, inputClass, inputErrorClass } from '../../../utils/styles';

interface CountryItem {
    id: number;
    name: string;
    name_bn?: string;
    code?: string;
    flag_emoji?: string;
    is_active: boolean;
    jobs_count: number;
}

interface Props {
    countries: CountryItem[];
}

export default function CountriesSetup({ countries }: Props) {
    const [editingCountry, setEditingCountry] = useState<CountryItem | null>(null);

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        name: '',
        name_bn: '',
        code: '',
        flag_emoji: '',
    });

    const startEdit = (c: CountryItem) => {
        setEditingCountry(c);
        setData({
            name: c.name,
            name_bn: c.name_bn || '',
            code: c.code || '',
            flag_emoji: c.flag_emoji || '',
        });
        clearErrors();
        document.getElementById('country-name')?.focus();
    };

    const cancelEdit = () => {
        setEditingCountry(null);
        reset();
        clearErrors();
    };

    const handleNameChange = (val: string) => {
        setData('name', val);
        const match = findIsoByCountryName(val);
        if (match) {
            setData((prev) => ({
                ...prev,
                name: val,
                name_bn: prev.name_bn || match.name_bn,
                code: prev.code || match.code,
            }));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCountry) {
            put(`/portal/setup/countries/${editingCountry.id}`, {
                onSuccess: () => {
                    setEditingCountry(null);
                    reset();
                },
            });
        } else {
            post('/portal/setup/countries', {
                onSuccess: () => reset(),
            });
        }
    };

    const toggle = (id: number) => {
        router.patch(`/portal/setup/countries/${id}/toggle`, {}, { preserveScroll: true });
    };

    return (
        <PortalLayout>
            <Head title="Countries Setup" />

            <div className="space-y-6">
                <PageHeader
                    title="Countries Setup"
                    description="Configure destination countries in English & বাংলা with ISO 3166-1 flag codes."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Add / Edit Country Form */}
                    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-4 h-fit">
                        <div className="border-b border-line pb-3 flex items-start justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-ink-900">
                                    {editingCountry ? 'Edit Destination Country' : 'Add Destination Country'}
                                </h2>
                                <p className="text-xs text-ink-500 mt-0.5">
                                    {editingCountry ? (
                                        <span>Editing: <strong className="text-brand-900">{editingCountry.name}</strong></span>
                                    ) : (
                                        'Select or type country. The 2-letter ISO code auto-fills live flag images.'
                                    )}
                                </p>
                            </div>
                            {editingCountry && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="text-xs text-ink-500 hover:text-ink-800 flex items-center gap-1 px-2 py-1 rounded bg-surface hover:bg-slate-100 transition"
                                >
                                    <XIcon className="h-3.5 w-3.5" /> Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Country Name with Autocomplete Datalist */}
                            <FormField label="Country Name (English)" htmlFor="country-name" required error={errors.name}>
                                <input
                                    id="country-name"
                                    type="text"
                                    required
                                    list="iso-countries-list"
                                    placeholder="e.g. Saudi Arabia, UAE, Qatar, Japan"
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className={`${inputClass} ${errors.name ? inputErrorClass : ''}`}
                                />
                                <datalist id="iso-countries-list">
                                    {ISO_COUNTRIES.map((c) => (
                                        <option key={c.name} value={c.name}>
                                            {c.code} · {c.name_bn}
                                        </option>
                                    ))}
                                </datalist>
                            </FormField>

                            {/* Country Name Bangla */}
                            <FormField label="Country Name (বাংলা)" htmlFor="country-name-bn" optional error={errors.name_bn}>
                                <input
                                    id="country-name-bn"
                                    type="text"
                                    placeholder="e.g. সৌদি আরব, সংযুক্ত আরব আমিরাত"
                                    value={data.name_bn}
                                    onChange={(e) => setData('name_bn', e.target.value)}
                                    className={inputClass}
                                />
                            </FormField>

                            {/* 2-Letter ISO Code with Live Preview */}
                            <FormField
                                label="2-Letter ISO Code"
                                htmlFor="country-code"
                                optional
                                hint={
                                    <span className="inline-flex items-center gap-1">
                                        Find &amp; copy your 2-letter code from{' '}
                                        <a
                                            href="https://flagpedia.net/codes"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-0.5 text-brand-600 font-medium underline hover:text-brand-700"
                                        >
                                            flagpedia.net/codes
                                            <ExternalLinkIcon className="h-3 w-3" />
                                        </a>
                                    </span>
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <input
                                        id="country-code"
                                        type="text"
                                        maxLength={2}
                                        placeholder="e.g. SA"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        className={`${inputClass} font-mono uppercase flex-1`}
                                    />
                                    <div className="flex flex-col items-center justify-center p-2 rounded-lg border border-line bg-surface min-w-[56px] h-12 shadow-sm">
                                        <CountryFlag code={data.code} country={data.name} size="md" />
                                        <span className="text-[10px] text-ink-500 font-mono mt-0.5">
                                            {data.code ? data.code.toUpperCase() : 'Preview'}
                                        </span>
                                    </div>
                                </div>
                            </FormField>

                            {editingCountry ? (
                                <div className="flex items-center gap-2 pt-1">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`flex-1 ${buttonPrimary}`}
                                    >
                                        <CheckIcon className="h-4 w-4" aria-hidden /> Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className={`px-4 ${buttonSecondary}`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full ${buttonPrimary}`}
                                >
                                    <PlusIcon className="h-4 w-4" aria-hidden /> Add Country
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Countries List */}
                    <div className="md:col-span-2 rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-line bg-surface/50 flex items-center justify-between">
                            <h3 className="font-semibold text-ink-900 text-sm">
                                Registered Destination Countries ({countries.length})
                            </h3>
                        </div>

                        <div className="divide-y divide-line">
                            {countries.map((c) => {
                                const isCurrent = editingCountry?.id === c.id;
                                return (
                                    <div
                                        key={c.id}
                                        className={`p-4 flex items-center justify-between transition ${
                                            isCurrent
                                                ? 'bg-brand-50/70 ring-1 ring-inset ring-brand-300'
                                                : 'hover:bg-surface/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <CountryFlag country={c.name} code={c.code} size="md" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-ink-900 text-sm">{c.name}</h4>
                                                    {c.name_bn && (
                                                        <span className="text-xs font-medium text-brand-800 bg-brand-50 px-2 py-0.5 rounded ring-1 ring-brand-100">
                                                            {c.name_bn}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-ink-500 mt-0.5 block">
                                                    ISO Code:{' '}
                                                    <span className="font-mono font-semibold text-ink-800">
                                                        {c.code || '—'}
                                                    </span>{' '}
                                                    · {c.jobs_count} job(s)
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => startEdit(c)}
                                                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 transition ${
                                                    isCurrent
                                                        ? 'bg-brand-600 text-white ring-brand-600'
                                                        : 'bg-white text-ink-700 ring-line hover:bg-surface hover:text-brand-800'
                                                }`}
                                                title="Edit country"
                                            >
                                                <PencilIcon className="h-3 w-3" />
                                                <span>{isCurrent ? 'Editing' : 'Edit'}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => toggle(c.id)}
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ring-1 transition ${
                                                    c.is_active
                                                        ? 'bg-accent-50 text-accent-700 ring-accent-100'
                                                        : 'bg-surface text-ink-600 ring-line'
                                                }`}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                                                {c.is_active ? 'Active' : 'Disabled'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}
