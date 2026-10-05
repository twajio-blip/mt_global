import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { HomeSlider } from '../components/home/HomeSlider';

export function Home() {
  return (
    <div className="space-y-5">
      <HomeSlider />

      <article className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
        <h1 className="text-[22px] font-semibold leading-snug text-mcaa-navy sm:text-[26px]">
          Welcome to Mongla Customs Agents’ Association
        </h1>
        <p className="mt-1 font-bn text-[16px] text-mcaa-muted">মোংলা কাস্টমস্ এজেন্টস্ এসোসিয়েশন</p>
        <div className="mt-3 h-px w-full bg-mcaa-border" />

        <div className="mt-3 space-y-3 text-[15.5px] leading-relaxed text-mcaa-text">
          <p>
            Mongla Customs Agents’ Association (MCAA) is the recognised professional body of licensed customs clearing
            and forwarding agents who conduct import and export clearance work through Mongla Custom House and Mongla
            Port, the second largest seaport of Bangladesh. Established to organise the profession on a disciplined and
            accountable basis, the Association today represents member firms handling containerised cargo, bulk
            commodities, capital machinery and project consignments for importers and exporters across the country.
          </p>
          <p>
            The Association works in continuous coordination with the National Board of Revenue, Mongla Custom House,
            Mongla Port Authority and other government agencies to ensure that assessment, examination and delivery
            procedures remain transparent, predictable and consistent with the Customs Act and applicable statutory
            regulatory orders. MCAA places member observations before the authorities, circulates official notices and
            circulars, and supports members with professional guidance and training on declaration procedure.
          </p>
          <p>
            Alongside trade facilitation, the Association maintains welfare arrangements for its members and their
            families, upholds professional ethics among licence holders, and preserves an accurate register of member
            firms, representatives and customs licence records.
          </p>
        </div>

        <Link
          to="/about"
          className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-mcaa-blue hover:underline">
          
          Read More
          <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      </article>
    </div>);

}