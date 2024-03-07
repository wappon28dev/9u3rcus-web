/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare module "bun" {
  interface Env {
    readonly ASSETS_API_ENDPOINT: string;
    readonly ASSETS_API_ACCESS_TOKEN: string;
    readonly ASSETS_API_REFERER: string;
    readonly ASSETS_LOCAL_SERVER_PORT: string;
  }
}
