import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class GuestUserAccess implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.header("authorization").split("=")[1] as string;

    if (!token) throw new UnauthorizedException();

    try {
      const pd = this.jwtService.decode(token) as {
        id: string;
        isGuest?: boolean;
      };

      if (!pd.isGuest) throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

@Injectable()
export class UserAccess implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.header("authorization").split("=")[1] as string;
    if (!token) throw new UnauthorizedException();

    try {
      this.jwtService.verify(token);
      const pd = this.jwtService.decode(token) as {
        id: string;
        isGuest?: boolean;
      };

      const { isGuest } = pd;
      if (isGuest === undefined || isGuest) throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
