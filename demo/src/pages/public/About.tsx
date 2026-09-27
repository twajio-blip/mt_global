import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { CountryFlag } from '../../components/CountryFlag';
import { company } from '../../data/company';
import { countries } from '../../data/countries';
import { images } from '../../data/images';
import { useData } from '../../contexts/DataContext';
import { getPublishedJobs } from '../../utils/jobs';
import { buttonPrimary, buttonSecondary, pageContainer } from '../../utils/styles';

const whatWeDo = [
{
  title: 'We publish real employer requirements',
  text: 'Every job on this site comes from an employer or partner agency we work with directly, with salary, facilities and contract terms stated up front.'
},
{
  title: 'We collect and review CVs',
  text: 'Candidates apply with their existing CV. Our recruitment team reviews each one against the employer’s requirement.'
},
{
  title: 'We contact matching candidates',
  text: 'If your profile matches, we call you for the next step — usually an interview or trade test arranged by the employer.'
}];


export function About() {
  const { jobs } = useData();
  const published = useMemo(() => getPublishedJobs(jobs), [jobs]);
  const employerCount = new Set(published.map((j) => j.employer)).size;

  return (
    <>
      <section className="bg-white py-14 lg:py-20" aria-labelledby="about-title">
        <div className={`${pageContainer} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <h1 id="about-title" className="text-4xl font-bold leading-tight tracking-tight text-ink-900 md:text-5xl">
              Connecting skilled workers with employers abroad
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              {company.name} is a licensed manpower recruitment agency. We help employers in the Gulf, Asia and Europe
              find skilled and semi-skilled workers — and help job seekers find genuine overseas opportunities.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="text-sm text-ink-500">Open jobs</dt>
                <dd className="text-2xl font-bold text-brand-800">{published.length}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-500">Employers hiring</dt>
                <dd className="text-2xl font-bold text-brand-800">{employerCount}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-500">Licence</dt>
                <dd className="text-2xl font-bold text-brand-800">RL-1487</dd>
              </div>
            </dl>
          </div>
          <img src={images.about} alt="A recruiter reviewing a candidate's CV" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14 lg:py-20" aria-labelledby="what-title">
        <div className={`${pageContainer} grid gap-10 lg:grid-cols-12`}>
          <h2 id="what-title" className="text-3xl font-bold tracking-tight text-ink-900 lg:col-span-4">
            What we do
          </h2>
          <ul className="divide-y divide-line lg:col-span-8">
            {whatWeDo.map((item) =>
            <li key={item.title} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-lg font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{item.text}</p>
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20" aria-labelledby="honest-title">
        <div className={`${pageContainer} grid gap-10 lg:grid-cols-12`}>
          <h2 id="honest-title" className="text-3xl font-bold tracking-tight text-ink-900 lg:col-span-4">
            What to expect from us
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-ink-700 lg:col-span-8">
            <p>
              We are honest about how overseas recruitment works. Submitting a CV does not guarantee a job. The employer
              makes the final selection, and work visas are issued only by the destination country’s authorities.
            </p>
            <p>
              We will always tell you the salary, contract length and facilities before you apply. If anything about a
              job is unclear, call our office — we would rather answer your questions than have you apply blindly.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 lg:py-20" aria-labelledby="countries-title">
        <div className={pageContainer}>
          <h2 id="countries-title" className="text-3xl font-bold tracking-tight text-ink-900">
            Countries we recruit for
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {countries.map((c) =>
            <li key={c.code}>
                <Link
                to={`/jobs?country=${encodeURIComponent(c.name)}`}
                className="flex h-14 items-center gap-3 rounded-lg border border-line bg-white px-4 text-[15px] font-medium text-ink-900 transition-colors duration-150 ease-out hover:border-brand-300 hover:text-brand-800">
                
                  <CountryFlag country={c.name} size="md" />
                  {c.name}
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link to="/jobs" className={buttonPrimary}>
              Find Overseas Jobs <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/contact" className={buttonSecondary}>
              Contact our office
            </Link>
          </div>
        </div>
      </section>
    </>);

}