import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminShell } from '@/components/admin/admin-shell';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect('/admin/login');

  return <AdminShell>{children}</AdminShell>;
}
