
import { getAdminDashboardStats } from "@/app/admin/actions";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <DashboardClient stats={stats} />
    </div>
  )
}
