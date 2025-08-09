
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

// TODO: Implement actions for Services and Facilities
