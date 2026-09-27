import React, { FormEvent, useState } from 'react';
import {
  CheckCircle2Icon,
  ClockIcon,
  FacebookIcon,
  LinkedinIcon,
  Loader2Icon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  YoutubeIcon
} from 'lucide-react';
import { FormField } from '../../components/ui/FormField';
import { company } from '../../data/company';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import { buttonPrimary, buttonSecondary, inputClass, inputErrorClass, pageContainer, textareaClass } from '../../utils/styles';

type Values = {name: string;phone: string;email: string;message: string;};
type Errors = Partial<Record<keyof Values, string>>;
const empty: Values = { name: '', phone: '', email: '', message: '' };
const socialIcons = {
  Facebook: FacebookIcon,
  WhatsApp: MessageCircleIcon,
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon
};

export function Contact() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!isValidPhone(values.phone)) next.phone = 'Please enter a valid phone number.';
    if (values.email && !isValidEmail(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please write your message.';
    setErrors(next);
    const first = (Object.keys(next) as (keyof Values)[])[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('sent');
  };

  const field = (key: keyof Values) => ({
    id: `contact-${key}`,
    value: values[key],
    'aria-invalid': Boolean(errors[key]) || undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(key, e.target.value)
  });

  return (
    <div className="bg-surface pb-20">
      <section className="border-b border-line bg-white py-12 md:py-16" aria-labelledby="contact-title">
        <div className={pageContainer}>
          <h1 id="contact-title" className="text-3xl font-bold tracking-tight text-ink-900 md:text-[40px]">
            Talk to Our Recruitment Team
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ink-600 md:text-lg">
            Questions about a job, an application, or hiring workers through us? Call, message on WhatsApp, or send an
            enquiry below.
          </p>
        </div>
      </section>

      <div className={`${pageContainer} mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8`}>
        <div className="rounded-2xl border border-line bg-white p-6 md:p-8 lg:col-span-5">
          <h2 className="text-xl font-bold text-ink-900">{company.name}</h2>
          <p className="mt-1 text-sm text-ink-500">{company.license}</p>

          <ul className="mt-6 space-y-5 text-[15px]">
            <li className="flex gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-800" aria-hidden />
              <address className="not-italic text-ink-700">
                {company.addressLines.map((l) =>
                <span key={l} className="block">{l}</span>
                )}
              </address>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-800" aria-hidden />
              <a href={`tel:${company.phoneHref}`} className="font-medium text-ink-900 hover:text-brand-800">{company.phone}</a>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-800" aria-hidden />
              <a href={`mailto:${company.email}`} className="font-medium text-ink-900 hover:text-brand-800">{company.email}</a>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-800" aria-hidden />
              <dl className="text-ink-700">
                {company.hours.map((h) =>
                <div key={h.days} className="flex gap-2">
                    <dt>{h.days}:</dt>
                    <dd className="font-medium text-ink-900">{h.time}</dd>
                  </div>
                )}
              </dl>
            </li>
          </ul>

          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={`${buttonSecondary} mt-7 w-full`}>
            
            <MessageCircleIcon className="h-4 w-4 text-accent-600" aria-hidden />
            Message us on WhatsApp
          </a>

          <div className="mt-7 border-t border-line pt-5">
            <p className="text-sm font-semibold text-ink-900">Follow us</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {company.socials.map((s) => {
                const SocialIcon = socialIcons[s.label as keyof typeof socialIcons] ?? MessageCircleIcon;
                return (
                  <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-medium text-ink-700 transition-colors duration-150 ease-out hover:border-brand-300 hover:text-brand-800">
                    
                    <SocialIcon className="h-4 w-4 text-brand-800" aria-hidden />
                    {s.label}
                  </a>
                </li>);

              })}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 md:p-8 lg:col-span-7">
          {status === 'sent' ?
          <div role="status" className="flex h-full flex-col items-center justify-center py-10 text-center">
              <CheckCircle2Icon className="h-12 w-12 text-accent-600" aria-hidden />
              <h2 className="mt-4 text-2xl font-bold text-ink-900">Enquiry sent</h2>
              <p className="mt-2 max-w-sm text-[15px] text-ink-600">
                Thank you, {values.name.split(' ')[0]}. Our team will reply within one working day.
              </p>
              <button
              type="button"
              onClick={() => {
                setValues(empty);
                setStatus('idle');
              }}
              className={`${buttonSecondary} mt-6`}>
              
                Send another enquiry
              </button>
            </div> :

          <form noValidate onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold text-ink-900">Send an enquiry</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <FormField label="Name" htmlFor="contact-name" required error={errors.name}>
                  <input type="text" autoComplete="name" {...field('name')} className={`${inputClass} ${errors.name ? inputErrorClass : ''}`} />
                </FormField>
                <FormField label="Phone Number" htmlFor="contact-phone" required error={errors.phone}>
                  <input type="tel" inputMode="tel" autoComplete="tel" {...field('phone')} className={`${inputClass} ${errors.phone ? inputErrorClass : ''}`} />
                </FormField>
                <FormField label="Email" htmlFor="contact-email" optional error={errors.email} className="md:col-span-2">
                  <input type="email" autoComplete="email" {...field('email')} className={`${inputClass} ${errors.email ? inputErrorClass : ''}`} />
                </FormField>
                <FormField label="Message" htmlFor="contact-message" required error={errors.message} className="md:col-span-2">
                  <textarea rows={5} {...field('message')} className={`${textareaClass} ${errors.message ? inputErrorClass : ''}`} />
                </FormField>
              </div>
              <button type="submit" disabled={status === 'sending'} className={`${buttonPrimary} mt-6 w-full sm:w-auto`}>
                {status === 'sending' ?
              <>
                    <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                  </> :

              'Send Enquiry'
              }
              </button>
            </form>
          }
        </div>

        <div className="overflow-hidden rounded-2xl border border-line bg-white lg:col-span-12">
          <iframe
            title={`Map showing ${company.name} office`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
            className="h-80 w-full md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" />
          
        </div>
      </div>
    </div>);

}
