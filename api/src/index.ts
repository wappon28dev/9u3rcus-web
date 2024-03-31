import { v1 } from "@api/api/v1";
import { type HonoType } from "@api/lib/consts";
import { Hono } from "hono";

const app = new Hono<HonoType>();

const route = app
  .get("/", async (ctx) => ctx.text("Hello World!"))
  .route("/v1", v1);

export type AppType = typeof route;
export default app;
