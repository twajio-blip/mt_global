import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function ConfirmDialog({ open, title, description, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
          className="absolute inset-0 bg-ink-900/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onCancel} />
        
          <motion.div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          aria-describedby="confirm-desc"
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lift"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease }}>
          
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-danger-50 text-danger-600">
              <AlertTriangleIcon className="h-5 w-5" aria-hidden />
            </span>
            <h2 id="confirm-title" className="mt-4 text-lg font-semibold text-ink-900">{title}</h2>
            <p id="confirm-desc" className="mt-2 text-[15px] text-ink-600">{description}</p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
              ref={cancelRef}
              type="button"
              onClick={onCancel}
              className="h-11 rounded-lg border border-line px-4 text-sm font-semibold text-ink-900 hover:bg-surface">
              
                Cancel
              </button>
              <button
              type="button"
              onClick={onConfirm}
              className="h-11 rounded-lg bg-danger-600 px-4 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-danger-700">
              
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}