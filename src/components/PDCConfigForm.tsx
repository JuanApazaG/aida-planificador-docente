import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { curriculumData, additionalAreas } from "@/data/curriculum";
import { ChevronRight, BookOpen, Calendar, Clock, CheckCircle, ArrowLeft, Lightbulb } from "lucide-react";

interface FormData {
  trimestre: string;
  mes: string;
  duracion: string;
  tema: string;
  objetivos: string;
  contenidosSeleccionados: string;
  metodologia: string;
  actividades: string;
  materiales: string;
  evaluacion: string;
  adaptacionesCurriculares: string;
}

export function PDCConfigForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>("");

  const form = useForm<FormData>({
    defaultValues: {
      trimestre: "",
      mes: "",
      duracion: "",
      tema: "",
      objetivos: "",
      contenidosSeleccionados: "",
      metodologia: "",
      actividades: "",
      materiales: "",
      evaluacion: "",
      adaptacionesCurriculares: "",
    },
  });

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const metodologias = [
    "Aprendizaje basado en proyectos",
    "Metodología constructivista",
    "Aprendizaje cooperativo",
    "Metodología lúdica",
    "Aprendizaje significativo",
    "Metodología expositiva"
  ];

  // Get all content for selected trimestre
  const getAllContentForTrimestre = (trimestre: string) => {
    const allContent: Array<{ area: string; contenidos: string[] }> = [];
    
    // Main curriculum areas
    curriculumData.campos.forEach(campo => {
      const contenidos = campo.trimestres[trimestre as keyof typeof campo.trimestres];
      if (contenidos && contenidos.length > 0) {
        allContent.push({
          area: `${campo.campo} - ${campo.area}`,
          contenidos
        });
      }
    });

    // Additional areas
    additionalAreas.forEach(area => {
      const contenidos = area.trimestres[trimestre as keyof typeof area.trimestres];
      if (contenidos && contenidos.length > 0) {
        allContent.push({
          area: area.nombre,
          contenidos
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
          <h1 className="text-3xl font-bold text-foreground">Crear Plan de Desarrollo Curricular</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Te guiaremos paso a paso para crear tu PDC. Solo necesitas seguir estos sencillos pasos.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Lightbulb className="h-5 w-5" />
              <span>¿Cómo funciona?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <p className="text-blue-700">Selecciona el trimestre que vas a planificar</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <p className="text-blue-700">Completa la información básica (mes, duración, tema)</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <p className="text-blue-700">Selecciona los contenidos que vas a enseñar</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <p className="text-blue-700">Agrega metodología, actividades y materiales</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Paso 1: Selecciona el trimestre</h2>
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
                        <CardTitle className="text-lg">
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
      </div>
    );
  }

  // Step 2: Form Configuration
  const allContent = getAllContentForTrimestre(selectedTrimestre);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span>Configurar PDC - {selectedTrimestre} Trimestre</span>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-foreground">Paso 2: Completa tu Plan de Desarrollo Curricular</h1>
        <p className="text-muted-foreground">Llena los campos según tu planificación educativa</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Información General</span>
              </CardTitle>
              <CardDescription>Datos básicos de tu planificación</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="mes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mes a planificar *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el mes" />
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
                    <FormLabel>Duración del PDC *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la duración" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mensual">Mensual (4 semanas)</SelectItem>
                        <SelectItem value="quincenal">Quincenal (2 semanas)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="tema"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tema principal de la clase *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ej: Los números naturales hasta 1000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Escribe el tema principal que vas a enseñar
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Contenidos Curriculares</CardTitle>
              <CardDescription>Selecciona las áreas y contenidos que vas a trabajar</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="contenidosSeleccionados"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área y contenidos a desarrollar *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el área curricular" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {allContent.map((area, index) => (
                          <SelectItem key={index} value={area.area}>
                            {area.area}
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
                name="objetivos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivos de aprendizaje</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe qué deben lograr los estudiantes al final de la clase..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional: Describe los objetivos específicos de aprendizaje
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Methodology and Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Metodología y Actividades</CardTitle>
              <CardDescription>Define cómo vas a enseñar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="metodologia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metodología de la clase</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Elige la metodología" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {metodologias.map((metodologia) => (
                          <SelectItem key={metodologia} value={metodologia}>
                            {metodologia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Opcional: Selecciona la metodología que mejor se adapte a tu clase
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="actividades"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actividades prácticas</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe las actividades que realizarán los estudiantes..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional: Detalla las actividades prácticas y ejercicios
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="materiales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materiales didácticos</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ej: Pizarra, cuadernos, lápices de colores, bloques lógicos..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional: Lista los materiales que necesitarás
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Evaluation */}
          <Card>
            <CardHeader>
              <CardTitle>Evaluación</CardTitle>
              <CardDescription>Define cómo vas a evaluar el aprendizaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="evaluacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de evaluación</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe cómo vas a evaluar a los estudiantes (examen, proyecto, observación, etc.)..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional: Explica cómo evaluarás el progreso de los estudiantes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adaptacionesCurriculares"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adaptaciones curriculares</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe las adaptaciones para estudiantes con necesidades especiales..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Opcional: Adaptaciones para estudiantes con necesidades educativas especiales
                    </FormDescription>
                    <FormMessage />
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