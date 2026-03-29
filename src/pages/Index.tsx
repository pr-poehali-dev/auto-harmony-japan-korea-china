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
