import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';

import { SurveyResponse } from './data/survey-response.models';
import { SurveyResponseRepository } from './survey-response.repository';

@injectable()
export class SurveyResponseService {
  constructor(@inject(SurveyResponseRepository) private repository: SurveyResponseRepository) {}

  public submit(surveyId: string, response: SurveyResponse): Observable<boolean> {
    return this.repository.save(surveyId, response);
  }

  public getAllById(surveyId: string): Observable<SurveyResponse[]> {
    return this.repository.getAllById(surveyId);
  }
}
