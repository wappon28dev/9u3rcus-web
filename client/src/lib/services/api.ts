import type { AppType } from "@api/index";
import { hc } from "hono/client";

const ENDPOINT = import.meta.env.PUBLIC_CLIENT_API_ENDPOINT;
const ACCESS_TOKEN = import.meta.env.PUBLIC_CLIENT_API_ACCESS_TOKEN;

if (ENDPOINT == null) {
  throw new Error("PUBLIC_CLIENT_API_ENDPOINT is not defined");
}

export const api = hc<AppType>(ENDPOINT);
