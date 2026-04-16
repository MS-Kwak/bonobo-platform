import { Metadata } from 'next';
import { ContactList } from '@/components/contact/contact-list';
import { getContactsPaginated } from '@/lib/api/contacts';

export const metadata: Metadata = {
  title: '견적문의 — (주)보노보플랫폼',
  description: '프로젝트 견적 및 기술 상담을 문의하세요.',
};

export const dynamic = 'force-dynamic';

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const data = await getContactsPaginated(page);

  return <ContactList data={data} />;
}
