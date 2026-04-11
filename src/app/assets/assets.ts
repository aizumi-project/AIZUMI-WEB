export interface Asset {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileSize: string;
  description: string;
  thumbnail: string;
  downloadUrl: string;
  createdAt: string; // YYYY-MM-DD
  isPremium?: boolean;
}

export const assets: Asset[] = [
  {
    id: "01_calc",
    title: "Calc. - Lyric Video Asset",
    category: "Lyric Video",
    fileType: "MOV / MP4",
    fileSize: "346 MB",
    description: "ジミーサムP様の楽曲『Calc.』のリリックビデオ用素材セット。透過歌詞素材、背景素材、合成済みプレビューの3種類を同梱しています。",
    thumbnail: "/assets/works/01_calc/thumbnail.webp",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1oCAaIYv_F8mbLXeg4t46Vkg1LTuE38rT",
    createdAt: "2026-04-06",
  },
];