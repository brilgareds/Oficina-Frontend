import { SurveyAnswersDto } from "../dto/surveyAnswers.dto";
import { SurveyHeadsDto } from "../dto/surveyHeads.dto";
import { SurveyQuestionsDto } from "../dto/surveyQuestions.dto";
import { SurveyResponsesDto } from "../dto/surveyResponses.dto";

export interface SurveyRepository {
  getSurveyHeads(SurveyHeads: SurveyHeadsDto): Promise<any>;
  getSurveyQuestions(surveyQuestions: SurveyQuestionsDto): Promise<any>;
  getSurveyResponses(surveyResponses: SurveyResponsesDto): Promise<any>;
  getSurveyAnswers(surveyAnswers: SurveyAnswersDto): Promise<any>;
  getSurveyFrecuency(): Promise<any>;
}
