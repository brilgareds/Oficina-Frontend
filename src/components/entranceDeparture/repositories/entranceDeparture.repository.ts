import { JwtUserPayload } from "../../common/interfaces/jwtUserPayload";
import { SaveDepartureDto } from "../dto/saveDeparture.dto";
import { SaveEntranceDto } from "../dto/saveEntrance.dto";
import { UserDataDto } from "../dto/userData.dto";

export interface EntranceDepartureRepository {
  findEntrance(user: JwtUserPayload, date: string): Promise<any>;
  findDeparture(user: JwtUserPayload, date: string): Promise<any>;
  saveEntrance(entranceData: SaveEntranceDto, user: UserDataDto): Promise<any>;
  saveDeparture(
    entranceData: SaveDepartureDto,
    user: UserDataDto,
    date: string
  ): Promise<any>;
}
