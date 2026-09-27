import React from 'react';
import { Link } from 'react-router-dom';
import { JobCard } from '../public/JobCard';
import type { Job } from '../../types/job';
import { buttonSecondary, pageContainer } from '../../utils/styles';

interface LatestJobsSectionProps {
  jobs: Job[];
}

export function LatestJobsSection({ jobs }: LatestJobsSectionProps) {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="latest-title">
      <div className={pageContainer}>
        <h2 id="latest-title" className="text-3xl font-bold tracking-tight text-ink-900 md:text-4xl">
          Latest Overseas Job Opportunities
        </h2>
        <p className="mt-3 max-w-xl text-base text-ink-600">Newly published manpower requirements from our employers.</p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) =>
          <li key={job.id}>
              <JobCard job={job} />
            </li>
          )}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link to="/jobs" className={buttonSecondary}>
            Browse Jobs
          </Link>
        </div>
      </div>
    </section>);

}