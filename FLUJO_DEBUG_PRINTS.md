# FLUJO COMPLETO CON PRINTS PARA DEBUG

## 🔍 FLUJO DE EJECUCIÓN CON PRINTS

### 1. **PAT UPLOAD** - `src/components/PATUpload.tsx`

```typescript
// LÍNEA 67-125: handleGeneratePDC()
console.log('=== INICIANDO GENERACIÓN PDC ===');
console.log('Nombre del archivo:', fileName);
console.log('Preview URL:', previewUrl);

// LÍNEA 92: Detalles del archivo
console.log('Archivo obtenido del input:', file);
console.log('Detalles del archivo:');
console.log('- Nombre:', file.name);
console.log('- Tamaño:', file.size, 'bytes');
console.log('- Tipo:', file.type);
console.log('- Última modificación:', file.lastModified);

// LÍNEA 105: Envío al backend
console.log('Enviando archivo al backend:', file.name, file.size);
const uploadResult = await apiService.uploadPAT(file);
console.log('Respuesta del backend:', uploadResult);

// LÍNEA 107: Verificación de éxito
if (!uploadResult.success) {
  throw new Error(uploadResult.error || "Error al subir el archivo");
}

// LÍNEA 115: Datos extraídos
console.log('✅ Datos del PAT extraídos y guardados exitosamente');
console.log('📄 Datos extraídos:', uploadResult.extractedData);

// LÍNEA 120: Navegación
console.log('🚀 Navegando a configuración de PDC...');
window.location.href = '/configurar-pdc';
```

### 2. **BACKEND UPLOAD** - `src/config/backend.ts`

```typescript
// LÍNEA 96-170: apiService.uploadPAT()
console.log('=== INICIANDO UPLOAD PAT ===');
console.log('Archivo:', file.name, 'Tamaño:', file.size, 'Tipo:', file.type);

// LÍNEA 107: FormData
console.log('FormData creado, verificando contenido:');
for (const [key, value] of formData.entries()) {
  console.log('Key:', key, 'Value:', value);
}

// LÍNEA 112: URL del endpoint
console.log('URL del endpoint:', `${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.UPLOAD_PAT}`);

// LÍNEA 120: Respuesta del servidor
console.log('Respuesta del servidor:');
console.log('Status:', response.status);
console.log('StatusText:', response.statusText);
console.log('Headers:', Object.fromEntries(response.headers.entries()));

// LÍNEA 129: Body de la respuesta
console.log('Body de la respuesta:', responseText);

// LÍNEA 136: Parseo JSON
console.log('✅ Datos JSON parseados correctamente');

// LÍNEA 140: Guardado en localStorage
localStorage.setItem('patExtractedData', JSON.stringify(extractedData));
console.log('✅ Datos guardados en localStorage');

// LÍNEA 150: Upload exitoso
console.log('✅ Upload exitoso');
```

### 3. **LOAD REFERENTIAL DATA** - `src/components/PDCConfigForm.tsx`

```typescript
// LÍNEA 73-136: loadReferentialData()
console.log('🔄 Cargando datos referenciales...');

// LÍNEA 75: Verificar datos guardados
const savedPATData = localStorage.getItem('patExtractedData');
if (savedPATData) {
  const patData = JSON.parse(savedPATData);
  console.log('📄 Usando datos del PAT guardado:', patData);
  
  // LÍNEA 78: Extraer datos personales
  const datosPersonales = patData.datosPersonales || {};
  console.log('👤 Datos personales extraídos:', datosPersonales);
  
  // LÍNEA 79-87: Configurar datos referenciales
  setReferentialData({
    unidadEducativa: datosPersonales.unidadEducativa || "RAFAEL CAMPOS DE LUJE",
    distritoEducativo: datosPersonales.distritoEducativo || "POROMA",
    departamento: datosPersonales.departamento || "CHUQUISACA",
    gestion: datosPersonales.gestion || "2025",
    anioEscolaridad: datosPersonales.anioEscolaridad || "2DO A 6TO DE SECUNDARIA",
    maestro: datosPersonales.maestro || "PAOLA MONDOCORRE",
    tituloPSP: datosPersonales.tituloPSP || "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ"
  });
  console.log('✅ Datos referenciales configurados desde PAT');
} else {
  console.log('⚠️ No se encontraron datos del PAT, usando valores por defecto');
}
```

