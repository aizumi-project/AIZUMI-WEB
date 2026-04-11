import { Insight } from "@/app/insights/insights";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

const insightsDirectory = path.join(process.cwd(), "src/content/insights");

export async function getAllInsights(): Promise<Insight[]> {
  if (!fs.existsSync(insightsDirectory)) return [];
  
  const fileNames = fs.readdirSync(insightsDirectory);
  const allInsightsData = fileNames
    .filter((fileName) => fileName.endsWith(".md")) // .mdファイルのみを対象にする
    .map((fileName) => {
      const fileNameId = fileName.replace(/\.md$/, "");
      const fullPath = path.join(insightsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        ...data,
        id: fileNameId, // ファイル名をIDとしてそのまま使用（文字列）
        // gray-matterがDateオブジェクトに変換してしまう場合があるため文字列に変換
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
      } as Insight;
    });

  return allInsightsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getInsightData(id: string): Promise<(Insight & { contentHtml: string }) | null> {
  const fullPath = path.join(insightsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    return null; // ファイルが存在しない場合はnullを返す
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  const { data } = matterResult;

  return {
    ...data,
    id: id, // idをそのまま使用
    contentHtml,
    date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
  } as Insight & { contentHtml: string };
}