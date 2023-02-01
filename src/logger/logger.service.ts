import 'reflect-metadata'
import { injectable } from "inversify"
import { Logger } from "tslog"
import { ILogger } from "./ILogger"

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<unknown>

  constructor() {
    this.logger = new Logger()
  }

  log(...arg: unknown[]) {
    this.logger.info(...arg)
  }
  error(...arg: unknown[]) {
    this.logger.error(...arg)
  }
  warn(...arg: unknown[]) {
    this.logger.warn(...arg)
  }
}