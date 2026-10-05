import type { WebLinkCategory } from '../types';

export const webLinkCategories: WebLinkCategory[] = [
{
  category: 'NBR & Customs',
  links: [
  { name: 'National Board of Revenue', description: 'Budget, SRO, gazette notifications and customs policy of Bangladesh.', url: 'https://nbr.gov.bd' },
  { name: 'Bangladesh Customs', description: 'Customs procedures, tariff schedule and clearance guidelines.', url: 'https://customs.gov.bd' },
  { name: 'Mongla Custom House', description: 'Assessment, examination and release procedures at Mongla.', url: 'https://customs.gov.bd' },
  { name: 'ASYCUDAWorld', description: 'Online customs declaration and cargo processing system.', url: 'https://asycuda.gov.bd' }]

},
{
  category: 'Port',
  links: [
  { name: 'Mongla Port Authority', description: 'Berthing schedule, port tariff and terminal operations.', url: 'https://mpa.gov.bd' }]

},
{
  category: 'Government Ministries',
  links: [
  { name: 'Ministry of Finance', description: 'National budget, finance bill and fiscal notifications.', url: 'https://mof.gov.bd' },
  { name: 'Ministry of Shipping', description: 'Shipping policy, port development and maritime administration.', url: 'https://mos.gov.bd' },
  { name: 'Ministry of Commerce', description: 'Import and export policy orders and trade regulations.', url: 'https://mincom.gov.bd' }]

},
{
  category: 'Business & Trade',
  links: [
  { name: 'FBCCI', description: 'Federation of Bangladesh Chambers of Commerce and Industry.', url: 'https://fbcci.org' },
  { name: 'Bangladesh Bank', description: 'Foreign exchange regulations and import payment circulars.', url: 'https://bb.org.bd' },
  { name: 'Khulna Chamber of Commerce & Industry', description: 'Regional chamber serving the Khulna and Mongla trade region.', url: 'https://kcci.org.bd' }]

}];