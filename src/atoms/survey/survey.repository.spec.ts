import 'reflect-metadata';

import { SurveyRepository } from './survey.repository';
import { Survey, SurveyCreationRequest } from './data/survey.models';
import { tap } from 'rxjs/operators';
import { flatZipMap } from '@rxjsx/rxjsx';
import { isUuid } from 'uuidv4';

describe('SurveyRepository', () => {
  let repository: SurveyRepository;

  beforeEach(() => (repository = new SurveyRepository()));

  it('save', done => {
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
