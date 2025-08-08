// ===== CONFIGURACIÓN BACKEND =====
// Configuración del backend real

export const BACKEND_CONFIG = {
  BASE_URL: "http://192.168.1.101:3000",
  ENDPOINTS: {
    UPLOAD_PAT: "/extract-text",
    GENERATE_PDC: "/generate-pdc",
    GET_PDC_STATUS: "/pdc-status",
    DOWNLOAD_PDC: "/download-pdc",
    GET_REFERENTIAL_DATA: "/get-referential-data",
    SUBMIT_PDC_CONFIG: "/generar-dcp",
    GET_PDC_PREVIEW: "/get-pdc-preview",
  },
  API_KEY: "", // Si necesitas autenticación
  TIMEOUT: 30000, // Timeout en milisegundos
};

// ===== TIPOS PARA EL BACKEND =====
export interface UploadPATResponse {
  success: boolean;
  fileId?: string;
  error?: string;
  message?: string;
  extractedData?: Record<string, unknown>; // Agregar los datos extraídos del PAT
}

export interface GeneratePDCResponse {
  success: boolean;
  pdcUrl?: string;
  error?: string;
  message?: string;
  status?: 'processing' | 'completed' | 'failed';
}

export interface PDCStatusResponse {
  success: boolean;
  status: 'processing' | 'completed' | 'failed';
  progress?: number;
  error?: string;
  pdcUrl?: string;
}

// ===== NUEVO TIPO PARA DATOS REFERENCIALES =====
export interface ReferentialDataResponse {
  success: boolean;
  data?: {
    unidadEducativa: string;
    distritoEducativo: string;
    departamento: string;
    gestion: string;
    anioEscolaridad: string;
    maestro: string;
    tituloPSP: string;
  };
  error?: string;
  message?: string;
}

// ===== NUEVOS TIPOS PARA CONFIGURACIÓN PDC =====
export interface PDCConfigData {
  trimestre: string;
  grado: string;
  contenidosAEnsenar: string[];
  mes: string;
  recursos: string;
  orientacionesPractica: string;
  orientacionesTeoria: string;
  orientacionesValoracion: string;
  orientacionesProduccion: string;
  fileId: string; // ID del archivo PAT subido
}

// Nueva interfaz para el formato completo de datos que se envía al backend
export interface CompletePDCData {
  datosPersonales: {
    objetivoHolisticoDeNivel: string;
    unidadEducativa: string;
    maestro: string;
    tituloPSP: string;
    anioEscolaridad: string;
    departamento: string;
    gestion: string;
    distritoEducativo: string;
    mes: string;
    PlanAnualTrimestralizado: Array<{
      trimestre: string;
      actividadesPlanAccionPspPcpyA: string;
      campoCienciaTecnologiaYProduccion: string;
      contenidos: Array<{
        tema: string;
        subtemas: string[];
      }>;
      perfilesSalida: string;
      anioEscolaridad: string;
    }>;
  };
}

export interface SubmitPDCConfigResponse {
  success: boolean;
  pdcId?: string;
  error?: string;
  message?: string;
  downloadedFile?: string;
}

export interface PDCPreviewResponse {
  success: boolean;
  pdcData?: {
    id: string;
    nombre: string;
    mes: string;
    grado: string;
    trimestre: string;
    fechaCreacion: string;
    urlDescarga: string;
    urlVistaPrevia: string;
    tamanio: string;
  };
  error?: string;
  message?: string;
}

