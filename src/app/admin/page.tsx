
import { getAdminDashboardStats } from "@/app/admin/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, HeartPulse, FileText, Users, BarChart2 } from "lucide-react";
import Link from 'next/link';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Distribusi Dokter per Spesialisasi</CardTitle>
        <CardDescription>Menampilkan jumlah dokter untuk setiap spesialisasi.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
         <ChartContainer config={{}} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8}
                height={50}
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

function DashboardContent() {
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

export default async function AdminDashboard() {
  const { totalDoctors, totalServices, totalArticles, totalPartners, doctorSpecialtyDistribution } = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <Suspense fallback={<DashboardContent />}>
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
    </div>
  )
}
