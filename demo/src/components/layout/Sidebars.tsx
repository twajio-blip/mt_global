import React from 'react';
import { PrayerTimes } from '../sidebar/PrayerTimes';
import { LeaderMessage } from '../sidebar/LeaderMessage';
import { LatestNotices } from '../sidebar/LatestNotices';
import { LinkListModule } from '../sidebar/LinkListModule';
import { CurrencyConverter } from '../sidebar/CurrencyConverter';
import { CondolenceWidget } from '../sidebar/CondolenceWidget';
import { LEADERSHIP, NBR_LINKS, PORT_LINKS } from '../../data/site';

export function LeftSidebarContent() {
  return (
    <>
      <PrayerTimes />
      <LeaderMessage
        title="Message from President"
        name={LEADERSHIP.president.name}
        designation={LEADERSHIP.president.designation}
        company={LEADERSHIP.president.company}
        portrait={LEADERSHIP.president.portrait}
        excerpt={LEADERSHIP.president.excerpt}
        to="/about" />
      
      <LeaderMessage
        title="Message from General Secretary"
        name={LEADERSHIP.secretary.name}
        designation={LEADERSHIP.secretary.designation}
        company={LEADERSHIP.secretary.company}
        portrait={LEADERSHIP.secretary.portrait}
        excerpt={LEADERSHIP.secretary.excerpt}
        to="/about" />
      
      <LatestNotices />
    </>);

}

export function RightSidebarContent() {
  return (
    <>
      <LinkListModule title="NBR Information" links={NBR_LINKS} />
      <LinkListModule title="Port Information" links={PORT_LINKS} />
      <CurrencyConverter />
      <CondolenceWidget />
    </>);

}