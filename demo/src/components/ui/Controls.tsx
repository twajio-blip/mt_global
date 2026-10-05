import React from 'react';

const fieldBase =
'w-full rounded-mcaa border border-mcaa-border bg-white px-3 py-2 text-[14px] text-mcaa-text placeholder:text-mcaa-muted focus:border-mcaa-blue focus:outline-none focus:ring-1 focus:ring-mcaa-blue';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
}

export function TextField({ label, hideLabel, id, className = '', ...rest }: TextFieldProps) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className={
        hideLabel ?
        'sr-only' :
        'mb-1 block text-[13px] font-medium text-mcaa-muted'
        }>
        
        {label}
      </label>
      <input id={fieldId} className={fieldBase} {...rest} />
    </div>);

}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  hideLabel?: boolean;
}

export function SelectField({ label, options, hideLabel, id, className = '', ...rest }: SelectFieldProps) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className={hideLabel ? 'sr-only' : 'mb-1 block text-[13px] font-medium text-mcaa-muted'}>
        
        {label}
      </label>
      <select id={fieldId} className={`${fieldBase} appearance-none bg-white pr-8`} {...rest}>
        {options.map((option) =>
        <option key={option} value={option}>
            {option}
          </option>
        )}
      </select>
    </div>);

}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function TextArea({ label, id, className = '', ...rest }: TextAreaProps) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1 block text-[13px] font-medium text-mcaa-muted">
        {label}
      </label>
      <textarea id={fieldId} className={`${fieldBase} min-h-[120px] resize-y`} {...rest} />
    </div>);

}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  const styles =
  variant === 'primary' ?
  'bg-mcaa-blue text-white hover:bg-mcaa-navy' :
  'border border-mcaa-border bg-white text-mcaa-navy hover:bg-mcaa-light';
  return (
    <button
      type="button"
      className={`inline-flex min-h-[40px] items-center justify-center rounded-mcaa px-4 text-[14px] font-medium transition-colors ${styles} ${className}`}
      {...rest} />);


}

interface StatusPillProps {
  status: string;
}

const statusTone: Record<string, string> = {
  Active: 'bg-[#E8F4EE] text-mcaa-green',
  Berthed: 'bg-[#E8F4EE] text-mcaa-green',
  Arrived: 'bg-mcaa-light text-mcaa-blue',
  Expected: 'bg-mcaa-light text-mcaa-blue',
  New: 'bg-[#E8F4EE] text-mcaa-green',
  Amendment: 'bg-mcaa-light text-mcaa-blue',
  Replacement: 'bg-[#FBF3E2] text-[#8A6A17]',
  'Renewal Due': 'bg-[#FBF3E2] text-[#8A6A17]',
  Departed: 'bg-[#F0F2F4] text-mcaa-muted',
  Repealed: 'bg-[#FBEAE8] text-mcaa-red',
  Suspended: 'bg-[#FBEAE8] text-mcaa-red'
};

export function StatusPill({ status }: StatusPillProps) {
  const tone = statusTone[status] ?? 'bg-[#F0F2F4] text-mcaa-muted';
  return (
    <span className={`inline-block rounded-[3px] px-2 py-0.5 text-[12px] font-medium ${tone}`}>{status}</span>);

}