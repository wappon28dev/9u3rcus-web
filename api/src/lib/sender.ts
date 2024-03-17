import { type Personalization } from "@cloudflare/pages-plugin-mailchannels/api";
import { type ENV } from "./consts";

export type EmailAddress = {
  email: string;
  name?: string;
};

export function getPersonalizationInfo({
  env,
  info,
}: {
  env: ENV;
  info: Personalization;
}): Personalization {
  const { API_MAIL_DKIM_PRIVATE_KEY } = env;
  if (API_MAIL_DKIM_PRIVATE_KEY == null) {
    throw new Error("MAIL_DKIM_PRIVATE_KEY is not set");
  }

  return {
    ...info,
    dkim_domain: "9u3rc.us",
    dkim_selector: "mailchannels",
    dkim_private_key: API_MAIL_DKIM_PRIVATE_KEY,
  };
}
