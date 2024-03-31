import type { Header } from "@client/components/_Header";
import type { Token } from "panda/tokens";
import type { ComponentProps } from "react";

export type PageManifest = {
  seo?: {
    title: string;
    description?: string;
  };
  style?: {
    bgColor: Token;
  };
  header?: ComponentProps<typeof Header>;
};
