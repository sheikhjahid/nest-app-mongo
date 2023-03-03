import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      request?.user?.role === undefined ||
      request?.user?.role.name !== 'admin'
    ) {
      throw new ForbiddenException('Only admin user can access this route.');
    }
    return true;
  }
}
