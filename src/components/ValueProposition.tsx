const ValueProposition = () => {
  const benefits = [
    {
      icon: "⚡",
      title: "Ahorra tiempo valioso",
      description: "Reduce el tiempo de redacción de tu PDC de 2 horas a 5 minutos.",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: "📚",
      title: "Genera PDC personalizados",
      description: "A partir de tu PAT real, organizamos los contenidos por mes, con actividades y evaluaciones opcionales.",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      icon: "🧠",
      title: "Diseñado para docentes",
      description: "Creado junto a profesores de primaria y secundaria para que se adapte a lo que realmente necesitas entregar.",
      gradient: "from-green-500/20 to-teal-500/20"
    }
  ];

  return (
    <section id="caracteristicas" className="relative py-20 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(58,123,245,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.05),transparent_50%)]"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <span className="text-primary">🎯</span>
            <span className="text-sm font-medium text-primary">¿Por qué elegir Aida?</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Características que{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              marcan la diferencia
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Diseñada específicamente para resolver los desafíos reales que enfrentan los docentes en Bolivia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative card-aida text-center group-hover:scale-105 transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
                <div className="relative">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;