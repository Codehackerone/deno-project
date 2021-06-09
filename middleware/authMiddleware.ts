import { RouterContext, verify } from "../deps.ts";
import User from "../models/User.ts";

export const authMiddleware = async (ctx: RouterContext, next: Function) => {
  const headers = ctx.request.headers;

  const authHeader = headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    return;
  }
  const jwt = authHeader.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  const data:any = await verify(jwt, Deno.env.get("JWT_SECRET")||"", {isThrowing: false,}as any);
  if (data) {
    const user = await User.findOne({ email: data.payload?.iss });
    ctx.state.user = user;
    await next();
  } else {
    ctx.response.status = 401;
  }
};
