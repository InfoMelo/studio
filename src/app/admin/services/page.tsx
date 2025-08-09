
import { getServices } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ServiceActions from "./ServiceActions";
import type { Service } from "@/lib/types";

export default async function ManageServicesPage() {
    const services = await getServices();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Layanan</CardTitle>
                <Button asChild>
                    <Link href="/admin/services/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Layanan
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ikon</TableHead>
                            <TableHead>Nama Layanan</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service: Service) => (
                            <TableRow key={service.docId}>
                                <TableCell>
                                    {service.iconUrl && (
                                        <Image
                                            src={service.iconUrl}
                                            alt={`Ikon ${service.name}`}
                                            width={32}
                                            height={32}
                                            className="object-contain"
                                        />
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{service.name}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell className="text-right">
                                    <ServiceActions service={service} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
