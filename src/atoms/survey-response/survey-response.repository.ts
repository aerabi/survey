import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { SurveyResponse } from './data/survey-response.models';
import { dumpData, loadData } from '../../utils/disk';
import { flatMap } from '@rxjsx/rxjsx';
import { map } from 'rxjs/operators';

type DataType = Record<string, SurveyResponse[]>;

@injectable()
export class SurveyResponseRepository {
  private readonly dumpPath: string;

  constructor() {
    this.dumpPath = 'survey-responses.db.json';
  }

  public save(surveyId: string, response: SurveyResponse): Observable<boolean> {
    return loadData<DataType>(this.dumpPath).pipe(
      flatMap(data => {
        if (!data[surveyId]) {
          data[surveyId] = [];
        }
        data[surveyId].push(response);
        return dumpData(this.dumpPath, data);
      }),
    );
  }

  public getAllById(surveyId: string): Observable<SurveyResponse[]> {
    return loadData<DataType>(this.dumpPath).pipe(map(data => data[surveyId]));
  }
}
