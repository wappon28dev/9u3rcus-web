import type { Token } from "panda/tokens";
import type { ComponentProps } from "react";
import type { Header } from "@/components/Header";

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
