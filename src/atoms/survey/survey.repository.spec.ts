import 'reflect-metadata';

import * as fs from 'fs';
import { tap } from 'rxjs/operators';
import { isUuid } from 'uuidv4';

import { Survey, SurveyCreationRequest } from './data/survey.models';
import { SurveyRepository } from './survey.repository';
import { flatZipMap } from '@rxjsx/rxjsx';

describe('SurveyRepository', () => {
  let repository: SurveyRepository;

  beforeEach(() => (repository = new SurveyRepository()));

  beforeEach(done => {
    if (fs.existsSync(repository['dumpPath'])) {
      fs.rm(repository['dumpPath'], done);
    } else {
      done();
    }
  });

  it('save yes/no survey', done => {
    const request: SurveyCreationRequest = {
      questions: [{ text: 'Is it the first unit test?' }],
    };

    repository
      .save(request)
      .pipe(
        tap((survey: Survey) => {
          expect(survey.questions).toEqual(request.questions);
          expect(survey.id).toBeTruthy();
          expect(isUuid(survey.id)).toEqual(true);
        }),
      )
      .subscribe(() => done());
  });

  it('save multi-option survey', done => {
    const request: SurveyCreationRequest = {
      questions: [
        {
          text: 'Who is your favorite villain?',
          options: ['Black Manta', 'DeathStroke', 'Darkseid', 'Batman who Laughs'],
        },
      ],
    };

    repository
      .save(request)
      .pipe(
        tap((survey: Survey) => {
          expect(survey.questions).toEqual(request.questions);
          expect(survey.id).toBeTruthy();
        }),
      )
      .subscribe(() => done());
  });

  it('getById', done => {
    const request: SurveyCreationRequest = {
      questions: [{ text: 'Is it loaded again?' }],
    };

    repository
      .save(request)
      .pipe(flatZipMap((survey: Survey) => repository.getById(survey.id)))
      .pipe(tap(([saved, loaded]) => expect(saved).toEqual(loaded)))
      .subscribe(() => done());
  });
});
