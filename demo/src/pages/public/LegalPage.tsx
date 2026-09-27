import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ExternalLinkIcon } from 'lucide-react';
import { company } from '../../data/company';
import { pageContainer } from '../../utils/styles';

type Section = {
  title: string;
  body?: string;
  items?: string[];
};

type LegalPageKey =
  | 'privacy'
  | 'terms'
  | 'recruitment-disclaimer'
  | 'cv-submission'
  | 'cookies'
  | 'licence';

interface LegalPageContent {
  title: string;
  intro: string;
  sections: Section[];
}

export const legalRoutes: {to: string;label: string;}[] = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/recruitment-disclaimer', label: 'Recruitment Disclaimer' },
  { to: '/cv-submission-policy', label: 'CV Submission Policy' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
  { to: '/licence-regulatory-information', label: 'Licence & Regulatory Info' }
];

const legalPages: Record<LegalPageKey, LegalPageContent> = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      `${company.name} collects applicant and contact information to support overseas recruitment, candidate communication, employer matching and related employment services.`,
    sections: [
      {
        title: 'Information we collect',
        items: [
          'Name, phone number, email address and current country or location.',
          'Uploaded CVs and the education, experience, employment history and skills included inside them.',
          'Job applied for, preferred country, designation, employer and application submission date.',
          'Messages or enquiries sent through the website.',
          'Technical information such as browser, device, IP address or usage data where analytics, security or hosting systems collect it.'
        ]
      },
      {
        title: 'How we use applicant information',
        items: [
          'To review CVs and assess candidate suitability for published job opportunities.',
          'To contact applicants about job requirements, interviews, documentation or recruitment updates.',
          'To match applicants with relevant employers, overseas recruitment partners or manpower requirements.',
          'To maintain recruitment records, prevent misuse and comply with applicable legal or regulatory obligations.'
        ]
      },
      {
        title: 'Sharing and overseas transfer',
        body:
          'Applicant information may be shared with recruitment staff, prospective employers, overseas employers, authorized recruitment partners and service providers where needed for recruitment purposes. Some recipients may be located outside Bangladesh.'
      },
      {
        title: 'Retention, correction and deletion',
        body:
          `We retain applicant information for as long as it is reasonably needed for recruitment, record keeping, compliance and candidate matching. Applicants may contact ${company.email} to request correction or deletion of their information, subject to lawful retention requirements.`
      },
      {
        title: 'Security',
        body:
          'We use reasonable administrative, technical and organizational safeguards to protect applicant information. No online system is completely risk-free, so applicants should avoid sending unnecessary sensitive information in a CV or message.'
      },
      {
        title: 'Legal review',
        body:
          'This policy is intended as website guidance and should be reviewed before launch for compliance with applicable Bangladesh data protection requirements and overseas recruitment obligations.'
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    intro:
      `These terms apply to use of the ${company.name} website, job listings, CV submission features and any client portal access made available through the site.`,
    sections: [
      {
        title: 'Use of the website',
        items: [
          'Users must provide accurate, current and lawful information.',
          'Applicants must not upload false, misleading, harmful or unauthorized documents.',
          'Client portal users are responsible for keeping account credentials secure.',
          'The website must not be used for spam, fraud, scraping, unlawful recruitment activity or interference with site security.'
        ]
      },
      {
        title: 'Job information',
        body:
          'Job posts are provided for recruitment information. Vacancy count, salary, benefits, employer details, contract terms, location and deadlines may change or close without notice.'
      },
      {
        title: 'CV submission',
        body:
          'Submitting a CV is an expression of interest only. It does not create an employment contract, guarantee interview selection, guarantee employment or guarantee visa approval.'
      },
      {
        title: 'Intellectual property',
        body:
          'Website text, layout, branding, job presentation and other content belong to the site owner or relevant licensors unless otherwise stated. Users may view the site for personal recruitment or business enquiry purposes only.'
      },
      {
        title: 'Limitation of liability',
        body:
          'To the fullest extent allowed by law, the website owner is not liable for losses arising from unavailable jobs, changed employer requirements, visa refusal, third-party decisions, technical interruption or reliance on information that later changes.'
      },
      {
        title: 'Governing law and contact',
        body:
          `These terms are intended to be governed by the laws of Bangladesh unless a mandatory rule requires otherwise. For questions, contact ${company.email}.`
      }
    ]
  },
  'recruitment-disclaimer': {
    title: 'Recruitment & Job Disclaimer',
    intro:
      'Overseas recruitment involves employer selection, documentation, medical checks, government approvals and destination-country immigration decisions. This page explains the limits of website job information.',
    sections: [
      {
        title: 'No guaranteed job or visa',
        items: [
          'CV submission does not guarantee shortlisting, interview, selection, employment or visa approval.',
          'Selection by an employer does not automatically guarantee issuance of a work permit, work visa or entry approval.',
          'Visa and immigration approvals are decided by the relevant government or immigration authority.'
        ]
      },
      {
        title: 'Job details may change',
        items: [
          'Vacancies may close, pause or change without notice.',
          'Salary, benefits, accommodation, food, transport, overtime and other conditions depend on the employer and final employment contract.',
          'Applicants should review all final documents, contracts, fees and travel requirements before making decisions.'
        ]
      },
      {
        title: 'Final employment conditions',
        body:
          'Final employment conditions are determined by the employer, employment contract, destination-country requirements and applicable recruitment procedures. Applicants should not rely on website summaries as the final contract.'
      }
    ]
  },
  'cv-submission': {
    title: 'CV Submission & Applicant Policy',
    intro:
      'This policy explains what happens when an applicant uploads a CV or applies for an overseas job through the website.',
    sections: [
      {
        title: 'After you submit a CV',
        items: [
          'The CV is linked to the selected job and reviewed by the recruitment team.',
          'The team may contact you by phone, email or WhatsApp for verification, additional documents or interview coordination.',
          'Relevant CV details may be shared with prospective employers, including employers located outside Bangladesh.',
          'Your CV may also be considered for similar job openings where your profile appears relevant.'
        ]
      },
      {
        title: 'Applicant responsibility',
        items: [
          'You must provide accurate information and upload your own CV or a document you are authorized to submit.',
          'You should not include unnecessary sensitive personal information unless it is relevant to employment processing.',
          'You should notify us if important information changes after submission.'
        ]
      },
      {
        title: 'Consent',
        body:
          'By submitting a CV, you consent to the processing of your personal information and CV for recruitment and overseas employment purposes in accordance with the Privacy Policy.'
      },
      {
        title: 'No guarantee',
        body:
          'CV submission is an expression of interest. It does not guarantee employment, selection, interview, work permit, visa approval or deployment.'
      }
    ]
  },
  cookies: {
    title: 'Cookie Policy',
    intro:
      'Cookies and similar technologies may be used to keep the website functional, improve performance and understand how visitors use the site.',
    sections: [
      {
        title: 'Types of cookies',
        items: [
          'Necessary cookies for website operation, security, form handling, login sessions or portal access.',
          'Analytics cookies, if enabled, to understand page visits, traffic sources and site performance.',
          'Marketing or remarketing cookies, if enabled, for advertising measurement or campaign follow-up.'
        ]
      },
      {
        title: 'Third-party services',
        body:
          'Embedded maps, analytics tools, advertising tags or social media services may set their own cookies according to their own policies.'
      },
      {
        title: 'Managing cookies',
        body:
          'Visitors can usually control or delete cookies through their browser settings. Blocking necessary cookies may affect website functionality or portal access.'
      }
    ]
  },
  licence: {
    title: 'Licence & Regulatory Information',
    intro:
      `${company.name} displays licence and contact information to help applicants verify the recruitment agency and contact the office directly.`,
    sections: [
      {
        title: 'Agency information',
        items: [
          `Registered name: ${company.name}`,
          `Recruiting licence: ${company.license}`,
          `Office: ${company.addressLines.join(', ')}`,
          `Phone: ${company.phone}`,
          `Email: ${company.email}`
        ]
      },
      {
        title: 'Regulatory context',
        body:
          'Overseas employment and recruiting agency activity in Bangladesh is regulated by applicable laws, rules and government authorities. Applicants should verify licence details, approved job information, fees and required documents before proceeding.'
      },
      {
        title: 'Official references',
        items: [
          'Bangladesh ICT Division laws and data protection resources.',
          'Ministry of Expatriates Welfare and Overseas Employment laws and recruiting agency resources.'
        ]
      }
    ]
  }
};

