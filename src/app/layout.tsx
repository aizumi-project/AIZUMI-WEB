import ClientLayout from "@/components/ClientLayout";
import { LanguageProvider } from "@/context/LanguageContext";
import { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AIZUMI PROJECT | 藍墨プロジェクト",
    template: "%s | AIZUMI PROJECT",
  },
  description: "「鮮やかな藍の彩りと静謐な墨の落ち着きを」 1名2声（AOI・KUROKO）によるクリエイティブ・プロジェクト。歌唱、映像、素材配布。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aizumi-web.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "./",
    siteName: "AIZUMI PROJECT",
    images: [
      {
        url: "/og-image.png", // public/og-image.png を配置してください
        width: 1200,
        height: 630,
        alt: "AIZUMI PROJECT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aizumi_project", // Xのアカウント名
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0e12] text-[#e6ebf0] selection:bg-blue-600/30 selection:text-blue-100">
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}