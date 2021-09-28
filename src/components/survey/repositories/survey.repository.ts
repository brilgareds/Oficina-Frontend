import { ScoreHealthConditionDto } from "../dto/ScoreHealthCondition.dto";
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
  saveCovidSurveyAnswers(
    userIdentification: number,
    userCompany: string
  ): Promise<any>;
  saveEpidemiologicalFenceSurveyAnswers(
    identification: string,
    name: string,
    company: string
  ): Promise<any>;
  saveHealthConditionSurveyAnswers(
    userIdentification: number,
    userCompany: string
  ): Promise<any>;
  saveEpidemiologicalFenceSurveyAnswers(
    identification: string,
    name: string,
    company: string
  ): Promise<any>;
  saveHealthConditionSurveyAnswers(user:any): Promise<any>;
  saveSurveyAnswers(surveyType: string, answers: string[]): Promise<any>;
  getCompanyLogo(company: string): Promise<any>;
  findExternalUserByIdentification(identification: number): Promise<any>;
  getScoreHealthCondition(
    scoreHealthConditionDto: ScoreHealthConditionDto
  ): Promise<any>;
  getMessage(company: string, head: string): Promise<any>;
}
