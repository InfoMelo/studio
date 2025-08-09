
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, getDoc, query, where } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import type { Doctor, Service, Facility } from '@/lib/types';

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

// TODO: Implement actions for Services and Facilities
