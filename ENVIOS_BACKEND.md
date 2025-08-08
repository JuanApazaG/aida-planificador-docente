# ENVÍOS DE JSONs AL BACKEND

## 📤 UBICACIONES DONDE SE ENVÍAN JSONs

### 1. **PAT UPLOAD** - `src/config/backend.ts`

**Función**: `apiService.uploadPAT(file: File)`
**Líneas**: 96-170

```typescript
// ENVÍO DEL ARCHIVO PAT
const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.UPLOAD_PAT}`, {
  method: 'POST',
  body: formData, // FormData con archivo docx
  signal: AbortSignal.timeout(60000),
});
```

**Datos enviados**:
- `FormData` con archivo docx
- Key: `'archivo'`
- Value: `File` object

**Endpoint**: `POST http://192.168.1.101:3000/extract-text`

**Respuesta guardada en**:
- `localStorage.setItem('patExtractedData', JSON.stringify(extractedData))`
- `jsonLogger.logPATExtracted(extractedData)`

---

### 2. **PDC CONFIG SUBMIT** - `src/config/backend.ts`

**Función**: `apiService.submitPDCConfig(configData: PDCConfigData)`
**Líneas**: 280-311

```typescript
// ENVÍO DE CONFIGURACIÓN PDC
const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.SUBMIT_PDC_CONFIG}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(configData), // ⚠️ PROBLEMA: Envía configData en lugar de completeDataForGeneration
  signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
});
```

**Datos enviados**:
```typescript
// configData (actual - INCORRECTO)
{
  trimestre: "PRIMERO",
  grado: "SEGUNDO", 
  contenidosAEnsenar: ["Álgebra básica", "Ecuaciones lineales"],
  mes: "ENERO",
  recursos: "Pizarra, marcadores",
  orientacionesPractica: "...",
  orientacionesTeoria: "...",
  orientacionesValoracion: "...",
  orientacionesProduccion: "...",
  fileId: "file_123456789"
}

// completeDataForGeneration (CORRECTO - NO SE ENVÍA)
{
  datosPersonales: {
    objetivoHolisticoDeNivel: "...",
    unidadEducativa: "RAFAEL CAMPOS DE LUJE",
    maestro: "PAOLA MONDOCORRE",
    tituloPSP: "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ",
    anioEscolaridad: "2DO A 6TO DE SECUNDARIA",
    departamento: "CHUQUISACA",
    gestion: "2025",
    distritoEducativo: "POROMA",
    PlanAnualTrimestralizado: [...]
  },
  configuracionUsuario: {
    trimestreSeleccionado: "PRIMERO",
    gradoSeleccionado: "SEGUNDO",
    contenidosSeleccionados: [...],
    mesSeleccionado: "ENERO",
    recursos: "...",
    orientacionesPractica: "...",
    orientacionesTeoria: "...",
    orientacionesValoracion: "...",
    orientacionesProduccion: "..."
  },
  metadatos: {
    fileId: "file_123456789",
    fechaCreacion: "2025-01-07T15:30:00.000Z",
    estado: "listo_para_generar"
  }
}
```

**Endpoint**: `POST http://192.168.1.101:3000/submit-pdc-config`

---

### 3. **PDC CONFIG FORM** - `src/components/PDCConfigForm.tsx`

**Función**: `onSubmit(data: FormData)`
**Líneas**: 179-270

