import { Request, Response, NextFunction } from "express";
import  noCache  from "helmet";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: "before" })
export class SecurityNoCacheMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction): any {
    return noCache()(req, res, next);
  }
}
