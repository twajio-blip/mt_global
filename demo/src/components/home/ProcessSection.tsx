import React from 'react';
import { pageContainer } from '../../utils/styles';

const steps = [
{ title: 'Find a Job', text: 'Browse jobs by country or profession.' },
{
  title: 'Review the Opportunity',
  text: 'Check job details, requirements, salary, vacancies, and destination.'
},
{ title: 'Submit Your CV', text: 'Upload your existing CV directly for the selected job.' }];


export function ProcessSection() {
  return (
    <section className="border-y border-line bg-white py-16 lg:py-24" aria-labelledby="process-title">
      <div className={`${pageContainer} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <h2 id="process-title" className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
            Find and Apply for Overseas Jobs Easily
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-600">
            No account, no long forms. If you already have a CV, you can apply for any job in about two minutes — right
            from your phone.
          </p>
        </div>

        <ol className="relative lg:col-span-7">
          {steps.map((step, i) =>
          <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
              {i < steps.length - 1 &&
            <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-line" aria-hidden />
            }
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-800 text-[15px] font-bold text-white">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-lg font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-1 text-[15px] text-ink-600">{step.text}</p>
              </div>
            </li>
          )}
        </ol>
      </div>
    </section>);

}