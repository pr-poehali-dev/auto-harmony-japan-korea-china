import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "how", label: "Как заказать" },
  { id: "about", label: "О компании" },
  { id: "faq", label: "FAQ" },
  { id: "blog", label: "Блог" },
  { id: "contacts", label: "Контакты" },
];

const CATALOG_CARS = [
  {
    country: "🇯🇵 Япония",
    brand: "Toyota Land Cruiser 300",
    year: "2022",
    price: "от 8 200 000 ₽",
    img: "https://cdn.poehali.dev/projects/482ff84a-6478-43bc-beb9-043ec99efc7f/files/1101810f-627c-4465-abc9-6a5f87ed86ae.jpg",
    tag: "Хит",
    tagColor: "bg-orange-500",
  },
  {
    country: "🇰🇷 Корея",
    brand: "Genesis GV80",
    year: "2023",
    price: "от 5 400 000 ₽",
    img: "https://cdn.poehali.dev/projects/482ff84a-6478-43bc-beb9-043ec99efc7f/files/3771485d-3680-4462-b424-26695023aa50.jpg",
    tag: "Новинка",
    tagColor: "bg-blue-500",
  },
  {
    country: "🇨🇳 Китай",
    brand: "Li Auto L9",
    year: "2024",
    price: "от 4 100 000 ₽",
    img: "https://cdn.poehali.dev/projects/482ff84a-6478-43bc-beb9-043ec99efc7f/files/c045dd0f-5b0c-453c-8bae-c796e7657368.jpg",
    tag: "Выгодно",
    tagColor: "bg-green-600",
  },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Заявка",
    desc: "Оставляете заявку с желаемой маркой, моделью, годом и бюджетом. Наш менеджер свяжется в течение 1 часа.",
    icon: "MessageSquare",
  },
  {
    num: "02",
    title: "Подбор",
    desc: "Находим автомобиль на аукционах Японии, Кореи или дилерах Китая. Присылаем фото и отчёт о состоянии.",
    icon: "Search",
  },
  {
    num: "03",
    title: "Покупка",
    desc: "Вы подтверждаете выбор и вносите предоплату. Покупаем автомобиль и оформляем все документы.",
    icon: "ShoppingCart",
  },
  {
    num: "04",
    title: "Доставка",
    desc: "Доставляем морем до Владивостока, затем авто-транспортом в ваш город. Срок 30–60 дней.",
    icon: "Ship",
  },
  {
    num: "05",
    title: "Таможня",
    desc: "Полностью берём на себя таможенное оформление, уплату пошлин и получение ПТС.",
    icon: "FileCheck",
  },
  {
    num: "06",
    title: "Передача",
    desc: "Вы получаете готовый автомобиль с ПТС и гарантией юридической чистоты.",
    icon: "Key",
  },
];

const FAQ_ITEMS = [
  {
    q: "Сколько времени занимает доставка автомобиля?",
    a: "В среднем 35–60 дней с момента покупки на аукционе до получения вами ключей. Япония — 35–45 дней, Корея — 30–40 дней, Китай — 20–35 дней.",
  },
  {
    q: "Как рассчитывается итоговая стоимость?",
    a: "Итоговая цена = стоимость авто на аукционе + доставка до РФ + таможенные пошлины и сборы + наше вознаграждение. Точный расчёт делаем бесплатно после выбора модели.",
  },
  {
    q: "Можно ли посмотреть автомобиль перед покупкой?",
    a: "Предоставляем подробные фото и видео, отчёт об аукционной оценке состояния (баллы износа), историю обслуживания. При желании можно заказать независимую инспекцию.",
  },
  {
    q: "Что входит в таможенное оформление?",
    a: "Полный комплекс: декларирование, уплата таможенных пошлин, НДС, утилизационного сбора, оформление СБКТС и ПТС. Никаких скрытых платежей.",
  },
  {
    q: "Какая гарантия, что всё пройдёт честно?",
    a: "Работаем официально с 2018 года, более 1200 довольных клиентов. Подписываем договор с фиксированными условиями, принимаем оплату на юрлицо.",
  },
  {
    q: "Какие страны доступны для заказа?",
    a: "Японские аукционы USS, JAA, TAA, HAA — более 200 000 лотов. Корейские дилеры KIA, Hyundai, Genesis. Китайские производители BYD, Li Auto, Zeekr, AITO и другие.",
  },
];

const BLOG_POSTS = [
  {
    date: "12 марта 2025",
    tag: "Гайд",
    title: "Как выбрать автомобиль на японском аукционе: полный гайд",
    desc: "Разбираем систему оценок, баллов кузова и механики. На что смотреть в первую очередь и каких лотов избегать.",
  },
  {
    date: "28 февраля 2025",
    tag: "Новости",
    title: "Изменения в таможенных пошлинах 2025: что важно знать",
    desc: "Обзор актуальных ставок утилизационного сбора и таможенных пошлин для электромобилей и гибридов.",
  },
  {
    date: "15 февраля 2025",
    tag: "Обзор",
    title: "Топ-5 китайских электромобилей, которые уже едут в Россию",
    desc: "BYD Seal, Li Auto L9, Zeekr 001 — подробный разбор, цены с учётом таможни и реальные отзывы.",
  },
];

