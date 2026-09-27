import React, { useMemo } from 'react';
import { HomeHero } from '../../components/home/HomeHero';
import { DestinationsSection } from '../../components/home/DestinationsSection';
import { ProfessionsSection } from '../../components/home/ProfessionsSection';
import { LatestJobsSection } from '../../components/home/LatestJobsSection';
import { ProcessSection } from '../../components/home/ProcessSection';
import { HomeCta } from '../../components/home/HomeCta';
import { useData } from '../../contexts/DataContext';
import { getPublishedJobs, summarizeByCountry, summarizeByDesignation } from '../../utils/jobs';

export function Home() {
  const { jobs } = useData();
  const published = useMemo(() => getPublishedJobs(jobs), [jobs]);
  const byCountry = useMemo(() => summarizeByCountry(published), [published]);
  const byDesignation = useMemo(() => summarizeByDesignation(published), [published]);
  const totalVacancies = published.reduce((sum, j) => sum + j.vacancies, 0);

  return (
    <>
      <HomeHero
        countryOptions={byCountry.map((c) => ({ value: c.country, label: `${c.country} (${c.jobs})` }))}
        designationOptions={byDesignation.map((d) => ({ value: d.designation, label: d.designation }))}
        totalVacancies={totalVacancies}
        totalJobs={published.length}
        countryCount={byCountry.length} />
      
      <DestinationsSection summaries={byCountry} />
      <ProfessionsSection summaries={byDesignation} />
      <LatestJobsSection jobs={published.slice(0, 6)} />
      <ProcessSection />
      <HomeCta />
    </>);

}