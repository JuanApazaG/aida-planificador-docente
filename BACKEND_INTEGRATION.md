# 🚀 Integración con Backend - Aida Planificador Docente

## 📋 Pasos para Activar el Backend

### 1. **Configurar el Backend** (`src/config/backend.ts`)

Descomenta y configura las siguientes líneas:

```typescript
export const BACKEND_CONFIG = {
  BASE_URL: "https://tu-backend.com/api", // ✅ Cambiar por tu URL real
  ENDPOINTS: {
    UPLOAD_PAT: "/upload-pat",
    GENERATE_PDC: "/generate-pdc", 
    GET_PDC_STATUS: "/pdc-status",
    DOWNLOAD_PDC: "/download-pdc",
    GET_REFERENTIAL_DATA: "/get-referential-data", // ✅ Nuevo endpoint
    SUBMIT_PDC_CONFIG: "/submit-pdc-config", // ✅ Nuevo endpoint
    GET_PDC_PREVIEW: "/get-pdc-preview", // ✅ Nuevo endpoint
  },
  API_KEY: "tu-api-key", // ✅ Si necesitas autenticación
  TIMEOUT: 30000, // ✅ Timeout en milisegundos
};
```

### 2. **Activar el Servicio de API** (`src/config/backend.ts`)

Descomenta todo el bloque `apiService`:

```typescript
export const apiService = {
  async uploadPAT(file: File): Promise<UploadPATResponse> {
    // ✅ Descomentar todo este bloque
  },
  async generatePDC(fileId: string, options: any = {}): Promise<GeneratePDCResponse> {
    // ✅ Descomentar todo este bloque
  },
  async getReferentialData(fileId: string): Promise<ReferentialDataResponse> {
    // ✅ Descomentar todo este bloque
  },
  async submitPDCConfig(configData: PDCConfigData): Promise<SubmitPDCConfigResponse> {
    // ✅ Descomentar todo este bloque
  },
  async getPDCPreview(pdcId: string): Promise<PDCPreviewResponse> {
    // ✅ Descomentar todo este bloque
  },
  // ... resto de métodos
};
```

### 3. **Cambiar a API Real** (`src/components/PATUpload.tsx`)

Cambia las líneas 89 y 99:

```typescript
// ❌ Actual (simulación)
const uploadResult = await simulationService.uploadPAT(file);
const generateResult = await simulationService.generatePDC(uploadResult.fileId!);

// ✅ Cambiar a (backend real)
const uploadResult = await apiService.uploadPAT(file);
const generateResult = await apiService.generatePDC(uploadResult.fileId!);
```

### 4. **Cambiar a API Real** (`src/components/PDCConfigForm.tsx`)

Cambia las líneas 67, 95 y 105:

```typescript
// ❌ Actual (simulación)
const result = await simulationService.getReferentialData("mock-file-id");
const result = await simulationService.submitPDCConfig(configData);
const result = await simulationService.getPDCPreview(pdcId);

// ✅ Cambiar a (backend real)
const result = await apiService.getReferentialData(fileId);
const result = await apiService.submitPDCConfig(configData);
const result = await apiService.getPDCPreview(pdcId);
```

## 🔧 Endpoints Requeridos

Tu backend debe implementar estos endpoints:

### **POST** `/upload-pat`
- **Propósito**: Subir archivo PAT
- **Body**: `FormData` con campo `pat` (archivo)
- **Headers**: `Authorization: Bearer {api-key}`
- **Response**: 
```json
{
  "success": true,
  "fileId": "file_123456789",
  "message": "Archivo subido exitosamente"
}
```

### **POST** `/generate-pdc`
- **Propósito**: Generar PDC desde archivo PAT
- **Body**: 
```json
{
  "fileId": "file_123456789",
  "options": {
    "period": "monthly", // o "biweekly"
    "includeActivities": true,
    "includeEvaluations": true
  }
}
```
- **Headers**: `Authorization: Bearer {api-key}`, `Content-Type: application/json`
- **Response**:
```json
{
  "success": true,
  "pdcUrl": "/pdc/file_123456789",
  "status": "completed",
  "message": "PDC generado exitosamente"
}
```

### **GET** `/pdc-status/{fileId}`
- **Propósito**: Verificar estado de generación
- **Headers**: `Authorization: Bearer {api-key}`
- **Response**:
```json
{
  "success": true,
  "status": "processing", // "processing" | "completed" | "failed"
  "progress": 75,
  "pdcUrl": "/pdc/file_123456789"
}
```

### **GET** `/download-pdc/{fileId}`
- **Propósito**: Descargar PDC generado
- **Headers**: `Authorization: Bearer {api-key}`
- **Response**: `Blob` (archivo PDF)

### **GET** `/get-referential-data/{fileId}` ⭐ **NUEVO**
- **Propósito**: Extraer datos referenciales del PAT
- **Headers**: `Authorization: Bearer {api-key}`
- **Response**:
```json
{
  "success": true,
  "data": {
    "unidadEducativa": "RAFAEL CAMPOS DE LUIE",
    "distritoEducativo": "POROMA",
    "departamento": "CHUQUISACA",
    "gestion": "2025",
    "anioEscolaridad": "2DO A 6TO DE SECUNDARIA",
    "maestro": "PAOLA MONDOCORRE",
    "tituloPSP": "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
  },
  "message": "Datos referenciales extraídos exitosamente"
}
```

