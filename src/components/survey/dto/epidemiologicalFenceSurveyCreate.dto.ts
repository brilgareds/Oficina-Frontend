import { IsEmpty, IsNumber } from "class-validator";

export class EpidemiologicalFenceSurveyCreateDto {
  @IsEmpty()
  @IsNumber()
  readonly code: number;

  @IsEmpty()
  @IsNumber()
  readonly type: number;
}
