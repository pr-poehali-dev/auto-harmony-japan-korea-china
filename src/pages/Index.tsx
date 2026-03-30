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
    const engineCc = parseFloat(calcForm.engine) * 1000;
    const yearNum = parseInt(calcForm.year);
    const age = new Date().getFullYear() - yearNum;

    // Курс ЦБ (примерный, актуальный на 2026)
    const eurRate = 100;
    const usdRate = 90;
    const priceEur = price * (usdRate / eurRate);

    let customs = 0;

    if (calcForm.engineType === "electric") {
      // Электромобили: 15% от таможенной стоимости (с 1 апреля 2025 льгота отменена)
      customs = Math.round(price * usdRate * 0.15);
    } else if (age < 3) {
      // До 3 лет: max(%, минимум €/куб.см) — ставки ЕТС для физлиц
      const rates: [number, number][] = [
        [1000, 0.54, 2.5],
        [1500, 0.48, 3.5],
        [1800, 0.48, 5.0],
        [2300, 0.48, 7.5],
        [3000, 0.48, 7.5],
        [Infinity, 0.48, 15.0],
      ].map(([limit, pct, perCc]) => [limit as number, Math.max(price * usdRate * (pct as number), priceEur * (perCc as number) * engineCc)]) as [number, number][];
      const buckets = [1000, 1500, 1800, 2300, 3000, Infinity];
      const perCcRates = [2.5, 3.5, 5.0, 7.5, 7.5, 15.0];
      const pctRates = [0.54, 0.48, 0.48, 0.48, 0.48, 0.48];
      const idx = buckets.findIndex((b) => engineCc <= b);
      customs = Math.round(Math.max(
        price * usdRate * pctRates[idx],
        priceEur * perCcRates[idx] * engineCc
      ));
    } else if (age < 5) {
      // 3–5 лет
      const buckets = [1000, 1500, 1800, 2300, 3000, Infinity];
      const perCcRates = [1.5, 1.7, 2.5, 2.7, 3.0, 3.6];
      const idx = buckets.findIndex((b) => engineCc <= b);
      customs = Math.round(priceEur * perCcRates[idx] * engineCc);
    } else if (age < 7) {
      // 5–7 лет
      const buckets = [1000, 1500, 1800, 2300, 3000, Infinity];
      const perCcRates = [3.0, 3.2, 3.5, 4.8, 5.0, 5.7];
      const idx = buckets.findIndex((b) => engineCc <= b);
      customs = Math.round(priceEur * perCcRates[idx] * engineCc);
    } else {
      // Старше 7 лет
      const buckets = [1000, 1500, 1800, 2300, 3000, Infinity];
      const perCcRates = [3.0, 3.2, 3.5, 4.8, 5.0, 5.7];
      const idx = buckets.findIndex((b) => engineCc <= b);
      customs = Math.round(priceEur * perCcRates[idx] * engineCc);
    }

    // Утилизационный сбор для физлиц (ставки 2025-2026)
    let utilFee = 0;
    if (calcForm.engineType !== "electric") {
      if (engineCc <= 1000) utilFee = age < 3 ? 3400 * 4.26 : 3400 * 10.36;
      else if (engineCc <= 2000) utilFee = age < 3 ? 3400 * 15.03 : 3400 * 26.44;
      else if (engineCc <= 3000) utilFee = age < 3 ? 3400 * 42.24 : 3400 * 63.95;
      else utilFee = age < 3 ? 3400 * 84.48 : 3400 * 128.02;
    } else {
      utilFee = age < 3 ? 3400 * 4.26 : 3400 * 10.36;
    }

    const deliveryCosts: Record<string, number> = {
      japan: 180000,
      korea: 140000,
      china: 90000,
    };
    const delivery = deliveryCosts[calcForm.country] || 180000;
    const fee = 120000;
    const total = Math.round(price * usdRate + customs + Math.round(utilFee) + delivery + fee);

    setCalcResult({ customs: customs + Math.round(utilFee), delivery, fee, total });
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