import { FormEvent, useState } from 'react';
import { useData } from '../contexts/DataContext';
import type { Application } from '../types/application';
import type { Job } from '../types/job';
import { isValidEmail, isValidPhone, validateCvFile } from '../utils/validation';

export interface ApplyValues {
  fullName: string;
  phone: string;
  email: string;
  currentLocation: string;
  message: string;
  consent: boolean;
}

export type ApplyErrors = Partial<Record<keyof ApplyValues | 'cv', string>>;

const initialValues: ApplyValues = { fullName: '', phone: '', email: '', currentLocation: '', message: '', consent: false };
const fieldOrder: (keyof ApplyErrors)[] = ['fullName', 'phone', 'email', 'currentLocation', 'cv', 'consent'];

function validate(values: ApplyValues, file: File | null): ApplyErrors {
  const errors: ApplyErrors = {};
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';else
  if (!isValidPhone(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';else
  if (!isValidEmail(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.currentLocation.trim()) errors.currentLocation = 'Please enter your current country or city.';
  if (!file) errors.cv = 'Please upload your CV.';
  if (!values.consent) errors.consent = 'Please confirm consent before submitting your CV.';
  return errors;
}

export function useApplyForm(job: Job) {
  const { addApplication } = useData();
  const [values, setValues] = useState<ApplyValues>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ApplyErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Application | null>(null);

  const setField = (key: keyof ApplyValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const selectFile = (next: File | null) => {
    if (!next) {
      setFile(null);
      return;
    }
    const error = validateCvFile(next);
    setErrors((prev) => ({ ...prev, cv: error }));
    setFile(error ? null : next);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values, file);
    setErrors(nextErrors);
    const firstError = fieldOrder.find((key) => nextErrors[key]);
    if (firstError || !file) {
      document.getElementById(`apply-${firstError}`)?.focus();
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const application = addApplication(job.id, {
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      currentLocation: values.currentLocation.trim(),
      message: values.message.trim() || undefined,
      cvFileName: file.name,
      cvFileSize: file.size,
      cvUrl: URL.createObjectURL(file),
      consentAcceptedAt: new Date().toISOString()
    });
    setSubmitting(false);
    setSubmitted(application);
  };

  return { values, file, errors, submitting, submitted, setField, selectFile, submit };
}
