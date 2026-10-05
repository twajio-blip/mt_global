import React from 'react';
import { Avatar } from '../ui/Avatar';
import type { CommitteeMember } from '../../types';

interface CommitteeDirectoryProps {
  members: CommitteeMember[];
}

export function CommitteeDirectory({ members }: CommitteeDirectoryProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {members.map((member) =>
      <li
        key={member.id}
        className="flex gap-3 rounded-mcaa border border-mcaa-border bg-white p-3">
        
          <Avatar name={member.name} size={54} />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-snug text-mcaa-navy">{member.name}</p>
            <p className="text-[13.5px] font-medium text-mcaa-blue">{member.position}</p>
            <p className="text-[13.5px] leading-snug text-mcaa-muted">{member.company}</p>
          </div>
        </li>
      )}
    </ul>);

}

interface HighlightCardProps {
  member: CommitteeMember;
  portrait?: string;
}

export function HighlightCard({ member, portrait }: HighlightCardProps) {
  return (
    <div className="flex gap-3 rounded-mcaa border border-mcaa-border bg-mcaa-light p-3">
      <Avatar name={member.name} src={portrait} size={76} />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-mcaa-blue">{member.position}</p>
        <p className="mt-0.5 text-[16px] font-semibold leading-snug text-mcaa-navy">{member.name}</p>
        <p className="text-[14px] leading-snug text-mcaa-muted">{member.company}</p>
        <p className="mt-1 text-[13px] text-mcaa-muted">Term 2026–2028</p>
      </div>
    </div>);

}