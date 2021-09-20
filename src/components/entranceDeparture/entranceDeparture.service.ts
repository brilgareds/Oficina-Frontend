import moment from "moment";
import { AuthRepository } from "../auth/repositories/auth.repository";
import { JwtUserPayload } from "../common/interfaces/jwtUserPayload";
import { SaveEntranceDto } from "./dto/saveEntrance.dto";
import { UserDataDto } from "./dto/userData.dto";
import { EntranceDepartureRepository } from "./repositories/entranceDeparture.repository";

export class EntranceDepartureService {
  constructor(
    private readonly entranceDepartureRepository: EntranceDepartureRepository,
    private readonly authRepository: AuthRepository
  ) {}

  public async saveEntrance(
    entranceData: SaveEntranceDto,
    user: JwtUserPayload
  ) {
    try {
      let userData: UserDataDto;
      const date = moment().format("YYYY-MM-DD");
      const existEntrence = await this.entranceDepartureRepository.findEntrance(
        user,
        date
      );

      if (existEntrence[0]) {
        throw new Error("Ya existe un ingreso");
      }

      if (!user.externo) {
        const userDataRepo = await this.authRepository.findUserByIdentification(
          user.identification
        );

        userData = {
          identification: userDataRepo.Cedula,
          name: userDataRepo.Nombres,
          lastname: userDataRepo.Apellidos,
          title: userDataRepo.Cargo,
          area: userDataRepo.Area,
          chief: userDataRepo.Jefe,
        };
      } else {
        userData = {
          identification: "",
          name: "",
          lastname: "",
          title: "",
          area: "",
          chief: "",
        };
      }

      const entrance = await this.entranceDepartureRepository.saveEntrance(
        entranceData,
        userData
      );

      return entrance;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
