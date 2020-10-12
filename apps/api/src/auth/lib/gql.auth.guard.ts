import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard  implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = this.getRequest(context);

    const header = request.header('Authorization');
    if (!header) {
      throw new HttpException('Authorization: Bearer <token> header missing', HttpStatus.UNAUTHORIZED);
    }

    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new HttpException('Authorization: Bearer <token> header invalid', HttpStatus.UNAUTHORIZED);
    }

    const token = parts[1];

    try {
      // Store the user on the request object if we want to retrieve it from the controllers
      request['user'] = await this.authenticationService.authenticate(token);
      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
    }
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
