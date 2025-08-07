import { Button } from "@/components/ui/button";

const ProblemSolution = () => {
  return (
    <section className="py-20 section-primary">
      <div className="container mx-auto px-4">
        {/* Problem Section */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground italic mb-8 leading-relaxed">
              "Cada mes tengo que volver a redactar el PDC, y aunque es lo mismo de siempre, me toma mucho tiempo."
            </blockquote>
            <p className="text-lg text-muted-foreground">
              Miles de docentes en Bolivia pasan horas repitiendo un trabajo que puede automatizarse. 
              El PDC no tiene que ser un dolor de cabeza.
            </p>
          </div>
        </div>
        
        {/* Solution Section */}
        <div id="como-funciona" className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              La Solución
            </h2>
            <p className="text-xl text-muted-foreground">
              Aida es una herramienta inteligente que te genera tu PDC en minutos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card-aida text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">1. Subir tu PAT</h3>
              <p className="text-muted-foreground text-sm">Carga tu Plan Anual de Trabajo</p>
            </div>
            
            <div className="card-aida text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">2. Seleccionar contenidos</h3>
              <p className="text-muted-foreground text-sm">Elige el mes y los temas a trabajar</p>
            </div>
            
            <div className="card-aida text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">3. ¡Listo!</h3>
              <p className="text-muted-foreground text-sm">Recibe tu PDC estructurado y descargable</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="btn-primary text-lg px-8 py-4">
              Probar Aida ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;