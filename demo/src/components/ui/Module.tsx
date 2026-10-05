import React from 'react';

interface ModuleProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Module({ title, children, footer }: ModuleProps) {
  return (
    <section className="overflow-hidden rounded-mcaa border border-mcaa-border bg-white">
      <h2 className="bg-mcaa-blue px-3 py-2 text-[14px] font-semibold uppercase tracking-wide text-white">
        {title}
      </h2>
      <div className="p-3 text-[14px] leading-relaxed text-mcaa-text">{children}</div>
      {footer ?
      <div className="border-t border-mcaa-border bg-mcaa-light px-3 py-2 text-[13px]">{footer}</div> :
      null}
    </section>);

}

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ title, children, className = '' }: PanelProps) {
  return (
    <section className={`overflow-hidden rounded-mcaa border border-mcaa-border bg-white ${className}`}>
      <h2 className="border-b border-mcaa-border bg-mcaa-light px-4 py-2.5 text-[16px] font-semibold text-mcaa-navy">
        {title}
      </h2>
      <div className="p-4">{children}</div>
    </section>);

}