const STATS = [
  { val: "1200+", label: "Автомобилей доставлено" },
  { val: "7 лет", label: "На рынке" },
  { val: "98%", label: "Довольных клиентов" },
  { val: "30–60", label: "Дней до вашего авто" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcForm, setCalcForm] = useState({
    country: "japan",
    carPrice: "",
    engine: "2.0",
    engineType: "petrol",
    year: "2020",
  });
  const [calcResult, setCalcResult] = useState<null | {
    customs: number;
    delivery: number;
    fee: number;
    total: number;
  }>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const calculateCost = () => {
    const price = parseFloat(calcForm.carPrice) || 0;
    const engineVol = parseFloat(calcForm.engine);
    const yearNum = parseInt(calcForm.year);
    const age = 2025 - yearNum;

    let customsRate = 0;
    let excise = 0;

    if (calcForm.engineType === "electric") {
      customsRate = 0.15;
      excise = 0;
    } else if (age < 3) {
      customsRate = 0.48;
      excise = engineVol <= 1.0 ? 0 : engineVol <= 2.0 ? engineVol * 3 * 1000 : engineVol * 7.5 * 1000;
    } else if (age < 5) {
      customsRate = 0.43;
      excise = engineVol <= 1.0 ? 0 : engineVol <= 2.0 ? engineVol * 3 * 1000 : engineVol * 7.5 * 1000;
    } else {
      customsRate = 0.38;
      excise = engineVol <= 1.0 ? 0 : engineVol <= 2.0 ? engineVol * 3 * 1000 : engineVol * 7.5 * 1000;
    }

    const usdRate = 90;
    const priceRub = price * usdRate;
    const customs = Math.round(priceRub * customsRate + excise);

    const deliveryCosts: Record<string, number> = {
      japan: 180000,
      korea: 140000,
      china: 90000,
    };
    const delivery = deliveryCosts[calcForm.country] || 180000;
    const fee = 120000;
    const total = Math.round(priceRub + customs + delivery + fee);

    setCalcResult({ customs, delivery, fee, total });
  };

  const formatRub = (val: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 stripe-accent rounded-sm flex items-center justify-center">
              <Icon name="Car" size={18} className="text-white" />
            </div>
            <span className="font-display text-xl font-semibold tracking-wide">
              ГАРМОНИЯ <span className="text-primary">АВТО</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link font-body text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-primary active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+78001234567"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-orange-400 transition-colors"
            >
              <Icon name="Phone" size={16} />
              8-800-123-45-67
            </a>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-sm font-medium py-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a href="tel:+78001234567" className="text-primary font-medium py-2 flex items-center gap-2">
                <Icon name="Phone" size={16} />
                8-800-123-45-67
              </a>
            </div>
          </div>
        )}
      </nav>

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
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Цена авто (USD)</label>
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
                    <option value="1.0">до 1.0</option>
                    <option value="1.4">1.0 – 1.5</option>
                    <option value="1.8">1.5 – 2.0</option>
                    <option value="2.0">2.0 – 2.5</option>
                    <option value="3.0">2.5 – 3.5</option>
                    <option value="4.0">более 3.5</option>
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
                  <p className="text-muted-foreground text-xs mt-4 text-center">
                    * Расчёт ориентировочный. Точная стоимость зависит от комплектации и актуального курса USD.
                    Курс USD = 90 ₽.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
              <Icon name="LayoutGrid" size={14} />
              Каталог
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">ПОПУЛЯРНЫЕ МОДЕЛИ</h2>
            <p className="text-muted-foreground mt-3">Реальные предложения с актуальными ценами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {CATALOG_CARS.map((car, i) => (
              <div
                key={i}
                className="group bg-card border border-border rounded-2xl overflow-hidden card-hover"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 ${car.tagColor} rounded-full text-white text-xs font-semibold`}>
                    {car.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="text-muted-foreground text-sm mb-1">{car.country} · {car.year}</div>
                  <h3 className="font-display text-xl font-semibold mb-3">{car.brand}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-muted-foreground text-xs">Стоимость под ключ</div>
                      <div className="font-display text-lg font-bold text-primary">{car.price}</div>
                    </div>
                    <button
                      onClick={() => scrollTo("contacts")}
                      className="px-4 py-2 stripe-accent rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => scrollTo("contacts")}
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary rounded-lg font-display font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Подобрать другую модель
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section id="how" className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
              <Icon name="ListChecks" size={14} />
              Процесс
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">КАК РАБОТАЕТ ЗАКАЗ</h2>
            <p className="text-muted-foreground mt-3">6 простых шагов до вашего нового автомобиля</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="relative group bg-background rounded-2xl border border-border p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 stripe-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon name={step.icon} size={24} className="text-white" fallback="Circle" />
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-bold text-primary/20 leading-none mb-1">{step.num}</div>
                    <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                <Icon name="Building2" size={14} />
                О компании
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
                МЫ — ВАШИ ПАРТНЁРЫ
                <br />
                <span className="text-gradient">НА РЫНКЕ АЗИИ</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  С 2018 года «Гармония АВТО» помогает россиянам получить автомобили мечты из Японии,
                  Кореи и Китая по честным ценам без посредников и переплат.
                </p>
                <p>
                  Мы работаем напрямую с японскими аукционами USS, JAA и TAA, имеем официальных
                  партнёров среди корейских дилеров и прямые контракты с китайскими производителями.
                </p>
                <p>
                  Наша команда — это опытные специалисты по таможенному оформлению, логистике и
                  аукционным закупкам. Более 1200 автомобилей уже на дорогах России.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "ShieldCheck", text: "Официальный договор" },
                  { icon: "Banknote", text: "Фиксированная цена" },
                  { icon: "Globe", text: "Прямые поставки" },
                  { icon: "Headphones", text: "Поддержка 24/7" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                    <div className="w-10 h-10 stripe-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={18} className="text-white" fallback="Check" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border">
                <img
                  src="https://cdn.poehali.dev/projects/482ff84a-6478-43bc-beb9-043ec99efc7f/files/c045dd0f-5b0c-453c-8bae-c796e7657368.jpg"
                  alt="Доставка автомобилей"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 stripe-accent rounded-xl flex items-center justify-center">
                    <Icon name="Trophy" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">1200+</div>
                    <div className="text-muted-foreground text-sm">авто доставлено</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
                <Icon name="HelpCircle" size={14} />
                FAQ
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold">ЧАСТЫЕ ВОПРОСЫ</h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-background border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-display text-lg font-medium pr-4">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={20}
                      className={`flex-shrink-0 transition-colors ${openFaq === i ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
              <Icon name="BookOpen" size={14} />
              Блог
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">ПОЛЕЗНЫЕ СТАТЬИ</h2>
            <p className="text-muted-foreground mt-3">Всё об авто из Азии — честно и по делу</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <article
                key={i}
                className="group bg-card border border-border rounded-2xl p-6 card-hover cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 stripe-accent rounded-full text-white text-xs font-semibold">
                    {post.tag}
                  </span>
                  <span className="text-muted-foreground text-xs">{post.date}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Читать далее <Icon name="ArrowRight" size={16} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4">
                <Icon name="Mail" size={14} />
                Контакты
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold">ОСТАВЬТЕ ЗАЯВКУ</h2>
              <p className="text-muted-foreground mt-3">Ответим в течение 1 часа в рабочее время</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 bg-background rounded-2xl border border-border p-6 lg:p-8">
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Телефон</label>
                      <input
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Желаемый автомобиль</label>
                    <input
                      type="text"
                      placeholder="Например: Toyota RAV4 2022, до 3 500 000 ₽"
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Страна</label>
                    <select className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors">
                      <option value="">Не важно, подберите лучший вариант</option>
                      <option value="japan">🇯🇵 Япония</option>
                      <option value="korea">🇰🇷 Корея</option>
                      <option value="china">🇨🇳 Китай</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      placeholder="Дополнительные пожелания: цвет, комплектация, срок покупки..."
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button className="w-full py-4 stripe-accent rounded-lg font-display font-bold text-white text-lg tracking-wide hover:opacity-90 transition-all glow-orange-sm flex items-center justify-center gap-2">
                    <Icon name="Send" size={20} />
                    Отправить заявку
                  </button>

                  <p className="text-muted-foreground text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-5">
                {[
                  { icon: "Phone", title: "Телефон", value: "8-800-123-45-67", sub: "Бесплатно по России" },
                  { icon: "MessageCircle", title: "WhatsApp / Telegram", value: "+7 (999) 123-45-67", sub: "Ответим быстро" },
                  { icon: "Mail", title: "Email", value: "info@garmoniya-avto.ru", sub: "Для деловых запросов" },
                  { icon: "Clock", title: "Режим работы", value: "Пн–Сб 9:00–20:00", sub: "Воскресенье — выходной" },
                  { icon: "MapPin", title: "Адрес", value: "Владивосток, ул. Светланская, 1", sub: "Головной офис" },
                ].map((contact, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-background border border-border rounded-xl">
                    <div className="w-12 h-12 stripe-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon} size={20} className="text-white" fallback="Circle" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">{contact.title}</div>
                      <div className="font-medium text-foreground">{contact.value}</div>
                      <div className="text-muted-foreground text-xs">{contact.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 stripe-accent rounded-sm flex items-center justify-center">
                <Icon name="Car" size={18} className="text-white" />
              </div>
              <span className="font-display text-lg font-semibold">
                ГАРМОНИЯ <span className="text-primary">АВТО</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="text-muted-foreground text-sm text-center">
              © 2025 Гармония АВТО. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}