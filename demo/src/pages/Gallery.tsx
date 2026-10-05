import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SelectField } from '../components/ui/Controls';
import { GALLERY_YEARS, albums } from '../data/gallery';

export function Gallery() {
  const [year, setYear] = useState('All Years');
  const visible = albums.filter((album) => year === 'All Years' || album.year === year);

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} title="Photo Gallery" />

      <SelectField
        label="Year"
        options={GALLERY_YEARS}
        value={year}
        onChange={(event) => setYear(event.target.value)}
        className="mb-4 sm:max-w-[220px]" />
      

      <ul className="grid gap-4 sm:grid-cols-2">
        {visible.map((album) =>
        <li key={album.id} className="overflow-hidden rounded-mcaa border border-mcaa-border">
            <Link to={`/gallery/${album.id}`} className="block">
              <img src={album.cover} alt={album.title} className="h-[150px] w-full object-cover" />
            </Link>
            <div className="p-3">
              <h2 className="text-[15.5px] font-semibold leading-snug text-mcaa-navy">{album.title}</h2>
              <p className="mt-0.5 text-[13px] text-mcaa-muted">{album.date}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[13px] text-mcaa-muted">
                <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {album.photos} photographs
              </p>
              <Link
              to={`/gallery/${album.id}`}
              className="mt-1.5 block text-[13.5px] font-medium text-mcaa-blue hover:underline">
              
                View Album →
              </Link>
            </div>
          </li>
        )}
      </ul>
    </div>);

}