// ===== SERVICIO DE API =====
export const apiService = {
  async uploadPAT(file: File): Promise<UploadPATResponse> {
    try {
      console.log('=== INICIANDO UPLOAD PAT ===');
      console.log('Archivo:', file.name, 'Tamaño:', file.size, 'Tipo:', file.type);
      
      const formData = new FormData();
      formData.append('archivo', file);
      
      console.log('FormData creado, verificando contenido:');
      for (const [key, value] of formData.entries()) {
        console.log('Key:', key, 'Value:', value);
      }
      
      console.log('URL del endpoint:', `${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.UPLOAD_PAT}`);
      
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.UPLOAD_PAT}`, {
        method: 'POST',
        body: formData,
        signal: AbortSignal.timeout(60000), // Aumentar timeout a 60 segundos
      });
      
      console.log('Respuesta del servidor:');
      console.log('Status:', response.status);
      console.log('StatusText:', response.statusText);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));
      
             // Intentar leer el body de la respuesta para más detalles
       let responseText = '';
       let extractedData = null;
       try {
         responseText = await response.text();
         console.log('Body de la respuesta:', responseText);
         
         // Intentar parsear como JSON para guardar los datos
         try {
           extractedData = JSON.parse(responseText);
           console.log('✅ Datos JSON parseados correctamente');
           
                       // Importar debugFlow y jsonLogger para logging
            import('../utils/debugFlow').then(({ debugFlow }) => {
              debugFlow.logPATExtraction(extractedData);
            });
            
            import('../utils/jsonLogger').then(({ jsonLogger }) => {
              jsonLogger.logPATExtracted(extractedData);
            });
           
           // Guardar en localStorage para uso posterior
           localStorage.setItem('patExtractedData', JSON.stringify(extractedData));
           console.log('✅ Datos guardados en localStorage');
         } catch (parseError) {
           console.log('⚠️ No se pudo parsear como JSON:', parseError);
         }
       } catch (e) {
         console.log('No se pudo leer el body de la respuesta');
       }
       
       // No importa la respuesta, solo que se envíe exitosamente
       if (response.status >= 200 && response.status < 300) {
         console.log('✅ Upload exitoso');
         return { 
           success: true, 
           fileId: `file_${Date.now()}`,
           message: "Archivo enviado exitosamente",
           extractedData: extractedData
         };
       } else {
         console.log('❌ Error en la respuesta del servidor');
         throw new Error(`Error ${response.status}: ${response.statusText} - ${responseText}`);
       }
    } catch (error) {
      console.log('❌ Error en uploadPAT:', error);
      console.log('Tipo de error:', error.constructor.name);
      console.log('Stack trace:', error.stack);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },

  async generatePDC(fileId: string, options: Record<string, unknown> = {}): Promise<GeneratePDCResponse> {
    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GENERATE_PDC}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileId,
          options,
        }),
        signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { success: true, pdcUrl: data.pdcUrl, status: data.status };
    } catch (error) {
      console.error('Error generating PDC:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },

  async getPDCStatus(fileId: string): Promise<PDCStatusResponse> {
    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GET_PDC_STATUS}/${fileId}`, {
        method: 'GET',
        signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { 
        success: true, 
        status: data.status, 
        progress: data.progress,
        pdcUrl: data.pdcUrl 
      };
    } catch (error) {
      console.error('Error getting PDC status:', error);
      return { 
        success: false, 
        status: 'failed',
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },

  async downloadPDC(fileId: string): Promise<Blob> {
    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.DOWNLOAD_PDC}/${fileId}`, {
        method: 'GET',
        signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error downloading PDC:', error);
      throw error;
    }
  },

  // ===== NUEVO MÉTODO PARA DATOS REFERENCIALES =====
  async getReferentialData(fileId: string): Promise<ReferentialDataResponse> {
    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GET_REFERENTIAL_DATA}/${fileId}`, {
        method: 'GET',
        signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { 
        success: true, 
        data: data.data 
      };
    } catch (error) {
      console.error('Error getting referential data:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },

  // ===== NUEVOS MÉTODOS PARA CONFIGURACIÓN PDC =====
  async submitPDCConfig(configData: PDCConfigData | CompletePDCData): Promise<SubmitPDCConfigResponse> {
    try {
      console.log('📤 === ENVIANDO DATOS AL BACKEND ===');
      console.log('📊 Tipo de datos:', 'datosPersonales' in configData ? 'CompletePDCData' : 'PDCConfigData');
      console.log('📋 Datos a enviar:', configData);
      
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.SUBMIT_PDC_CONFIG}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData),
        signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
      });
      
      console.log('📥 Respuesta del servidor:');
      console.log('Status:', response.status);
      console.log('StatusText:', response.statusText);
      console.log('Content-Type:', response.headers.get('content-type'));
      
      // Verificar si la respuesta es un archivo Word (200 OK)
      if (response.status === 200) {
        const contentType = response.headers.get('content-type');
        const contentDisposition = response.headers.get('content-disposition');
        
        console.log('✅ Respuesta exitosa (200) - Verificando tipo de contenido');
        console.log('Content-Type:', contentType);
        console.log('Content-Disposition:', contentDisposition);
        
        // Si es un archivo Word o documento
        if (contentType && (
          contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
          contentType.includes('application/msword') ||
          contentType.includes('application/octet-stream') ||
          contentType.includes('application/zip')
        )) {
          console.log('📄 Detectado archivo Word - Descargando...');
          
          // Obtener el blob del archivo
          const blob = await response.blob();
          
          // Extraer nombre del archivo del header Content-Disposition
          let filename = 'PDC_Generado.docx';
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, '');
            }
          }
          
          // Crear URL del blob y descargar
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          console.log('✅ Archivo Word descargado exitosamente:', filename);
          
          return { 
            success: true, 
            pdcId: `pdc_${Date.now()}`,
            message: `PDC generado y descargado exitosamente: ${filename}`,
            downloadedFile: filename
          };
        }
      }
      
      // Si no es un archivo Word, intentar parsear como JSON
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Datos recibidos del backend:', data);
      
      return { 
        success: true, 
        pdcId: data.pdcId,
        message: data.message 
      };
    } catch (error) {
      console.error('❌ Error submitting PDC config:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },

  async getPDCPreview(pdcId: string): Promise<PDCPreviewResponse> {
    try {
      const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GET_PDC_PREVIEW}/${pdcId}`, {
        method: 'GET',
        signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return { 
        success: true, 
        pdcData: data.pdcData 
      };
    } catch (error) {
      console.error('Error getting PDC preview:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      };
    }
  },
};

// ===== FUNCIONES DE SIMULACIÓN =====
// Estas funciones se usan mientras el backend no esté listo
export const simulationService = {
  async uploadPAT(file: File): Promise<UploadPATResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          fileId: `file_${Date.now()}`,
          message: "Archivo subido exitosamente (simulación)"
        });
      }, 2000);
    });
  },

  async generatePDC(fileId: string): Promise<GeneratePDCResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          pdcUrl: `/pdc/${fileId}`,
          status: 'completed',
          message: "PDC generado exitosamente (simulación)"
        });
      }, 3000);
    });
  },

  async getPDCStatus(fileId: string): Promise<PDCStatusResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          status: 'completed',
          progress: 100,
          pdcUrl: `/pdc/${fileId}`
        });
      }, 1000);
    });
  },

  // ===== NUEVA FUNCIÓN DE SIMULACIÓN PARA DATOS REFERENCIALES =====
  async getReferentialData(fileId: string): Promise<ReferentialDataResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          data: {
            unidadEducativa: "RAFAEL CAMPOS DE LUIE",
            distritoEducativo: "POROMA",
            departamento: "CHUQUISACA",
            gestion: "2025",
            anioEscolaridad: "2DO A 6TO DE SECUNDARIA",
            maestro: "PAOLA MONDOCORRE",
            tituloPSP: "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
          },
          message: "Datos referenciales extraídos exitosamente (simulación)"
        });
      }, 1000);
    });
  },

  // ===== NUEVAS FUNCIONES DE SIMULACIÓN PARA CONFIGURACIÓN PDC =====
  async submitPDCConfig(configData: PDCConfigData): Promise<SubmitPDCConfigResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          pdcId: `pdc_${Date.now()}`,
          message: "Configuración enviada exitosamente (simulación)"
        });
      }, 2000);
    });
  },

  async getPDCPreview(pdcId: string): Promise<PDCPreviewResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          success: true, 
          pdcData: {
            id: pdcId,
            nombre: "PDC - Matemáticas - Enero 2025",
            mes: "Enero",
            grado: "Secundaria 2° Grado",
            trimestre: "Primer Trimestre",
            fechaCreacion: new Date().toISOString(),
            urlDescarga: `/download/pdc/${pdcId}`,
            urlVistaPrevia: `/preview/pdc/${pdcId}`,
            tamanio: "2.5 MB"
          },
          message: "PDC generado exitosamente (simulación)"
        });
      }, 1500);
    });
  },
}; 