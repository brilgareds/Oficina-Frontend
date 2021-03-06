export interface IncapacityhRepository {
  getTypesIncapacity(empresa: number): Promise<any>;
  getDocumentsIncapacity(empresa: number, tipoIncapacidad: number): Promise<any>;
  saveDisabilityFiling(cedula: any, nombre: any, telefono: any, mail: any, eps: any, otraEnti: any, otraEntidad: any, tipInca: any, fechaInicio: any, fechaFin: any, empresa: any, prorroga: any): Promise<any>;
  getUserIncapacities(cedula: number): Promise<any>;
  saveIncapacityFile(lastIdInsert: number, ruta: string, cedula: string, codigoTipoArchivo: number): Promise<any>;
  getUserIncapacitiesFiles(numeroIncapacidad: number): Promise<any>;
  getUserDataIncapacity(numeroIncapacidad: number): Promise<any>;
  updateFilesIncapacity(codigoArchivo: number, rutaArchivo: string, numeroIncapacidad: number): Promise<any>;
}
