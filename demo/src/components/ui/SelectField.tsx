import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { inputClass, inputErrorClass } from '../../utils/styles';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: 'md' | 'lg';
  invalid?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function SelectField({
  id,
  value,
  onChange,
  options,
  placeholder,
  size = 'md',
  invalid,
  ariaLabel,
  className = ''
}: SelectFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} cursor-pointer appearance-none pr-10 ${size === 'lg' ? 'h-14 text-base' : ''} ${
        invalid ? inputErrorClass : ''} ${
        value === '' ? 'text-ink-500' : ''}`}>
        
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((opt) =>
        <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
        aria-hidden />
      
    </div>);

}