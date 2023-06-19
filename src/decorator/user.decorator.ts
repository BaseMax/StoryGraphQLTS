import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

const jwt = new JwtService({ secret: process.env.JWT_SECRETKEY });

const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.header("authorization").split("=")[1] as string;

    if (!token) throw new UnauthorizedException();

    const pd = jwt.decode(token) as {
      id: string;
      isGuest?: boolean;
    };

    if (!pd) throw new UnauthorizedException();

    return { id: pd.id, isGuest: pd.isGuest };
  },
);

export default User;
