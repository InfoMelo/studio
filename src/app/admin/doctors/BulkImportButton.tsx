
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { bulkAddDoctors } from '@/app/admin/actions';

export default function BulkImportButton() {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'File tidak ditemukan',
        description: 'Silakan pilih file Excel untuk diimpor.',
      });
      return;
    }

    setIsImporting(true);

    try {
      const fileBuffer = await selectedFile.arrayBuffer();
      const result = await bulkAddDoctors(Buffer.from(fileBuffer).toString('base64'));
      
      if (result.success) {
        toast({
          title: 'Impor Berhasil',
          description: `${result.count} data dokter berhasil ditambahkan.`,
        });
        setIsOpen(false);
        router.refresh();
      } else {
        toast({
          variant: 'destructive',
          title: 'Impor Gagal',
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Gagal memproses file. Pastikan format file sudah benar.',
      });
    } finally {
      setIsImporting(false);
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Impor dari Excel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Impor Massal Data Dokter</DialogTitle>
          <DialogDescription>
            Pilih file Excel (.xlsx) untuk mengimpor data. Pastikan file memiliki kolom: `name`, `specialty`, dan `schedule`.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input type="file" accept=".xlsx" onChange={handleFileChange} />
          <Button onClick={handleImport} disabled={!selectedFile || isImporting} className="w-full">
            {isImporting ? 'Mengimpor...' : 'Mulai Impor'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
