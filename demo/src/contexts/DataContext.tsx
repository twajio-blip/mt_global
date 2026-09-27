import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { applications as seedApplications } from '../data/applications';
import { jobs as seedJobs } from '../data/jobs';
import type { Application, NewApplicationInput } from '../types/application';
import type { Job, JobStatus } from '../types/job';

interface DataContextValue {
  jobs: Job[];
  applications: Application[];
  cvCounts: Record<string, number>;
  addApplication: (jobId: string, input: NewApplicationInput) => Application;
  saveJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  setJobStatus: (id: string, status: JobStatus) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: {children: React.ReactNode;}) {
  const [jobs, setJobs] = useState<Job[]>(seedJobs);
  const [applications, setApplications] = useState<Application[]>(seedApplications);

  const cvCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    applications.forEach((app) => {
      counts[app.jobId] = (counts[app.jobId] ?? 0) + 1;
    });
    return counts;
  }, [applications]);

  const addApplication = useCallback(
    (jobId: string, input: NewApplicationInput) => {
      const job = jobs.find((j) => j.id === jobId);
      const application: Application = {
        ...input,
        id: `a-${Date.now()}`,
        jobId,
        jobTitle: job?.title ?? '',
        country: job?.country ?? '',
        designation: job?.designation ?? '',
        employer: job?.employer ?? '',
        submittedAt: new Date().toISOString()
      };
      setApplications((prev) => [application, ...prev]);
      return application;
    },
    [jobs]
  );

  const saveJob = useCallback((job: Job) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      return exists ? prev.map((j) => j.id === job.id ? job : j) : [job, ...prev];
    });
  }, []);

  const deleteJob = useCallback((id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const setJobStatus = useCallback((id: string, status: JobStatus) => {
    setJobs((prev) => prev.map((j) => j.id === id ? { ...j, status } : j));
  }, []);

  const value = useMemo(
    () => ({ jobs, applications, cvCounts, addApplication, saveJob, deleteJob, setJobStatus }),
    [jobs, applications, cvCounts, addApplication, saveJob, deleteJob, setJobStatus]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}