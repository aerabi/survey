import { Observable } from 'rxjs';

type QuestionResponse = boolean | string;

export interface SurveyResponse<T = QuestionResponse> {
  responses: T[];
}

export type YesNoSurveyResponse = SurveyResponse<boolean>;
export type MultipleChoiceSurveyResponse = SurveyResponse<string>;

export interface ISurveyResponseRepository {
  save(surveyId: string, response: SurveyResponse): Observable<boolean>;
  getAllById(surveyId: string): Observable<SurveyResponse[]>;
}
