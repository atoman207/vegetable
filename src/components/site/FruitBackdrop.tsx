"use client";

import { CSSProperties } from "react";

type Fruit = {
  emoji: string;
  label: string;
  size: string;
  top: string;
  left?: string;
  right?: string;
  delay: string;
  rotate?: string;
  hideOnMobile?: boolean;
};

const FRUITS: Fruit[] = [
  { emoji: "🍎", label: "りんご", size: "text-[clamp(2.5rem,5vw,4.5rem)]", top: "8%",  left: "4%",  delay: "0s",   rotate: "-8deg" },
  { emoji: "🍑", label: "桃",     size: "text-[clamp(2rem,4.5vw,4rem)]",   top: "16%", right: "8%", delay: "0.6s", rotate: "12deg" },
  { emoji: "🍐", label: "和梨",   size: "text-[clamp(2rem,4vw,3.5rem)]",   top: "38%", left: "9%",  delay: "1.2s", rotate: "6deg",  hideOnMobile: true },
  { emoji: "🍊", label: "みかん", size: "text-[clamp(1.8rem,3.5vw,3rem)]", top: "52%", right: "5%", delay: "1.8s", rotate: "-12deg" },
  { emoji: "🍇", label: "葡萄",   size: "text-[clamp(2rem,4vw,3.5rem)]",   top: "70%", left: "6%",  delay: "0.4s", rotate: "10deg",  hideOnMobile: true },
  { emoji: "🍓", label: "苺",     size: "text-[clamp(1.8rem,3.5vw,3rem)]", top: "82%", right: "12%",delay: "2.4s", rotate: "-6deg" },
  { emoji: "🍉", label: "西瓜",   size: "text-[clamp(2rem,4vw,3.5rem)]",   top: "92%", left: "20%", delay: "1.4s", rotate: "8deg",  hideOnMobile: true },
];

/**
 * Decorative floating Japanese fruits behind page content. Pure decoration —
 * uses emoji so it never breaks if image hosting is down. Pointer-events
 * disabled so it never blocks interaction.
 */
export const FruitBackdrop = ({
  density = "normal",
  className = "",
}: {
  density?: "sparse" | "normal" | "dense";
  className?: string;
}) => {
  const list =
    density === "sparse"
      ? FRUITS.filter((_, i) => i % 2 === 0)
      : density === "dense"
      ? [...FRUITS, ...FRUITS.map((f, i) => ({
          ...f,
          top: `${(parseInt(f.top) + 30) % 100}%`,
          left: f.right,
          right: f.left,
          delay: `${(i + 3) * 0.4}s`,
        }))]
      : FRUITS;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {list.map((f, i) => {
        const style: CSSProperties = {
          top: f.top,
          left: f.left,
          right: f.right,
          animationDelay: f.delay,
          transform: f.rotate ? `rotate(${f.rotate})` : undefined,
          filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.18))",
        };
        return (
          <span
            key={`${f.label}-${i}`}
            role="presentation"
            style={style}
            className={[
              "absolute fruit-bob opacity-60 md:opacity-70",
              f.size,
              f.hideOnMobile ? "hidden sm:inline-block" : "inline-block",
            ].join(" ")}
          >
            {f.emoji}
          </span>
        );
      })}
    </div>
  );
};
