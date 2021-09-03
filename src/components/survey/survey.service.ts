import { SurveyRepository } from "./repositories/survey.repository";

export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  public async getCovidSurveyQuestions() {
    try {
      const heads = await this.surveyRepository.getSurveyHeads(3);

      const questions = await this.surveyRepository.getSurveyQuestions(3);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      const responses = await this.surveyRepository.getSurveyResponses(
        3,
        questionIds
      );

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = heads.map((head: any) => {
        return {
          ...head,
          questions: newQuestions.filter((question: any) => {
            return question.CABECERA_ID === head.COD_EC;
          }),
        };
      });

      return newHeads;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getEpidemiologicalFenceSurveyQuestions() {
    try {
      const heads = await this.surveyRepository.getSurveyHeads(4);

      const questions = await this.surveyRepository.getSurveyQuestions(4);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      const responses = await this.surveyRepository.getSurveyResponses(
        4,
        questionIds
      );

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = heads.map((head: any) => {
        return {
          ...head,
          questions: newQuestions.filter((question: any) => {
            return question.CABECERA_ID === head.COD_EC;
          }),
        };
      });

      return newHeads;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getHealthConditionSurveyQuestions() {
    try {
      const heads = await this.surveyRepository.getSurveyHeads(6);

      const questions = await this.surveyRepository.getSurveyQuestions(6);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      const responses = await this.surveyRepository.getSurveyResponses(
        6,
        questionIds
      );

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = heads.map((head: any) => {
        return {
          ...head,
          questions: newQuestions.filter((question: any) => {
            return question.CABECERA_ID === head.COD_EC;
          }),
        };
      });

      return newHeads;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
