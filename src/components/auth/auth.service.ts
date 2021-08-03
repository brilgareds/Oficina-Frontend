import { LoginDto } from "./dto/login.dto";
import { signAccessToken, signRefreshToken } from "../common/helpers/jwt";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { AuthRepository } from "./repositories/auth.repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async login({ username, password }: LoginDto) {
    try {
      const user = await this.authRepository.findAuth(username);
      const key =
        "-EHfn&4;=teC)e2#*jtdxcyQgDt(.72,2wvQ3}kXaMaJxzqF_Aq:ipK!NTz59*V[5qmF(E[t5:)fP*X)]F{Xx9N{k@$a#h.t?c9%N.c[:pT+Y]g8rvjZn#Bkc9H%{a@ezY_Ack:}L&VF6xeaQ#n::X(]2=SwNJ#.])De[2N#DbW8FTfJxz;86qH[P5T6+.h$7fBj2Q5!NKBA.]-S&DEM_xrnUi%g";
      let result = "";
      const buf = Buffer.from(user.USU_CLAVE_ESMAD2, "base64");
      const string = buf.toString("latin1");

      for (let index = 0; index < string.length; index++) {
        let char = string.substr(index, 1);
        let keyChar = key.substr((index % key.length) - 1, 1);
        let cha = String.fromCharCode(
          char.charCodeAt(0) - keyChar.charCodeAt(0)
        );

        result += cha;
      }

      if (result !== password) {
        throw new Error("Error en las credenciales");
      }

      const accessToken = signAccessToken({
        id: user.USU_CODIGO,
        user: user.USU_LOGIN,
        identification: user.USU_NUMERO_DOCUMENTO,
      });

      const refreshToken = signRefreshToken({
        id: user.USU_CODIGO,
        user: user.USU_LOGIN,
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
        id: user.id,
        user: user.user,
      });

      const refreshToken = signRefreshToken({
        id: user.id,
        user: user.user,
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
