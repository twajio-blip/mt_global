import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ExecutiveCommittee } from './pages/committee/ExecutiveCommittee';
import { AdvisoryCommittee } from './pages/committee/AdvisoryCommittee';
import { FormerPresidents } from './pages/committee/FormerPresidents';
import { FormerGeneralSecretaries } from './pages/committee/FormerGeneralSecretaries';
import { GeneralMembers } from './pages/committee/GeneralMembers';
import { Notices } from './pages/Notices';
import { Gallery } from './pages/Gallery';
import { AlbumDetail } from './pages/AlbumDetail';
import { Contact } from './pages/Contact';
import { WebLinks } from './pages/WebLinks';
import { Condolence } from './pages/Condolence';
import { DocumentPage } from './pages/nbr/DocumentPage';
import { BerthingSchedule } from './pages/port/BerthingSchedule';
import { PortTariff } from './pages/port/PortTariff';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/committee/executive" element={<ExecutiveCommittee />} />
          <Route path="/committee/advisory" element={<AdvisoryCommittee />} />
          <Route path="/committee/former-presidents" element={<FormerPresidents />} />
          <Route path="/committee/former-general-secretaries" element={<FormerGeneralSecretaries />} />
          <Route path="/committee/general-members" element={<GeneralMembers />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:albumId" element={<AlbumDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weblink" element={<WebLinks />} />
          <Route path="/condolence" element={<Condolence />} />
          <Route path="/nbr/:slug" element={<DocumentPage />} />
          <Route path="/port/berthing-schedule" element={<BerthingSchedule />} />
          <Route path="/port/tariff" element={<PortTariff />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}