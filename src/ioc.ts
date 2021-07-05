import 'reflect-metadata';

import { Container, decorate, injectable, interfaces } from 'inversify';
import { buildProviderModule, fluentProvide } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

import { SurveyResponseController } from './atoms/survey-response/survey-response.controller';
import { SurveyResponseRepository } from './atoms/survey-response/survey-response.repository';
import { SurveyResponseService } from './atoms/survey-response/survey-response.service';
import { SurveyController } from './atoms/survey/survey.controller';
import { SurveyRepository } from './atoms/survey/survey.repository';
import { SurveyService } from './atoms/survey/survey.service';

export const provideSingleton = <T>(identifier: interfaces.ServiceIdentifier<T>) => fluentProvide(identifier).inSingletonScope().done();

const iocContainer = new Container();
decorate(injectable(), Controller);
iocContainer.load(buildProviderModule());

iocContainer.bind<SurveyController>(SurveyController).toSelf().inSingletonScope();
iocContainer.bind<SurveyService>(SurveyService).toSelf().inSingletonScope();
iocContainer.bind<SurveyRepository>(SurveyRepository).toSelf().inSingletonScope();

iocContainer.bind<SurveyResponseController>(SurveyResponseController).toSelf().inSingletonScope();
iocContainer.bind<SurveyResponseService>(SurveyResponseService).toSelf().inSingletonScope();
iocContainer.bind<SurveyResponseRepository>(SurveyResponseRepository).toSelf().inSingletonScope();

export { iocContainer };
