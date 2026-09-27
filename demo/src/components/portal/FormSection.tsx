import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  const id = `section-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <section aria-labelledby={id} className="rounded-2xl border border-line bg-white">
      <div className="border-b border-line px-5 py-4 md:px-6">
        <h2 id={id} className="text-base font-semibold text-ink-900">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-ink-500">{description}</p>}
      </div>
      <div className="px-5 py-5 md:px-6 md:py-6">{children}</div>
    </section>);

}