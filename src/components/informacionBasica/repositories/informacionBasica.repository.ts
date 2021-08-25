export interface InformacionBasicaRepository {
  buscarDatos(cedula: number, empresa: number): Promise<any>;
}
