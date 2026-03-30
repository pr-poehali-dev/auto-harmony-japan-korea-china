import { useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

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
  const [form, setForm] = useState({ name: "", phone: "", car: "", country: "", comment: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(func2url["send-lead"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", car: "", country: "", comment: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-16 h-16 stripe-accent rounded-full flex items-center justify-center">
                      <Icon name="Check" size={32} className="text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">Заявка отправлена!</h3>
                    <p className="text-muted-foreground">Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 px-6 py-2 border border-border rounded-lg text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      Отправить ещё одну
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Ваше имя *</label>
                        <input
                          type="text"
                          placeholder="Иван Иванов"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Телефон *</label>
                        <input
                          type="tel"
                          placeholder="+7 (999) 000-00-00"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Желаемый автомобиль</label>
                      <input
                        type="text"
                        placeholder="Например: Toyota RAV4 2022, до 3 500 000 ₽"
                        value={form.car}
                        onChange={(e) => setForm({ ...form, car: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Страна</label>
                      <select
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Не важно, подберите лучший вариант</option>
                        <option value="Япония">🇯🇵 Япония</option>
                        <option value="Корея">🇰🇷 Корея</option>
                        <option value="Китай">🇨🇳 Китай</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Комментарий</label>
                      <textarea
                        rows={3}
                        placeholder="Дополнительные пожелания: цвет, комплектация, срок покупки..."
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-400 text-sm">
                        {!form.name.trim() || !form.phone.trim()
                          ? "Пожалуйста, заполните имя и телефон"
                          : "Ошибка отправки. Попробуйте ещё раз или позвоните нам."}
                      </p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="w-full py-4 stripe-accent rounded-lg font-display font-bold text-white text-lg tracking-wide hover:opacity-90 transition-all glow-orange-sm flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <><Icon name="Loader" size={20} className="animate-spin" /> Отправляем...</>
                      ) : (
                        <><Icon name="Send" size={20} /> Отправить заявку</>
                      )}
                    </button>

                    <p className="text-muted-foreground text-xs text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                )}
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
