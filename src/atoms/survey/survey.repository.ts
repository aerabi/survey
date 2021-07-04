import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { Survey, SurveyCreationRequest } from './data/survey.models';
import { uuid } from 'uuidv4';

@injectable()
export class SurveyRepository {
  private surveys: Map<string, Survey>;

  constructor() {
    this.surveys = new Map<string, Survey>();
  }

  public save(request: SurveyCreationRequest): Observable<Survey> {
    const id = uuid();
    const survey: Survey = { ...request, id };
    this.surveys.set(id, survey);
    return of(survey);
  }

  public getById(id: string): Observable<Survey> {
    return of(this.surveys.get(id));
  }
}
