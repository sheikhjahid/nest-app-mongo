import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET_KEY';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      session?: {
        token?: string;
      };
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.session?.token;
    if (token) {
      const tokenDetails = await jwt.verify(token, JWT_SECRET);
      const user = await this.userService.findUser({
        email: tokenDetails.email,
      });
      req.user = user;
    }

    next();
  }
}
