import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Eye, 
  FileText, 
  Trash2,
  RefreshCw,
  Copy
} from "lucide-react";
import { jsonLogger, showJSONsInConsole } from "@/utils/jsonLogger";

export function JSONViewer() {
  const [jsonData, setJsonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadJSONs = () => {
    setIsLoading(true);
    try {
      const data = jsonLogger.showAllJSONs();
      setJsonData(data);
    } catch (error) {
      console.error('Error loading JSONs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadJSONs = () => {
    jsonLogger.downloadAllJSONs();
  };

  const clearJSONs = () => {
    jsonLogger.clearAllJSONs();
    setJsonData(null);
  };

  const showInConsole = () => {
    showJSONsInConsole();
  };

  useEffect(() => {
    loadJSONs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          Visor de JSONs del Flujo
        </h1>
        <p className="text-lg text-muted-foreground">
          Aquí puedes ver todos los JSON que se generan durante el proceso
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={loadJSONs} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Recargar JSONs
        </Button>
        
        <Button onClick={downloadJSONs} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar JSONs
        </Button>
        
        <Button onClick={showInConsole} variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Ver en Consola
        </Button>
        
        <Button onClick={clearJSONs} variant="destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Limpiar JSONs
        </Button>
      </div>

      {/* JSON Data Display */}
      <div className="grid gap-6">
        {/* PAT Extracted JSON */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>JSON del PAT Extraído</span>
              <Badge variant={jsonData?.patExtracted ? "default" : "secondary"}>
                {jsonData?.patExtracted ? "✅ Existe" : "❌ No existe"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Datos extraídos del archivo PAT enviado al backend
            </CardDescription>
          </CardHeader>
          <CardContent>
            {jsonData?.patExtracted ? (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Timestamp:</strong> {jsonData.patExtracted.timestamp}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Título PSP:</strong> {jsonData.patExtracted.data?.datosPersonales?.tituloPSP || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Maestro:</strong> {jsonData.patExtracted.data?.datosPersonales?.maestro || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Unidad Educativa:</strong> {jsonData.patExtracted.data?.datosPersonales?.unidadEducativa || 'N/A'}
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(jsonData.patExtracted, null, 2));
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar JSON
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No hay datos del PAT extraído</p>
            )}
          </CardContent>
        </Card>

        {/* User Selections JSON */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>JSON de Selecciones del Usuario</span>
              <Badge variant={jsonData?.userSelections ? "default" : "secondary"}>
                {jsonData?.userSelections ? "✅ Existe" : "❌ No existe"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Selecciones de trimestre, grado y contenidos del usuario
            </CardDescription>
          </CardHeader>
          <CardContent>
            {jsonData?.userSelections ? (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Timestamp:</strong> {jsonData.userSelections.timestamp}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Trimestre:</strong> {jsonData.userSelections.data?.trimestre || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Grado:</strong> {jsonData.userSelections.data?.grado || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Contenidos:</strong> {jsonData.userSelections.data?.contenidos?.length || 0} seleccionados
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(jsonData.userSelections, null, 2));
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar JSON
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No hay selecciones del usuario</p>
            )}
          </CardContent>
        </Card>

        {/* Final Backend JSON */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>JSON Final para Backend</span>
              <Badge variant={jsonData?.finalBackend ? "default" : "secondary"}>
                {jsonData?.finalBackend ? "✅ Existe" : "❌ No existe"}
              </Badge>
            </CardTitle>
            <CardDescription>
              JSON completo que se envía al backend para generar el PDC
            </CardDescription>
          </CardHeader>
          <CardContent>
            {jsonData?.finalBackend ? (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  <strong>Timestamp:</strong> {jsonData.finalBackend.timestamp}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Trimestre seleccionado:</strong> {jsonData.finalBackend.data?.configuracionUsuario?.trimestreSeleccionado || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Grado seleccionado:</strong> {jsonData.finalBackend.data?.configuracionUsuario?.gradoSeleccionado || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Contenidos seleccionados:</strong> {jsonData.finalBackend.data?.configuracionUsuario?.contenidosSeleccionados?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Mes seleccionado:</strong> {jsonData.finalBackend.data?.configuracionUsuario?.mesSeleccionado || 'N/A'}
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(jsonData.finalBackend, null, 2));
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar JSON
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No hay JSON final para el backend</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>¿Cómo usar este visor?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Recargar JSONs</p>
              <p className="text-sm text-muted-foreground">
                Actualiza la vista con los últimos JSONs guardados
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Descargar JSONs</p>
              <p className="text-sm text-muted-foreground">
                Descarga todos los JSONs como archivo para análisis
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Ver en Consola</p>
              <p className="text-sm text-muted-foreground">
                Muestra los JSONs completos en la consola del navegador
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Copiar JSON</p>
              <p className="text-sm text-muted-foreground">
                Copia el JSON completo al portapapeles para análisis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
