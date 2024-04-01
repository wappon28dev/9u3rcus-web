/* eslint-disable no-console */
import type { AppType } from "@api/index";
import { hc, type InferResponseType } from "hono/client";
import { ResultAsync, err } from "neverthrow";
import type { ContactFormData } from "./contact";

const ENDPOINT = import.meta.env.PUBLIC_CLIENT_API_ENDPOINT;
const ACCESS_TOKEN = import.meta.env.PUBLIC_CLIENT_API_ACCESS_TOKEN;

if (ENDPOINT == null) {
  throw new Error("PUBLIC_CLIENT_API_ENDPOINT is not defined");
}

export const api = hc<AppType>(ENDPOINT);

type ContactResponse = InferResponseType<
  (typeof api)["v1"]["contact"]["$post"]
>;
export function postContactFormData(data: ContactFormData): ResultAsync<
  ContactResponse,
  {
    code: "NETWORK_ERROR" | "API_ERROR";
    error: Error;
  }
> {
  return ResultAsync.fromPromise(
    api.v1.contact.$post(
      {
        json: data,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      },
    ),
    (e) => {
      if (e instanceof Error) {
        return { code: "NETWORK_ERROR", error: e } as const;
      }
      throw e;
    },
  ).andThen((res) => {
    if (!res.ok) {
      return err({
        code: "API_ERROR",
        error: new Error(res.statusText),
      } as const);
    }

    return ResultAsync.fromPromise(
      res.json(),
      () =>
        ({
          code: "API_ERROR",
          error: new Error("Failed to parse response"),
        }) as const,
    ).map((json) => json);
  });
}
