import { getAllInsights } from "@/lib/markdown";
import { Metadata } from "next";
import InsightsList from "./InsightsList"; // 先ほど作成したクライアントコンポーネント

export const metadata: Metadata = {
  title: "INSIGHTS | AIZUMI PROJECT",
  description: "藍墨プロジェクトの制作過程や技術的な知見を共有するページです。",
};

export default async function InsightsPage() {
  const allInsights = await getAllInsights();

  return (
    <InsightsList initialInsights={allInsights} />
  );
}