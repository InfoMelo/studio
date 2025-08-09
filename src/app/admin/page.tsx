
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Selamat Datang di Dashboard Admin</h2>
        <Card>
            <CardHeader>
                <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Kelola konten website melalui menu di samping.</p>
            </CardContent>
        </Card>
    </div>
  )
}
