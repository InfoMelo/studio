
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import type { Doctor } from '@/lib/types';

interface DownloadScheduleButtonProps {
  doctors: Doctor[];
  specialty: string;
}

export default function DownloadScheduleButton({ doctors, specialty }: DownloadScheduleButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async () => {
    setIsGenerating(true);

    try {
        const { default: jsPDF } = await import('jspdf');
        const { default: html2canvas } = await import('html2canvas');

        const scheduleElement = document.getElementById('schedule-for-pdf');
        if (!scheduleElement) {
            console.error("Element for PDF not found");
            setIsGenerating(false);
            return;
        }

        const canvas = await html2canvas(scheduleElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        let imgWidth = pdfWidth - 20; // with margin
        let imgHeight = imgWidth / ratio;

        if (imgHeight > pdfHeight - 20) {
            imgHeight = pdfHeight - 20;
            imgWidth = imgHeight * ratio;
        }
        
        const x = (pdfWidth - imgWidth) / 2;
        const y = 10;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`jadwal-dokter-${specialty.toLowerCase().replace(/ /g, '-')}.pdf`);

    } catch (error) {
        console.error("Failed to generate PDF:", error);
    } finally {
        setIsGenerating(false);
    }
  };
  
  const ScheduleForPdf = () => (
    <div id="schedule-for-pdf" style={{ position: 'absolute', left: '-9999px', width: '794px', padding: '20px', backgroundColor: 'white', color: 'black', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px', color: '#006d77' }}>
            Jadwal Dokter RSU Meloy
        </h1>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px' }}>
            Spesialisasi: {specialty}
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
            <tr style={{ backgroundColor: '#006d77', color: 'white' }}>
                <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left' }}>Nama Dokter</th>
                <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left' }}>Jadwal</th>
                <th style={{ border: '1px solid #333', padding: '8px', textAlign: 'left' }}>Status</th>
            </tr>
            </thead>
            <tbody>
            {doctors.map(doctor => (
                <tr key={doctor.id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ border: '1px solid #333', padding: '8px' }}>{doctor.name}</td>
                    <td style={{ border: '1px solid #333', padding: '8px' }}>{doctor.schedule}</td>
                    <td style={{ border: '1px solid #333', padding: '8px', color: doctor.status === 'Praktek' ? 'green' : 'red' }}>
                        {doctor.status}
                        {doctor.status === 'Tutup' && doctor.statusInfo && <span style={{display: 'block', fontSize:'10px'}}> ({doctor.statusInfo})</span>}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
         <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '10px', color: '#888' }}>
            Jadwal dapat berubah sewaktu-waktu. Untuk informasi lebih lanjut, hubungi RSU Meloy.
        </p>
    </div>
  );

  return (
    <>
      <ScheduleForPdf />
      <Button onClick={generatePdf} disabled={isGenerating || doctors.length === 0} size="icon">
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        <span className="sr-only">Unduh Jadwal</span>
      </Button>
    </>
  );
}
