
'use client';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { LayoutDashboard, Stethoscope, HeartPulse, Building, FileText, Users, Briefcase, LogOut } from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { handleLogout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/doctors", label: "Dokter", icon: Stethoscope },
    { href: "/admin/services", label: "Layanan", icon: HeartPulse },
    { href: "/admin/facilities", label: "Fasilitas", icon: Building },
    { href: "/admin/articles", label: "Artikel", icon: FileText },
    { href: "/admin/partners", label: "Mitra", icon: Users },
    { href: "/admin/vacancies", label: "Lowongan", icon: Briefcase },
  ];

  const onLogout = async () => {
    await handleLogout();
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarMenu>
          {menuItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu>
            <SidebarMenuItem>
                <Button variant="ghost" className="w-full justify-start gap-2 p-2" onClick={onLogout}>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </Button>
            </SidebarMenuItem>
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
