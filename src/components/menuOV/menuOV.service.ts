// import { LoginDto } from "./dto/menuOV.dto";
// import { signAccessToken, signRefreshToken } from "../common/helpers/jwt";
// import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { MenuOVRepository } from "./repositories/menuOV.repository";

export class MenuOVService {
  constructor(private readonly menuOVRepository: MenuOVRepository) {}

  public async buscarMenu() {
    try {
      const menu = await this.menuOVRepository.buscarMenu();

      return menu;

    } catch (error) {

      throw new Error(error.message);

    }
  }

}
