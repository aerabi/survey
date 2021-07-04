import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';
import { SurveyRepository } from './survey.repository';
import { Survey, SurveyCreationRequest } from './data/index.models';

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
