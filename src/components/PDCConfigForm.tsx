import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { curriculumData, grados } from "@/data/curriculum";
import { ChevronRight, BookOpen, CheckCircle, ArrowLeft, Users, Info, FileText, Calendar, Target, Settings, Download } from "lucide-react";
import { simulationService, apiService, ReferentialDataResponse, PDCConfigData } from "@/config/backend";
import { PDCPreview } from "./PDCPreview";

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

interface ReferentialData {
  unidadEducativa: string;
  distritoEducativo: string;
  departamento: string;
  gestion: string;
  anioEscolaridad: string;
  maestro: string;
  tituloPSP: string;
}

interface PDCData {
  id: string;
  nombre: string;
  mes: string;
  grado: string;
  trimestre: string;
  fechaCreacion: string;
  urlDescarga: string;
  urlVistaPrevia: string;
  tamanio: string;
}

export function PDCConfigForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>("");
  const [selectedGrado, setSelectedGrado] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [referentialData, setReferentialData] = useState<ReferentialData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [generatedPDCId, setGeneratedPDCId] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string>("mock-file-id"); // TODO: Obtener del contexto o props
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string; filename?: string } | null>(null);

  // ===== FUNCIÓN PARA OBTENER CONTENIDOS DINÁMICOS DEL PAT =====
  const getDynamicContents = () => {
    try {
      const savedPATData = localStorage.getItem('patExtractedData');
      if (!savedPATData) {
        console.log('⚠️ No hay datos del PAT guardados, usando contenidos estáticos');
        return curriculumData.contenidos;
      }

      const patData = JSON.parse(savedPATData);
      const planCompleto = patData.datosPersonales?.PlanAnualTrimestralizado || [];
      
      // Filtrar por trimestre seleccionado
      const trimestreSeleccionado = selectedTrimestre;
      const trimestreFiltrado = planCompleto.filter(
        trimestre => trimestre.trimestre?.toLowerCase().includes(trimestreSeleccionado)
      );

      if (trimestreFiltrado.length === 0) {
        console.log('⚠️ No se encontraron contenidos para el trimestre seleccionado, usando contenidos estáticos');
        return curriculumData.contenidos;
      }

      // Extraer contenidos del trimestre filtrado
      const contenidosDelTrimestre = trimestreFiltrado[0]?.contenidos || [];
      
      console.log('✅ Contenidos dinámicos cargados del PAT:', contenidosDelTrimestre);
      
      // Convertir al formato esperado por la interfaz
      return contenidosDelTrimestre.map(contenido => ({
        titulo: contenido.tema,
        subtemas: contenido.subtemas
      }));
    } catch (error) {
      console.error('Error cargando contenidos dinámicos:', error);
      return curriculumData.contenidos;
    }
  };

  // Obtener contenidos dinámicos
  const dynamicContents = getDynamicContents();

  // Actualizar contenidos cuando cambie el trimestre
  useEffect(() => {
    if (selectedTrimestre) {
      console.log('🔄 Actualizando contenidos para trimestre:', selectedTrimestre);
      // Forzar re-render del componente
      setCurrentStep(currentStep);
    }
  }, [selectedTrimestre]);

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

  // ===== CARGAR DATOS REFERENCIALES =====
  useEffect(() => {
    const loadReferentialData = async () => {
      setIsLoadingData(true);
      try {
        // Primero intentar cargar datos del PAT guardado en localStorage
        const savedPATData = localStorage.getItem('patExtractedData');
        
        if (savedPATData) {
          const patData = JSON.parse(savedPATData);
          console.log('📄 Usando datos del PAT guardado:', patData);
          
          // Extraer datos del JSON del PAT con la estructura correcta
          const datosPersonales = patData.datosPersonales || {};
          setReferentialData({
            unidadEducativa: datosPersonales.unidadEducativa || "RAFAEL CAMPOS DE LUJE",
            distritoEducativo: datosPersonales.distritoEducativo || "POROMA", 
            departamento: datosPersonales.departamento || "CHUQUISACA",
            gestion: datosPersonales.gestion || "2025",
            anioEscolaridad: datosPersonales.anioEscolaridad || "2DO A 6TO DE SECUNDARIA",
            maestro: datosPersonales.maestro || "PAOLA MONDOCORRE",
            tituloPSP: datosPersonales.tituloPSP || "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
          });
          
          // Debug: mostrar datos extraídos
          import('../utils/debugFlow').then(({ debugFlow }) => {
            debugFlow.showAllStoredData();
          });
        } else {
          // Si no hay datos del PAT, intentar cargar del backend
          const result = await apiService.getReferentialData(fileId);
        if (result.success && result.data) {
          setReferentialData(result.data);
          } else {
            // Usar datos por defecto como último recurso
            setReferentialData({
              unidadEducativa: "RAFAEL CAMPOS DE LUIE",
              distritoEducativo: "POROMA",
              departamento: "CHUQUISACA",
              gestion: "2025",
              anioEscolaridad: "2DO A 6TO DE SECUNDARIA",
              maestro: "PAOLA MONDOCORRE",
              tituloPSP: "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
            });
          }
        }
      } catch (error) {
        console.error('Error loading referential data:', error);
        // Usar datos por defecto si falla
        setReferentialData({
          unidadEducativa: "RAFAEL CAMPOS DE LUIE",
          distritoEducativo: "POROMA",
          departamento: "CHUQUISACA",
          gestion: "2025",
          anioEscolaridad: "2DO A 6TO DE SECUNDARIA",
          maestro: "PAOLA MONDOCORRE",
          tituloPSP: "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    loadReferentialData();
  }, [fileId]);

  const handleTrimestreSelect = (trimestre: string) => {
    console.log('✅ Trimestre seleccionado:', trimestre);
    
    // Guardar el trimestre seleccionado en localStorage
    localStorage.setItem('selectedTrimestre', trimestre);
    console.log('💾 Trimestre guardado en localStorage:', trimestre);
    
    // Debug: mostrar selección
    import('../utils/debugFlow').then(({ debugFlow }) => {
      debugFlow.logUserSelections(trimestre);
    });
    
    import('../utils/jsonLogger').then(({ jsonLogger }) => {
      jsonLogger.logUserSelections(trimestre);
    });
    
    setSelectedTrimestre(trimestre);
    form.setValue("trimestre", trimestre);
    setCurrentStep(2);
  };

  const handleGradoSelect = (grado: string) => {
    console.log('✅ Grado seleccionado:', grado);
    
    // Guardar el grado seleccionado en localStorage
    localStorage.setItem('selectedGrado', grado);
    console.log('💾 Grado guardado en localStorage:', grado);
    
    // Debug: mostrar selección
    import('../utils/debugFlow').then(({ debugFlow }) => {
      debugFlow.logUserSelections(selectedTrimestre, grado);
    });
    
    import('../utils/jsonLogger').then(({ jsonLogger }) => {
      jsonLogger.logUserSelections(selectedTrimestre, grado);
    });
    
    setSelectedGrado(grado);
    form.setValue("grado", grado);
    setCurrentStep(3);
  };

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true);
    setIsDownloading(false);
    
    try {
      console.log('✅ Formulario enviado con datos:', data);
      console.log('📝 Contenidos a enseñar seleccionados:', data.contenidosAEnsenar);
      
             // Obtener datos del PAT guardados
       const patDataForProcessing = localStorage.getItem('patExtractedData');
       const patData = patDataForProcessing ? JSON.parse(patDataForProcessing) : {};
      
      console.log('🔍 === FILTRADO DE DATOS ===');
      console.log('📅 Trimestre seleccionado:', data.trimestre);
      console.log('📚 Contenidos seleccionados:', data.contenidosAEnsenar);
      
      // 1. FILTRAR POR TRIMESTRE SELECCIONADO
      const trimestreSeleccionado = data.trimestre;
      const planCompleto = patData.datosPersonales?.PlanAnualTrimestralizado || [];
      console.log('📊 Plan completo (todos los trimestres):', planCompleto.length, 'trimestres');
      
      const trimestreFiltrado = planCompleto.filter(
        trimestre => trimestre.trimestre === trimestreSeleccionado
      );
      console.log('✅ Trimestre filtrado encontrado:', trimestreFiltrado.length, 'elementos');
      console.log('📋 Contenidos del trimestre seleccionado:', trimestreFiltrado);
      
      // 2. FILTRAR CONTENIDOS SELECCIONADOS DENTRO DEL TRIMESTRE
      const contenidosSeleccionados = data.contenidosAEnsenar || [];
      console.log('🎯 Contenidos que el usuario seleccionó:', contenidosSeleccionados);
      
             // Crear mapeo dinámico de subtemas a temas basado en los contenidos del PAT
       const mapeoSubtemasATemas = {};
       if (patDataForProcessing) {
         const patDataParsed = JSON.parse(patDataForProcessing);
         const planCompleto = patDataParsed.datosPersonales?.PlanAnualTrimestralizado || [];
         const trimestreFiltrado = planCompleto.filter(
           trimestre => trimestre.trimestre?.toLowerCase().includes(data.trimestre)
         );
         
         if (trimestreFiltrado.length > 0) {
           const contenidosDelTrimestre = trimestreFiltrado[0]?.contenidos || [];
           contenidosDelTrimestre.forEach(contenido => {
             contenido.subtemas.forEach(subtema => {
               mapeoSubtemasATemas[subtema] = contenido.tema;
             });
           });
         }
       }
       
       console.log('📚 Mapeo dinámico de subtemas a temas:', mapeoSubtemasATemas);
      
      // Agrupar subtemas seleccionados por tema
      const contenidosAgrupados = {};
      contenidosSeleccionados.forEach(subtema => {
        const tema = mapeoSubtemasATemas[subtema];
        if (tema) {
          if (!contenidosAgrupados[tema]) {
            contenidosAgrupados[tema] = [];
          }
          contenidosAgrupados[tema].push(subtema);
        }
      });
      
      console.log('📚 Contenidos agrupados por tema:', contenidosAgrupados);
      
      // Crear estructura de contenidos con temas y subtemas
      const contenidosEstructurados = Object.entries(contenidosAgrupados).map(([tema, subtemas]) => ({
        tema: tema,
        subtemas: subtemas
      }));
      
      console.log('✅ Contenidos estructurados:', contenidosEstructurados);
      
      // Crear el trimestre con contenidos filtrados y estructurados
      const trimestreConContenidosFiltrados = trimestreFiltrado.map(trimestre => ({
        ...trimestre,
        anioEscolaridad: trimestre.anioEscolaridad || "SEGUNDO",
        contenidos: contenidosEstructurados,
        campoCienciaTecnologiaYProduccion: trimestre.campoCienciaTecnologiaYProduccion || "MATEMÁTICA.",
        perfilesSalida: trimestre.perfilesSalida || "Identifica las potencialidades productivas de su región, realizando cálculos y mediciones en procesos productivos y aplica el laboratorio matemático en el fortalecimiento de su pensamiento lógico matemático como una capacidad importante para la trasformación de su realidad.",
        trimestre: trimestre.trimestre || data.trimestre,
        actividadesPlanAccionPspPcpyA: trimestre.actividadesPlanAccionPspPcpyA || "Diseñar actividades en el huerto que promuevan la reflexión y el autoconocimiento en los estudiantes, ayudándolos a entender y gestionar sus propias emociones y comportamientos.; Trabajo comunitario en el huerto con elaboración de carteles incluyendo diversos mensajes de paz y respeto.; Producción en los huertos escolares para incentivar el consumo de alimentos naturales."
      }));
      
      console.log('✅ Trimestre con contenidos filtrados y estructurados:');
      trimestreConContenidosFiltrados.forEach((trimestre, index) => {
        console.log(`   Trimestre ${index + 1}:`, trimestre.contenidos.length, 'temas con subtemas seleccionados');
        console.log(`   - Año escolaridad: ${trimestre.anioEscolaridad}`);
        console.log(`   - Campo ciencia: ${trimestre.campoCienciaTecnologiaYProduccion}`);
        console.log(`   - Perfiles salida: ${trimestre.perfilesSalida}`);
        console.log(`   - Trimestre: ${trimestre.trimestre}`);
        console.log(`   - Actividades PSP: ${trimestre.actividadesPlanAccionPspPcpyA}`);
        trimestre.contenidos.forEach(contenido => {
          console.log(`     - Tema: ${contenido.tema}`);
          console.log(`       Subtemas: ${contenido.subtemas.join(', ')}`);
        });
      });
      
      // Preparar datos completos usando la estructura EXACTA del backend
      const completeDataForGeneration = {
        // Solo datosPersonales como solicitaste
        datosPersonales: {
          // Datos personales del PAT con valores por defecto completos
          objetivoHolisticoDeNivel: patData.datosPersonales?.objetivoHolisticoDeNivel || "Formamos integralmente a las y los estudiantes con identidad cultural, valores sociocomunitarios, espiritualidad y consciencia crítica, articulando la educación científica, humanística, técnica, tecnológica y artística a través de procesos productivos de acuerdo a las vocaciones y potencialidades de las regiones en el marco de la descolonización, interculturalidad, y plurilingüismo, para que contribuyan a la conservación, protección de la Madre Tierra y salud comunitaria, la construcción de una sociedad democrática, inclusiva y libre de violencia.",
          unidadEducativa: patData.datosPersonales?.unidadEducativa || "RAFAEL CAMPOS DE LUJE",
          maestro: patData.datosPersonales?.maestro || "PAOLA MONDOCORRE",
          tituloPSP: patData.datosPersonales?.tituloPSP || "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ",
          anioEscolaridad: patData.datosPersonales?.anioEscolaridad || "2DO A 6TO DE SECUNDARIA",
          departamento: patData.datosPersonales?.departamento || "CHUQUISACA",
          gestion: patData.datosPersonales?.gestion || "2025",
          distritoEducativo: patData.datosPersonales?.distritoEducativo || "POROMA",
          mes: data.mes || "diciembre", // Mover mes aquí como solicitaste
          
          // SOLO EL TRIMESTRE SELECCIONADO CON SUS CONTENIDOS FILTRADOS
          PlanAnualTrimestralizado: trimestreConContenidosFiltrados
        }
      };
      
      // Guardar datos de orientaciones en localStorage pero NO enviarlos al backend
      const datosOrientaciones = {
        recursos: data.recursos || "",
        orientacionesPractica: data.orientacionesPractica || "",
        orientacionesTeoria: data.orientacionesTeoria || "",
        orientacionesValoracion: data.orientacionesValoracion || "",
        orientacionesProduccion: data.orientacionesProduccion || ""
      };
      
      localStorage.setItem('orientacionesMetodologicas', JSON.stringify(datosOrientaciones));
      console.log('💾 Datos de orientaciones guardados en localStorage (NO se envían al backend)');
      
      // Debug: mostrar datos completos
      console.log('🔍 === VERIFICACIÓN DE CAMPOS COMPLETOS ===');
      console.log('✅ Objetivo holístico:', completeDataForGeneration.datosPersonales.objetivoHolisticoDeNivel ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Unidad educativa:', completeDataForGeneration.datosPersonales.unidadEducativa ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Maestro:', completeDataForGeneration.datosPersonales.maestro ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Título PSP:', completeDataForGeneration.datosPersonales.tituloPSP ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Año escolaridad:', completeDataForGeneration.datosPersonales.anioEscolaridad ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Departamento:', completeDataForGeneration.datosPersonales.departamento ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Gestión:', completeDataForGeneration.datosPersonales.gestion ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Distrito educativo:', completeDataForGeneration.datosPersonales.distritoEducativo ? 'COMPLETO' : 'FALTANTE');
      console.log('✅ Mes:', completeDataForGeneration.datosPersonales.mes ? 'COMPLETO' : 'FALTANTE');
      
      import('../utils/debugFlow').then(({ debugFlow }) => {
        debugFlow.logCompleteDataForGeneration(completeDataForGeneration);
      });
      
      import('../utils/jsonLogger').then(({ jsonLogger }) => {
        jsonLogger.logFinalJSON(completeDataForGeneration);
      });
      
      // Mostrar en consola lo que se va a enviar
      console.log('🚀 === DATOS PARA GENERAR PDC (ESTRUCTURA CORRECTA) ===');
      console.log('📊 JSON completo que se enviará:');
      console.log(JSON.stringify(completeDataForGeneration, null, 2));
      console.log('📝 Resumen de datos:');
      console.log('- Mes:', completeDataForGeneration.datosPersonales.mes);
      console.log('- Título PSP:', completeDataForGeneration.datosPersonales.tituloPSP);
      console.log('- Plan Trimestralizado:', completeDataForGeneration.datosPersonales.PlanAnualTrimestralizado.length, 'trimestres');
      console.log('- Contenidos seleccionados:', contenidosSeleccionados.length, 'subtemas');
      
      // Guardar todos los datos del PDC en localStorage como JSON
      localStorage.setItem('pdcCompleteData', JSON.stringify(completeDataForGeneration));
      console.log('💾 Datos completos guardados en localStorage como "pdcCompleteData"');

      // ✅ CORREGIDO: Enviar completeDataForGeneration en lugar de configData
      console.log('📤 === ENVIANDO DATOS AL BACKEND ===');
      console.log('✅ Enviando completeDataForGeneration (CORRECTO)');
      console.log('📊 Datos que se envían:', completeDataForGeneration);
      
      const result = await apiService.submitPDCConfig(completeDataForGeneration);
      
      if (result.success) {
        // Verificar si se descargó un archivo
        if (result.downloadedFile) {
          console.log('✅ Archivo descargado exitosamente:', result.downloadedFile);
          setIsDownloading(true);
          // Pequeño delay para mostrar el estado de descarga
          setTimeout(() => {
            setIsDownloading(false);
            setNotification({
              type: 'success',
              message: 'PDC generado exitosamente',
              filename: result.downloadedFile
            });
            // Limpiar notificación después de 5 segundos
            setTimeout(() => setNotification(null), 5000);
          }, 1000);
        } else if (result.pdcId) {
          // Si no se descargó archivo pero hay pdcId, mostrar vista previa
          setGeneratedPDCId(result.pdcId);
        } else {
          // Solo mensaje de éxito
          setNotification({
            type: 'success',
            message: result.message || "PDC generado exitosamente"
          });
          setTimeout(() => setNotification(null), 5000);
        }
      } else {
        throw new Error(result.error || "Error al generar el PDC");
      }
    } catch (error) {
      console.error('Error generating PDC:', error);
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : "Error al generar el PDC"
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToResources = (pdcData: PDCData) => {
    // TODO: Implementar guardado en recursos cuando el backend esté listo
    console.log('Saving PDC to resources:', pdcData);
  };

  const handleBackToForm = () => {
    setGeneratedPDCId(null);
    setCurrentStep(1);
    form.reset();
  };

  // Si se generó un PDC, mostrar la vista previa
  if (generatedPDCId) {
    return (
      <PDCPreview 
        pdcId={generatedPDCId}
        onBack={handleBackToForm}
        onSaveToResources={handleSaveToResources}
      />
    );
  }

  // Step 1: Trimester Selection
  if (currentStep === 1) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header con explicación */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Configurar tu Plan de Desarrollo Curricular
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ahora vamos a personalizar tu PDC. Primero selecciona el trimestre que vas a planificar. 
              Esto nos ayudará a organizar mejor los contenidos según el calendario escolar.
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">¿Por qué es importante seleccionar el trimestre?</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Cada trimestre tiene objetivos específicos y contenidos prioritarios. 
                  Al seleccionar el trimestre correcto, podremos sugerirte los contenidos más apropiados 
                  y ayudarte a crear un PDC más efectivo y alineado con el currículo nacional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selección de trimestres */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground text-center mb-6">
            Selecciona el trimestre que vas a planificar
          </h2>
          
          <div className="grid gap-4">
            {[
              { id: "primero", title: "1° Trimestre", period: "Enero - Abril", description: "Inicio del año escolar, contenidos fundamentales" },
              { id: "segundo", title: "2° Trimestre", period: "Mayo - Agosto", description: "Desarrollo de competencias, evaluación continua" },
              { id: "tercero", title: "3° Trimestre", period: "Septiembre - Diciembre", description: "Cierre del año, consolidación de aprendizajes" }
            ].map((trimestre, index) => (
              <Card 
                key={trimestre.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 group"
                onClick={() => handleTrimestreSelect(trimestre.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary font-bold text-lg">{index + 1}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl">{trimestre.title}</CardTitle>
                        <CardDescription className="text-base font-medium">
                          {trimestre.period}
                        </CardDescription>
                        <p className="text-sm text-muted-foreground mt-1">
                          {trimestre.description}
                        </p>
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

  // Step 2: Grade Selection
  if (currentStep === 2) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Trimestres</span>
          </Button>
          <ChevronRight className="h-4 w-4" />
          <span>Seleccionar Grado</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            ¿Para qué grados planificarás?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona el grado para el cual crearás el PDC. 
            Esto nos permitirá adaptar los contenidos y metodologías específicas para ese nivel.
          </p>
        </div>

        {/* Información adicional */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-green-900">¿Por qué es importante seleccionar el grado?</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  Cada grado tiene objetivos de aprendizaje específicos y contenidos diferenciados. 
                  Al seleccionar el grado correcto, podremos sugerirte contenidos apropiados para la edad 
                  y nivel de desarrollo de tus estudiantes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selección de grados */}
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
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-primary font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="font-medium text-sm leading-tight">{grado}</h3>
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
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)} className="flex items-center space-x-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Grados</span>
        </Button>
        <ChevronRight className="h-4 w-4" />
        <span>Configuración del PDC - {selectedGrado}</span>
      </div>

      {/* Header con explicación */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Configuración Final del PDC
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Ahora vamos a personalizar tu Plan de Desarrollo Curricular. 
          Selecciona los contenidos que planeas enseñar y completa la información metodológica.
        </p>
      </div>

      {/* Información del proceso */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Target className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-900">¿Qué vamos a configurar?</h3>
              <div className="text-sm text-purple-800 space-y-1">
                <p>• <strong>Contenidos a enseñar:</strong> Selecciona los temas que trabajarás</p>
                <p>• <strong>Recursos y materiales:</strong> Describe los materiales que usarás</p>
                <p>• <strong>Orientaciones metodológicas:</strong> Define cómo enseñarás</p>
                <p>• <strong>Datos referenciales:</strong> Información extraída de tu PAT</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                     Área: Matemática - {selectedTrimestre} trimestre
                   </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="contenidosAEnsenar"
                    render={() => (
                      <FormItem>
                        <div className="space-y-4">
                          {dynamicContents.map((contenido, contenidoIndex) => (
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
                  <CardTitle className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>DATOS REFERENCIALES</span>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Extraído automáticamente de tu PAT
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  {isLoadingData ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="ml-2 text-muted-foreground">Cargando datos...</span>
                    </div>
                  ) : referentialData ? (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">1.1. UNIDAD EDUCATIVA:</span>
                        <span className="text-right">{referentialData.unidadEducativa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">1.2. DISTRITO EDUCATIVO:</span>
                        <span className="text-right">{referentialData.distritoEducativo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">1.3. DEPARTAMENTO:</span>
                        <span className="text-right">{referentialData.departamento}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">1.4. GESTIÓN:</span>
                        <span className="text-right">{referentialData.gestion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">1.5. AÑO DE ESCOLARIDAD:</span>
                        <span className="text-right">{referentialData.anioEscolaridad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">1.6. MAESTRO (a):</span>
                        <span className="text-right">{referentialData.maestro}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No se pudieron cargar los datos referenciales
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground">
                    TÍTULO DEL PSP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {referentialData ? (
                    <p className="text-xs font-medium text-center bg-gray-50 p-3 rounded border">
                      "{referentialData.tituloPSP}"
                    </p>
                  ) : (
                    <p className="text-xs text-center text-muted-foreground p-3">
                      Cargando título...
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-foreground flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>PERIODO DE PLANIFICACIÓN</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="mes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Mes específico</FormLabel>
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
                <CardTitle className="text-lg font-medium text-foreground flex items-center space-x-2">
                  <span>📚</span>
                  <span>Recursos y Materiales</span>
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
                <CardTitle className="text-lg font-medium text-foreground flex items-center space-x-2">
                  <span>🎯</span>
                  <span>Orientaciones Metodológicas</span>
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
              disabled={isGenerating || isDownloading}
              className="min-w-64 text-lg py-6 bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generando PDC...
                </>
              ) : isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Descargando archivo...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Generar y Descargar PDC
                </>
              )}
            </Button>
          </div>

          {/* Notificación de éxito/error */}
          {notification && (
            <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${
              notification.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {notification.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 text-red-600">⚠️</div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    {notification.type === 'success' ? '¡Éxito!' : 'Error'}
                  </h4>
                  <p className="text-sm mt-1">{notification.message}</p>
                  {notification.filename && (
                    <div className="mt-2 flex items-center space-x-2 text-xs">
                      <Download className="h-3 w-3" />
                      <span>Archivo descargado: {notification.filename}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setNotification(null)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}