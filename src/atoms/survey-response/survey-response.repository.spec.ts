import 'reflect-metadata';

import { tap } from 'rxjs/operators';
import { flatMap } from '@rxjsx/rxjsx';
import { SurveyResponseRepository } from './survey-response.repository';
import { SurveyResponse } from './data/survey-response.models';

describe('SurveyResponseRepository', () => {
  let repository: SurveyResponseRepository;

  const surveyId = 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55';

  beforeEach(() => (repository = new SurveyResponseRepository()));

  it('save', done => {
    const response: SurveyResponse = {
      responses: [false],
    };

    repository
      .save(surveyId, response)
      .pipe(tap((success: boolean) => expect(success).toEqual(true)))
      .subscribe(() => done());
  });

  it('getById', done => {
    const response: SurveyResponse = {
      responses: [false, true, true],
    };

    repository
      .save(surveyId, response)
      .pipe(flatMap(_ => repository.getAllById(surveyId)))
      .pipe(tap((responses: SurveyResponse[]) => expect(responses).toContain(response)))
      .subscribe(() => done());
  });
});
