"use client";

import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { useLanguage } from "@/context/LanguageContext";
// 修正1: AnimatePresenceを追加
import { AnimatePresence, motion, Variants } from "framer-motion";
import { AlertCircle, ArrowUpDown, CheckCircle2, Download, ExternalLink, FileText, Info, Search, Smartphone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getGoogleDriveDownloadUrl } from "../drive";
import { assets } from "./assets";

export default function AssetsPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [isAgreed, setIsAgreed] = useState(false);

  const filteredAssets = useMemo(() => {
    return assets
      .filter((a) => {
        const searchContent = `${a.title} ${a.description} ${a.category}`.toLowerCase();
        return searchContent.includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [searchQuery, sortBy, assets]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const sortLabel = useMemo(() => {
    const isJP = lang === "JP";
    if (sortBy === "newest") {
      return {
        tooltip: isJP ? "新しい順" : "Newest",
        text: isJP ? "最新" : "Newest"
      };
    }
    return {
      tooltip: isJP ? "古い順" : "Oldest",
      text: isJP ? "最古" : "Oldest"
    };
  }, [lang, sortBy]);

  return (
    <main className="relative min-h-screen bg-[#0a0e12] text-[#e6ebf0] pt-32 pb-20 px-6">
      <BackgroundBlobs />

      <AnimatePresence mode="wait">
        <motion.div 
          key={lang}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* Page Header */}
          <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pl-8 border-l-2 border-blue-500/30">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl sm:text-6xl font-black italic tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-blue-500 to-blue-700 mb-2 uppercase pl-1 pr-4"
              >
                Assets
              </motion.h1>
              <p className="text-blue-400/40 text-[10px] tracking-[1.5em] uppercase font-bold ml-1">
                Creative Resources
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                <input
                  type="search"
                  placeholder={lang === "JP" ? "素材を検索..." : "Search assets..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-11 py-2.5 text-xs font-medium outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all [&::-webkit-search-cancel-button]:appearance-none"
                  aria-label={lang === "JP" ? "素材検索" : "Search assets"}
                />
              {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                    aria-label={lang === "JP" ? "検索をクリア" : "Clear search"}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white hover:border-blue-500/50 transition-all shrink-0"
                title={sortLabel.tooltip}
              >
                <ArrowUpDown size={14} className={`transition-transform duration-300 ${sortBy === "oldest" ? "rotate-180" : ""}`} />
                <span>{sortLabel.text}</span>
              </button>
            </div>
          </header>

          {/* Usage Guidelines */}
          <section className="mb-16 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 shadow-2xl shadow-blue-900/5">
            <div className="flex flex-col lg:flex-row items-start gap-10 mb-10">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3 text-blue-400">
                  <Info size={20} />
                  <h2 className="text-lg font-bold uppercase tracking-widest">
                    {lang === "JP" ? "ご利用前にご確認ください" : "Usage Guidelines"}
                  </h2>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                  {lang === "JP" 
                    ? "本素材は「藍墨プロジェクト」が制作したフリー素材です。商用・個人利用問わず、無料でご使用いただけます。全ファイル、音声・ロゴなしのクリーンな状態です。"
                    : "These are free assets produced by the AIZUMI Project. Free to use for commercial and personal purposes. All files are high-quality material without watermarks."}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-10 shrink-0 w-full lg:w-auto">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                    <CheckCircle2 size={14} /> OK
                  </div>
                  <ul className="text-[11px] text-gray-300 space-y-1">
                    <li>• {lang === "JP" ? "商用利用 / SNS投稿" : "Commercial / Personal use"}</li>
                    <li>• {lang === "JP" ? "色調補正などの加工" : "Color grading & editing"}</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">
                    <AlertCircle size={14} /> NG
                  </div>
                  <ul className="text-[11px] text-gray-300 space-y-1">
                    <li>• {lang === "JP" ? "二次配布 / 自作発言" : "Redistribution / Claiming as own"}</li>
                    <li>• {lang === "JP" ? "公序良俗に反する使用" : "Contrary to public order"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-[10px] text-blue-400/50 font-medium tracking-wider">{lang === "JP" ? "※ 歌詞の権利処理は利用者自身の責任となります。" : "※ Users are responsible for lyric copyright clearance."}</p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
                />
                <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                  {lang === "JP" ? (
                    <>
                      <Link href="/terms" target="_blank" className="text-blue-400 underline underline-offset-8 hover:text-blue-300 mx-1 inline-flex items-center gap-1">利用規約 <ExternalLink size={10} /></Link> に同意してダウンロードする
                    </>
                  ) : (
                    <>
                      Agree to <Link href="/terms" target="_blank" className="text-blue-400 underline underline-offset-8 hover:text-blue-300 mx-1 inline-flex items-center gap-1">Terms of Use <ExternalLink size={10} /></Link> and download
                    </>
                  )}
                </span>
              </label>
            </div>
          </section>

          {/* Assets Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={searchQuery + sortBy}
          >
            {filteredAssets.length > 0 ? filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                variants={itemVariants}
                className="group relative flex flex-col bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md transition-all duration-700 hover:border-blue-500/40 hover:bg-blue-500/2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)]"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={asset.thumbnail} 
                    alt={asset.title} 
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 4}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md text-[9px] font-black px-3 py-1.5 rounded-full text-blue-300 border border-blue-500/20 uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Smartphone size={12} /> {asset.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col grow">
                  <h3 className="text-sm font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2">{asset.title}</h3>
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-6 grow line-clamp-4 min-h-16">{asset.description}</p>
                  
                  <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <FileText size={12} className="text-blue-500/40" /> {asset.fileType}
                      </span>
                      <span className="text-[9px] text-gray-600 font-bold tabular-nums tracking-widest">{asset.fileSize}</span>
                    </div>
                    {/* 楽曲個別のREADMEがある場合にリンクを表示 */}
                    <Link 
                      href={`/assets/works/${asset.id}/README.txt`}
                      target="_blank"
                      className="text-[9px] text-blue-400/60 hover:text-blue-400 transition-colors flex items-center gap-1 underline underline-offset-2"
                    >
                      <Info size={10} /> {lang === "JP" ? "この楽曲の個別規約を確認" : "View song-specific terms"}
                    </Link>
                    <button 
                      disabled={!isAgreed}
                      onClick={() => {
                        if (asset.downloadUrl && asset.downloadUrl !== "#") {
                          window.open(getGoogleDriveDownloadUrl(asset.downloadUrl), "_blank");
                        }
                      }}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                        isAgreed 
                          ? "bg-blue-500 text-black hover:bg-blue-400 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20" 
                          : "bg-white/5 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      <Download size={14} /> {isAgreed ? "Download Now" : "Please Agree to Terms"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
                <p className="text-gray-500">No assets found.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}