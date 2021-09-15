import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { SurveyAnswersCreateDto } from "./surveyAnswerCreate.dto";

export class EpidemiologicalFenceSurveyCreateDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly answers: SurveyAnswersCreateDto[];
}
