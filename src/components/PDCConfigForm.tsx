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
  mes: string;
  recursos: string;
  orientacionesPractica: string;
  orientacionesTeoria: string;
  orientacionesValoracion: string;
  orientacionesProduccion: string;
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
      mes: "",
      recursos: "",
      orientacionesPractica: "",
      orientacionesTeoria: "",
      orientacionesValoracion: "",
      orientacionesProduccion: "",
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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Grados</span>
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span>Configuración del PDC - {selectedGrado}</span>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">Configuración del PDC</h1>
        <p className="text-muted-foreground">Selecciona los contenidos que planeas enseñar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Content Selection - Left Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-600">
                    <BookOpen className="h-5 w-5" />
                    <span>Contenidos a enseñar</span>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Área: {curriculumData.area} - {selectedTrimestre} trimestre
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="contenidosAEnsenar"
                    render={() => (
                      <FormItem>
                        <div className="space-y-4">
                          {curriculumData.contenidos.map((contenido, contenidoIndex) => (
                            <div key={contenidoIndex} className="space-y-3">
                              <h4 className="font-medium text-sm text-foreground bg-blue-50 px-3 py-2 rounded border">
                                {contenido.titulo}
                              </h4>
                              <div className="space-y-2 pl-4">
                                {contenido.subtemas.map((subtema, subtemaIndex) => (
                                  <FormField
                                    key={`${contenidoIndex}-${subtemaIndex}`}
                                    control={form.control}
                                    name="contenidosAEnsenar"
                                    render={({ field }) => {
                                      return (
                                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
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
                                          <Label className="text-xs leading-relaxed cursor-pointer flex-1 text-muted-foreground">
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
            </div>

            {/* Reference Data - Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">
                    1. DATOS REFERENCIALES
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">1.1. UNIDAD EDUCATIVA:</span>
                    <span className="text-right">RAFAEL CAMPOS DE LUIE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">1.2. DISTRITO EDUCATIVO:</span>
                    <span className="text-right">POROMA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">1.3. DEPARTAMENTO:</span>
                    <span className="text-right">CHUQUISACA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">1.4. GESTIÓN:</span>
                    <span className="text-right">2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">1.5. AÑO DE ESCOLARIDAD:</span>
                    <span className="text-right">2DO A 6TO DE SECUNDARIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">1.6. MAESTRO (a):</span>
                    <span className="text-right">PAOLA MONDOCORRE</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">
                    2. TÍTULO DEL PSP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-medium text-center bg-gray-50 p-3 rounded border">
                    "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">
                    Seleccione el mes para su PDC
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="mes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Mes</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="w-full p-2 border border-input rounded-md text-sm bg-background"
                          >
                            <option value="">Seleccionar mes</option>
                            <option value="enero">Enero</option>
                            <option value="febrero">Febrero</option>
                            <option value="marzo">Marzo</option>
                            <option value="abril">Abril</option>
                            <option value="mayo">Mayo</option>
                            <option value="junio">Junio</option>
                            <option value="julio">Julio</option>
                            <option value="agosto">Agosto</option>
                            <option value="septiembre">Septiembre</option>
                            <option value="octubre">Octubre</option>
                            <option value="noviembre">Noviembre</option>
                            <option value="diciembre">Diciembre</option>
                          </select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground">
                  📚 Recursos y Materiales
                </CardTitle>
                <CardDescription>
                  Describe los materiales y recursos que utilizarás en tus clases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="recursos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">¿Qué materiales vas a usar?</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field}
                          placeholder="Ejemplo: Pizarra, marcadores, libros de texto, materiales concretos, calculadora, recursos digitales..."
                          className="w-full p-3 border border-input rounded-md text-sm bg-background min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground">
                  🎯 Orientaciones Metodológicas
                </CardTitle>
                <CardDescription>
                  Describe cómo vas a enseñar estos contenidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="orientacionesPractica"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">💡 En la Práctica</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field}
                          placeholder="¿Qué actividades prácticas harás? Ejemplo: ejercicios, experimentos, talleres..."
                          className="w-full p-3 border border-input rounded-md text-sm bg-background min-h-[80px] resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orientacionesTeoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">📖 En la Teoría</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field}
                          placeholder="¿Cómo explicarás los conceptos? Ejemplo: clases magistrales, lecturas, videos..."
                          className="w-full p-3 border border-input rounded-md text-sm bg-background min-h-[80px] resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orientacionesValoracion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">⭐ En la Valoración</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field}
                          placeholder="¿Cómo evaluarás el aprendizaje? Ejemplo: exámenes, tareas, participación..."
                          className="w-full p-3 border border-input rounded-md text-sm bg-background min-h-[80px] resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orientacionesProduccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">🔨 En la Producción</FormLabel>
                      <FormControl>
                        <textarea 
                          {...field}
                          placeholder="¿Qué productos crearán los estudiantes? Ejemplo: proyectos, ensayos, maquetas..."
                          className="w-full p-3 border border-input rounded-md text-sm bg-background min-h-[80px] resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-8">
            <Button 
              type="submit" 
              size="lg"
              className="min-w-64 text-lg py-6 bg-primary hover:bg-primary/90"
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