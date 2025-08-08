// ===== ARCHIVO PARA GUARDAR Y MOSTRAR TODOS LOS JSON DEL FLUJO =====

export const jsonLogger = {
  // Guardar JSON del PAT extraído
  logPATExtracted: (data: any) => {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      type: 'PAT_EXTRACTED',
      data: data
    };
    
    console.log('📄 === JSON DEL PAT EXTRAÍDO ===');
    console.log('⏰ Timestamp:', timestamp);
    console.log('📊 Datos completos:', JSON.stringify(data, null, 2));
    
    // Guardar en localStorage para inspección
    localStorage.setItem('json_log_pat_extracted', JSON.stringify(logData));
    
    // También guardar en sessionStorage para ver en la consola
    sessionStorage.setItem('last_pat_json', JSON.stringify(data, null, 2));
    
    return data;
  },

  // Guardar JSON de selecciones del usuario
  logUserSelections: (trimestre: string, grado?: string, contenidos?: string[]) => {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      type: 'USER_SELECTIONS',
      data: {
        trimestre,
        grado,
        contenidos
      }
    };
    
    console.log('🎯 === JSON DE SELECCIONES DEL USUARIO ===');
    console.log('⏰ Timestamp:', timestamp);
    console.log('📅 Trimestre:', trimestre);
    console.log('🎓 Grado:', grado);
    console.log('📚 Contenidos:', contenidos);
    console.log('📊 Datos completos:', JSON.stringify(logData, null, 2));
    
    localStorage.setItem('json_log_user_selections', JSON.stringify(logData));
    sessionStorage.setItem('last_user_selections', JSON.stringify(logData, null, 2));
    
    return logData;
  },

  // Guardar JSON final que se envía al backend
  logFinalJSON: (data: any) => {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      type: 'FINAL_JSON_FOR_BACKEND',
      data: data
    };
    
    console.log('🚀 === JSON FINAL QUE SE ENVÍA AL BACKEND ===');
    console.log('⏰ Timestamp:', timestamp);
    console.log('📊 JSON completo:', JSON.stringify(data, null, 2));
    
    localStorage.setItem('json_log_final_backend', JSON.stringify(logData));
    sessionStorage.setItem('last_final_json', JSON.stringify(data, null, 2));
    
    return data;
  },

  // Mostrar todos los JSON guardados
  showAllJSONs: () => {
    console.log('🗄️ === TODOS LOS JSON GUARDADOS ===');
    
    const patExtracted = localStorage.getItem('json_log_pat_extracted');
    const userSelections = localStorage.getItem('json_log_user_selections');
    const finalBackend = localStorage.getItem('json_log_final_backend');
    
    console.log('📄 PAT Extraído:', patExtracted ? '✅ SÍ existe' : '❌ NO existe');
    console.log('🎯 Selecciones Usuario:', userSelections ? '✅ SÍ existe' : '❌ NO existe');
    console.log('🚀 JSON Final Backend:', finalBackend ? '✅ SÍ existe' : '❌ NO existe');
    
    if (patExtracted) {
      try {
        const parsed = JSON.parse(patExtracted);
        console.log('📄 PAT - Timestamp:', parsed.timestamp);
        console.log('📄 PAT - Título PSP:', parsed.data?.datosPersonales?.tituloPSP);
      } catch (e) {
        console.log('❌ Error parseando PAT JSON');
      }
    }
    
    if (userSelections) {
      try {
        const parsed = JSON.parse(userSelections);
        console.log('🎯 Selecciones - Timestamp:', parsed.timestamp);
        console.log('🎯 Selecciones - Trimestre:', parsed.data?.trimestre);
        console.log('🎯 Selecciones - Grado:', parsed.data?.grado);
      } catch (e) {
        console.log('❌ Error parseando User Selections JSON');
      }
    }
    
    if (finalBackend) {
      try {
        const parsed = JSON.parse(finalBackend);
        console.log('🚀 Final - Timestamp:', parsed.timestamp);
        console.log('🚀 Final - Trimestre seleccionado:', parsed.data?.configuracionUsuario?.trimestreSeleccionado);
        console.log('🚀 Final - Contenidos seleccionados:', parsed.data?.configuracionUsuario?.contenidosSeleccionados?.length || 0);
      } catch (e) {
        console.log('❌ Error parseando Final JSON');
      }
    }
    
    return {
      patExtracted: patExtracted ? JSON.parse(patExtracted) : null,
      userSelections: userSelections ? JSON.parse(userSelections) : null,
      finalBackend: finalBackend ? JSON.parse(finalBackend) : null
    };
  },

  // Función para descargar todos los JSON como archivo
  downloadAllJSONs: () => {
    const allData = {
      patExtracted: localStorage.getItem('json_log_pat_extracted'),
      userSelections: localStorage.getItem('json_log_user_selections'),
      finalBackend: localStorage.getItem('json_log_final_backend'),
      patExtractedData: localStorage.getItem('patExtractedData'),
      selectedTrimestre: localStorage.getItem('selectedTrimestre'),
      selectedGrado: localStorage.getItem('selectedGrado'),
      pdcCompleteData: localStorage.getItem('pdcCompleteData')
    };
    
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `json_logs_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('📥 JSONs descargados como archivo');
  },

  // Función para limpiar todos los logs
  clearAllJSONs: () => {
    localStorage.removeItem('json_log_pat_extracted');
    localStorage.removeItem('json_log_user_selections');
    localStorage.removeItem('json_log_final_backend');
    sessionStorage.removeItem('last_pat_json');
    sessionStorage.removeItem('last_user_selections');
    sessionStorage.removeItem('last_final_json');
    console.log('🧹 Todos los JSON logs limpiados');
  }
};

// Función para mostrar JSONs en la consola de forma más legible
export const showJSONsInConsole = () => {
  console.log('🔍 === MOSTRANDO JSONS EN CONSOLA ===');
  
  const patJson = sessionStorage.getItem('last_pat_json');
  const selectionsJson = sessionStorage.getItem('last_user_selections');
  const finalJson = sessionStorage.getItem('last_final_json');
  
  if (patJson) {
    console.log('📄 PAT JSON:');
    console.log(JSON.parse(patJson));
  }
  
  if (selectionsJson) {
    console.log('🎯 User Selections JSON:');
    console.log(JSON.parse(selectionsJson));
  }
  
  if (finalJson) {
    console.log('🚀 Final Backend JSON:');
    console.log(JSON.parse(finalJson));
  }
  
  if (!patJson && !selectionsJson && !finalJson) {
    console.log('❌ No hay JSONs guardados para mostrar');
  }
};
