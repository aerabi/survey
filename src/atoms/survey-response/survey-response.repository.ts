import { injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { SurveyResponse } from './data/survey-response.models';

@injectable()
export class SurveyResponseRepository {
  private responses: Map<string, SurveyResponse[]>;

  constructor() {
    this.responses = new Map<string, SurveyResponse[]>();
  }

  public save(surveyId: string, response: SurveyResponse): Observable<boolean> {
    if (!this.responses.has(surveyId)) {
      this.responses.set(surveyId, []);
    }
    this.responses.get(surveyId).push(response);
    return of(true);
  }

  public getAllById(surveyId: string): Observable<SurveyResponse[]> {
    return of(this.responses.get(surveyId));
  }
}
