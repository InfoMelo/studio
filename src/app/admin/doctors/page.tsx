
import { getDoctors } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import DoctorActions from "./DoctorActions";

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
                                   <DoctorActions doctor={doctor} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
