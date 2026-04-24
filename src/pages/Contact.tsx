import { useState } from "react";
import { Mail, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useReveal } from "@/hooks/use-reveal";

const inquiryTypes = [
  "仕入れ相談",
  "取扱品目相談",
  "供給体制の相談",
  "加工サービスの相談",
  "その他",
];

const ContactPage = () => {
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero
          number="10"
          en="Contact"
          ja="まずは、"
          accentJa="お気軽に"
          tailJa="どうぞ。"
          description="仕入れのご相談、取扱品目のお問い合わせ、供給体制のご相談など。お客様のご要望に合わせた最適なご提案をいたします。"
          breadcrumb={[{ label: "お問い合わせ" }]}
        />

        <section ref={ref} className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 md:w-72 h-64 wa-shippou opacity-50 pointer-events-none hidden md:block" />
          <div className="blob bg-matcha/15 w-[280px] h-[280px] bottom-20 -left-10 hidden md:block" />

          <div className="container relative">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4 reveal">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                  お電話でも<br />承ります。
                </h2>

                <a
                  href="tel:03-5432-8761"
                  className="group flex items-start gap-3 p-5 border-t-2 border-sun bg-secondary/60 hover:bg-secondary transition-smooth mb-4"
                >
                  <Phone className="h-5 w-5 mt-1 text-primary" />
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">Phone</div>
                    <div className="font-serif text-2xl font-bold text-foreground tabular-nums group-hover:text-primary transition-smooth">
                      03-5432-8761
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Mon–Fri · 9:00–18:00</div>
                  </div>
                </a>

                <a
                  href="mailto:info@wh-inc.example"
                  className="group flex items-start gap-3 p-5 border-t-2 border-primary bg-secondary/60 hover:bg-secondary transition-smooth"
                >
                  <Mail className="h-5 w-5 mt-1 text-primary" />
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">Email</div>
                    <div className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-smooth break-all">
                      info@wh-inc.example
                    </div>
                  </div>
                </a>

                <div className="mt-8 text-xs text-muted-foreground leading-loose">
                  通常2営業日以内に、担当者よりご連絡いたします。
                  内容によってはお時間をいただく場合がございます。
                </div>
              </div>

              <div className="lg:col-span-8 reveal delay-100">
                {submitted ? (
                  <div className="bg-secondary/60 border-t-2 border-sun p-8 md:p-12 text-center">
                    <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                      お問い合わせを受け付けました
                    </h3>
                    <p className="text-foreground/70 leading-loose max-w-lg mx-auto">
                      2営業日以内に担当者よりご連絡いたします。しばらくお待ちください。
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-8 rounded-none"
                    >
                      もう一件送信する
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">
                          会社名 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          required
                          className="mt-2 rounded-none h-12 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name" className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">
                          ご担当者名 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="mt-2 rounded-none h-12 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">
                          メールアドレス <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="mt-2 rounded-none h-12 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">
                          お電話番号
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="mt-2 rounded-none h-12 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="inquiry" className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">
                        お問い合わせ内容 <span className="text-destructive">*</span>
                      </Label>
                      <select
                        id="inquiry"
                        name="inquiry"
                        required
                        defaultValue=""
                        className="mt-2 w-full h-12 px-3 bg-background border border-border focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="" disabled>
                          選択してください
                        </option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-[10px] tracking-[0.25em] uppercase text-primary font-medium">
                        お問い合わせ詳細 <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={7}
                        placeholder="品目・数量・納品先地域など、ご相談内容をご記入ください。"
                        className="mt-2 rounded-none border-border focus-visible:ring-primary focus-visible:ring-offset-0"
                      />
                    </div>

                    <div className="flex items-start gap-3 text-xs text-foreground/70 leading-loose">
                      <input type="checkbox" required className="mt-0.5" />
                      <span>
                        <a href="/access#privacy" className="text-primary underline link-underline">個人情報保護方針</a>
                        に同意の上、送信します。
                      </span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="bg-foreground text-primary-foreground hover:bg-primary rounded-none h-14 px-10 tracking-[0.2em] uppercase text-xs group"
                    >
                      送信する
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
