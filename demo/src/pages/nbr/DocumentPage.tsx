import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DownloadIcon, EyeIcon, FileTextIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SelectField, StatusPill, TextField } from '../../components/ui/Controls';
import { Pagination } from '../../components/ui/Pagination';
import { documentPages } from '../../data/documents';
import type { DocPageConfig } from '../../data/documents';

const PAGE_SIZE = 6;

function DocumentRow({ config, row }: {config: DocPageConfig;row: Record<string, string>;}) {
  const primaryKey = config.columns.find((column) => column.primary)?.key ?? config.columns[0].key;
  const secondary = config.columns.filter((column) => column.key !== primaryKey);

  return (
    <li className="flex gap-3 py-3">
      <FileTextIcon className="mt-1 h-5 w-5 shrink-0 text-mcaa-blue" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <h3 className="text-[15.5px] font-medium leading-snug text-mcaa-navy">{row[primaryKey]}</h3>
        <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[13.5px]">
          {secondary.map((column) =>
          <div key={column.key} className="flex gap-1.5">
              <dt className="text-mcaa-muted">{column.label}:</dt>
              <dd className="text-mcaa-text">
                {column.key === 'status' ? <StatusPill status={row[column.key]} /> : row[column.key]}
              </dd>
            </div>
          )}
        </dl>
        <div className="mt-1.5 flex gap-3">
          <button type="button" className="inline-flex items-center gap-1 text-[13.5px] font-medium text-mcaa-blue hover:underline">
            <EyeIcon className="h-4 w-4" aria-hidden="true" /> View
          </button>
          {config.downloadable !== false &&
          <button type="button" className="inline-flex items-center gap-1 text-[13.5px] font-medium text-mcaa-blue hover:underline">
              <DownloadIcon className="h-4 w-4" aria-hidden="true" /> Download
            </button>
          }
        </div>
      </div>
    </li>);

}

export function DocumentPage() {
  const { slug } = useParams();
  const config = slug ? documentPages[slug] : undefined;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  React.useEffect(() => {
    setPage(1);
    setQuery('');
  }, [slug]);

  if (!config) return <Navigate to="/" replace />;

  const term = query.trim().toLowerCase();
  const filtered = term ?
  config.rows.filter((row) =>
  Object.values(row).join(' ').toLowerCase().includes(term)
  ) :
  config.rows;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader crumbs={config.breadcrumb} title={config.title} />

      <p className="text-[15.5px] leading-relaxed text-mcaa-text">{config.intro}</p>

      {config.featured &&
      <section className="mt-4 rounded-mcaa border border-mcaa-blue bg-mcaa-light p-3.5">
          <h2 className="text-[16px] font-semibold text-mcaa-navy">{config.featured.heading}</h2>
          <dl className="mt-2 grid gap-x-4 gap-y-1 text-[14px] sm:grid-cols-2">
            {config.featured.fields.map((field) =>
          <div key={field.label} className="flex gap-1.5">
                <dt className="text-mcaa-muted">{field.label}:</dt>
                <dd className="text-mcaa-text">{field.value}</dd>
              </div>
          )}
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
      }

      <div className="mt-4 grid gap-3 rounded-mcaa border border-mcaa-border bg-mcaa-light p-3 sm:grid-cols-2">
        <TextField
          label="Search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search documents" />
        
        {config.filters.map((filter) =>
        <SelectField key={filter.label} label={filter.label} options={filter.options} />
        )}
      </div>

      <h2 className="mb-1 mt-5 border-b border-mcaa-border pb-2 text-[17px] font-semibold text-mcaa-navy">
        {config.featured ? config.featured.archiveHeading : 'Documents'}
      </h2>

      {visible.length === 0 ?
      <p className="mt-3 rounded-mcaa border border-dashed border-mcaa-border bg-mcaa-page p-6 text-center text-[14px] text-mcaa-muted">
          No documents match your search.
        </p> :

      <ul className="divide-y divide-mcaa-border border-b border-mcaa-border">
          {visible.map((row) =>
        <DocumentRow key={row.id} config={config} row={row} />
        )}
        </ul>
      }

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />

      <p className="mt-4 text-[13px] text-mcaa-muted">
        Documents are reproduced for the convenience of members. The published version of the issuing authority remains
        the official source.
      </p>
    </div>);

}