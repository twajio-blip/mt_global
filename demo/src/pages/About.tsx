import React from 'react';
import { FileTextIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { ASSOCIATION } from '../data/site';

function Section({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section className="mt-5 first:mt-0">
      <h2 className="text-[18px] font-semibold text-mcaa-navy">{title}</h2>
      <div className="mt-2 space-y-3 text-[15.5px] leading-relaxed text-mcaa-text">{children}</div>
    </section>);

}

export function About() {
  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]} title="About the Association" />

      <Section title="Introduction">
        <p>
          Mongla Customs Agents’ Association (MCAA) is the representative organisation of licensed customs clearing and
          forwarding agents working through Mongla Custom House and Mongla Port. Its members act on behalf of importers
          and exporters in preparing declarations, arranging assessment and examination, paying duty and taxes, and
          taking delivery of consignments in accordance with the Customs Act and related rules.
        </p>
      </Section>

      <Section title="Establishment">
        <p>
          The Association was formed by the customs agents of Mongla to organise the profession under a common
          platform, to maintain discipline among licence holders and to place the collective position of the trade
          before the customs and port authorities. Since its formation, the Association has been led by successive
          elected Executive Committees supported by an Advisory Committee of senior members.
        </p>
      </Section>

      <Section title="Registration Information">
        <ul className="space-y-1.5">
          <li>
            <span className="font-medium text-mcaa-navy">Registration:</span> {ASSOCIATION.registration}
          </li>
          <li>
            <span className="font-medium text-mcaa-navy">Registered Office:</span> {ASSOCIATION.address}
          </li>
          <li>
            <span className="font-medium text-mcaa-navy">Current Committee Term:</span> 2026–2028
          </li>
        </ul>
      </Section>

      <Section title="Purpose of the Association">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>To represent licensed customs agents of Mongla before government and regulatory authorities.</li>
          <li>To maintain professional standards, ethics and discipline among member firms.</li>
          <li>To circulate customs, port and NBR notices promptly to all members.</li>
          <li>To assist members with procedural guidance, training and dispute resolution.</li>
          <li>To operate welfare arrangements for members and their families.</li>
        </ul>
      </Section>

      <Section title="Role of Customs Agents">
        <p>
          A customs clearing and forwarding agent is a licensed intermediary between the importer or exporter and the
          customs authority. Members prepare and submit declarations through ASYCUDAWorld, arrange documentary and
          physical examination, calculate and pay assessed duty and taxes, coordinate port handling and delivery, and
          maintain records required under customs law. The accuracy and integrity of this work directly affects revenue
          collection and the speed of national trade.
        </p>
      </Section>

      <Section title="Relationship with Mongla Custom House">
        <p>
          The Association maintains a formal working relationship with Mongla Custom House. Members participate in
          consultative meetings on assessment practice, examination procedure, system downtime, refund processing and
          licence renewal. Circulars and standing orders issued by the Custom House are published on this portal for
          the information of all members.
        </p>
      </Section>

      <Section title="Relationship with Mongla Port">
        <p>
          MCAA works with Mongla Port Authority on berthing priority, yard congestion, equipment availability, delivery
          timing and tariff related matters. Berthing schedules and port tariff documents are made available to members
          through the Port Information section of this portal.
        </p>
      </Section>

      <Section title="Trade Facilitation">
        <p>
          The Association supports the national objective of faster and more predictable clearance by promoting correct
          declaration practice, encouraging use of electronic procedures, and reporting operational bottlenecks to the
          concerned authorities with practical recommendations from the field.
        </p>
      </Section>

      <Section title="Member Representation and Welfare">
        <p>
          Every licensed member firm is entitled to representation through the Executive Committee. The Association
          takes up individual and collective grievances with the authorities, provides guidance on procedural
          difficulties, and maintains a welfare fund for assistance in cases of illness, accident or bereavement of
          members and their family members.
        </p>
      </Section>

      <Section title="Constitution">
        <p>
          The Association is governed by its registered constitution, which sets out membership eligibility, the
          election procedure, the powers of the Executive Committee and the conduct expected of members.
        </p>
        <a
          href="#constitution"
          className="inline-flex items-center gap-2 rounded-mcaa border border-mcaa-border bg-mcaa-light px-3 py-2 text-[14px] font-medium text-mcaa-navy hover:bg-white">
          
          <FileTextIcon className="h-4 w-4 text-mcaa-blue" aria-hidden="true" />
          MCAA Constitution (PDF · 1.4 MB)
        </a>
      </Section>
    </div>);

}