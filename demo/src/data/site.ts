export const ASSOCIATION = {
  nameBn: 'মোংলা কাস্টমস্ এজেন্টস্ এসোসিয়েশন',
  nameEn: "Mongla Customs Agents' Association",
  abbr: 'MCAA',
  registration: 'Registration No. TU-KHU-1987/041, Government of Bangladesh',
  address: 'MCAA Bhaban, Customs House Road, Mongla, Bagerhat-9351, Bangladesh',
  phone: '+880 2477 775 210',
  altPhone: '+880 1711 456 902',
  email: 'info@mcaa.org.bd',
  hours: 'Sunday – Thursday, 9:00 AM – 5:00 PM'
};

export interface NavItem {
  label: string;
  to?: string;
  children?: {label: string;to: string;}[];
}

export const NAV_ITEMS: NavItem[] = [
{ label: 'Home', to: '/' },
{ label: 'About', to: '/about' },
{
  label: 'Committee',
  children: [
  { label: 'Executive Committee', to: '/committee/executive' },
  { label: 'Advisory Committee', to: '/committee/advisory' },
  { label: 'Former Presidents', to: '/committee/former-presidents' },
  { label: 'Former General Secretaries', to: '/committee/former-general-secretaries' },
  { label: 'General Members', to: '/committee/general-members' }]

},
{ label: 'Notices', to: '/notices' },
{ label: 'Gallery', to: '/gallery' },
{ label: 'Contact', to: '/contact' },
{ label: 'Weblink', to: '/weblink' }];


export const NBR_LINKS = [
{ label: 'National Budget', to: '/nbr/national-budget' },
{ label: 'SRO', to: '/nbr/sro' },
{ label: 'Gazette Notification', to: '/nbr/gazette' },
{ label: 'Order', to: '/nbr/order' },
{ label: 'First Schedule', to: '/nbr/first-schedule' },
{ label: 'Customs Tariff', to: '/nbr/customs-tariff' },
{ label: 'Advance Ruling', to: '/nbr/advance-ruling' },
{ label: 'Assessment Committee Decision', to: '/nbr/assessment-committee-decision' }];


export const PORT_LINKS = [
{ label: 'Berthing Schedule', to: '/port/berthing-schedule' },
{ label: 'Port Tariff', to: '/port/tariff' }];


export const FOOTER_QUICK_LINKS = [
{ label: 'Home', to: '/' },
{ label: 'About', to: '/about' },
{ label: 'Committee', to: '/committee/executive' },
{ label: 'General Members', to: '/committee/general-members' },
{ label: 'Notices', to: '/notices' },
{ label: 'Gallery', to: '/gallery' },
{ label: 'Contact', to: '/contact' }];


export const FOOTER_IMPORTANT_LINKS = [
{ label: 'National Board of Revenue', url: 'https://nbr.gov.bd' },
{ label: 'Bangladesh Customs', url: 'https://customs.gov.bd' },
{ label: 'Mongla Custom House', url: 'https://customs.gov.bd' },
{ label: 'Mongla Port Authority', url: 'https://mpa.gov.bd' },
{ label: 'Ministry of Shipping', url: 'https://mos.gov.bd' },
{ label: 'Ministry of Finance', url: 'https://mof.gov.bd' },
{ label: 'ASYCUDAWorld', url: 'https://asycuda.gov.bd' }];


export const PRAYER_TIMES = [
{ name: 'Fajr', time: '4:22 AM' },
{ name: 'Sunrise', time: '5:41 AM' },
{ name: 'Dhuhr', time: '12:06 PM' },
{ name: 'Asr', time: '4:31 PM' },
{ name: 'Maghrib', time: '6:28 PM' },
{ name: 'Isha', time: '7:47 PM' }];


export const LEADERSHIP = {
  president: {
    name: 'Md. Abdul Hakim Sikder',
    designation: 'President',
    company: 'Sikder Shipping & Clearing Agency',
    portrait: "/123c1ca4-b88e-4ac5-a843-298b6013d83e.jpg",

    excerpt:
    'On behalf of the members of Mongla Customs Agents’ Association, I welcome you to our official portal. Our members serve the import and export trade of Bangladesh through Mongla Custom House with honesty and professional discipline.'
  },
  secretary: {
    name: 'Md. Rafiqul Islam Khan',
    designation: 'General Secretary',
    company: 'Khan Traders & Clearing House',
    portrait: "/10ca8665-abd3-4d12-bbf2-b97637d7053d.jpg",

    excerpt:
    'This portal has been developed to keep our members informed of customs circulars, SROs, port notices and Association decisions. We remain committed to transparent service and timely communication for every licensed member.'
  }
};