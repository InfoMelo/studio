
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteVacancy } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Vacancy } from '@/lib/types';

interface VacancyActionsProps {
  vacancy: Vacancy;
}

export default function VacancyActions({ vacancy }: VacancyActionsProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (vacancy.docId) {
        await deleteVacancy(vacancy.docId);
        toast({ title: "Sukses", description: "Lowongan berhasil dihapus." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menghapus lowongan." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/vacancies/edit/${vacancy.docId}`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Lowongan untuk posisi <strong>{vacancy.title}</strong> akan dihapus secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/80">
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
