import { load } from "cheerio";
import { INFO } from "@/lib/config";
import { getEntries } from "@/lib/constants";

export function replaceAssetsDomain(src: string): string {
  return src.replace(
    INFO.site.assets,
    "http://localhost:4321/assets" // TODO: workaround
  );
}

const media2tag: Record<
  string,
  {
    ext: string[];
    elem: string;
    attr?: Record<string, string>;
  }
> = {
  video: {
    ext: ["mp4"],
    elem: "<video>",
    attr: {
      controls: "true",
      loop: "true",
    },
  },
  img: {
    ext: ["jpg", "jpeg", "png"],
    elem: "<img>",
  },
};

export function convertMedia(html: string): string {
  const $ = load(html);
  const $media = $(".media");

  $media.each(async (_, elem) => {
    const $elem = $(elem);
    let src = $(elem).text();
    if (src == null) throw new Error("src is null");
    if (src.startsWith(INFO.site.assets)) {
      src = replaceAssetsDomain(src);
    }

    const ext = src.split(".").at(-1);
    if (ext == null) throw new Error(`_ext is null: ${src}`);

    const key = Object.keys(media2tag).find((k) => {
      const t = media2tag[k];
      if (t == null) throw new Error("t.ext is null");
      return t.ext.includes(ext as never);
    });
    if (key == null) throw new Error(`key is null: ${src}`);

    const tag = media2tag[key];
    if (tag == null) throw new Error("tag is null");

    const { elem: _elem, attr } = tag;
    const newElem = $(_elem);
    newElem.attr("src", src);
    getEntries(attr ?? {}).forEach(([k, v]) => {
      newElem.attr(k, v);
    });

    const parentTagName = $elem.parent()?.get(0)?.tagName;
    if (parentTagName === "p") {
      $elem.parent()?.replaceWith($("<figure>").append(newElem));
    } else {
      // eslint-disable-next-line no-console
      console.warn(`parentTagName is not p: ${parentTagName}`);
      $elem.replaceWith(newElem);
    }
  });

  return $.html();
}
