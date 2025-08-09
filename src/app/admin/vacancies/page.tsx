
import { getVacancies } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import VacancyActions from "./VacancyActions";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Vacancy } from "@/lib/types";

export default async function ManageVacanciesPage() {
    const vacancies = await getVacancies();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Lowongan Kerja</CardTitle>
                <Button asChild>
                    <Link href="/admin/vacancies/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Lowongan
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Posisi</TableHead>
                            <TableHead>Tipe</TableHead>
                            <TableHead>Lokasi</TableHead>
                            <TableHead>Batas Akhir</TableHead>
                            <TableHead>Tanggal Publikasi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vacancies.map((vacancy: Vacancy) => (
                            <TableRow key={vacancy.docId}>
                                <TableCell className="font-medium max-w-sm truncate">{vacancy.title}</TableCell>
                                <TableCell><Badge variant="secondary">{vacancy.type}</Badge></TableCell>
                                <TableCell>{vacancy.location}</TableCell>
                                <TableCell>{format(new Date(vacancy.deadline), 'd MMM yyyy', { locale: id })}</TableCell>
                                <TableCell>{format(new Date(vacancy.createdAt), 'd MMM yyyy', { locale: id })}</TableCell>
                                <TableCell className="text-right">
                                    <VacancyActions vacancy={vacancy} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {vacancies.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Belum ada lowongan yang dibuat. Klik "Tambah Lowongan" untuk memulai.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
