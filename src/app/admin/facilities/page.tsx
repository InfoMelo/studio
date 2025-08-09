
import { getFacilities } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import FacilityActions from "./FacilityActions";

export default async function ManageFacilitiesPage() {
    const facilities = await getFacilities();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Fasilitas</CardTitle>
                <Button asChild>
                    <Link href="/admin/facilities/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Fasilitas
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Gambar</TableHead>
                            <TableHead>Nama Fasilitas</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {facilities.map((facility) => (
                            <TableRow key={facility.docId}>
                                <TableCell>
                                    <Image
                                        src={facility.imageUrl}
                                        alt={facility.name}
                                        width={100}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{facility.name}</TableCell>
                                <TableCell className="max-w-xs truncate">{facility.description}</TableCell>
                                <TableCell className="text-right">
                                    <FacilityActions facility={facility} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
