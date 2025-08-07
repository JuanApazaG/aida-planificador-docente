const Footer = () => {
  return (
    <footer className="bg-primary-dark text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold">Aida</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-primary-foreground/80">
              © 2025 Aida. Hecho con ❤️ en Bolivia
            </p>
            <p className="text-primary-foreground/60">
              Contacto: <a href="mailto:ayuda@aida.education" className="hover:text-primary-foreground transition-colors">ayuda@aida.education</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;