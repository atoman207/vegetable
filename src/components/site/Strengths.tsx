"use client";

import { useReveal } from "@/hooks/use-reveal";

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=400&q=80",
    fallbackEmoji: "🍐",
    imageAlt: "和梨 (Nashi pear)",
    title: "安定供給",
    en: "Stable Supply",
    desc: "全国の協力農場との連携により、年間を通じた安定的な供給体制を構築しています。",
    accent: "bg-sun",
  },
  {
    image:
      "https://images.unsplash.com/photo-1595124210737-c41fb4585da7?auto=format&fit=crop&w=400&q=80",
    fallbackEmoji: "🍑",
    imageAlt: "桃 (Peach)",
    title: "品質管理",
    en: "Quality Control",
    desc: "入荷時の品質確認、栽培履歴書の提出対応など、安心・安全への取り組みを徹底しています。",
    accent: "bg-leaf",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80",
    fallbackEmoji: "🍊",
    imageAlt: "みかん (Mikan)",
    title: "適正価格",
    en: "Fair Pricing",
    desc: "中間流通コストを抑え、お客様の予算とニーズに応じた最適なご提案が可能です。",
    accent: "bg-tomato",
  },
];

export const Strengths = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 md:py-36 bg-secondary relative overflow-hidden"
    >
      <div className="absolute inset-0 wa-shippou opacity-60 pointer-events-none" />
      <div className="absolute inset-0 wa-fruit-pattern opacity-30 pointer-events-none" />
      <div className="blob bg-sun/20 w-[320px] h-[320px] -top-10 right-[10%] hidden md:block" />
      <div className="blob bg-matcha/20 w-[280px] h-[280px] bottom-10 -left-10 hidden md:block" style={{ animationDelay: "3s" }} />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12 md:mb-20">
          <div className="lg:col-span-2 reveal">
            <div className="flex lg:flex-col items-center lg:items-start gap-3">
              <span className="font-serif text-xs italic text-primary/60">— 03</span>
              <span className="text-[10px] tracking-[0.4em] text-primary font-medium uppercase">Strengths</span>
            </div>
          </div>
          <div className="lg:col-span-7 reveal delay-100">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.15] tracking-tight text-balance">
              選ばれる、<br />
              <span className="italic font-normal text-primary relative inline-block">
                3<span className="absolute -bottom-1 left-0 right-0 h-2 bg-sun/60 -z-10" />
              </span>
              <span className="text-primary"> </span>つの理由。
            </h2>
          </div>
          <div className="lg:col-span-3 reveal delay-200">
            <p className="text-foreground/70 leading-loose text-sm">
              生産者と取引先、双方に寄り添う流通スタイル。
              「供給力・品質・価格」のバランスを大切にしています。
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-0 md:border-t border-border">
          {items.map(({ image, imageAlt, fallbackEmoji, title, en, desc, accent }, i) => (
            <div
              key={title}
              className="group relative bg-background md:bg-transparent py-10 md:py-14 px-6 md:px-8 md:border-b-0 md:border-r border-border last:border-r-0 hover:bg-background transition-smooth shadow-soft md:shadow-none reveal"
              style={{ transitionDelay: `${(i + 1) * 120}ms` }}
            >
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <span className="font-serif text-xs italic text-primary/60">— 0{i + 1}</span>
                <div className="relative">
                  <div className={`absolute inset-0 ${accent} rounded-full blur-xl opacity-50 scale-125 group-hover:scale-150 transition-transform`} />
                  <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden shadow-card ring-2 ring-background bg-secondary group-hover:rotate-6 transition-smooth">
                    <img
                      src={image}
                      alt={imageAlt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = "none";
                        const sib = t.nextElementSibling as HTMLElement | null;
                        if (sib) sib.style.display = "flex";
                      }}
                    />
                    <span
                      className="absolute inset-0 hidden items-center justify-center text-3xl md:text-4xl"
                      aria-hidden
                    >
                      {fallbackEmoji}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] tracking-[0.35em] text-primary uppercase mb-3 font-medium">{en}</div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-5 tracking-tight">
                {title}
              </h3>
              <p className="text-foreground/70 leading-loose text-sm max-w-xs">{desc}</p>
              <div className={`mt-6 md:mt-8 h-[2px] w-10 ${accent} group-hover:w-24 transition-all duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
