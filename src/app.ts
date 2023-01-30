import express, { Express, Router } from "express"
import { Server } from "http"
import { ExceptionFilter } from "./errors/exceptionFilter"
import { LoggerService } from "./logger/logger.service"
import { UserController } from "./users/user.controller"

export class App {
  app: Express
  server: Server
  port: number
  logger: LoggerService
  UserController: UserController
  exceptionFilter: ExceptionFilter

  constructor(logger: LoggerService, UserController: UserController, exceptionFilter: ExceptionFilter) {
    this.app = express()
    this.port = 8000
    this.logger = logger
    this.server = new Server
    this.UserController = UserController
    this.exceptionFilter = exceptionFilter

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