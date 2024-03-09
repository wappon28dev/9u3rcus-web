/* eslint-disable no-console */
import { type MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { bearerAuth } from "hono/bearer-auth";
import { type HonoType, getContactManifests } from "lib/consts";

export const authGuard: MiddlewareHandler<HonoType> = async (ctx, next) => {
  console.log("secure guard");
  const referer = ctx.req.header("referer");

  const manifest = getContactManifests(ctx.env);

  if (manifest == null) {
    return await ctx.notFound();
  }

  const { allowedHosts, accessKey } = manifest;

  if (referer == null) {
    throw new HTTPException(400, { message: "referer header is required" });
  }

  if (!allowedHosts.some((host) => referer.startsWith(host))) {
    throw new HTTPException(403);
  }

  return await bearerAuth({ token: accessKey })(ctx, next);
};
