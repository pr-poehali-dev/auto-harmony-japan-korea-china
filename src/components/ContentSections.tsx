import Icon from "@/components/ui/icon";

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

interface ContentSectionsProps {
  scrollTo: (id: string) => void;
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}

export default function ContentSections({ scrollTo, openFaq, setOpenFaq }: ContentSectionsProps) {
  return (
    <>
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
    </>
  );
}
