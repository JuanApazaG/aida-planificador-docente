import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { curriculumData, additionalAreas } from "@/data/curriculum";
import { ChevronRight, BookOpen, Calendar, Clock } from "lucide-react";

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
  };

  const getContenidosNoEnsenados = () => {
    const allContent = getAllContentForTrimestre(selectedTrimestre);
    return allContent.filter(item => !contenidosEnsenados.includes(item.contenido));
  };

  const onSubmit = (data: FormData) => {
    console.log("PDC Configuration:", data);
    alert("¡PDC configurado exitosamente!");
  };

  if (currentStep === 1) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Configurar PDC</h1>
          <p className="text-muted-foreground">Selecciona el trimestre para comenzar</p>
        </div>

        <div className="grid gap-4">
          {["primero", "segundo", "tercero"].map((trimestre, index) => (
            <Card 
              key={trimestre}
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
              onClick={() => handleTrimestreSelect(trimestre)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {index + 1}° Trimestre
                      </CardTitle>
                      <CardDescription>
                        {trimestre === "primero" && "Enero - Abril"}
                        {trimestre === "segundo" && "Mayo - Agosto"} 
                        {trimestre === "tercero" && "Septiembre - Diciembre"}
                      </CardDescription>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const allContent = getAllContentForTrimestre(selectedTrimestre);
  const contenidosNoEnsenados = getContenidosNoEnsenados();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
          Seleccionar Trimestre
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span>Configurar PDC - {selectedTrimestre} Trimestre</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Planificación</span>
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
                  <Clock className="h-5 w-5" />
                  <span>Actividades Complementarias</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="incluirActividades"
                  render={() => (
                    <FormItem>
                      <FormLabel>¿Incluir actividades prácticas, materiales, evaluación?</FormLabel>
                      <div className="space-y-2">
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
                                  <FormLabel className="text-sm font-normal">
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
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                        <p className="text-sm text-muted-foreground">
                          Opcional: Incluir adaptaciones para estudiantes con necesidades especiales
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contenidos ya enseñados</CardTitle>
              <CardDescription>
                Selecciona los contenidos que ya has enseñado en este trimestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {allContent.map((item, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                      {item.area}
                    </Label>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id={`ensenado-${index}`}
                        checked={contenidosEnsenados.includes(item.contenido)}
                        onCheckedChange={(checked) => 
                          handleContenidoEnsenadoChange(item.contenido, checked as boolean)
                        }
                      />
                      <Label 
                        htmlFor={`ensenado-${index}`}
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        {item.contenido}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {contenidosNoEnsenados.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Contenidos a enseñar</CardTitle>
                <CardDescription>
                  Selecciona los contenidos que planeas enseñar en este PDC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="contenidosAEnsenar"
                  render={() => (
                    <FormItem>
                      <div className="grid gap-4 md:grid-cols-2">
                        {contenidosNoEnsenados.map((item, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <Label className="text-xs font-medium text-muted-foreground mb-2 block">
                              {item.area}
                            </Label>
                            <FormField
                              control={form.control}
                              name="contenidosAEnsenar"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.contenido)}
                                        onCheckedChange={(checked) => {
                                          const value = field.value || [];
                                          return checked
                                            ? field.onChange([...value, item.contenido])
                                            : field.onChange(value.filter((v) => v !== item.contenido));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm leading-relaxed cursor-pointer">
                                      {item.contenido}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Volver a Trimestres
            </Button>
            <Button type="submit">
              Generar PDC
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}