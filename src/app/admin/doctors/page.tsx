
import { getDoctors } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function ManageDoctorsPage() {
    const doctors = await getDoctors();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Dokter</CardTitle>
                <Button asChild>
                    <Link href="/admin/doctors/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Dokter
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Spesialisasi</TableHead>
                            <TableHead>Jadwal</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.docId}>
                                <TableCell className="font-medium">{doctor.name}</TableCell>
                                <TableCell>{doctor.specialty}</TableCell>
                                <TableCell>{doctor.schedule}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
