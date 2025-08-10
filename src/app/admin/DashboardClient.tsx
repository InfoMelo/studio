'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, HeartPulse, FileText, Users } from "lucide-react";
import Link from 'next/link';
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  link: string;
}

function StatCard({ title, value, icon: Icon, link }: StatCardProps) {
  return (
    <Link href={link}>
      <Card className="hover:bg-accent hover:text-accent-foreground transition-colors">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </Link>
  )
}

function DoctorDistributionChart({ data }: { data: { name: string, count: number }[] }) {
  if (!data || data.length === 0) {
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Distribusi Dokter per Spesialisasi</CardTitle>
                <CardDescription>Menampilkan jumlah dokter untuk setiap spesialisasi.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground">
                    <p>Data spesialisasi dokter tidak tersedia.</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Distribusi Dokter per Spesialisasi</CardTitle>
        <CardDescription>Menampilkan jumlah dokter untuk setiap spesialisasi.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
         <ChartContainer config={{}} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data} margin={{ top: 5, right: 20, left: -10, bottom: 50 }}>
              <CartesianGrid vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                height={80} // Increased height for more space
                angle={-45}
                textAnchor="end"
                interval={0}
                fontSize={12}
              />
              <YAxis allowDecimals={false} />
              <RechartsTooltip 
                cursor={{ fill: 'hsl(var(--accent))' }}
                content={<ChartTooltipContent />} 
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
            </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
    return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
           <Skeleton className="col-span-1 lg:col-span-2 h-80" />
           <Skeleton className="h-80" />
        </div>
    </div>
    )
}

type DashboardStats = {
    totalDoctors: number;
    totalServices: number;
    totalArticles: number;
    totalPartners: number;
    doctorSpecialtyDistribution: { name: string; count: number; }[];
}

interface DashboardClientProps {
    stats: DashboardStats | null;
}

export default function DashboardClient({ stats }: DashboardClientProps) {
  if (!stats) {
    return <DashboardSkeleton />;
  }
  
  const { totalDoctors, totalServices, totalArticles, totalPartners, doctorSpecialtyDistribution } = stats;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Dokter" value={totalDoctors} icon={Stethoscope} link="/admin/doctors" />
          <StatCard title="Total Layanan" value={totalServices} icon={HeartPulse} link="/admin/services" />
          <StatCard title="Total Artikel" value={totalArticles} icon={FileText} link="/admin/articles" />
          <StatCard title="Total Mitra" value={totalPartners} icon={Users} link="/admin/partners" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <DoctorDistributionChart data={doctorSpecialtyDistribution} />
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Aktivitas Terkini</CardTitle>
                     <CardDescription>Ringkasan aktivitas terbaru dalam sistem.</CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-muted-foreground">Belum ada data aktivitas.</p>
                </CardContent>
            </Card>
        </div>
      </Suspense>
  )
}
