import { notFound } from 'next/navigation';
import { getAdminPortfolioById } from '@/lib/api/admin';
import { PortfolioForm } from '@/components/admin/portfolio-form';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioEditPage({
  params,
}: {
  params: Promise<{ psn: string }>;
}) {
  const { psn } = await params;
  const id = Number(psn);
  if (!id || isNaN(id)) notFound();

  const row = await getAdminPortfolioById(id);
  if (!row) notFound();

  const initialData = {
    psn: row.psn,
    pkind: row.pkind,
    ptitle: row.ptitle ?? '',
    pname: row.pname ?? '(주)보노보플랫폼',
    client_name: row.client_name ?? '',
    regdate: row.regdate
      ? new Date(row.regdate).toISOString().split('T')[0]
      : '',
    pdesc: row.pdesc ?? '',
    tech_stack: row.tech_stack ?? '',
    card_size: row.card_size ?? '',
    himage: row.himage ?? '',
    category: row.category ?? '',
    description: row.short_desc ?? '',
    features: row.features ?? '',
    k01: row.k01 ?? 0,
    k02: row.k02 ?? 0,
    k03: row.k03 ?? 0,
    k04: row.k04 ?? 0,
    k05: row.k05 ?? 0,
    k06: row.k06 ?? 0,
    k07: row.k07 ?? 0,
    k08: row.k08 ?? 0,
    k09: row.k09 ?? 0,
    k10: row.k10 ?? 0,
  };

  return (
    <PortfolioForm
      key={`edit-${row.psn}`}
      initialData={initialData}
    />
  );
}
