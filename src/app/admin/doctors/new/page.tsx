
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addDoctor } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const doctorFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi." }),
  specialty: z.string().min(2, { message: "Spesialisasi harus diisi." }),
  schedule: z.string().min(5, { message: "Jadwal harus diisi." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }).default('https://placehold.co/100x100.png'),
  aiHint: z.string().default('doctor portrait'),
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

export default function NewDoctorPage() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<DoctorFormValues>({
        resolver: zodResolver(doctorFormSchema),
        defaultValues: {
            name: '',
            specialty: '',
            schedule: '',
            imageUrl: 'https://placehold.co/100x100.png',
            aiHint: 'doctor portrait'
        }
    });

    async function onSubmit(data: DoctorFormValues) {
        try {
            await addDoctor(data);
            toast({ title: "Sukses", description: "Data dokter berhasil ditambahkan." });
            router.push('/admin/doctors');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menambahkan data." });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Dokter Baru</CardTitle>
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
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
