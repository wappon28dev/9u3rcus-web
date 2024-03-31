import { addAnchorCopy } from "./rewriters/add-anchor-copy";
import { convertMedia } from "./rewriters/convert2media";
import { highlight } from "./rewriters/highlight";
import { imageOpt } from "./rewriters/image-opt";

export type Rewriter = (html: string) => Promise<string> | string;

export async function rewriteHTML(
  html: string,
  additionalRewriter: Rewriter[] = [],
): Promise<string> {
  let result = html;

  const writers: Rewriter[] = [
    convertMedia,
    imageOpt,
    highlight,
    addAnchorCopy,
    ...additionalRewriter,
  ];

  // eslint-disable-next-line no-restricted-syntax
  for await (const rewriter of writers) {
    result = await rewriter(result);
  }

  return result;
}
