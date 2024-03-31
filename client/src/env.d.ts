/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CLIENT_MICROCMS_SERVICE_DOMAIN: string;
  readonly CLIENT_MICROCMS_API_KEY: string;
  readonly PUBLIC_CLIENT_CF_TURNSTILE_SITE_KEY: string;
  readonly PUBLIC_CLIENT_API_ENDPOINT: string;
  readonly PUBLIC_CLIENT_API_ACCESS_TOKEN: string;
}
