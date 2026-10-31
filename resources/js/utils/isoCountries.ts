export interface IsoCountry {
    name: string;
    name_bn: string;
    code: string; // 2-letter ISO 3166-1 alpha-2
}

export const ISO_COUNTRIES: IsoCountry[] = [
    { name: 'Saudi Arabia', name_bn: 'সৌদি আরব', code: 'SA' },
    { name: 'United Arab Emirates', name_bn: 'সংযুক্ত আরব আমিরাত', code: 'AE' },
    { name: 'UAE', name_bn: 'সংযুক্ত আরব আমিরাত', code: 'AE' },
    { name: 'Qatar', name_bn: 'কাতার', code: 'QA' },
    { name: 'Kuwait', name_bn: 'কুয়েত', code: 'KW' },
    { name: 'Oman', name_bn: 'ওমান', code: 'OM' },
    { name: 'Bahrain', name_bn: 'বাহরাইন', code: 'BH' },
    { name: 'Malaysia', name_bn: 'মালয়েশিয়া', code: 'MY' },
    { name: 'Singapore', name_bn: 'সিঙ্গাপুর', code: 'SG' },
    { name: 'Maldives', name_bn: 'মালদ্বীপ', code: 'MV' },
    { name: 'Jordan', name_bn: 'জর্ডান', code: 'JO' },
    { name: 'Lebanon', name_bn: 'লেবানন', code: 'LB' },
    { name: 'Iraq', name_bn: 'ইরাক', code: 'IQ' },
    { name: 'Turkey', name_bn: 'তুরস্ক', code: 'TR' },
    { name: 'Romania', name_bn: 'রোমানিয়া', code: 'RO' },
    { name: 'Croatia', name_bn: 'ক্রোয়েশিয়া', code: 'HR' },
    { name: 'Poland', name_bn: 'পোল্যান্ড', code: 'PL' },
    { name: 'Italy', name_bn: 'ইতালি', code: 'IT' },
    { name: 'Portugal', name_bn: 'পর্তুগাল', code: 'PT' },
    { name: 'Cyprus', name_bn: 'সাইপ্রাস', code: 'CY' },
    { name: 'Greece', name_bn: 'গ্রীস', code: 'GR' },
    { name: 'Hungary', name_bn: 'হাঙ্গেরি', code: 'HU' },
    { name: 'Malta', name_bn: 'মাল্টা', code: 'MT' },
    { name: 'Serbia', name_bn: 'সার্বিয়া', code: 'RS' },
    { name: 'Lithuania', name_bn: 'লিথুয়ানিয়া', code: 'LT' },
    { name: 'United Kingdom', name_bn: 'যুক্তরাজ্য', code: 'GB' },
    { name: 'United States', name_bn: 'যুক্তরাষ্ট্র', code: 'US' },
    { name: 'Canada', name_bn: 'কানাডা', code: 'CA' },
    { name: 'Australia', name_bn: 'অস্ট্রেলিয়া', code: 'AU' },
    { name: 'Japan', name_bn: 'জাপান', code: 'JP' },
    { name: 'South Korea', name_bn: 'দক্ষিণ কোরিয়া', code: 'KR' },
    { name: 'Brunei', name_bn: 'ব্রুনাই', code: 'BN' },
    { name: 'Mauritius', name_bn: 'মরিশাস', code: 'MU' },
    { name: 'Bangladesh', name_bn: 'বাংলাদেশ', code: 'BD' },
    { name: 'India', name_bn: 'ভারত', code: 'IN' },
    { name: 'Nepal', name_bn: 'নেপাল', code: 'NP' },
    { name: 'Pakistan', name_bn: 'পাকিস্তান', code: 'PK' },
    { name: 'Sri Lanka', name_bn: 'শ্রীলঙ্কা', code: 'LK' },
    { name: 'Philippines', name_bn: 'ফিলিপাইন', code: 'PH' },
    { name: 'Indonesia', name_bn: 'ইন্দোনেশিয়া', code: 'ID' },
    { name: 'Vietnam', name_bn: 'ভিয়েতনাম', code: 'VN' },
    { name: 'Thailand', name_bn: 'থাইল্যান্ড', code: 'TH' },
    { name: 'Egypt', name_bn: 'মিশর', code: 'EG' },
    { name: 'Sudan', name_bn: 'সুদান', code: 'SD' },
    { name: 'Kenya', name_bn: 'কেনিয়া', code: 'KE' },
    { name: 'Uganda', name_bn: 'উগান্ডা', code: 'UG' },
    { name: 'Ghana', name_bn: 'ঘানা', code: 'GH' },
    { name: 'Nigeria', name_bn: 'নাইজেরিয়া', code: 'NG' },
    { name: 'South Africa', name_bn: 'দক্ষিণ আফ্রিকা', code: 'ZA' },
    { name: 'Germany', name_bn: 'জার্মানি', code: 'DE' },
    { name: 'France', name_bn: 'ফ্রান্স', code: 'FR' },
    { name: 'Spain', name_bn: 'স্পেন', code: 'ES' },
];

export function findIsoByCountryName(name: string): IsoCountry | undefined {
    if (!name) return undefined;
    const clean = name.trim().toLowerCase();
    return ISO_COUNTRIES.find(
        (c) => c.name.toLowerCase() === clean || c.name_bn.toLowerCase() === clean
    );
}

export function getCountryNameByCode(codeOrName: string | null | undefined): string {
    if (!codeOrName) return '';
    const clean = codeOrName.trim().toUpperCase();
    if (clean === 'BANGLADESH' || clean === 'BD') return 'Bangladesh';
    const found = ISO_COUNTRIES.find((c) => c.code.toUpperCase() === clean);
    if (found) return found.name;
    const foundByName = ISO_COUNTRIES.find((c) => c.name.toUpperCase() === clean);
    return foundByName ? foundByName.name : codeOrName;
}

export function getFlagUrl(codeOrName: string | null | undefined): string {
    if (!codeOrName) return 'https://flagcdn.com/w80/un.png';
    const clean = codeOrName.trim().toLowerCase();
    if (clean.length === 2) {
        return `https://flagcdn.com/w80/${clean}.png`;
    }
    const matched = findIsoByCountryName(codeOrName);
    if (matched) {
        return `https://flagcdn.com/w80/${matched.code.toLowerCase()}.png`;
    }
    return 'https://flagcdn.com/w80/un.png';
}

