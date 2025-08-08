# FLUJO DE JSONs EN LA APLICACIÓN

## 📍 UBICACIONES DONDE SE GUARDAN LOS JSONs

### 1. **PAT EXTRACTED DATA** (Datos extraídos del PAT)
- **Archivo**: `src/config/backend.ts` (líneas 130-140)
- **localStorage Key**: `'patExtractedData'`
- **Función**: `apiService.uploadPAT()`
- **Contenido**: JSON completo que devuelve el backend con la estructura:
  ```json
  {
    "datosPersonales": {
      "objetivoHolisticoDeNivel": "...",
      "unidadEducativa": "RAFAEL CAMPOS DE LUJE",
      "maestro": "PAOLA MONDOCORRE",
      "tituloPSP": "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ",
      "anioEscolaridad": "2DO A 6TO DE SECUNDARIA",
      "departamento": "CHUQUISACA",
      "gestion": "2025",
      "distritoEducativo": "POROMA",
      "PlanAnualTrimestralizado": [...]
    }
  }
  ```

### 2. **USER SELECTIONS** (Selecciones del usuario)
- **Archivo**: `src/components/PDCConfigForm.tsx` (líneas 137-157)
- **localStorage Keys**: 
  - `'selectedTrimestre'`
  - `'selectedGrado'`
- **Funciones**: 
  - `handleTrimestreSelect()`
  - `handleGradoSelect()`

### 3. **COMPLETE PDC DATA** (Datos completos para generar PDC)
- **Archivo**: `src/components/PDCConfigForm.tsx` (líneas 179-250)
- **localStorage Key**: `'pdcCompleteData'`
- **Función**: `onSubmit()`
- **Contenido**: JSON completo con estructura:
  ```json
  {
    "datosPersonales": {
      "objetivoHolisticoDeNivel": "...",
      "unidadEducativa": "...",
      "maestro": "...",
      "tituloPSP": "...",
      "anioEscolaridad": "...",
      "departamento": "...",
      "gestion": "...",
      "distritoEducativo": "...",
      "PlanAnualTrimestralizado": [...]
    },
    "configuracionUsuario": {
      "trimestreSeleccionado": "PRIMERO",
      "gradoSeleccionado": "SEGUNDO",
      "contenidosSeleccionados": [...],
      "mesSeleccionado": "ENERO",
      "recursos": "...",
      "orientacionesPractica": "...",
      "orientacionesTeoria": "...",
      "orientacionesValoracion": "...",
      "orientacionesProduccion": "..."
    },
    "metadatos": {
      "fileId": "file_123456789",
      "fechaCreacion": "2025-01-07T15:30:00.000Z",
      "estado": "listo_para_generar"
    }
  }
  ```

## 🔍 ARCHIVOS DE DEBUG Y LOGGING

### 1. **jsonLogger.ts** (`src/utils/jsonLogger.ts`)
- **Propósito**: Sistema centralizado para logging de JSONs
- **Funciones principales**:
  - `logPATExtracted()`: Guarda JSON del PAT extraído
  - `logUserSelections()`: Guarda selecciones del usuario
  - `logFinalJSON()`: Guarda JSON final para backend
  - `showAllJSONs()`: Muestra todos los JSONs guardados
  - `downloadAllJSONs()`: Descarga todos los JSONs como archivo
  - `clearAllJSONs()`: Limpia todos los logs

### 2. **debugFlow.ts** (`src/utils/debugFlow.ts`)
- **Propósito**: Debug logs centralizados
- **Funciones**:
  - `logPATExtraction()`: Log de extracción PAT
  - `logUserSelections()`: Log de selecciones usuario
  - `logCompleteDataForGeneration()`: Log de datos completos
  - `showAllStoredData()`: Muestra todos los datos guardados

### 3. **JSONViewer.tsx** (`src/components/JSONViewer.tsx`)
- **Propósito**: UI para ver JSONs guardados
- **Ruta**: `/json-viewer`
- **Funcionalidades**:
  - Ver resumen de JSONs
  - Copiar JSONs
  - Descargar todos los JSONs
  - Limpiar logs
  - Refrescar datos

## 📤 DÓNDE SE ENVÍAN LOS JSONs AL BACKEND

### 1. **PAT Upload** (`src/config/backend.ts`)
- **Endpoint**: `POST /extract-text`
- **URL**: `http://192.168.1.101:3000/extract-text`
- **Método**: `apiService.uploadPAT()`
- **Datos enviados**: `FormData` con archivo docx
- **Respuesta**: JSON con datos extraídos del PAT

### 2. **PDC Config Submit** (`src/config/backend.ts`)
- **Endpoint**: `POST /submit-pdc-config`
- **URL**: `http://192.168.1.101:3000/submit-pdc-config`
- **Método**: `apiService.submitPDCConfig()`
- **Datos enviados**: `configData` (FormData + fileId)
- **⚠️ PROBLEMA**: Actualmente envía `configData` en lugar de `completeDataForGeneration`

## 🚨 PROBLEMAS IDENTIFICADOS

### 1. **Envío incorrecto de datos al backend**
- **Archivo**: `src/components/PDCConfigForm.tsx` (línea 255)
- **Problema**: Se envía `configData` en lugar de `completeDataForGeneration`
- **Solución**: Cambiar línea 255 de:
  ```typescript
  const result = await apiService.submitPDCConfig(configData);
  ```
  a:
  ```typescript
  const result = await apiService.submitPDCConfig(completeDataForGeneration);
  ```

### 2. **Filtrado de trimestre no implementado**
- **Problema**: Se envía todo el `PlanAnualTrimestralizado` en lugar de solo el trimestre seleccionado
- **Solución**: Filtrar `PlanAnualTrimestralizado` por trimestre seleccionado

### 3. **Filtrado de contenidos no implementado**
- **Problema**: Se envían todos los contenidos del trimestre en lugar de solo los seleccionados
- **Solución**: Filtrar contenidos por los seleccionados por el usuario

## 📋 PRÓXIMOS PASOS

1. **Corregir envío de datos**: Cambiar `configData` por `completeDataForGeneration`
2. **Implementar filtrado de trimestre**: Solo enviar el trimestre seleccionado
3. **Implementar filtrado de contenidos**: Solo enviar contenidos seleccionados
4. **Crear archivos de debug**: Para ver el flujo completo con prints
5. **Mejorar logging**: Más detalles en cada paso del proceso

## 🔧 COMANDOS PARA DEBUG

### Ver todos los JSONs en consola:
```javascript
// En la consola del navegador
import('./src/utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.showAllJSONs();
});
```

### Ver JSONs en la UI:
- Ir a `/json-viewer` en la aplicación
- O hacer clic en "Ver JSONs" en el header

### Descargar todos los JSONs:
```javascript
// En la consola del navegador
import('./src/utils/jsonLogger').then(({ jsonLogger }) => {
  jsonLogger.downloadAllJSONs();
});
```
