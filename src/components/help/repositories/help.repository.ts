export interface HelpRepository {
  saveUserInfo(dataUser: any, dataForm: any, tipoContacto: any, validarCategoria: any): Promise<any>;
  insertarAlertarAutomaticas(destinatario: any, copia: any, asunto: any, body: any, adjunto: any, bd: any): Promise<any>;
}
