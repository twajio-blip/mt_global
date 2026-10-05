import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { CommitteeDirectory, HighlightCard } from '../../components/committee/CommitteeDirectory';
import { COMMITTEE_TERM, executiveCommittee } from '../../data/committee';
import { LEADERSHIP } from '../../data/site';

export function ExecutiveCommittee() {
  const president = executiveCommittee[0];
  const secretary = executiveCommittee[1];
  const others = executiveCommittee.slice(2);

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Committee' }, { label: 'Executive Committee' }]}
        title="Executive Committee" />
      

      <p className="mb-4 inline-block rounded-mcaa border border-mcaa-border bg-mcaa-light px-3 py-1.5 text-[14px] font-medium text-mcaa-navy">
        Committee Term: {COMMITTEE_TERM}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <HighlightCard member={president} portrait={LEADERSHIP.president.portrait} />
        <HighlightCard member={secretary} portrait={LEADERSHIP.secretary.portrait} />
      </div>

      <h2 className="mb-3 mt-5 border-b border-mcaa-border pb-2 text-[18px] font-semibold text-mcaa-navy">
        Committee Members
      </h2>
      <CommitteeDirectory members={others} />
    </div>);

}