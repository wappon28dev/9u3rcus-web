import type { Token } from "panda/tokens";

export type PageManifest = Partial<{
  seo: {
    title: string;
    description?: string;
  };
  style: {
    background: Token;
  };
  header: {
    isFixed: boolean;
  };
}>;
