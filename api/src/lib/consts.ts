import { type ContactManifest, zContactManifest } from "./types/contact";

export type ENV = {
  MODE: "local" | "preview" | "production";
  API_RESEND_API_KEY: string;
  API_DISCORD_WEBHOOK_URL_CONTACT: string;
  API_DISCORD_WEBHOOK_MENTION_ID: string;
  API_CONTACT_MANIFEST: string;
  API_ASSETS_ENDPOINT: string;
  API_ASSETS_ACCESS_KEY: string;
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
  zContactManifest.parse(JSON.parse(env.API_CONTACT_MANIFEST));
