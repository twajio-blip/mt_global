import React, { DragEvent, useRef, useState } from 'react';
import { AlertCircleIcon, FileTextIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { formatFileSize } from '../../utils/format';

interface FileDropzoneProps {
  id: string;
  file: File | null;
  error?: string;
  onSelect: (file: File | null) => void;
}

export function FileDropzone({ id, file, error, onSelect }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onSelect(dropped);
  };

  const clear = () => {
    onSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <span className="mb-1.5 flex items-baseline gap-1.5 text-sm font-medium text-ink-900">
        Upload your CV <span className="text-danger-600" aria-hidden>*</span>
      </span>

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="peer sr-only"
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={`${id}-help`}
        onChange={(e) => onSelect(e.target.files?.[0] ?? null)} />
      

      {file ?
      <div className="flex items-center gap-3 rounded-xl border border-accent-500 bg-accent-50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-accent-700 ring-1 ring-accent-100">
            <FileTextIcon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-ink-900">{file.name}</p>
            <p className="text-[13px] text-ink-600">{formatFileSize(file.size)} · Ready to submit</p>
          </div>
          <label htmlFor={id} className="cursor-pointer rounded-md px-2 py-1.5 text-sm font-semibold text-brand-800 hover:bg-white">
            Change
          </label>
          <button
          type="button"
          onClick={clear}
          aria-label="Remove file"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-500 hover:bg-white hover:text-danger-700">
          
            <XIcon className="h-4 w-4" />
          </button>
        </div> :

      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-[border-color,background-color] duration-150 ease-out peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100 ${
        error ?
        'border-danger-600 bg-danger-50' :
        dragging ?
        'border-brand-600 bg-brand-50' :
        'border-ink-300 bg-surface hover:border-brand-500 hover:bg-brand-50'}`
        }>
        
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-800 ring-1 ring-line">
            <UploadCloudIcon className="h-6 w-6" aria-hidden />
          </span>
          <span className="mt-3 text-base font-semibold text-ink-900">
            <span className="text-brand-800 underline underline-offset-2">Choose file</span>
            <span className="hidden sm:inline"> or drag it here</span>
          </span>
          <span id={`${id}-help`} className="mt-1 text-[13px] text-ink-500">
            PDF, DOC or DOCX · Max 5 MB
          </span>
        </label>
      }

      {error &&
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-danger-700" role="alert">
          <AlertCircleIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      }
    </div>);

}