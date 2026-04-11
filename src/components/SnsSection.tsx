"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { ArrowUpRight, Music, X, Video as Youtube } from "lucide-react";

const SNS_DATA = [
  {
    id: "youtube",
    name: "YouTube",
    handle: "@aizumi_project",
    url: "https://www.youtube.com/@aizumi_project",
    color: "group-hover:text-[#FF0000]",
    icon: Youtube,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    handle: "@aizumi_project",
    url: "https://x.com/aizumi_project",
    color: "group-hover:text-blue-400",
    icon: X,
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@aizumi_project",
    url: "https://www.tiktok.com/@aizumi_project",
    color: "group-hover:text-[#00f2ea]",
    icon: Music,
  },
];

export default function SnsSection() {
  const { lang } = useLanguage();

  return (
    <section className="mt-32 sm:mt-40 border-t border-white/5 pt-16 sm:pt-24">
      <div className="text-left mb-12 sm:mb-16 pl-6 sm:pl-8 border-l-2 border-blue-500/30">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
          Follow Us
        </h2>
        <p className="text-blue-400/40 text-[10px] tracking-[1.5em] uppercase font-bold mt-2 ml-1">
          {lang === "JP" ? "公式SNS" : "Official SNS"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        {SNS_DATA.map((sns) => (
          <motion.a
            key={sns.id}
            href={sns.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-5 sm:gap-6 bg-linear-to-b from-white/10 to-transparent border border-white/5 rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-md transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)]"
          >
            <div className="relative p-4 sm:p-5 rounded-2xl bg-white/5 text-gray-400 transition-all duration-500 group-hover:bg-blue-500/10 group-hover:scale-110">
              <sns.icon size={24} className={`sm:w-8 sm:h-8 transition-colors duration-500 ${sns.color}`} />
            </div>
            
            <div className="text-left flex-1">
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">
                {sns.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium tracking-tight">
                {sns.handle}
              </p>
            </div>

            {/* External Link Icon */}
            <div className="absolute top-8 right-8 text-gray-600 group-hover:text-blue-400 transition-colors duration-500">
              <ArrowUpRight size={16} />
            </div>

            {/* Decorator */}
            <motion.div 
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full blur-sm"
              initial={false}
              animate={{ width: "10%" }}
              whileHover={{ width: "40%" }}
            />
            
            <motion.div 
              className="absolute top-6 right-8 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}