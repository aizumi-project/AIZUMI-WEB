"use client";

import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, Heart, Info, Scale, ShieldCheck } from "lucide-react"; // Import all icons used
import React from "react"; // Required for React.ElementType

type Language = "JP" | "EN";

interface LocalizedString {
  JP: string;
  EN: string;
}

interface TermListItem {
  id: string;
  iconColorClass: string;
  text: LocalizedString;
}

interface TermSectionData {
  id: string;
  icon: React.ElementType;
  iconColorClass: string;
  title: LocalizedString;
  introText?: LocalizedString;
  listItems?: TermListItem[];
  paragraphs?: LocalizedString[];
}

const getLocalizedText = (text: LocalizedString, currentLang: Language) => {
  return currentLang === "JP" ? text.JP : text.EN;
};

const termsData: TermSectionData[] = [
  {
    id: "copyright",
    icon: ShieldCheck,
    iconColorClass: "text-blue-400",
    title: {
      JP: "第1条（著作権の帰属）",
      EN: "Article 1 (Copyright Ownership)",
    },
    paragraphs: [
      {
        JP: "本素材に関する著作権（映像デザイン、モーショングラフィックス、レイアウト、および「藍墨」固有の演出等）は、本プロジェクトに帰属します。",
        EN: "The copyright for the Assets (visual design, motion graphics, layout, and unique AIZUMI productions) belongs to the Project.",
      },
      {
        JP: "本素材の提供により、著作権が利用者に移転することはありません。",
        EN: "The provision of the Assets does not transfer any copyright to the user.",
      },
    ],
  },
  {
    id: "license-scope",
    icon: Scale,
    iconColorClass: "text-emerald-400",
    title: {
      JP: "第2条（利用許諾範囲）",
      EN: "Article 2 (Scope of License)",
    },
    introText: {
      JP: "利用者は、本素材を以下の範囲で自由に使用することができます。",
      EN: "Users may freely use the Assets within the following scope:",
    },
    listItems: [
      {
        id: "platform-posting",
        iconColorClass: "text-emerald-500",
        text: {
          JP: "YouTube、TikTok、ニコニコ動画等の動画共有プラットフォームへの投稿。",
          EN: "Posting to video sharing platforms such as YouTube, TikTok, Niconico, etc.",
        },
      },
      {
        id: "live-streaming",
        iconColorClass: "text-emerald-500",
        text: {
          JP: "ライブ配信、SNSでの告知動画、ポートフォリオ等への利用。",
          EN: "Use in live streaming, SNS promotional videos, portfolios, etc.",
        },
      },
      {
        id: "commercial-activities",
        iconColorClass: "text-emerald-500",
        text: {
          JP: "営利目的の活動（収益化されたチャンネルでの使用、商用イベント等）における利用。",
          EN: "Use in commercial activities (monetized channels, commercial events, etc.).",
        },
      },
      {
        id: "processing",
        iconColorClass: "text-emerald-500",
        text: {
          JP: "本素材への文字情報の追加、色調補正、再生速度の変更等の加工。",
          EN: "Processing such as adding text, color correction, changing playback speed, etc.",
        },
      },
    ],
  },
  {
    id: "prohibitions",

    icon: AlertTriangle,
    iconColorClass: "text-red-400",
    title: {
      JP: "第3条（禁止事項）",
      EN: "Article 3 (Prohibitions)",
    },
    introText: {
      JP: "利用者は、以下の行為を行ってはなりません。",
      EN: "Users must not engage in the following acts:",
    },
    listItems: [
      {
        id: "redistribution",
        iconColorClass: "text-red-500",
        text: {
          JP: "本素材そのもの、または加工したものを、独立した素材として再配布・販売すること。",
          EN: "Redistributing or selling the Assets themselves, or processed versions, as independent material.",
        },
      },
      {
        id: "misrepresentation",
        iconColorClass: "text-red-500",
        text: {
          JP: "自身の著作物であると偽る行為（自作発言）。",
          EN: "Acts of pretending that it is your own work (claiming authorship).",
        },
      },
      {
        id: "defamation",
        iconColorClass: "text-red-500",
        text: {
          JP: "特定の個人、団体を誹謗中傷する目的のコンテンツでの使用。",
          EN: "Use in content for the purpose of defaming specific individuals or groups.",
        },
      },
      {
        id: "violence",
        iconColorClass: "text-red-500",
        text: {
          JP: "政治、宗教、または公序良俗に反するコンテンツでの使用。",
          EN: "Use in content that is political, religious, or contrary to public order and morals.",
        },
      },
      {
        id: "other-inappropriate-use",
        iconColorClass: "text-red-500",
        text: {
          JP: "その他、本プロジェクトが不適切と判断する使用態様。",
          EN: "Other usage styles that the Project deems inappropriate.",
        },
      },
    ],
  },
  {
    id: "lyric-copyright",
    icon: Info,
    iconColorClass: "text-amber-400",
    title: {
      JP: "第4条（歌詞の著作権に関する重要事項）",
      EN: "Article 4 (Important Notes on Lyric Copyright)",
    },
    listItems: [
      {
        id: "lyric-copyright",
        iconColorClass: "text-amber-500",
        text: {
          JP: "本素材に表示されている「歌詞」の著作権は、各楽曲の作詞家および音楽出版社等の権利者に帰属します。",
          EN: "The copyright of the 'lyrics' displayed in the Assets belongs to the lyricists, music publishers, and other right holders of each song.",
        },
      },
      {
        id: "lyric-usage",
        iconColorClass: "text-amber-500",
        text: {
          JP: "本素材は映像デザインの提供を目的としたものであり、本プロジェクトが歌詞の利用権を許諾するものではありません。",
          EN: "The Assets are intended to provide visual design, and the Project does not grant the right to use the lyrics.",
        },
      },
      {
        id: "lyric-rights-processing",
        iconColorClass: "text-amber-500",
        text: {
          JP: "利用者は、JASRAC、NextTone等の著作権管理団体の規定、および各プラットフォームの利用規約に従い、利用者自身の責任において必要な権利処理を行ってください。",
          EN: "Users must perform necessary rights processing at their own responsibility in accordance with the regulations of copyright management organizations such as JASRAC, NextTone, and the terms of use of each platform.",
        },
      },
    ],
  },
  {
    id: "disclaimer",
    icon: AlertCircle,
    iconColorClass: "text-gray-400",
    title: {
      JP: "第5条（免責事項）",
      EN: "Article 5 (Disclaimer)",
    },
    listItems: [
      {
        id: "no-guarantee",
        iconColorClass: "text-gray-500",
        text: {
          JP: "本プロジェクトは、本素材の完全性、動作保証、特定の目的への適合性について、一切の保証を行いません。",
          EN: "The Project does not make any guarantees regarding the completeness, operation, or fitness for a particular purpose of the Assets.",
        },
      },
      {
        id: "no-liability",
        iconColorClass: "text-gray-500",
        text: {
          JP: "本素材の使用により利用者に生じた損害（データ消失、PCの不具合、権利侵害に関する紛争等）について、本プロジェクトおよびその運営者は一切の責任を負わないものとします。",
          EN: "The Project and its operators shall not be liable for any damage (data loss, PC malfunction, disputes regarding rights infringement, etc.) caused to the user by using the Assets.",
        },
      },
      {
        id: "change-or-discontinue",
        iconColorClass: "text-gray-500",
        text: {
          JP: "本素材の内容および本規約は、予告なく変更または配布を終了することがあります。",
          EN: "The contents of the Assets and these Terms may be changed or distributed without notice.",
        },
      },
    ],
  },
  {
    id: "credit-notation",
    icon: Heart,
    iconColorClass: "text-blue-400",
    title: {
      JP: "第6条（クレジット表記）",
      EN: "Article 6 (Credit Notation)",
    },
    paragraphs: [
      {
        JP: "本素材の使用にあたって、クレジット表記（「映像：藍墨」等）は任意です。ただし、表記や本プロジェクトへのリンクをいただけますと幸いです。",
        EN: "When using the Assets, credit notation (e.g., 'Visual: AIZUMI') is optional. However, we would appreciate it if you could provide a link to the notation or this Project.",
      },
    ],
  },
  {
    id: "vocal-identity",
    icon: Info,
    iconColorClass: "text-blue-400",
    title: {
      JP: "第7条（キャラクター・人格権について）",
      EN: "Article 7 (Character & Moral Rights)",
    },
    paragraphs: [
      {
        JP: "「AOI」および「KUROKO」は同一の演者による「1名2声」の表現形態をとっています。素材利用にあたり、キャラクターのイメージを著しく損なう公序良俗に反する表現や、特定の思想信条を代弁させるような利用を禁止します。",
        EN: "Both 'AOI' and 'KUROKO' are performed by the same individual. When using the Assets, expressions that significantly damage the image of the characters or use that makes them represent specific ideologies are prohibited.",
      },
      {
        JP: "AI学習（歌唱情報の抽出・模倣等）への利用は、いかなる場合も禁止します。",
        EN: "Use for AI learning (extraction or imitation of singing data, etc.) is prohibited under any circumstances.",
      },
    ],
  },
];

