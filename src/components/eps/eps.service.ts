import { EpsRepository } from "./repositories/eps.repository";

export class EpsService {
  constructor(private readonly epsRepository: EpsRepository) {}

  public async getEps() {
    try {
      return await this.epsRepository.getEps();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
