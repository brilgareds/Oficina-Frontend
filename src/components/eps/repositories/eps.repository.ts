export interface EpsRepository {
  getEps(): Promise<any>;
  getEpsIncapacidad(codigoEmpresaUsuario: number): Promise<any>;
}
