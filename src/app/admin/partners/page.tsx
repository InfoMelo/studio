
import { getPartners } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import PartnerActions from "./PartnerActions";
import type { Partner } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function PartnersTable({ partners }: { partners: Partner[] }) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Nama Mitra</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {partners.map((partner: Partner) => (
                        <TableRow key={partner.docId}>
                            <TableCell>
                                <Image
                                    src={partner.imageUrl}
                                    alt={partner.name}
                                    width={100}
                                    height={50}
                                    className="rounded-md object-contain"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{partner.name}</TableCell>
                            <TableCell className="text-right">
                                <PartnerActions partner={partner} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {partners.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>Belum ada mitra yang ditambahkan. Klik "Tambah Mitra" untuk memulai.</p>
                </div>
            )}
        </>
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
                        <TableHead className="text-right"><Skeleton className="h-5 w-16" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-12 w-24 rounded-md" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default async function ManagePartnersPage() {
    const partners = await getPartners();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Mitra</CardTitle>
                <Button asChild>
                    <Link href="/admin/partners/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Mitra
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {partners ? <PartnersTable partners={partners} /> : <TableSkeleton />}
            </CardContent>
        </Card>
    )
}
