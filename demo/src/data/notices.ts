import type { Notice } from '../types';

export const notices: Notice[] = [
{
  id: 'n-01',
  date: '2026-08-06',
  title: 'Executive Committee Meeting Notice (August 2026)',
  reference: 'MCAA/EC/2026/118',
  category: 'Meeting',
  fileType: 'PDF'
},
{
  id: 'n-02',
  date: '2026-08-03',
  title: 'General Member Information Update — Licence & Contact Records',
  reference: 'MCAA/GEN/2026/097',
  category: 'Association',
  fileType: 'PDF'
},
{
  id: 'n-03',
  date: '2026-07-29',
  title: 'Mongla Custom House Circular on Assessment Procedure',
  reference: 'MCH/CIR/2026/44',
  category: 'Customs',
  fileType: 'PDF'
},
{
  id: 'n-04',
  date: '2026-07-24',
  title: 'Port Operations Notice — Jetty No. 6 Maintenance Schedule',
  reference: 'MPA/OPS/2026/213',
  category: 'Port',
  fileType: 'PDF'
},
{
  id: 'n-05',
  date: '2026-07-18',
  title: 'Customs SRO Publication Notice (SRO 216-AIN/2026/61)',
  reference: 'NBR/SRO/2026/216',
  category: 'NBR',
  fileType: 'PDF'
},
{
  id: 'n-06',
  date: '2026-07-11',
  title: 'Association Office Notice — Revised Office Hours',
  reference: 'MCAA/OFF/2026/031',
  category: 'Office Notice',
  fileType: 'PDF'
},
{
  id: 'n-07',
  date: '2026-07-04',
  title: 'Condolence Notice — Late Md. Nurul Amin Howlader',
  reference: 'MCAA/CON/2026/009',
  category: 'Condolence',
  fileType: 'PDF'
},
{
  id: 'n-08',
  date: '2026-06-27',
  title: 'Annual Subscription Payment Notice for Financial Year 2026–2027',
  reference: 'MCAA/FIN/2026/072',
  category: 'Association',
  fileType: 'PDF'
},
{
  id: 'n-09',
  date: '2026-06-19',
  title: 'ASYCUDAWorld System Downtime Advisory',
  reference: 'MCH/CIR/2026/39',
  category: 'Customs',
  fileType: 'PDF'
},
{
  id: 'n-10',
  date: '2026-06-08',
  title: 'National Budget 2026–2027 — Customs Related Changes',
  reference: 'NBR/BUD/2026/003',
  category: 'NBR',
  fileType: 'PDF'
},
{
  id: 'n-11',
  date: '2026-05-30',
  title: 'Emergency General Meeting Notice',
  reference: 'MCAA/EGM/2026/002',
  category: 'Meeting',
  fileType: 'PDF'
},
{
  id: 'n-12',
  date: '2026-05-21',
  title: 'Berthing Priority Guidelines for Container Vessels',
  reference: 'MPA/OPS/2026/188',
  category: 'Port',
  fileType: 'PDF'
}];


export const NOTICE_CATEGORIES = [
'Association',
'Customs',
'Port',
'NBR',
'Meeting',
'Office Notice',
'Condolence'] as
const;