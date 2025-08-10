
'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut, type User } from 'firebase/auth';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { LayoutDashboard, Stethoscope, HeartPulse, Building, FileText, Users, Briefcase, LogOut, Loader } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

// 1. Create Auth Context
const AuthContext = createContext<{ user: User | null }>({ user: null });
export const useAuth = () => useContext(AuthContext);

// 2. Auth Provider Component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
        <p className="ml-4 text-lg">Memverifikasi sesi...</p>
      </div>
    );
  }

  if (!user) {
    return null; // The redirect is handled in the effect
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}


// 3. Admin Layout Component
export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
    await signOut(auth);
    router.push('/login');
  };

  const currentPage = menuItems.find(item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))?.label || 'Dashboard';

  return (
    <AuthProvider>
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
          <header className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden"/>
              <h1 className="text-xl font-bold">{currentPage}</h1>
            </div>
          </header>
          <main className="p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
