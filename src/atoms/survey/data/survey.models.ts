export interface Question {
  text: string;
}

export interface SurveyBase {
  questions: Question[];
}

export interface Survey extends SurveyBase {
  id: string;
}

export type SurveyCreationRequest = SurveyBase;
