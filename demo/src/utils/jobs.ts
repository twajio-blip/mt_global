import { countries } from '../data/countries';
import { designations, sectors } from '../data/designations';
import type { Job, JobBenefits } from '../types/job';

export const benefitLabels: Record<keyof JobBenefits, string> = {
  accommodation: 'Accommodation',
  food: 'Food',
  transportation: 'Transportation',
  medical: 'Medical',
  airTicket: 'Air Ticket'
};

export const emptyBenefits: JobBenefits = {
  accommodation: false,
  food: false,
  transportation: false,
  medical: false,
  airTicket: false
};

export function getActiveBenefits(job: Job): (keyof JobBenefits)[] {
  return (Object.keys(benefitLabels) as (keyof JobBenefits)[]).filter((key) => job.benefits[key]);
}

export function getPublishedJobs(allJobs: Job[]): Job[] {
  return allJobs.
  filter((job) => job.status === 'Published').
  sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export interface CountrySummary {
  country: string;
  jobs: number;
  vacancies: number;
}

export function summarizeByCountry(allJobs: Job[]): CountrySummary[] {
  const map = new Map<string, CountrySummary>();
  allJobs.forEach((job) => {
    const current = map.get(job.country) ?? { country: job.country, jobs: 0, vacancies: 0 };
    current.jobs += 1;
    current.vacancies += job.vacancies;
    map.set(job.country, current);
  });
  return Array.from(map.values()).sort((a, b) => b.jobs - a.jobs || b.vacancies - a.vacancies);
}

export interface DesignationSummary {
  designation: string;
  jobs: number;
}

export function summarizeByDesignation(allJobs: Job[]): DesignationSummary[] {
  const map = new Map<string, number>();
  allJobs.forEach((job) => map.set(job.designation, (map.get(job.designation) ?? 0) + 1));
  return Array.from(map.entries()).
  map(([designation, count]) => ({ designation, jobs: count })).
  sort((a, b) => a.designation.localeCompare(b.designation));
}

export function groupDesignationsBySector(list: DesignationSummary[]) {
  const groups = new Map<string, DesignationSummary[]>();
  list.forEach((item) => {
    const sector = designations.find((d) => d.name === item.designation)?.sector ?? 'Other Roles';
    groups.set(sector, [...(groups.get(sector) ?? []), item]);
  });
  const order = [...sectors, 'Other Roles'];
  return order.
  filter((sector) => groups.has(sector)).
  map((sector) => ({ sector, items: groups.get(sector) ?? [] }));
}

export function getCountryCode(name: string): string | undefined {
  return countries.find((c) => c.name === name)?.code;
}

export function createJobId(): string {
  return `j-${Date.now().toString().slice(-6)}`;
}