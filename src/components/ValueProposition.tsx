const ValueProposition = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Ahorra tiempo valioso",
      description: "Reduce el tiempo de redacción de tu PDC de 2 horas a 5 minutos."
    },
    {
      icon: "📚",
      title: "Genera PDC personalizados",
      description: "A partir de tu PAT real, organizamos los contenidos por mes, con actividades y evaluaciones opcionales."
    },
    {
      icon: "🧠",
      title: "Diseñado para docentes",
      description: "Creado junto a profesores de primaria y secundaria para que se adapte a lo que realmente necesitas entregar."
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            ¿Por qué elegir Aida?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="card-aida text-center">
              <div className="text-5xl mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;