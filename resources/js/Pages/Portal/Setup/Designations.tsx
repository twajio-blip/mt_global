import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { PlusIcon, PencilIcon, XIcon, CheckIcon } from 'lucide-react';
import { PortalLayout } from '../../../Layouts/PortalLayout';
import { PageHeader } from '../../../Components/PageHeader';
import { FormField } from '../../../Components/FormField';
import { buttonPrimary, buttonSecondary, inputClass, inputErrorClass } from '../../../utils/styles';

interface DesignationItem {
    id: number;
    name: string;
    name_bn?: string;
    is_active: boolean;
    jobs_count: number;
}

interface Props {
    designations: DesignationItem[];
}

export default function DesignationsSetup({ designations }: Props) {
    const [editingDesignation, setEditingDesignation] = useState<DesignationItem | null>(null);

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        name: '',
        name_bn: '',
    });

    const startEdit = (d: DesignationItem) => {
        setEditingDesignation(d);
        setData({
            name: d.name,
            name_bn: d.name_bn || '',
        });
        clearErrors();
        document.getElementById('desig-name')?.focus();
    };

    const cancelEdit = () => {
        setEditingDesignation(null);
        reset();
        clearErrors();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDesignation) {
            put(`/portal/setup/designations/${editingDesignation.id}`, {
                onSuccess: () => {
                    setEditingDesignation(null);
                    reset();
                },
            });
        } else {
            post('/portal/setup/designations', {
                onSuccess: () => reset(),
            });
        }
    };

    const toggle = (id: number) => {
        router.patch(`/portal/setup/designations/${id}/toggle`, {}, { preserveScroll: true });
    };

    return (
        <PortalLayout>
            <Head title="Designations Setup" />

            <div className="space-y-6">
                <PageHeader
                    title="Designations Setup"
                    description="Standardize professions and trades with English and বাংলা support across all job postings."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Add / Edit Designation Form */}
                    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm space-y-4 h-fit">
                        <div className="border-b border-line pb-3 flex items-start justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-ink-900">
                                    {editingDesignation ? 'Edit Trade / Designation' : 'Add Trade / Designation'}
                                </h2>
                                <p className="text-xs text-ink-500 mt-0.5">
                                    {editingDesignation ? (
                                        <span>Editing: <strong className="text-brand-900">{editingDesignation.name}</strong></span>
                                    ) : (
                                        'Supports English & বাংলা bilingual trade titles.'
                                    )}
                                </p>
                            </div>
                            {editingDesignation && (
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
                            <FormField label="Designation Name (English)" htmlFor="desig-name" required error={errors.name}>
                                <input
                                    id="desig-name"
                                    type="text"
                                    required
                                    placeholder="e.g. Electrical Technician, Driver"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`${inputClass} ${errors.name ? inputErrorClass : ''}`}
                                />
                            </FormField>

                            <FormField label="Designation Name (বাংলা)" htmlFor="desig-name-bn" optional error={errors.name_bn}>
                                <input
                                    id="desig-name-bn"
                                    type="text"
                                    placeholder="e.g. ইলেকট্রিক্যাল টেকনিশিয়ান, ড্রাইভার"
                                    value={data.name_bn}
                                    onChange={(e) => setData('name_bn', e.target.value)}
                                    className={inputClass}
                                />
                            </FormField>

                            {editingDesignation ? (
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
                                    <PlusIcon className="h-4 w-4" aria-hidden /> Add Designation
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Designations List */}
                    <div className="md:col-span-2 rounded-2xl border border-line bg-white shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-line bg-surface/50 flex items-center justify-between">
                            <h3 className="font-semibold text-ink-900 text-sm">
                                Standard Trade Designations ({designations.length})
                            </h3>
                        </div>

                        <div className="divide-y divide-line">
                            {designations.map((d) => {
                                const isCurrent = editingDesignation?.id === d.id;
                                return (
                                    <div
                                        key={d.id}
                                        className={`p-4 flex items-center justify-between transition ${
                                            isCurrent
                                                ? 'bg-brand-50/70 ring-1 ring-inset ring-brand-300'
                                                : 'hover:bg-surface/50'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-ink-900 text-sm">{d.name}</h4>
                                                {d.name_bn && (
                                                    <span className="text-xs font-medium text-brand-800 bg-brand-50 px-2 py-0.5 rounded ring-1 ring-brand-100">
                                                        {d.name_bn}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-ink-500 mt-0.5 block">
                                                {d.jobs_count} job(s) assigned
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => startEdit(d)}
                                                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 transition ${
                                                    isCurrent
                                                        ? 'bg-brand-600 text-white ring-brand-600'
                                                        : 'bg-white text-ink-700 ring-line hover:bg-surface hover:text-brand-800'
                                                }`}
                                                title="Edit designation"
                                            >
                                                <PencilIcon className="h-3 w-3" />
                                                <span>{isCurrent ? 'Editing' : 'Edit'}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => toggle(d.id)}
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ring-1 transition ${
                                                    d.is_active
                                                        ? 'bg-accent-50 text-accent-700 ring-accent-100'
                                                        : 'bg-surface text-ink-600 ring-line'
                                                }`}
                                            >
                                                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                                                {d.is_active ? 'Active' : 'Disabled'}
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
