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
  icon: LucideIcon;
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

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [lang: string]: Translation;
}
