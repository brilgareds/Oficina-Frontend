export interface EpsRepository {
  getEps(): Promise<any>;
  getEpsIncapacidad(): Promise<any>;
}
