import React from 'react';
import { AlertCircleIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, required, optional, error, hint, className = '', children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-1.5 text-sm font-medium text-ink-900">
        {label}
        {required && <span className="text-danger-600" aria-hidden>*</span>}
        {optional && <span className="text-xs font-normal text-ink-500">(optional)</span>}
      </label>
      {children}
      {error ?
      <p id={`${htmlFor}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger-700" role="alert">
          <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p> :
      hint ?
      <p className="mt-1.5 text-[13px] text-ink-500">{hint}</p> :
      null}
    </div>);

}