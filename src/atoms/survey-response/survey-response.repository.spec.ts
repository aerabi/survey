import 'reflect-metadata';

import * as fs from 'fs';
import { tap } from 'rxjs/operators';

import { MultipleChoiceSurveyResponse, SurveyResponse, YesNoSurveyResponse } from './data/survey-response.models';
import { SurveyResponseRepository } from './survey-response.repository';
import { flatMap } from '@rxjsx/rxjsx';

describe('SurveyResponseRepository', () => {
  let repository: SurveyResponseRepository;

  const surveyId = 'f32dc9ae-7ca8-44ca-8f25-f258f7331c55';

  beforeEach(() => (repository = new SurveyResponseRepository()));

  beforeEach(done => {
    if (fs.existsSync(repository['dumpPath'])) {
      fs.rm(repository['dumpPath'], done);
    } else {
      done();
    }
  });

  it('save', done => {
    const response: YesNoSurveyResponse = {
      responses: [false],
    };

    repository
      .save(surveyId, response)
      .pipe(tap((success: boolean) => expect(success).toEqual(true)))
      .subscribe(() => done());
  });

  it('save multi-option response', done => {
    const response: MultipleChoiceSurveyResponse = {
      responses: ['Darkseid'],
    };

    repository
      .save(surveyId, response)
      .pipe(tap(success => expect(success).toEqual(true)))
      .subscribe(() => done());
  });

  it('getAllById', done => {
    const response: SurveyResponse = {
      responses: [false, true, true],
    };

    repository
      .save(surveyId, response)
      .pipe(flatMap(() => repository.getAllById(surveyId)))
      .pipe(tap((responses: SurveyResponse[]) => expect(responses).toContainEqual(response)))
      .subscribe(() => done());
  });
});
