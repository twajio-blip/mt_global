export interface DocFilter {
  label: string;
  options: string[];
}

export interface DocColumn {
  key: string;
  label: string;
  primary?: boolean;
}

export interface DocPageConfig {
  slug: string;
  title: string;
  breadcrumb: {label: string;to?: string;}[];
  intro: string;
  filters: DocFilter[];
  columns: DocColumn[];
  rows: Record<string, string>[];
  downloadable?: boolean;
  featured?: {
    heading: string;
    fields: {label: string;value: string;}[];
    archiveHeading: string;
  };
}

const YEARS = ['All Years', '2026', '2025', '2024', '2023'];
const FY = ['All Financial Years', '2026–2027', '2025–2026', '2024–2025', '2023–2024'];

export const documentPages: Record<string, DocPageConfig> = {
  'national-budget': {
    slug: 'national-budget',
    title: 'National Budget',
    breadcrumb: [
    { label: 'Home', to: '/' },
    { label: 'NBR Information' },
    { label: 'National Budget' }],

    intro:
    'Budget speeches, finance bills, finance acts and customs related budget documents published by the Ministry of Finance and the National Board of Revenue. Members are advised to consult the official source before acting on any document.',
    filters: [
    { label: 'Financial Year', options: FY },
    {
      label: 'Document Type',
      options: ['All Types', 'Budget Speech', 'Finance Bill', 'Finance Act', 'Customs Documents', 'Related SRO']
    }],

    columns: [
    { key: 'title', label: 'Title', primary: true },
    { key: 'fy', label: 'Financial Year' },
    { key: 'date', label: 'Publication Date' },
    { key: 'file', label: 'File Type' }],

    downloadable: true,
    rows: [
    { id: 'nb-1', title: 'Budget Speech 2026–2027', fy: '2026–2027', date: '05 Jun 2026', file: 'PDF' },
    { id: 'nb-2', title: 'Finance Bill 2026', fy: '2026–2027', date: '05 Jun 2026', file: 'PDF' },
    { id: 'nb-3', title: 'Customs Related Budget Measures 2026–2027', fy: '2026–2027', date: '08 Jun 2026', file: 'PDF' },
    { id: 'nb-4', title: 'Finance Act 2025', fy: '2025–2026', date: '30 Jun 2025', file: 'PDF' },
    { id: 'nb-5', title: 'Budget Speech 2025–2026', fy: '2025–2026', date: '06 Jun 2025', file: 'PDF' },
    { id: 'nb-6', title: 'Related SRO on Duty Exemption (Budget 2025–2026)', fy: '2025–2026', date: '12 Jun 2025', file: 'PDF' },
    { id: 'nb-7', title: 'Finance Act 2024', fy: '2024–2025', date: '30 Jun 2024', file: 'PDF' },
    { id: 'nb-8', title: 'Budget Speech 2024–2025', fy: '2024–2025', date: '06 Jun 2024', file: 'PDF' }]

  },
  sro: {
    slug: 'sro',
    title: 'SRO',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'SRO' }],
    intro:
    'Statutory Regulatory Orders issued by the National Board of Revenue relating to customs duty, exemption, valuation and procedure. Amendment and repeal status is indicated against each SRO.',
    filters: [
    { label: 'Year', options: YEARS },
    { label: 'Status', options: ['All Statuses', 'New', 'Amendment', 'Replacement', 'Repealed'] },
    { label: 'Category', options: ['All Categories', 'Duty Exemption', 'Valuation', 'Procedure', 'Bond'] }],

    columns: [
    { key: 'no', label: 'SRO Number', primary: true },
    { key: 'subject', label: 'Subject' },
    { key: 'year', label: 'Year' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Publication Date' }],

    downloadable: true,
    rows: [
    { id: 's-1', no: 'SRO 216-AIN/2026/61', subject: 'Exemption of customs duty on capital machinery', year: '2026', status: 'New', date: '18 Jul 2026' },
    { id: 's-2', no: 'SRO 198-AIN/2026/58', subject: 'Amendment of valuation rules for imported goods', year: '2026', status: 'Amendment', date: '22 Jun 2026' },
    { id: 's-3', no: 'SRO 141-AIN/2026/44', subject: 'Procedure for release of perishable consignments', year: '2026', status: 'New', date: '11 May 2026' },
    { id: 's-4', no: 'SRO 087-AIN/2025/33', subject: 'Bonded warehouse licensing conditions', year: '2025', status: 'Replacement', date: '19 Nov 2025' },
    { id: 's-5', no: 'SRO 061-AIN/2025/27', subject: 'Duty concession on industrial raw materials', year: '2025', status: 'Amendment', date: '02 Sep 2025' },
    { id: 's-6', no: 'SRO 022-AIN/2024/09', subject: 'Rate of regulatory duty on selected items', year: '2024', status: 'Repealed', date: '14 Mar 2024' }]

  },
  gazette: {
    slug: 'gazette',
    title: 'Gazette Notification',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'Gazette Notification' }],
    intro:
    'Gazette notifications published by the Government of Bangladesh concerning customs administration, tariff rates and trade procedure.',
    filters: [
    { label: 'Year', options: YEARS },
    { label: 'Issuing Authority', options: ['All Authorities', 'National Board of Revenue', 'Ministry of Finance', 'Ministry of Commerce'] }],

    columns: [
    { key: 'no', label: 'Gazette Number', primary: true },
    { key: 'subject', label: 'Subject' },
    { key: 'authority', label: 'Issuing Authority' },
    { key: 'date', label: 'Publication Date' }],

    downloadable: true,
    rows: [
    { id: 'g-1', no: 'GN/NBR/2026/312', subject: 'Notification on customs clearing agent licensing rules', authority: 'National Board of Revenue', date: '27 Jul 2026' },
    { id: 'g-2', no: 'GN/MOF/2026/204', subject: 'Publication of Finance Act 2026', authority: 'Ministry of Finance', date: '30 Jun 2026' },
    { id: 'g-3', no: 'GN/NBR/2026/188', subject: 'Revised HS code descriptions for selected chapters', authority: 'National Board of Revenue', date: '14 May 2026' },
    { id: 'g-4', no: 'GN/MOC/2025/096', subject: 'Import Policy Order amendment', authority: 'Ministry of Commerce', date: '08 Dec 2025' },
    { id: 'g-5', no: 'GN/NBR/2025/071', subject: 'Appointment of assessment committee members', authority: 'National Board of Revenue', date: '21 Aug 2025' }]

  },
  order: {
    slug: 'order',
    title: 'Order',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'Order' }],
    intro:
    'Administrative and general orders issued by the National Board of Revenue and customs authorities that affect declaration, assessment and clearance work.',
    filters: [
    { label: 'Year', options: YEARS },
    { label: 'Issuing Authority', options: ['All Authorities', 'National Board of Revenue', 'Mongla Custom House', 'Customs Policy Wing'] }],

    columns: [
    { key: 'no', label: 'Order Number', primary: true },
    { key: 'subject', label: 'Subject' },
    { key: 'authority', label: 'Issuing Authority' },
    { key: 'date', label: 'Date' }],

    downloadable: true,
    rows: [
    { id: 'o-1', no: 'ORD/NBR/2026/57', subject: 'Standing order on risk based examination', authority: 'National Board of Revenue', date: '02 Aug 2026' },
    { id: 'o-2', no: 'ORD/MCH/2026/44', subject: 'Working procedure during extended port hours', authority: 'Mongla Custom House', date: '17 Jul 2026' },
    { id: 'o-3', no: 'ORD/CPW/2026/19', subject: 'Clarification on transhipment documentation', authority: 'Customs Policy Wing', date: '29 Apr 2026' },
    { id: 'o-4', no: 'ORD/MCH/2025/88', subject: 'Office order on declarant identity verification', authority: 'Mongla Custom House', date: '06 Oct 2025' },
    { id: 'o-5', no: 'ORD/NBR/2025/33', subject: 'Order on refund claim processing timeline', authority: 'National Board of Revenue', date: '11 Jun 2025' }]

  },
  'advance-ruling': {
    slug: 'advance-ruling',
    title: 'Advance Ruling',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'Advance Ruling' }],
    intro:
    'Advance ruling decisions issued on classification, valuation and origin of imported goods. Rulings are binding on the applicant and the customs authority for the period stated in the decision.',
    filters: [
    { label: 'Year', options: YEARS },
    { label: 'Subject', options: ['All Subjects', 'Classification', 'Valuation', 'Origin', 'Exemption'] }],

    columns: [
    { key: 'no', label: 'Reference Number', primary: true },
    { key: 'subject', label: 'Subject' },
    { key: 'authority', label: 'Issuing Authority' },
    { key: 'date', label: 'Decision Date' }],

    downloadable: false,
    rows: [
    { id: 'ar-1', no: 'AR/2026/018', subject: 'Classification of polypropylene woven fabric', authority: 'Advance Ruling Committee, NBR', date: '23 Jun 2026' },
    { id: 'ar-2', no: 'AR/2026/011', subject: 'Valuation of second hand industrial machinery', authority: 'Advance Ruling Committee, NBR', date: '14 Apr 2026' },
    { id: 'ar-3', no: 'AR/2025/047', subject: 'Origin determination of imported fertiliser', authority: 'Advance Ruling Committee, NBR', date: '02 Dec 2025' },
    { id: 'ar-4', no: 'AR/2025/029', subject: 'Exemption eligibility of solar panel components', authority: 'Advance Ruling Committee, NBR', date: '19 Aug 2025' }]

  },
  'assessment-committee-decision': {
    slug: 'assessment-committee-decision',
    title: 'Assessment Committee Decision',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'Assessment Committee Decision' }],
    intro:
    'Decisions of the assessment committee on disputed valuation, classification and duty assessment matters relating to consignments cleared through Bangladesh customs stations.',
    filters: [
    { label: 'Year', options: YEARS },
    { label: 'Subject', options: ['All Subjects', 'Valuation Dispute', 'Classification Dispute', 'Duty Assessment'] }],

    columns: [
    { key: 'no', label: 'Reference Number', primary: true },
    { key: 'subject', label: 'Decision Subject' },
    { key: 'authority', label: 'Authority' },
    { key: 'date', label: 'Decision Date' }],

    downloadable: true,
    rows: [
    { id: 'ac-1', no: 'ACD/2026/026', subject: 'Assessable value of imported edible oil consignment', authority: 'Assessment Committee, Mongla Custom House', date: '30 Jul 2026' },
    { id: 'ac-2', no: 'ACD/2026/017', subject: 'Classification dispute of steel structure components', authority: 'Assessment Committee, NBR', date: '12 May 2026' },
    { id: 'ac-3', no: 'ACD/2025/052', subject: 'Duty assessment of imported vehicle spare parts', authority: 'Assessment Committee, Mongla Custom House', date: '25 Nov 2025' },
    { id: 'ac-4', no: 'ACD/2025/034', subject: 'Valuation of bulk clinker consignment', authority: 'Assessment Committee, NBR', date: '07 Sep 2025' }]

  },
  'first-schedule': {
    slug: 'first-schedule',
    title: 'First Schedule',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'First Schedule' }],
    intro:
    'The First Schedule to the Customs Act contains the harmonised commodity description and coding system with applicable duty rates. The document in force for the current financial year is shown first.',
    filters: [{ label: 'Financial Year', options: FY }],
    featured: {
      heading: 'Current First Schedule',
      fields: [
      { label: 'Financial Year', value: '2026–2027' },
      { label: 'Document Title', value: 'First Schedule to the Customs Act, 2026–2027' },
      { label: 'Publication Date', value: '30 June 2026' },
      { label: 'Official Source', value: 'National Board of Revenue' },
      { label: 'File', value: 'PDF · 14.2 MB' }],

      archiveHeading: 'Previous Financial Years'
    },
    columns: [
    { key: 'title', label: 'Document Title', primary: true },
    { key: 'fy', label: 'Financial Year' },
    { key: 'date', label: 'Publication Date' },
    { key: 'file', label: 'File Type' }],

    downloadable: true,
    rows: [
    { id: 'fsc-1', title: 'First Schedule to the Customs Act, 2025–2026', fy: '2025–2026', date: '30 Jun 2025', file: 'PDF' },
    { id: 'fsc-2', title: 'First Schedule to the Customs Act, 2024–2025', fy: '2024–2025', date: '30 Jun 2024', file: 'PDF' },
    { id: 'fsc-3', title: 'First Schedule to the Customs Act, 2023–2024', fy: '2023–2024', date: '29 Jun 2023', file: 'PDF' },
    { id: 'fsc-4', title: 'First Schedule to the Customs Act, 2022–2023', fy: '2022–2023', date: '30 Jun 2022', file: 'PDF' }]

  },
  'customs-tariff': {
    slug: 'customs-tariff',
    title: 'Customs Tariff',
    breadcrumb: [{ label: 'Home', to: '/' }, { label: 'NBR Information' }, { label: 'Customs Tariff' }],
    intro:
    'Consolidated customs tariff published by the National Board of Revenue, including duty rates, supplementary duty and regulatory duty applicable to imported goods.',
    filters: [{ label: 'Financial Year', options: FY }],
    featured: {
      heading: 'Current Customs Tariff',
      fields: [
      { label: 'Financial Year', value: '2026–2027' },
      { label: 'Document Title', value: 'Bangladesh Customs Tariff 2026–2027' },
      { label: 'Publication Date', value: '02 July 2026' },
      { label: 'Official Source', value: 'National Board of Revenue' },
      { label: 'File', value: 'PDF · 21.6 MB' }],

      archiveHeading: 'Previous Tariffs'
    },
    columns: [
    { key: 'title', label: 'Document Title', primary: true },
    { key: 'fy', label: 'Financial Year' },
    { key: 'date', label: 'Publication Date' },
    { key: 'file', label: 'File Type' }],

    downloadable: true,
    rows: [
    { id: 'ct-1', title: 'Bangladesh Customs Tariff 2025–2026', fy: '2025–2026', date: '04 Jul 2025', file: 'PDF' },
    { id: 'ct-2', title: 'Bangladesh Customs Tariff 2024–2025', fy: '2024–2025', date: '07 Jul 2024', file: 'PDF' },
    { id: 'ct-3', title: 'Bangladesh Customs Tariff 2023–2024', fy: '2023–2024', date: '05 Jul 2023', file: 'PDF' }]

  }
};