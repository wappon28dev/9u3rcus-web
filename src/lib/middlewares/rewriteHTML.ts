export type Rewriter = (html: string) => Promise<string> | string;

export async function rewriteHTML(
  html: string,
  rewriter: Rewriter[]
): Promise<string> {
  let result = html;

  // eslint-disable-next-line no-restricted-syntax
  for await (const plugin of rewriter) {
    result = await plugin(result);
  }

  return result;
}
