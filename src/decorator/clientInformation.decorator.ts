import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UAParser } from "ua-parser-js";
import type { IResult } from "ua-parser-js";

const ClientInformation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const { req } = context.getContext();
    return UAParser(req.headers["user-agent"]) as IResult;
  },
);

export default ClientInformation;
