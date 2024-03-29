import imageSize from "image-size";
import { INFO } from "../config";

/**
 * NOTE: This fn is only used in server-side code (in `dev`/`build`);
 *       Do not use this in client-side code. (caused by `image-size`)
 * @param path path WITHOUT leading slash
 * @returns URL to the `/public` path
 */
export function inferImageSize(path: string): {
  width: number;
  height: number;
} {
  const { height, width } = imageSize(`public${path}`);
  if (height == null || width == null) {
    throw new Error(`Failed to infer image size: ${path}`);
  }
  return { height, width };
}

export function modifySrc(src: string): string {
  let newSrc = src;

  if (src.startsWith(INFO.site.assets)) {
    newSrc = src.replace(INFO.site.assets, "/assets");
  }

  return newSrc;
}
