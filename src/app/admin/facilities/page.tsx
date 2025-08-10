
import { getFacilities } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import FacilityActions from "./FacilityActions";
import { Skeleton } from "@/components/ui/skeleton";
import type { Facility } from "@/lib/types";

function FacilitiesTable({ facilities }: { facilities: Facility[] }) {
    return (
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
    );
}

function TableSkeleton() {
    return (
        <div className="mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-40" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-56" /></TableHead>
                        <TableHead className="text-right"><Skeleton className="h-5 w-16" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-16 w-24 rounded-md" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

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
                {facilities ? <FacilitiesTable facilities={facilities} /> : <TableSkeleton />}
            </CardContent>
        </Card>
    )
}
