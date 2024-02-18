import type { Token } from "panda/tokens";

export type PageManifest = {
  seo?: {
    title: string;
    description?: string;
  };
  style?: {
    background: Token;
  };
};
