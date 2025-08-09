

import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  submenu?: SubmenuItem[];
}

export interface SubmenuItem {
  id: string;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  docId?: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  docId?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: string;
  status: 'Praktek' | 'Tutup';
  statusInfo?: string; // Keterangan tambahan untuk status
  imageUrl: string;
  aiHint: string;
  // Firestore document ID, optional as it's not present on creation
  docId?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  aiHint: string;
  createdAt: string; // ISO string date
  docId?: string;
}

export interface Partner {
  id: string;
  name: string;
  imageUrl: string;
  aiHint: string;
  docId?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  location: string;
  deadline: string; // ISO string date
  createdAt: string; // ISO string date
  docId?: string;
}


export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [lang: string]: Translation;
}
