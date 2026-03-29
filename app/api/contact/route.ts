import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { writer, tel, title, content, password } = body;

  if (!writer || !tel || !title || !content || !password) {
    return NextResponse.json(
      { error: '필수 항목을 모두 입력해주세요.' },
      { status: 400 },
    );
  }

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO WebQA (regdate, writer, tel, title, content, password, vcnt)
     VALUES (NOW(), ?, ?, ?, ?, ?, 0)`,
    [writer, tel, title, content, password],
  );

  return NextResponse.json({ id: result.insertId });
}

export async function PUT(req: NextRequest) {
  const { qsn, writer, tel, title, content } = await req.json();
  if (!qsn || !writer || !title || !content) {
    return NextResponse.json(
      { error: '필수 항목 누락' },
      { status: 400 },
    );
  }

  await pool.query(
    'UPDATE WebQA SET writer = ?, tel = ?, title = ?, content = ? WHERE qsn = ?',
    [writer, tel ?? '', title, content, qsn],
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { qsn, password } = await req.json();
  if (!qsn || !password) {
    return NextResponse.json(
      { error: '필수 항목 누락' },
      { status: 400 },
    );
  }

  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT password FROM WebQA WHERE qsn = ?',
    [qsn],
  );
  if (!rows[0] || rows[0].password !== password) {
    return NextResponse.json(
      { error: '비밀번호가 일치하지 않습니다' },
      { status: 403 },
    );
  }

  await pool.query('DELETE FROM WebQA WHERE qsn = ?', [qsn]);
  return NextResponse.json({ ok: true });
}
