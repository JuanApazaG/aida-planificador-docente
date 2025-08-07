import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-primary-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary-foreground/10 p-8">
            <Icons.logo className="w-12 h-12" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-8">
            <a href="#como-funciona" className="hover:text-primary-light transition-colors text-primary-foreground/80 hover:text-primary-foreground">
              ¿Cómo funciona?
            </a>
            <a href="#beneficios" className="hover:text-primary-light transition-colors text-primary-foreground/80 hover:text-primary-foreground">
              Beneficios
            </a>
            <a href="#diferenciadores" className="hover:text-primary-light transition-colors text-primary-foreground/80 hover:text-primary-foreground">
              Por qué Aida
            </a>
            <a href="#faq" className="hover:text-primary-light transition-colors text-primary-foreground/80 hover:text-primary-foreground">
              FAQ
            </a>
          </nav>
          
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Recibe actualizaciones sobre Aida" 
                  type="email" 
                  className="rounded-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-light" 
                />
              </div>
              <Button type="submit" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Suscribirse
              </Button>
            </form>
          </div>
          
          <div className="text-center space-y-4">
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
  )
}

export { StackedCircularFooter }