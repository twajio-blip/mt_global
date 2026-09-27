import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DownloadIcon, ExternalLinkIcon, FileTextIcon, MailIcon, MapPinIcon, PhoneIcon, XIcon } from 'lucide-react';
import { CountryFlag } from '../CountryFlag';
import type { Application } from '../../types/application';
import { downloadCv, openCv } from '../../utils/cv';
import { formatDateTime, formatFileSize, initials } from '../../utils/format';
import { buttonSmPrimary, buttonSmSecondary } from '../../utils/styles';

interface ApplicantDrawerProps {
  application: Application | null;
  onClose: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function ApplicantDrawer({ application, onClose }: ApplicantDrawerProps) {
  useEffect(() => {
    if (!application) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [application, onClose]);

  return (
    <AnimatePresence>
      {application &&
      <div className="fixed inset-0 z-50">
          <motion.div
          className="absolute inset-0 bg-ink-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose} />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-labelledby="applicant-name"
          className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-lift"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.26, ease }}>
          
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="text-sm font-semibold text-ink-500">Applicant</p>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              autoFocus
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-500 hover:bg-surface">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-800">
                  {initials(application.fullName)}
                </span>
                <div>
                  <h2 id="applicant-name" className="text-xl font-bold text-ink-900">{application.fullName}</h2>
                  <p className="text-sm text-ink-500">Submitted {formatDateTime(application.submittedAt)}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-[15px]">
                <li className="flex items-center gap-3">
                  <PhoneIcon className="h-4 w-4 text-ink-400" aria-hidden />
                  <a href={`tel:${application.phone.replace(/\s/g, '')}`} className="font-medium text-ink-900 hover:text-brand-800">
                    {application.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MailIcon className="h-4 w-4 text-ink-400" aria-hidden />
                  <a href={`mailto:${application.email}`} className="font-medium text-ink-900 hover:text-brand-800">
                    {application.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPinIcon className="h-4 w-4 text-ink-400" aria-hidden />
                  <span className="text-ink-700">{application.currentLocation}</span>
                </li>
              </ul>

              <section className="mt-7" aria-labelledby="applied-for">
                <h3 id="applied-for" className="text-sm font-semibold text-ink-900">Applied for</h3>
                <div className="mt-3 rounded-xl border border-line p-4">
                  <p className="font-semibold text-ink-900">{application.jobTitle}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-ink-500">Country</dt>
                      <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-ink-900">
                        <CountryFlag country={application.country} /> {application.country}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">Designation</dt>
                      <dd className="mt-0.5 font-medium text-ink-900">{application.designation}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-ink-500">Employer</dt>
                      <dd className="mt-0.5 font-medium text-ink-900">{application.employer}</dd>
                    </div>
                  </dl>
                  <Link
                  to={`/jobs/${application.jobId}`}
                  target="_blank"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:text-brand-600">
                  
                    View related job <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </section>

              {application.message &&
            <section className="mt-7" aria-labelledby="applicant-msg">
                  <h3 id="applicant-msg" className="text-sm font-semibold text-ink-900">Message</h3>
                  <p className="mt-2 rounded-xl bg-surface p-4 text-[15px] leading-relaxed text-ink-700">{application.message}</p>
                </section>
            }

              <section className="mt-7" aria-labelledby="applicant-cv">
                <h3 id="applicant-cv" className="text-sm font-semibold text-ink-900">CV</h3>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-line p-4">
                  <FileTextIcon className="h-8 w-8 shrink-0 text-brand-800" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink-900">{application.cvFileName}</p>
                    <p className="text-[13px] text-ink-500">{formatFileSize(application.cvFileSize)}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-line px-6 py-4">
              <button type="button" onClick={() => openCv(application)} className={buttonSmSecondary}>
                <ExternalLinkIcon className="h-4 w-4" aria-hidden /> Open CV
              </button>
              <button type="button" onClick={() => downloadCv(application)} className={buttonSmPrimary}>
                <DownloadIcon className="h-4 w-4" aria-hidden /> Download CV
              </button>
            </div>
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}