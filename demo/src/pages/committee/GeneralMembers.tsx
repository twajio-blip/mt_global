import React, { useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SelectField, StatusPill, TextField } from '../../components/ui/Controls';
import { Pagination } from '../../components/ui/Pagination';
import { generalMembers } from '../../data/members';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PAGE_SIZE = 8;

export function GeneralMembers() {
  const [query, setQuery] = useState('');
  const [letter, setLetter] = useState('All');
  const [status, setStatus] = useState('All Statuses');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return generalMembers.filter((member) => {
      const matchesTerm =
      !term ||
      [member.company, member.representative, member.memberId, member.licence].
      join(' ').
      toLowerCase().
      includes(term);
      const matchesLetter = letter === 'All' || member.company.toUpperCase().startsWith(letter);
      const matchesStatus = status === 'All Statuses' || member.status === status;
      return matchesTerm && matchesLetter && matchesStatus;
    });
  }, [query, letter, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Committee' }, { label: 'General Members' }]}
        title="General Members" />
      

      <div className="rounded-mcaa border border-mcaa-border bg-mcaa-light p-3">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-3 top-[34px] h-4 w-4 text-mcaa-muted"
            aria-hidden="true" />
          
          <TextField
            label="Search members"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            placeholder="Search by company, representative, member ID or licence number"
            className="[&_input]:pl-9" />
          
        </div>

        <div className="mt-3">
          <p className="mb-1.5 text-[13px] font-medium text-mcaa-muted">Filter alphabetically</p>
          <div className="flex flex-wrap gap-1">
            {['All', ...LETTERS].map((item) =>
            <button
              key={item}
              type="button"
              onClick={() => {
                setLetter(item);
                resetPage();
              }}
              aria-pressed={letter === item}
              className={`inline-flex h-8 min-w-[30px] items-center justify-center rounded-[3px] border px-1.5 text-[13px] ${
              letter === item ?
              'border-mcaa-blue bg-mcaa-blue font-semibold text-white' :
              'border-mcaa-border bg-white text-mcaa-navy hover:bg-white/70'}`
              }>
              
                {item}
              </button>
            )}
          </div>
        </div>

        <SelectField
          label="Membership status"
          className="mt-3 sm:max-w-[240px]"
          options={['All Statuses', 'Active', 'Renewal Due', 'Suspended']}
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            resetPage();
          }} />
        
      </div>

      <p className="mt-4 text-[13.5px] text-mcaa-muted">
        Showing {visible.length} of {filtered.length} member firms
      </p>

      {visible.length === 0 ?
      <p className="mt-4 rounded-mcaa border border-dashed border-mcaa-border bg-mcaa-page p-6 text-center text-[14px] text-mcaa-muted">
          No member records match the selected filters.
        </p> :

      <ul className="mt-2 divide-y divide-mcaa-border border-y border-mcaa-border">
          {visible.map((member) =>
        <li key={member.id} className="py-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="text-[15.5px] font-semibold leading-snug text-mcaa-navy">{member.company}</h2>
                <StatusPill status={member.status} />
              </div>
              <dl className="mt-1.5 grid gap-x-4 gap-y-1 text-[13.5px] sm:grid-cols-2">
                <div className="flex gap-1.5">
                  <dt className="text-mcaa-muted">Representative:</dt>
                  <dd className="text-mcaa-text">{member.representative}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-mcaa-muted">Member ID:</dt>
                  <dd className="tabular-nums text-mcaa-text">{member.memberId}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-mcaa-muted">Customs Licence:</dt>
                  <dd className="tabular-nums text-mcaa-text">{member.licence}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-mcaa-muted">Business Location:</dt>
                  <dd className="text-mcaa-text">{member.location}</dd>
                </div>
              </dl>
              <button type="button" className="mt-1.5 text-[13.5px] font-medium text-mcaa-blue hover:underline">
                View Details →
              </button>
            </li>
        )}
        </ul>
      }

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </div>);

}