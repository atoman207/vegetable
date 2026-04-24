import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";
import pubicon from "@/assets/pubicon.png";

export const metadata: Metadata = {
  title: "W・H株式会社 | 産直流通とカット野菜で日本の農業を支える",
  description:
    "全国の生産者ネットワークを活かし、産直流通とカット野菜で安定供給を実現。品質・価格・供給力に強い、法人向け青果流通のW・H株式会社。",
  authors: [{ name: "W・H株式会社" }],
  icons: {
    icon: pubicon.src,
  },
  openGraph: {
    type: "website",
    title: "W・H株式会社 | 産直流通とカット野菜で日本の農業を支える",
    description:
      "全国の生産者ネットワークを活かし、産直流通とカット野菜で安定供給を実現。品質・価格・供給力に強い、法人向け青果流通のW・H株式会社。",
  },
  twitter: {
    card: "summary_large_image",
    title: "W・H株式会社 | 産直流通とカット野菜で日本の農業を支える",
    description:
      "全国の生産者ネットワークを活かし、産直流通とカット野菜で安定供給を実現。品質・価格・供給力に強い、法人向け青果流通のW・H株式会社。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
