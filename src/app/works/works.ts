export interface Work {
  id: number;
  title: string;
  artist: string;
  category: string;
  thumbnail: string;
  publishedAt: string; // YYYY-MM-DD
  hasFull: boolean;
  hasShort: boolean;
  links: {
    youtube?: string;
    tiktok?: string;
  };
}

export const works: Work[] = [
  // 今後公開する実績を追加してください
];