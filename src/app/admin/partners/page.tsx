
import { getPartners } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import PartnerActions from "./PartnerActions";
import type { Partner } from "@/lib/types";

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
            </CardContent>
        </Card>
    )
}
