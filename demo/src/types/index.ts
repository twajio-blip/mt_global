export interface Notice {
  id: string;
  date: string;
  title: string;
  titleBn?: string;
  reference: string;
  category: NoticeCategory;
  fileType: 'PDF' | 'DOC';
}

export type NoticeCategory =
'Association' |
'Customs' |
'Port' |
'NBR' |
'Meeting' |
'Office Notice' |
'Condolence';

export interface CommitteeMember {
  id: string;
  name: string;
  nameBn?: string;
  position: string;
  company: string;
}

export interface FormerOfficeBearer {
  id: string;
  name: string;
  company: string;
  term: string;
}

export interface GeneralMember {
  id: string;
  company: string;
  representative: string;
  memberId: string;
  licence: string;
  location: string;
  status: 'Active' | 'Renewal Due' | 'Suspended';
}

export interface Album {
  id: string;
  title: string;
  date: string;
  year: string;
  photos: number;
  cover: string;
  description: string;
}

export interface WebLink {
  name: string;
  description: string;
  url: string;
}

export interface WebLinkCategory {
  category: string;
  links: WebLink[];
}

export interface DocumentRow {
  id: string;
  primary: string;
  subject: string;
  meta1?: string;
  meta2?: string;
  date: string;
  status?: string;
  fileType?: string;
}

export interface DeceasedMember {
  id: string;
  name: string;
  company: string;
  role?: string;
  dateOfDeath: string;
  portrait?: string;
  message: string;
}