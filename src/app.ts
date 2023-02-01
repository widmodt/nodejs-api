import 'reflect-metadata'
import express, { Express } from "express"
import { Server } from "http"
import { inject, injectable } from "inversify"
import { IExceptionFilter } from "./errors/IExceptionFilter"
import { ILogger } from "./logger/ILogger"
import { TYPES } from "./types"
import { IUserController } from './users/users.interface'

@injectable()
export class App {
  app: Express
  port: number
  server: Server

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.IUserController) private UserController: IUserController,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter) {
      this.app = express()
      this.port = 8000
      this.logger = logger
  }

  useRoutes() {
    this.app.use('/users', this.UserController.router)
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init() {
    this.useRoutes()
    this.useExceptionFilters()
    this.server = this.app.listen(this.port)
    this.logger.log(`server started http://localhost:${this.port}`)
  }
}