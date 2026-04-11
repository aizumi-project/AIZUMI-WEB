"use client";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MaintenanceUI from "./MaintenanceUI";

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

const NAV_ITEMS = [
  { label: "WORKS", href: "/works" },
  { label: "INSIGHTS", href: "/insights" },
  { label: "ASSETS", href: "/assets" },
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // モバイルメニュー開閉時のスクロールロック
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      {isMaintenanceMode ? (
        <MaintenanceUI lang={lang} />
      ) : (
        <>
          {/* Glassmorphism Header */}
          <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0e12]/80 border-b border-white/5">
            <nav className="max-w-7xl mx-auto px-5 sm:px-12 py-4 sm:py-5 flex items-center justify-between">
              {/* Logo */}
              <Logo onClick={() => setIsMenuOpen(false)} />

              {/* Navigation Links */}
              <ul className="hidden sm:flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 hover:text-blue-400 transition-all duration-500 hover:tracking-[0.5em]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <LanguageSwitcher />

              {/* Mobile Menu Icon */}
              <button 
                className="sm:hidden p-2 -mr-2"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} className="text-gray-400" />
              </button>
            </nav>
          </header>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-100 bg-[#0a0e12]/98 backdrop-blur-2xl flex flex-col p-8 sm:hidden"
              >
                <div className="flex items-center justify-between mb-20">
                  <Logo onClick={() => setIsMenuOpen(false)} />
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>

                <ul className="flex flex-col gap-12">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li 
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-5xl font-black italic tracking-tighter text-white hover:text-blue-400 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto pt-10 border-t border-white/5">
                   <p className="text-[10px] font-bold uppercase tracking-[1.5em] text-blue-500/40 ml-[0.75em]">AIZUMI PROJECT</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="grow">{children}</div>

          {/* Footer */}
          <footer className="border-t border-white/5 bg-[#0a0e12] py-20">
            <div className="max-w-7xl mx-auto px-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 mb-16">
                {/* Brand */}
                <div className="space-y-1">
                  <Logo className="text-2xl" />
                  <p className="text-gray-500 text-xs tracking-widest uppercase">Project</p>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">{lang === "JP" ? "メニュー" : "Navigation"}</h4>
                  <ul className="space-y-2">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/terms" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                        {lang === "JP" ? "利用規約" : "TERMS OF USE"}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
                    {lang === "JP" ? "お問い合わせ" : "CONTACT"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    <a href="mailto:aizumi.project@gmail.com" className="hover:text-blue-400 transition-all flex items-center gap-2 group">
                      <Mail size={14} className="text-blue-500/40 group-hover:text-blue-400" /> aizumi.project@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}