import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contactItems } from '@/data/contacts';
import { ContactDetail } from '@/components/contact/contact-detail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const item = contactItems.find((c) => c.id === id);
  if (!item) return { title: '문의를 찾을 수 없습니다' };
  return {
    title: `${item.title} — 견적문의 — 보노보플랫폼`,
    description: item.content.slice(0, 120),
  };
}

export function generateStaticParams() {
  return contactItems.map((c) => ({ id: c.id }));
}

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params;
  const idx = contactItems.findIndex((c) => c.id === id);
  if (idx === -1) notFound();

  const item = contactItems[idx];
  const prev = idx > 0 ? contactItems[idx - 1] : null;
  const next =
    idx < contactItems.length - 1 ? contactItems[idx + 1] : null;

  return <ContactDetail item={item} prev={prev} next={next} />;
}
