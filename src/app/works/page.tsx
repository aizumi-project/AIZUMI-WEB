"use client";

import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ArrowUpDown, Play, Share2, Smartphone, X, Video as Youtube } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Work, works } from "./works";

// YouTube IDを抽出するヘルパー
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = regExp.exec(url);
  return (match?.[2]?.length === 11) ? match[2] : null;
};

export default function WorksPage() {
  const { lang } = useLanguage();
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // カテゴリ一覧の抽出
  const categories = ["All", ...Array.from(new Set(works.map(w => w.category)))];

  // フィルタリングとソートのロジック
  const filteredWorks = useMemo(() => {
    return works
      .filter(w => filter === "All" || w.category === filter)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [filter, sortBy, works]);

  // シェア機能
  const handleShare = (e: React.MouseEvent, work: Work) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: work.title,
        text: `Check out ${work.title} by ${work.artist} on AIZUMI PROJECT`,
        url: work.links.youtube || work.links.tiktok || globalThis.location.href,
      });
    } else {
      alert("お使いのブラウザはシェア機能に対応していません。URLをコピーしてください。");
    }
  };

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

  // ソート順に応じたツールチップとテキストの定義
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
      {/* Background blobs (TopPageと共通) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang} // 言語が変わるたびに再マウント
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* Page Header */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 pl-8 border-l-2 border-blue-500/30">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl sm:text-6xl font-black italic tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-blue-500 to-blue-700 mb-2 pl-1 pr-4"
              >
                WORKS
              </motion.h1>
              <p className="text-blue-400/40 text-[10px] tracking-[1.5em] uppercase font-bold ml-1">
                Creative Archives
              </p>
            </div>

            {/* Filters & Sorting */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      filter === cat ? "bg-blue-500 text-black" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                  
                ))}
              </div>
              <button
                onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:border-blue-500/50 transition-all"
                title={sortLabel.tooltip}
              >
                <ArrowUpDown size={14} className={`transition-transform duration-300 ${sortBy === "oldest" ? "rotate-180" : ""}`} />
                <span>{sortLabel.text}</span>
              </button>
            </div>
          </header>

          {/* Works Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter + sortBy} // リスト更新時にアニメーションを再トリガー
          >
            {filteredWorks.length > 0 ? filteredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/5 backdrop-blur-md transition-all duration-700 hover:border-blue-500/40 hover:bg-blue-500/2 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] cursor-pointer"
                onClick={() => setSelectedWork(work)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0e12] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-black shadow-lg">
                      <Play fill="currentColor" size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">{work.category}</p>
                    <button 
                      onClick={(e) => handleShare(e, work)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <div className="flex gap-2">
                      {work.hasFull && (
                        <span className="flex items-center gap-1 text-[9px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                          <Youtube size={10} /> Full
                        </span>
                      )}
                      {work.hasShort && (
                        <span className="flex items-center gap-1 text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                          <Smartphone size={10} /> Short
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-1">{work.title}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] text-gray-500 font-medium">by {work.artist}</span>
                    <span className="text-[10px] text-gray-600 tabular-nums">{work.publishedAt}</span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
                <p className="text-gray-500">No works found.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8 bg-[#0a0e12]/95 backdrop-blur-xl"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-black rounded-4xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="aspect-video bg-black">
                {selectedWork.links.youtube && getYouTubeId(selectedWork.links.youtube) ? (
                  <iframe
                    className="w-full h-full"
                    title={`${selectedWork.title} video player`}
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedWork.links.youtube)}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {lang === "JP" 
                      ? "TikTok 動画は直接埋め込みにSDKが必要なため、外部リンクを開いてください。" 
                      : "TikTok videos require an SDK for direct embedding. Please open the external link."}
                  </div>
                )}
              </div>
              
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedWork.title}</h2>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>{selectedWork.artist}</span>
                  <span>•</span>
                  <span>{selectedWork.publishedAt}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}