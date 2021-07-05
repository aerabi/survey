import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';

import { Survey, SurveyCreationRequest } from './data/survey.models';
import { SurveyRepository } from './survey.repository';

@injectable()
export class SurveyService {
  constructor(@inject(SurveyRepository) private repository: SurveyRepository) {}

  public create(request: SurveyCreationRequest): Observable<Survey> {
    return this.repository.save(request);
  }

  public getById(id: string): Observable<Survey> {
    return this.repository.getById(id);
  }
}
