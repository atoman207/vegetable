import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Intro } from "@/components/site/Intro";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";

const timeline = [
  { year: "2008", title: "創業", desc: "東京・木場にて、産直流通業として創業。" },
  { year: "2012", title: "川口センター開設", desc: "埼玉・川口に物流拠点を設け、首都圏の供給力を強化。" },
  { year: "2017", title: "加工事業開始", desc: "カット・洗浄・パック詰めなど、加工サービスを開始。" },
  { year: "2022", title: "協力農家 200軒達成", desc: "全国47都道府県に協力農家ネットワークを拡大。" },
  { year: "2026", title: "取扱品目 100種超へ", desc: "葉物・根菜・果菜をはじめ、特殊品目にも対応。" },
];

const philosophy = [
  { en: "Honesty", ja: "誠実に", desc: "生産者と取引先、双方に対して誠実であること。" },
  { en: "Quality", ja: "品質本位", desc: "流通の質が、食卓の質をつくると信じています。" },
  { en: "Partnership", ja: "共に歩む", desc: "お客様の事業を、真ん中で支え続けます。" },
];

const About = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          number="02"
          en="About"
          ja="日本の農業と、"
          accentJa="お客様"
          tailJa="をつなぐ。"
          description="私たちW・H株式会社は、全国の生産者の皆さまと飲食・小売・加工業のお客様をつなぐ、産直流通の専門会社です。"
          breadcrumb={[{ label: "会社概要" }]}
        />

        <Intro />

        {/* Philosophy */}
        <section ref={ref} className="py-20 md:py-32 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 md:w-80 h-full wa-asanoha opacity-40 pointer-events-none hidden md:block" />
          <div className="blob bg-matcha/20 w-[320px] h-[320px] -top-10 -left-10 hidden md:block" />

          <div className="container relative">
            <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16">
              <div className="lg:col-span-2 reveal">
                <div className="flex lg:flex-col items-center lg:items-start gap-3">
                  <span className="font-serif text-xs italic text-primary/60">— Philosophy</span>
                </div>
              </div>
              <div className="lg:col-span-7 reveal delay-100">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight">
                  私たちが、<br />
                  <span className="italic font-normal text-primary relative inline-block">
                    大切にしている
                    <span className="absolute -bottom-1 left-0 right-0 h-[8px] bg-sun/50 -z-10" />
                  </span>
                  こと。
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
              {philosophy.map((p, i) => (
                <div
                  key={p.en}
                  className="bg-background p-6 md:p-8 group hover:bg-primary hover:text-primary-foreground transition-smooth reveal"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="font-serif text-xs italic opacity-60">— 0{i + 1}</span>
                    <span className="text-[10px] tracking-[0.3em] uppercase opacity-70">{p.en}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 tracking-tight">{p.ja}</h3>
                  <p className="text-sm leading-loose opacity-80">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-32 bg-background relative overflow-hidden">
          <div className="absolute -top-2 right-0 text-[110px] sm:text-[180px] md:text-[260px] font-serif font-bold leading-none select-none pointer-events-none [-webkit-text-stroke:1px_hsl(var(--primary)/0.08)] text-transparent">
            History
          </div>

          <div className="container relative">
            <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16">
              <div className="lg:col-span-2">
                <span className="font-serif text-xs italic text-primary/60">— History</span>
              </div>
              <div className="lg:col-span-10">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[1.15] tracking-tight">
                  これまでの、<br />
                  <span className="italic font-normal text-primary">歩み</span>。
                </h2>
              </div>
            </div>

            <ol className="max-w-4xl mx-auto relative">
              <div className="absolute left-3 md:left-28 top-2 bottom-2 w-px bg-border" aria-hidden />
              {timeline.map((t, i) => (
                <li
                  key={t.year}
                  className="relative grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-6 md:py-8 items-start reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <span className="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-sun" />
                    </span>
                    <span className="font-serif italic text-primary text-lg md:text-xl hidden md:inline">{t.year}</span>
                  </div>
                  <div>
                    <span className="font-serif italic text-primary text-lg md:hidden block mb-1">{t.year}</span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-1 tracking-tight">{t.title}</h3>
                    <p className="text-foreground/70 text-sm leading-loose">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-editorial text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 wa-seigaiha-light pointer-events-none" />
          <div className="container relative text-center">
            <h3 className="font-serif text-3xl md:text-5xl font-bold mb-6 tracking-tight text-balance">
              もっと、私たちを
              <br />
              <span className="italic text-sun">知る</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-sun text-foreground hover:bg-sun/90 rounded-none h-14 px-7 tracking-wider">
                <Link to="/services">
                  業務内容を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-none h-14 px-7 tracking-wider">
                <Link to="/contact">お問い合わせ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
