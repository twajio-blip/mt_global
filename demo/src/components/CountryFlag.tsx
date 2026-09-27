import React from 'react';
import { getCountryCode } from '../utils/jobs';

interface CountryFlagProps {
  country: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-3.5 w-5',
  md: 'h-5 w-7',
  lg: 'h-8 w-11'
};

export function CountryFlag({ country, size = 'sm', className = '' }: CountryFlagProps) {
  const code = getCountryCode(country);
  if (!code) return null;
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt=""
      aria-hidden
      loading="lazy"
      className={`${sizes[size]} shrink-0 rounded-[3px] object-cover ring-1 ring-black/10 ${className}`} />);


}