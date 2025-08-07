import { Button } from "@/components/ui/button";

const ProblemSolution = () => {
  return (
    <section id="proceso" className="py-20 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                El problema que{" "}
                <span className="text-primary">resolvemos</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Los docentes pasan horas redactando PDC manualmente, perdiendo tiempo valioso que podrían dedicar a sus estudiantes.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-destructive text-lg">❌</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Sin Aida</h3>
                  <p className="text-muted-foreground">
                    Redactas manualmente cada PDC, tardando 2-3 horas por mes, con riesgo de errores y formatos inconsistentes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-accent text-lg">✅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Con Aida</h3>
                  <p className="text-muted-foreground">
                    Subes tu PAT una vez y generas PDC automáticamente en 5 minutos, con formato profesional y sin errores.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-8">
            <div className="card-aida p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Proceso simplificado
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Sube tu PAT</h4>
                    <p className="text-muted-foreground">Carga tu Plan Anual de Trabajo en formato PDF</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Selecciona contenidos</h4>
                    <p className="text-muted-foreground">Elige qué temas incluir en tu PDC mensual</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Descarga tu PDC</h4>
                    <p className="text-muted-foreground">Obtén tu Plan de Desarrollo Curricular listo para usar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;