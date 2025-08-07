import { Button } from "@/components/ui/button";
import { HighlightGroup, HighlighterItem, Particles } from "@/components/ui/highlighter";

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
                <nav className="hidden md:flex items-center space-x-8">
                  <button 
                    onClick={() => scrollToSection('como-funciona')}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group/link"
                  >
                    <span className="relative z-10">¿Cómo funciona?</span>
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></div>
                  </button>
                  <button 
                    onClick={() => scrollToSection('beneficios')}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group/link"
                  >
                    <span className="relative z-10">Beneficios</span>
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></div>
                  </button>
                  <button 
                    onClick={() => scrollToSection('iniciar')}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group/link"
                  >
                    <span className="relative z-10">Iniciar</span>
                    <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></div>
                  </button>
                </nav>

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