"use client";

import { Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

type Fruit = {
  ja: string;
  en: string;
  emoji: string;
  season: string;
  hue: string;
  desc: string;
  image: string;
};

const fruits: Fruit[] = [
  {
    ja: "りんご",
    en: "Apple — Ringo",
    emoji: "🍎",
    season: "Autumn",
    hue: "from-rose-200/70 to-red-300/70",
    desc: "青森・長野などの寒冷地で育つ、蜜入りのジューシーな日本のりんご。",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "桃",
    en: "Peach — Momo",
    emoji: "🍑",
    season: "Summer",
    hue: "from-pink-100/70 to-orange-200/70",
    desc: "山梨・福島が誇る、香り高くとろけるような甘みの白桃。",
    image:
      "https://images.unsplash.com/photo-1595124210737-c41fb4585da7?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "和梨",
    en: "Nashi Pear",
    emoji: "🍐",
    season: "Late Summer",
    hue: "from-amber-100/70 to-yellow-200/70",
    desc: "シャリッとした食感と、上品な甘さが魅力の幸水・豊水。",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "みかん",
    en: "Mikan — Satsuma",
    emoji: "🍊",
    season: "Winter",
    hue: "from-orange-200/70 to-amber-300/70",
    desc: "愛媛・和歌山の温州みかん。手で剥ける皮と、こたつのお供。",
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "苺",
    en: "Strawberry — Ichigo",
    emoji: "🍓",
    season: "Winter→Spring",
    hue: "from-rose-200/70 to-pink-300/70",
    desc: "とちおとめ、あまおう、紅ほっぺ。ブランド苺の宝庫。",
    image:
      "https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "葡萄",
    en: "Grape — Budō",
    emoji: "🍇",
    season: "Late Summer→Autumn",
    hue: "from-purple-200/70 to-fuchsia-300/70",
    desc: "巨峰・シャインマスカット。日本が生んだ、宝石のような大粒。",
    image:
      "https://images.unsplash.com/photo-1599819177626-fc8a40b7e2cf?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "西瓜",
    en: "Watermelon — Suika",
    emoji: "🍉",
    season: "Summer",
    hue: "from-emerald-200/70 to-rose-200/70",
    desc: "熊本・千葉などの夏の風物詩。塩を一振り、瑞々しい一切れ。",
    image:
      "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=800&q=80",
  },
  {
    ja: "柿",
    en: "Persimmon — Kaki",
    emoji: "🍑",
    season: "Autumn",
    hue: "from-orange-300/70 to-amber-400/70",
    desc: "富有・次郎柿、そして干し柿。秋の里山を彩る橙色の果実。",
    image:
      "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80",
  },
];

export const FruitGallery = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-warm"
    >
      <div className="absolute inset-0 wa-fruit-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 wa-asanoha opacity-25 pointer-events-none" />
      <div className="blob bg-sun/25 w-[360px] h-[360px] -top-20 right-[5%] hidden md:block" />
      <div className="blob bg-tomato/20 w-[300px] h-[300px] bottom-10 -left-20 hidden md:block" style={{ animationDelay: "2s" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-end mb-10 md:mb-16">
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 mb-4 text-primary/80 tag-pill bg-primary/10">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Japanese Fruits</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground leading-[1.15] tracking-tight text-balance">
              四季の恵み、<br />
              <span className="italic font-normal text-primary relative inline-block">
                日本のフルーツ
                <span className="absolute -bottom-1 left-0 right-0 h-[8px] bg-sun/50 -z-10" />
              </span>
              。
            </h2>
          </div>
          <div className="lg:col-span-5 reveal delay-100">
            <p className="text-foreground/75 leading-loose text-sm md:text-[15px]">
              春の苺、夏の桃、秋の梨と柿、冬のみかん。
              四季がはっきりした日本だからこそ生まれる、世界に誇る品質のフルーツを、
              全国の生産者と共にお届けします。
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {fruits.map((f, i) => (
            <li
              key={f.ja}
              className="reveal reveal-scale lift-card group relative overflow-hidden bg-background border border-border/60"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${f.hue}`} aria-hidden />
                <img
                  src={f.image}
                  alt={`${f.ja} (${f.en})`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                <span
                  aria-hidden
                  className="absolute top-3 right-3 text-3xl md:text-4xl drop-shadow-md fruit-bob"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {f.emoji}
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
                  <div className="text-[9px] tracking-[0.3em] uppercase opacity-80">{f.season}</div>
                  <div className="font-serif text-lg md:text-xl font-bold drop-shadow-sm leading-tight">{f.ja}</div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <div className="text-[10px] tracking-[0.25em] uppercase text-primary/70 font-medium mb-1">{f.en}</div>
                <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 md:mt-10 text-center text-xs text-foreground/60 tracking-wider">
          ※ 旬の品目は協力農家との連携でお取り扱い可能です / Seasonal availability via our partner farms
        </p>
      </div>
    </section>
  );
};
