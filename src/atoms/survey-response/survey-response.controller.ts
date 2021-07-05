import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { tap } from 'rxjs/operators';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponse } from './data/survey-response.models';

@Route('survey')
@Tags('Survey Response')
@injectable()
export class SurveyResponseController extends Controller {
  constructor(@inject(SurveyResponseService) private service: SurveyResponseService) {
    super();
  }

  @SuccessResponse('201', 'Created')
  @Post('{id}/response')
  public async saveResponse(@Path('id') surveyId, @Body() surveyResponse: SurveyResponse): Promise<boolean> {
    return this.service
      .submit(surveyId, surveyResponse)
      .pipe(tap(_ => this.setStatus(201)))
      .toPromise();
  }

  @Get('{id}/response')
  public async getAllResponses(@Path('id') surveyId: string): Promise<SurveyResponse[]> {
    return this.service.getAllById(surveyId).toPromise();
  }
}
