import { LoginDto } from "./dto/login.dto";
import { signAccessToken, signRefreshToken } from "../common/helpers/jwt";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { AuthRepository } from "./repositories/auth.repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async login({ identification }: LoginDto) {
    try {
      const user = await this.authRepository.findUserByIdentification(
        identification
      );

      const accessToken = signAccessToken({
        name: user.Nombres,
        last_name: user.Apellidos,
        identification: user.Cedula,
        status: user.ESTADO,
      });

      const refreshToken = signRefreshToken({
        names: user.Nombres,
        last_name: user.Apellidos,
        identification: user.Cedula,
        status: user.ESTADO,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async refreshToken(user: JwtUserPayload) {
    try {
      const accessToken = signAccessToken({
        name: user.name,
        last_name: user.last_name,
        identification: user.identification,
        status: user.status,
      });

      const refreshToken = signRefreshToken({
        name: user.name,
        last_name: user.last_name,
        identification: user.identification,
        status: user.status,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async userInformation(user: JwtUserPayload) {
    try {
      return await this.authRepository.findUserByIdentification(
        user.identification
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
