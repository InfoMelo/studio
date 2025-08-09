
'use client';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { LayoutDashboard, Stethoscope, HeartPulse, Building, FileText, Users, Briefcase, LogOut } from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../login/actions";

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

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <h1 className="text-xl font-bold p-2 group-data-[collapsible=icon]:hidden">Admin</h1>
        </SidebarHeader>
        <SidebarMenu className="flex-1">
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
         <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </header>
        <main className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4">Selamat Datang di Dashboard Admin</h2>
            <p>Kelola konten website melalui menu di samping.</p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
