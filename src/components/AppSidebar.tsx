import { 
  Home, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  Zap, 
  GraduationCap,
  ChevronDown,
  X
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
  { title: "Inicio", url: "/generar-pdc", icon: Home },
  { title: "Mis recursos", url: "/recursos", icon: Sparkles },
  { title: "Calendario", url: "/calendario", icon: Calendar },
  { title: "Grupos de estudiantes", url: "/grupos", icon: Clock },
  { title: "Comunidad", url: "/comunidad", icon: Users },
];

const specialItems = [
  { title: "Aumenta tu límite", url: "/limite", icon: Zap, isSpecial: true },
  { title: "Capacitaciones y recursos", url: "/capacitaciones", icon: GraduationCap, isSpecial: true },
];

export function AppSidebar() {
  const { open, setOpen } = useSidebar();

  return (
    <Sidebar className="border-r border-border/20">
      <SidebarContent className="bg-muted/30">
        {/* Close button - only visible on mobile */}
        <div className="flex justify-end p-4 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Special items with different styling */}
        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {specialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto">
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 transition-colors underline decoration-dotted underline-offset-4"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom section */}
        <div className="mt-auto p-4 border-t border-border/20">
          <Button 
            variant="outline" 
            className="w-full justify-between h-12 bg-primary/5 border-primary/20 hover:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-sm font-medium">Primeros Pasos</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            Cerrar menú ↙
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}