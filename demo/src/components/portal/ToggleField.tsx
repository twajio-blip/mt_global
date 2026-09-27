import React from 'react';

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleField({ label, checked, onChange }: ToggleFieldProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex h-14 w-full items-center justify-between gap-3 rounded-lg border px-4 text-left text-[15px] font-medium transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
      checked ? 'border-accent-500 bg-accent-50 text-ink-900' : 'border-line bg-white text-ink-700 hover:border-ink-300'}`
      }>
      
      {label}
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ease-out ${
        checked ? 'bg-accent-600' : 'bg-ink-300'}`
        }
        aria-hidden>
        
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ease-out ${
          checked ? 'translate-x-5' : ''}`
          } />
        
      </span>
    </button>);

}