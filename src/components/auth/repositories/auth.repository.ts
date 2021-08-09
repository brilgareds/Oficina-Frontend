export interface AuthRepository {
  findAuth(username: string): Promise<any>;
  findUserByIdentification(identification: number): Promise<any>;
}
