import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import { FormSection } from '../../components/portal/FormSection';
import { RichTextField } from '../../components/portal/RichTextField';
import { ToggleField } from '../../components/portal/ToggleField';
import { FormField } from '../../components/ui/FormField';
import { SelectField } from '../../components/ui/SelectField';
import { countries } from '../../data/countries';
import { designations } from '../../data/designations';
import { JobFormValues, useJobEditor } from '../../hooks/useJobEditor';
import type { JobBenefits, JobStatus } from '../../types/job';
import { benefitLabels } from '../../utils/jobs';
import { buttonPrimary, buttonSecondary, inputClass, inputErrorClass } from '../../utils/styles';

type TextKey = Exclude<keyof JobFormValues, 'status' | 'benefits'>;
const statuses: {value: JobStatus;label: string;hint: string;}[] = [
{ value: 'Draft', label: 'Draft', hint: 'Only visible in the portal' },
{ value: 'Published', label: 'Published', hint: 'Live on the website' },
{ value: 'Inactive', label: 'Inactive', hint: 'Hidden, kept for records' }];


export function JobEditor() {
  const { jobId } = useParams();
  const { existing, notFound, values, errors, saving, setField, setBenefit, save } = useJobEditor(jobId);

  if (notFound) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold text-ink-900">Job not found</p>
        <Link to="/portal/jobs" className={`${buttonSecondary} mt-6`}>Back to Jobs</Link>
      </div>);

  }

  const text = (key: TextKey, opts: {label: string;required?: boolean;placeholder?: string;type?: string;list?: string;className?: string;}) => {
    const err = key in errors ? errors[key as keyof typeof errors] : undefined;
    return (
      <FormField label={opts.label} htmlFor={`job-${key}`} required={opts.required} error={err} className={opts.className}>
        <input
          id={`job-${key}`}
          type={opts.type ?? 'text'}
          list={opts.list}
          min={opts.type === 'number' ? 1 : undefined}
          value={values[key]}
          placeholder={opts.placeholder}
          aria-invalid={Boolean(err) || undefined}
          onChange={(e) => setField(key, e.target.value)}
          className={`${inputClass} ${err ? inputErrorClass : ''}`} />
        
      </FormField>);

  };

  const primaryLabel = values.status === 'Inactive' ? 'Save as Inactive' : existing?.status === 'Published' ? 'Update Job' : 'Publish Job';

  return (
    <div className="pb-24">
      <Link to="/portal/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-800">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Back to Jobs
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink-900 md:text-[28px]">
        {existing ? 'Edit Job' : 'Add New Job'}
      </h1>
      <p className="mt-1 text-[15px] text-ink-600">
        Fields left empty are hidden on the public job page. Required fields are marked <span className="text-danger-600">*</span>
      </p>

      <form noValidate onSubmit={(e) => {e.preventDefault();save('publish');}} className="mt-6 max-w-4xl space-y-5">
        <FormSection title="Basic Information">
          <div className="grid gap-5 md:grid-cols-2">
            {text('title', { label: 'Job Title', required: true, placeholder: 'e.g. Electrical Technician', className: 'md:col-span-2' })}
            {text('designation', { label: 'Designation', required: true, placeholder: 'Choose or type a designation', list: 'designation-list' })}
            <datalist id="designation-list">
              {designations.map((d) => <option key={d.name} value={d.name} />)}
            </datalist>
            <FormField label="Country" htmlFor="job-country" required error={errors.country}>
              <SelectField
                id="job-country"
                value={values.country}
                onChange={(v) => setField('country', v)}
                placeholder="Select country"
                invalid={Boolean(errors.country)}
                options={countries.map((c) => ({ value: c.name, label: c.name }))} />
              
            </FormField>
            {text('location', { label: 'Job Location', placeholder: 'City or site' })}
            {text('employer', { label: 'Employer / Company Name', required: true })}
            {text('vacancies', { label: 'Number of Vacancies', required: true, type: 'number', placeholder: 'e.g. 25' })}
          </div>
        </FormSection>

        <FormSection title="Employment Information">
          <div className="grid gap-5 md:grid-cols-2">
            {text('salary', { label: 'Salary', placeholder: 'e.g. SAR 2,000 – 2,500 / month' })}
            <FormField label="Employment Type" htmlFor="job-employmentType">
              <SelectField
                id="job-employmentType"
                value={values.employmentType}
                onChange={(v) => setField('employmentType', v)}
                placeholder="Not specified"
                options={['Full-time', 'Part-time', 'Contract', 'Seasonal'].map((v) => ({ value: v, label: v }))} />
              
            </FormField>
            {text('contractDuration', { label: 'Contract Duration', placeholder: 'e.g. 2 years (renewable)' })}
            {text('workingHours', { label: 'Working Hours', placeholder: 'e.g. 8 hours/day, 6 days/week' })}
            {text('overtime', { label: 'Overtime Information', placeholder: 'e.g. Paid as per labour law', className: 'md:col-span-2' })}
          </div>
        </FormSection>

        <FormSection title="Requirements">
          <div className="grid gap-5 md:grid-cols-2">
            {text('experience', { label: 'Experience Requirement', placeholder: 'e.g. Minimum 3 years' })}
            {text('education', { label: 'Education Requirement', placeholder: 'e.g. Diploma in Electrical' })}
            {text('age', { label: 'Age Requirement', placeholder: 'e.g. 22 – 40 years' })}
            <FormField label="Gender Requirement" htmlFor="job-gender" optional>
              <SelectField
                id="job-gender"
                value={values.gender}
                onChange={(v) => setField('gender', v)}
                placeholder="Not applicable"
                options={['Male', 'Female', 'Male / Female'].map((v) => ({ value: v, label: v }))} />
              
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Benefits / Facilities" description="Switch on what the employer provides.">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(benefitLabels) as (keyof JobBenefits)[]).map((key) =>
            <ToggleField
              key={key}
              label={`${benefitLabels[key]} Provided`}
              checked={values.benefits[key]}
              onChange={(checked) => setBenefit(key, checked)} />

            )}
          </div>
        </FormSection>

        <FormSection title="Visa Information" description="Informational only — shown to candidates on the job page.">
          <div className="grid gap-5">
            {text('visaType', { label: 'Visa Type', list: 'visa-list', placeholder: 'e.g. Employment / Work Visa' })}
            <datalist id="visa-list">
              {['Employment / Work Visa', 'Work Permit', 'Work Permit + Long-stay Visa', 'Employment Pass'].map((v) =>
              <option key={v} value={v} />
              )}
            </datalist>
            <RichTextField
              id="job-visaInfo"
              label="Work Visa / Employment Visa Information"
              value={values.visaInfo}
              onChange={(html) => setField('visaInfo', html)}
              placeholder="e.g. Employment visa sponsored by the employer…" />
            
          </div>
        </FormSection>

        <FormSection title="Job Content">
          <div className="grid gap-5">
            <RichTextField id="job-description" label="Job Description" value={values.description} onChange={(h) => setField('description', h)} placeholder="Short overview of the role and employer" />
            <RichTextField id="job-responsibilities" label="Responsibilities" value={values.responsibilities} onChange={(h) => setField('responsibilities', h)} placeholder="Use a bulleted list for daily duties" />
            <RichTextField id="job-requirements" label="Requirements" value={values.requirements} onChange={(h) => setField('requirements', h)} placeholder="Skills, certificates, licences…" />
            <RichTextField id="job-additionalInfo" label="Additional Information" value={values.additionalInfo} onChange={(h) => setField('additionalInfo', h)} placeholder="Interview or trade test details, notes…" />
          </div>
        </FormSection>

        <FormSection title="Application">
          <div className="grid gap-5 md:grid-cols-2">
            {text('deadline', { label: 'Application Deadline', type: 'date' })}
            <fieldset className="md:col-span-2">
              <legend className="mb-1.5 text-sm font-medium text-ink-900">Status</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {statuses.map((s) => {
                  const checked = values.status === s.value;
                  return (
                    <label
                      key={s.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-[border-color,background-color] duration-150 ease-out ${
                      checked ? 'border-brand-600 bg-brand-50' : 'border-line hover:border-ink-300'}`
                      }>
                      
                      <input
                        type="radio"
                        name="status"
                        value={s.value}
                        checked={checked}
                        onChange={() => setField('status', s.value)}
                        className="mt-0.5 h-4 w-4 accent-brand-800" />
                      
                      <span>
                        <span className="block text-[15px] font-medium text-ink-900">{s.label}</span>
                        <span className="block text-[13px] text-ink-500">{s.hint}</span>
                      </span>
                    </label>);

                })}
              </div>
            </fieldset>
          </div>
        </FormSection>

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur lg:left-64">
          <div className="mx-auto flex max-w-[1280px] items-center justify-end gap-2 px-4 py-3 sm:px-6 lg:px-8">
            <button type="button" onClick={() => save('draft')} disabled={Boolean(saving)} className={`${buttonSecondary} h-11`}>
              {saving === 'draft' && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden />}
              Save Draft
            </button>
            <button type="submit" disabled={Boolean(saving)} className={`${buttonPrimary} h-11`}>
              {saving === 'publish' && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden />}
              {primaryLabel}
            </button>
          </div>
        </div>
      </form>
    </div>);

}