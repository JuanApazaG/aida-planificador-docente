import { PDCConfigForm } from "@/components/PDCConfigForm";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const ConfigurarPDC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header with sidebar trigger */}
          <header className="h-16 flex items-center border-b border-border/20 px-6 bg-background/95 backdrop-blur-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">Aida</span>
            </div>
          </header>

          {/* Main content */}
          <div className="flex-1 p-6">
            <PDCConfigForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ConfigurarPDC;