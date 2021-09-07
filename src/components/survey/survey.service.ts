import * as moment from "moment";
import { SurveyAnswersDto } from "./dto/surveyAnswers.dto";
import { SurveyHeadsDto } from "./dto/surveyHeads.dto";
import { SurveyQuestionsDto } from "./dto/surveyQuestions.dto";
import { SurveyResponsesDto } from "./dto/surveyResponses.dto";
import { SurveyRepository } from "./repositories/survey.repository";

export class SurveyService {
  constructor(private readonly surveyRepository: SurveyRepository) {}

  public async getCovidSurveyQuestions() {
    try {
      const surveyId = 3;
      let heads: any[] = [];
      let questions: any[] = [];
      let responses: any[] = [];

      heads = await this.surveyRepository.getSurveyHeads({
        surveyId: surveyId,
      } as SurveyHeadsDto);

      questions = await this.surveyRepository.getSurveyQuestions({
        surveyId: surveyId,
        clasifications: ["A", "S"],
      } as SurveyQuestionsDto);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      responses = await this.surveyRepository.getSurveyResponses({
        surveyId: surveyId,
        questionIds: questionIds,
      } as SurveyResponsesDto);

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
      const surveyId = 4;
      let heads: any[] = [];
      let questions: any[] = [];
      let responses: any[] = [];

      heads = await this.surveyRepository.getSurveyHeads({
        surveyId: surveyId,
      } as SurveyHeadsDto);

      questions = await this.surveyRepository.getSurveyQuestions({
        surveyId: surveyId,
      } as SurveyQuestionsDto);
      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      responses = await this.surveyRepository.getSurveyResponses({
        surveyId: surveyId,
        questionIds: questionIds,
      } as SurveyResponsesDto);

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
      const surveyId = 6;
      const identification = 1107088223;
      let heads: any[] = [];
      let questions: any[] = [];
      let responses: any[] = [];

      const lastResponses = await this.surveyRepository.getSurveyAnswers({
        identification: identification,
      } as SurveyAnswersDto);
      const lastDate = lastResponses[0];

      if (lastDate.FECHA_CREACION === null) {
        const clasifications = ["I", "S"];
        heads = await this.surveyRepository.getSurveyHeads({
          surveyId: surveyId,
        } as SurveyHeadsDto);

        questions = await this.surveyRepository.getSurveyQuestions({
          surveyId: surveyId,
          clasifications: clasifications,
        } as SurveyQuestionsDto);
      } else {
        const frequencies = await this.surveyRepository.getSurveyFrecuency();

        for (const frequency of frequencies) {
          const numberOfFrecuency = `= ${frequency.EPR_FRECUENCIA}`;

          const dateOfLastAnswers =
            await this.surveyRepository.getSurveyAnswers({
              identification: identification,
              frecuency: numberOfFrecuency,
            } as SurveyAnswersDto);

          if (
            frequency.EPR_FRECUENCIA > 1 &&
            dateOfLastAnswers[0].FECHA_CREACION !== null
          ) {
            const daysPassed = this.daysPassed(
              dateOfLastAnswers[0].FECHA_CREACION
            );

            if (daysPassed >= frequency.EPR_FRECUENCIA) {
              const clasifications = ["A"];
              questions.push(
                ...(await this.surveyRepository.getSurveyQuestions({
                  surveyId: surveyId,
                  clasifications: clasifications,
                  frecuency: numberOfFrecuency,
                } as SurveyQuestionsDto))
              );

              heads.push(
                ...(await this.surveyRepository.getSurveyHeads({
                  surveyId: surveyId,
                  frecuency: numberOfFrecuency,
                } as SurveyHeadsDto))
              );
            }
          } else if (
            frequency.EPR_FRECUENCIA > 1 &&
            dateOfLastAnswers[0].FECHA_CREACION === null
          ) {
            const dateOfLastAnswers =
              await this.surveyRepository.getSurveyAnswers({
                identification: identification,
              } as SurveyAnswersDto);

            const daysPassed = this.daysPassed(
              dateOfLastAnswers[0].FECHA_CREACION
            );

            if (daysPassed >= frequency.EPR_FRECUENCIA) {
              const clasifications = ["A"];
              questions.push(
                ...(await this.surveyRepository.getSurveyQuestions({
                  surveyId: surveyId,
                  clasifications: clasifications,
                  frecuency: numberOfFrecuency,
                } as SurveyQuestionsDto))
              );

              heads.push(
                ...(await this.surveyRepository.getSurveyHeads({
                  surveyId: surveyId,
                  frecuency: numberOfFrecuency,
                } as SurveyHeadsDto))
              );
            }
          } else if (frequency.EPR_FRECUENCIA === 1) {
            const clasificationS = ["S"];
            questions.push(
              ...(await this.surveyRepository.getSurveyQuestions({
                surveyId: surveyId,
                clasifications: clasificationS,
              } as SurveyQuestionsDto))
            );
            heads.push(
              ...(await this.surveyRepository.getSurveyHeads({
                surveyId: surveyId,
                clasifications: clasificationS,
              } as SurveyHeadsDto))
            );

            const clasificationA = ["A"];
            questions.push(
              ...(await this.surveyRepository.getSurveyQuestions({
                surveyId: surveyId,
                clasifications: clasificationA,
                frecuency: numberOfFrecuency,
              } as SurveyQuestionsDto))
            );
            heads.push(
              ...(await this.surveyRepository.getSurveyHeads({
                surveyId: surveyId,
                clasifications: clasificationA,
                frecuency: numberOfFrecuency,
              } as SurveyHeadsDto))
            );
          }
        }
      }

      const uniqueHeads = [
        ...new Map(heads.map((head) => [head["COD_EC"], head])).values(),
      ];

      const questionIds = questions.map((question: any) => {
        return question.ID;
      });

      responses = await this.surveyRepository.getSurveyResponses({
        surveyId: surveyId,
        questionIds: questionIds,
      } as SurveyResponsesDto);

      const newQuestions = questions.map((question: any) => {
        return {
          ...question,
          responses: responses.filter((response: any) => {
            return question.ID === response.PREGUNTA_ID;
          }),
        };
      });

      const newHeads = uniqueHeads.map((head: any) => {
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

  private daysPassed(date: Date) {
    return moment.default().diff(moment.default(date), "days");
  }
}
