import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormerList } from '../../components/committee/FormerList';
import { formerGeneralSecretaries } from '../../data/committee';

export function FormerGeneralSecretaries() {
  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Committee' }, { label: 'Former General Secretaries' }]}
        title="Former General Secretaries" />
      
      <p className="mb-4 text-[15.5px] leading-relaxed text-mcaa-text">
        General Secretaries who have served the Association, listed from the most recent term.
      </p>
      <FormerList records={formerGeneralSecretaries} roleLabel="General Secretary" />
    </div>);

}