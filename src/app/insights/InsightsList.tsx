"use client";

import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image"; // next/image をインポート
import Link from "next/link";
import { useMemo, useState } from "react";
import { Insight } from "./insights";

interface InsightsListProps {
  initialInsights: Insight[];
}

export default function InsightsList({ initialInsights }: Readonly<InsightsListProps>) {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(initialInsights.map(i => i.category)))];
  }, [initialInsights]);

  const filteredInsights = useMemo(() => {
    return initialInsights.filter(i => filter === "All" || i.category === filter);
  }, [filter, initialInsights]);

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
                Insights
              </motion.h1>
              <p className="text-blue-400/40 text-[10px] tracking-[1.5em] uppercase font-bold ml-1">
                Process & Knowledge
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 bg-white/5 p-1 rounded-full border border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    filter === cat ? "bg-blue-500 text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          {/* Insights List */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter}
          >
            {filteredInsights.length > 0 ? (
              filteredInsights.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group relative flex flex-col sm:flex-row gap-6 bg-white/5 border border-white/5 rounded-[2.5rem] p-6 backdrop-blur-md transition-all duration-700 hover:border-blue-500/40 hover:bg-blue-500/2 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]"
                >
                  {/* 全体をクリック可能にするオーバーレイリンク */}
                  <Link href={`/insights/${item.id}`} className="absolute inset-0 z-10" aria-label={item.title} />
                  
                  <div className="w-full sm:w-48 h-48 shrink-0 rounded-3xl overflow-hidden relative"> {/* next/image を使うため relative を追加 */}
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index < 2}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{item.category}</span>
                        <span className="text-gray-600">|</span>
                        <div className="flex items-center gap-1 text-gray-500 text-[10px]">
                          <Clock size={12} />
                          {item.readingTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">{item.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2 font-light leading-relaxed">{item.description}</p>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-[10px] text-gray-600 font-medium tabular-nums uppercase">{item.date}</span>
                      <Link href={`/insights/${item.id}`} className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/btn">
                        READ MORE <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
                <p className="text-gray-500">No articles found.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}