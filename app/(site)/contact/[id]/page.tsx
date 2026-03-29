import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getContactById,
  getAdjacentContacts,
  incrementContactHit,
} from '@/lib/api/contacts';
import { ContactDetail } from '@/components/contact/contact-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const qsn = Number(id);
  if (isNaN(qsn)) return { title: '문의를 찾을 수 없습니다' };

  const item = await getContactById(qsn);
  if (!item) return { title: '문의를 찾을 수 없습니다' };

  return {
    title: `${item.title} — 견적문의 — 보노보플랫폼`,
    description: item.content.slice(0, 120),
  };
}

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params;
  const qsn = Number(id);
  if (isNaN(qsn)) notFound();

  const item = await getContactById(qsn);
  if (!item) notFound();

  await incrementContactHit(qsn);

  const { prev, next } = await getAdjacentContacts(qsn);

  return <ContactDetail item={item} prev={prev} next={next} />;
}
