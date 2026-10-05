import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

/** Institutional MCAA seal: ship wheel ring, anchor and monogram. */
export function Logo({ size = 108, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Mongla Customs Agents' Association emblem"
      className={className}>
      
      <circle cx="60" cy="60" r="58" fill="#FFFFFF" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#D5A63F" strokeWidth="3" />
      <circle cx="60" cy="60" r="50" fill="#105493" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#073B6B" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) =>
      <rect
        key={deg}
        x="58.5"
        y="4"
        width="3"
        height="12"
        rx="1"
        fill="#D5A63F"
        transform={`rotate(${deg} 60 60)`} />

      )}
      <circle cx="60" cy="60" r="40" fill="none" stroke="#EDF5FB" strokeWidth="1.5" />
      <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M60 34v52" />
        <path d="M60 46h-9m9 0h9" />
        <path d="M40 68c0 11 9 19 20 19s20-8 20-19" />
      </g>
      <circle cx="60" cy="33" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="3.5" />
      <text
        x="60"
        y="106"
        textAnchor="middle"
        fill="#073B6B"
        fontSize="13"
        fontWeight="700"
        fontFamily="Inter, sans-serif"
        letterSpacing="1">
        
        MCAA
      </text>
    </svg>);

}