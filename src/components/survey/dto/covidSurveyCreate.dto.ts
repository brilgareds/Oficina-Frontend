import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";
import { SurveyAnswersCreateDto } from "./surveyAnswerCreate.dto";

export class CovidSurveyCreateDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  readonly answers: SurveyAnswersCreateDto[];
}