### 4. **TRIMESTRE SELECTION** - `src/components/PDCConfigForm.tsx`

```typescript
// LÍNEA 137-157: handleTrimestreSelect()
console.log('🎯 === SELECCIÓN DE TRIMESTRE ===');
console.log('Trimestre seleccionado:', trimestre);

// LÍNEA 140: Guardar en localStorage
localStorage.setItem('selectedTrimestre', trimestre);
console.log('💾 Trimestre guardado en localStorage:', trimestre);

// LÍNEA 142: Log con jsonLogger
import('../utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.logUserSelections(trimestre);
});

// LÍNEA 145: Navegar al siguiente paso
console.log('➡️ Navegando al siguiente paso...');
setCurrentStep(2);
```

### 5. **GRADO SELECTION** - `src/components/PDCConfigForm.tsx`

```typescript
// LÍNEA 158-178: handleGradoSelect()
console.log('🎓 === SELECCIÓN DE GRADO ===');
console.log('Grado seleccionado:', grado);

// LÍNEA 161: Guardar en localStorage
localStorage.setItem('selectedGrado', grado);
console.log('💾 Grado guardado en localStorage:', grado);

// LÍNEA 164: Log con jsonLogger
import('../utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.logUserSelections(selectedTrimestre, grado);
});

// LÍNEA 167: Navegar al siguiente paso
console.log('➡️ Navegando al siguiente paso...');
setCurrentStep(3);
```

### 6. **FORM SUBMISSION** - `src/components/PDCConfigForm.tsx`

```typescript
// LÍNEA 179-270: onSubmit()
console.log('✅ Formulario enviado con datos:', data);
console.log('📝 Contenidos a enseñar seleccionados:', data.contenidosAEnsenar);

// LÍNEA 185: Obtener datos del PAT
const savedPATData = localStorage.getItem('patExtractedData');
const patData = savedPATData ? JSON.parse(savedPATData) : {};
console.log('📄 Datos del PAT recuperados:', patData);

// LÍNEA 187-220: Preparar datos completos
const completeDataForGeneration = {
  datosPersonales: {
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

// LÍNEA 222-230: Debug logs
import('../utils/debugFlow').then(({ debugFlow }) => {
  debugFlow.logCompleteDataForGeneration(completeDataForGeneration);
});

import('../utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.logFinalJSON(completeDataForGeneration);
});

// LÍNEA 232-240: Mostrar en consola
console.log('🚀 === DATOS PARA GENERAR PDC (ESTRUCTURA CORRECTA) ===');
console.log('📊 JSON completo que se enviará:');
console.log(JSON.stringify(completeDataForGeneration, null, 2));
console.log('📝 Resumen de datos:');
console.log('- Trimestre:', completeDataForGeneration.configuracionUsuario.trimestreSeleccionado);
console.log('- Grado:', completeDataForGeneration.configuracionUsuario.gradoSeleccionado);
console.log('- Contenidos seleccionados:', completeDataForGeneration.configuracionUsuario.contenidosSeleccionados.length, 'elementos');
console.log('- Mes:', completeDataForGeneration.configuracionUsuario.mesSeleccionado);
console.log('- Título PSP:', completeDataForGeneration.datosPersonales.tituloPSP);
console.log('- Plan Trimestralizado:', completeDataForGeneration.datosPersonales.PlanAnualTrimestralizado.length, 'trimestres');

// LÍNEA 242: Guardar en localStorage
localStorage.setItem('pdcCompleteData', JSON.stringify(completeDataForGeneration));
console.log('💾 Datos completos guardados en localStorage como "pdcCompleteData"');

// LÍNEA 245-250: Preparar datos para backend (⚠️ PROBLEMA)
const configData: PDCConfigData = {
  ...data,
  fileId: fileId,
};
console.log('⚠️ configData que se enviará (INCORRECTO):', configData);
console.log('✅ completeDataForGeneration que NO se enviará (CORRECTO):', completeDataForGeneration);

// LÍNEA 255: Envío al backend (⚠️ PROBLEMA)
const result = await apiService.submitPDCConfig(configData); // ❌ INCORRECTO
console.log('📤 Resultado del envío:', result);
```

