
import { currentDate } from "../common/helpers/global";
import { CheckInAndCheckOutMSSQLRepository } from "./repositories/impl/checkInAndCheckOut.repository";

export class CheckInAndCheckOutService {
  constructor(
    private readonly checkInAndCheckOutRepository: CheckInAndCheckOutMSSQLRepository
  ) { }

  public async getMainInfo(obj:any) {
    const filter = {
      documentId: obj.identification,
      date: currentDate({withTime:false})
    };

    const promisesArray = [
      this.checkInAndCheckOutRepository.getSurvey(filter),
      this.checkInAndCheckOutRepository.userHasCheckIn(filter),
      this.checkInAndCheckOutRepository.userHasCheckOut(filter)
    ];

    const [hasSurvey, hasCheckIn, hasCheckOut] = await Promise.all(promisesArray);

    return {hasSurvey, hasCheckIn, hasCheckOut};
  }
}