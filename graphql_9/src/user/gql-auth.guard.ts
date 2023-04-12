import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { get, set } from "lodash";
import { decode } from "../utils/jwt.utils";

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // Get the cookie from request
    const token = get(req, "cookies.token");
    //console.log({ token });

    // Verify the cookie
    const user = token ? decode(token) : null;

    // Attach the user object to the request object
    if (user) {
      set(req, "user", user);
    }

    return true
  }

}
