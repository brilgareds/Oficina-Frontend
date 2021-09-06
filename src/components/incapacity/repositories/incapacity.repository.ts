export interface IncapacityhRepository {
  getTypesIncapacity(empresa: number): Promise<any>;
  getDocumentsIncapacity(empresa: number, tipoIncapacidad: number): Promise<any>;
  saveDisabilityFiling(allData: any): Promise<any>;
}
