import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SelectField, StatusPill, TextField } from '../../components/ui/Controls';
import { vessels } from '../../data/port';

export function BerthingSchedule() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All Statuses');

  const visible = vessels.filter((vessel) => {
    const term = query.trim().toLowerCase();
    const matchesTerm = !term || vessel.name.toLowerCase().includes(term);
    const matchesStatus = status === 'All Statuses' || vessel.status === status;
    return matchesTerm && matchesStatus;
  });

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Port Information' }, { label: 'Berthing Schedule' }]}
        title="Berthing Schedule" />
      

      <p className="text-[15.5px] leading-relaxed text-mcaa-text">
        Expected arrival, berthing and departure of vessels at Mongla Port. Members should verify timings with the
        terminal before arranging delivery.
      </p>

      <div className="mt-4 grid gap-3 rounded-mcaa border border-mcaa-border bg-mcaa-light p-3 sm:grid-cols-3">
        <TextField label="Date" type="date" defaultValue="2026-08-11" />
        <TextField
          label="Vessel Name"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search vessel" />
        
        <SelectField
          label="Status"
          options={['All Statuses', 'Expected', 'Arrived', 'Berthed', 'Departed']}
          value={status}
          onChange={(event) => setStatus(event.target.value)} />
        
      </div>

      <ul className="mt-4 divide-y divide-mcaa-border border-y border-mcaa-border">
        {visible.map((vessel) =>
        <li key={vessel.id} className="py-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-[15.5px] font-semibold leading-snug text-mcaa-navy">{vessel.name}</h2>
              <StatusPill status={vessel.status} />
            </div>
            <dl className="mt-1.5 grid gap-x-4 gap-y-1 text-[13.5px] sm:grid-cols-2">
              <div className="flex gap-1.5">
                <dt className="text-mcaa-muted">ETA:</dt>
                <dd className="tabular-nums text-mcaa-text">{vessel.eta}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-mcaa-muted">ETB:</dt>
                <dd className="tabular-nums text-mcaa-text">{vessel.etb}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-mcaa-muted">ETD:</dt>
                <dd className="tabular-nums text-mcaa-text">{vessel.etd}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-mcaa-muted">Berth:</dt>
                <dd className="text-mcaa-text">{vessel.berth}</dd>
              </div>
            </dl>
          </li>
        )}
      </ul>

      {visible.length === 0 &&
      <p className="mt-4 rounded-mcaa border border-dashed border-mcaa-border bg-mcaa-page p-6 text-center text-[14px] text-mcaa-muted">
          No vessels match the selected filters.
        </p>
      }

      <p className="mt-4 text-[13px] text-mcaa-muted">
        Official source: Mongla Port Authority, Traffic Department. Schedule updated daily at 08:00.
      </p>
    </div>);

}