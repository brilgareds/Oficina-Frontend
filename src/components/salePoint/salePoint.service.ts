import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { SalePointRepository } from "./repositories/salePoint.repository";

export class SalePointService {
  constructor(private readonly salePointRepository: SalePointRepository) {}

  public async getAllSalePoints(cityId: number, user: JwtUserPayload) {
    try {
      let salePoints = await this.salePointRepository.getAllSalePointsByUser(
        cityId,
        user.identification
      );

      if (!salePoints.length) {
        salePoints = await this.salePointRepository.getAllSalePoints(cityId);
      }

      return salePoints;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
