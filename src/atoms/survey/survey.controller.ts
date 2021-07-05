import { inject, injectable } from 'inversify';
import { tap } from 'rxjs/operators';
import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';

import { Survey, SurveyCreationRequest } from './data/survey.models';
import { SurveyService } from './survey.service';

@Route('survey')
@Tags('Survey')
@injectable()
export class SurveyController extends Controller {
  constructor(@inject(SurveyService) private service: SurveyService) {
    super();
  }

  @SuccessResponse('201', 'Created')
  @Post('')
  public async create(@Body() surveyCreationRequest: SurveyCreationRequest): Promise<Survey> {
    return this.service
      .create(surveyCreationRequest)
      .pipe(tap(_ => this.setStatus(201)))
      .toPromise();
  }

  @Get('{id}')
  public async getById(@Path('id') id: string): Promise<Survey> {
    return this.service.getById(id).toPromise();
  }
}
