import { Turnstile } from "@marsidev/react-turnstile";
import { type Dispatch, type ReactElement, type SetStateAction } from "react";

export type CaptchaStatus = "passed" | "error" | undefined;

export function Captcha({
  setCaptchaStatus,
}: {
  setCaptchaStatus: Dispatch<SetStateAction<CaptchaStatus>>;
}): ReactElement {
  const TEST_SITE_KEY = "1x00000000000000000000AA";
  const siteKey = import.meta.env.PUBLIC_CLIENT_CF_TURNSTILE_SITE_KEY;

  if (siteKey == null) throw new Error("Missing TURNSTILE_SITE_KEY");

  return (
    <Turnstile
      onError={() => {
        setCaptchaStatus("error");
      }}
      onExpire={() => {
        setCaptchaStatus("error");
      }}
      onSuccess={() => {
        setCaptchaStatus("passed");
      }}
      options={{
        theme: "light",
      }}
      siteKey={import.meta.env.DEV ? TEST_SITE_KEY : siteKey}
    />
  );
}
