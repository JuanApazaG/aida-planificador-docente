import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { curriculumData, grados } from "@/data/curriculum";
import { ChevronRight, BookOpen, CheckCircle, ArrowLeft, Users } from "lucide-react";

interface FormData {
  trimestre: string;
  grado: string;
  contenidosAEnsenar: string[];
}

export function PDCConfigForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>("");
  const [selectedGrado, setSelectedGrado] = useState<string>("");

  const form = useForm<FormData>({
    defaultValues: {
      trimestre: "",
      grado: "",
      contenidosAEnsenar: [],
    },
  });


  const handleTrimestreSelect = (trimestre: string) => {
    setSelectedTrimestre(trimestre);
    form.setValue("trimestre", trimestre);
    setCurrentStep(2);
  };

  const handleGradoSelect = (grado: string) => {
    setSelectedGrado(grado);
    form.setValue("grado", grado);
    setCurrentStep(3);
  };

  const onSubmit = (data: FormData) => {
    console.log("PDC Configuration:", data);
    alert("¡PDC generado exitosamente! Tu plan de desarrollo curricular está listo.");
  };

  // Step 1: Trimester Selection
  if (currentStep === 1) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Configurar Plan de Desarrollo Curricular</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Primero selecciona el trimestre que vas a planificar
          </p>
        </div>

        <div className="grid gap-4">
          {["primero", "segundo", "tercero"].map((trimestre, index) => (
            <Card 
              key={trimestre}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 group"
              onClick={() => handleTrimestreSelect(trimestre)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        {index + 1}° Trimestre
                      </CardTitle>
                      <CardDescription className="text-base">
                        {trimestre === "primero" && "Enero - Abril"}
                        {trimestre === "segundo" && "Mayo - Agosto"} 
                        {trimestre === "tercero" && "Septiembre - Diciembre"}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Grade Selection
  if (currentStep === 2) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Trimestres</span>
          </Button>
          <ChevronRight className="h-4 w-4" />
          <span>Seleccionar Grado</span>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">¿Para qué grados?</h1>
          <p className="text-lg text-muted-foreground">
            Selecciona el grado para el cual planificarás el PDC
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          {grados.map((grado, index) => (
            <Card 
              key={grado}
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/30 group ${
                grado === "Secundaria 2° Grado" ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => handleGradoSelect(grado)}
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-medium text-sm">{grado}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Step 3: Content Selection
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Grados</span>
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span>Contenidos a enseñar - {selectedGrado}</span>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">Configuración del PDC</h1>
        <p className="text-muted-foreground">Selecciona los contenidos que planeas enseñar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Content to Teach */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Contenidos a enseñar</span>
              </CardTitle>
              <CardDescription>
                Área: {curriculumData.area} - {selectedTrimestre} trimestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="contenidosAEnsenar"
                render={() => (
                  <FormItem>
                    <div className="space-y-6">
                      {curriculumData.contenidos.map((contenido, contenidoIndex) => (
                        <div key={contenidoIndex} className="space-y-4">
                          <h4 className="font-semibold text-foreground bg-primary/5 px-4 py-3 rounded-lg border border-primary/20">
                            {contenido.titulo}
                          </h4>
                          <div className="grid gap-3 md:grid-cols-2">
                            {contenido.subtemas.map((subtema, subtemaIndex) => (
                              <FormField
                                key={`${contenidoIndex}-${subtemaIndex}`}
                                control={form.control}
                                name="contenidosAEnsenar"
                                render={({ field }) => {
                                  return (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(subtema)}
                                          onCheckedChange={(checked) => {
                                            const value = field.value || [];
                                            return checked
                                              ? field.onChange([...value, subtema])
                                              : field.onChange(value.filter((v) => v !== subtema));
                                          }}
                                        />
                                      </FormControl>
                                      <Label className="text-sm leading-relaxed cursor-pointer flex-1">
                                        {subtema}
                                      </Label>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              size="lg"
              className="min-w-48 text-lg py-6"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Generar mi PDC
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}