# Test: Contenidos Dinámicos del PAT

## Objetivo
Verificar que el sistema lea correctamente los contenidos del PAT y los muestre dinámicamente en la interfaz.

## Pasos de Prueba

### 1. Preparar datos de prueba
```bash
# Copiar el archivo test-corrected.json a localStorage
# En la consola del navegador:
localStorage.setItem('patExtractedData', JSON.stringify({
  "datosPersonales": {
    "PlanAnualTrimestralizado": [
      {
        "trimestre": "SEGUNDO",
        "contenidos": [
          {
            "tema": "EL ÁLGEBRA Y SU RELACIÓN CON LAS ACTIVIDADES DE LA VIDA COTIDIANA",
            "subtemas": [
              "Nociones básicas de álgebra",
              "Expresiones algebraicas y la modelización",
              "Estudio de Variables y Constantes",
              "Término algebraico",
              "Términos semejantes, reducción y su aplicación",
              "Clasificación de expresiones algebraicas",
              "Grado relativo y absoluto de un monomio y un polinomio",
              "Valor numérico"
            ]
          },
          {
            "tema": "OPERACIONES CON EXPRESIONES ALGEBRAICAS EN EL DESARROLLO DE LA CIENCIA Y LA TECNOLOGÍA",
            "subtemas": [
              "Clasificación de expresiones algebraicas y su notación",
              "Operaciones con expresiones algebraicas",
              "Adición y sustracción",
              "Multiplicación",
              "División",
              "Método clásico"
            ]
          }
        ]
      }
    ]
  }
}));
```

### 2. Verificar en la interfaz
1. Ir a la página de configuración del PDC
2. Seleccionar "2° Trimestre"
3. Verificar que aparezcan los contenidos dinámicos:
   - "EL ÁLGEBRA Y SU RELACIÓN CON LAS ACTIVIDADES DE LA VIDA COTIDIANA"
   - "OPERACIONES CON EXPRESIONES ALGEBRAICAS EN EL DESARROLLO DE LA CIENCIA Y LA TECNOLOGÍA"

### 3. Verificar en la consola
Los logs deberían mostrar:
```
✅ Contenidos dinámicos cargados del PAT: [
  {
    "tema": "EL ÁLGEBRA Y SU RELACIÓN CON LAS ACTIVIDADES DE LA VIDA COTIDIANA",
    "subtemas": [...]
  },
  {
    "tema": "OPERACIONES CON EXPRESIONES ALGEBRAICAS EN EL DESARROLLO DE LA CIENCIA Y LA TECNOLOGÍA",
    "subtemas": [...]
  }
]
```

### 4. Verificar el JSON final
Al generar el PDC, el JSON enviado debería contener:
```json
{
  "datosPersonales": {
    "PlanAnualTrimestralizado": [
      {
        "trimestre": "SEGUNDO",
        "contenidos": [
          {
            "tema": "EL ÁLGEBRA Y SU RELACIÓN CON LAS ACTIVIDADES DE LA VIDA COTIDIANA",
            "subtemas": [...]
          },
          {
            "tema": "OPERACIONES CON EXPRESIONES ALGEBRAICAS EN EL DESARROLLO DE LA CIENCIA Y LA TECNOLOGÍA",
            "subtemas": [...]
          }
        ]
      }
    ]
  }
}
```

## Resultados Esperados
- ✅ Los contenidos se leen dinámicamente del PAT
- ✅ Se filtran correctamente por trimestre
- ✅ Se muestran en la interfaz con checkboxes
- ✅ Se agrupan correctamente por tema
- ✅ Se envían en el formato JSON correcto al backend
