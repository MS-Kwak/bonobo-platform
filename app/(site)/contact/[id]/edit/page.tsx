import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contactItems } from '@/data/contacts';
import { ContactEditForm } from '@/components/contact/contact-edit-form';

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
    title: `수정 — ${item.title} — 보노보플랫폼`,
  };
}

export function generateStaticParams() {
  return contactItems.map((c) => ({ id: c.id }));
}

export default async function ContactEditPage({ params }: Props) {
  const { id } = await params;
  const item = contactItems.find((c) => c.id === id);
  if (!item) notFound();

  return <ContactEditForm item={item} />;
}
