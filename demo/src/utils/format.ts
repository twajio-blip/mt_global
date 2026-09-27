import { differenceInCalendarDays, format, parseISO } from 'date-fns';

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy');
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy, h:mm a');
}

export function formatRelativeDay(iso: string): string {
  const days = differenceInCalendarDays(new Date(), parseISO(iso));
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return formatDate(iso);
}

export function isWithinDays(iso: string, days: number): boolean {
  return differenceInCalendarDays(new Date(), parseISO(iso)) < days;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function initials(name: string): string {
  return name.
  replace(/^Md\.\s*/i, '').
  split(/\s+/).
  slice(0, 2).
  map((part) => part[0]?.toUpperCase() ?? '').
  join('');
}