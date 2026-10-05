import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { XIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { albums } from '../data/gallery';

export function AlbumDetail() {
  const { albumId } = useParams();
  const album = albums.find((item) => item.id === albumId) ?? albums[0];
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = Array.from({ length: Math.min(album.photos, 12) }, (_, index) => ({
    src: albums[(index + albums.indexOf(album)) % albums.length].cover,
    label: `${album.title} — photograph ${index + 1}`
  }));

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery', to: '/gallery' }, { label: album.title }]}
        title={album.title} />
      

      <p className="text-[13.5px] text-mcaa-muted">
        {album.date} · {album.photos} photographs
      </p>
      <p className="mt-2 text-[15.5px] leading-relaxed text-mcaa-text">{album.description}</p>

      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {photos.map((photo, index) =>
        <li key={photo.label}>
            <button
            type="button"
            onClick={() => setLightbox(index)}
            className="block w-full overflow-hidden rounded-mcaa border border-mcaa-border">
            
              <img src={photo.src} alt={photo.label} className="h-[104px] w-full object-cover sm:h-[120px]" />
            </button>
          </li>
        )}
      </ul>

      {lightbox !== null &&
      <div
        role="dialog"
        aria-modal="true"
        aria-label={photos[lightbox].label}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={() => setLightbox(null)}>
        
          <button
          type="button"
          onClick={() => setLightbox(null)}
          aria-label="Close preview"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-mcaa bg-white/15 text-white hover:bg-white/25">
          
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <figure className="max-h-full w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].label} className="max-h-[70vh] w-full object-contain" />
            <figcaption className="mt-2 text-center text-[13.5px] text-white">{photos[lightbox].label}</figcaption>
          </figure>
        </div>
      }
    </div>);

}