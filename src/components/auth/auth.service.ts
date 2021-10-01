import { LoginDto } from "./dto/login.dto";
import { signAccessToken, signRefreshToken } from "../common/helpers/jwt";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { AuthRepository } from "./repositories/auth.repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }

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
        company: user.Empresa,
      });

      const refreshToken = signRefreshToken({
        names: user.Nombres,
        last_name: user.Apellidos,
        identification: user.Cedula,
        status: user.ESTADO,
        company: user.Empresa,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async loginContratista(dataExterno: any) {


    try {

      const accessToken = signAccessToken({
        name: dataExterno.params.nombres,
        last_name: dataExterno.params.apellidos,
        identification: dataExterno.params.cedula,
        externo: true,
        status: "A",
        company: 1,
      });

      const refreshToken = signRefreshToken({
        name: dataExterno.params.nombres,
        last_name: dataExterno.params.apellidos,
        identification: dataExterno.params.cedula,
        externo: true,
        status: "A",
        company: 1,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: any) {
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
        company: user.company,
      });

      const refreshToken = signRefreshToken({
        name: user.name,
        last_name: user.last_name,
        identification: user.identification,
        status: user.status,
        company: user.company,
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async userInformation(user: JwtUserPayload) {
    try {
      const data = await this.authRepository.findUserByIdentification(
        user.identification
      );

      if (data) {
        return data;
      }

    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
