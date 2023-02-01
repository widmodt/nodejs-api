import 'reflect-metadata'
import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exceptionFilter";
import { IExceptionFilter } from "./errors/IExceptionFilter";
import { ILogger } from "./logger/ILogger";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/user.controller";
import { IUserController } from './users/users.interface';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService)
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter)
  bind<IUserController>(TYPES.IUserController).to(UserController)
  bind<App>(TYPES.Application).to(App)
})

function bootstrap() {
  const appContainer = new Container()  
  appContainer.load(appBindings)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()
  return {appContainer, app}
}

export const {app, appContainer} = bootstrap()
