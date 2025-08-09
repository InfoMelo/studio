
import { getArticles } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import ArticleActions from "./ArticleActions";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Article } from "@/lib/types";

export default async function ManageArticlesPage() {
    const articles = await getArticles();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelola Artikel</CardTitle>
                <Button asChild>
                    <Link href="/admin/articles/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Tambah Artikel
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Gambar</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Penulis</TableHead>
                            <TableHead>Tanggal Publikasi</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article: Article) => (
                            <TableRow key={article.docId}>
                                <TableCell>
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.title}
                                        width={100}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                </TableCell>
                                <TableCell className="font-medium max-w-sm truncate">{article.title}</TableCell>
                                <TableCell>{article.author}</TableCell>
                                <TableCell>{format(new Date(article.createdAt), 'd MMM yyyy', { locale: id })}</TableCell>
                                <TableCell className="text-right">
                                    <ArticleActions article={article} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {articles.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Belum ada artikel yang dibuat. Klik "Tambah Artikel" untuk memulai.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
