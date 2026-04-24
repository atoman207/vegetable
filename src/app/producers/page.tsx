import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ProducersDirectory } from "@/components/site/ProducersDirectory";

export default function ProducersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          number="06"
          en="Producers"
          ja="顔の見える、"
          accentJa="生産者"
          tailJa="たち。"
          description="北海道から沖縄まで。県ごとに、協力農家の顔・主な生産野菜・畑の風景をご紹介します。"
          breadcrumb={[{ label: "生産者紹介" }]}
          backgroundImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80"
          backgroundAlt="全国の協力農家の畑と生産者"
        />
        <ProducersDirectory />
      </main>
      <Footer />
    </div>
  );
}
