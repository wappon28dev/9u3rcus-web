import { type HonoType } from "@api/lib/consts";
import { Hono } from "hono";
import { assets } from "./assets";
import { contact } from "./contact";

export const v1 = new Hono<HonoType>()
  .use("/*", async (ctx, next) => {
    Object.entries(ctx.env).forEach(([key, value]) => {
      if (value == null) throw new Error(`key: "${key}" is null`);
    });
    await next();
  })
  .route("/contact", contact)
  .route("/assets", assets);
