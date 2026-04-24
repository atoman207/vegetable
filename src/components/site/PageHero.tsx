import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  number: string;
  en: string;
  ja: string;
  accentJa: string;
  tailJa?: string;
  description?: string;
  breadcrumb?: { label: string; to?: string }[];
};

export const PageHero = ({
  number,
  en,
  ja,
  accentJa,
  tailJa = "",
  description,
  breadcrumb,
}: PageHeroProps) => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-editorial text-primary-foreground overflow-hidden grain">
      <div className="absolute inset-0 wa-seigaiha-light pointer-events-none" />
      <div className="blob bg-sun/25 w-[400px] h-[400px] -top-20 -right-20 hidden md:block" />
      <div className="blob bg-primary-glow/20 w-[300px] h-[300px] bottom-0 left-[15%] hidden md:block" style={{ animationDelay: "3s" }} />

      <div className="container relative">
        <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.25em] uppercase text-primary-foreground/60 mb-8 md:mb-12">
          <Link to="/" className="hover:text-sun transition-smooth">
            Home
          </Link>
          {breadcrumb?.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 opacity-50" />
              {b.to ? (
                <Link to={b.to} className="hover:text-sun transition-smooth">
                  {b.label}
                </Link>
              ) : (
                <span className="text-sun">{b.label}</span>
              )}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="font-serif text-xs italic text-primary-foreground/60">— {number}</span>
          <span className="h-px w-10 bg-sun" />
          <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-sun font-medium">
            {en}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-balance max-w-4xl">
          {ja}
          <br />
          <span className="italic font-normal text-sun relative inline-block">
            {accentJa}
            <span className="absolute -bottom-1 left-0 right-0 h-[8px] md:h-[10px] bg-sun/30 -z-10" />
          </span>
          {tailJa}
        </h1>

        {description && (
          <p className="mt-8 md:mt-10 max-w-2xl text-primary-foreground/80 leading-loose text-[15px] md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};
