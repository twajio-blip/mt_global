import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from 'lucide-react';
import { JobSearchPanel } from './JobSearchPanel';
import type { SelectOption } from '../ui/SelectField';
import { company } from '../../data/company';
import { images } from '../../data/images';
import { pageContainer } from '../../utils/styles';

interface HomeHeroProps {
  countryOptions: SelectOption[];
  designationOptions: SelectOption[];
  totalVacancies: number;
  totalJobs: number;
  countryCount: number;
}

const popularSearches = [
{ label: 'Electrician in Saudi Arabia', country: 'Saudi Arabia', designation: 'Electrical Technician' },
{ label: 'Driver in UAE', country: 'UAE', designation: 'Heavy Vehicle Driver' },
{ label: 'Construction in Qatar', country: 'Qatar', designation: 'Construction Worker' },
{ label: 'Factory jobs in Romania', country: 'Romania', designation: 'Factory Worker' }];


export function HomeHero({ countryOptions, designationOptions, totalVacancies, totalJobs, countryCount }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-900" aria-labelledby="hero-title">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <img src={images.hero} alt="Skilled construction workers at an overseas project site" className="h-full w-full object-cover" />
      </div>

      <div className={`${pageContainer} relative`}>
        <div className="py-12 sm:py-16 lg:w-[62%] lg:py-24 lg:pr-12">
          <p className="flex items-center gap-2 text-sm font-medium text-brand-200">
            <ShieldCheckIcon className="h-4 w-4 text-accent-500" aria-hidden />
            {company.license}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[56px]">
            
            Find Your Next Overseas Job Opportunity
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
            Explore verified job opportunities across the Middle East and other international destinations. Find jobs by
            country and profession and submit your CV directly.
          </p>

          <div className="mt-8 max-w-2xl">
            <JobSearchPanel countryOptions={countryOptions} designationOptions={designationOptions} />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
            <span className="text-brand-200">Popular:</span>
            {popularSearches.map((s) =>
            <Link
              key={s.label}
              to={`/jobs?country=${encodeURIComponent(s.country)}&designation=${encodeURIComponent(s.designation)}`}
              className="rounded-full border border-white/20 px-3 py-1 text-white transition-colors duration-150 ease-out hover:border-white/50">
              
                {s.label}
              </Link>
            )}
          </div>

          <p className="mt-10 text-sm text-brand-200">
            <span className="font-semibold text-white">{totalVacancies.toLocaleString()} vacancies</span> across{' '}
            <span className="font-semibold text-white">{totalJobs} open jobs</span> in{' '}
            <span className="font-semibold text-white">{countryCount} countries</span>
          </p>
        </div>
      </div>
    </section>);

}
