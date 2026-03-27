import { cookies } from 'next/headers';
import { verifyAdmin } from '@/lib/api/admin';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  if (!session) return false;

  try {
    const decoded = Buffer.from(session, 'base64').toString();
    const [id, pw] = decoded.split(':');
    if (!id || !pw) return false;
    return verifyAdmin(id, pw);
  } catch {
    return false;
  }
}
