import { load } from "cheerio";

export function addFigcaption(html: string): string {
  const $ = load(html);
  const $figure = $("figure");

  $figure.each((_, elem) => {
    const $elem = $(elem);
    const $img = $elem.find("img");
    const $figcaption = $elem.find("figcaption");

    if ($figcaption.length === 0) {
      const alt = $img.attr("alt");

      if (alt != null) {
        $elem.append(`<figcaption>${alt}</figcaption>`);
      }
    }
  });

  return $.html();
}
