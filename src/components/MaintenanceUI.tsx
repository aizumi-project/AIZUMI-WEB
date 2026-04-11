"use client";

import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { motion } from "framer-motion";

interface MaintenanceUIProps {
  lang: string;
}

export default function MaintenanceUI({ lang }: Readonly<MaintenanceUIProps>) {
  const isJP = lang === "JP";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0e12] px-6">
      <BackgroundBlobs />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <div className="mb-6">
          <span aria-hidden="true" className="text-sm sm:text-base font-black text-blue-500/20 tracking-[1.5em] block mb-2 ml-[0.75em] transition-colors duration-1000">藍墨</span>
          <h1 className="text-6xl sm:text-8xl font-black italic tracking-tighter leading-none select-none bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-blue-500 to-blue-700 drop-shadow-2xl pl-1 pr-4">
            AIZUMI
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-blue-400/60 text-[10px] sm:text-xs tracking-[1.5em] uppercase font-bold ml-[1.5em]">
            Maintenance Mode
          </p>
          
          <div className="text-gray-400 text-sm sm:text-base font-medium opacity-80 mt-12">
            <p className="text-blue-400 font-bold mb-2 text-lg">
              {isJP ? "現在メンテナンス中です" : "Site is currently under maintenance"}
            </p>
            <p>
              {isJP 
                ? "より良い体験をお届けするため、サイトの調整を行っております。公開まで今しばらくお待ちください。" 
                : "We are fine-tuning the site to deliver a better experience. Please check back soon."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}