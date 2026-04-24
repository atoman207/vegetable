import { Link } from "react-router-dom";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const news = [
  { date: "2026.04.15", category: "Shipping", categoryJa: "出荷情報", title: "春野菜の出荷が本格スタート。グリーンリーフ・水菜の安定供給を開始しました。" },
  { date: "2026.04.01", category: "Notice", categoryJa: "お知らせ", title: "新年度のご挨拶 ― 本年も生産者と取引先の皆さまの架け橋として尽力します。" },
  { date: "2026.03.20", category: "Company", categoryJa: "会社情報", title: "川口センターの営業時間変更について（4月1日より）。" },
];

export const News = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="news"
      ref={ref}
      className="py-20 md:py-36 bg-secondary relative overflow-hidden"
    >
      {/* Asanoha accent — top left */}
      <div className="absolute top-0 left-0 w-40 md:w-64 h-48 md:h-72 wa-asanoha opacity-40 pointer-events-none" />
      <div className="blob bg-sun/20 w-[280px] h-[280px] bottom-10 -right-10 hidden md:block" />
      <div className="blob bg-matcha/15 w-[240px] h-[240px] top-10 -left-10 hidden md:block" style={{ animationDelay: "2s" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-10 md:mb-12">
          <div className="lg:col-span-2 reveal">
            <div className="flex lg:flex-col items-center lg:items-start gap-3">
              <span className="font-serif text-xs italic text-primary/60">— 09</span>
              <span className="text-[10px] tracking-[0.4em] text-primary font-medium uppercase">News</span>
            </div>
          </div>
          <div className="lg:col-span-7 reveal delay-100">
            <div className="inline-flex items-center gap-2 mb-4 text-primary/80 tag-pill bg-primary/5">
              <Newspaper className="h-3.5 w-3.5" />
              <span>News &amp; Topics</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.15] tracking-tight text-balance">
              ニュース／<br />
              <span className="italic font-normal text-primary relative inline-block">
                トピックス
                <span className="absolute -bottom-1 left-0 right-0 h-[8px] bg-sun/50 -z-10" />
              </span>
              。
            </h2>
          </div>
          <div className="lg:col-span-3 flex justify-start lg:justify-end reveal delay-200">
            <Link
              to="/news"
              className="text-xs font-medium text-foreground tracking-[0.2em] uppercase hover:text-primary transition-smooth inline-flex items-center gap-2 group"
            >
              View All
              <span className="w-8 h-px bg-foreground group-hover:bg-primary group-hover:w-12 transition-all" />
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="border-t border-border max-w-5xl mx-auto">
          {news.map((n, i) => (
            <a
              key={i}
              href="#"
              className="flex flex-col md:grid md:grid-cols-[100px_140px_1fr_auto] gap-2 md:gap-8 items-start md:items-center py-6 md:py-9 group hover:md:px-4 border-b border-border transition-all duration-500 reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <time className="text-xs font-medium text-muted-foreground tabular-nums tracking-wider">{n.date}</time>
              <div className="flex items-center gap-2">
                <span className="w-6 h-px bg-primary" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">{n.category}</span>
                <span className="text-[10px] text-primary/60 md:hidden">{n.categoryJa}</span>
              </div>
              <p className="font-serif text-base md:text-lg text-foreground/90 group-hover:text-primary transition-smooth leading-snug font-medium">
                {n.title}
              </p>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-smooth hidden md:block" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
