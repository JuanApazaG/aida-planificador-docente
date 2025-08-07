const Differentiators = () => {
  const features = [
    {
      icon: "⚡",
      title: "Ahorro de tiempo",
      description: "Reduce el tiempo de redacción de 2 horas a 5 minutos por mes.",
      id: "ahorro-tiempo"
    },
    {
      icon: "🎯",
      title: "Calidad educativa",
      description: "PDC estructurados y profesionales que cumplen con los estándares educativos.",
      id: "calidad"
    },
    {
      icon: "🔄",
      title: "Facilidad de uso",
      description: "Interfaz intuitiva diseñada específicamente para docentes.",
      id: "facilidad"
    },
    {
      icon: "📞",
      title: "Soporte continuo",
      description: "Asistencia técnica y pedagógica cuando la necesites.",
      id: "soporte"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-light/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Beneficios que marcan la diferencia
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aida no es solo otra herramienta más. Está diseñada específicamente para resolver 
            los problemas reales que enfrentan los docentes en Bolivia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} id={feature.id} className="card-aida text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
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