
import { getServices } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ServiceActions from "./ServiceActions";
import type { Service } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function ServicesTable({ services }: { services: Service[] }) {
    return (
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
    );
}

function TableSkeleton() {
    return (
        <div className="mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Skeleton className="h-5 w-16" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-40" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-56" /></TableHead>
                        <TableHead className="text-right"><Skeleton className="h-5 w-16" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
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
                {services ? <ServicesTable services={services} /> : <TableSkeleton />}
            </CardContent>
        </Card>
    )
}
