/* eslint-disable no-console */
import { INFO } from "@client/lib/config";
import { err, ok, ResultAsync } from "neverthrow";
import {
  type CreateEmailOptions,
  type CreateEmailResponseSuccess,
  Resend,
} from "resend";
import { type ENV } from "./consts";
import { type Override } from "./types/utils";

export function sendEmail(
  env: ENV,
  body: Override<
    CreateEmailOptions,
    {
      from?: never;
      text: string;
    }
  >,
): ResultAsync<
  CreateEmailResponseSuccess,
  {
    code: "API_ERROR";
    err: Error;
  }
> {
  if (env.API_RESEND_API_KEY == null) {
    throw new Error("API_RESEND_API_KEY is not set!");
  }

  const resend = new Resend(env.API_RESEND_API_KEY);

  return ResultAsync.fromSafePromise(
    resend.emails.send({
      ...body,
      from: `${INFO.name.full} <${INFO.addr.email.noreply}>`,
    }),
  ).andThen((res) => {
    if (res.data == null) {
      console.warn("Failed to send email", res.error?.name, res.error?.message);
      return err({
        code: "API_ERROR",
        err: new Error(res.error?.message),
      } as const);
    }

    return ok(res.data);
  });
}
