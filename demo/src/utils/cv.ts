import { toast } from 'sonner';
import type { Application } from '../types/application';

export function openCv(app: Application): void {
  if (!app.cvUrl) {
    toast.info(`${app.cvFileName} is a sample record — no file is attached in this demo.`);
    return;
  }
  window.open(app.cvUrl, '_blank', 'noopener');
}

export function downloadCv(app: Application): void {
  if (!app.cvUrl) {
    toast.info(`${app.cvFileName} is a sample record — no file is attached in this demo.`);
    return;
  }
  const link = document.createElement('a');
  link.href = app.cvUrl;
  link.download = app.cvFileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function fileExtension(name: string): string {
  return (name.split('.').pop() ?? '').toUpperCase();
}