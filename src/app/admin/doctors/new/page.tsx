
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addDoctor } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const doctorFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus diisi." }),
  specialty: z.string().min(2, { message: "Spesialisasi harus diisi." }),
  schedule: z.string().min(5, { message: "Jadwal harus diisi." }),
  status: z.enum(['Praktek', 'Tutup']),
  statusInfo: z.string().optional(),
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
            status: 'Praktek',
            statusInfo: '',
            imageUrl: 'https://placehold.co/100x100.png',
            aiHint: 'doctor portrait'
        }
    });

    const statusValue = form.watch('status');

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
                         {statusValue === 'Tutup' && (
                          <FormField
                            control={form.control}
                            name="statusInfo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Keterangan Tambahan (Opsional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Contoh: Kembali praktek tanggal 25 Des 2024"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Informasi ini akan ditampilkan saat status 'Tutup' disorot.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
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
