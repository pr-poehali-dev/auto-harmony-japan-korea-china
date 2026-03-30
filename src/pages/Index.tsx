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
    // engine теперь хранится в куб.см как строка ("1000","1500","1800","2300","3000","9999")
    const engineCc = parseInt(calcForm.engine);
    const yearNum = parseInt(calcForm.year);
    const age = new Date().getFullYear() - yearNum;

    const EUR = 100; // курс EUR/RUB
    const USD = 90;  // курс USD/RUB
    const priceRub = price * USD;
    const priceEur = priceRub / EUR;

    let duty = 0; // пошлина

    if (calcForm.engineType === "electric") {
      // Электромобили: 15%
      duty = Math.round(priceRub * 0.15);
    } else if (age < 3) {
      // До 3 лет — max(% от стоимости, евро × куб.см)
      // Ставки ЕТС ЕАЭС для физлиц, Приложение 8
      type RateRow = { maxCc: number; pct: number; eurPerCc: number };
      const table: RateRow[] = [
        { maxCc: 1000, pct: 0.54, eurPerCc: 2.5 },
        { maxCc: 1500, pct: 0.48, eurPerCc: 3.5 },
        { maxCc: 1800, pct: 0.48, eurPerCc: 5.0 },
        { maxCc: 2300, pct: 0.48, eurPerCc: 7.5 },
        { maxCc: 3000, pct: 0.48, eurPerCc: 7.5 },
        { maxCc: 99999, pct: 0.48, eurPerCc: 15.0 },
      ];
      const row = table.find((r) => engineCc <= r.maxCc)!;
      duty = Math.round(Math.max(priceRub * row.pct, priceEur * row.eurPerCc * engineCc));
    } else if (age < 5) {
      // 3–5 лет — только евро × куб.см
      const table = [
        { maxCc: 1000, eurPerCc: 1.5 },
        { maxCc: 1500, eurPerCc: 1.7 },
        { maxCc: 1800, eurPerCc: 2.5 },
        { maxCc: 2300, eurPerCc: 2.7 },
        { maxCc: 3000, eurPerCc: 3.0 },
        { maxCc: 99999, eurPerCc: 3.6 },
      ];
      const row = table.find((r) => engineCc <= r.maxCc)!;
      duty = Math.round(priceEur * row.eurPerCc * engineCc);
    } else if (age < 7) {
      // 5–7 лет
      const table = [
        { maxCc: 1000, eurPerCc: 3.0 },
        { maxCc: 1500, eurPerCc: 3.2 },
        { maxCc: 1800, eurPerCc: 3.5 },
        { maxCc: 2300, eurPerCc: 4.8 },
        { maxCc: 3000, eurPerCc: 5.0 },
        { maxCc: 99999, eurPerCc: 5.7 },
      ];
      const row = table.find((r) => engineCc <= r.maxCc)!;
      duty = Math.round(priceEur * row.eurPerCc * engineCc);
    } else {
      // Старше 7 лет — те же ставки что 5–7
      const table = [
        { maxCc: 1000, eurPerCc: 3.0 },
        { maxCc: 1500, eurPerCc: 3.2 },
        { maxCc: 1800, eurPerCc: 3.5 },
        { maxCc: 2300, eurPerCc: 4.8 },
        { maxCc: 3000, eurPerCc: 5.0 },
        { maxCc: 99999, eurPerCc: 5.7 },
      ];
      const row = table.find((r) => engineCc <= r.maxCc)!;
      duty = Math.round(priceEur * row.eurPerCc * engineCc);
    }

    // Утилизационный сбор 2026 (базовая ставка 3 400 ₽ × коэффициент)
    // Коэффициенты для физлиц: возраст < 3 лет / ≥ 3 лет
    let utilFee = 0;
    if (calcForm.engineType === "electric") {
      utilFee = Math.round(3400 * (age < 3 ? 4.26 : 10.36));
    } else if (engineCc <= 1000) {
      utilFee = Math.round(3400 * (age < 3 ? 4.26 : 10.36));
    } else if (engineCc <= 1800) {
      utilFee = Math.round(3400 * (age < 3 ? 15.03 : 26.44));
    } else if (engineCc <= 2300) {
      utilFee = Math.round(3400 * (age < 3 ? 29.52 : 50.18));
    } else if (engineCc <= 3000) {
      utilFee = Math.round(3400 * (age < 3 ? 42.24 : 63.95));
    } else {
      utilFee = Math.round(3400 * (age < 3 ? 84.48 : 128.02));
    }

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