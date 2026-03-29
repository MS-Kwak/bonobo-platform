import { notFound } from 'next/navigation';
import { getAdminContactById } from '@/lib/api/admin';
import { ContactDetailForm } from '@/components/admin/contact-detail-form';

export const dynamic = 'force-dynamic';

export default async function AdminContactDetailPage({
  params,
}: {
  params: Promise<{ qsn: string }>;
}) {
  const { qsn } = await params;
  const id = Number(qsn);
  if (!id || isNaN(id)) notFound();

  const row = await getAdminContactById(id);
  if (!row) notFound();

  const data = {
    qsn: row.qsn,
    regdate: row.regdate
      ? new Date(row.regdate).toISOString()
      : new Date().toISOString(),
    writer: row.writer ?? '',
    title: row.title ?? '',
    content: row.content ?? '',
    tel: row.tel ?? null,
    adesc: row.adesc ?? null,
    adate: row.adate ? new Date(row.adate).toISOString() : null,
    vcnt: row.vcnt ?? 0,
  };

  return <ContactDetailForm data={data} />;
}
