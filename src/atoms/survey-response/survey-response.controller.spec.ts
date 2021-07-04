import { iocContainer } from '../../ioc';
import { SurveyResponseController } from './survey-response.controller';

describe('SurveyResponseController', () => {
  it('constructor', () => {
    const controller = iocContainer.get(SurveyResponseController);
    expect(controller).toBeTruthy();
  });
});
