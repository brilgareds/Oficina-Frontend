export interface InclusionBeneficiariosRepository {
  getBeneficiariesByUser(cedula: number): Promise<any>;
  getTipoDocumentoBeneficiario(): Promise<any>;
  getCajasBeneficiario(cedula: number): Promise<any>;
  consultarParentesco(condicionDinamica: string): Promise<any>;
  consultarArchivosBeneficiarios(condicionDinamica: string, tipParentesco: number): Promise<any>;
  guardarSolicitud(cedula: any, nombreUsuario: any, telefono: any, correoElectronico: any, empresa: any): Promise<any>;
  guardarBeneficiario(idsolicitud: any, tipoDocumento: any, cedulaBeneficiario: any, nombreBeneficiario: any, apellidoBeneficiario: any, eps: any, caja: any, fechaNacimientoBeneficiario: any, cedula: any, tipoParentesco: any): Promise<any>;
  guardarBeneficiarioArchivos(codigoBeneficiario: any, urlFile: any, cedula: any, codigoTipoArchivo: any): Promise<any>;
  insertarAlertarAutomaticas(destinatario: any, copia: any, asunto: any, body: any, adjunto: any, bd: any): Promise<any>;
  consultarBeneficiarios(cedula: number): Promise<any>;
  consultarArchivosBenefactor(codigoBenefactor: number): Promise<any>;
  updateArchivosInclusionBeneficiarios(codigoArchivo: any, urlFile: string): Promise<any>;
}
