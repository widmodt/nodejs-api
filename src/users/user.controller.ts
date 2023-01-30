import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {
  // userRouter: Router

  constructor(logger: LoggerService) {
    super(logger)
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
    next(new HTTPError(401, 'autorization error'))
    this.ok(res, 'login')
    res.send('login')
  } 
}