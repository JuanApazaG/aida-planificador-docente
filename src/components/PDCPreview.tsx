import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Eye, 
  FileText, 
  Calendar, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  ArrowLeft,
  Share2,
  BookOpen
} from "lucide-react";
import { simulationService, apiService, PDCPreviewResponse } from "@/config/backend";

interface PDCPreviewProps {
  pdcId: string;
  onBack?: () => void;
  onSaveToResources?: (pdcData: PDCPreviewResponse['pdcData']) => void;
}

export function PDCPreview({ pdcId, onBack, onSaveToResources }: PDCPreviewProps) {
  const [pdcData, setPdcData] = useState<PDCPreviewResponse['pdcData']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPDCPreview();
  }, [pdcId]);

  const loadPDCPreview = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Cambiar a apiService cuando el backend esté listo
      const result = await apiService.getPDCPreview(pdcId);
      if (result.success && result.pdcData) {
        setPdcData(result.pdcData);
      } else {
        setError(result.error || "Error al cargar la vista previa");
      }
    } catch (error) {
      console.error('Error loading PDC preview:', error);
      setError("Error al cargar la vista previa del PDC");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // TODO: Implementar descarga real cuando el backend esté listo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular descarga
      const link = document.createElement('a');
      link.href = pdcData.urlDescarga;
      link.download = `${pdcData.nombre}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert("¡PDC descargado exitosamente!");
    } catch (error) {
      console.error('Error downloading PDC:', error);
      alert("Error al descargar el PDC");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSaveToResources = async () => {
    setIsSaving(true);
    try {
      // TODO: Implementar guardado real cuando el backend esté listo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSaveToResources) {
        onSaveToResources(pdcData);
      }
      
      alert("¡PDC guardado en Mis Recursos!");
    } catch (error) {
      console.error('Error saving PDC:', error);
      alert("Error al guardar el PDC");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // TODO: Implementar vista previa real cuando el backend esté listo
    window.open(pdcData.urlVistaPrevia, '_blank');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Generando tu PDC</h1>
          <p className="text-muted-foreground">Estamos procesando tu Plan de Desarrollo Curricular...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto">
            <FileText className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Error al generar PDC</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a intentar
          </Button>
        </div>
      </div>
    );
  }

  if (!pdcData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">¡PDC Generado Exitosamente!</h1>
        <p className="text-lg text-muted-foreground">
          Tu Plan de Desarrollo Curricular está listo para usar
        </p>
      </div>

      {/* PDC Information Card */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <BookOpen className="h-5 w-5" />
            <span>{pdcData.nombre}</span>
          </CardTitle>
          <CardDescription className="text-green-700">
            Generado el {new Date(pdcData.fechaCreacion).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-green-600 font-medium">Mes</p>
                <p className="text-sm font-medium">{pdcData.mes}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-green-600 font-medium">Grado</p>
                <p className="text-sm font-medium">{pdcData.grado}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-green-600 font-medium">Trimestre</p>
                <p className="text-sm font-medium">{pdcData.trimestre}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-xs text-green-600 font-medium">Tamaño</p>
                <p className="text-sm font-medium">{pdcData.tamanio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-4">
        <Button 
          onClick={handlePreview}
          variant="outline" 
          className="h-16 flex flex-col space-y-2"
        >
          <Eye className="h-5 w-5" />
          <span>Vista Previa</span>
        </Button>
        
        <Button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="h-16 flex flex-col space-y-2 bg-primary hover:bg-primary/90"
        >
          {isDownloading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <Download className="h-5 w-5" />
          )}
          <span>{isDownloading ? "Descargando..." : "Descargar PDC"}</span>
        </Button>
        
        <Button 
          onClick={handleSaveToResources}
          disabled={isSaving}
          variant="outline"
          className="h-16 flex flex-col space-y-2"
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
          ) : (
            <Share2 className="h-5 w-5" />
          )}
          <span>{isSaving ? "Guardando..." : "Guardar en Recursos"}</span>
        </Button>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">¿Qué puedes hacer ahora?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Vista Previa</p>
              <p className="text-sm text-muted-foreground">
                Revisa el contenido del PDC antes de descargarlo
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Descargar</p>
              <p className="text-sm text-muted-foreground">
                Guarda el PDC en tu dispositivo como archivo PDF
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <p className="font-medium">Guardar en Recursos</p>
              <p className="text-sm text-muted-foreground">
                Almacena el PDC en tu biblioteca personal para acceso futuro
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        {onBack && (
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Generar otro PDC
          </Button>
        )}
        <Button onClick={() => window.location.href = '/recursos'}>
          <FileText className="h-4 w-4 mr-2" />
          Ver Mis Recursos
        </Button>
      </div>
    </div>
  );
} 