import { Button } from "@/components/ui/button";

const Offer = () => {
  return (
    <section id="precios" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Comienza gratis por tiempo limitado
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Durante la fase beta, puedes usar Aida sin costo y ayudarnos a mejorar 
              la herramienta para todos los docentes del país.
            </p>
          </div>
          
          <div className="space-y-6">
            <Button className="btn-primary text-xl px-12 py-6 pulse-cta">
              <span className="mr-3">🟩</span>
              Generar mi PDC ahora →
            </Button>
            
            <p className="text-muted-foreground">
              Súbelo una vez, planifica todo tu mes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;