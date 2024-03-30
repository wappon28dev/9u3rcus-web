import { load, type AnyNode, type Cheerio } from "cheerio";
import { getEntries } from "@/lib/consts";
import { modifySrc } from "@/lib/services/media";
import { inferImageSize } from "@/lib/services/image";

export type MediaKey = "video" | "img";

export const media2tag: Record<
  MediaKey,
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

export function detectMediaKey(ext: string): MediaKey {
  const key = Object.keys(media2tag).find((k) => {
    const t = media2tag[k as MediaKey];
    if (t == null) throw new Error("t.ext is null");
    return t.ext.includes(ext as never);
  }) as MediaKey | undefined;

  if (key == null) throw new Error(`result is null: ${ext}`);
  return key;
}

export async function convertMedia(html: string): Promise<string> {
  const $ = load(html);
  const $media = $(".media");

  const $imgElemList: Array<Cheerio<AnyNode>> = [];
  $media.each((_, elem) => {
    const $elem = $(elem);
    const src = $elem.text();
    if (src == null) throw new Error("src is null");

    const ext = src.split(".").at(-1);
    if (ext == null) throw new Error(`ext is null: ${src}`);

    const key = detectMediaKey(ext);
    const tag = media2tag[key];

    const { elem: _elem, attr } = tag;
    const newElem = $(_elem);
    const newSrc = modifySrc(src);

    if (key === "img") {
      $imgElemList.push(newElem);
    }

    newElem.attr("src", newSrc);
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

  const imgSizeList: Array<{ width: number; height: number }> = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const $img of $imgElemList) {
    const src = $img.attr("src");
    if (src == null) throw new Error("src is null");
    const { width, height } = inferImageSize(src);
    imgSizeList.push({ width, height });
  }

  $imgElemList.forEach(($img, i) => {
    const imgSize = imgSizeList.at(i);
    if (imgSize == null) {
      throw new Error(`imgSize not found:${$img.attr("src")}`);
    }
    const { width, height } = imgSize;
    $img.attr("width", width.toString());
    $img.attr("height", height.toString());
  });

  return $.html();
}
