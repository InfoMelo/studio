
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updatePartner, getPartner } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const partnerFormSchema = z.object({
  name: z.string().min(2, { message: "Nama mitra harus diisi." }),
  imageUrl: z.string().url({ message: "URL logo tidak valid." }),
  aiHint: z.string().min(2, { message: "AI Hint harus diisi." }),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export default function EditPartnerPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const docId = params.id as string;

    const form = useForm<PartnerFormValues>({
        resolver: zodResolver(partnerFormSchema),
    });

    useEffect(() => {
        if (docId) {
            getPartner(docId).then(partner => {
                if (partner) {
                    form.reset(partner);
                } else {
                    toast({ variant: "destructive", title: "Gagal", description: "Data mitra tidak ditemukan." });
                    router.push('/admin/partners');
                }
                setLoading(false);
            });
        }
    }, [docId, form, router, toast]);

    async function onSubmit(data: PartnerFormValues) {
        try {
            await updatePartner(docId, data);
            toast({ title: "Sukses", description: "Data mitra berhasil diperbarui." });
            router.push('/admin/partners');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat memperbarui data." });
        }
    }
    
    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Edit Mitra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
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
                <CardTitle>Edit Mitra</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Mitra</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: BPJS Kesehatan" {...field} />
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
                                    <FormLabel>URL Logo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                     <FormDescription>
                                        Gunakan link gambar dari internet. Pastikan gambar berformat transparan (PNG).
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
                                        <Input placeholder="Contoh: bpjs logo" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Kata kunci untuk AI, jika logo perlu diganti di masa depan.
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
