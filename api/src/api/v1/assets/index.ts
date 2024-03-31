import { type HonoType } from "@api/lib/consts";
import { Hono } from "hono";

export const assets = new Hono<HonoType>().get("/*", async (ctx) => {
  const filePath = ctx.req.path.replace("/v1/assets/", "");

  return await fetch(`${ctx.env.API_ASSETS_ENDPOINT}?filePath=${filePath}`, {
    headers: {
      Authorization: `Bearer ${ctx.env.API_ASSETS_ACCESS_KEY}`,
      Referer: ctx.req.url,
    },
  });
});
