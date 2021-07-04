import { iocContainer } from '../../ioc';
import { SurveyController } from './survey.controller';

describe('SurveyController', () => {
  it('constructor', () => {
    const controller = iocContainer.get(SurveyController);
    expect(controller).toBeTruthy();
  });
});
