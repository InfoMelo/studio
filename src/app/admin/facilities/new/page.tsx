
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addFacility } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const facilityFormSchema = z.object({
  name: z.string().min(2, { message: "Nama fasilitas harus diisi." }),
  description: z.string().min(10, { message: "Deskripsi harus diisi." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }),
  aiHint: z.string().min(2, { message: "AI Hint harus diisi." }),
});

type FacilityFormValues = z.infer<typeof facilityFormSchema>;

export default function NewFacilityPage() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<FacilityFormValues>({
        resolver: zodResolver(facilityFormSchema),
        defaultValues: {
            name: '',
            description: '',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'hospital facility'
        }
    });

    async function onSubmit(data: FacilityFormValues) {
        try {
            await addFacility(data);
            toast({ title: "Sukses", description: "Fasilitas baru berhasil ditambahkan." });
            router.push('/admin/facilities');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menambahkan data." });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Fasilitas Baru</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Fasilitas</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Ruang Operasi Modern" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Deskripsi singkat tentang fasilitas..." {...field} />
                                    </FormControl>
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
                                    <FormDescription>
                                        Gunakan link gambar dari internet (misal: Unsplash, Pexels, Cloudinary).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="aiHint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>AI Hint</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: operating room" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Kata kunci untuk AI, jika gambar perlu diganti di masa depan. Maksimal 2 kata.
                                    </FormDescription>
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
