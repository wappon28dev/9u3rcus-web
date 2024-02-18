/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare module "bun" {
  interface Env {
    ASSETS_API_ENDPOINT: string;
    ASSETS_API_ACCESS_TOKEN: string;
    ASSETS_API_REFERER: string;
  }
}
