
import { getDoctors } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import DoctorActions from "./DoctorActions";
import BulkImportButton from "./BulkImportButton";
import { Badge } from "@/components/ui/badge";

export default async function ManageDoctorsPage() {
    const doctors = await getDoctors();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Dokter</CardTitle>
                <div className="flex items-center gap-2">
                    <BulkImportButton />
                    <Button asChild>
                        <Link href="/admin/doctors/new">
                            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Dokter
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Spesialisasi</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Jadwal</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.docId}>
                                <TableCell className="font-medium">{doctor.name}</TableCell>
                                <TableCell>{doctor.specialty}</TableCell>
                                <TableCell>
                                    <Badge variant={doctor.status === 'Praktek' ? 'default' : 'destructive'} className={`${doctor.status === 'Praktek' ? 'bg-green-600' : ''} text-white`}>
                                        {doctor.status}
                                    </Badge>
                                </TableCell>
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
