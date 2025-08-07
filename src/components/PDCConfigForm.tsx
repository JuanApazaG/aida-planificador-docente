import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { curriculumData, additionalAreas } from "@/data/curriculum";
import { ChevronRight, BookOpen, Calendar, Clock, CheckCircle, ArrowLeft, Users, Target } from "lucide-react";

interface FormData {
  trimestre: string;
  mes: string;
  duracion: string;
  contenidosEnsenados: string[];
  contenidosAEnsenar: string[];
  incluirActividades: string[];
  adaptacionesCurriculares: boolean;
}

export function PDCConfigForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>("");
  const [contenidosEnsenados, setContenidosEnsenados] = useState<string[]>([]);

  const form = useForm<FormData>({
    defaultValues: {
      trimestre: "",
      mes: "",
      duracion: "",
      contenidosEnsenados: [],
      contenidosAEnsenar: [],
      incluirActividades: [],
      adaptacionesCurriculares: false,
    },
  });

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const actividadesOpciones = [
    "Actividades prácticas",
    "Materiales didácticos", 
    "Evaluación formativa",
    "Evaluación sumativa"
  ];

  // Get all content for selected trimestre
  const getAllContentForTrimestre = (trimestre: string) => {
    const allContent: Array<{ area: string; contenido: string }> = [];
    
    // Main curriculum areas
    curriculumData.campos.forEach(campo => {
      const contenidos = campo.trimestres[trimestre as keyof typeof campo.trimestres];
      if (contenidos) {
        contenidos.forEach(contenido => {
          allContent.push({
            area: `${campo.campo} - ${campo.area}`,
            contenido
          });
        });
      }
    });

    // Additional areas
    additionalAreas.forEach(area => {
      const contenidos = area.trimestres[trimestre as keyof typeof area.trimestres];
      if (contenidos) {
        contenidos.forEach(contenido => {
          allContent.push({
            area: area.nombre,
            contenido
          });
        });
      }
    });

    return allContent;
  };

  const handleTrimestreSelect = (trimestre: string) => {
    setSelectedTrimestre(trimestre);
    form.setValue("trimestre", trimestre);
    setCurrentStep(2);
  };

  const handleContenidoEnsenadoChange = (contenido: string, checked: boolean) => {
    if (checked) {
      setContenidosEnsenados([...contenidosEnsenados, contenido]);
    } else {
      setContenidosEnsenados(contenidosEnsenados.filter(c => c !== contenido));
    }
    form.setValue("contenidosEnsenados", checked 
      ? [...contenidosEnsenados, contenido] 
      : contenidosEnsenados.filter(c => c !== contenido)
    );
  };

  const getContenidosNoEnsenados = () => {
    const allContent = getAllContentForTrimestre(selectedTrimestre);
    return allContent.filter(item => !contenidosEnsenados.includes(item.contenido));
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

  // Step 2: Form Configuration
  const allContent = getAllContentForTrimestre(selectedTrimestre);
  const contenidosNoEnsenados = getContenidosNoEnsenados();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Trimestres</span>
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span>Configurar PDC - {selectedTrimestre} Trimestre</span>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">Configuración del PDC</h1>
        <p className="text-muted-foreground">Completa la información para generar tu Plan de Desarrollo Curricular</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Configuration */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Planificación General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="mes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mes a planificar</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar mes" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {meses.map((mes) => (
                            <SelectItem key={mes} value={mes.toLowerCase()}>
                              {mes}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duracion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duración del PDC</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar duración" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mensual">Mensual</SelectItem>
                          <SelectItem value="quincenal">Quincenal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Opciones Adicionales</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="incluirActividades"
                  render={() => (
                    <FormItem>
                      <FormLabel>¿Incluir en el PDC?</FormLabel>
                      <div className="space-y-3">
                        {actividadesOpciones.map((actividad) => (
                          <FormField
                            key={actividad}
                            control={form.control}
                            name="incluirActividades"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(actividad)}
                                      onCheckedChange={(checked) => {
                                        const value = field.value || [];
                                        return checked
                                          ? field.onChange([...value, actividad])
                                          : field.onChange(value.filter((v) => v !== actividad));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal leading-normal">
                                    {actividad}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adaptacionesCurriculares"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          ¿Agregar adaptaciones curriculares?
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Opcional: Para estudiantes con necesidades especiales
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Content Already Taught */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Contenidos ya enseñados</span>
              </CardTitle>
              <CardDescription>
                Marca los contenidos que ya has enseñado en este trimestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {curriculumData.campos.map((campo, campoIndex) => {
                  const contenidos = campo.trimestres[selectedTrimestre as keyof typeof campo.trimestres];
                  if (!contenidos || contenidos.length === 0) return null;
                  
                  return (
                    <div key={campoIndex} className="space-y-3">
                      <h4 className="font-medium text-foreground bg-muted/50 px-3 py-2 rounded-lg">
                        {campo.campo} - {campo.area}
                      </h4>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {contenidos.map((contenido, contenidoIndex) => (
                          <div key={contenidoIndex} className="flex items-start space-x-2 p-2 rounded border border-border/50 hover:bg-muted/30 transition-colors">
                            <Checkbox
                              id={`ensenado-${campoIndex}-${contenidoIndex}`}
                              checked={contenidosEnsenados.includes(contenido)}
                              onCheckedChange={(checked) => 
                                handleContenidoEnsenadoChange(contenido, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`ensenado-${campoIndex}-${contenidoIndex}`}
                              className="text-sm leading-relaxed cursor-pointer"
                            >
                              {contenido}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {additionalAreas.map((area, areaIndex) => {
                  const contenidos = area.trimestres[selectedTrimestre as keyof typeof area.trimestres];
                  if (!contenidos || contenidos.length === 0) return null;
                  
                  return (
                    <div key={areaIndex} className="space-y-3">
                      <h4 className="font-medium text-foreground bg-muted/50 px-3 py-2 rounded-lg">
                        {area.nombre}
                      </h4>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {contenidos.map((contenido, contenidoIndex) => (
                          <div key={contenidoIndex} className="flex items-start space-x-2 p-2 rounded border border-border/50 hover:bg-muted/30 transition-colors">
                            <Checkbox
                              id={`ensenado-area-${areaIndex}-${contenidoIndex}`}
                              checked={contenidosEnsenados.includes(contenido)}
                              onCheckedChange={(checked) => 
                                handleContenidoEnsenadoChange(contenido, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`ensenado-area-${areaIndex}-${contenidoIndex}`}
                              className="text-sm leading-relaxed cursor-pointer"
                            >
                              {contenido}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Content to Teach */}
          {contenidosNoEnsenados.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Contenidos a enseñar</span>
                </CardTitle>
                <CardDescription>
                  Selecciona los contenidos que planeas enseñar en este PDC (solo aparecen los que no has marcado como enseñados)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="contenidosAEnsenar"
                  render={() => (
                    <FormItem>
                      <div className="space-y-6">
                        {/* Group by area */}
                        {Object.entries(
                          contenidosNoEnsenados.reduce((acc, item) => {
                            if (!acc[item.area]) acc[item.area] = [];
                            acc[item.area].push(item.contenido);
                            return acc;
                          }, {} as Record<string, string[]>)
                        ).map(([area, contenidos]) => (
                          <div key={area} className="space-y-3">
                            <h4 className="font-medium text-foreground bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                              {area}
                            </h4>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                              {contenidos.map((contenido, index) => (
                                <FormField
                                  key={`${area}-${index}`}
                                  control={form.control}
                                  name="contenidosAEnsenar"
                                  render={({ field }) => {
                                    return (
                                      <FormItem className="flex flex-row items-start space-x-2 space-y-0 p-2 rounded border border-border/50 hover:bg-blue-50 transition-colors">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(contenido)}
                                            onCheckedChange={(checked) => {
                                              const value = field.value || [];
                                              return checked
                                                ? field.onChange([...value, contenido])
                                                : field.onChange(value.filter((v) => v !== contenido));
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm leading-relaxed cursor-pointer">
                                          {contenido}
                                        </FormLabel>
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
          )}

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