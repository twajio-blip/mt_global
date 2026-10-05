import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { FormerList } from '../../components/committee/FormerList';
import { formerPresidents } from '../../data/committee';

export function FormerPresidents() {
  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Committee' }, { label: 'Former Presidents' }]}
        title="Former Presidents" />
      
      <p className="mb-4 text-[15.5px] leading-relaxed text-mcaa-text">
        Presidents who have led Mongla Customs Agents’ Association since its establishment, listed from the most recent
        term.
      </p>
      <FormerList records={formerPresidents} roleLabel="President" />
    </div>);

}