```typescript
// PREPARACIÓN DE DATOS COMPLETOS
const completeDataForGeneration = {
  datosPersonales: {
    // Datos del PAT extraído
    objetivoHolisticoDeNivel: patData.datosPersonales?.objetivoHolisticoDeNivel || "",
    unidadEducativa: patData.datosPersonales?.unidadEducativa || "",
    maestro: patData.datosPersonales?.maestro || "",
    tituloPSP: patData.datosPersonales?.tituloPSP || "",
    anioEscolaridad: patData.datosPersonales?.anioEscolaridad || "",
    departamento: patData.datosPersonales?.departamento || "",
    gestion: patData.datosPersonales?.gestion || "",
    distritoEducativo: patData.datosPersonales?.distritoEducativo || "",
    PlanAnualTrimestralizado: patData.datosPersonales?.PlanAnualTrimestralizado || []
  },
  configuracionUsuario: {
    trimestreSeleccionado: data.trimestre,
    gradoSeleccionado: data.grado,
    contenidosSeleccionados: data.contenidosAEnsenar || [],
    mesSeleccionado: data.mes,
    recursos: data.recursos || "",
    orientacionesPractica: data.orientacionesPractica || "",
    orientacionesTeoria: data.orientacionesTeoria || "",
    orientacionesValoracion: data.orientacionesValoracion || "",
    orientacionesProduccion: data.orientacionesProduccion || ""
  },
  metadatos: {
    fileId: fileId,
    fechaCreacion: new Date().toISOString(),
    estado: 'listo_para_generar'
  }
};

// ⚠️ PROBLEMA: Se guarda completeDataForGeneration pero se envía configData
localStorage.setItem('pdcCompleteData', JSON.stringify(completeDataForGeneration));

// LÍNEA 255 - ENVÍO INCORRECTO
const result = await apiService.submitPDCConfig(configData); // ❌ INCORRECTO
// Debería ser:
// const result = await apiService.submitPDCConfig(completeDataForGeneration); // ✅ CORRECTO
```

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### 1. **Envío de datos incorrectos**
- **Archivo**: `src/components/PDCConfigForm.tsx` (línea 255)
- **Problema**: Se envía `configData` en lugar de `completeDataForGeneration`
- **Impacto**: El backend recibe datos incompletos sin la información del PAT

### 2. **Filtrado de trimestre no implementado**
- **Problema**: Se envía todo el `PlanAnualTrimestralizado` en lugar de solo el trimestre seleccionado
- **Solución necesaria**: Filtrar por `trimestreSeleccionado`

### 3. **Filtrado de contenidos no implementado**
- **Problema**: Se envían todos los contenidos del trimestre en lugar de solo los seleccionados
- **Solución necesaria**: Filtrar por `contenidosSeleccionados`

---

## 🔧 SOLUCIONES NECESARIAS

### 1. **Corregir envío de datos**
```typescript
// En src/components/PDCConfigForm.tsx línea 255
// CAMBIAR:
const result = await apiService.submitPDCConfig(configData);

// POR:
const result = await apiService.submitPDCConfig(completeDataForGeneration);
```

### 2. **Implementar filtrado de trimestre**
```typescript
// En completeDataForGeneration, filtrar PlanAnualTrimestralizado
const trimestreSeleccionado = data.trimestre;
const planFiltrado = patData.datosPersonales?.PlanAnualTrimestralizado?.filter(
  trimestre => trimestre.trimestre === trimestreSeleccionado
) || [];

// Usar planFiltrado en lugar de todo el array
PlanAnualTrimestralizado: planFiltrado
```

### 3. **Implementar filtrado de contenidos**
```typescript
// Dentro del trimestre filtrado, filtrar contenidos seleccionados
const contenidosSeleccionados = data.contenidosAEnsenar || [];
const contenidosFiltrados = planFiltrado.map(trimestre => ({
  ...trimestre,
  contenidos: trimestre.contenidos?.filter(contenido => 
    contenidosSeleccionados.includes(contenido.tema)
  ) || []
}));
```

---

## 📊 LOGS Y DEBUG

### Ver qué se está enviando actualmente:
```javascript
// En la consola del navegador
console.log('configData que se envía:', configData);
console.log('completeDataForGeneration que NO se envía:', completeDataForGeneration);
```

### Ver todos los JSONs guardados:
```javascript
// En la consola del navegador
import('./src/utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.showAllJSONs();
});
```

### Ver en la UI:
- Ir a `/json-viewer`
- Hacer clic en "Ver JSONs" en el header
