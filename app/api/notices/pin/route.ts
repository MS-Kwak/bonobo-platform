import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { psn, pinned } = await request.json();

    if (!psn || typeof pinned !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 },
      );
    }

    await pool.query(
      'UPDATE PubNotice SET is_pinned = ? WHERE psn = ? AND pkind = 0',
      [pinned ? 1 : 0, psn],
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pin toggle error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 },
    );
  }
}
