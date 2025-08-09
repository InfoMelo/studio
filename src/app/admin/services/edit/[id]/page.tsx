
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateService, getService } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { allLucideIcons } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const serviceFormSchema = z.object({
  name: z.string().min(2, { message: "Nama layanan harus diisi." }),
  description: z.string().min(10, { message: "Deskripsi harus diisi." }),
  iconName: z.string({ required_error: "Ikon harus dipilih." }),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const docId = params.id as string;

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceFormSchema),
    });

    useEffect(() => {
        if (docId) {
            getService(docId).then(service => {
                if (service) {
                    form.reset(service as any);
                } else {
                    toast({ variant: "destructive", title: "Gagal", description: "Data layanan tidak ditemukan." });
                    router.push('/admin/services');
                }
                setLoading(false);
            });
        }
    }, [docId, form, router, toast]);

    async function onSubmit(data: ServiceFormValues) {
        try {
            await updateService(docId, data);
            toast({ title: "Sukses", description: "Data layanan berhasil diperbarui." });
            router.push('/admin/services');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat memperbarui data." });
        }
    }
    
    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Edit Layanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-20 w-full" />
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
                <CardTitle>Edit Layanan</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Layanan</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Unit Gawat Darurat" {...field} />
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
                                        <Textarea placeholder="Deskripsi singkat tentang layanan..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="iconName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ikon</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih ikon untuk layanan" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allLucideIcons.map(iconName => (
                                                <SelectItem key={iconName} value={iconName}>
                                                    {iconName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
