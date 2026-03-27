import pool from '@/lib/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

/* ───────── Portfolio CRUD ───────── */

export async function getAdminPortfolioList(
  page = 1,
  pageSize = 20,
  search = '',
  pkind?: number,
) {
  const offset = (page - 1) * pageSize;
  let where = 'WHERE pkind IN (1,2)';
  const params: (string | number)[] = [];

  if (pkind !== undefined) {
    where += ' AND pkind = ?';
    params.push(pkind);
  }
  if (search) {
    where +=
      ' AND (ptitle LIKE ? OR pname LIKE ? OR client_name LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [[countRows], [rows]] = await Promise.all([
    pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM PubNotice ${where}`,
      params,
    ),
    pool.query<RowDataPacket[]>(
      `SELECT psn, pkind, regdate, pname, client_name, ptitle, himage, hit, is_pinned, card_size, tech_stack,
              k01,k02,k03,k04,k05,k06,k07,k08,k09,k10
       FROM PubNotice ${where}
       ORDER BY regdate DESC, psn DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset],
    ),
  ]);

  return {
    items: rows,
    total: (countRows[0] as { total: number }).total,
    page,
    pageSize,
    totalPages: Math.ceil(
      (countRows[0] as { total: number }).total / pageSize,
    ),
  };
}

export async function getAdminPortfolioById(psn: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM PubNotice WHERE psn = ?',
    [psn],
  );
  return rows[0] ?? null;
}

export async function updatePortfolio(
  psn: number,
  data: Record<string, unknown>,
) {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const setClause = fields.map((f) => `${f} = ?`).join(', ');

  await pool.query(
    `UPDATE PubNotice SET ${setClause} WHERE psn = ?`,
    [...values, psn],
  );
}

export async function insertPortfolio(data: Record<string, unknown>) {
  const fields = Object.keys(data);
  const placeholders = fields.map(() => '?').join(', ');
  const values = Object.values(data);

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO PubNotice (${fields.join(', ')}) VALUES (${placeholders})`,
    values,
  );
  return result.insertId;
}

export async function deletePortfolio(psn: number) {
  await pool.query('DELETE FROM PubNotice WHERE psn = ?', [psn]);
}

/* ───────── Notice CRUD ───────── */

export async function getAdminNoticeList(
  page = 1,
  pageSize = 20,
  search = '',
) {
  const offset = (page - 1) * pageSize;
  let where = 'WHERE pkind = 0';
  const params: (string | number)[] = [];

  if (search) {
    where += ' AND (ptitle LIKE ? OR pdesc LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  const [[countRows], [rows]] = await Promise.all([
    pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM PubNotice ${where}`,
      params,
    ),
    pool.query<RowDataPacket[]>(
      `SELECT psn, regdate, pname, ptitle, hit, is_pinned, himage, attack1, attack2, attack3
       FROM PubNotice ${where}
       ORDER BY is_pinned DESC, regdate DESC, psn DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset],
    ),
  ]);

  return {
    items: rows,
    total: (countRows[0] as { total: number }).total,
    page,
    pageSize,
    totalPages: Math.ceil(
      (countRows[0] as { total: number }).total / pageSize,
    ),
  };
}

/* ───────── Contact (WebQA) CRUD ───────── */

export async function getAdminContactList(
  page = 1,
  pageSize = 20,
  search = '',
) {
  const offset = (page - 1) * pageSize;
  let where = 'WHERE 1=1';
  const params: (string | number)[] = [];

  if (search) {
    where += ' AND (title LIKE ? OR writer LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  const [[countRows], [rows]] = await Promise.all([
    pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as total FROM WebQA ${where}`,
      params,
    ),
    pool.query<RowDataPacket[]>(
      `SELECT qsn, regdate, writer, title, tel, vcnt, adate, adesc
       FROM WebQA ${where}
       ORDER BY regdate DESC, qsn DESC
       LIMIT ? OFFSET ?`,
      [...params, pageSize, offset],
    ),
  ]);

  return {
    items: rows,
    total: (countRows[0] as { total: number }).total,
    page,
    pageSize,
    totalPages: Math.ceil(
      (countRows[0] as { total: number }).total / pageSize,
    ),
  };
}

export async function getAdminContactById(qsn: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM WebQA WHERE qsn = ?',
    [qsn],
  );
  return rows[0] ?? null;
}

export async function replyContact(qsn: number, adesc: string) {
  await pool.query(
    'UPDATE WebQA SET adesc = ?, adate = NOW() WHERE qsn = ?',
    [adesc, qsn],
  );
}

export async function deleteContact(qsn: number) {
  await pool.query('DELETE FROM WebQA WHERE qsn = ?', [qsn]);
}

/* ───────── Auth ───────── */

export async function verifyAdmin(
  id: string,
  pw: string,
): Promise<boolean> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM AdminID WHERE admin_id = ? AND admin_pw = ?',
    [id, pw],
  );
  return rows.length > 0;
}

export async function updateAdminPassword(
  id: string,
  oldPw: string,
  newPw: string,
): Promise<boolean> {
  const valid = await verifyAdmin(id, oldPw);
  if (!valid) return false;
  await pool.query(
    'UPDATE AdminID SET admin_pw = ? WHERE admin_id = ?',
    [newPw, id],
  );
  return true;
}
