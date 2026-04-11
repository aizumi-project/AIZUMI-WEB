"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo({ onClick, className = "text-3xl" }: Readonly<{ onClick?: () => void; className?: string }>) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    // クリック時に渡された関数（メニューを閉じる等）を実行
    if (onClick) onClick();

    // すでにTopページにいる場合は、遷移をキャンセルしてトップへスクロール
    // これにより同一URLへの遷移による「failed」エラーを回避します
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link 
      href="/" 
      onClick={handleClick}
      aria-label="AIZUMI PROJECT Home"
      className={`font-black italic tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-blue-500 to-blue-700 hover:opacity-80 transition-all duration-300 pl-1 pr-2 ${className}`}
    >
      AIZUMI
    </Link>
  );
}
