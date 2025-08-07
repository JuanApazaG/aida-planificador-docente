import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    {
      label: "¿Cómo funciona?",
      items: [
        { label: "Proceso de generación", id: "proceso" },
        { label: "Características principales", id: "caracteristicas" },
        { label: "Ejemplos de PDC", id: "ejemplos" }
      ]
    },
    {
      label: "Beneficios",
      items: [
        { label: "Ahorro de tiempo", id: "ahorro-tiempo" },
        { label: "Calidad educativa", id: "calidad" },
        { label: "Facilidad de uso", id: "facilidad" },
        { label: "Soporte continuo", id: "soporte" }
      ]
    },
    {
      label: "Iniciar",
      items: [
        { label: "Crear cuenta gratuita", id: "registro" },
        { label: "Tutorial paso a paso", id: "tutorial" },
        { label: "Ver planes", id: "precios" }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl border border-border/20 bg-background/95 backdrop-blur-sm shadow-lg">
          <div className="flex items-center justify-between py-4 px-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">Aida</span>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((menu) => (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(menu.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted/50">
                    {menu.label}
                  </button>
                  
                  {activeMenu === menu.label && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 pt-2 z-50">
                      <div className="bg-background/95 backdrop-blur-sm rounded-2xl border border-border/20 shadow-xl min-w-[200px] p-4">
                        <div className="flex flex-col space-y-2">
                          {menu.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => scrollToSection(item.id)}
                              className="text-left text-muted-foreground hover:text-primary transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-muted/30"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              onClick={() => scrollToSection('registro')}
            >
              Comienza gratis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;