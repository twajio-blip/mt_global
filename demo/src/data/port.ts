export interface Vessel {
  id: string;
  name: string;
  eta: string;
  etb: string;
  etd: string;
  berth: string;
  status: 'Expected' | 'Arrived' | 'Berthed' | 'Departed';
}

export const vessels: Vessel[] = [
{ id: 'v-1', name: 'MV OCEAN PRIDE', eta: '10 Aug 2026, 06:20', etb: '10 Aug 2026, 14:00', etd: '13 Aug 2026, 08:00', berth: 'Jetty 5', status: 'Berthed' },
{ id: 'v-2', name: 'MV SUNDARBAN EXPRESS', eta: '11 Aug 2026, 02:10', etb: '11 Aug 2026, 09:30', etd: '14 Aug 2026, 18:00', berth: 'Jetty 7', status: 'Arrived' },
{ id: 'v-3', name: 'MV BAY TRADER', eta: '12 Aug 2026, 11:45', etb: '12 Aug 2026, 20:00', etd: '16 Aug 2026, 10:00', berth: 'Jetty 3', status: 'Expected' },
{ id: 'v-4', name: 'MV PADMA CARRIER', eta: '08 Aug 2026, 05:00', etb: '08 Aug 2026, 12:00', etd: '10 Aug 2026, 07:30', berth: 'Jetty 6', status: 'Departed' },
{ id: 'v-5', name: 'MV KHULNA STAR', eta: '13 Aug 2026, 04:30', etb: '13 Aug 2026, 13:15', etd: '17 Aug 2026, 09:00', berth: 'Anchorage B', status: 'Expected' },
{ id: 'v-6', name: 'MV MERCHANT GLORY', eta: '09 Aug 2026, 23:40', etb: '10 Aug 2026, 08:00', etd: '13 Aug 2026, 22:00', berth: 'Jetty 4', status: 'Berthed' },
{ id: 'v-7', name: 'MV SEA HORIZON', eta: '14 Aug 2026, 07:10', etb: '14 Aug 2026, 16:00', etd: '18 Aug 2026, 12:00', berth: 'Anchorage A', status: 'Expected' }];


export const portTariffCurrent = {
  title: 'Mongla Port Tariff (Consolidated)',
  publication: '15 January 2026',
  effective: '01 February 2026',
  authority: 'Mongla Port Authority',
  file: 'PDF · 6.8 MB'
};

export const portTariffArchive = [
{ id: 'pt-1', title: 'Mongla Port Tariff (Consolidated)', publication: '11 March 2023', effective: '01 April 2023', file: 'PDF' },
{ id: 'pt-2', title: 'Mongla Port Tariff — Amendment Notification', publication: '22 August 2021', effective: '01 September 2021', file: 'PDF' },
{ id: 'pt-3', title: 'Mongla Port Tariff (Consolidated)', publication: '06 February 2019', effective: '01 March 2019', file: 'PDF' }];