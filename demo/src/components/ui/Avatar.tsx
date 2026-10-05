import React from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

function initials(name: string) {
  const cleaned = name.replace(/^(Late|Alhaj|Md\.|A\.K\.M\.)\s+/gi, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '');
}

export function Avatar({ name, src, size = 56, className = '' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={`Portrait of ${name}`}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`shrink-0 rounded-mcaa border border-mcaa-border object-cover ${className}`} />);


  }
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size / 2.8) }}
      className={`flex shrink-0 items-center justify-center rounded-mcaa border border-mcaa-border bg-mcaa-light font-semibold uppercase text-mcaa-blue ${className}`}>
      
      {initials(name)}
    </div>);

}