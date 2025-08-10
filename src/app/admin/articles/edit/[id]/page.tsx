
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateArticle, getArticle } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

const articleFormSchema = z.object({
  title: z.string().min(5, { message: "Judul artikel harus diisi (minimal 5 karakter)." }),
  content: z.string().min(50, { message: "Konten artikel harus diisi (minimal 50 karakter)." }),
  author: z.string().min(2, { message: "Nama penulis harus diisi." }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid." }),
  aiHint: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof articleFormSchema>;

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const docId = params.id as string;

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(articleFormSchema),
    });

    useEffect(() => {
        if (docId) {
            getArticle(docId).then(article => {
                if (article) {
                    form.reset(article);
                } else {
                    toast({ variant: "destructive", title: "Gagal", description: "Data artikel tidak ditemukan." });
                    router.push('/admin/articles');
                }
                setLoading(false);
            });
        }
    }, [docId, form, router, toast]);

    async function onSubmit(data: ArticleFormValues) {
        try {
            await updateArticle(docId, data);
            toast({ title: "Sukses", description: "Artikel berhasil diperbarui." });
            router.push('/admin/articles');
        } catch (error) {
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat memperbarui artikel." });
        }
    }
    
    if (loading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Edit Artikel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-40 w-full" />
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
                <CardTitle>Edit Artikel</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Artikel</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: 5 Tips Menjaga Kesehatan Jantung" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Isi Artikel</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tulis konten artikel di sini..." {...field} rows={10} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Penulis</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="aiHint"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>AI Hint untuk Gambar</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contoh: healthy heart diagram" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Kata kunci untuk AI untuk membuat gambar. Maksimal 2 kata.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                         <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Gambar Utama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch('imageUrl') && !form.getFieldState('imageUrl').error && (
                            <div className="rounded-md border p-2">
                                <p className="text-sm font-medium mb-2">Pratinjau Gambar:</p>
                                <img src={form.watch('imageUrl')} alt="Pratinjau Artikel" className="rounded max-h-48 w-auto" />
                            </div>
                        )}
                        
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
