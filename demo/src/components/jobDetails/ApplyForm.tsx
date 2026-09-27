import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, Loader2Icon, LockIcon } from 'lucide-react';
import { CountryFlag } from '../CountryFlag';
import { FormField } from '../ui/FormField';
import { FileDropzone } from './FileDropzone';
import { useApplyForm } from '../../hooks/useApplyForm';
import type { Job } from '../../types/job';
import { formatDateTime } from '../../utils/format';
import { buttonPrimary, buttonSecondary, inputClass, inputErrorClass, textareaClass } from '../../utils/styles';

interface ApplyFormProps {
  job: Job;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function ApplyForm({ job }: ApplyFormProps) {
  const { values, file, errors, submitting, submitted, setField, selectFile, submit } = useApplyForm(job);

  const textInput = (key: 'fullName' | 'phone' | 'email' | 'currentLocation', type: string, autoComplete: string, placeholder: string) =>
  <input
    id={`apply-${key}`}
    type={type}
    value={values[key]}
    autoComplete={autoComplete}
    placeholder={placeholder}
    inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : undefined}
    aria-invalid={Boolean(errors[key]) || undefined}
    aria-describedby={errors[key] ? `apply-${key}-error` : undefined}
    onChange={(e) => setField(key, e.target.value)}
    className={`${inputClass} ${errors[key] ? inputErrorClass : ''}`} />;



  return (
    <section id="apply" aria-labelledby="apply-title" className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-800 bg-white">
      <div className="bg-brand-800 px-5 py-5 md:px-8">
        <h2 id="apply-title" className="text-xl font-bold text-white md:text-2xl">
          Apply for This Job
        </h2>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-brand-100">
          <span>Applying for</span>
          <span className="font-semibold text-white">{job.title}</span>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <CountryFlag country={job.country} /> {job.country}
          </span>
        </p>
      </div>

      <div className="p-5 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {submitted ?
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease }}
            className="py-4 text-center md:py-8">
            
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white">
                <CheckIcon className="h-7 w-7" strokeWidth={2.5} aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-ink-900">CV Submitted Successfully</h3>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
                Your CV has been received successfully for this overseas job opportunity. The recruitment team may
                contact you if your profile matches the requirement.
              </p>

              <dl className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-surface p-5 text-left text-sm">
                <div className="col-span-2">
                  <dt className="text-ink-500">Job</dt>
                  <dd className="font-semibold text-ink-900">{submitted.jobTitle}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Country</dt>
                  <dd className="font-medium text-ink-900">{submitted.country}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Designation</dt>
                  <dd className="font-medium text-ink-900">{submitted.designation}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Employer</dt>
                  <dd className="font-medium text-ink-900">{submitted.employer}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Submitted</dt>
                  <dd className="font-medium text-ink-900">{formatDateTime(submitted.submittedAt)}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/jobs" className={buttonPrimary}>
                  Browse More Jobs
                </Link>
                <Link to={`/jobs?country=${encodeURIComponent(job.country)}`} className={buttonSecondary}>
                  More jobs in {job.country}
                </Link>
              </div>
            </motion.div> :

          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease }}>
            
              <p className="mb-6 text-[15px] text-ink-600">
                Upload your existing CV — no account or CV builder needed. Your application is linked to this job
                automatically.
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField label="Full Name" htmlFor="apply-fullName" required error={errors.fullName}>
                  {textInput('fullName', 'text', 'name', 'As written on your passport')}
                </FormField>
                <FormField label="Phone Number" htmlFor="apply-phone" required error={errors.phone} hint="WhatsApp number preferred">
                  {textInput('phone', 'tel', 'tel', '+880 1XXX-XXXXXX')}
                </FormField>
                <FormField label="Email Address" htmlFor="apply-email" required error={errors.email}>
                  {textInput('email', 'email', 'email', 'you@example.com')}
                </FormField>
                <FormField label="Current Country / Location" htmlFor="apply-currentLocation" required error={errors.currentLocation}>
                  {textInput('currentLocation', 'text', 'address-level2', 'e.g. Dhaka, Bangladesh')}
                </FormField>
                <div className="md:col-span-2">
                  <FileDropzone id="apply-cv" file={file} error={errors.cv} onSelect={selectFile} />
                </div>
                <FormField label="Short Message" htmlFor="apply-message" optional className="md:col-span-2">
                  <textarea
                  id="apply-message"
                  rows={3}
                  value={values.message}
                  onChange={(e) => setField('message', e.target.value)}
                  placeholder="Years of experience, current job, notice period…"
                  className={textareaClass} />
                
                </FormField>
              </div>

              <div className={`mt-6 rounded-xl border p-4 ${errors.consent ? 'border-danger-600 bg-danger-50' : 'border-line bg-surface'}`}>
                <label htmlFor="apply-consent" className="flex gap-3 text-[14px] leading-relaxed text-ink-700">
                  <input
                    id="apply-consent"
                    type="checkbox"
                    checked={values.consent}
                    aria-invalid={Boolean(errors.consent) || undefined}
                    aria-describedby={errors.consent ? 'apply-consent-error' : undefined}
                    onChange={(e) => setField('consent', e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-line text-brand-800 focus:ring-brand-200" />
                  
                  <span>
                    I confirm that the information I have provided is accurate and I consent to the processing of my
                    personal information and CV for recruitment and overseas employment purposes in accordance with the{' '}
                    <Link to="/privacy-policy" className="font-semibold text-brand-800 hover:text-brand-600">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent &&
                <p id="apply-consent-error" className="mt-2 text-[13px] text-danger-700" role="alert">
                    {errors.consent}
                  </p>
                }
                <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                  By submitting your CV, you acknowledge that submission does not guarantee employment, selection or
                  visa approval.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-[13px] text-ink-500">
                  <LockIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Your CV is only shared with our recruitment team and this employer.
                </p>
                <button type="submit" disabled={submitting} className={`${buttonPrimary} h-14 w-full px-8 text-base sm:w-auto`}>
                  {submitting ?
                <>
                      <Loader2Icon className="h-5 w-5 animate-spin" aria-hidden />
                      Submitting…
                    </> :

                'Submit CV'
                }
                </button>
              </div>
            </motion.form>
          }
        </AnimatePresence>
      </div>
    </section>);

}
