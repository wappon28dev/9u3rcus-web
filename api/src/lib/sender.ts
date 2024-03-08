import { type Personalization } from "@cloudflare/pages-plugin-mailchannels/api";
import { type ENV } from "./constance";

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
  const { MAIL_DKIM_PRIVATE_KEY } = env;
  if (MAIL_DKIM_PRIVATE_KEY == null) {
    throw new Error("MAIL_DKIM_PRIVATE_KEY is not set");
  }

  return {
    ...info,
    dkim_domain: "9u3rc.us",
    dkim_selector: "mailchannels",
    dkim_private_key: MAIL_DKIM_PRIVATE_KEY,
  };
}
