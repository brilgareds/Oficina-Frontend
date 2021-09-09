export interface SurveyRepository {
  getSurveyHeads(surveyId: number): Promise<any>;
  getSurveyQuestions(surveyId: number): Promise<any>;
  getSurveyResponses(surveyId: number, questionIds: number[]): Promise<any>;
}
