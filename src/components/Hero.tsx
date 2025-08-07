import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import pdcMockup from "@/assets/pdc-mockup.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const handleGeneratePDC = () => {
    navigate("/generar-pdc");
  };

  return (
    <section id="registro" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/30 via-background to-primary-light/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(58,123,245,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <div className="space-y-6">
              
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Redacta tu PDC en{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  minutos
                </span>
                , no en horas.
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Con Aida, solo sube tu PAT y selecciona los contenidos: generamos tu Plan de Desarrollo Curricular mensual o quincenal al instante.
              </p>
            </div>
            
            <div className="space-y-6">
              <Button 
                onClick={handleGeneratePDC}
                className="group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span className="text-xl">✅</span>
                  <span>Subir mi PAT y generar mi PDC</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Súbelo una vez, planifica todo tu mes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>100% gratuito durante la beta</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-8 fade-in">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              
              {/* Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl"></div>
                <img 
                  src={pdcMockup} 
                  alt="Mockup del PDC generado automáticamente" 
                  className="relative rounded-3xl shadow-2xl w-full h-auto border border-border/50 group-hover:scale-105 transition-transform duration-500"
                />
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;