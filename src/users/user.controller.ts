import 'reflect-metadata'
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { ILogger } from "../logger/ILogger";
import { TYPES } from "../types";
import { IUserController } from './users.interface';


@injectable()
export class UserController extends BaseController  implements IUserController {

  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService)
    // this.userRouter = this.router 
    this.bindRoutes([{
      path: '/login',
      func: this.login,
      method: "post"
    },
    {
      path: '/register',
      func: this.register,
      method: "post"
    }
   ])
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
    res.send('register')
  } 
  
  login(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log(`login`)
    this.ok(res, 'login')
  } 
}