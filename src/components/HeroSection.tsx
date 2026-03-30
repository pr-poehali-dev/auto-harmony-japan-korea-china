import Icon from "@/components/ui/icon";

const STATS = [
  { val: "1200+", label: "Автомобилей доставлено" },
  { val: "7 лет", label: "На рынке" },
  { val: "98%", label: "Довольных клиентов" },
  { val: "30–60", label: "Дней до вашего авто" },
];

interface CalcForm {
  country: string;
  carPrice: string;
  engine: string;
  engineType: string;
  year: string;
}

interface CalcResult {
  customs: number;
  delivery: number;
  fee: number;
  total: number;
}

interface HeroSectionProps {
  scrollTo: (id: string) => void;
  calcForm: CalcForm;
  setCalcForm: (form: CalcForm) => void;
  calcResult: CalcResult | null;
  calculateCost: () => void;
  formatRub: (val: number) => string;
}

export default function HeroSection({ scrollTo, calcForm, setCalcForm, calcResult, calculateCost, formatRub }: HeroSectionProps) {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center hero-gradient grid-bg pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-400/5 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium animate-fade-in">
                <Icon name="Globe" size={14} />
                Япония · Корея · Китай
              </div>

              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                АВТО ИЗ АЗИИ
                <br />
                <span className="text-gradient">ПОД ЗАКАЗ</span>
                <br />
                <span className="text-muted-foreground text-4xl lg:text-5xl font-light">с доставкой</span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Подберём, выкупим и доставим любой автомобиль из Японии, Кореи или Китая.
                Полное таможенное оформление — под ключ.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <button
                  onClick={() => scrollTo("contacts")}
                  className="group flex items-center justify-center gap-2 px-8 py-4 stripe-accent rounded-lg font-display font-semibold text-white text-lg tracking-wide hover:opacity-90 transition-all glow-orange-sm"
                >
                  Оставить заявку
                  <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo("catalog")}
                  className="flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-lg font-display font-semibold text-foreground text-lg tracking-wide hover:border-primary hover:text-primary transition-all"
                >
                  Смотреть каталог
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                {STATS.map((s) => (
                  <div key={s.val} className="text-center">
                    <div className="font-display text-2xl font-bold text-primary">{s.val}</div>
                    <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in hidden lg:block" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden border border-border glow-orange">
                <img
                  src="https://cdn.poehali.dev/projects/482ff84a-6478-43bc-beb9-043ec99efc7f/files/1101810f-627c-4465-abc9-6a5f87ed86ae.jpg"
                  alt="Автомобиль из Японии"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground font-body">Среднее время доставки</div>
                    <div className="font-display text-2xl font-bold">35–60 дней</div>
                  </div>
                  <div className="px-4 py-2 stripe-accent rounded-lg text-white font-display font-semibold text-sm">
                    🇯🇵 Япония
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 stripe-accent rounded-full opacity-10 blur-2xl" />
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-orange-400 rounded-full opacity-5 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
                <Icon name="Calculator" size={14} />
                Онлайн-калькулятор
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                РАССЧИТАЙТЕ СТОИМОСТЬ
              </h2>
              <p className="text-muted-foreground mt-3">
                Узнайте примерную итоговую стоимость с учётом доставки и таможни
              </p>
            </div>

            <div className="bg-background rounded-2xl border border-border p-6 lg:p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Страна</label>
                  <select
                    value={calcForm.country}
                    onChange={(e) => setCalcForm({ ...calcForm, country: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="japan">🇯🇵 Япония</option>
                    <option value="korea">🇰🇷 Корея</option>
                    <option value="china">🇨🇳 Китай</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Стоимость авто (USD)</label>
                  <input
                    type="number"
                    placeholder="Например: 15000"
                    value={calcForm.carPrice}
                    onChange={(e) => setCalcForm({ ...calcForm, carPrice: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Год выпуска</label>
                  <select
                    value={calcForm.year}
                    onChange={(e) => setCalcForm({ ...calcForm, year: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Объём двигателя (л)</label>
                  <select
                    value={calcForm.engine}
                    onChange={(e) => setCalcForm({ ...calcForm, engine: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="1000">до 1 000 куб.см</option>
                    <option value="1500">1 000 – 1 500 куб.см</option>
                    <option value="1800">1 500 – 1 800 куб.см</option>
                    <option value="2300">1 800 – 2 300 куб.см</option>
                    <option value="3000">2 300 – 3 000 куб.см</option>
                    <option value="9999">более 3 000 куб.см</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Тип двигателя</label>
                  <select
                    value={calcForm.engineType}
                    onChange={(e) => setCalcForm({ ...calcForm, engineType: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="petrol">Бензин</option>
                    <option value="diesel">Дизель</option>
                    <option value="hybrid">Гибрид</option>
                    <option value="electric">Электро</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={calculateCost}
                    className="w-full px-6 py-3 stripe-accent rounded-lg font-display font-semibold text-white text-lg tracking-wide hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="Calculator" size={20} />
                    Рассчитать
                  </button>
                </div>
              </div>

              {calcResult && (
                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in">
                  <h3 className="font-display text-xl font-semibold mb-4 text-primary">Результат расчёта</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-muted-foreground text-xs mb-1">Авто (по курсу)</div>
                      <div className="font-display text-lg font-bold text-foreground">
                        {formatRub((parseFloat(calcForm.carPrice) || 0) * 90)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-muted-foreground text-xs mb-1">Таможня</div>
                      <div className="font-display text-lg font-bold text-orange-400">
                        {formatRub(calcResult.customs)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg border border-border">
                      <div className="text-muted-foreground text-xs mb-1">Доставка</div>
                      <div className="font-display text-lg font-bold text-foreground">
                        {formatRub(calcResult.delivery)}
                      </div>
                    </div>
                    <div className="text-center p-4 stripe-accent rounded-lg">
                      <div className="text-white/80 text-xs mb-1">ИТОГО ПОД КЛЮЧ</div>
                      <div className="font-display text-xl font-bold text-white">
                        {formatRub(calcResult.total)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-muted-foreground text-xs text-center sm:text-left">
                      * Расчёт ориентировочный. Ставки таможенных пошлин и утилсбора актуальны на 2026 год.
                      Курс USD ≈ 90 ₽, EUR ≈ 100 ₽.
                    </p>
                    <a
                      href="https://www.tks.ru/auto/calc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-primary/40 text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors"
                    >
                      <Icon name="ExternalLink" size={14} />
                      Уточнить на tks.ru
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}