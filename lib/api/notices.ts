import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  pinned: boolean;
  attachments: string[];
  image: string | null;
}

interface NoticeRow extends RowDataPacket {
  psn: number;
  pkind: number;
  regdate: Date;
  pname: string;
  ptitle: string;
  pdesc: string;
  attack1: string | null;
  attack2: string | null;
  attack3: string | null;
  hit: number;
  himage: string | null;
  is_pinned: number;
}

function toNoticeItem(row: NoticeRow): NoticeItem {
  const attachments = [row.attack1, row.attack2, row.attack3].filter(
    (a): a is string => !!a,
  );

  return {
    id: row.psn,
    title: row.ptitle,
    content: row.pdesc,
    author: row.pname,
    date: new Date(row.regdate).toISOString().split('T')[0],
    views: row.hit ?? 0,
    pinned: row.is_pinned === 1,
    attachments,
    image: row.himage || null,
  };
}

const NOTICE_COLUMNS =
  'psn, pkind, regdate, pname, ptitle, pdesc, attack1, attack2, attack3, hit, himage, is_pinned';

export const NOTICE_PAGE_SIZE = 10;

export interface NoticeListResult {
  items: NoticeItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function getNoticesPaginated(
  page = 1,
  pageSize = NOTICE_PAGE_SIZE,
): Promise<NoticeListResult> {
  const offset = (page - 1) * pageSize;

  const [[countRows], [rows]] = await Promise.all([
    pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM PubNotice WHERE pkind = 0',
    ),
    pool.query<NoticeRow[]>(
      `SELECT ${NOTICE_COLUMNS} FROM PubNotice WHERE pkind = 0 ORDER BY is_pinned DESC, regdate DESC, psn DESC LIMIT ? OFFSET ?`,
      [pageSize, offset],
    ),
  ]);

  const totalCount = countRows[0].total as number;

  return {
    items: rows.map(toNoticeItem),
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export async function getNoticeById(
  psn: number,
): Promise<NoticeItem | null> {
  const [rows] = await pool.query<NoticeRow[]>(
    `SELECT ${NOTICE_COLUMNS} FROM PubNotice WHERE psn = ? AND pkind = 0`,
    [psn],
  );
  return rows[0] ? toNoticeItem(rows[0]) : null;
}

export async function getNoticeCount(): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT COUNT(*) as total FROM PubNotice WHERE pkind = 0',
  );
  return rows[0].total as number;
}

export async function getAdjacentNotices(
  psn: number,
): Promise<{ prev: NoticeItem | null; next: NoticeItem | null }> {
  const [prevRows] = await pool.query<NoticeRow[]>(
    `SELECT ${NOTICE_COLUMNS} FROM PubNotice
     WHERE pkind = 0 AND (regdate < (SELECT regdate FROM PubNotice WHERE psn = ?) OR (regdate = (SELECT regdate FROM PubNotice WHERE psn = ?) AND psn < ?))
     ORDER BY regdate DESC, psn DESC LIMIT 1`,
    [psn, psn, psn],
  );

  const [nextRows] = await pool.query<NoticeRow[]>(
    `SELECT ${NOTICE_COLUMNS} FROM PubNotice
     WHERE pkind = 0 AND (regdate > (SELECT regdate FROM PubNotice WHERE psn = ?) OR (regdate = (SELECT regdate FROM PubNotice WHERE psn = ?) AND psn > ?))
     ORDER BY regdate ASC, psn ASC LIMIT 1`,
    [psn, psn, psn],
  );

  return {
    prev: prevRows[0] ? toNoticeItem(prevRows[0]) : null,
    next: nextRows[0] ? toNoticeItem(nextRows[0]) : null,
  };
}
