import React from 'react';
import { Link } from 'react-router-dom';
import { Module } from '../ui/Module';
import { Avatar } from '../ui/Avatar';
import { deceasedMembers } from '../../data/condolence';

export function CondolenceWidget() {
  const record = deceasedMembers[0];
  return (
    <Module
      title="Condolence"
      footer={
      <Link to="/condolence" className="font-medium text-mcaa-blue hover:underline">
          View Details →
        </Link>
      }>
      
      <div className="flex gap-3">
        <Avatar name={record.name} src={record.portrait} size={62} />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold leading-snug text-mcaa-navy">{record.name}</p>
          <p className="text-[13px] leading-snug text-mcaa-muted">{record.company}</p>
          {record.role ? <p className="text-[13px] leading-snug text-mcaa-muted">{record.role}</p> : null}
          <p className="mt-0.5 text-[13px] text-mcaa-text">Died: {record.dateOfDeath}</p>
        </div>
      </div>
      <p className="mt-2.5 border-t border-mcaa-border pt-2 text-[13.5px] leading-relaxed text-mcaa-muted">
        {record.message}
      </p>
    </Module>);

}