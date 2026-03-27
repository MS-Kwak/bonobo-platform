import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  if (filename.includes('..') || filename.includes('/')) {
    return NextResponse.json(
      { error: 'Invalid filename' },
      { status: 400 },
    );
  }

  const ext = path.extname(filename).toLowerCase();
  const mime = MIME_TYPES[ext];
  if (!mime) {
    return NextResponse.json(
      { error: 'Unsupported format' },
      { status: 400 },
    );
  }

  const filePath = path.join(
    process.cwd(),
    '.data',
    'uploads',
    'portfolio',
    filename,
  );

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 },
    );
  }
}