### 7. **BACKEND SUBMIT** - `src/config/backend.ts`

```typescript
// LÍNEA 280-311: apiService.submitPDCConfig()
console.log('📤 === ENVIANDO CONFIGURACIÓN PDC ===');
console.log('Datos a enviar:', configData);
console.log('URL del endpoint:', `${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.SUBMIT_PDC_CONFIG}`);

// LÍNEA 285-295: Request
const response = await fetch(`${BACKEND_CONFIG.BASE_URL}${BACKEND_CONFIG.ENDPOINTS.SUBMIT_PDC_CONFIG}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(configData), // ⚠️ PROBLEMA: Envía configData en lugar de completeDataForGeneration
  signal: AbortSignal.timeout(BACKEND_CONFIG.TIMEOUT),
});

// LÍNEA 297: Verificación de respuesta
if (!response.ok) {
  throw new Error(`Error ${response.status}: ${response.statusText}`);
}

// LÍNEA 299: Parsear respuesta
const data = await response.json();
console.log('📥 Respuesta del backend:', data);

// LÍNEA 300: Retornar resultado
return { 
  success: true, 
  pdcId: data.pdcId,
  message: data.message 
};
```

---

## 🚨 PROBLEMAS IDENTIFICADOS EN EL FLUJO

### 1. **Envío incorrecto de datos**
- **Línea 255 en PDCConfigForm.tsx**: Se envía `configData` en lugar de `completeDataForGeneration`
- **Impacto**: El backend recibe datos incompletos

### 2. **Filtrado no implementado**
- **PlanAnualTrimestralizado**: Se envía todo el array en lugar de solo el trimestre seleccionado
- **Contenidos**: Se envían todos los contenidos en lugar de solo los seleccionados

### 3. **Logs inconsistentes**
- Se guarda `completeDataForGeneration` pero se envía `configData`
- Los logs muestran datos diferentes a los que se envían

---

## 🔧 SOLUCIONES PARA IMPLEMENTAR

### 1. **Corregir envío de datos**
```typescript
// En PDCConfigForm.tsx línea 255
// CAMBIAR:
const result = await apiService.submitPDCConfig(configData);

// POR:
const result = await apiService.submitPDCConfig(completeDataForGeneration);
```

### 2. **Implementar filtrado de trimestre**
```typescript
// En completeDataForGeneration, antes de la línea 220
const trimestreSeleccionado = data.trimestre;
const planFiltrado = patData.datosPersonales?.PlanAnualTrimestralizado?.filter(
  trimestre => trimestre.trimestre === trimestreSeleccionado
) || [];

// Cambiar línea 220:
PlanAnualTrimestralizado: planFiltrado
```

### 3. **Implementar filtrado de contenidos**
```typescript
// Después del filtrado de trimestre
const contenidosSeleccionados = data.contenidosAEnsenar || [];
const contenidosFiltrados = planFiltrado.map(trimestre => ({
  ...trimestre,
  contenidos: trimestre.contenidos?.filter(contenido => 
    contenidosSeleccionados.includes(contenido.tema)
  ) || []
}));

// Usar contenidosFiltrados en lugar de planFiltrado
```

---

## 📊 COMANDOS PARA VER EL FLUJO

### Ver todos los logs en consola:
```javascript
// En la consola del navegador
import('./src/utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.showAllJSONs();
});
```

### Ver datos guardados:
```javascript
// En la consola del navegador
console.log('patExtractedData:', JSON.parse(localStorage.getItem('patExtractedData') || '{}'));
console.log('selectedTrimestre:', localStorage.getItem('selectedTrimestre'));
console.log('selectedGrado:', localStorage.getItem('selectedGrado'));
console.log('pdcCompleteData:', JSON.parse(localStorage.getItem('pdcCompleteData') || '{}'));
```

### Ver en la UI:
- Ir a `/json-viewer`
- Hacer clic en "Ver JSONs" en el header
