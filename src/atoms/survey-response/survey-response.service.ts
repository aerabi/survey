import 'reflect-metadata';

import { inject, injectable } from 'inversify';
import { Observable } from 'rxjs';

import { ApiError } from '../../utils/error';
import { Survey } from '../survey/data/survey.models';
import { SurveyService } from '../survey/survey.service';
import { ISurveyResponseRepository, SurveyResponse } from './data/survey-response.models';
import { SurveyResponseRepository } from './survey-response.repository';
import { flatMap } from '@rxjsx/rxjsx';

@injectable()
export class SurveyResponseService {
  constructor(@inject(SurveyResponseRepository) private repository: ISurveyResponseRepository, @inject(SurveyService) private surveyService: SurveyService) {}

  public submit(surveyId: string, response: SurveyResponse): Observable<boolean> {
    return this.surveyService.getById(surveyId).pipe(
      flatMap(survey => {
        this.validateSurveyResponse(survey, response);
        return this.repository.save(surveyId, response);
      }),
    );
  }

  private validateSurveyResponse(survey: Survey, response: SurveyResponse): void {
    survey.questions.forEach((question, index) => {
      if (question.options && !question.options.includes(response.responses[index] as string)) {
        const errorMessage = `The response to question ${index + 1}: ${
          response.responses[index]
        } is not a valid response. The possible responses are: ${question.options.join(', ')}`;
        throw new ApiError(400, errorMessage);
      }
    });
  }

  public getAllById(surveyId: string): Observable<SurveyResponse[]> {
    return this.repository.getAllById(surveyId);
  }
}
