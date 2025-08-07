import { 
  Home, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  Zap, 
  GraduationCap,
  ChevronDown,
  X,
  BookOpen,
  Settings,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Inicio", url: "/generar-pdc", icon: Home, description: "Generar PDC" },
  { title: "Mis recursos", url: "/recursos", icon: Sparkles, description: "PAT y materiales" },
  { title: "Calendario", url: "/calendario", icon: Calendar, description: "Planificación" },
  { title: "Estudiantes", url: "/grupos", icon: Clock, description: "Gestión de clases" },
  { title: "Comunidad", url: "/comunidad", icon: Users, description: "Compartir experiencias" },
];

const specialItems = [
  { title: "Aumenta tu límite", url: "/limite", icon: Zap, isSpecial: true, badge: "Pro" },
  { title: "Capacitaciones", url: "/capacitaciones", icon: GraduationCap, isSpecial: true, badge: "Nuevo" },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar className="border-r border-border/20 bg-gradient-to-b from-background to-muted/20">
      <SidebarContent className="bg-transparent">
        {/* Header with Logo */}
        <div className="p-6 border-b border-border/20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl blur-xl opacity-60"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Aida
              </h1>
              <p className="text-xs text-muted-foreground">Planificador Docente</p>
            </div>
          </div>
        </div>

        {/* Close button - only visible on mobile */}
        <div className="flex justify-end p-4 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8 w-8 p-0 hover:bg-muted/50 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="px-4 py-6">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Navegación Principal
            </h3>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12 group">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium border border-primary/20 shadow-sm"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`
                      }
                    >
                      <div className="p-2 rounded-lg transition-all duration-300 bg-muted/50 group-hover:bg-primary/10">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.title}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>

          {/* Special items with different styling */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Herramientas Avanzadas
            </h3>
            <SidebarMenu className="space-y-2">
              {specialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto group">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-primary hover:bg-primary/10 transition-all duration-300 border border-primary/20 hover:border-primary/40"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <span className="inline-block px-2 py-0.5 text-xs font-bold bg-primary/20 text-primary rounded-full ml-2">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-auto p-4 border-t border-border/20 space-y-3">
          {/* Quick Actions */}
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-between h-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 hover:bg-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center text-accent-foreground text-sm font-bold">
                  3
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium block">Primeros Pasos</span>
                  <span className="text-xs text-muted-foreground">Completa tu perfil</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" />
            </Button>
          </div>

          {/* User Actions */}
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
            >
              <Settings className="h-4 w-4 mr-3" />
              Configuración
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Cerrar menú
            </Button>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}