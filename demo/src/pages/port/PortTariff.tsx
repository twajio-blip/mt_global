import React from 'react';
import { DownloadIcon, EyeIcon, FileTextIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { portTariffArchive, portTariffCurrent } from '../../data/port';

export function PortTariff() {
  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Port Information' }, { label: 'Port Tariff' }]}
        title="Port Tariff" />
      

      <p className="text-[15.5px] leading-relaxed text-mcaa-text">
        Tariff schedule of Mongla Port Authority covering vessel related charges, cargo handling, storage and equipment
        hire. The document currently in force is shown first.
      </p>

      <section className="mt-4 rounded-mcaa border border-mcaa-blue bg-mcaa-light p-3.5">
        <h2 className="text-[16px] font-semibold text-mcaa-navy">Current Port Tariff</h2>
        <p className="mt-0.5 text-[15px] text-mcaa-text">{portTariffCurrent.title}</p>
        <dl className="mt-2 grid gap-x-4 gap-y-1 text-[14px] sm:grid-cols-2">
          <div className="flex gap-1.5">
            <dt className="text-mcaa-muted">Publication Date:</dt>
            <dd className="text-mcaa-text">{portTariffCurrent.publication}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-mcaa-muted">Effective Date:</dt>
            <dd className="text-mcaa-text">{portTariffCurrent.effective}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-mcaa-muted">Authority:</dt>
            <dd className="text-mcaa-text">{portTariffCurrent.authority}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-mcaa-muted">File:</dt>
            <dd className="text-mcaa-text">{portTariffCurrent.file}</dd>
          </div>
        </dl>
        <div className="mt-2.5 flex gap-3">
          <button type="button" className="inline-flex items-center gap-1 text-[14px] font-medium text-mcaa-blue hover:underline">
            <EyeIcon className="h-4 w-4" aria-hidden="true" /> View
          </button>
          <button type="button" className="inline-flex items-center gap-1 text-[14px] font-medium text-mcaa-blue hover:underline">
            <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download
          </button>
        </div>
      </section>

      <h2 className="mb-1 mt-5 border-b border-mcaa-border pb-2 text-[17px] font-semibold text-mcaa-navy">
        Previous Tariff Archive
      </h2>
      <ul className="divide-y divide-mcaa-border border-b border-mcaa-border">
        {portTariffArchive.map((item) =>
        <li key={item.id} className="flex gap-3 py-3">
            <FileTextIcon className="mt-1 h-5 w-5 shrink-0 text-mcaa-blue" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="text-[15.5px] font-medium leading-snug text-mcaa-navy">{item.title}</h3>
              <p className="mt-0.5 text-[13.5px] text-mcaa-muted">
                Published {item.publication} · Effective {item.effective} · {item.file}
              </p>
              <div className="mt-1.5 flex gap-3">
                <button type="button" className="inline-flex items-center gap-1 text-[13.5px] font-medium text-mcaa-blue hover:underline">
                  <EyeIcon className="h-4 w-4" aria-hidden="true" /> View
                </button>
                <button type="button" className="inline-flex items-center gap-1 text-[13.5px] font-medium text-mcaa-blue hover:underline">
                  <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download
                </button>
              </div>
            </div>
          </li>
        )}
      </ul>

      <p className="mt-4 text-[13px] text-mcaa-muted">Official source: Mongla Port Authority.</p>
    </div>);

}