import 'reflect-metadata';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Survey } from '../survey/data/survey.models';
import { ISurveyResponseRepository, SurveyResponse } from './data/survey-response.models';
import { SurveyResponseService } from './survey-response.service';

describe('SurveyResponseService', () => {
  let service: SurveyResponseService;

  const id = 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55';
  const survey: Survey = {
    id,
    questions: [
      {
        text: 'You are talking to me?',
        options: ['Yes', 'Nope'],
      },
    ],
  };
  const response: SurveyResponse = {
    responses: ['Yes'],
  };
  const responsesData: Record<string, SurveyResponse[]> = { [id]: [response] };

  beforeEach(() => {
    const repository: ISurveyResponseRepository = {
      save: (surveyId: string, response: SurveyResponse) => of(!!surveyId && !!response),
      getAllById: (surveyId: string) => of(responsesData[surveyId]),
    };
    const mockSurveyService: any = {
      getById: () => of(survey),
    };
    service = new SurveyResponseService(repository, mockSurveyService);
  });

  it('submit should validate input', () => {
    const invalidResponse: SurveyResponse = { responses: ['Ja'] };
    service
      .submit(id, invalidResponse)
      .pipe(
        catchError(error => {
          expect(error?.status).toEqual(400);
          expect(error.message).toEqual('The response to question 1: Ja is not a valid response. The possible responses are: Yes, Nope');
          return of(undefined);
        }),
      )
      .subscribe();
  });
});
