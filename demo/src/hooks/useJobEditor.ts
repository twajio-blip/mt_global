import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useData } from '../contexts/DataContext';
import type { Job, JobBenefits, JobStatus } from '../types/job';
import { createJobId, emptyBenefits } from '../utils/jobs';

const optionalKeys = [
'location',
'salary',
'employmentType',
'contractDuration',
'workingHours',
'overtime',
'experience',
'education',
'age',
'gender',
'visaType',
'visaInfo',
'description',
'responsibilities',
'requirements',
'additionalInfo',
'deadline'] as
const;

type OptionalKey = (typeof optionalKeys)[number];

export type JobFormValues = Record<OptionalKey, string> & {
  title: string;
  designation: string;
  country: string;
  employer: string;
  vacancies: string;
  status: JobStatus;
  benefits: JobBenefits;
};

export type JobFormErrors = Partial<Record<'title' | 'designation' | 'country' | 'employer' | 'vacancies', string>>;

function toFormValues(job?: Job): JobFormValues {
  const base = Object.fromEntries(optionalKeys.map((k) => [k, job?.[k] ?? ''])) as Record<OptionalKey, string>;
  return {
    ...base,
    employmentType: job?.employmentType ?? 'Full-time',
    visaType: job?.visaType ?? 'Employment / Work Visa',
    title: job?.title ?? '',
    designation: job?.designation ?? '',
    country: job?.country ?? '',
    employer: job?.employer ?? '',
    vacancies: job ? String(job.vacancies) : '',
    status: job?.status ?? 'Draft',
    benefits: job?.benefits ?? { ...emptyBenefits }
  };
}

function cleanHtml(value: string): string | undefined {
  const text = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  return text ? value : undefined;
}

export function useJobEditor(jobId?: string) {
  const { jobs, saveJob } = useData();
  const navigate = useNavigate();
  const existing = jobId ? jobs.find((j) => j.id === jobId) : undefined;
  const [values, setValues] = useState<JobFormValues>(() => toFormValues(existing));
  const [errors, setErrors] = useState<JobFormErrors>({});
  const [saving, setSaving] = useState<'draft' | 'publish' | null>(null);

  const setField = <K extends keyof JobFormValues,>(key: K, value: JobFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setBenefit = (key: keyof JobBenefits, checked: boolean) =>
  setValues((prev) => ({ ...prev, benefits: { ...prev.benefits, [key]: checked } }));

  const save = async (mode: 'draft' | 'publish') => {
    const next: JobFormErrors = {};
    if (!values.title.trim()) next.title = 'Job title is required.';
    if (!values.designation.trim()) next.designation = 'Designation is required.';
    if (!values.country) next.country = 'Select a country.';
    if (!values.employer.trim()) next.employer = 'Employer / company name is required.';
    const vacancies = Number(values.vacancies);
    if (!values.vacancies || !Number.isInteger(vacancies) || vacancies < 1) next.vacancies = 'Enter at least 1 vacancy.';
    setErrors(next);
    const first = (Object.keys(next) as (keyof JobFormErrors)[])[0];
    if (first) {
      document.getElementById(`job-${first}`)?.focus();
      toast.error('Please complete the required fields.');
      return;
    }

    const status: JobStatus = mode === 'draft' ? 'Draft' : values.status === 'Inactive' ? 'Inactive' : 'Published';
    setSaving(mode);
    await new Promise((r) => setTimeout(r, 500));

    const optional = Object.fromEntries(
      optionalKeys.map((k) => {
        const raw = values[k];
        const isHtml = ['visaInfo', 'description', 'responsibilities', 'requirements', 'additionalInfo'].includes(k);
        return [k, isHtml ? cleanHtml(raw) : raw.trim() || undefined];
      })
    ) as Partial<Record<OptionalKey, string>>;

    const job: Job = {
      ...optional,
      id: existing?.id ?? createJobId(),
      title: values.title.trim(),
      designation: values.designation.trim(),
      country: values.country,
      employer: values.employer.trim(),
      vacancies,
      benefits: values.benefits,
      status,
      publishedAt:
      existing && existing.status === 'Published' ? existing.publishedAt : new Date().toISOString().slice(0, 10)
    };
    saveJob(job);
    setSaving(null);
    toast.success(
      status === 'Published' ? 'Job published on the website' : status === 'Draft' ? 'Draft saved' : 'Job saved as inactive'
    );
    navigate('/portal/jobs');
  };

  return { existing, notFound: Boolean(jobId && !existing), values, errors, saving, setField, setBenefit, save };
}