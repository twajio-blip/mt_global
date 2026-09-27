export type JobStatus = 'Draft' | 'Published' | 'Inactive';

export interface JobBenefits {
  accommodation: boolean;
  food: boolean;
  transportation: boolean;
  medical: boolean;
  airTicket: boolean;
}

export interface Job {
  id: string;
  title: string;
  designation: string;
  country: string;
  location?: string;
  employer: string;
  vacancies: number;
  salary?: string;
  employmentType?: string;
  contractDuration?: string;
  workingHours?: string;
  overtime?: string;
  experience?: string;
  education?: string;
  age?: string;
  gender?: string;
  benefits: JobBenefits;
  visaType?: string;
  visaInfo?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  additionalInfo?: string;
  deadline?: string;
  publishedAt: string;
  status: JobStatus;
}

export interface Country {
  name: string;
  code: string;
}

export interface Designation {
  name: string;
  sector: string;
}