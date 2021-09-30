import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { SalePointRepository } from "./repositories/salePoint.repository";

export class SalePointService {
  constructor(private readonly salePointRepository: SalePointRepository) {}

  public async getAllSalePoints(cityId: number, user: JwtUserPayload, all: any) {
    try {
      let salePoints = [];

      salePoints = await this.salePointRepository.getAllSalePointsByUser(
        cityId,
        user.identification
      );

      if ((salePoints.length && all) || (!salePoints.length && !all)) {
          salePoints = await this.salePointRepository.getAllSalePoints(cityId);
      }

      return salePoints;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}
