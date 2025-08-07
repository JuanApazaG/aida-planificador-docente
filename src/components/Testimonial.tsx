const Testimonial = () => {
  return (
    <section className="py-20 section-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-aida">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍🏫</span>
              </div>
            </div>
            
            <blockquote className="text-xl lg:text-2xl font-medium text-foreground mb-6 leading-relaxed">
              "Gracias a Aida, pude terminar mis informes en minutos y dedicarme a preparar mejor mis clases."
            </blockquote>
            
            <footer className="text-muted-foreground">
              <cite className="not-italic font-medium">
                Prof. María, docente de secundaria
              </cite>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;