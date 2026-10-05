import React from 'react';
import { Module } from '../ui/Module';
import { PRAYER_TIMES } from '../../data/site';

export function PrayerTimes() {
  return (
    <Module title="Prayer Times">
      <p className="text-[13px] font-medium text-mcaa-navy">Mongla, Bagerhat</p>
      <p className="text-[13px] text-mcaa-muted">Tuesday, 11 August 2026</p>
      <p className="font-bn text-[13px] text-mcaa-muted">১৭ সফর ১৪৪৮ হিজরি</p>
      <ul className="mt-2.5 divide-y divide-mcaa-border border-t border-mcaa-border">
        {PRAYER_TIMES.map((prayer) =>
        <li key={prayer.name} className="flex items-center justify-between py-1.5">
            <span className="text-[14px] text-mcaa-text">{prayer.name}</span>
            <span className="text-[14px] font-medium tabular-nums text-mcaa-navy">{prayer.time}</span>
          </li>
        )}
      </ul>
    </Module>);

}