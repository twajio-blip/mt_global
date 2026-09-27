import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UploadIcon } from 'lucide-react';
import { buttonPrimary } from '../../utils/styles';

interface MobileApplyBarProps {
  salary?: string;
  vacancies: number;
}

export function MobileApplyBar({ salary, vacancies }: MobileApplyBarProps) {
  const [applyVisible, setApplyVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('apply');
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setApplyVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!applyVisible &&
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 lg:hidden">
        
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold text-accent-700">{salary ?? 'Salary on request'}</p>
              <p className="text-[13px] text-ink-500">{vacancies} vacancies</p>
            </div>
            <a href="#apply" className={`${buttonPrimary} h-12 px-5`}>
              <UploadIcon className="h-4 w-4" aria-hidden />
              Submit Your CV
            </a>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}