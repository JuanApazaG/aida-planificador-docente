// ===== ARCHIVO PARA DEBUGGEAR EL FLUJO DE DATOS =====

export const debugFlow = {
  // Mostrar datos del PAT cuando se extraen
  logPATExtraction: (data: any) => {
    console.log('🔍 === DEBUG: DATOS EXTRAÍDOS DEL PAT ===');
    console.log('📄 Estructura completa:', JSON.stringify(data, null, 2));
    
    if (data.datosPersonales) {
      console.log('👤 Datos Personales:');
      console.log('- Unidad Educativa:', data.datosPersonales.unidadEducativa);
      console.log('- Maestro:', data.datosPersonales.maestro);
      console.log('- Título PSP:', data.datosPersonales.tituloPSP);
      console.log('- Año Escolaridad:', data.datosPersonales.anioEscolaridad);
      console.log('- Departamento:', data.datosPersonales.departamento);
      console.log('- Gestión:', data.datosPersonales.gestion);
      console.log('- Distrito Educativo:', data.datosPersonales.distritoEducativo);
      
      if (data.datosPersonales.PlanAnualTrimestralizado) {
        console.log('📅 Plan Anual Trimestralizado:', data.datosPersonales.PlanAnualTrimestralizado.length, 'trimestres');
        data.datosPersonales.PlanAnualTrimestralizado.forEach((trimestre: any, index: number) => {
          console.log(`  Trimestre ${index + 1}:`, trimestre.trimestre, `(${trimestre.anioEscolaridad})`);
        });
      }
    }
    
    console.log('💾 Guardado en localStorage como "patExtractedData"');
    return data;
  },

  // Mostrar selecciones del usuario
  logUserSelections: (trimestre: string, grado?: string) => {
    console.log('🎯 === DEBUG: SELECCIONES DEL USUARIO ===');
    if (trimestre) {
      console.log('📅 Trimestre seleccionado:', trimestre);
      localStorage.setItem('debug_selectedTrimestre', trimestre);
    }
    if (grado) {
      console.log('🎓 Grado seleccionado:', grado);
      localStorage.setItem('debug_selectedGrado', grado);
    }
  },

  // Mostrar datos completos antes de enviar
  logCompleteDataForGeneration: (data: any) => {
    console.log('🚀 === DEBUG: DATOS COMPLETOS PARA GENERAR PDC ===');
    console.log('📊 JSON que se enviará al backend:');
    console.log(JSON.stringify(data, null, 2));
    
    console.log('📝 Resumen:');
    console.log('- Título PSP:', data.datosPersonales?.tituloPSP);
    console.log('- Trimestre seleccionado:', data.trimestreSeleccionado);
    console.log('- Grado seleccionado:', data.gradoSeleccionado);
    console.log('- Contenidos seleccionados:', data.contenidosSeleccionados?.length || 0);
    console.log('- Mes seleccionado:', data.mesSeleccionado);
    
    // Guardar para inspección
    localStorage.setItem('debug_completeDataForGeneration', JSON.stringify(data));
    console.log('💾 Datos guardados en localStorage como "debug_completeDataForGeneration"');
    
    return data;
  },

  // Mostrar todos los datos guardados en localStorage
  showAllStoredData: () => {
    console.log('🗄️ === DEBUG: TODOS LOS DATOS EN LOCALSTORAGE ===');
    
    const patData = localStorage.getItem('patExtractedData');
    const trimestre = localStorage.getItem('selectedTrimestre');
    const grado = localStorage.getItem('selectedGrado');
    const completeData = localStorage.getItem('debug_completeDataForGeneration');
    
    console.log('📄 PAT Data:', patData ? 'SÍ existe' : 'NO existe');
    console.log('📅 Trimestre:', trimestre || 'NO seleccionado');
    console.log('🎓 Grado:', grado || 'NO seleccionado');
    console.log('🚀 Datos completos:', completeData ? 'SÍ existen' : 'NO existen');
    
    if (patData) {
      try {
        const parsed = JSON.parse(patData);
        console.log('📄 PAT - Título PSP:', parsed.datosPersonales?.tituloPSP);
        console.log('📄 PAT - Trimestres disponibles:', parsed.datosPersonales?.PlanAnualTrimestralizado?.length || 0);
      } catch (e) {
        console.log('❌ Error parseando PAT data');
      }
    }
    
    return {
      patData: patData ? JSON.parse(patData) : null,
      trimestre,
      grado,
      completeData: completeData ? JSON.parse(completeData) : null
    };
  }
};

// Función para limpiar datos de debug
export const clearDebugData = () => {
  localStorage.removeItem('debug_selectedTrimestre');
  localStorage.removeItem('debug_selectedGrado');
  localStorage.removeItem('debug_completeDataForGeneration');
  console.log('🧹 Datos de debug limpiados');
};
