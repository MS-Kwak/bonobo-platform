import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContactById } from '@/lib/api/contacts';
import { ContactEditForm } from '@/components/contact/contact-edit-form';

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
    title: `수정 — ${item.title} — 보노보플랫폼`,
  };
}

export default async function ContactEditPage({ params }: Props) {
  const { id } = await params;
  const qsn = Number(id);
  if (isNaN(qsn)) notFound();

  const item = await getContactById(qsn);
  if (!item) notFound();

  return (
    <ContactEditForm
      item={{
        id: String(item.id),
        author: item.author,
        phone: item.phone,
        title: item.title,
        content: item.content,
        date: item.date,
        replied: item.replied,
        reply: item.reply ?? undefined,
        replyDate: item.replyDate ?? undefined,
      }}
    />
  );
}
