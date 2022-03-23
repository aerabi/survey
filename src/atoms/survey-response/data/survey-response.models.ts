type QuestionResponse = boolean | string;

export interface SurveyResponse<T = QuestionResponse> {
  responses: T[];
}

export type YesNoSurveyResponse = SurveyResponse<boolean>;
export type MultipleChoiceSurveyResponse = SurveyResponse<string>;
