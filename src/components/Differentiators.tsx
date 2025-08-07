const Differentiators = () => {
  const features = [
    {
      icon: "🧠",
      title: "Usa IA para entender tu PAT real",
      description: "(no plantillas genéricas)"
    },
    {
      icon: "📅",
      title: "Adaptado al calendario escolar boliviano",
      description: "Diseñado específicamente para el sistema educativo nacional"
    },
    {
      icon: "📝",
      title: "Incluye criterios de evaluación",
      description: "actividades y materiales si lo deseas"
    },
    {
      icon: "👩‍🏫",
      title: "Compatible con necesidades educativas especiales",
      description: "(opcional)"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            ¿Por qué Aida y no Word?
          </h2>
          <p className="text-xl text-muted-foreground">
            Más que una plantilla, una herramienta inteligente
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-aida text-center h-full">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;