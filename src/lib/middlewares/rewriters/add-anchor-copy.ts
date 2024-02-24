import { load } from "cheerio";

export function addAnchorCopy(html: string): string {
  const $ = load(html);
  const $header = $("h2, h3");

  $header.each((_, elem) => {
    const $elem = $(elem);
    const id = $(elem).attr("id");
    if (id == null) throw new Error("id is not found");

    const btn = $("<a>");
    btn.attr("href", `#${id}`);
    btn.text("#");
    $elem.prepend(btn);
  });

  return $.html();
}
