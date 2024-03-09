import { type ContactManifest, zContactManifest } from "./types/contact";

export type ENV = {
  MODE: "local" | "preview" | "production";
  MAIL_DKIM_PRIVATE_KEY: string;
  DISCORD_WEBHOOK_URL_CONTACT: string;
  DISCORD_WEBHOOK_MENTION_ID: string;
  CONTACT_MANIFEST: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type Variables = {};
export type HonoType = { Bindings: ENV; Variables: Variables };

export const getModeName = (mode: ENV["MODE"]): string => {
  const name = {
    local: " 【テスト - local】 ",
    preview: " 【テスト - preview】 ",
    production: "",
  } as const satisfies Record<typeof mode, string>;

  return name[mode];
};

export const getContactManifests = (env: ENV): ContactManifest =>
  zContactManifest.parse(JSON.parse(env.CONTACT_MANIFEST));
