
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateDoctor, getDoctor } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import type { Doctor } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const doctorFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi." }),
  specialty: z.string().min(2, { message: "Spesialisasi harus diisi." }),
  schedule: z.string().min(5, { message: "Jadwal harus diisi." }),
  status: z.enum(['Praktek', 'Tutup']),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }).default('https://placehold.co/100x100.png'),
  aiHint: z.string().default('doctor portrait'),
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

export default function EditDoctorPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const docId = params.id as string;

    const form = useForm<DoctorFormValues>({
        resolver: zodResolver(doctorFormSchema),
        defaultValues: {
            name: '',
            specialty: '',
            schedule: '',
            status: 'Praktek',
            imageUrl: '',
            aiHint: ''
        }
    });

    useEffect(() => {
        if (docId) {
            getDoctor(docId).then(doctor => {
                if (doctor) {
                    form.reset(doctor);
                } else {
                    toast({ variant: "destructive", title: "Gagal", description: "Data dokter tidak ditemukan." });
                    router.push('/admin/doctors');
                }
                setLoading(false);
            });
        }
    }, [docId, form, router, toast]);

    async function onSubmit(data: DoctorFormValues) {
        try {
            await updateDoctor(docId, data);
            toast({ title: "Sukses", description: "Data dokter berhasil diperbarui." });
            router.push('/admin/doctors');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat memperbarui data." });
        }
    }
    
    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Edit Dokter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <div className="flex justify-end gap-2">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-20" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Dokter</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Dokter</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Dr. Budi Santoso" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="specialty"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Spesialisasi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Penyakit Dalam" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="schedule"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jadwal</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Senin, Rabu (09:00 - 12:00)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Praktek">Praktek</SelectItem>
                                    <SelectItem value="Tutup">Tutup</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Gambar</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
                            <Button type="submit">Simpan Perubahan</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
