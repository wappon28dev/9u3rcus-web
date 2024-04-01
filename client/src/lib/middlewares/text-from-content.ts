import { load } from "cheerio";

export function getTextFromContent(html: string): string {
  const $ = load(html);
  return $.text().replaceAll("\n", "").replaceAll("    ", "  ");
}
