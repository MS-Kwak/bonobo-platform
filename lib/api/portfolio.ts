import pool from '@/lib/db';
import type { RowDataPacket } from 'mysql2';
import type {
  PortfolioItem,
  PortfolioCategory,
  CardSize,
} from '@/data/portfolio';

interface PortfolioRow extends RowDataPacket {
  psn: number;
  pkind: number;
  regdate: Date;
  pname: string;
  client_name: string | null;
  ptitle: string;
  pdesc: string;
  attack1: string | null;
  attack2: string | null;
  attack3: string | null;
  hit: number;
  himage: string | null;
  card_size: string | null;
  tech_stack: string | null;
  k01: number;
  k02: number;
  k03: number;
  k04: number;
  k05: number;
  k06: number;
  k07: number;
  k08: number;
  k09: number;
  k10: number;
}

const IMAGE_BASE_URL = 'https://bonobo.co.kr/admin/files/';

const PORTFOLIO_COLUMNS =
  'psn, pkind, regdate, pname, client_name, ptitle, pdesc, attack1, attack2, attack3, hit, himage, card_size, tech_stack, k01, k02, k03, k04, k05, k06, k07, k08, k09, k10';

const CATEGORY_K_MAP: Record<
  Exclude<PortfolioCategory, 'all'>,
  (keyof PortfolioRow)[]
> = {
  web: ['k05', 'k06', 'k07'],
  app: ['k08'],
  program: ['k01', 'k09', 'k10'],
  ai: ['k02', 'k03', 'k04'],
};

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
  'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 50%, #f5f7fa 100%)',
];

const CONTENT_MARKERS = [
  '[주요기능]',
  '[주요 기능]',
  '[주요기능 ]',
  '[플랫폼]',
  '[플렛폼]',
];

function getCategories(
  row: PortfolioRow,
): Exclude<PortfolioCategory, 'all'>[] {
  const cats: Exclude<PortfolioCategory, 'all'>[] = [];
  for (const [cat, keys] of Object.entries(CATEGORY_K_MAP) as [
    Exclude<PortfolioCategory, 'all'>,
    (keyof PortfolioRow)[],
  ][]) {
    if (keys.some((k) => row[k] === 1)) {
      cats.push(cat);
    }
  }
  return cats;
}

function getPrimaryCategory(
  row: PortfolioRow,
): Exclude<PortfolioCategory, 'all'> {
  const cats = getCategories(row);

  if (cats.includes('ai')) return 'ai';
  if (cats.includes('app')) return 'app';

  if (cats.length > 0) return cats[0];
  return row.pkind === 2 ? 'program' : 'web';
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function removeLeadingQuote(text: string): string {
  return text
    .replace(
      /^["""\u201C\u201D][^"""\u201C\u201D]*["""\u201C\u201D]\s*/,
      '',
    )
    .trim();
}

function extractDescription(html: string): string {
  let text = stripHtml(html);

  for (const marker of CONTENT_MARKERS) {
    const idx = text.indexOf(marker);
    if (idx !== -1) text = text.slice(0, idx);
  }

  text = removeLeadingQuote(text);

  if (text.length <= 200) return text;

  const cut = text.slice(0, 200);
  const lastPeriod = cut.lastIndexOf('.');
  if (lastPeriod > 80) return cut.slice(0, lastPeriod + 1);
  return cut + '…';
}

function resolveHimage(himage: string | null): string | null {
  if (!himage || !himage.trim()) return null;

  if (himage.startsWith('http')) {
    const slashCount = (himage.match(/\//g) || []).length;
    if (slashCount < 3) return null;
    return himage;
  }

  return `${IMAGE_BASE_URL}${himage}`;
}

function extractFirstImageSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function resolveImagePaths(html: string): string {
  return html
    .replace(/src="\/admin\/files\//g, `src="${IMAGE_BASE_URL}`)
    .replace(/src="admin\/files\//g, `src="${IMAGE_BASE_URL}`);
}

function toPortfolioItem(
  row: PortfolioRow,
  index: number,
): PortfolioItem {
  const attachments = [row.attack1, row.attack2, row.attack3].filter(
    (a): a is string => !!a,
  );
  const allCats = getCategories(row);
  const primaryCat = getPrimaryCategory(row);

  const tags = row.tech_stack
    ? row.tech_stack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  let thumbnail = resolveHimage(row.himage);

  if (!thumbnail) {
    const resolvedHtml = resolveImagePaths(row.pdesc);
    const firstImg = extractFirstImageSrc(resolvedHtml);
    if (firstImg) thumbnail = firstImg;
  }

  const gradient = GRADIENTS[row.psn % GRADIENTS.length];

  let size = (row.card_size as CardSize) || 'default';
  if (size === 'default') {
    if (index === 0) size = 'large';
    else if (index % 7 === 3) size = 'wide';
    else if (index % 7 === 5 && thumbnail) size = 'tall';
  }

  const description = extractDescription(row.pdesc);

  return {
    id: row.psn,
    title: row.ptitle,
    description,
    category: primaryCat,
    categories: allCats.length > 0 ? allCats : [primaryCat],
    client: row.client_name || row.pname,
    year: new Date(row.regdate).getFullYear(),
    tags,
    thumbnail,
    gradient,
    content: resolveImagePaths(row.pdesc),
    size,
    views: row.hit ?? 0,
    attachments,
  };
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const [rows] = await pool.query<PortfolioRow[]>(
    `SELECT ${PORTFOLIO_COLUMNS} FROM PubNotice WHERE pkind IN (1, 2) ORDER BY regdate DESC, psn DESC`,
  );
  return rows.map((row, i) => toPortfolioItem(row, i));
}

export async function getPortfolioById(
  psn: number,
): Promise<PortfolioItem | null> {
  const [rows] = await pool.query<PortfolioRow[]>(
    `SELECT ${PORTFOLIO_COLUMNS} FROM PubNotice WHERE psn = ? AND pkind IN (1, 2)`,
    [psn],
  );
  return rows[0] ? toPortfolioItem(rows[0], 0) : null;
}

export async function getRelatedPortfolioItems(
  excludePsn: number,
  category: PortfolioCategory,
  limit = 3,
): Promise<PortfolioItem[]> {
  const items = await getPortfolioItems();
  const sameCategory = items.filter(
    (p) => p.id !== excludePsn && p.category === category,
  );
  const rest = items.filter(
    (p) => p.id !== excludePsn && p.category !== category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategoryCounts(
  items: PortfolioItem[],
): Record<PortfolioCategory, number> {
  const counts: Record<PortfolioCategory, number> = {
    all: items.length,
    web: 0,
    app: 0,
    program: 0,
    ai: 0,
  };

  for (const item of items) {
    const cat = item.category;
    if (cat !== 'all') counts[cat]++;
  }

  return counts;
}
