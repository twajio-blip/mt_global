export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_EXTENSIONS = ['pdf', 'doc', 'docx'];

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, '').length >= 7;
}

export function validateCvFile(file: File): string | undefined {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!CV_EXTENSIONS.includes(ext)) return 'Please upload a PDF, DOC or DOCX file.';
  if (file.size > CV_MAX_BYTES) return 'File is larger than 5 MB. Please upload a smaller file.';
  return undefined;
}