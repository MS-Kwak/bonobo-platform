import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface ContactListItem {
  id: number;
  title: string;
  author: string;
  date: string;
  replied: boolean;
}

export interface ContactDetailItem {
  id: number;
  title: string;
  author: string;
  phone: string;
  date: string;
  content: string;
  replied: boolean;
  reply: string | null;
  replyDate: string | null;
}

interface ContactRow extends RowDataPacket {
  qsn: number;
  regdate: Date;
  writer: string;
  title: string;
  content: string;
  tel: string | null;
  password: string;
  adate: Date | null;
  adesc: string | null;
  vcnt: number;
}

export const CONTACT_PAGE_SIZE = 10;

export interface ContactListResult {
  items: ContactListItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  repliedCount: number;
  pendingCount: number;
}

export async function getContactsPaginated(
  page = 1,
  pageSize = CONTACT_PAGE_SIZE,
): Promise<ContactListResult> {
  const offset = (page - 1) * pageSize;

  const [[countRows], [repliedRows], [rows]] = await Promise.all([
    pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM WebQA',
    ),
    pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as cnt FROM WebQA WHERE adesc IS NOT NULL AND adesc != ""',
    ),
    pool.query<ContactRow[]>(
      `SELECT qsn, regdate, writer, title, adesc
       FROM WebQA
       ORDER BY regdate DESC, qsn DESC
       LIMIT ? OFFSET ?`,
      [pageSize, offset],
    ),
  ]);

  const totalCount = countRows[0].total as number;
  const repliedCount = repliedRows[0].cnt as number;

  return {
    items: rows.map((row) => ({
      id: row.qsn,
      title: row.title,
      author: row.writer,
      date: new Date(row.regdate).toISOString().split('T')[0],
      replied: !!row.adesc,
    })),
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    repliedCount,
    pendingCount: totalCount - repliedCount,
  };
}

function maskPhone(tel: string): string {
  const parts = tel.split('-');
  if (parts.length === 3) {
    return `${parts[0]}-****-${parts[2].slice(-4)}`;
  }
  if (tel.length > 7) {
    return tel.slice(0, 3) + '-****-' + tel.slice(-4);
  }
  return tel;
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function getContactById(
  qsn: number,
): Promise<ContactDetailItem | null> {
  const [rows] = await pool.query<ContactRow[]>(
    'SELECT * FROM WebQA WHERE qsn = ?',
    [qsn],
  );
  const row = rows[0];
  if (!row) return null;

  const rawContent = row.content ?? '';
  const isHtml = rawContent.includes('<') && rawContent.includes('>');

  return {
    id: row.qsn,
    title: row.title,
    author: row.writer,
    phone: row.tel ? maskPhone(row.tel) : '',
    date: new Date(row.regdate).toISOString().split('T')[0],
    content: isHtml ? stripHtml(rawContent) : rawContent,
    replied: !!row.adesc,
    reply: row.adesc || null,
    replyDate: row.adate
      ? new Date(row.adate).toISOString().split('T')[0]
      : null,
  };
}

export async function getAdjacentContacts(qsn: number): Promise<{
  prev: ContactListItem | null;
  next: ContactListItem | null;
}> {
  const [prevRows] = await pool.query<ContactRow[]>(
    `SELECT qsn, regdate, writer, title, adesc FROM WebQA
     WHERE regdate < (SELECT regdate FROM WebQA WHERE qsn = ?)
        OR (regdate = (SELECT regdate FROM WebQA WHERE qsn = ?) AND qsn < ?)
     ORDER BY regdate DESC, qsn DESC LIMIT 1`,
    [qsn, qsn, qsn],
  );

  const [nextRows] = await pool.query<ContactRow[]>(
    `SELECT qsn, regdate, writer, title, adesc FROM WebQA
     WHERE regdate > (SELECT regdate FROM WebQA WHERE qsn = ?)
        OR (regdate = (SELECT regdate FROM WebQA WHERE qsn = ?) AND qsn > ?)
     ORDER BY regdate ASC, qsn ASC LIMIT 1`,
    [qsn, qsn, qsn],
  );

  function toListItem(row: ContactRow): ContactListItem {
    return {
      id: row.qsn,
      title: row.title,
      author: row.writer,
      date: new Date(row.regdate).toISOString().split('T')[0],
      replied: !!row.adesc,
    };
  }

  return {
    prev: prevRows[0] ? toListItem(prevRows[0]) : null,
    next: nextRows[0] ? toListItem(nextRows[0]) : null,
  };
}

export async function verifyContactPassword(
  qsn: number,
  password: string,
): Promise<boolean> {
  const [rows] = await pool.query<ContactRow[]>(
    'SELECT password FROM WebQA WHERE qsn = ?',
    [qsn],
  );
  if (!rows[0]) return false;
  return rows[0].password === password;
}

export async function incrementContactHit(
  qsn: number,
): Promise<void> {
  await pool.query('UPDATE WebQA SET vcnt = vcnt + 1 WHERE qsn = ?', [
    qsn,
  ]);
}
