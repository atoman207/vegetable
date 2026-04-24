"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";

const navItems = [
  { label: "ホーム", to: "/" },
  { label: "会社概要", to: "/about" },
  { label: "業務内容", to: "/services" },
  { label: "生産者紹介", to: "/producers" },
  { label: "会社案内", to: "/access" },
  { label: "ニュース", to: "/news" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";

  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-smooth",
          solid
            ? "bg-background/95 backdrop-blur-md border-b border-border/60 shadow-soft"
            : "bg-transparent"
        )}
      >
        <div className="flex h-16 md:h-20 items-center justify-between px-[5vw]">
          <Link href="/" className="group">
            <img
              src={logoImage.src}
              alt="W・H株式会社 ロゴ"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navItems.map((item, i) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    "text-xs font-medium tracking-[0.15em] uppercase transition-smooth relative group py-1",
                    solid
                      ? active
                        ? "text-primary"
                        : "text-foreground/75 hover:text-primary"
                      : active
                      ? "text-sun"
                      : "text-primary-foreground/85 hover:text-sun"
                  )}
                >
                  <span className="font-serif italic text-[10px] mr-1.5 opacity-60">0{i + 1}</span>
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-0 right-0 -bottom-0.5 h-[1px] origin-left transition-transform duration-500",
                      solid ? "bg-primary" : "bg-sun",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="tel:03-5432-8761"
              className={cn(
                "hidden md:flex items-center gap-1.5 text-xs tracking-wider transition-smooth",
                solid ? "text-foreground/70 hover:text-primary" : "text-primary-foreground/80 hover:text-sun"
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium tabular-nums">03-5432-8761</span>
            </a>
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden sm:inline-flex rounded-none font-medium text-xs tracking-[0.15em] uppercase h-10 px-5 transition-smooth",
                solid
                  ? "bg-foreground text-primary-foreground hover:bg-primary"
                  : "bg-sun text-foreground hover:bg-sun/90"
              )}
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "lg:hidden p-2 relative z-[60] transition-colors",
                open ? "text-primary-foreground" : solid ? "text-foreground" : "text-primary-foreground"
              )}
              aria-label="メニュー"
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden bg-gradient-editorial transition-opacity duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 wa-seigaiha-light pointer-events-none" />
        <div className="blob bg-sun/20 w-[300px] h-[300px] top-10 -right-20" />
        <div className="blob bg-primary-glow/15 w-[260px] h-[260px] bottom-0 -left-10" style={{ animationDelay: "2s" }} />

        <nav className="relative h-full flex flex-col justify-center px-[5vw] py-24 overflow-y-auto">
          <div className="text-[10px] tracking-[0.4em] uppercase text-sun mb-6">Menu</div>
          <ul className="flex flex-col gap-3">
            {navItems.map((item, i) => {
              const active = pathname === item.to;
              return (
                <li
                  key={item.to}
                  style={{
                    transitionDelay: open ? `${i * 70 + 150}ms` : "0ms",
                    transform: open ? "translateY(0)" : "translateY(20px)",
                    opacity: open ? 1 : 0,
                  }}
                  className="transition-all duration-500"
                >
                  <Link
                    href={item.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-2 border-b border-primary-foreground/10"
                  >
                    <span className="font-serif italic text-sun text-xs">0{i + 1}</span>
                    <span
                      className={cn(
                        "font-serif text-3xl sm:text-4xl font-bold tracking-tight transition-smooth",
                        active
                          ? "text-sun"
                          : "text-primary-foreground group-hover:text-sun"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-10 flex flex-col gap-4 transition-all duration-500"
            style={{
              transitionDelay: open ? `${navItems.length * 70 + 200}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
            }}
          >
            <Button
              asChild
              className="bg-sun text-foreground hover:bg-sun/90 rounded-none h-12 tracking-wider self-start px-7"
            >
              <Link href="/contact">お問い合わせ</Link>
            </Button>
            <a
              href="tel:03-5432-8761"
              className="flex items-center gap-2 text-primary-foreground/80 text-sm tracking-wider"
            >
              <Phone className="h-4 w-4 text-sun" />
              <span className="tabular-nums">03-5432-8761</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
