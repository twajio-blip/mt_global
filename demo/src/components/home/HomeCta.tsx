import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { images } from '../../data/images';
import { buttonPrimary, pageContainer } from '../../utils/styles';

export function HomeCta() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="cta-title">
      <div className={pageContainer}>
        <div className="grid overflow-hidden rounded-2xl bg-brand-800 lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-14">
            <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Explore Overseas Job Opportunities?
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-brand-100">
              Browse available manpower requirements and submit your CV for positions that match your skills and
              experience.
            </p>
            <Link to="/jobs" className={`${buttonPrimary} mt-8`}>
              Browse All Jobs
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <img src={images.cta} alt="Technicians inspecting electrical panels" className="h-64 w-full object-cover lg:h-full" />
        </div>
      </div>
    </section>);

}