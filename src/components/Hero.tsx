import { Button } from "@/components/ui/button";
import pdcMockup from "@/assets/pdc-mockup.jpg";

const Hero = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-light/30 via-background to-primary-light/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Redacta tu PDC en{" "}
                <span className="text-primary">minutos</span>, no en horas.
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Con Aida, solo sube tu PAT y selecciona los contenidos: generamos tu Plan de Desarrollo Curricular mensual o quincenal al instante.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button className="btn-primary text-lg px-8 py-4 pulse-cta">
                <span className="mr-2">✅</span>
                Subir mi PAT y generar mi PDC
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Súbelo una vez, planifica todo tu mes.
              </p>
            </div>
          </div>
          
          <div className="lg:pl-8 fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl"></div>
              <img 
                src={pdcMockup} 
                alt="Mockup del PDC generado automáticamente" 
                className="relative rounded-2xl shadow-2xl w-full h-auto border border-border/50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;