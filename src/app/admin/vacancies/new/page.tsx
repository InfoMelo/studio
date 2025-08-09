
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addVacancy } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const vacancyFormSchema = z.object({
  title: z.string().min(5, { message: "Judul posisi harus diisi (minimal 5 karakter)." }),
  description: z.string().min(20, { message: "Deskripsi pekerjaan harus diisi (minimal 20 karakter)." }),
  type: z.enum(['Full-time', 'Part-time', 'Internship']),
  location: z.string().min(2, { message: "Lokasi harus diisi." }),
  deadline: z.date({
    required_error: "Batas akhir pendaftaran harus diisi.",
  }),
});

type VacancyFormValues = z.infer<typeof vacancyFormSchema>;

export default function NewVacancyPage() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<VacancyFormValues>({
        resolver: zodResolver(vacancyFormSchema),
        defaultValues: {
            title: '',
            description: '',
            type: 'Full-time',
            location: 'Sangatta, Kutai Timur',
        }
    });

    async function onSubmit(data: VacancyFormValues) {
        try {
            await addVacancy({...data, deadline: data.deadline.toISOString()});
            toast({ title: "Sukses", description: "Lowongan baru berhasil ditambahkan." });
            router.push('/admin/vacancies');
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menambahkan lowongan." });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Lowongan Baru</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Posisi</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Contoh: Perawat IGD" {...field} />
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
                                    <FormLabel>Deskripsi Pekerjaan</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Jelaskan tanggung jawab, kualifikasi, dll." {...field} rows={8} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipe Pekerjaan</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih tipe" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Full-time">Full-time</SelectItem>
                                                <SelectItem value="Part-time">Part-time</SelectItem>
                                                <SelectItem value="Internship">Internship</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lokasi</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Batas Akhir Pendaftaran</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pilih tanggal</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
                            <Button type="submit">Publikasikan Lowongan</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
