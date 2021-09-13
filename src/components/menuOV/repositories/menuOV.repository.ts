export interface MenuOVRepository {
  buscarMenu(): Promise<any>;
  formulariosCompletados(empresa: number, cedula: number): Promise<any>;
}
