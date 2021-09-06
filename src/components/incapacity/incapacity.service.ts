import { EpsRepository } from "../eps/repositories/eps.repository";
import { IncapacityhRepository } from "./repositories/incapacity.repository";


export class IncapacityService {
  constructor(
    private readonly epsRepository: EpsRepository,
    private readonly incapacityRepository: IncapacityhRepository

  ) { }

  public async getEpsIncapacidad() {
    try {
      return await this.epsRepository.getEpsIncapacidad();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getTypesIncapacity(empresa: number) {
    try {
      return await this.incapacityRepository.getTypesIncapacity(empresa);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getDocumentsIncapacity(empresa: number, tipoIncapacidad: number) {
    try {
      return await this.incapacityRepository.getDocumentsIncapacity(empresa, tipoIncapacidad);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async saveDisabilityFiling(allData: any) {
    try {
      return await this.incapacityRepository.saveDisabilityFiling(allData);
    } catch (error) {
      throw new Error(error.message);
    }
  }



}
