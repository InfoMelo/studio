
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, getDoc, query, where, writeBatch } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import type { Doctor, Service, Facility } from '@/lib/types';
import * as XLSX from 'xlsx';

// Doctors Actions
export async function getDoctors(): Promise<Doctor[]> {
    const doctorsCol = collection(db, 'doctors');
    const doctorSnapshot = await getDocs(doctorsCol);
    const doctorList = doctorSnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id } as Doctor));
    return doctorList.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export async function getDoctor(docId: string): Promise<Doctor | null> {
    const doctorRef = doc(db, 'doctors', docId);
    const doctorSnap = await getDoc(doctorRef);
    if (doctorSnap.exists()) {
        return { ...doctorSnap.data(), docId: doctorSnap.id } as Doctor;
    }
    return null;
}

export async function addDoctor(doctor: Omit<Doctor, 'id' | 'docId'>) {
    const doctorsCol = collection(db, 'doctors');
    const newDoctor = { ...doctor, id: new Date().getTime().toString() };
    await addDoc(doctorsCol, newDoctor);
    revalidatePath('/admin/doctors');
    revalidatePath('/doctors');
}

export async function updateDoctor(docId: string, doctor: Partial<Doctor>) {
    const doctorRef = doc(db, 'doctors', docId);
    await updateDoc(doctorRef, doctor);
    revalidatePath('/admin/doctors');
    revalidatePath('/doctors');
}

export async function deleteDoctor(docId: string) {
    const doctorRef = doc(db, 'doctors', docId);
    await deleteDoc(doctorRef);
    revalidatePath('/admin/doctors');
    revalidatePath('/doctors');
}

export async function bulkAddDoctors(fileBase64: string): Promise<{ success: boolean; count?: number; error?: string }> {
  try {
    const buffer = Buffer.from(fileBase64, 'base64');
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet) as any[];

    if (!data.length) {
      return { success: false, error: 'File Excel kosong atau format tidak sesuai.' };
    }

    // Validate headers
    const requiredHeaders = ['name', 'specialty', 'schedule'];
    const headers = Object.keys(data[0]);
    if (!requiredHeaders.every(h => headers.includes(h))) {
        return { success: false, error: `Header tidak sesuai. Pastikan ada kolom: ${requiredHeaders.join(', ')}` };
    }
    
    const batch = writeBatch(db);
    let count = 0;

    data.forEach(row => {
        if (row.name && row.specialty && row.schedule) {
            const newDoctor: Omit<Doctor, 'docId'> = {
                id: new Date().getTime().toString() + count,
                name: row.name,
                specialty: row.specialty,
                schedule: row.schedule,
                status: row.status === 'Tutup' ? 'Tutup' : 'Praktek',
                statusInfo: row.statusInfo || '',
                imageUrl: row.imageUrl || 'https://placehold.co/100x100.png',
                aiHint: row.aiHint || 'doctor portrait'
            };
            const docRef = doc(collection(db, 'doctors'));
            batch.set(docRef, newDoctor);
            count++;
        }
    });

    if (count === 0) {
        return { success: false, error: 'Tidak ada data valid yang ditemukan dalam file.' };
    }

    await batch.commit();
    revalidatePath('/admin/doctors');
    revalidatePath('/doctors');
    return { success: true, count };

  } catch (error) {
    console.error("Error bulk adding doctors:", error);
    return { success: false, error: 'Gagal memproses file. Periksa konsol untuk detailnya.' };
  }
}

// Services Actions
export async function getServices(): Promise<Service[]> {
    const servicesCol = collection(db, 'services');
    const serviceSnapshot = await getDocs(servicesCol);
    return serviceSnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id } as Service));
}

export async function getService(docId: string): Promise<Service | null> {
    const serviceRef = doc(db, 'services', docId);
    const serviceSnap = await getDoc(serviceRef);
    if (serviceSnap.exists()) {
        return { ...serviceSnap.data(), docId: serviceSnap.id } as Service;
    }
    return null;
}

export async function addService(service: Omit<Service, 'id' | 'docId' | 'icon'> & { iconName: string }) {
    const servicesCol = collection(db, 'services');
    const newService = { ...service, id: new Date().getTime().toString() };
    await addDoc(servicesCol, newService);
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/'); // For home page
}

export async function updateService(docId: string, service: Partial<Omit<Service, 'icon'>> & { iconName: string }) {
    const serviceRef = doc(db, 'services', docId);
    await updateDoc(serviceRef, service);
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/'); // For home page
}

export async function deleteService(docId: string) {
    const serviceRef = doc(db, 'services', docId);
    await deleteDoc(serviceRef);
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/'); // For home page
}

// Facilities Actions
export async function getFacilities(): Promise<Facility[]> {
    const facilitiesCol = collection(db, 'facilities');
    const facilitySnapshot = await getDocs(facilitiesCol);
    return facilitySnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id } as Facility));
}

export async function getFacility(docId: string): Promise<Facility | null> {
    const facilityRef = doc(db, 'facilities', docId);
    const facilitySnap = await getDoc(facilityRef);
    if (facilitySnap.exists()) {
        return { ...facilitySnap.data(), docId: facilitySnap.id } as Facility;
    }
    return null;
}

export async function addFacility(facility: Omit<Facility, 'id' | 'docId'>) {
    const facilitiesCol = collection(db, 'facilities');
    const newFacility = { ...facility, id: new Date().getTime().toString() };
    await addDoc(facilitiesCol, newFacility);
    revalidatePath('/admin/facilities');
    revalidatePath('/facilities');
}

export async function updateFacility(docId: string, facility: Partial<Facility>) {
    const facilityRef = doc(db, 'facilities', docId);
    await updateDoc(facilityRef, facility);
    revalidatePath('/admin/facilities');
    revalidatePath('/facilities');
}

export async function deleteFacility(docId: string) {
    const facilityRef = doc(db, 'facilities', docId);
    await deleteDoc(facilityRef);
    revalidatePath('/admin/facilities');
    revalidatePath('/facilities');
}
