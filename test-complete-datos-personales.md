# Test: Verificación de Campos Completos en datosPersonales

## Objetivo
Verificar que el JSON enviado al backend incluye todos los campos requeridos en `datosPersonales` con valores por defecto cuando no están presentes en los datos del PAT.

## Campos Requeridos en datosPersonales

### Campos Principales:
- ✅ `objetivoHolisticoDeNivel`: Objetivo holístico del nivel educativo
- ✅ `unidadEducativa`: Nombre de la unidad educativa
- ✅ `maestro`: Nombre del maestro
- ✅ `tituloPSP`: Título del Proyecto Socio Productivo
- ✅ `anioEscolaridad`: Año de escolaridad
- ✅ `departamento`: Departamento
- ✅ `gestion`: Año de gestión
- ✅ `distritoEducativo`: Distrito educativo
- ✅ `mes`: Mes seleccionado en el formulario

### Campos en PlanAnualTrimestralizado:
- ✅ `anioEscolaridad`: Año escolaridad del trimestre
- ✅ `contenidos`: Array de temas y subtemas
- ✅ `campoCienciaTecnologiaYProduccion`: Campo de ciencia, tecnología y producción
- ✅ `perfilesSalida`: Perfiles de salida
- ✅ `trimestre`: Trimestre seleccionado
- ✅ `actividadesPlanAccionPspPcpyA`: Actividades del plan de acción PSP

## Valores por Defecto Implementados

### datosPersonales:
```json
{
  "objetivoHolisticoDeNivel": "Formamos integralmente a las y los estudiantes con identidad cultural, valores sociocomunitarios, espiritualidad y consciencia crítica, articulando la educación científica, humanística, técnica, tecnológica y artística a través de procesos productivos de acuerdo a las vocaciones y potencialidades de las regiones en el marco de la descolonización, interculturalidad, y plurilingüismo, para que contribuyan a la conservación, protección de la Madre Tierra y salud comunitaria, la construcción de una sociedad democrática, inclusiva y libre de violencia.",
  "unidadEducativa": "RAFAEL CAMPOS DE LUJE",
  "maestro": "PAOLA MONDOCORRE",
  "tituloPSP": "EL HUERTO ESCOLAR UN ESPACIO PARA CONSTRUIR PAZ",
  "anioEscolaridad": "2DO A 6TO DE SECUNDARIA",
  "departamento": "CHUQUISACA",
  "gestion": "2025",
  "distritoEducativo": "POROMA",
  "mes": "diciembre"
}
```

### PlanAnualTrimestralizado:
```json
{
  "anioEscolaridad": "SEGUNDO",
  "campoCienciaTecnologiaYProduccion": "MATEMÁTICA.",
  "perfilesSalida": "Identifica las potencialidades productivas de su región, realizando cálculos y mediciones en procesos productivos y aplica el laboratorio matemático en el fortalecimiento de su pensamiento lógico matemático como una capacidad importante para la trasformación de su realidad.",
  "trimestre": "TERCERO",
  "actividadesPlanAccionPspPcpyA": "Diseñar actividades en el huerto que promuevan la reflexión y el autoconocimiento en los estudiantes, ayudándolos a entender y gestionar sus propias emociones y comportamientos.; Trabajo comunitario en el huerto con elaboración de carteles incluyendo diversos mensajes de paz y respeto.; Producción en los huertos escolares para incentivar el consumo de alimentos naturales."
}
```

## Pasos para Verificar

1. **Abrir la aplicación** y navegar al formulario de configuración del PDC
2. **Completar el formulario** con los datos necesarios
3. **Enviar el formulario** y revisar la consola del navegador
4. **Verificar los logs** que muestran:
   - `🔍 === VERIFICACIÓN DE CAMPOS COMPLETOS ===`
   - Estado de cada campo (COMPLETO/FALTANTE)
   - `📊 JSON completo que se enviará:`
   - Estructura completa del JSON

## Logs Esperados

### Verificación de Campos:
```
🔍 === VERIFICACIÓN DE CAMPOS COMPLETOS ===
✅ Objetivo holístico: COMPLETO
✅ Unidad educativa: COMPLETO
✅ Maestro: COMPLETO
✅ Título PSP: COMPLETO
✅ Año escolaridad: COMPLETO
✅ Departamento: COMPLETO
✅ Gestión: COMPLETO
✅ Distrito educativo: COMPLETO
✅ Mes: COMPLETO
```

### Estructura del Trimestre:
```
✅ Trimestre 1: 2 temas con subtemas seleccionados
   - Año escolaridad: SEGUNDO
   - Campo ciencia: MATEMÁTICA.
   - Perfiles salida: Identifica las potencialidades...
   - Trimestre: TERCERO
   - Actividades PSP: Diseñar actividades en el huerto...
```

## Resultado Esperado

El JSON enviado al backend debe incluir TODOS los campos de `datosPersonales` con valores válidos, ya sea desde los datos del PAT o desde los valores por defecto implementados. Esto asegura que el backend reciba una estructura completa y consistente.
