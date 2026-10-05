import React, { useState } from 'react';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Button, TextArea, TextField } from '../components/ui/Controls';
import { ASSOCIATION } from '../data/site';

const DEPARTMENTS = [
{ name: 'Association Office', person: 'Office Secretary', phone: '+880 2477 775 210', email: 'office@mcaa.org.bd' },
{ name: 'Membership & Licence Records', person: 'Assistant Secretary', phone: '+880 1711 456 903', email: 'membership@mcaa.org.bd' },
{ name: 'Accounts & Subscription', person: 'Treasurer', phone: '+880 1711 456 904', email: 'accounts@mcaa.org.bd' },
{ name: 'Customs Liaison', person: 'General Secretary', phone: '+880 1711 456 902', email: 'liaison@mcaa.org.bd' }];


export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} title="Contact Us" />

      <section>
        <h2 className="text-[18px] font-semibold text-mcaa-navy">Association Office</h2>
        <ul className="mt-2 space-y-2 text-[15px] text-mcaa-text">
          <li className="flex gap-2">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-blue" aria-hidden="true" />
            {ASSOCIATION.address}
          </li>
          <li className="flex gap-2">
            <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-blue" aria-hidden="true" />
            <span>
              {ASSOCIATION.phone} · {ASSOCIATION.altPhone}
            </span>
          </li>
          <li className="flex gap-2">
            <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-blue" aria-hidden="true" />
            <a href={`mailto:${ASSOCIATION.email}`} className="text-mcaa-blue hover:underline">
              {ASSOCIATION.email}
            </a>
          </li>
          <li className="flex gap-2">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-mcaa-blue" aria-hidden="true" />
            {ASSOCIATION.hours} (closed on government holidays)
          </li>
        </ul>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-[18px] font-semibold text-mcaa-navy">Department Contacts</h2>
        <ul className="divide-y divide-mcaa-border border-y border-mcaa-border">
          {DEPARTMENTS.map((dept) =>
          <li key={dept.name} className="py-2.5">
              <p className="text-[15px] font-medium text-mcaa-navy">{dept.name}</p>
              <p className="text-[13.5px] text-mcaa-muted">{dept.person}</p>
              <p className="text-[13.5px] text-mcaa-text">
                {dept.phone} ·{' '}
                <a href={`mailto:${dept.email}`} className="text-mcaa-blue hover:underline">
                  {dept.email}
                </a>
              </p>
            </li>
          )}
        </ul>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-[18px] font-semibold text-mcaa-navy">Location Map</h2>
        <div className="overflow-hidden rounded-mcaa border border-mcaa-border">
          <iframe
            title="Map of Mongla, Bagerhat"
            src="https://www.openstreetmap.org/export/embed.html?bbox=89.5800%2C22.4600%2C89.6300%2C22.5000&layer=mapnik&marker=22.4800%2C89.6050"
            className="h-[260px] w-full"
            loading="lazy" />
          
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-2 text-[18px] font-semibold text-mcaa-navy">Send a Message</h2>
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}>
          
          <TextField label="Full Name" name="name" required />
          <TextField label="Organization" name="organization" />
          <TextField label="Phone" name="phone" type="tel" required />
          <TextField label="Email" name="email" type="email" required />
          <TextField label="Subject" name="subject" required />
          <TextArea label="Message" name="message" required />
          <Button type="submit" className="w-full sm:w-auto">
            Submit
          </Button>
          {submitted &&
          <p role="status" className="rounded-mcaa border border-mcaa-border bg-[#E8F4EE] px-3 py-2 text-[14px] text-mcaa-green">
              Your message has been received. The Association office will respond during working hours.
            </p>
          }
        </form>
      </section>
    </div>);

}