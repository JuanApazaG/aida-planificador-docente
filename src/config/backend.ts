// ===== CONFIGURACIÓN BACKEND =====
// TODO: Configurar cuando el backend esté listo

export const BACKEND_CONFIG = {
  // BASE_URL: "https://tu-backend.com/api", // Cambiar por tu URL real
  // ENDPOINTS: {
  //   UPLOAD_PAT: "/upload-pat",
  //   GENERATE_PDC: "/generate-pdc",
  //   GET_PDC_STATUS: "/pdc-status",
  //   DOWNLOAD_PDC: "/download-pdc",
  //   GET_REFERENTIAL_DATA: "/get-referential-data", // Nuevo endpoint
  //   SUBMIT_PDC_CONFIG: "/submit-pdc-config", // ✅ Nuevo endpoint
  //   GET_PDC_PREVIEW: "/get-pdc-preview", // ✅ Nuevo endpoint
  // },
  // API_KEY: "tu-api-key", // Si necesitas autenticación
  // TIMEOUT: 30000, // Timeout en milisegundos
};

// ===== TIPOS PARA EL BACKEND =====
export interface UploadPATResponse {
  success: boolean;
  fileId?: string;
  error?: string;
  message?: string;
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

export interface SubmitPDCConfigResponse {
  success: boolean;
  pdcId?: string;
  error?: string;
  message?: string;
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
// TODO: Descomentar cuando el backend esté listo
export const apiService = {
  // async uploadPAT(file: File): Promise<UploadPATResponse> {
  //   try {
  //     const formData = new FormData();
  //     formData.append('pat', file);
  //     
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.UPLOAD_PAT}`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       body: formData,
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     const data = await response.json();
  //     return { success: true, fileId: data.fileId };
  //   } catch (error) {
  //     console.error('Error uploading PAT:', error);
  //     return { 
  //       success: false, 
  //       error: error instanceof Error ? error.message : 'Error desconocido' 
  //     };
  //   }
  // },

  // async generatePDC(fileId: string, options: any = {}): Promise<GeneratePDCResponse> {
  //   try {
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GENERATE_PDC}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         fileId,
  //         options,
  //       }),
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     const data = await response.json();
  //     return { success: true, pdcUrl: data.pdcUrl, status: data.status };
  //   } catch (error) {
  //     console.error('Error generating PDC:', error);
  //     return { 
  //       success: false, 
  //       error: error instanceof Error ? error.message : 'Error desconocido' 
  //     };
  //   }
  // },

  // async getPDCStatus(fileId: string): Promise<PDCStatusResponse> {
  //   try {
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GET_PDC_STATUS}/${fileId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     const data = await response.json();
  //     return { 
  //       success: true, 
  //       status: data.status, 
  //       progress: data.progress,
  //       pdcUrl: data.pdcUrl 
  //     };
  //   } catch (error) {
  //     console.error('Error getting PDC status:', error);
  //     return { 
  //       success: false, 
  //       status: 'failed',
  //       error: error instanceof Error ? error.message : 'Error desconocido' 
  //     };
  //   }
  // },

  // async downloadPDC(fileId: string): Promise<Blob> {
  //   try {
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.DOWNLOAD_PDC}/${fileId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     return await response.blob();
  //   } catch (error) {
  //     console.error('Error downloading PDC:', error);
  //     throw error;
  //   }
  // },

  // ===== NUEVO MÉTODO PARA DATOS REFERENCIALES =====
  // async getReferentialData(fileId: string): Promise<ReferentialDataResponse> {
  //   try {
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GET_REFERENTIAL_DATA}/${fileId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     const data = await response.json();
  //     return { 
  //       success: true, 
  //       data: data.data 
  //     };
  //   } catch (error) {
  //     console.error('Error getting referential data:', error);
  //     return { 
  //       success: false, 
  //       error: error instanceof Error ? error.message : 'Error desconocido' 
  //     };
  //   }
  // },

  // ===== NUEVOS MÉTODOS PARA CONFIGURACIÓN PDC =====
  // async submitPDCConfig(configData: PDCConfigData): Promise<SubmitPDCConfigResponse> {
  //   try {
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.SUBMIT_PDC_CONFIG}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       body: JSON.stringify(configData),
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     const data = await response.json();
  //     return { 
  //       success: true, 
  //       pdcId: data.pdcId,
  //       message: data.message 
  //     };
  //   } catch (error) {
  //     console.error('Error submitting PDC config:', error);
  //     return { 
  //       success: false, 
  //       error: error instanceof Error ? error.message : 'Error desconocido' 
  //     };
  //   }
  // },

  // async getPDCPreview(pdcId: string): Promise<PDCPreviewResponse> {
  //   try {
  //     const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.GET_PDC_PREVIEW}/${pdcId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${BACKEND_CONFIG.API_KEY}`,
  //       },
  //       signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
  //     });
  //     
  //     if (!response.ok) {
  //       throw new Error(`Error ${response.status}: ${response.statusText}`);
  //     }
  //     
  //     const data = await response.json();
  //     return { 
  //       success: true, 
  //       pdcData: data.pdcData 
  //     };
  //   } catch (error) {
  //     console.error('Error getting PDC preview:', error);
  //     return { 
  //       success: false, 
  //       error: error instanceof Error ? error.message : 'Error desconocido' 
  //     };
  //   }
  // },
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