### **POST** `/submit-pdc-config` ⭐ **NUEVO**
- **Propósito**: Enviar configuración del PDC y generar el documento
- **Headers**: `Authorization: Bearer {api-key}`, `Content-Type: application/json`
- **Body**:
```json
{
  "trimestre": "primero",
  "grado": "Secundaria 2° Grado",
  "contenidosAEnsenar": ["Álgebra básica", "Ecuaciones lineales"],
  "mes": "enero",
  "recursos": "Pizarra, marcadores, calculadora",
  "orientacionesPractica": "Ejercicios prácticos en clase",
  "orientacionesTeoria": "Clases magistrales y lecturas",
  "orientacionesValoracion": "Exámenes y tareas",
  "orientacionesProduccion": "Proyectos matemáticos",
  "fileId": "file_123456789"
}
```
- **Response**:
```json
{
  "success": true,
  "pdcId": "pdc_987654321",
  "message": "PDC generado exitosamente"
}
```

### **GET** `/get-pdc-preview/{pdcId}` ⭐ **NUEVO**
- **Propósito**: Obtener información del PDC generado para vista previa
- **Headers**: `Authorization: Bearer {api-key}`
- **Response**:
```json
{
  "success": true,
  "pdcData": {
    "id": "pdc_987654321",
    "nombre": "PDC - Matemáticas - Enero 2025",
    "mes": "Enero",
    "grado": "Secundaria 2° Grado",
    "trimestre": "Primer Trimestre",
    "fechaCreacion": "2025-01-15T10:30:00Z",
    "urlDescarga": "/download/pdc/pdc_987654321",
    "urlVistaPrevia": "/preview/pdc/pdc_987654321",
    "tamanio": "2.5 MB"
  },
  "message": "PDC generado exitosamente"
}
```

## 🛡️ Manejo de Errores

Tu backend debe devolver errores en este formato:

```json
{
  "success": false,
  "error": "Descripción del error",
  "message": "Mensaje para el usuario"
}
```

## 📊 Códigos de Estado HTTP

- **200**: Éxito
- **400**: Error de validación (archivo inválido, formato no soportado)
- **401**: No autorizado (API key inválida)
- **413**: Archivo muy grande
- **500**: Error interno del servidor

## 🔄 Flujo de Integración Completo

1. **Usuario sube archivo** → `POST /upload-pat`
2. **Extraer datos referenciales** → `GET /get-referential-data/{fileId}` ⭐ **NUEVO**
3. **Usuario configura PDC** → `POST /submit-pdc-config` ⭐ **NUEVO**
4. **Obtener vista previa** → `GET /get-pdc-preview/{pdcId}` ⭐ **NUEVO**
5. **Descargar resultado** → `GET /download-pdc/{fileId}`

## 🧪 Testing

Para probar la integración:

1. **Descomenta** la configuración del backend
2. **Cambia** `simulationService` por `apiService`
3. **Configura** tu URL y API key
4. **Prueba** subiendo un archivo PAT
5. **Verifica** que los datos referenciales se carguen correctamente
6. **Comprueba** que el formulario de configuración funcione
7. **Valida** que la vista previa y descarga funcionen

## 📝 Notas Importantes

- ✅ **CORS**: Asegúrate de que tu backend permita requests desde tu dominio
- ✅ **File Size**: Configura límites de tamaño de archivo (recomendado: 10MB)
- ✅ **Timeout**: Configura timeouts apropiados (recomendado: 30s)
- ✅ **Security**: Implementa validación de archivos y sanitización
- ✅ **Logging**: Registra todas las operaciones para debugging
- ✅ **OCR/IA**: Para el endpoint de datos referenciales, necesitarás implementar OCR o IA para extraer información del PAT
- ✅ **PDF Generation**: Para el endpoint de configuración PDC, necesitarás generar PDFs con la información del formulario
- ✅ **File Storage**: Para los endpoints de vista previa y descarga, necesitarás almacenar los archivos generados

## 🚨 Troubleshooting

### Error: "CORS policy"
- Configura headers CORS en tu backend
- Asegúrate de que tu dominio esté en la lista blanca

### Error: "Network Error"
- Verifica que la URL del backend sea correcta
- Confirma que el servidor esté funcionando

### Error: "401 Unauthorized"
- Verifica que el API key sea correcto
- Confirma el formato del header Authorization

### Error: "413 Payload Too Large"
- Reduce el tamaño del archivo
- Aumenta el límite en tu servidor

### Error: "Datos referenciales no encontrados"
- Verifica que el archivo PAT contenga la información necesaria
- Implementa OCR robusto para extraer datos de diferentes formatos de PAT

### Error: "Error al generar PDC"
- Verifica que todos los campos del formulario sean válidos
- Confirma que el archivo PAT esté correctamente procesado
- Revisa los logs del servidor para errores de generación de PDF

### Error: "Vista previa no disponible"
- Verifica que el PDC se haya generado correctamente
- Confirma que el archivo PDF esté almacenado en el servidor
- Revisa la configuración de rutas para archivos estáticos

---

**¡Listo!** Una vez que hayas configurado tu backend, simplemente descomenta las líneas indicadas y tu aplicación estará completamente integrada. 🎉 