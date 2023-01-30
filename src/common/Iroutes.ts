import { NextFunction, Router, Request, Response } from "express"

export interface IControllerRoute {
  path: string
  func: (req: Request, res: Response, next: NextFunction) => void
  method: keyof Pick<Router, 'use' | 'get'  | 'post' | 'delete' | 'patch' | 'put'> 
}