import { injectable } from 'inversify';
import { Observable } from 'rxjs';
import { Survey, SurveyCreationRequest } from './data/survey.models';
import { uuid } from 'uuidv4';
import { flatMap } from '@rxjsx/rxjsx';
import { map } from 'rxjs/operators';
import { dumpData, loadData } from '../../utils/disk';

@injectable()
export class SurveyRepository {
  private readonly dumpPath: string;

  constructor() {
    this.dumpPath = 'surveys.db.json';
  }

  public save(request: SurveyCreationRequest): Observable<Survey> {
    const id = uuid();
    const survey: Survey = { ...request, id };
    return loadData<Record<string, Survey>>(this.dumpPath)
      .pipe(flatMap(data => dumpData(this.dumpPath, { ...data, [id]: survey })))
      .pipe(map(() => survey));
  }

  public getById(id: string): Observable<Survey> {
    return loadData(this.dumpPath).pipe(map(surveys => surveys[id]));
  }
}
