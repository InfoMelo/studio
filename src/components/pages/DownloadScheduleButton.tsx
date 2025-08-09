'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { Doctor } from '@/lib/types';

interface DownloadScheduleButtonProps {
  doctors: Doctor[];
  specialty: string;
}

export default function DownloadScheduleButton({ doctors, specialty }: DownloadScheduleButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async () => {
    setIsGenerating(true);

    const scheduleElement = document.getElementById('schedule-for-pdf');
    if (!scheduleElement) {
        console.error("Element for PDF not found");
        setIsGenerating(false);
        return;
    }

    try {
        const canvas = await html2canvas(scheduleElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if content is longer than one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save(`jadwal-dokter-${specialty.toLowerCase().replace(/ /g, '-')}.pdf`);

    } catch (error) {
        console.error("Failed to generate PDF:", error);
    } finally {
        setIsGenerating(false);
    }
  };
  
  // Render a hidden component for PDF generation
  const ScheduleForPdf = () => (
    <div id="schedule-for-pdf" style={{ position: 'absolute', left: '-9999px', width: '794px', padding: '20px', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#006d77' }}>
            Jadwal Dokter RSU Meloy
        </h1>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '18px', color: '#333' }}>
            Spesialisasi: {specialty}
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
            <tr style={{ backgroundColor: '#006d77', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nama Dokter</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Spesialisasi</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Jadwal</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
            </tr>
            </thead>
            <tbody>
            {doctors.map(doctor => (
                <tr key={doctor.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.specialty}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.schedule}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', color: doctor.status === 'Praktek' ? 'green' : 'red' }}>
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
      <Button onClick={generatePdf} disabled={isGenerating || doctors.length === 0}>
        <Download className="mr-2 h-4 w-4" />
        {isGenerating ? 'Membuat PDF...' : 'Unduh Jadwal (PDF)'}
      </Button>
    </>
  );
}
