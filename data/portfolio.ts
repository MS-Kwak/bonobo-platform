export type PortfolioCategory =
  | 'all'
  | 'web'
  | 'app'
  | 'program'
  | 'ai';
export type CardSize = 'large' | 'wide' | 'tall' | 'default';

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  shortDesc: string | null;
  featureList: string[];
  category: PortfolioCategory;
  categories: PortfolioCategory[];
  client: string;
  year: number;
  tags: string[];
  kFlags: string[];
  thumbnail: string | null;
  gradient: string;
  content: string;
  size: CardSize;
  views: number;
  attachments: string[];
}

export const categories: { id: PortfolioCategory; label: string }[] =
  [
    { id: 'all', label: '전체' },
    { id: 'web', label: 'Web / Mobile' },
    { id: 'app', label: 'App' },
    { id: 'program', label: 'Program' },
    { id: 'ai', label: 'AI / Data' },
  ];
