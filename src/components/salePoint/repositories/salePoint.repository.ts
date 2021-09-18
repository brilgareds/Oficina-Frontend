export interface SalePointRepository {
  getAllSalePoints(cityId: number): Promise<any>;
  getAllSalePointsByUser(cityId: number, identification: number): Promise<any>;
}
