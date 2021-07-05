import { injectable } from 'inversify';
import { bindCallback, Observable } from 'rxjs';
import { Survey, SurveyCreationRequest } from './data/survey.models';
import { uuid } from 'uuidv4';
import * as fs from 'fs';
import { flatMap } from '@rxjsx/rxjsx';
import { map } from 'rxjs/operators';

@injectable()
export class SurveyRepository {
  private readonly dumpPath: string;

  constructor() {
    this.dumpPath = 'surveys.json';
  }

  public save(request: SurveyCreationRequest): Observable<Survey> {
    const id = uuid();
    const survey: Survey = { ...request, id };
    return this.loadData().pipe(
      flatMap(data => {
        return this.dumpData({ ...data, [id]: survey }).pipe(map(() => survey));
      }),
    );
  }

  public getById(id: string): Observable<Survey> {
    return this.loadData().pipe(map(surveys => surveys[id]));
  }

  private loadData(): Observable<Record<string, Survey>> {
    return bindCallback(fs.readFile)(this.dumpPath).pipe(
      map(([errno, buffer]) => {
        try {
          return JSON.parse(buffer.toString());
        } catch (e) {
          return {};
        }
      }),
    );
  }

  private dumpData(data: Record<string, Survey>): Observable<boolean> {
    return bindCallback(fs.writeFile)(this.dumpPath, JSON.stringify(data)).pipe(map(_ => true));
  }
}
