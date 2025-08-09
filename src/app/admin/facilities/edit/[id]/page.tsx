
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateFacility, getFacility } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import type { Facility } from '@/lib/types';

const facilityFormSchema = z.object({
  name: z.string().min(2, { message: "Nama fasilitas harus diisi." }),
  description: z.string().min(10, { message: "Deskripsi harus diisi." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }),
  aiHint: z.string().min(2, { message: "AI Hint harus diisi." }),
});

type FacilityFormValues = z.infer<typeof facilityFormSchema>;

export default function EditFacilityPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const docId = params.id as string;

    const form = useForm<FacilityFormValues>({
        resolver: zodResolver(facilityFormSchema),
    });

    useEffect(() => {
        if (docId) {
            getFacility(docId).then(facility => {
                if (facility) {
                    form.reset(facility);
                } else {
                    toast({ variant: "destructive", title: "Gagal", description: "Data fasilitas tidak ditemukan." });
                    router.push('/admin/facilities');
                }
                setLoading(false);
            });
        }
    }, [docId, form, router, toast]);

    async function onSubmit(data: FacilityFormValues) {
        try {
            await updateFacility(docId, data);
            toast({ title: "Sukses", description: "Data fasilitas berhasil diperbarui." });
            router.push('/admin/facilities');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat memperbarui data." });
        }
    }
    
    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Edit Fasilitas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
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
                <CardTitle>Edit Fasilitas</CardTitle>
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
                            <Button type="submit">Simpan Perubahan</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
