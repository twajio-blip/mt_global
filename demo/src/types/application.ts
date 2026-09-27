export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  country: string;
  designation: string;
  employer: string;
  fullName: string;
  phone: string;
  email: string;
  currentLocation: string;
  message?: string;
  cvFileName: string;
  cvFileSize: number;
  cvUrl?: string;
  consentAcceptedAt?: string;
  submittedAt: string;
}

export type NewApplicationInput = Pick<
  Application,
  | 'fullName'
  | 'phone'
  | 'email'
  | 'currentLocation'
  | 'message'
  | 'cvFileName'
  | 'cvFileSize'
  | 'cvUrl'
  | 'consentAcceptedAt'>;