interface LegalPageProps {
  pageKey: LegalPageKey;
}

export function LegalPage({ pageKey }: LegalPageProps) {
  const page = legalPages[pageKey];
  if (!page) return <Navigate to="/" replace />;

  return (
    <div className="bg-surface pb-20">
      <section className="border-b border-line bg-white py-12 md:py-16" aria-labelledby="legal-title">
        <div className={pageContainer}>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-800">Legal</p>
          <h1 id="legal-title" className="mt-2 text-3xl font-bold tracking-tight text-ink-900 md:text-[40px]">
            {page.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-600 md:text-lg">{page.intro}</p>
          <p className="mt-3 text-sm text-ink-500">Last updated: September 23, 2026</p>
        </div>
      </section>

      <div className={`${pageContainer} mt-8 grid gap-6 lg:grid-cols-12`}>
        <article className="rounded-2xl border border-line bg-white p-6 md:p-8 lg:col-span-8">
          <div className="space-y-8">
            {page.sections.map((section) =>
            <section key={section.title}>
                <h2 className="text-xl font-bold text-ink-900">{section.title}</h2>
                {section.body && <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{section.body}</p>}
                {section.items &&
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink-700">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
              }
              </section>
            )}
          </div>
        </article>

        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-28">
            <h2 className="text-base font-semibold text-ink-900">Legal pages</h2>
            <nav aria-label="Legal pages" className="mt-4 flex flex-col gap-1">
              {legalRoutes.map((route) =>
              <Link
                key={route.to}
                to={route.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 transition-colors duration-150 ease-out hover:bg-brand-50 hover:text-brand-800">
                  
                  {route.label}
                </Link>
              )}
            </nav>
            <div className="mt-5 border-t border-line pt-5">
              <h3 className="text-sm font-semibold text-ink-900">Official references</h3>
              <div className="mt-3 space-y-2 text-sm">
                <a
                  href="https://ictd.gov.bd/pages/laws"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-brand-800 hover:text-brand-600">
                  
                  ICT Division laws
                  <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                </a>
                <a
                  href="https://probashi.gov.bd/pages/laws"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-brand-800 hover:text-brand-600">
                  
                  Probashi ministry laws
                  <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-ink-500">
              These pages are practical website notices and should be reviewed by a qualified legal adviser before launch.
            </p>
          </div>
        </aside>
      </div>
    </div>);

}
