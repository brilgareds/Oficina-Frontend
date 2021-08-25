export interface SendAlertEmailRepository {
  AlertaHtml(correo: any, link: any, asunto: any, titulo: any, cuerpoMensaje: any, copia: any, bd: any): Promise<any>;
  insertarAlertarAutomaticas(destinatario: any, copia: any, asunto: any, body: any, adjunto: any, bd: any): Promise<any>;
}
