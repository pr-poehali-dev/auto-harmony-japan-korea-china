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

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  scrollTo: (id: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Navbar({ activeSection, mobileMenuOpen, scrollTo, setMobileMenuOpen }: NavbarProps) {
  return (
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
            href="tel:+79246055266"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-orange-400 transition-colors"
          >
            <Icon name="Phone" size={16} />
            8 (924) 605-52-66
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
            <a href="tel:+79246055266" className="text-primary font-medium py-2 flex items-center gap-2">
              <Icon name="Phone" size={16} />
              8 (924) 605-52-66
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
