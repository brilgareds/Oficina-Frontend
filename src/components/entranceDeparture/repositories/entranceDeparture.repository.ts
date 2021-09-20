import { JwtUserPayload } from "../../common/interfaces/jwtUserPayload";
import { SaveEntranceDto } from "../dto/saveEntrance.dto";
import { UserDataDto } from "../dto/userData.dto";

export interface EntranceDepartureRepository {
  findEntrance(user: JwtUserPayload, date: string): Promise<any>;
  saveEntrance(entranceData: SaveEntranceDto, user: UserDataDto): Promise<any>;
}
