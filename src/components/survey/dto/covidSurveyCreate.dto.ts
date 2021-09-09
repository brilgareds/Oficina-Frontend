import { IsEmpty, IsNumber } from "class-validator";

export class CovidSurveyCreateDto {
  @IsEmpty()
  @IsNumber()
  readonly code: number;

  @IsEmpty()
  @IsNumber()
  readonly type: number;
}
