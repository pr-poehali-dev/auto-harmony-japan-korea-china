import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContentSections from "@/components/ContentSections";
import ContactsSection from "@/components/ContactsSection";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcForm, setCalcForm] = useState({
    country: "japan",
    carPrice: "",
    engine: "1800",
    engineType: "petrol",
    year: "2022",
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
    const engineCc = parseInt(calcForm.engine);
    const yearNum = parseInt(calcForm.year);
    const age = new Date().getFullYear() - yearNum;

    const EUR = 100; // курс EUR/RUB (примерный)
    const USD = 90;  // курс USD/RUB (примерный)
    const priceRub = price * USD;
    const priceEur = priceRub / EUR;

    let duty = 0;

    if (calcForm.engineType === "electric") {
      // Электромобили: 15% от тамстоимости
      duty = Math.round(priceRub * 0.15);
    } else if (age < 3) {
      // До 3 лет: ставка зависит от СТОИМОСТИ в евро (Решение Совета ЕЭК № 107, Приложение 2, Таблица 2)
      // max(% от стоимости, евро/куб.см × объём)
      type Row = { maxEur: number; pct: number; eurPerCc: number };
      const table: Row[] = [
        { maxEur: 8500,   pct: 0.54, eurPerCc: 2.5  },
        { maxEur: 16700,  pct: 0.48, eurPerCc: 3.5  },
        { maxEur: 42300,  pct: 0.48, eurPerCc: 5.5  },
        { maxEur: 84500,  pct: 0.48, eurPerCc: 7.5  },
        { maxEur: 169000, pct: 0.48, eurPerCc: 15.0 },
        { maxEur: Infinity, pct: 0.48, eurPerCc: 20.0 },
      ];
      const row = table.find((r) => priceEur <= r.maxEur)!;
      duty = Math.round(Math.max(priceRub * row.pct, row.eurPerCc * engineCc * EUR));
    } else if (age < 5) {
      // 3–5 лет: только евро/куб.см (Таблица 3)
      const table = [
        { maxCc: 1000,  eurPerCc: 1.5 },
        { maxCc: 1500,  eurPerCc: 1.7 },
        { maxCc: 1800,  eurPerCc: 2.5 },
        { maxCc: 2300,  eurPerCc: 2.7 },
        { maxCc: 3000,  eurPerCc: 3.0 },
        { maxCc: 99999, eurPerCc: 3.6 },
      ];
      const row = table.find((r) => engineCc <= r.maxCc)!;
      duty = Math.round(row.eurPerCc * engineCc * EUR);
    } else {
      // Старше 5 лет: только евро/куб.см (Таблица 3)
      const table = [
        { maxCc: 1000,  eurPerCc: 3.0 },
        { maxCc: 1500,  eurPerCc: 3.2 },
        { maxCc: 1800,  eurPerCc: 3.5 },
        { maxCc: 2300,  eurPerCc: 4.8 },
        { maxCc: 3000,  eurPerCc: 5.0 },
        { maxCc: 99999, eurPerCc: 5.7 },
      ];
      const row = table.find((r) => engineCc <= r.maxCc)!;
      duty = Math.round(row.eurPerCc * engineCc * EUR);
    }

    // Утилизационный сбор с 01.12.2025 (Постановление Правительства № 1713)
    // Физлица до 160 л.с. — льготная фиксированная ставка
    // Физлица свыше 160 л.с. — коммерческие ставки (базовая 20 000 ₽ × коэффициент)
    // В калькуляторе мощность неизвестна, применяем льготную (до 160 л.с.) — самый частый случай из Японии/Кореи
    const utilFee = age < 3 ? 3400 : 5200;

    const deliveryCosts: Record<string, number> = {
      japan: 180000,
      korea: 140000,
      china: 90000,
    };
    const delivery = deliveryCosts[calcForm.country] || 180000;
    const fee = 120000;
    const customs = duty + utilFee;
    const total = Math.round(priceRub + customs + delivery + fee);

    setCalcResult({ customs, delivery, fee, total });
  };

  const formatRub = (val: number) =>
    new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        scrollTo={scrollTo}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection
        scrollTo={scrollTo}
        calcForm={calcForm}
        setCalcForm={setCalcForm}
        calcResult={calcResult}
        calculateCost={calculateCost}
        formatRub={formatRub}
      />
      <ContentSections
        scrollTo={scrollTo}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />
      <ContactsSection scrollTo={scrollTo} />
    </div>
  );
}