import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageUpload } from "@/hooks/use-image-upload";
import { FileText, X, Upload, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { simulationService, apiService } from "@/config/backend";

export function PATUpload() {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({
    onUpload: (url) => console.log("Archivo PAT subido:", url),
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && (file.type.includes("pdf") || file.type.includes("image") || file.type.includes("document"))) {
        if (fileInputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInputRef.current.files = dataTransfer.files;
          
          const fakeEvent = {
            target: fileInputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          handleFileChange(fakeEvent);
        }
      }
    },
    [handleFileChange],
  );

  const handleGeneratePDC = async () => {
    if (!fileName) return;

    setIsProcessing(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simular progreso de subida
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Obtener el archivo real del input
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        throw new Error("No se encontró el archivo");
      }

      // ===== SUBIDA AL BACKEND =====
      // TODO: Cambiar a apiService cuando el backend esté listo
      const uploadResult = await simulationService.uploadPAT(file);
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Error al subir el archivo");
      }

      setFileId(uploadResult.fileId!);
      setUploadProgress(100);

      // ===== GENERACIÓN DE PDC =====
      // TODO: Cambiar a apiService cuando el backend esté listo
      const generateResult = await simulationService.generatePDC(uploadResult.fileId!);
      if (!generateResult.success) {
        throw new Error(generateResult.error || "Error al generar el PDC");
      }

      // Navegar a la página de configuración
      window.location.href = '/configurar-pdc';

    } catch (error) {
      console.error('Error en el proceso:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          Generar Plan de Desarrollo Curricular
        </h1>
        <p className="text-lg text-muted-foreground">
          Sube tu archivo PAT y genera automáticamente tu PDC mensual o quincenal
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Subir archivo PAT</h3>
            <p className="text-sm text-muted-foreground">
              Formatos soportados: PDF, JPG, PNG, DOC, DOCX (Máximo 10MB)
            </p>
          </div>

          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {!previewUrl ? (
            <div
              onClick={handleThumbnailClick}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "flex h-64 cursor-pointer flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 transition-all duration-200 hover:bg-muted/50 hover:border-primary/50",
                isDragging && "border-primary bg-primary/5 scale-[1.02]",
              )}
            >
              <div className="rounded-full bg-background p-4 shadow-sm border border-border">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-foreground">Arrastra tu archivo PAT aquí</p>
                <p className="text-sm text-muted-foreground">
                  o haz clic para seleccionar desde tu dispositivo
                </p>
                <Button variant="outline" className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar archivo
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{fileName}</p>
                  <p className="text-sm text-muted-foreground">Archivo PAT cargado exitosamente</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleRemove}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Error en el proceso</p>
                    <p className="text-sm text-destructive/80">{error}</p>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Procesando archivo...</span>
                    <span className="text-primary font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <Button 
                  onClick={handleGeneratePDC}
                  disabled={isProcessing}
                  className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {uploadProgress < 50 ? "Subiendo archivo..." : "Generando PDC..."}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-3" />
                      Generar mi PDC
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center space-y-4 p-6 rounded-xl bg-muted/30">
        <h4 className="font-semibold text-foreground">¿Necesitas ayuda?</h4>
        <p className="text-sm text-muted-foreground">
          Asegúrate de que tu archivo PAT contenga toda la información curricular necesaria.
          El proceso de generación tomará solo unos minutos.
        </p>
      </div>
    </div>
  );
}