import React, { useEffect, useRef } from 'react';
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon } from 'lucide-react';

interface RichTextFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (html: string) => void;
}

const tools = [
{ command: 'bold', label: 'Bold', icon: BoldIcon },
{ command: 'italic', label: 'Italic', icon: ItalicIcon },
{ command: 'insertUnorderedList', label: 'Bulleted list', icon: ListIcon },
{ command: 'insertOrderedList', label: 'Numbered list', icon: ListOrderedIcon }];


export function RichTextField({ id, label, value, placeholder, onChange }: RichTextFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value;
    // initialise once; afterwards the editor owns its DOM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = (command: string) => {
    ref.current?.focus();
    document.execCommand(command);
    onChange(ref.current?.innerHTML ?? '');
  };

  return (
    <div>
      <span id={`${id}-label`} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
      </span>
      <div className="overflow-hidden rounded-lg border border-line bg-white transition-[border-color,box-shadow] duration-150 ease-out focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100">
        <div role="toolbar" aria-label={`${label} formatting`} className="flex gap-0.5 border-b border-line bg-surface px-1.5 py-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.command}
                type="button"
                aria-label={tool.label}
                title={tool.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => run(tool.command)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-600 transition-colors duration-150 ease-out hover:bg-white hover:text-brand-800">
                
                <Icon className="h-4 w-4" aria-hidden />
              </button>);

          })}
        </div>
        <div
          ref={ref}
          id={id}
          role="textbox"
          aria-multiline="true"
          aria-labelledby={`${id}-label`}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="rich-editor rich-content min-h-[120px] px-3.5 py-3 focus:outline-none" />
        
      </div>
    </div>);

}