import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-foreground">Aida</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              ¿Cómo funciona?
            </button>
            <button 
              onClick={() => scrollToSection('beneficios')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Beneficios
            </button>
            <button 
              onClick={() => scrollToSection('iniciar')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Iniciar
            </button>
          </nav>
          
          <Button className="btn-primary">
            Comienza gratis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;