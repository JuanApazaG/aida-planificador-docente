import { Button } from "@/components/ui/button";
import { useState } from "react";
import logoAida from "@/assets/logo_aida.png";

const Header = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleCTAClick = () => {
    scrollToSection('registro');
  };

  const navItems = [
    { label: "¿Cómo funciona?", id: "proceso" },
    { label: "Beneficios", id: "ahorro-tiempo" },
    { label: "Iniciar", id: "registro" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
              <img src={logoAida} alt="Logo Aida" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Aida
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button 
                key={item.id}
                className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  activeButton === item.id 
                    ? 'text-primary bg-primary/10 border border-primary/20' 
                    : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                }`}
                onClick={() => {
                  setActiveButton(item.id);
                  scrollToSection(item.id);
                }}
                onMouseEnter={() => setActiveButton(item.id)}
                onMouseLeave={() => setActiveButton(null)}
              >
                <span className="relative z-10">{item.label}</span>
                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  activeButton === item.id 
                    ? 'bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20' 
                    : 'bg-transparent group-hover:bg-gradient-to-r group-hover:from-muted/30 group-hover:to-muted/10'
                }`}></div>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="relative">
            <Button 
              className="relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group overflow-hidden"
              onClick={handleCTAClick}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>🚀</span>
                <span>Comienza gratis</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;