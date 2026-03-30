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

interface ContactsSectionProps {
  scrollTo: (id: string) => void;
}

export default function ContactsSection({ scrollTo }: ContactsSectionProps) {
  return (
    <>
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
                  { icon: "Phone", title: "Телефон", value: "8 (924) 605-52-66", sub: "Основной" },
                  { icon: "Phone", title: "Телефон", value: "8 (964) 124-90-07", sub: "Дополнительный" },
                  { icon: "Mail", title: "Email", value: "exalted.man555@gmail.com", sub: "Для деловых запросов" },
                  { icon: "Clock", title: "Режим работы", value: "Пн–Сб 9:00–20:00", sub: "Воскресенье — выходной" },
                  { icon: "MapPin", title: "Адрес", value: "Иркутск", sub: "Головной офис" },
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
    </>
  );
}