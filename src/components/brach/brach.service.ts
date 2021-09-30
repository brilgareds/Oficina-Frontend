import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { BranchRepository } from "./repositories/brach.repository";

export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}

  public async getAllBranches() {
    try {
      return await this.branchRepository.getAllBranches();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
