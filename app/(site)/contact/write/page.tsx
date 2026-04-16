import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: '견적문의 작성 — (주)보노보플랫폼',
  description: '프로젝트 견적 및 기술 상담을 문의하세요.',
};

export default function ContactWritePage() {
  return <ContactForm />;
}
