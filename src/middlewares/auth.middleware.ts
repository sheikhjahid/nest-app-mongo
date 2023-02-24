import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      session?: {
        token?: string;
      };
      token?: string;
    }
  }
}

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.session?.token;
    if (token) {
      req.token = token;
    }

    next();
  }
}
