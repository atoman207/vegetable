import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";
import farmerHands from "@/assets/farmer-hands.jpg";
import { useReveal } from "@/hooks/use-reveal";

export const Contact = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-foreground"
    >
      <img
        src={farmerHands}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-30 kenburns"
      />
      <div className="absolute inset-0 bg-gradient-editorial opacity-95" />
      <div className="absolute inset-0 wa-asanoha-light pointer-events-none" />

      <div className="blob bg-sun/25 w-[420px] h-[420px] -bottom-20 -right-20 hidden md:block" />
      <div className="blob bg-primary-glow/20 w-[320px] h-[320px] -top-10 -left-10 hidden md:block" style={{ animationDelay: "2s" }} />

      <div className="container relative text-primary-foreground py-20 md:py-36">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12 md:mb-16">
          <div className="lg:col-span-2 reveal">
            <div className="flex lg:flex-col items-center lg:items-start gap-3">
              <span className="font-serif text-xs italic text-primary-foreground/60">— 10</span>
              <span className="text-[10px] tracking-[0.4em] text-sun font-medium uppercase">Contact</span>
            </div>
          </div>
          <div className="lg:col-span-10 reveal delay-100">
            <div className="inline-flex items-center gap-2 mb-4 tag-pill bg-primary-foreground/10 text-sun">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight text-balance">
              まずは、<br />
              <span className="italic font-normal text-sun relative inline-block">
                お気軽に
                <span className="absolute -bottom-1 left-0 right-0 h-[10px] bg-sun/30 -z-10" />
              </span>
              どうぞ。
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-2 hidden lg:block" />
          <div className="lg:col-span-6 reveal delay-200">
            <p className="text-primary-foreground/80 leading-loose mb-8 md:mb-10 text-[15px] max-w-xl">
              仕入れのご相談、取扱品目のお問い合わせ、供給体制のご相談など。
              お客様のご要望に合わせた最適なご提案をいたします。
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-sun text-foreground hover:bg-sun/90 rounded-none font-medium h-14 px-7 tracking-wider text-sm group shadow-pop"
              >
                <Link to="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  CONTACT FORM
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-foreground rounded-none font-medium h-14 px-7 tracking-wider text-sm"
              >
                <a href="tel:03-5432-8761">
                  <Phone className="mr-2 h-4 w-4" />
                  03-5432-8761
                </a>
              </Button>
            </div>

            <div className="mt-10 pt-8 border-t border-primary-foreground/10 text-[11px] tracking-[0.2em] uppercase text-primary-foreground/50">
              Business Hours · Mon–Fri · 9:00–18:00
            </div>
          </div>

          <div className="lg:col-span-4 lg:pl-8 lg:border-l border-primary-foreground/15 space-y-5 md:space-y-6 reveal delay-300">
            {[
              { en: "Procurement", ja: "仕入れ相談", desc: "継続的な調達のご相談を承ります" },
              { en: "Product Range", ja: "取扱品目相談", desc: "特殊な品目もご相談ください" },
              { en: "Supply Chain", ja: "供給体制の相談", desc: "数量・頻度に合わせて最適化" },
            ].map((c, i) => (
              <div
                key={c.en}
                className="flex items-start gap-5 group hover:bg-primary-foreground/5 p-3 -m-3 rounded-lg transition-smooth"
              >
                <span className="font-serif text-xs italic text-sun/70 mt-1">— 0{i + 1}</span>
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.3em] text-sun uppercase mb-1.5">{c.en}</div>
                  <div className="font-serif text-lg font-bold mb-1 group-hover:translate-x-1 transition-transform">{c.ja}</div>
                  <div className="text-primary-foreground/60 text-xs leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
