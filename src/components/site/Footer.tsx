import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import logoImage from "@/assets/logo.png";

const navCols = [
  {
    title: "Company",
    links: [
      { label: "会社概要", to: "/about" },
      { label: "業務内容", to: "/services" },
      { label: "会社案内・アクセス", to: "/access" },
    ],
  },
  {
    title: "Producers",
    links: [
      { label: "生産者紹介", to: "/producers" },
      { label: "取扱品目", to: "/services#products" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "ニュース", to: "/news" },
      { label: "お問い合わせ", to: "/contact" },
      { label: "個人情報保護方針", to: "/access#privacy" },
    ],
  },
];

export const Footer = () => {
  const [hoverBrand, setHoverBrand] = useState(false);

  const handleTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 wa-shippou-light pointer-events-none" />

      <div className="container py-16 md:py-24 relative">
        {/* Massive brand mark */}
        <div
          className="mb-12 md:mb-20"
          onMouseEnter={() => setHoverBrand(true)}
          onMouseLeave={() => setHoverBrand(false)}
        >
          <div
            className={`font-serif text-[20vw] md:text-[14vw] lg:text-[11vw] font-bold leading-none tracking-tighter select-none transition-colors duration-700 ${
              hoverBrand ? "text-sun/30" : "text-primary-foreground/[0.08]"
            }`}
          >
            W·H Inc.
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex mb-6 group">
              <img
                src={logoImage}
                alt="W・H株式会社 ロゴ"
                className="h-10 md:h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-primary-foreground/65 leading-loose max-w-md">
              産直流通・カット野菜を通じて、日本の農業とお客様をつなぐ流通会社。
            </p>

            <button
              onClick={handleTop}
              className="inline-flex items-center gap-2 mt-8 text-[10px] tracking-[0.3em] uppercase text-sun hover:text-primary-foreground transition-smooth group"
            >
              Back to Top
              <span className="w-8 h-8 rounded-full border border-sun/50 flex items-center justify-center group-hover:bg-sun group-hover:text-foreground transition-smooth">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>

          <div className="lg:col-span-4 space-y-6 text-sm">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-sun uppercase mb-2">Head Office</div>
              <div className="text-primary-foreground/85 leading-relaxed">
                〒135-0042 東京都江東区木場 4-12-7 木場ビル6F
              </div>
              <div className="text-primary-foreground/60 text-xs mt-1">TEL: 03-5432-8761 / FAX: 03-5432-8762</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-sun uppercase mb-2">Kawaguchi Center</div>
              <div className="text-primary-foreground/85 leading-relaxed">〒332-0034 埼玉県川口市並木 3-8-15</div>
              <div className="text-primary-foreground/60 text-xs mt-1">TEL: 048-271-9384</div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              {navCols.map((col) => (
                <div key={col.title}>
                  <div className="text-[10px] tracking-[0.3em] text-sun font-medium mb-3 uppercase">{col.title}</div>
                  <ul className="space-y-2">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          to={l.to}
                          className="text-sm text-primary-foreground/70 hover:text-sun transition-smooth link-underline inline-block"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50 tracking-wider">
          <div>© {new Date().getFullYear()} W·H Inc. — All Rights Reserved.</div>
          <div className="flex gap-6">
            <Link to="/access#terms" className="hover:text-sun transition-smooth">Terms</Link>
            <Link to="/access#privacy" className="hover:text-sun transition-smooth">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
