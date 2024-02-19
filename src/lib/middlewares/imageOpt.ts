import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";
import { load } from "cheerio";

type ImageData = GetImageResult["options"];

async function getOptimalImage(data: ImageData): Promise<GetImageResult> {
  const { src, alt, width, height } = data;
  return await getImage({ src, alt, width, height });
}

export async function rewrite4ImgOpt(html: string): Promise<string> {
  const $ = load(html);
  const $img = $("img");

  const imageDataList: ImageData[] = [];

  $img.each((_, elem) => {
    const attr = $(elem).attr();
    if (attr == null) {
      throw new Error("Image element has no attribute");
    }
    if (attr.src == null) {
      throw new Error("Image element has no src attribute");
    }

    imageDataList.push({
      src: attr.src,
      alt: attr.alt ?? "",
      width: Number(attr.width) ?? 0,
      height: Number(attr.height) ?? 0,
    });
  });

  const optImageDataList: GetImageResult[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const imageData of imageDataList) {
    optImageDataList.push(await getOptimalImage(imageData));
  }

  $img.each((i, elem) => {
    const optImageData = optImageDataList.at(i);
    const $elem = $(elem);
    if (optImageData == null) throw new Error("OptImageData not found");

    $elem.attr("src", optImageData.src);
    Object.entries(optImageData.attributes).forEach(([k, v]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      $elem.attr(k, v);
    });
  });

  return $.html();
}
