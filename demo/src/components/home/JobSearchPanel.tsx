import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import { SelectField, SelectOption } from '../ui/SelectField';
import { buttonPrimary } from '../../utils/styles';

interface JobSearchPanelProps {
  countryOptions: SelectOption[];
  designationOptions: SelectOption[];
}

export function JobSearchPanel({ countryOptions, designationOptions }: JobSearchPanelProps) {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set('country', country);
    if (designation) params.set('designation', designation);
    const qs = params.toString();
    navigate(`/jobs${qs ? `?${qs}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search overseas jobs"
      className="rounded-xl border border-white/80 bg-white/95 p-3 shadow-lift backdrop-blur sm:p-4">
      
      <div className="grid gap-2.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <div>
          <label htmlFor="hero-country" className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-600">
            <MapPinIcon className="h-3.5 w-3.5 text-accent-600" aria-hidden />
            Country
          </label>
          <SelectField
            id="hero-country"
            value={country}
            onChange={setCountry}
            placeholder="All countries"
            options={countryOptions} />
          
        </div>
        <div>
          <label htmlFor="hero-designation" className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-600">
            <BriefcaseIcon className="h-3.5 w-3.5 text-accent-600" aria-hidden />
            Role
          </label>
          <SelectField
            id="hero-designation"
            value={designation}
            onChange={setDesignation}
            placeholder="All designations"
            options={designationOptions} />
          
        </div>
        <button type="submit" className={`${buttonPrimary} h-12 px-5 md:px-6`}>
          <SearchIcon className="h-5 w-5" aria-hidden />
          <span>Search</span>
        </button>
      </div>
    </form>);

}
