import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { getAllInsights, getInsightData } from "@/lib/markdown";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

// SEO用のメタデータを動的に生成
export async function generateMetadata({ params }: Readonly<Props>): Promise<Metadata> {
  const { id } = await params;
  const postData = await getInsightData(id);
  if (!postData) return { title: "Post Not Found | AIZUMI" };

  return { 
    title: `${postData.title} | AIZUMI PROJECT INSIGHTS`,
    description: postData.description,
    openGraph: {
      title: postData.title,
      description: postData.description,
      type: "article",
      images: [postData.thumbnail],
    },
  };
}

export async function generateStaticParams() {
  const insights = await getAllInsights();
  return insights.map((insight) => {
    return {
      // IDを確実に文字列として返す
      id: String(insight.id).trim()
    };
  });
}

export default async function InsightPost({ params }: Readonly<Props>) {
  const { id } = await params;
  const postData = await getInsightData(id);

  if (!postData) notFound();

  return (
    <main className="relative min-h-screen bg-[#0a0e12] pt-32 pb-20 px-6 overflow-hidden">
      <BackgroundBlobs />

      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/insights" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors mb-12 text-[10px] font-bold uppercase tracking-widest group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <header className="mb-12 border-l-2 border-blue-500/30 pl-8">
          <div className="flex items-center gap-4 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <span className="px-2 py-1 bg-blue-500/10 rounded border border-blue-500/20">{postData.category}</span>
            <span className="text-gray-700">/</span>
            <div className="flex items-center gap-1.5"><Clock size={12} /> {postData.readingTime}</div>
            <div className="flex items-center gap-1.5"><Calendar size={12} /> {postData.date}</div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black italic tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-blue-500 to-blue-700 leading-[1.2] mb-8 pl-1 pr-4">
            {postData.title}
          </h1>
        </header>

        {/* Thumbnail Section */}
        {postData.thumbnail && (
          <div className="relative aspect-video mb-16 rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-blue-500/5"> {/* Tailwind Typography の影響を受けないように div でラップ */}
            <Image
              src={postData.thumbnail} 
              alt={postData.title} 
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        )}

        {/* Optimized Markdown Content */}
        <div 
          className="insight-content [&_strong]:text-blue-400 [&_strong]:font-bold [&_code]:text-blue-300 [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_a]:text-blue-400 [&_a]:underline hover:[&_a]:text-blue-300 [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_p]:mb-6 [&_p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </main>
  );
}