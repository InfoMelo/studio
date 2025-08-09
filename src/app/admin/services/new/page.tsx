
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addService } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import type { Service } from '@/lib/types';

const serviceFormSchema = z.object({
  name: z.string().min(2, { message: "Nama layanan harus diisi." }),
  description: z.string().min(10, { message: "Deskripsi harus diisi." }),
  iconUrl: z.string().url({ message: "URL ikon tidak valid." }),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function NewServicePage() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            name: '',
            description: '',
            iconUrl: '',
        }
    });

    async function onSubmit(data: ServiceFormValues) {
        const newService: Omit<Service, 'docId' | 'id'> = data;
        try {
            await addService(newService);
            toast({ title: "Sukses", description: "Layanan baru berhasil ditambahkan." });
            router.push('/admin/services');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menambahkan data." });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Layanan Baru</CardTitle>
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
                            name="iconUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Ikon</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Tempelkan URL gambar untuk ikon (format SVG atau PNG transparan disarankan).
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
