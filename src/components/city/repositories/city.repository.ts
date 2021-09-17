export interface CityRepository {
  getAllCities(): Promise<any>;
  getAllCitiesByUser(identification: number): Promise<any>;
}
