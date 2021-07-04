import 'reflect-metadata';

import { Container, decorate, injectable, interfaces } from 'inversify';
import { Controller } from 'tsoa';
import { buildProviderModule, fluentProvide } from 'inversify-binding-decorators';
import { SurveyController } from './atoms/survey/survey.controller';
import { SurveyService } from './atoms/survey/survey.service';
import { SurveyRepository } from './atoms/survey/survey.repository';

export const provideSingleton = <T>(identifier: interfaces.ServiceIdentifier<T>) => fluentProvide(identifier).inSingletonScope().done();

const iocContainer = new Container();
decorate(injectable(), Controller);
iocContainer.load(buildProviderModule());

iocContainer.bind<SurveyController>(SurveyController).toSelf().inSingletonScope();
iocContainer.bind<SurveyService>(SurveyService).toSelf().inSingletonScope();
iocContainer.bind<SurveyRepository>(SurveyRepository).toSelf().inSingletonScope();

export { iocContainer };
