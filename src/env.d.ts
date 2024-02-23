/// <reference path="../.astro/types.d.ts" />
/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly MICROCMS_SERVICE_DOMAIN: string;
  readonly MICROCMS_API_KEY: string;
  readonly MICROCMS_MOCK_WORKS_DETAILS: string;
  readonly MICROCMS_MOCK_WORKS_LIST: string;
  readonly MICROCMS_MOCK_BLOGS_LIST: string;
  readonly MICROCMS_MOCK_BLOGS_DETAILS: string;
}
