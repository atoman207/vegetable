import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Network } from "@/components/site/Network";
import { Producers as ProducersSection } from "@/components/site/Producers";

const ProducersPage = () => {
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
          description="北海道から沖縄まで。全国200軒を超える協力農家との連携が、季節を問わない安定供給を支えています。"
          breadcrumb={[{ label: "生産者紹介" }]}
        />
        <Network />
        <ProducersSection />
      </main>
      <Footer />
    </div>
  );
};

export default ProducersPage;
