export interface QualificationRepository {
  consultarDatosUsuario(
    OVT_CEDULA: number
    ): Promise<any>
  crearRegistroQualification(
    OVT_CEDULA: number,
    OVT_NOMBRE: string,
    OVT_CORREO: string,
    OVT_CELULAR: number,
    OVT_EMPRESA: number,
    OVT_CENTRO_COSTOS: number,
    OVT_MEDIO_SOLICITUD: string,
    OVT_RESPUESTA_ALTERNA: string,
    CALIFICACION: number
    ): Promise<any>
}
