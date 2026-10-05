import React, { useMemo, useState } from 'react';
import { DownloadIcon, EyeIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SelectField, TextField } from '../components/ui/Controls';
import { Pagination } from '../components/ui/Pagination';
import { NOTICE_CATEGORIES, notices } from '../data/notices';

const MONTHS = [
'All Months',
'January',
'February',
'March',
'April',
'May',
'June',
'July',
'August',
'September',
'October',
'November',
'December'];

const PAGE_SIZE = 8;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function Notices() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('All Years');
  const [month, setMonth] = useState('All Months');
  const [category, setCategory] = useState('All Categories');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return notices.filter((notice) => {
      const date = new Date(notice.date);
      const matchesTerm =
      !term || `${notice.title} ${notice.reference}`.toLowerCase().includes(term);
      const matchesYear = year === 'All Years' || String(date.getFullYear()) === year;
      const matchesMonth = month === 'All Months' || MONTHS[date.getMonth() + 1] === month;
      const matchesCategory = category === 'All Categories' || notice.category === category;
      return matchesTerm && matchesYear && matchesMonth && matchesCategory;
    });
  }, [query, year, month, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Notices' }]} title="Notice Board" />

      <div className="rounded-mcaa border border-mcaa-border bg-mcaa-light p-3">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-[34px] h-4 w-4 text-mcaa-muted" aria-hidden="true" />
          <TextField
            label="Search notices"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search by title or reference number"
            className="[&_input]:pl-9" />
          
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <SelectField
            label="Year"
            options={['All Years', '2026', '2025']}
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
              setPage(1);
            }} />
          
          <SelectField
            label="Month"
            options={MONTHS}
            value={month}
            onChange={(event) => {
              setMonth(event.target.value);
              setPage(1);
            }} />
          
          <SelectField
            label="Category"
            options={['All Categories', ...NOTICE_CATEGORIES]}
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }} />
          
        </div>
      </div>

      <p className="mt-4 text-[13.5px] text-mcaa-muted">{filtered.length} notices found</p>

      {visible.length === 0 ?
      <p className="mt-3 rounded-mcaa border border-dashed border-mcaa-border bg-mcaa-page p-6 text-center text-[14px] text-mcaa-muted">
          No notices match the selected filters.
        </p> :

      <ul className="mt-2 divide-y divide-mcaa-border border-y border-mcaa-border">
          {visible.map((notice) =>
        <li key={notice.id} className="flex gap-3 py-3">
              <FileTextIcon className="mt-1 h-5 w-5 shrink-0 text-mcaa-blue" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-mcaa-muted">{formatDate(notice.date)}</p>
                <h2 className="text-[15.5px] font-medium leading-snug text-mcaa-navy">{notice.title}</h2>
                <p className="mt-0.5 text-[13px] text-mcaa-muted">
                  Ref: <span className="tabular-nums">{notice.reference}</span> · {notice.category} · {notice.fileType}
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
      }

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </div>);

}