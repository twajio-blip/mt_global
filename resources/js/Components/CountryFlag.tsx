import React, { useState } from 'react';
import { getFlagUrl } from '../utils/isoCountries';

interface CountryFlagProps {
    country?: string;
    code?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const sizes = {
    sm: 'h-3.5 w-5',
    md: 'h-5 w-7',
    lg: 'h-8 w-11',
};

export function CountryFlag({ country, code, size = 'sm', className = '' }: CountryFlagProps) {
    const [imgSrc, setImgSrc] = useState<string>(() => getFlagUrl(code || country));

    // When props change, update the source
    React.useEffect(() => {
        setImgSrc(getFlagUrl(code || country));
    }, [code, country]);

    return (
        <img
            src={imgSrc}
            alt={country ? `${country} flag` : 'Country flag'}
            loading="lazy"
            onError={() => {
                // Fallback to UN globe flag if the specific ISO code is invalid or not found on flagcdn
                if (imgSrc !== 'https://flagcdn.com/w80/un.png') {
                    setImgSrc('https://flagcdn.com/w80/un.png');
                }
            }}
            className={`${sizes[size]} shrink-0 rounded-[3px] object-cover ring-1 ring-black/10 inline-block align-middle ${className}`}
        />
    );
}
