import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { CommitteeDirectory } from '../../components/committee/CommitteeDirectory';
import { COMMITTEE_TERM, advisoryCommittee } from '../../data/committee';

export function AdvisoryCommittee() {
  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Committee' }, { label: 'Advisory Committee' }]}
        title="Advisory Committee" />
      

      <p className="mb-4 inline-block rounded-mcaa border border-mcaa-border bg-mcaa-light px-3 py-1.5 text-[14px] font-medium text-mcaa-navy">
        Committee Term: {COMMITTEE_TERM}
      </p>

      <p className="mb-4 text-[15.5px] leading-relaxed text-mcaa-text">
        The Advisory Committee consists of former office bearers and senior members of the Association. The committee
        advises the Executive Committee on policy, professional discipline and matters placed before the customs and
        port authorities.
      </p>

      <CommitteeDirectory members={advisoryCommittee} />
    </div>);

}