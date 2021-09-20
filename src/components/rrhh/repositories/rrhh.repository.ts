export interface RrhhRepository {
  saveUserInfo(dataUser: any, dataForm: any, tipoSolicitud: any, tipoContacto: any): Promise<any>;
  insertarAlertarAutomaticas(destinatario: any, copia: any, asunto: any, body: any, adjunto: any, bd: any): Promise<any>;
}
