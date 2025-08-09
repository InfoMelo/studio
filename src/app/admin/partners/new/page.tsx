
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addPartner } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const partnerFormSchema = z.object({
  name: z.string().min(2, { message: "Nama mitra harus diisi." }),
  imageUrl: z.string().url({ message: "URL logo tidak valid." }),
  aiHint: z.string().min(2, { message: "AI Hint harus diisi." }),
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export default function NewPartnerPage() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<PartnerFormValues>({
        resolver: zodResolver(partnerFormSchema),
        defaultValues: {
            name: '',
            imageUrl: 'https://placehold.co/140x70.png',
            aiHint: 'company logo'
        }
    });

    async function onSubmit(data: PartnerFormValues) {
        try {
            await addPartner(data);
            toast({ title: "Sukses", description: "Mitra baru berhasil ditambahkan." });
            router.push('/admin/partners');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menambahkan data." });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Mitra Baru</CardTitle>
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
                            <Button type="submit">Simpan</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
