import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { CityRepository } from "./repositories/city.repository";

export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  public async getAllCities(user: JwtUserPayload) {
    try {
      let cities = await this.cityRepository.getAllCitiesByUser(
        user.identification
      );

      if (!cities.length) {
        cities = await this.cityRepository.getAllCities();
      }

      return cities;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
