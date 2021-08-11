export interface AuthRepository {
  findUserByIdentification(identification: number): Promise<any>;
}
