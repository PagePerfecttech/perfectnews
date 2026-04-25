import { getDashboardStats } from "@/lib/actions";
import { AdminDashboardClient } from "./dashboard-client";

/**
 * Admin Dashboard — Server Component that fetches real data
 */
export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  return <AdminDashboardClient stats={stats} />;
}