export default function TermsPage() {
  const { lang } = useLanguage();

  return (
    <main className="relative min-h-screen bg-[#0a0e12] text-[#e6ebf0] pt-32 pb-20 px-6">
      <BackgroundBlobs />

      <AnimatePresence mode="wait">
        <motion.div
          key={lang} // 言語が変わるたびに再マウント
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <header className="mb-16 pl-8 border-l-2 border-blue-500/30">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-4xl font-black italic tracking-tighter bg-clip-text text-transparent bg-linear-to-br from-blue-400 via-blue-500 to-blue-700 mb-2 pl-1 pr-4 leading-tight"
            >
              {getLocalizedText({ JP: "藍墨プロジェクトリリックビデオ素材利用規約", EN: "AIZUMI Project Lyric Video Asset Terms of Use" }, lang)}
            </motion.h1>
            <p className="text-blue-400/40 text-[10px] tracking-[1.5em] uppercase font-bold ml-1">
              {getLocalizedText({ JP: "利用規約", EN: "Terms of Use" }, lang)}
            </p>
          </header>

          <div className="mb-16 text-sm text-gray-400 leading-relaxed border-b border-white/5 pb-10">
            <p className="mb-4">
              {getLocalizedText({
                JP: "本規約は、藍墨プロジェクト（以下「本プロジェクト」といいます）が制作・配布する動画素材（以下「本素材」といいます）の利用条件を定めるものです。利用者は、本素材をダウンロードした時点で、本規約のすべての内容に同意したものとみなします。",
                EN: "These Terms of Use set forth the conditions for using the video assets (\"Assets\") produced and distributed by the AIZUMI Project (\"Project\"). By downloading the Assets, the user is deemed to have agreed to all the contents of these Terms.",
              }, lang)}
            </p>
          </div>

          <div className="space-y-12">
            {termsData.map((section) => (
              /* 修正1: index ではなく section.id を使用 */
              <section key={section.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-sm">
                <div className={`flex items-center gap-4 mb-8 ${section.iconColorClass}`}>
                  <section.icon size={24} />
                  <h2 className="text-xl font-bold uppercase tracking-widest">{getLocalizedText(section.title, lang)}</h2>
                </div>
                {section.introText && (
                  <p className="text-gray-400 mb-6 text-sm font-medium">
                    {getLocalizedText(section.introText, lang)}
                  </p>
                )}
                {section.listItems && (
                  <ul className="space-y-4 text-gray-300 text-sm list-none">
                    {section.listItems.map((item) => (
                      /* 修正2: itemIndex ではなく item.id を使用 */
                      <li key={item.id} className="flex gap-3">
                        <span className={`${item.iconColorClass} font-bold`}>•</span>
                        <span>{getLocalizedText(item.text, lang)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.paragraphs && (
                  <div className="text-gray-400 leading-relaxed text-sm space-y-2">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      /* 修正3: 内容が変わらない不変のリストなので、親IDとindexを組み合わせて一意にする */
                      <p key={`${section.id}-p-${pIndex}`}>{getLocalizedText(paragraph, lang)}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}