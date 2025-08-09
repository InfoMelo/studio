
import { getDoctors } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import DoctorActions from "./DoctorActions";
import BulkImportButton from "./BulkImportButton";
import { Badge } from "@/components/ui/badge";
import type { Doctor } from "@/lib/types";

export default async function ManageDoctorsPage() {
    const doctors = await getDoctors();

    const getTooltipContent = (doctor: Doctor) => {
        if (doctor.status === 'Tutup' && doctor.statusInfo) {
          return doctor.statusInfo;
        }
        if (doctor.status === 'Tutup') {
          return 'Dokter tidak membuka praktek saat ini.';
        }
        return 'Dokter sedang membuka praktek sesuai jadwal.';
    }

    return (
        <TooltipProvider>
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
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Badge variant={doctor.status === 'Praktek' ? 'default' : 'destructive'} className={`${doctor.status === 'Praktek' ? 'bg-green-600' : ''} text-white`}>
                                                    {doctor.status}
                                                </Badge>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{getTooltipContent(doctor)}</p>
                                            </TooltipContent>
                                        </Tooltip>
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
        </TooltipProvider>
    )
}
