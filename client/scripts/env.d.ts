/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare module "bun" {
  interface Env {
    readonly CLIENT_SCRIPT_ASSETS_API_ENDPOINT: string;
    readonly CLIENT_SCRIPT_ASSETS_API_ACCESS_TOKEN: string;
    readonly CLIENT_SCRIPT_ASSETS_API_REFERER: string;
  }
}
