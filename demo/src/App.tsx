import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ScrollToTop } from './components/ScrollToTop';
import { PublicLayout } from './components/public/PublicLayout';
import { PortalLayout } from './components/portal/PortalLayout';
import { RequireAuth } from './components/portal/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Jobs } from './pages/public/Jobs';
import { JobDetails } from './pages/public/JobDetails';
import { LegalPage } from './pages/public/LegalPage';
import { Contact } from './pages/public/Contact';
import { PortalLogin } from './pages/portal/PortalLogin';
import { Dashboard } from './pages/portal/Dashboard';
import { JobsManage } from './pages/portal/JobsManage';
import { JobEditor } from './pages/portal/JobEditor';
import { CvManage } from './pages/portal/CvManage';

export function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="jobs/:jobId" element={<JobDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy-policy" element={<LegalPage pageKey="privacy" />} />
              <Route path="terms-and-conditions" element={<LegalPage pageKey="terms" />} />
              <Route path="recruitment-disclaimer" element={<LegalPage pageKey="recruitment-disclaimer" />} />
              <Route path="cv-submission-policy" element={<LegalPage pageKey="cv-submission" />} />
              <Route path="cookie-policy" element={<LegalPage pageKey="cookies" />} />
              <Route path="licence-regulatory-information" element={<LegalPage pageKey="licence" />} />
            </Route>
            <Route path="portal/login" element={<PortalLogin />} />
            <Route
              path="portal"
              element={
              <RequireAuth>
                  <PortalLayout />
                </RequireAuth>
              }>
              
              <Route index element={<Dashboard />} />
              <Route path="jobs" element={<JobsManage />} />
              <Route path="jobs/new" element={<JobEditor />} />
              <Route path="jobs/:jobId/edit" element={<JobEditor />} />
              <Route path="cvs" element={<CvManage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors closeButton />
      </AuthProvider>
    </DataProvider>);

}
