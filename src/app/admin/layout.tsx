
'use client';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { LayoutDashboard, Stethoscope, HeartPulse, Building, FileText, Users } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/doctors", label: "Dokter", icon: Stethoscope },
    { href: "/admin/services", label: "Layanan", icon: HeartPulse },
    { href: "/admin/facilities", label: "Fasilitas", icon: Building },
    { href: "/admin/articles", label: "Artikel", icon: FileText },
    { href: "/admin/partners", label: "Mitra", icon: Users },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarMenu>
          {menuItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin')}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-4 md:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
