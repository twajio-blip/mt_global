import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Avatar } from '../components/ui/Avatar';
import { SelectField, TextField } from '../components/ui/Controls';
import { CONDOLENCE_YEARS, deceasedMembers } from '../data/condolence';

export function Condolence() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('All Years');

  const visible = deceasedMembers.filter((record) => {
    const term = query.trim().toLowerCase();
    const matchesTerm = !term || `${record.name} ${record.company}`.toLowerCase().includes(term);
    const matchesYear = year === 'All Years' || record.dateOfDeath.endsWith(year);
    return matchesTerm && matchesYear;
  });

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Condolence' }]}
        title="Condolence & Deceased Members"
        subtitle="শোকবার্তা ও প্রয়াত সদস্যবৃন্দ" />
      

      <div className="grid gap-3 rounded-mcaa border border-mcaa-border bg-mcaa-light p-3 sm:grid-cols-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-[34px] h-4 w-4 text-mcaa-muted" aria-hidden="true" />
          <TextField
            label="Search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or company"
            className="[&_input]:pl-9" />
          
        </div>
        <SelectField label="Year" options={CONDOLENCE_YEARS} value={year} onChange={(event) => setYear(event.target.value)} />
      </div>

      <ul className="mt-4 divide-y divide-mcaa-border border-y border-mcaa-border">
        {visible.map((record) =>
        <li key={record.id} className="flex gap-3 py-3.5">
            <Avatar name={record.name} src={record.portrait} size={64} />
            <div className="min-w-0 flex-1">
              <h2 className="text-[15.5px] font-semibold leading-snug text-mcaa-navy">{record.name}</h2>
              <p className="text-[13.5px] leading-snug text-mcaa-muted">{record.company}</p>
              {record.role ? <p className="text-[13.5px] leading-snug text-mcaa-muted">{record.role}</p> : null}
              <p className="mt-0.5 text-[13.5px] text-mcaa-text">Date of death: {record.dateOfDeath}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-mcaa-muted">{record.message}</p>
              <button type="button" className="mt-1.5 text-[13.5px] font-medium text-mcaa-blue hover:underline">
                View Details →
              </button>
            </div>
          </li>
        )}
      </ul>

      {visible.length === 0 &&
      <p className="mt-4 rounded-mcaa border border-dashed border-mcaa-border bg-mcaa-page p-6 text-center text-[14px] text-mcaa-muted">
          No records found.
        </p>
      }
    </div>);

}