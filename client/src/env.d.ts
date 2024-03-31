/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly CLIENT_MICROCMS_SERVICE_DOMAIN: string;
  readonly CLIENT_MICROCMS_API_KEY: string;
  readonly PUBLIC_CLIENT_CF_TURNSTILE_SITE_KEY: string;
}
