import { INFO } from "@client/lib/config";

export function modifySrc(src: string): string {
  let newSrc = src;

  if (src.startsWith(INFO.site.assets)) {
    newSrc = src.replace(INFO.site.assets, "/assets");
  }

  return newSrc;
}
