import { Button } from "@/components/ui/button";
import { HighlightGroup, HighlighterItem, Particles } from "@/components/ui/highlighter";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { useState } from "react";

const AnimatedNav = () => {
  const [active, setActive] = useState<string | null>(null);
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Menu setActive={setActive}>
      <MenuItem setActive={setActive} active={active} item="¿Cómo funciona?">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink onClick={() => scrollToSection('proceso')}>
            Proceso de generación
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('caracteristicas')}>
            Características principales
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('ejemplos')}>
            Ejemplos de PDC
          </HoveredLink>
        </div>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Beneficios">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink onClick={() => scrollToSection('ahorro-tiempo')}>
            Ahorro de tiempo
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('calidad')}>
            Calidad educativa
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('facilidad')}>
            Facilidad de uso
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('soporte')}>
            Soporte continuo
          </HoveredLink>
        </div>
      </MenuItem>
      <MenuItem setActive={setActive} active={active} item="Iniciar">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink onClick={() => scrollToSection('registro')}>
            Crear cuenta gratuita
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('tutorial')}>
            Tutorial paso a paso
          </HoveredLink>
          <HoveredLink onClick={() => scrollToSection('precios')}>
            Ver planes
          </HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  );
};

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <HighlightGroup className="group">
          <HighlighterItem className="rounded-xl">
            <div className="relative overflow-hidden rounded-xl border border-border/20 bg-background/95 backdrop-blur-sm">
              <Particles
                className="absolute inset-0 -z-10 opacity-20 transition-opacity duration-1000 ease-in-out group-hover:opacity-40"
                quantity={60}
                color={"#3A7BF5"}
                vy={-0.1}
              />
              <div className="flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Aida</span>
                </div>

                {/* Navigation - Desktop */}
                <div className="hidden md:block">
                  <AnimatedNav />
                </div>

                {/* CTA Button */}
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
                  Comienza gratis
                </Button>
              </div>
            </div>
          </HighlighterItem>
        </HighlightGroup>
      </div>
    </header>
  );
};

export default Header;