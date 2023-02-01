import 'reflect-metadata'
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/ILogger";
import { TYPES } from "../types";
import { HTTPError } from "./http-error";
import { IExceptionFilter } from "./IExceptionFilter";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
  }
  catch(err: HTTPError | Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode} : ${err.message}`)
      res.status(err.statusCode).send(err.message)
    } else {
      this.logger.error(err.message)
      res.status(500).send(err.message)
    }
  }
}